import { db } from "@/database";
import { seedData } from "@/database/seed-data";
import { Entry } from "@/models";
import { NextApiRequest, NextApiResponse } from "next";

interface Data {
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  if (process.env.NODE_ENV === "production") {
    return res.status(401).json({ message: "No tiene acceso a este servicio." })
  }

  db.connect();

  await Entry.deleteMany();
  await Entry.insertMany(seedData.entries)

  db.disconnect();

  res.status(200).json({ message: "Proceso realizado correctamente" })
}