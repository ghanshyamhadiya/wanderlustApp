const express = require("express")
const router = express.Router()
const wrapAsync = require("../utils/wrapAsync.js")
const passport = require("passport")

const { saveRedirectUrl } = require("../middleware.js")
const userCountroller = require("../controllers/user.js")

router
    .route("/signup")
    .get(userCountroller.signupPage)
    .post(wrapAsync(userCountroller.userPost))

router
    .route("/login")
    .get(userCountroller.loginPage)
    .post(saveRedirectUrl,
        passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }), userCountroller.loginPost)
    

router.get("/logout", userCountroller.logout)

module.exports = router;
