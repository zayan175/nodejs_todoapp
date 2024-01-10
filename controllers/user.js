const user = require("../models/user");
const bcrypt = require ('bcrypt')
const jwt = require("jsonwebtoken");
const sendCookie = require("../utils/features");
const errorMiddleWare = require("../middlewares/error");


const register = async(req,resp)=>{
    try {
        const {name,email,password} = req.body;
    let users = await user.findOne({email});

if(users)return next(new Error("User Already Exist"))
    

const hashedPassword = await bcrypt.hash(password,10);

       users = await user.create({name,email,password : hashedPassword});

    sendCookie(users,resp,"Registerd Successfully",201)
        
    } catch (error) {

        next(error)
        
    }

}
const login = async(req,resp,next)=>{

    try {

        const{email,password}= req.body;
        const users = await user.findOne({email}).select("+password");
        
        if(!users)return next(new Error("Invalid Email or Password"))
        
        
        const isMatch = await bcrypt.compare(password,users.password)
        
        
        if(!isMatch)return next(new Error("Invalid Email or Password"))
        
        
        sendCookie(users,resp,`Welcome Back!, ${users.name}`,200)
        
    } catch (error) {

        next(error)
        
    }

}

const getMyProfile = (req,resp)=>{
    resp.status(200).json({
        success : true,
        users: req.user,
    })

}

const logout = async(req,resp)=>{

    try {
        resp.status(200).json({
            success : true,
            users: req.user,
        })
        
    } catch (error) {

        next(error)
        
    }
    

}


module.exports ={
    getMyProfile,
    register,
    login,
    logout,
}
