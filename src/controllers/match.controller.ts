import { Request, Response } from 'express';
import Match from '../models/Match';

// Obtener todos los partidos
export const getMatches = async (req: Request, res: Response) => {
    try {
        const matches = await Match.find().sort({ date: 1 });
        res.json(matches);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los partidos', error });
    }
};

// Crear un nuevo partido
export const createMatch = async (req: Request, res: Response) => {
    try {
        const { date, home, away, location, time } = req.body;
        const newMatch = new Match({ date, home, away, location, time });
        await newMatch.save();
        res.status(201).json(newMatch);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el partido', error });
    }
};

// Eliminar un partido
export const deleteMatch = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Match.findByIdAndDelete(id);
        res.json({ message: 'Partido eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el partido', error });
    }
};
