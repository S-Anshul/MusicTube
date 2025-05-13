const user = require("../models/User.js")
const Video = require("../models/Video.js")

const update = async (req, res, next) =>{
    if(req.params.id === req.user.id){
        try{
            const update_user = await user.findByIdAndUpdate(req.params.id, {
                $set:req.body
            },
            {new: true}
            )
            res.status(200).json(update_user)
        }catch(err){
            res.status(404).json("This is not valid ")
        }
    }
    else{
        res.status(404).json("You cannot update this")
    }
}

const delet = async (req, res, next) =>{
    if(req.params.id === req.user.id){
        try{
            await user.findByIdAndDelete(req.params.id, {
                $push:{subscribedUsers:req.params.id}
            })
            res.status(200).json("User is deleted")
        }catch(err){
            res.status(404).send("This is not valid ")
        }
    }
    else{
        res.status(404).send("You cannot Delete this")
    }
}

const getUser = async (req, res, next) =>{
    try{
        const get_user = await user.findById(req.params.id)
        res.status(200).json(get_user)
    }catch{
        res.status(404).send("could not get user")
    }
}

const subscribe = async (req, res, next) =>{
    try{
        await user.findByIdAndUpdate(req.params.id, {
            $push: { subscribedUser: req.user.id },
        })
        await user.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1},
        })
        res.status(200).json("Subscription done")
    }catch(err){
        res.status(404).send(err)
    }
}

const unsubscribe = async (req, res, next) => {
    try {
    await user.findByIdAndUpdate(req.params.id, {
        $pull: { subscribedUser: req.user.id },
    });
    await user.findByIdAndUpdate(req.params.id, {
        $inc: { subscribers: -1 },
    });
    res.status(200).json("Unsubscription successfull.")
    } catch (err) {
    next(err);
    }
  };

const like = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
      const updated_video = await Video.findByIdAndUpdate(videoId,{
        $addToSet:{likes:id},
        $pull:{dislikes:id}
      }, 
      {new: true})
      res.status(200).json(updated_video)
    } catch (err) {
      next(err);
    }
  };
  
const dislike = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
    const updated_video = await Video.findByIdAndUpdate(videoId,{
        $addToSet:{dislikes:id},
        $pull:{likes:id}
    },
    {new: true})
    res.status(200).json(updated_video)
} catch (err) {
    next(err);
}
};

module.exports = {update, delet, getUser, subscribe, 
                unsubscribe, like, dislike} 
