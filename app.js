
if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const express = require("express")
const app = express()
let port = 8080
const mongoose = require("mongoose")
const Listing = require("./models/listing.js")
const path = require("path")
const ejsMate = require("ejs-mate")
const ExpressError = require("./utils/ExpressError.js")
 
const session = require("express-session")
const flash = require("connect-flash")
const MongoStore = require("connect-mongo")

//authentication
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("./models/user.js")

const listingRouter = require("./Routes/listing.js")
const reviewRouter = require("./Routes/review.js")
const userRouter = require("./Routes/user.js")
const { storage } = require("./cloudConfig.js");
const multer = require("multer");
const Upload = multer({ storage: storage });

app.engine('ejs', ejsMate)


var methodOverride = require('method-override')
app.use(methodOverride('_method'))


app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "view"))
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }))


const dbUrl = process.env.ATLASDB_URL

main()
    .then(res => console.log("connected"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(dbUrl);
}


const store = MongoStore.create({
    mongoUrl: dbUrl,
     crypto: {
        secret: process.env.SECRET,
     },
     touchAfter: 24 * 3600,
})

store.on("error", () => {
    console.log("error in mongo store")
})

const sessionOption = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge:  7 * 24 * 60 * 60 * 1000,
    }
}

app.use(session(sessionOption))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
 
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success")
    res.locals.update = req.flash("update")
    res.locals.error = req.flash("error")

    res.locals.currUser = req.user;
    next()
});

//Demo user

// app.get("/demouser", async (req, res) => {
//     let fakeUser = new User({
//         email: "fakeuser@email.com",
//         username: "fake",
//     })
//     let registerUser = await User.register(fakeUser, "helloworld")
//     res.send(registerUser)
// })



app.use("/listing", listingRouter);
app.use("/listing/:id/review", reviewRouter)
app.use("/", userRouter)

app.get("/listing/user/:userId/post", async(req, res) => {
    let {userId} = req.params;

    const userListings = await Listing.find({owner: userId}).populate("owner")

    if (!userListings || userListings.length === 0) {
        req.flash("error", "No listing found for this user!!")
        res.redirect("/listing")
    }

    res.render("./listings/userListing.ejs", { userListings })

})

// Middleware to set a local variable for the template
app.use((req, res, next) => {
    res.locals.isListingRoute = req.originalUrl.startsWith('/listing');
    next();
});

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "page not found"))
})

app.use((err, req, res, next) => {
    let { status, message } = err;
    res.render("./listings/error.ejs", {message, status})
})


app.listen(port, () => {
    console.log("server listen")
})
