import mongoose from "mongoose";

const userInformationDataSchema = new mongoose.Schema({
    firstName: {
        required: true,
        type: String
    },
    lastName: {
    required: true,
    type: String
    },
    sex: {
    required: true,
    type: String
        },
    email: {
    required: true,
    type: String
            },
    dateOfBirth: {
    required: true,
    type: Date
    },
    profilePhoto: {
    required: true,
    type: String
    },
    backgroundImage: {
        required: true,
        type: String
    },
    address: {
        required: true,
        type: String
    },
    phoneNumber: {
        required: true,
        type: String
    },
    passwordHash: {
        required: true,
        type: String
    }
    });
    
    
    export default mongoose.model("userInformationData", userInformationDataSchema);