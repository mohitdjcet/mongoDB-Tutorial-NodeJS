import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || 'My App';
const SECRET_KEY = process.env.SECRET_KEY

app.get('/', (req, res) => {
    res.send(`
        <h1>Welcome to ${APP_NAME}</h1>
        <p>Your secret key is: ${SECRET_KEY}</p>
    `);
});

app.listen(PORT, () => {
    console.log(`${APP_NAME} is running on http://localhost:${PORT}`);
});