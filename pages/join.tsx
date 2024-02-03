import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { userIdState, userPwState } from "@/store/recoil_atoms";
import Image from "next/image";
import Script from "next/script";
import * as CryptoJS from "crypto-js";
import { useRouter } from "next/router";

declare global {
    interface Window {
        daum: any;
    }
}

interface IAddr {
    address: string;
    zonecode: string;
}

const JoinPage: React.FC = () => {
    const router = useRouter();
    const [id, setId] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [address, setAddress] = useState<string>(""); // 도로명주소
    const [zipCode, setZipCode] = useState<string>(""); // 우편번호
    const [addrDetail, setAddrDetail] = useState<string>(""); // 상세주소
    const [nameText, setNameText] = useState<string>("");
    const [firstNumber, setFirstNumber] = useState<string>("010");
    const [middleNumber, setMiddleNumber] = useState<string>("");
    const [lastNumber, setLastNumber] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [storeId, setStoreId] = useRecoilState<string>(userIdState);
    const [storePW, setStorePW] = useRecoilState<string>(userPwState);
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [join, setJoin] = useState<boolean>(false);
    const [idValidation, setIdValidation] = useState<boolean>(true);
    const [pwValidation, setPwValidation] = useState<boolean>(true);
    const [confirmPwValidation, setConfirmPwValidation] = useState<boolean>(true);
    const [btnValidation, setBtnValidation] = useState<boolean>(false);
    const idInput = useRef<any>("");

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
        } else if (name === "zipCode") {
            setZipCode(value);
        } else if (name === "address") {
            setAddress(value);
        } else if (name === "addressDetail") {
            setAddrDetail(value);
        } else if (name === "nameText") {
            setNameText(value);
        } else if (name === "firstNum") {
            setFirstNumber(value);
        } else if (name === "middleNum") {
            setMiddleNumber(value);
        } else if (name === "lastNum") {
            setLastNumber(value);
        } else if (name === "email") {
            setEmail(value);
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
        if (
            nameText &&
            id &&
            password &&
            confirmPassword &&
            zipCode &&
            address &&
            addrDetail &&
            firstNumber &&
            middleNumber &&
            lastNumber &&
            email
        ) {
            if (storeId === id) {
                setJoin(false);
                alert("중복된 아이디가 존재합니다.");
            } else if (!checkId(id)) {
                setJoin(false);
                alert("아이디는 영문, 숫자 포함 최대 15자입니다.");
            } else if (!checkPassword(password)) {
                setJoin(false);
                alert("영문(대소문자), 숫자, 특수문자를 혼합하여 입력해주세요.");
            } else {
                const encrypted = CryptoJS.AES.encrypt(password, process.env.NEXT_PUBLIC_SECRET_KEY).toString();
                setStoreId(id);
                setStorePW(encrypted);
                setJoin(true);
                router.push("/login");
                alert("회원가입에 성공했습니다.");
            }
        } else {
            setJoin(false);
            alert("모든 항목은 필수 입력값입니다.");
        }
    };

    const checkIdHandler = () => {
        alert("ID 중복 확인 완료");
        /*
            DB 생성 후 로직 완성하기
        */
    };

    const onClickAddr = () => {
        new window.daum.Postcode({
            oncomplete: function (data: IAddr) {
                setAddress(data.address);
                setZipCode(data.zonecode);
                setAddrDetail("");
                document.getElementById("addressDetailInput")?.focus();
            },
        }).open();
    };

    return (
        <>
            <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></Script>
            <div className="flex justify-center text-center">
                <div>
                    <div className="flex justify-center">
                        <Image className="login-logo w-56 mt-5" src="/images/AIStoreLogo.webp" alt="LOGO" width={800} height={500} />
                    </div>
                    <div>
                        {/*
                        1. ID 중복검사 버튼
                        2. 주소
                        3. 핸드폰 번호(인증 번호 확인)
                        4. 이메일(이메일 형식 검사 정규표현식 추가)
                        5. 이용약관 동의 및 14세 이상 동의
                        6. 카카오/구글 소셜 로그인
                        추가
                    */}
                        <div className="flex">
                            <div className="w-96 mt-6">
                                <div>
                                    <p className="text-sm font-medium text-left ml-3.5 mt-3">이름</p>
                                    <input
                                        className="nameInput"
                                        name="nameText"
                                        type="name"
                                        ref={idInput}
                                        placeholder="이름를 입력해주세요."
                                        value={nameText}
                                        required
                                        onChange={onChangeValue}
                                    />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-left ml-3.5 mt-3">아이디</p>
                                    <div className="joinInputWrapper flex">
                                        <input
                                            className="joinInput"
                                            style={
                                                idValidation
                                                    ? {
                                                          borderColor: "#b2bec3",
                                                          borderStyle: "solid",
                                                          borderWidth: "1px",
                                                          width: "300px",
                                                      }
                                                    : {
                                                          borderColor: "#74b9ff",
                                                          borderStyle: "solid",
                                                          borderWidth: "1px",
                                                          width: "300px",
                                                      }
                                            }
                                            type="text"
                                            name="id"
                                            placeholder="아이디를 입력해주세요."
                                            value={id}
                                            required
                                            onChange={onChangeValue}
                                        />
                                        <button className="duplicationCheck" onClick={checkIdHandler}>
                                            중복확인
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-left ml-3.5 mt-3">비밀번호</p>
                                    <input
                                        className="pwInput"
                                        style={
                                            pwValidation
                                                ? { borderColor: "#b2bec3", borderStyle: "solid", borderWidth: "1px" }
                                                : { borderColor: "#74b9ff", borderStyle: "solid", borderWidth: "1px" }
                                        }
                                        name="password"
                                        type="password"
                                        placeholder="영문(대소문자), 숫자, 특수기호 포함 최소 8자 이상"
                                        value={password}
                                        required
                                        onChange={onChangeValue}
                                    />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-left ml-3.5 mt-3">비밀번호 확인</p>
                                    <input
                                        className="pwInput"
                                        style={
                                            confirmPwValidation
                                                ? { borderColor: "#b2bec3", borderStyle: "solid", borderWidth: "1px" }
                                                : { borderColor: "#74b9ff", borderStyle: "solid", borderWidth: "1px" }
                                        }
                                        name="confirmPassword"
                                        type="Password"
                                        placeholder="비밀번호를 확인해 주세요."
                                        value={confirmPassword}
                                        required
                                        onChange={onChangeValue}
                                    />
                                </div>
                            </div>
                            <div className="w-96 mt-6">
                                <div>
                                    <p className="text-sm font-medium text-left ml-3.5 mt-3">주소</p>
                                    <div className="addressInputWrapper flex">
                                        <input
                                            id="zipCodeInput"
                                            type="text"
                                            name="zipCode"
                                            placeholder="우편번호"
                                            value={zipCode}
                                            readOnly
                                            required
                                            onChange={onChangeValue}
                                        />
                                        <button className="addressSearch" onClick={onClickAddr}>
                                            우편번호
                                        </button>
                                    </div>
                                    <input
                                        id="addressInput"
                                        name="address"
                                        type="text"
                                        placeholder="도로명 주소를 입력해주세요."
                                        value={address}
                                        required
                                        onChange={onChangeValue}
                                    />
                                    <input
                                        id="addressDetailInput"
                                        name="addressDetail"
                                        type="text"
                                        placeholder="상세 주소를 입력해주세요."
                                        value={addrDetail}
                                        required
                                        onChange={onChangeValue}
                                    />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-left ml-3.5 mt-3">휴대전화</p>
                                    <div className="phoneWrapper flex">
                                        <select className="areaCode" name="firstNum" onChange={onChangeValue}>
                                            <option value="010">010</option>
                                            <option value="011">011</option>
                                            <option value="016">016</option>
                                            <option value="017">017</option>
                                            <option value="018">018</option>
                                            <option value="019">019</option>
                                        </select>
                                        <p className="enDash">–</p>
                                        <input
                                            className="phoneInput"
                                            name="middleNum"
                                            type="tel"
                                            value={middleNumber}
                                            required
                                            onChange={onChangeValue}
                                        />
                                        <p className="enDash">–</p>
                                        <input
                                            className="phoneInput"
                                            name="lastNum"
                                            type="tel"
                                            value={lastNumber}
                                            required
                                            onChange={onChangeValue}
                                        />
                                        <button className="telCheck">인증번호 받기</button>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-left ml-3.5 mt-3">이메일</p>
                                    <input
                                        className="emailInput"
                                        name="email"
                                        type="email"
                                        value={email}
                                        required
                                        onChange={onChangeValue}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
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
            </div>
        </>
    );
};

export default JoinPage;
