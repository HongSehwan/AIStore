interface IUserSession {
    sessionId: string;
    userId: string;
    valid: boolean;
}

export const userSession: Record<string, IUserSession> = {};

// 유저의 세션 생성
export function createSession(userId: string) {
    // sessionId 설정
    const sessionId = String(Object.keys(userSession).length + 1);

    // 세션 변수
    const session = { sessionId, userId, valid: true };

    // 만든 세션을 userSession에 추가
    userSession[sessionId] = session;

    return session;
}
