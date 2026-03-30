import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const register = async (req, res) => {
    const { name, email, password, role = "user" } = req.body; 
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role });
    const { password: _, ...userData } = user.toJSON();
    res.json(userData);
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
};