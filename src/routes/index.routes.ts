import { Router } from 'express';
import { welcomeMessage } from '../controllers/home.controller';
import { getMatches, createMatch, deleteMatch } from '../controllers/match.controller';
import { login, createInitialAdmin } from '../controllers/auth.controller';
import { verifyToken } from '../middleware/auth';

const router = Router();

// Ruta de estado del servidor
router.get('/status', welcomeMessage);

// Rutas de Autenticación
router.post('/auth/login', login);
router.post('/auth/setup', createInitialAdmin); // Ejecutar una vez para crear el admin

// Rutas de partidos
router.get('/matches', getMatches); // Público
router.post('/matches', verifyToken, createMatch); // Protegido
router.delete('/matches/:id', verifyToken, deleteMatch); // Protegido

export default router;