import { Entry } from "@/interfaces";
import mongoose, { Schema, Model } from "mongoose";

interface IEntry extends Entry { }

const entrySchema = new Schema({
    description: { type: String, required: true },
    createdAt: { type: String },
    status: {
        type: String,
        enum: {
            values: ['pending', 'in-progress', 'finished'],
            message: ' {VALUE} No es un estado permitido'
        }
    }
});


const entryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default entryModel;

