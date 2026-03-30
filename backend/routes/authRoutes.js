import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "./models/UserModel.js";

const router = express.Router();

// ✅ Register
router.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // 1. Check if user exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // 2. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Save user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "user"
        });

        // 4. Sign JWT
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });
    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Find user
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // 2. Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // 3. Sign JWT
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;