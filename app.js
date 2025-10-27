import express from 'express';
import { MongoClient } from 'mongodb';

// Initialize Express app
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// MongoDB Connection
const url = "mongodb://localhost:27017";
const dbName = "studentDB";

//crete a new MongoClient
const client = new MongoClient(url);

let db;

async function connectToDB() {
    await client.connect();
    console.log("Connected correctly to server");
    db = client.db(dbName);
}

app.get('/api', async (req, res) => {
    // await connectToDB(); // Ensure DB connection
    const data = await db.collection('students').find({}).toArray();
    res.json(data);
});

app.post('/add-student', async (req, res) => {
    // await connectToDB();
    const studentData = req.body; //Form data from request body
    await db.collection('students').insertOne(studentData);
    res.send(`<h3>Student added Sucessfully</h3><a href="/form.html">Go Back</a>`);
});

// Start the server
app.listen(port, async () => {
    await connectToDB(); // Connect to DB before starting the server
    console.log(`Server is running on http://localhost:${port}`);
});