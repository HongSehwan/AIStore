import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as CryptoJS from "crypto-js";
import { useRouter } from "next/router";

interface JoinPageProps {
    // Add any props if needed
}

const JoinPage: React.FC = () => {
    const router = useRouter();
    const [id, setId] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [join, setJoin] = useState<boolean>(false);
    const [idValidation, setIdValidation] = useState<boolean>(true);
    const [pwValidation, setPwValidation] = useState<boolean>(true);
    const [confirmPwValidation, setConfirmPwValidation] = useState<boolean>(true);
    const [btnValidation, setBtnValidation] = useState<boolean>(false);
    const idInput = useRef<any>(null);

    const onChangeValue = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "id") {
            setId(value);
        } else if (name === "password") {
            setPassword(value);
        } else if (name === "confirmPassword") {
            setConfirmPassword(value);
        }
    };

    const checkId = (id: string) => {
        if (/^[A-Za-z]{1}[A-Za-z0-9]{4,15}$/.test(id)) {
            return true;
        }
        return false;
    };

    const checkPassword = (password: string) => {
        if (/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
            return true;
        }
        return false;
    };

    const checkConfirmPassword = (confirmPassword: string) => {
        if (/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(confirmPassword)) {
            if (password === confirmPassword) {
                return true;
            }
        }
        return false;
    };

    useEffect(() => {
        if (idInput) {
            idInput.current.focus();
        }
    }, []);

    useEffect(() => {
        /*
            idValidation가 true면 ID 유효성 검사 미충족
            pwValidation가 true면 PW 유효성 검사 미충족
            confirmPwValidation true면 CONFIRM PW 유효성 검사 미충족
        */
        if (!checkId(id)) {
            setIdValidation(true);
        }
        if (!checkPassword(password)) {
            setPwValidation(true);
        }
        if (!checkConfirmPassword(confirmPassword)) {
            setConfirmPwValidation(true);
        }
        if (checkId(id)) {
            setIdValidation(false);
        }
        if (checkPassword(password)) {
            setPwValidation(false);
        }
        if (checkConfirmPassword(confirmPassword)) {
            setConfirmPwValidation(false);
        }
        if (!checkId(id) || !checkPassword(password) || !checkConfirmPassword(confirmPassword)) {
            setBtnValidation(false);
        }
        if (checkId(id) && checkPassword(password) && checkConfirmPassword(confirmPassword)) {
            setBtnValidation(true);
        }
    }, [id, password, confirmPassword]);

    const handleJoin = () => {
        const encrypted = CryptoJS.AES.encrypt(password, process.env.NEXT_PUBLIC_SECRET_KEY).toString();
        let userInfo = { id: id, password: encrypted };
        if (id && password && confirmPassword) {
            if (window.localStorage.getItem(id)) {
                setJoin(false);
                alert("중복된 아이디가 존재합니다.");
            } else if (!checkId(id)) {
                setJoin(false);
                alert("아이디 항목은 영문/숫자 포함 최대 15자입니다.");
            } else if (!checkPassword(password)) {
                setJoin(false);
                alert("비밀번호는 항목은 영문(대소문자)/숫자/특수기호 포함 최소 8자입니다.");
            } else {
                window.localStorage.setItem(id, JSON.stringify(userInfo));
                setJoin(true);
                router.push("/login");
                alert("회원가입에 성공했습니다.");
            }
        } else {
            setJoin(false);
            alert("모든 항목은 필수 입력값입니다.");
        }
    };

    return (
        <div className="flex justify-center text-center">
            <div>
                <div className="flex justify-center">
                    <Image className="login-logo w-56 mt-5" src="/images/AIStoreLogo.webp" alt="LOGO" width={800} height={500} />
                </div>
                <div className="w-96 mt-6">
                    {/*
                        1. ID 중복검사 버튼
                        2. 주소
                        3. 핸드폰 번호(인증 번호 확인)
                        4. 이메일
                        5. 성별 선택
                        6. 생년월일
                        7. 이용약관 동의 및 14세 이상 동의
                        8. 카카오/구글 소셜 로그인
                        추가
                    */}
                    <input
                        className="joinInput"
                        style={
                            idValidation
                                ? { borderColor: "#b2bec3", borderStyle: "solid", borderWidth: "1px" }
                                : { borderColor: "#74b9ff", borderStyle: "solid", borderWidth: "1px" }
                        }
                        ref={idInput}
                        type="text"
                        name="id"
                        placeholder="아이디를 입력해주세요."
                        value={id}
                        required
                        onChange={onChangeValue}
                    />
                    <input
                        className="pwInput"
                        style={
                            pwValidation
                                ? { borderColor: "#b2bec3", borderStyle: "solid", borderWidth: "1px" }
                                : { borderColor: "#74b9ff", borderStyle: "solid", borderWidth: "1px" }
                        }
                        name="password"
                        type="password"
                        placeholder="비밀번호를 입력해주세요."
                        value={password}
                        required
                        onChange={onChangeValue}
                    />
                    <input
                        className="pwInput"
                        style={
                            confirmPwValidation
                                ? { borderColor: "#b2bec3", borderStyle: "solid", borderWidth: "1px" }
                                : { borderColor: "#74b9ff", borderStyle: "solid", borderWidth: "1px" }
                        }
                        name="confirmPassword"
                        type="Password"
                        placeholder="한번 더 비밀번호를 입력해주세요."
                        value={confirmPassword}
                        required
                        onChange={onChangeValue}
                    />
                    <button
                        className="joinBtn"
                        style={btnValidation ? { backgroundColor: "#4bcffa" } : { backgroundColor: "#c7ecee" }}
                        onClick={handleJoin}
                    >
                        <p className="joinBtnText">회원가입</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JoinPage;
