import User from '../models/userModel.js';

export const getUser = async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};