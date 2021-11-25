import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

import UserModel from "../models/userModel.js";

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email });
        if(!existingUser) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) 
            return res.status(400).json({ message: "Invalid credentials" });
        
        const token = jwt.sign({ email: existingUser.email, id: existingUser.id }, 'test');

        res.status(200).json({ result: existingUser, token});
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

export const signUp = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email });

        if(existingUser) 
            return res.status(400).json({ message: "User already exist" });

        if(password !== confirmPassword)  
            return res.status(400).json({ message: "Passwords don't match" });

        const hashedPass = await bcrypt.hash(password, 12);

        const newUser = await UserModel.create({ email, password: hashedPass, name: `${firstName} ${lastName}`});
        
        const token = jwt.sign({ email: newUser.email, id: newUser.id }, 'test');
        res.status(200).json({ result: newUser, token});
    } catch (error) {
        res.status(500).json({ message: `Something went wrong. Error: ${error.message}` });
    }
}