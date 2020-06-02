const jwt = require("jsonwebtoken")
const User = require("./models/users")

const auth = async (req, res, next) => {
    try {
        const token = re.header(Authorization).replace("Bearer ", "");
        const decoded = await jwt.verify(token, "secretkeythatiused")
        const user = User.findOne({_id:decoded._id, "tokens.token": token})
        if(!user){
            throw new Error()
        }
        req.token = token
        req.user =  user
        next()
    } catch (error) {
        res.status(401).send({error: "Please authenticate"})
    }
}

module.exports = auth