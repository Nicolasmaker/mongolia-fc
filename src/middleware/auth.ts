import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. Se requiere token.' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        (req as any).user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token inválido.' });
    }
};