const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next)=>{
    const token = req.cookies.access_token
    if(!token){
        return res.status(404).send("unauthenticated")
    }
    jwt.verify(token, process.env.JWT, (err, user)=> {
        if(err){
            return res.status(404).send("Invalid token")
        }
        req.user = user
        next()
    })
}

module.exports = {verifyToken}