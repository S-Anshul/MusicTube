const express = require("express");
const {addVideo, updateVideo, deleteVideo, getVideo, addView, random, trend, sub, getByTag, search} = require("../controllers/video.js");
const { verifyToken } =  require("../verifyToken.js");

const router = express.Router();

//create a video
router.post("/", verifyToken, addVideo)
router.put("/:id", verifyToken, updateVideo)
router.delete("/:id", verifyToken, deleteVideo)
router.get("/find/:id", getVideo)
router.put("/view/:id", addView)
router.get("/trend", trend)
router.get("/random", random)
router.get("/sub",verifyToken, sub)
router.get("/tags", getByTag)
router.post("/search", search)

module.exports = router;