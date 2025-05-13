const express = require("express")
const {signup, signin} = require("../controllers/auth.js")

const router = express.Router()
// Create User
router.post("/signup", signup)

// // Sign in
router.post("/signin", signin)

// // Google auth
// router.post("./google", )

module.exports = router