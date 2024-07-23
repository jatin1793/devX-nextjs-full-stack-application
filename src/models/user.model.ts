import mongoose from "mongoose";

const user_schema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
    },
    isVerfied: {
        type: Boolean,
        default: false,
    },
})

export const User = mongoose.models.users || mongoose.model("users", user_schema);
