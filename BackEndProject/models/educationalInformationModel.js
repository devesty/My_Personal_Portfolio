import mongoose from "mongoose";

const educationalInformationDataSchema = new mongoose.Schema({
institutionAttended: {
required: true,
type: String
},
yearAttended: {
required: true,
type: Date
},
yearFinished: {
required: true,
type: Date
},
degreeObtained: {
required: true,
type: String
}
});


export default mongoose.model("educationalInformationData", educationalInformationDataSchema);


