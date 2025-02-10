import express from 'express'
import protect from '../middlewares/protected.js'
import routines from '../models/routines.js'
import User from '../models/user.js'

const router = express.Router()


//get userName

router.get('/username/:id',async(req,res)=>{
    try {
        const user= await User.findById(req.params.id)
        if(!user){return res.status(404).json({message: 'User not found'})}

        res.json({username: user.username})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.get('/user-routine',protect,async(req,res)=>{
    try {
        const userRoutines=await routines.find({userId:req.userId})
        res.json(userRoutines)
    } catch (error) {
        res.status(500).json({ error: error.message })

    }
})

router.post('/user-routine',protect,async(req,res)=>{
    try {
         await new routines({
            title:req.body.title,
            workouts:req.body.workouts,
            userId:req.userId
        }).save()
        res.status(201).json({message:'Routine created'})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})

router.put('/user-routine/:id', protect, async(req,res)=>{
    try {
        const updatedRoutine = await routines.findOneAndUpdate(
            {_id: req.params.id, userId: req.userId},
            { $set: {    // explicitly use $set
                title: req.body.title,
                workouts: req.body.workouts
            }},
            {new: true}
        )
        if (!updatedRoutine) {
            return res.status(404).json({message: "Routine not found"})
        }
        res.json({
            message: "Updated!",
        })
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.delete('/user-routine/:id',protect, async(req,res)=>{
    try {
        await routines.findOneAndDelete({_id:req.params.id,userId:req.userId})
        res.json({message:'routine deleted succsefully!'})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
export default router

