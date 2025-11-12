import { MongoClient } from "mongodb";

const url = "mongodb+srv://mohitdecodes:Qwerty123@cluster0.picomqh.mongodb.net/?appName=Cluster0"
const dbName = "StudentDB";

async function connectDB(){
    const client = new MongoClient(url);
    try{
        await client.connect();
        console.log("Connected to MongoDB");
        return client;
    } catch(err){
        console.error("Connection failed", err);
    }
}

async function run(){
   const client = await connectDB();
   const db = client.db(dbName);
   const collection = db.collection("Student");

   const studentData = await collection.find({}).toArray();
   console.log(studentData);

}

run();