import { Router } from 'express';
import { welcomeMessage } from '../controllers/home.controller';
import { getMatches, createMatch, deleteMatch } from '../controllers/match.controller';
import { login, register } from '../controllers/auth.controller';
import { getNews, createNews, deleteNews } from '../controllers/news.controller';
import { verifyToken } from '../middleware/auth';

const router = Router();

// Ruta de estado del servidor
router.get('/status', welcomeMessage);

// Rutas de Autenticación
router.post('/auth/login', login);
// router.post('/auth/register', register); // Registro público deshabilitado

// Rutas de partidos
router.get('/matches', getMatches); // Público
router.post('/matches', verifyToken, createMatch); // Protegido
router.delete('/matches/:id', verifyToken, deleteMatch); // Protegido

// Rutas de noticias
router.get('/news', getNews); // Público
router.post('/news', verifyToken, createNews); // Protegido
router.delete('/news/:id', verifyToken, deleteNews); // Protegido

export default router;