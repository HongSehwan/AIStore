import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    try {
        const result = await sql`CREATE TABLE test ( name varchar(255), userid varchar(255) NOT NULL );`;
        return response.status(200).json({ result });
    } catch (error) {
        return response.status(500).json({ error });
    }
}
