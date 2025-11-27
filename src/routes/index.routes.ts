import { Router } from 'express';
import { welcomeMessage } from '../controllers/home.controller';
import { getMatches, createMatch, deleteMatch } from '../controllers/match.controller';

const router = Router();

// Ruta de estado del servidor
router.get('/status', welcomeMessage);

// Rutas de partidos
router.get('/matches', getMatches);
router.post('/matches', createMatch);
router.delete('/matches/:id', deleteMatch);

export default router;