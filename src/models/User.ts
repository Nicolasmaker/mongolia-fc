import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    nombre: string;
    apellido: string;
    edad: number;
    email: string;
    password: string;
}

const UserSchema: Schema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    edad: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

export default mongoose.model<IUser>('User', UserSchema);