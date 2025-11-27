import express from 'express';
import path from 'path';
import indexRoutes from './routes/index.routes';
import { connectDB } from './config/database';

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración básica
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Carpeta para archivos públicos

// Rutas
app.use('/api', indexRoutes);

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`
            ################################################
            🛡️  Servidor de Mongolia-FC activo
            ⚽  Puerto: ${PORT}
            🔗  http://localhost:${PORT}
            ################################################
            `);
        });
    } catch (error) {
        console.error('Error fatal al iniciar:', error);
    }
};

startServer();