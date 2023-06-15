import { Entry } from "@/models";
import mongoose from "mongoose";
import { db } from "."

export const getEntriesById = async (id: string) => {

    if (!mongoose.isValidObjectId(id)) return null;

    await db.connect();
    const entry = await Entry.findById(id).lean();
    await db.disconnect();

    return JSON.parse(JSON.stringify(entry))
}