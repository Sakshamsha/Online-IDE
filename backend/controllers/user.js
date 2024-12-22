const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signUp = async(req,res) => {
   try {
    const {name,userName,email,password} = req.body;

    console.log("hello saksham -1 ");

    if(!name || !userName || !email || !password){
        return res.status(400).json({
            success:false,
            message:"All fields are required",
        })
    }

    console.log("printing the data :");
    console.log("name = ",name);
    console.log("userName = ",userName);
    console.log("userName = ",email);
    console.log("userName = ",password);

    const findEmail = await User.findOne({email:email});

    
    if(findEmail){
        return res.status(400).json({
            success:false,
            message:"User already exist with this mail Id",
        })
    }

    const hashPassword = await bcrypt.hash(password,10);

    const user = await User.create({
        name:name,
        userName:userName,
        email:email,
        password:hashPassword,
    });

    return res.status(200).json({
        success:true,
        message:"User created successfully",
        data:user,
    })
   }
    catch (error) {
    return res.status(400).json({
        success:false,
        message:"There is some error in signUp"
    })
   }
}

exports.login = async(req,res) => {
    try {
        const {email,password} = req.body;
        console.log("printing the given data : ",email , " ",password);

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:'All fields are required'
            })
        }

        const userDetails = await User.findOne({email:email});

        if(!userDetails){
            return res.status(500).json({
                success:false,
                message:"No user find with this mailId,please Signup first",
            })
        }

        console.log("Printing the user details : ",userDetails);

        const flag = await bcrypt.compare(password,userDetails.password)
        console.log("Printing the flag : ",flag);

        if(flag){
            const payload = {
                email:userDetails.email,
                id:userDetails._id,
            }
            console.log('hello in bcrypt ');

            const token = jwt.sign(payload,process.env.JWT_SECRET);

            return res.status(200).json({
                success:true,
                message:"User logged in successfully",
                token:token,
                userID:userDetails._id
            })
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Password is incorrect",
            })
        }
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"There is some error in login of user",
            error:error.message,
        })
    }
}

exports.getUserDetails = async(req,res) =>{
    try{
        const {userID} = req.body;

        if(!userID){
            return res.status(400).json({
                success:false,
                message:"Please mention the userID",
            })

        }

        const userDetails = await User.findOne({_id:userID});

        if(!userDetails){
            return res.status(400).json({
                success:false,
                message:"User Details not found with this userID"
            })
        }

        return res.status(200).json({
            success:true,
            message:"UserDetails fethed successfully",
            data:userDetails,
        })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"There is some error in fetching user Details"
        })
    }
}

