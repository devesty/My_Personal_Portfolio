import mongoose from "mongoose";


const emailSchema = new mongoose.Schema({
    message: {
        required: true,
        type: String
    },
    subject: {
        required: true,
        type: String
    }
});


export default mongoose.model("emailData", emailSchema);