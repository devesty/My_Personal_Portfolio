import mongoose from "mongoose";

const skillsInformationDataSchema = new mongoose.Schema({
    skillName: {
        required: true,
        type: String
    },
    skillPercentage: {
    required: true,
    type: Number
    },
});
    
    
    export default mongoose.model("skillsInformationData", skillsInformationDataSchema);