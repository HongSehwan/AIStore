import jwt from "jsonwebtoken";

export function verifyJWT(token: string, type: string) {
    try {
        if (type === "accessToken") {
            // 인자로 받은 token이 유효한지 확인하는 변수 (유효하다면 decoded가 존재)
            const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_ACCESS_SECRET);
            console.log(decoded);
            return true;
        } else {
            const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_REFRESH_SECRET);
            console.log(decoded);
            return true;
        }
    } catch (error: any) {
        // 만약 유효하지 않다면 payload는 Null, expired엔 errorMessage를 담아 리턴
        return false;
    }
}
