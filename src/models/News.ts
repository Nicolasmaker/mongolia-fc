import mongoose, { Schema, Document } from 'mongoose';

export interface INews extends Document {
    title: string;
    content: string;
    imageUrl: string;
    date: Date;
}

const NewsSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: false },
    date: { type: Date, default: Date.now }
});

export default mongoose.model<INews>('News', NewsSchema);