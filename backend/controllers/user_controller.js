import { User } from "../models/user_model.js";

import bcrypt from "bcryptjs"

import jwt from "jsonwebtoken"
export const register = async(req,res) =>{

    try {
        const {firstName, lastName, email,password} =req.body;

        if(!firstName || !lastName || !email ||!password){
            return res.status(400).json({
        
                success:false,

                message:"all fields required"
            })

        }

        const emailRegx = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!emailRegx.test(email)){
            return res.status(400).json({
                success: false,
                message:"invalid email"
            })
        }

        if (password.length<6){
            return res.status(400).json({
                success: false,
                message:"password must be atleast 6 characters"
            })
        }

         const existingEmail = await User.findOne({email:email})

         if(existingEmail){
            return res.status(400).json({
                success: false,
                message:"email already exist"
            })
         }

         const hashPassword = await bcrypt.hash(password,10)

         await User.create(
            {
                firstName,lastName,email,password: hashPassword
            }

            
         )

         return res.status(201).json({
            success: true,
            message:"Account created successfully!"
        })

        
    }
    
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success : false,
            message:"Failed to register"
        })
    }
}


export const login =  async(req,res) =>{

    try {
        const {email,password} = req.body;
        if(!email|| !password) {
            return res.status(400).json({
                success:false,
                message:"enter email and password"
            })

        }

        let user =await User.findOne({email})
        if(!user) 
        {
            return res.status(400).json({
                success:false,
                message:"No user found"
            }) 
        }
        const isPass = await bcrypt.compare(password,user.password)
        if(!isPass){
            return res.status(400).json({
                success:false,
                message:"incorrect password"
            })
        }
        const token = await jwt.sign({userId:user._id},process.env.PASS_KEY,{expiresIn:"1d"})
        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpsOnly:true,sameSite:"strict"}).json({
            success:true,
            message:`Welcome back ${user.firstName}`,user
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success : false,
            message:"Failed to login"
        })  
    }
}


export const logout = async(_,res) =>{
    try {

        return res.status(200).cookie("token","",{maxAge:0}).json({
            message: "Logout success",
            success:true
        })
        
    } catch (error) {
        console.log(error)
        
    }
}


export const myprofile =  async(req,res) =>{

    try {
        const {userid} = req.body;
        

        let user =await User.findOne({_id:userid})
        if(!user) 
        {
            return res.status(400).json({
                success:false,
                message:"No user found"
            }) 
        }

        res.status(200).json({
            success:true,
            message:user
        })
         
         console.log(`user name ${user.firstName}`);
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success : false,
            message:"Failed to login"
        })
    }
}


export const updateProfile = async(req,res) =>{

    try {

        const {userid, firstName,lastName} = req.body;
        let user = await user.findByIdAndUpdate(
            userid,

            {$set:{firstName,lastName}},
            {new:true,runValidators:true}
        
        );
        if (!user)
        {
            return res.status(400).json({
                success:false,
                message:"user not found!"
            })
        }

         
 
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user,
          });
        
    } catch (error) {

        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Failed to update profile",
          });
        
    }
}
