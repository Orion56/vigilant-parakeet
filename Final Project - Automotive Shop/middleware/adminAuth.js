const User = require('../db/models/user.model')
const jwt = require('jsonwebtoken')
const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")
        const decoded = jwt.verify(token, process.env.TknEncrypKey)
        const user = await User.findOne({
            _id: decoded._id,
            "tokens.token": token,
            admin:true
        })
        if (!user) throw new Error("invalid credintials")
        user = req.user
        token = req.token
        next()
    } catch (error) {
        res.status(500).send({
            apiStatus: false,
            errors: error.message,
            message:"Unauthorized user"
        })
    }
}
module.exports = adminAuth
