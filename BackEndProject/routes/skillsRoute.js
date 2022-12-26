import express from 'express';
import skillsInfo from '../models/skillsInformationData.js';

const skillsrouter = express.Router();


skillsrouter.post('/post', async (req,res) => {

    const model = new skillsInfo({
        skillName: req.body.skillName,
        skillPercentage: req.body.skillPercentage
    });
try {
    const dataToReturn = await model.save();

    res.status(200).json(dataToReturn);
} catch (error) {
    res.status(400).json({message:error.message});
}

})

skillsrouter.get('/get', async (req,res) => {

try {
    const dataToReturn =  await skillsInfo.find();

    res.status(200).json(dataToReturn);
} catch (error) {
    res.status(400).json({message:error.message});
}

})

//delete a skill from the database

skillsrouter.delete("/delete/:id", async (req, res) => {

    
    try {
        const id = req.params.id;
    const response = await skillsInfo.findByIdAndDelete(id);

    res.send(`Success, ${response.skillName} has been deleted from your skill set!`)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})





export  default skillsrouter;