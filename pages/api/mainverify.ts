import { sql } from "@vercel/postgres";
import { NextApiResponse, NextApiRequest } from "next";
import { verifyJWT } from "./token";
import jwt from "jsonwebtoken";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
    let newAccessToken = "";
    let newRefreshToken = "";
    if (request.headers.cookie?.includes("accessToken")) {
        const accessToken = request.headers.cookie?.split("accessToken=")[1].split(";")[0];

        if (!verifyJWT(accessToken, "accessToken")) {
            if (request.headers.cookie?.includes("refreshToken")) {
                const refreshToken = request.headers.cookie?.split("refreshToken=")[1].split(";")[0];

                const base64Payload = refreshToken.split(".")[1];
                const payload = Buffer.from(base64Payload, "base64");
                const result = JSON.parse(payload.toString());

                if (!verifyJWT(refreshToken, "refreshToken")) {
                    response.setHeader("Set-Cookie", [
                        `accessToken=; HttpOnly; Path=/; Max-Age=0; SameSite=None; Secure`,
                        `refreshToken=; HttpOnly; Path=/; Max-Age=0; SameSite=None; Secure`,
                    ]);
                    return response.status(200).json({ status_code: 0, text: "No Authorization" });
                } else {
                    newAccessToken = jwt.sign(
                        {
                            userid: result.name,
                        },
                        process.env.NEXT_PUBLIC_ACCESS_SECRET,
                        {
                            algorithm: "HS256",
                            expiresIn: "1h",
                        }
                    );

                    newRefreshToken = jwt.sign(
                        {
                            name: result.name,
                        },
                        process.env.NEXT_PUBLIC_REFRESH_SECRET,
                        {
                            algorithm: "HS256",
                            expiresIn: "14d",
                        }
                    );

                    await sql`UPDATE users SET refreshtk = ${refreshToken} WHERE userid = ${result.name};`;
                    response.setHeader("Set-Cookie", [
                        `accessToken=${newAccessToken}; HttpOnly; Path=/; Max-Age=86400; SameSite=None; Secure`,
                        `refreshToken=${newRefreshToken}; HttpOnly; Path=/; Max-Age=1209600; SameSite=None; Secure`,
                    ]);

                    return response.status(200).json({ status_code: 1, text: "Verify Success" });
                }
            } else {
                response.setHeader("Set-Cookie", [`accessToken=; HttpOnly; Path=/; Max-Age=0; SameSite=None; Secure`]);
                return response.status(200).json({ status_code: 0, text: "No Authorization" });
            }
        } else {
            return response.status(200).json({ status_code: 1, text: "Verify Success" });
        }
    } else {
        if (request.headers.cookie?.includes("refreshToken")) {
            const refreshToken = request.headers.cookie?.split("refreshToken=")[1].split(";")[0];

            const base64Payload = refreshToken.split(".")[1];
            const payload = Buffer.from(base64Payload, "base64");
            const result = JSON.parse(payload.toString());

            if (!verifyJWT(refreshToken, "refreshToken")) {
                response.setHeader("Set-Cookie", [`refreshToken=; HttpOnly; Path=/; Max-Age=0; SameSite=None; Secure`]);
                return response.status(200).json({ status_code: 0, text: "No Authorization" });
            } else {
                newAccessToken = jwt.sign(
                    {
                        userid: result.name,
                    },
                    process.env.NEXT_PUBLIC_ACCESS_SECRET,
                    {
                        algorithm: "HS256",
                        expiresIn: "1h",
                    }
                );

                newRefreshToken = jwt.sign(
                    {
                        name: result.name,
                    },
                    process.env.NEXT_PUBLIC_REFRESH_SECRET,
                    {
                        algorithm: "HS256",
                        expiresIn: "14d",
                    }
                );

                await sql`UPDATE users SET refreshtk = ${refreshToken} WHERE userid = ${result.name};`;
                response.setHeader("Set-Cookie", [
                    `accessToken=${newAccessToken}; HttpOnly; Path=/; Max-Age=86400; SameSite=None; Secure`,
                    `refreshToken=${newRefreshToken}; HttpOnly; Path=/; Max-Age=1209600; SameSite=None; Secure`,
                ]);

                return response.status(200).json({ status_code: 1, text: "Verify Success" });
            }
        } else {
            return response.status(200).json({ status_code: 0, text: "No Authorization" });
        }
    }
}
