import generateToken from "../utils/generateToken.js"
import User from "../model/user.js"
import bcrypt from "bcrypt"

export const createUser = async (req,res) =>{
    const {firstName,lastName,mobile,email,password} = req.body
    try {
        const userExists = await User.findOne({email})
        if(userExists) return res.status(400).json({message:"User already exists"})

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password,salt);

            const user = await User.create({
                firstName,
                lastName,
                mobile,
                email,
                password: hashedPassword, 
            })
            if(user){
                res.status(201).json({
                    _id: user._id,
                    email: user.email,
                    token: generateToken(user._id),
                    message: "User created successfully",
                })
            }else{
                res.status(400).json({message:"Invalid User data"})
            }
    } catch (error) {
        console.error("Error in createUser:",error)
        res.status(500).json({message:"Internal Server Error"})
    }
}

