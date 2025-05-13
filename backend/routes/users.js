const express = require("express")
const {update, delet, getUser, subscribe, 
    unsubscribe, like, dislike} = require("../controllers/user.js")
const {verifyToken} = require("../verifyToken.js")

const router = express.Router();

// update user
router.put("/:id", verifyToken, update)

// delete user
router.delete("/:id",verifyToken, delet)

// get a user
router.get("/find/:id", verifyToken, getUser)

// subscribe
router.put("/sub/:id", verifyToken, subscribe)

// unsubscribe
router.put("/unsub/:id",verifyToken, unsubscribe)

// like a video
router.put("/like/:videoId", verifyToken, like)

// dislike a video
router.put("/dislike/:videoId", verifyToken, dislike)


module.exports = router