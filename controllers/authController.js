import userModel from "../models/userModel.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


//for register new user:

async function registerController(req,res){
    try{
        const existingUser = await userModel.findOne({email:req.body.email})
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:"User already exists"
            })
        }    

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;  
        
        //rest data
        const user = new userModel(req.body);
        await user.save();
        return (
            res.status(201).send({
                success:true,
                message:"User Registered Successfully",
                user,
            })
        )

    }catch(error){ 
        console.log("Error in RegisterController: ",error)
        res.status(500).send({
            success: false,
            message: "Error in Register API",
            error
        })
    }
}


// for login existing user:

async function loginController(req,res){
    try{
        const user = await userModel.findOne({email:req.body.email});
        
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Invalid Credentials"
            });
        }

        // check role:

        if(user.role !== req.body.role){
            return res.status(500).send({
                success:false,
                message: "role does not match"
            })
        }

        //compare Password

        const comparePassword = await bcrypt.compare(req.body.password, user.password);
        if(!comparePassword){
            return res.status(500).send({
                success:false,
                message:"Invalid Credentials"
            });
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
        return res.status(200).send({
            success:true,
            message: "Login Successfull",
            token,
            user
        })

    }catch(error){
        console.log("Error in login Controller: ",error);
        res.status(500).send({
            success: false,
            message:"Error in login",
            error
        });
    }

}


//Get current User:

const currentUserController = async (req, res) => {
    try {
      const user = await userModel.findOne({ _id: req.body.userId });
    //   console.log("User in authController: ",user);
      return res.status(200).send({
        success: true,
        message: "User Fetched Successfully",
        user,
      });
      
    } catch (error) {
      console.log("Error in curretnUserController : ",error);
      return res.status(500).send({
        success: false,
        message: "unable to get current user",
        error,
      });
    }
  };


export {registerController, loginController, currentUserController};