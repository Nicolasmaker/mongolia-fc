import mongoose, { Schema, Document } from 'mongoose';

export interface IMatch extends Document {
    date: Date;
    home: string;
    away: string;
    location: string;
    time: string;
    createdAt: Date;
}

const MatchSchema: Schema = new Schema({
    date: { type: Date, required: true },
    home: { type: String, required: true },
    away: { type: String, required: true },
    location: { type: String, required: true },
    time: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IMatch>('Match', MatchSchema);
