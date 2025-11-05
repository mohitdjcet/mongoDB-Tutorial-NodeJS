import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    city: String
});

const User = mongoose.model("students", userSchema);

export default User;