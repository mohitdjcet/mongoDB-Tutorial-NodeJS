import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello, Cokkies!');
});

app.get('/setCookie', (req, res) => {
    res.cookie("username","Mohit Kumar",{
        maxAge: 1000 * 60 * 2, // 2 Minutes
        httpOnly: true,
        sameSite: "strict"
    });
    res.send('Cookie has been set');
});

app.get('/getCookie', (req, res) => {
    const username = req.cookies.username;
    res.send(`Username from cookie: ${username}`);
});

app.get('/clearCookie', (req, res) => {
    res.clearCookie("username");
    res.send('Cookie has been cleared');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});