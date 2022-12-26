import express from 'express';
import eduInfo from '../models/educationalInformationModel.js';
import authMiddleware from "../middleware/auth.js";

const edurouter = express.Router();

//'/post' can be anything. eg '/addNewEducation'
edurouter.post('/post', authMiddleware,async (req,res) => {

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

edurouter.get('/get', authMiddleware, async (req,res) => {

try {
    const dataToReturn =  await eduInfo.find();

    res.status(200).json(dataToReturn);
} catch (error) {
    res.status(400).json({message:error.message});
}

})

edurouter.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const response = await eduModel.findByIdAndDelete(id);

    res.send(`Succes, ${response.institutionAttended} has been deleted. `);

    } catch (error) {
     res.status(400).json({message: error.message});
    }
})

//update an educational information from the database
edurouter.patch("update/:id", async (req, res) => {

    const data = eduModel.findById(req.params.id);
    if(data !== null){
        if(req.body.degreeObtained != null){
            data.degreeObtained = req.body.degreeObtained;
            data.update();
        };
        if(req.body.institutionAttended != null){
            data.institutionAttended= req.body.institutionAttended;
            data.update();
        };
        if(req.body.degreeObtained != null){
            data.degreeObtained = req.body.degreeObtained;
            data.update();
        }
    }
    
})


export  default edurouter;