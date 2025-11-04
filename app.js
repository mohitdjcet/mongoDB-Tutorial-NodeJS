import mongoose from "mongoose";

const dbConnection = async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/studentDB");
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection error:", error);
    }
}
dbConnection();

// Define a schema for Student
const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    city: String
});

// Create a model for Student
const studentModel = mongoose.model("students", studentSchema);

//Fetch Data from DB
const getStudents = async () => {
    try {
        const students = await studentModel.find({});
        console.log("Students Data:", students);
    } catch (error) {
        console.error("Error fetching students:", error);
    }
}
getStudents();