import express from 'express';
import connectDB from './config/db.js';
import UserRoutes from './routes/userRoutes.js';

const app = express();

// Connect to the database
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// User routes
app.use('/api', UserRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});