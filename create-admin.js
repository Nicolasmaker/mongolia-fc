const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const UserSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

const createAdmin = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            console.error('Error: MONGODB_URI no está definido en el archivo .env');
            process.exit(1);
        }

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conectado a MongoDB');

        const args = process.argv.slice(2);
        if (args.length < 5) {
            console.log('Uso: node create-admin.js <nombre> <apellido> <edad> <email> <password>');
            process.exit(1);
        }

        const [nombre, apellido, edad, email, password] = args;

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            nombre,
            apellido,
            edad: parseInt(edad),
            email,
            password: hashedPassword
        });

        await newUser.save();
        console.log(`✅ Administrador ${nombre} ${apellido} creado exitosamente.`);
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await mongoose.disconnect();
    }
};

createAdmin();