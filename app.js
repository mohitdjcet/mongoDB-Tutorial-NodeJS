import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/jwtdemo')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
});
const User = mongoose.model('User', userSchema);

//Signup API
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    //already user?
    const exist = await User.findOne({ email });
    if (exist) {
        return res.json({ message: 'User already exists' });
    }
    
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashedPassword });

    res.json({ message: 'User created successfully' });
});

// Login API
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ message: 'User not found' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user._id }, "secretkey123",{
        expiresIn: '1h'
    });

    res.json({ message: 'Login successful', token });
});

//Middleware to verify token
const auth = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.json({ message: 'No token provided' });
    }

    try{
        const data = jwt.verify(token, "secretkey123");
        req.userId = data.id;
        next();

    } catch (err) {
        return res.json({ message: 'Invalid token' });
    }
}

// Protected Route
app.get('/profile', auth, async (req, res) => {
    const user = await User.findById(req.userId).select('-password');
    res.json({ msg:"Profile Loaded" ,user });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});