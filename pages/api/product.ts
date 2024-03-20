import { sql } from "@vercel/postgres";
import { NextApiResponse, NextApiRequest } from "next";
import { verifyJWT } from "./token";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    // const accessToken = request.headers.get("authorization");
    // if (!accessToken || !verifyJWT(accessToken)) {
    //     return new Response(JSON.stringify({ error: "No Authorization" }), {
    //         status: 401,
    //     });
    // }
}
