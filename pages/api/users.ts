import { sql } from "@vercel/postgres";
// import { NextApiResponse, NextApiRequest } from "next";
import { NextFunction, Request, Response } from "express";
import * as CryptoJS from "crypto-js";
import { createSession } from "./userSession";
import { signJWT } from "./token";

export default async function handler(request: Request, response: Response, next: NextFunction) {
    if (request.method === "GET") {
        if (request.query.password === undefined || request.query.password === null) {
            try {
                const userid = request.query.userid as string;
                if (!userid) throw new Error("ID Duplication Check Error");
                const checkId = await sql`SELECT EXISTS (SELECT userid FROM Users WHERE userid=${userid}) as isCheck;`;
                if (checkId.rows[0].ischeck === false) {
                    return response.json({ status_code: 1, text: "not_duplication" });
                } else {
                    return response.json({ status_code: 0, text: "duplication" });
                }
            } catch (error) {
                return response.status(500).json({ status_code: 0, text: error });
            }
        } else {
            try {
                const userid = request.query.userid as string;
                const password = request.query.password as string;
                if (!userid || !password) throw new Error("Login Failed");
                const session = createSession(userid);
                const accessToken = signJWT(
                    {
                        userid: request.query.userid,
                        sessionId: session.sessionId,
                    },
                    "12h"
                );

                const refreshToken = signJWT(
                    {
                        sessionId: session.sessionId,
                    },
                    "14d"
                );

                response.cookie("accessToken", accessToken, {
                    maxAge: 12 * 60 * 60, // 12시간
                    httpOnly: true,
                });

                response.cookie("refreshToken", refreshToken, {
                    maxAge: 14 * 24 * 60 * 60, // 14일
                    httpOnly: true,
                });

                const checkId = await sql`SELECT userid, password FROM Users WHERE userid = ${userid};`;
                let bytes = CryptoJS.AES.decrypt(checkId.rows[0].password, process.env.NEXT_PUBLIC_SECRET_KEY);
                let originalText = bytes.toString(CryptoJS.enc.Utf8);
                if (password === originalText) {
                    return response.status(200).json({ status_code: 1, text: "Login Success", userData: session });
                } else {
                    return response.json({ status_code: 0, text: "Login Failed" });
                }
            } catch (error) {
                return response.status(500).json({ status_code: 0, text: error });
            }
        }
    } else if (request.method === "POST") {
        try {
            const name = request.body.name as string;
            const userid = request.body.userid as string;
            const password = request.body.password as string;
            const zipcode = request.body.address as string;
            const address = request.body.address as string;
            const phone = request.body.phone as string;
            const email = request.body.email as string;
            const encrypted = CryptoJS.AES.encrypt(password, process.env.NEXT_PUBLIC_SECRET_KEY).toString();
            if (!name || !userid || !password || !zipcode || !address || !phone || !email) throw new Error("User Info required");
            await sql`INSERT INTO users (name, userid, password, zipcode, address, phone, email) VALUES (${name}, ${userid}, ${encrypted}, ${zipcode}, ${address}, ${phone}, ${email});`;
            return response.status(200).json({ status_code: 1, text: "Register Success" });
        } catch (error) {
            return response.status(500).json({ status_code: 0, text: error });
        }
    }
}
