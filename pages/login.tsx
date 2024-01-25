import React, { CSSProperties, useEffect, useRef, useState } from "react";
import Image from "next/image";

interface LoginPageProps {
    // Add any props if needed
}

const LoginPage: React.FC = () => {
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
        if (/^([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/.test(id)) {
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
        let userInfo = { id: id, password: password };
        if (window.localStorage.getItem(id) === null) {
            window.localStorage.setItem(id, JSON.stringify(userInfo));
            setLogin(true);
        } else if (JSON.parse(window.localStorage.getItem(id) || "").id === id) {
            if (JSON.parse(window.localStorage.getItem(id) || "").password === password) {
                setLogin(true);
            } else {
                setIdValidation(true);
                setPwValidation(true);
            }
        } else {
            setIdValidation(true);
            setPwValidation(true);
        }
    };
    return (
        <div className="flex justify-center text-center">
            <div>
                <div className="flex justify-center">
                    <Image className="login-logo w-56 mt-5" src="/images/AIStoreLogo.webp" alt="LOGO" width={800} height={500} />
                </div>
                <div className="w-96 mt-6">
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
