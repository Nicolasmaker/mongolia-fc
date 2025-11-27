import { Request, Response } from 'express';

export const welcomeMessage = (req: Request, res: Response) => {
    // Respondemos con un JSON por ahora para probar
    res.json({
        club: "Mongolia-FC",
        mensaje: "¡Servidor funcionando correctamente!",
        estado: "En línea 🟢"
    });
};