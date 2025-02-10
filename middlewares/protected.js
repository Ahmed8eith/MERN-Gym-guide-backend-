import jwt from "jsonwebtoken"

const protect = async (req, res, next) => {
    try {
        const token=req.header("Authorization")?.replace('Bearer ','')

        if(!token){
            return res.status(401).json({message: 'Access denied, user is not authorized'})
        }

        const verified=jwt.verify(token,process.env.JWT_SECRET)
        req.userId=verified.userId
        next()
    } catch (error) {
        res.status(401).json({message:'Invalid Authorization'})
    }    
}

export default protect