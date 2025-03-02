const User = require("../models/user.js")


module.exports.signupPage = (req, res) => {
    res.render("users/signup.ejs")
}

module.exports.userPost = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        if (!password || password.length < 6) {
            req.flash("error", "Password must be at least 6 characters long");
            return res.redirect("/signup");
        }

        const newUser = new User({ email, username })

        let registerUser = await User.register(newUser, password)

        console.log(registerUser)
        req.login(registerUser, (err) => {
            if (err) {
                return next(err)
            }
            req.flash("success", `Welcome to WANDERLUST ${username}`)
            return res.redirect("/listing")
        })
    } catch (e) {
        req.flash("error", e.message)
        res.redirect("/signup")
    }
}

module.exports.loginPage = (req, res) => {
    res.render("users/login.ejs")
}

module.exports.loginPost =
    async (req, res) => {
        req.flash("success", "welcome to wanderlust!!")
        let redirectUrl = res.locals.redirectUrl || "/listing"
        res.redirect(redirectUrl)
    }

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        }
        req.flash("success", "You are logout")
        res.redirect("/listing")
    })
} 