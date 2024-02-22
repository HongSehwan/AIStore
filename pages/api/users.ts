import { sql } from "@vercel/postgres";
// import { NextApiResponse, NextApiRequest } from "next";
import { NextFunction, Request, Response } from "express";
import * as CryptoJS from "crypto-js";
import { createSession } from "./userSession";
// import { verifyJWT } from "./token";
import jwt from "jsonwebtoken";

export default async function handler(request: Request, response: Response, next: NextFunction) {
    if (request.method === "GET") {
        if (!request.query.sessionId) {
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
        }
    } else if (request.method === "POST") {
        if (!request.body.zipcode || !request.body.address || !request.body.phone || !request.body.email) {
            try {
                const userid = request.body.userid as string;
                const password = request.body.password as string;
                if (!userid || !password) throw new Error("Login Failed");
                const session = createSession(userid);

                const accessToken = jwt.sign(
                    {
                        userid: request.body.userid,
                        sessionId: session.sessionId,
                    },
                    process.env.NEXT_PUBLIC_ACCESS_SECRET,
                    {
                        algorithm: "HS256",
                        expiresIn: "1h",
                    }
                );

                const refreshToken = jwt.sign(
                    {
                        sessionId: session.sessionId,
                    },
                    process.env.NEXT_PUBLIC_REFRESH_SECRET,
                    {
                        algorithm: "HS256",
                        expiresIn: "14d",
                    }
                );

                console.log(response);
                console.log(response.cookie);

                // response.cookie("accessToken", accessToken, {
                //     maxAge: 12 * 60 * 60, // 12시간
                //     httpOnly: true,
                // });

                // response.cookie("refreshToken", refreshToken, {
                //     maxAge: 14 * 24 * 60 * 60, // 14일
                //     httpOnly: true,
                // });

                response.setHeader(
                    "Set-Cookie",
                    cookie.serialize("refreshToken", refreshToken, {
                        httpOnly: true,
                        maxAge: 14 * 24 * 60 * 60, // 14일
                        sameSite: "strict",
                        path: "/",
                    })
                );

                const checkUser = await sql`SELECT userid, password FROM users WHERE userid = ${userid};`;
                // console.log(checkUser);
                let bytes = CryptoJS.AES.decrypt(checkUser.rows[0].password, process.env.NEXT_PUBLIC_SECRET_KEY);
                let originalText = bytes.toString(CryptoJS.enc.Utf8);
                if (password === originalText) {
                    return response.status(200).json({ status_code: 1, text: "Login Success", userData: session });
                } else {
                    return response.json({ status_code: 0, text: "Login Failed" });
                }
            } catch (error) {
                return response.status(500).json({ status_code: 0, text: error });
            }
        } else {
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
}
