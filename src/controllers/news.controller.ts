import { Request, Response } from 'express';
import News from '../models/News';

export const getNews = async (req: Request, res: Response) => {
    try {
        const news = await News.find().sort({ date: -1 });
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener noticias' });
    }
};

export const createNews = async (req: Request, res: Response) => {
    try {
        const { title, content, imageUrl, imageUrl2 } = req.body;
        const newNews = new News({ title, content, imageUrl, imageUrl2 });
        await newNews.save();
        res.status(201).json(newNews);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear noticia' });
    }
};

export const deleteNews = async (req: Request, res: Response) => {
    try {
        await News.findByIdAndDelete(req.params.id);
        res.json({ message: 'Noticia eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar noticia' });
    }
};