import jwt from "jsonwebtoken";

export function verifyJWT(token: string) {
    try {
        // 인자로 받은 token이 유효한지 확인하는 변수 (유효하다면 decoded가 존재)
        const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY);
        // 유효하다면 payload에 decoded를 넣고 expired에 false로 리턴(만료되지 x)
        return { payload: decoded, expired: false };
    } catch (error: any) {
        // 만약 유효하지 않다면 payload는 Null, expired엔 errorMessage를 담아 리턴
        return { payload: null, expired: error.message.includes("jwt expired") };
    }
}
