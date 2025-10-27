import express from 'express';
import { MongoClient } from 'mongodb';

// Initialize Express app
const app = express();
const port = 3000;

// MongoDB Connection
const url = "mongodb://localhost:27017";
const dbName = "studentDB";

//crete a new MongoClient
const client = new MongoClient(url);

// Middleware to parse JSON
app.use(express.json());

//Routes
app.get('/data',async (req , res)=>{
    try{
        // Connect to MongoDB
        await client.connect();
        console.log("Connected correctly to server");

        const db = client.db(dbName);
        const collection = db.collection('students');

        // Fetch all documents
        const data = await collection.find({}).toArray();

        res.json(data);

    }catch(err){
        console.error(err);
        res.status(500).send({error: 'An error occurred'});
    }
})

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});