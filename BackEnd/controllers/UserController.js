import UserModel from "../models/UserModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

//login User
const loginUser = async(req,res) => {
    const {email,password} = req.body;
    try {
        const user = await UserModel.findOne({email});
        if(!user){
            return res.json({
                success: false,
                message: "User doesn't exists"
            })
        }
        const isMatched = await bcrypt.compare(password,user.password)
        if(!isMatched){
            return res.json({
                success: false,
                message: "Invalid credentials"
            })
        }
        const token = createToken(user._id);
        return res.json({
            success: true,
            token,
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Error during login"
        })
    }
}

const createToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// register User
const registerUser = async(req,res) => {
    const {name, password,email} = req.body;
    try {
        const exists = await UserModel.findOne({email});
        if(exists){
            return res.json({
                success: false,
                message: "User already exists"
            })
        }

        // validating email format & strong passwords
        if(!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter valid email"
            })
        }

        if(password.length<8){
            return res.json({
                success: false,
                message: "Please enter a strong Password"
            })
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new UserModel({
            name: name,
            email: email,
            password: hashedPassword
        })
        const user = await newUser.save()
        if(!user){
            console.log("error while registering")
        }
        const token = createToken(user._id)
        return res.json({
            success:true,
            token
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: " Error while registering user"
        })
    }
}

export {loginUser, registerUser}