// utils/auth.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'supriyo_chat_app';  // Replace with a more secure key in production

// Hash a password
export const hashPassword = (password) => bcrypt.hashSync(password, 10);

// Compare plain password with hashed password
export const comparePasswords = (plainPassword, hashedPassword) => bcrypt.compareSync(plainPassword, hashedPassword);

// Generate JWT token
export const generateToken = (user) => {
    return jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
};

// Verify JWT token
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (e) {
        return null;
    }
};
