import { sql } from "@vercel/postgres";
import { NextApiResponse, NextApiRequest } from "next";
import * as CryptoJS from "crypto-js";
// import { createSession } from "./userSession";
import jwt from "jsonwebtoken";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    if (request.method === "GET") {
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
    } else if (request.method === "POST") {
        if (!request.body.zipcode || !request.body.address || !request.body.phone || !request.body.email) {
            try {
                const userid = request.body.userid as string;
                const password = request.body.password as string;
                if (!userid || !password) throw new Error("Login Failed");
                // const session = createSession(userid);

                const checkUser = await sql`SELECT userid, password FROM users WHERE userid = ${userid};`;
                if (checkUser.rows.length === 0) return response.json({ status_code: 2, text: "Login ID Error" });
                let bytes = CryptoJS.AES.decrypt(checkUser.rows[0].password, process.env.NEXT_PUBLIC_SECRET_KEY);
                let originalText = bytes.toString(CryptoJS.enc.Utf8);
                if (password === originalText) {
                    const accessToken = jwt.sign(
                        {
                            userid: request.body.userid,
                        },
                        process.env.NEXT_PUBLIC_ACCESS_SECRET,
                        {
                            algorithm: "HS256",
                            expiresIn: "1h",
                        }
                    );

                    console.log(accessToken);
                    const base64Payload = accessToken.split(".")[1];
                    const payload = Buffer.from(base64Payload, "base64");
                    const result = JSON.parse(payload.toString());
                    console.log(result);

                    const refreshToken = jwt.sign(
                        {
                            name: request.body.userid,
                        },
                        process.env.NEXT_PUBLIC_REFRESH_SECRET,
                        {
                            algorithm: "HS256",
                            expiresIn: "14d",
                        }
                    );

                    await sql`UPDATE users SET refreshtk = ${refreshToken} WHERE userid = ${userid};`;
                    response.setHeader("Set-Cookie", [
                        `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=86400; SameSite=None; Secure`,
                        `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=1209600; SameSite=None; Secure`,
                    ]);
                    return response.status(200).json({ status_code: 1, text: "Login Success" });
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
    } else if (request.method === "PUT") {
        try {
            const refreshTK = "logout";
            const userid = request.body.userid as string;
            response.setHeader("Set-Cookie", [
                `accessToken=; HttpOnly; Path=/; Max-Age=0; SameSite=None; Secure`,
                `refreshToken=; HttpOnly; Path=/; Max-Age=0; SameSite=None; Secure`,
            ]);
            await sql`UPDATE users SET refreshtk = ${refreshTK} WHERE userid = ${userid};`;
            return response.status(200).json({ status_code: 1, text: "LogOut Success" });
        } catch (error) {
            return response.status(500).json({ status_code: 0, text: error });
        }
    }
}
