import express from 'express';
import { MongoClient } from 'mongodb';

// Initialize Express app
const app = express();
const port = 3000;

//EJS Templating Engine
app.set('view engine', 'ejs');

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
    await connectToDB(); // Ensure DB connection
    const data = await db.collection('students').find({}).toArray();
    res.json(data);
});

app.get('/ui', async (req, res) => {
    await connectToDB(); // Ensure DB connection
    const data = await db.collection('students').find({}).toArray();
    res.render('index', { students: data });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});