import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
    try {
        const dbUri = process.env.MONGODB_URI;
        if (!dbUri) {
            throw new Error('La variable de entorno MONGODB_URI no está definida');
        }

        await mongoose.connect(dbUri);
        console.log('✅ Conectado a MongoDB Atlas exitosamente');
    } catch (error) {
        console.error('❌ Error al conectar a MongoDB:', error);
        // No matamos el proceso para que la web siga cargando
        // process.exit(1); 
    }
};
