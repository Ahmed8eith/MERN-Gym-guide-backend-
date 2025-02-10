import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from './routes/auth.js'
import routineRoutes from "./routes/userRoutine.js"

dotenv.config();

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth',authRoutes)
app.use('/api/routines',routineRoutes)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });

app.get('/',(req,res)=>{
    res.send('Gym Guide!')
})

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server running on port: ${PORT}`)
})