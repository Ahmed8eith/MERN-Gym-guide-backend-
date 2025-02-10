import express from "express"
import user from "../models/user.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import protect from "../middlewares/protected.js"

const router = express.Router()


//Register
router.post('/register', async(req, res) => {
    try {
        const existingUser = await user.findOne({username: req.body.username})
        if(existingUser) {
            return res.status(400).json({message: "Username already exists"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        //Create new user
        const newUser = new user({
            username: req.body.username,
            password: hashedPassword
        })

        const savedUser = await newUser.save()

        //token
        const token = jwt.sign(
            {userId: savedUser._id},
            process.env.JWT_SECRET,
            {expiresIn: '5d'}
        )

        res.status(201).json({
            message:"registered succefully",
            token:token
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

//login
router.post('/login', async(req, res) => {
    try {
        const existingUser = await user.findOne({username: req.body.username})
        if(!existingUser) {
            return res.status(400).json({message: 'User not found'})
        }

        const validPassword = await bcrypt.compare(req.body.password, existingUser.password)
        if(!validPassword) {
            return res.status(400).json({message: 'Invalid password'})
        }

        const token = jwt.sign(
            {userId: existingUser._id},
            process.env.JWT_SECRET,
            {expiresIn: '5d'}
        )
        
        res.json({
            message:"logged in!",
            token:token,
            userId:existingUser._id
        })  
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

export default router