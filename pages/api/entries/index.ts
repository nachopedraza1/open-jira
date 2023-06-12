import { db } from '@/database';
import { Entry, IEntry } from '@/models';
import { NextApiRequest, NextApiResponse } from 'next';

type Data =
    | { message: String }
    | IEntry[]
    | IEntry


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getEntries(res);

        case 'POST':
            return inseryEntry(req, res);

        default:
            res.status(400).json({ message: "Endpoint no válido" })
    }
}

const getEntries = async (res: NextApiResponse<Data>) => {
    await db.connect();
    const entries = await Entry.find()
    await db.disconnect();

    res.status(200).json(entries)
}

const inseryEntry = async (req: NextApiRequest, res: NextApiResponse) => {

    const { description = "" } = req.body;

    const newEntry = new Entry({
        description,
        createdAt: new Date(),
    })

    try {
        await db.connect();
        await newEntry.save();
        await db.disconnect();

        res.status(201).json(newEntry)
    } catch (error) {
        await db.disconnect();
        console.log('Por favor, revisar logs del servidor.');
        res.status(500).json({ message: 'Algo salio mal.' })
    }
}