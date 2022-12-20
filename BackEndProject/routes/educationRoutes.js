import express from 'express';
import eduInfo from '../models/educationalInformationModel.js';

const edurouter = express.Router();

//'/post' can be anything. eg '/addNewEducation'
edurouter.post('/post', async (req,res) => {

    const model = new eduInfo({
        institutionAttended: req.body.institutionAttended,
        degreeObtained: req.body.degreeObtained,
        yearAttended: req.body.yearAttended,
        yearFinished: req.body.yearFinished
    });
try {
    const dataToReturn = await model.save();

    res.status(200).json(dataToReturn);
} catch (error) {
    res.status(400).json({message:error.message});
}

})

edurouter.get('/get', async (req,res) => {

try {
    const dataToReturn =  await eduInfo.find();

    res.status(200).json(dataToReturn);
} catch (error) {
    res.status(400).json({message:error.message});
}

})




export  default edurouter;