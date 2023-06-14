import { db } from '@/database';
import { Entry, IEntry } from '@/models'
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
    | { message: string }
    | IEntry[]
    | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id } = req.query;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'El ID no es válido.' })
    }

    switch (req.method) {
        case 'GET':
            return getEntries(req, res);

        case 'PUT':
            return updateEntry(req, res)

        default:
            res.status(400).json({ message: 'El metodo es incorrecto.' })
    }

}

const getEntries = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query;

    await db.connect();

    const entryById = await Entry.findById(id);

    if (!entryById) {
        await db.disconnect();
        return res.status(400).json({ message: 'No hay entrada con ese ID' });
    }

    await db.disconnect();
    res.status(200).json(entryById)
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query;

    await db.connect();

    const entryById = await Entry.findById(id);

    if (!entryById) {
        await db.disconnect();
        return res.status(400).json({ message: 'No hay entrada con ese ID' });
    }

    const { description = entryById.description, status = entryById.status } = req.body;

    try {
        const entryUpdated = await Entry.findByIdAndUpdate(id, { description, status }, { new: true, runValidators: true });
        return res.status(200).json(entryUpdated!)
    } catch (error) {
        return res.status(400).json({ message: 'Algo salio mal.' })
    }

}