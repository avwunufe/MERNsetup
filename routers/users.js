const express = require('express');
const router = express.Router();
const User = require("../models/users")
const loginAuth = require("../jwtauth")
const bcrypt = require("bcryptjs")
const { registerValidation, loginValidation } = require("../validation")
//user Sign up route
router.post('/signup', async (req, res) => {

    const {error} = await registerValidation(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });
    const emailExist = await User.findOne({ Email: req.body.Email });
    if (emailExist) return res.status(422).send({ message: "Email already exists!" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.Password, salt)
    try {
        const newUser = await User.create({
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
            Password: hashedPassword,
            role: req.body.role
        });
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (error) {
        res.status(400).send()
    }
});
//user Sign in route
router.post('/signin', async (req, res, next) => {
    const { error } = await loginValidation(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });
    const validUser = await User.findOne({ Email: req.body.Email });
    if (!validUser) return res.status(400).send({ message: "Invalid Email" });
    try {
        const user = await bcrypt.compare(req.body.Password, validUser.Password);
        if (!user) return res.status(400).send({ message: "Invalid login credentials" });
       const token = await user.generateAuthToken()
        res.send({user, token})

    } catch (error) {
        res.status(400).send()
    }
});
// Get user profile route
router.get("/me", loginAuth, async (req, res)=>{
    res.send(req.user)
} )

//user logout route
router.post("/logout", loginAuth, async (req, res)=>{
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            token.token !== req.token
        })
        await req.user.save()
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router