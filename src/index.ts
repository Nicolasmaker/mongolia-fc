import express from 'express';
import path from 'path';
import indexRoutes from './routes/index.routes';
import { connectDB } from './config/database';

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a Base de Datos (sin detener el servidor si falla)
connectDB().catch(err => console.error('⚠️ La base de datos no conectó, pero el servidor sigue activo:', err));

// Configuración básica
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Carpeta para archivos públicos

// Rutas
app.use('/api', indexRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`
    ################################################
    🛡️  Servidor de Mongolia-FC activo
    ⚽  Puerto: ${PORT}
    🔗  http://localhost:${PORT}
    ################################################
    `);
});