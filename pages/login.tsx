import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as CryptoJS from "crypto-js";
import { useRouter } from "next/router";

interface LoginPageProps {
    // Add any props if needed
}

const LoginPage: React.FC = () => {
    const router = useRouter();
    const [id, setId] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [login, setLogin] = useState<boolean>(false);
    const [idValidation, setIdValidation] = useState<boolean>(false);
    const [pwValidation, setPwValidation] = useState<boolean>(false);
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

    useEffect(() => {
        if (idInput) {
            idInput.current.focus();
        }
    }, []);

    useEffect(() => {
        if (!checkId(id)) {
            setIdValidation(true);
        }
        if (!checkPassword(password)) {
            setPwValidation(true);
        }
        if (checkId(id)) {
            setIdValidation(false);
        }
        if (checkPassword(password)) {
            setPwValidation(false);
        }
        if (!checkId(id) || !checkPassword(password)) {
            setBtnValidation(false);
        }
        if (checkId(id) && checkPassword(password)) {
            setBtnValidation(true);
        }
    }, [id, password]);

    const handleLogin = () => {
        if (id && password) {
            let bytes = CryptoJS.AES.decrypt(
                JSON.parse(window.localStorage.getItem(id) || "").password,
                process.env.NEXT_PUBLIC_SECRET_KEY
            );
            let originalText = bytes.toString(CryptoJS.enc.Utf8);
            if (window.localStorage.getItem(id) === null) {
                setLogin(false);
                alert("회원정보가 없습니다. 회원가입 후 이용바랍니다.");
            } else if (JSON.parse(window.localStorage.getItem(id) || "").id === id) {
                if (password === originalText) {
                    setLogin(true);
                    alert("로그인에 성공했습니다.");
                    router.push("/");
                } else {
                    setLogin(false);
                    setIdValidation(true);
                    setPwValidation(true);
                    alert("아이디 또는 비밀번호가 일치하지 않습니다.");
                }
            } else {
                setLogin(false);
                setIdValidation(true);
                setPwValidation(true);
                alert("아이디 또는 비밀번호가 일치하지 않습니다.");
            }
        } else {
            setLogin(false);
            alert("아이디와 비밀번호 항목은 필수 입력값입니다.");
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
                        1. 카카오/구글 소셜 로그인
                        추가
                    */}
                    <input
                        className="loginInput"
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
                    <button
                        className="loginBtn"
                        style={btnValidation ? { backgroundColor: "#4bcffa" } : { backgroundColor: "#c7ecee" }}
                        onClick={handleLogin}
                    >
                        <p className="loginBtnText">로그인</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
