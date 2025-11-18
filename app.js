import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5001;

app.use(cors({
    origin: ['http://localhost:3000','https:xyz.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
})); 

//menual cors configuration
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
// }

app.get('/api/message', (req, res) => {
    res.json({ message: 'Hello from the Node.js!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});