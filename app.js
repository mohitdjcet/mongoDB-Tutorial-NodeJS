import express from 'express';
import multer from 'multer';
import path from 'path';

const app = express();
const PORT = 3001;


//Step-1: Store Configuration
const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null, 'uploads/')
    },
    filename: function (req,file,cb){
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
})

//Step-2: Upload Middleware
const upload = multer({storage: storage});

//Step-3 : Craete upload folder if not exists
import fs from 'fs';
if (!fs.existsSync('uploads')){
    fs.mkdirSync('uploads');
}

//Step-4: Create Routes
app.get('/', (req, res) => {
    res.send(`
        <h1>File Upload Server</h1>
        <form method="POST" action="/upload" enctype="multipart/form-data">
            <input type="file" name="myfile" />
            <button type="submit">Upload File</button>
        </form>
    `);
});

//Setp-5 : File Upload Endpoint
app.post('/upload', upload.single('myfile'), (req, res) => {
    console.log(req.file);
    res.send('File uploaded successfully: ' + req.file.filename);
});

//Step-6: Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});