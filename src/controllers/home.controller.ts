import { Request, Response } from 'express';
import mongoose from 'mongoose';

export const welcomeMessage = (req: Request, res: Response) => {
    const dbState = mongoose.connection.readyState;
    const estados = ['Desconectado 🔴', 'Conectado 🟢', 'Conectando 🟡', 'Desconectando 🟠'];

    res.json({
        club: "Mongolia-FC",
        mensaje: "¡Servidor funcionando correctamente!",
        estado: "En línea 🟢",
        base_de_datos: estados[dbState] || 'Desconocido'
    });
};