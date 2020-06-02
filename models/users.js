const mongoose = require("mongoose")
const Schema = mongoose.Schema
jwt = require("jsonwebtoken")
const userSchema = new Schema({
    name: {
        type: String
    },
    password: {
        type: String
    },
    tokens: [{token:{
        type: String
    }}]
})

userSchema.methods.generateAuthToken = async function(){
    user = this
    const token = await jwt.sign({_id: user._id.toString()}, "secretkeythatiused")
    user.tokens = user.tokens.concat({token: token})
    await user.save
    return token
}
module.exports = mongoose.model("User", userSchema)