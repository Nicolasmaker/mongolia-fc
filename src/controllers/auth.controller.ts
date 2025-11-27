import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Login
export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // Buscar usuario
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });

        // Verificar contraseña
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });

        // Crear token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || 'secret');

        res.header('Authorization', token).json({ token, username: user.username });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Crear Admin Inicial (Solo para uso interno/setup)
export const createInitialAdmin = async (req: Request, res: Response) => {
    try {
        const exists = await User.findOne({ username: 'admin' });
        if (exists) return res.status(400).json({ message: 'El admin ya existe' });

        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('mongolia2025', salt);

        const user = new User({
            username: 'admin',
            password: hashedPassword
        });

        await user.save();
        res.json({ message: 'Admin creado exitosamente' });
    } catch (error) {
        res.status(500).json({ error });
    }
};