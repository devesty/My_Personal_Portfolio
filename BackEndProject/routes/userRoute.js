import express from "express";
import multer from "multer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import  dotenv from "dotenv";
import userInfo from "../models/userInformationData.js";
import { Mongoose } from "mongoose";

dotenv.config();

const projectStorage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null,"uploads" )
    },
    filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname)
    }
    })

    const upload = multer({storage: projectStorage})

    // upload.fields([{name: 'profilePicture', maxCount:1}, {name: 'backgroundPhoto', maxCount:1}])

    const userRoute = express.Router();

    //create the endpoint to add a new user
    userRoute.post("/post",upload.fields([
        {name: 'profilePicture', maxCount:1}, 
        {name: 'backgroundPhoto', maxCount:1}]), 
        async (req,res) => {
        const data = new userInfo({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email.toLowerCase(),
            sex: req.body.sex,
            address: req.body.address,
            dateOfBirth: req.body.dateOfBirth
        })
//get each files
    const filesArray = Object.values(req.files);
    if(filesArray.length > 0){
    const profilePhotoField = 'profilePicture';
    const backgroundImageField = 'backgroundPhoto'
    const profilePhoto = filesArray[0].find((file) => file.fieldname === profilePhotoField);
    if(profilePhoto)
    data.profilePhoto = profilePhoto.path;

    const backgroundPhoto = filesArray[1].find((file) => file.fieldname === backgroundImageField);
    if(backgroundPhoto)
    data.backgroundImage = backgroundPhoto.path;
}
       try {
    
//get token key from env to sign token
const tokenKey = process.env.TOKEN_KEY;
//generate password hash
const salt = bcrypt.genSaltSync(10);
let passwordHash = await bcrypt.hash(req.body.password, salt);
data.passwordHash = passwordHash;
const response = await data.save();

//generate signed token
const token = jwt.sign({userid:response._id,
     email: response.email,
     firstName: response.firstName, 
     lastName: response.lastName },
    tokenKey, { expiresIn: "10h",})

    response.token = token;

    res.status(200).json(response);

} catch (error) {
        res.status(400).json({message: error.message});
       }
    })



    //endpoint to login a user
    userRoute.post("/login", async (req, res) => {
   try {
    let foundUser = await userInfo.findOne((data) =>  data.email === req.body.email);
    if(foundUser) {

        const ispasswordMatch = await bcrypt.compare(req.body.password, foundUser.passwordHash);

        if(ispasswordMatch === true){

            //create a jwt token
            const token = jwt.sign({userid: foundUser._id,
                 firstName: foundUser.firstName,
                 lastName: foundUser.lastName,
                 email: foundUser.email
                })

                res.status(200).json(token);
        }else{
            res.status(401).json({message: "invalid email or password"});

        }

    }
} catch (error) {
    res.status(400).json({message:error.message});
}



// const user
    })

    // endpoint to get all user
    userRoute.get("/getAllUsers", async (req, res) => {
        try {
            const users = await userInfo.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(400).json({message:error.message});
        }
    })

    userRoute.get("/get/:id", async (req, res) => {
        try {
          const user = await userInfo.findById(req.params.id);
          res.status(200).json(user);   
        } catch (error) {
            res.status(400).json({message:error.message});
        }
    })
userRoute.delete("/deleteAllUsers/:id", async (req, res) => {
    try {
        const user = await userInfo.findByIdAndDelete(req.params.id);
          res.status(200).json(user);   
    } catch (error) {
        res.status(400).json({message:error.message});
    }
})
export default userRoute;







