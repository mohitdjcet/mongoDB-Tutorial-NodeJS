import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

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

app.put("/update-student/:id", async (req, res) => {
    const id = req.params.id;
    const newData = req.body;

    //validation: ID CHECK
    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid student ID' });
    }

    // Validation: Body Empty Check
    if (Object.keys(newData).length === 0) {
        return res.status(400).json({ error: 'Request body cannot be empty' });
    }

    const result = await db.collection('students').replaceOne(
        { _id: new ObjectId(id) },
        newData
    );

    if (result.matchedCount === 1) {
        res.json({ message: 'Student updated successfully' });
    } else {
        res.status(404).json({ error: 'Student not found' });
    }
})

app.patch("/update-student/:id", async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;

    //validation: ID CHECK
    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid student ID' });
    }

    // Validation: Body Empty Check
    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: 'Request body cannot be empty' });
    }

    const result = await db.collection('students').updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
    );

    if (result.matchedCount === 1) {
        res.json({ message: 'Student updated successfully' });
    } else {
        res.status(404).json({ error: 'Student not found' });
    }
})

app.delete("/delete-student/:id", async (req, res) => {
    const id = req.params.id;

    //Step-1: Validate the ID
    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid student ID' });
    }

    //step-2: Delete the student
    const result = await db.collection('students').deleteOne({ _id: new ObjectId(id) });

    //step-3: Check if a student was deleted
    if ( result.deletedCount === 1) {
        res.json({ message: 'Student deleted successfully' });
    } else {
        res.status(404).json({ error: 'Student not found' });
    }
});

// Start the server
app.listen(port, async () => {
    await connectToDB(); // Connect to DB before starting the server
    console.log(`Server is running on http://localhost:${port}`);
});