import express from 'express';
import multer from 'multer';
import fs from 'fs'; 
import projectInfo from '../models/projectInformationData.js';

const projectRouter = express.Router();

const projectStorage = multer.diskStorage({
    destination: (req, file, cb) => {
    cb(null,"uploads" )
    },
    filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname)
    }
    })
    
    // const upload = multer({ dest: 'uploads/' }).single('snapShot')
    
    const upload = multer({ storage: projectStorage}).single('snapShot');
    
    projectRouter.post('/post', upload, async (req,res) => {

        console.log("the file we sent:", req.file);
        console.log("the body we sent:", req.body);

    const model = new projectInfo({
        projectsName: req.body.projectsName,
        projectDescription: req.body.projectDescription,
        technologyUsed: req.body.technologyUsed,
        projectSnapshot: req.file.path,
        projectStatus: req.body.projectStatus
    });
try {
    const dataToReturn = await model.save();

    res.status(200).json(dataToReturn);
} catch (error) {
    res.status(400).json({message:error.message});
}

})
 
projectRouter.get("/get", async (req, res) => {
       try {
         // const data = await projectInfoModel.find();
  let data;
        await projectInfo.find().then(result => {
          data = result;
         })

   data.forEach(element => {
        const file =  fs.readFileSync(element.projectSnapshot,"base64");
        element.projectSnapshot = file;
     });
    
    res.status(200).json(data);
   } catch (error) {
        res.status(400).json({message:error.message});
      }
     });
    
    //delete al project information from the database
    projectRouter.delete("/delete/:id", async (req, res) => {
       try {
        const id = req.params.id;
       const result = await projectInfo.findByIdAndDelete(id);
       res.status(200).json({message: `${result.projectsName} has been deleted successfully`});
       } catch (error) {
        res.status(400).json({message: error.message});
       }
    })



export  default projectRouter;