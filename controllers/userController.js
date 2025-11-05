import User from '../models/userModel.js';

//Get API to fetch all users
export const getUser = async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};

//POST API to create a new user
export const createUser = async (req, res) => {
    try{
        const user = new User(req.body);
        const result = await user.save();
        res.status(201).json({
            message: "User created successfully",
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};

//PUT API to update an existing user
export const updateUserPut = async (req, res) => {
    try{
        const { id } = req.params;

        const updatedUser = await User.findByIdAndUpdate(id,req.body,{
            new: true, // return updated data
            overwrite: true // overwrite the whole document
        });
        res.json({
            message: "User updated successfully",
            success: true,
            data: updatedUser
        })
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};

//PATCH API to partially update an existing user
export const updateUserPatch = async (req, res) => {
    try{
        const { id } = req.params;

        const updatedUser = await User.findByIdAndUpdate(id,req.body,{
            new: true, // return updated data
        });
        res.json({
            message: "User updated successfully(Patch)",
            success: true,
            data: updatedUser
        })
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};
