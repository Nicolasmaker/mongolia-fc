import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Login
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario por email
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Correo o contraseña incorrectos' });

        // Verificar contraseña
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Correo o contraseña incorrectos' });

        // Crear token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || 'secret');

        res.header('Authorization', token).json({ 
            token, 
            user: { nombre: user.nombre, email: user.email } 
        });
    } catch (error: any) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Error en el servidor: ' + (error.message || error), error });
    }
};

// Registro de Usuario
export const register = async (req: Request, res: Response) => {
    try {
        const { nombre, apellido, edad, email, password } = req.body;

        // Validar si ya existe
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: 'El correo ya está registrado' });

        // Encriptar contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            nombre,
            apellido,
            edad,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario', error });
    }
};