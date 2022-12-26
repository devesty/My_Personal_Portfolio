import express from "express";
import emailModel from "../models/emailModel.js";



const emailrouter = express.Router();

emailrouter.post("/post", async (req, res) => {
    const email = new emailModel({
        message: req.body.message,
        subject: req.body.subject
    });

try {
    const dataToReturn = await email.save();

    res.status(200).json(dataToReturn);
} catch (error) {
    res.status(400).json({message: error.message});
}

})

emailrouter.get("/getAllEmail", async (req, res) => {
    try {
        const dataToReturn = await emailModel.find();
        res.status(200).json(dataToReturn);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
})


export default emailrouter;

