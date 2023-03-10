const jwt=require('jsonwebtoken')
const User=require('../models/User')
const {UnauthenticatedError} =require('../errors')

const auth=(req,res,next)=>{
const authHeader=req.headers.authorization
if(!authHeader || !authHeader.startsWith("Bearer "))
{
    throw new UnauthenticatedError('Authentication invalid')
}
const token=authHeader.split(' ')[1]
try {
    const payload=jwt.verify(token,process.env.JWT_KEY)
    // const user=User.findById(payload.id).select('-password')
    // req.user=user
    req.user={userId:payload.userId,name:payload.name}
    next()
} catch (error) {
 throw new UnauthenticatedError('Authentication invalid')
}
}
module.exports=auth