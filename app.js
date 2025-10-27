import express from 'express';
import { MongoClient } from 'mongodb';

// Initialize Express app
const app = express();
const port = 3000;

app.use(express.json());

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
    const data = await db.collection('students').find({}).toArray();
    res.json(data);
});

app.post('/add-student', async (req, res) => {
    const { Name, age, city} = req.body;

    //Basic validation
    if (!Name || !age || !city) {
        return res.status(400).json({ error: 'Please provide Name, age, and city' });
    }

    // Insert the new student into the database
    const result = await db.collection('students').insertOne({ Name, age, city });

    res.status(201).json({
        message: 'Student added successfully',
        studentId: result.insertedId
    })
});


// Start the server
app.listen(port, async () => {
    await connectToDB(); // Connect to DB before starting the server
    console.log(`Server is running on http://localhost:${port}`);
});