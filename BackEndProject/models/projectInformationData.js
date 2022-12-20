import mongoose from "mongoose";

const projectInformationDataSchema = new mongoose.Schema({
projectsName: {
    required: true,
    type: String
},
projectDescription: {
    required: true,
    type: String
},
technologyUsed: {
required: true,
type: String
},
projectSnapshot: {
required: true,
type: String
},
projectStatus: {
    required: true,
    type: Boolean
},
});


export default mongoose.model("projectInformationData", projectInformationDataSchema);