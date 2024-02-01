import "tailwindcss/tailwind.css";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";
import { loginState, loginChanged, logoutChanged, userIdState, userPwState } from "@/store/recoil_atoms";
import { useRouter } from "next/router";
import Nav from "react-bootstrap/Nav";
import Image from "next/image";
// import Modal from "./Modal";

interface NavBarProps {
    // Add any props if needed
}

const NavBar: React.FC<NavBarProps> = () => {
    const router = useRouter();
    const loginStatus = useRecoilValue(loginState);
    const setLoginAtom = useSetRecoilState<boolean>(loginChanged);
    const setLogoutAtom = useSetRecoilState<boolean>(logoutChanged);
    const [id, setId] = useRecoilState<string>(userIdState);
    const [password, setPassword] = useRecoilState<string>(userPwState);
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [login, setLogin] = useState<boolean>(false);
    const targetRef = useRef<any>(0);

    const handleScroll = () => {
        if (window.scrollY > 200 && targetRef) {
            targetRef.current.style.display = "block";
        }

        if (window.scrollY <= 200 && targetRef) {
            targetRef.current.style.display = "none";
        }
    };

    const handleResize = () => {
        setWidth(window.innerWidth);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        console.log(id);
        console.log(password);
        console.log(loginStatus);
        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll);
        if (window.scrollY > 200 && targetRef) {
            targetRef.current.style.display = "block";
        }

        if (window.scrollY <= 200 && targetRef) {
            targetRef.current.style.display = "none";
        }
        return () => {
            // cleanup
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleLogout = () => {
        setLogoutAtom(() => false);
        router.push("/");
    };

    return (
        <>
            <Nav
                activeKey="/"
                className="nav-wrapper flex fixed w-full t-0  bg-[#a29bfe]/60 h-16 items-center border-b-0 border-b-[#000] shadow-lg"
            >
                <div className="nav-logo ml-8">
                    <Nav.Link href="/">
                        <Image className="nav-logo" src="/images/AIStoreLogo.webp" alt="LOGO" width={800} height={500} />
                    </Nav.Link>
                </div>
                <div className="w-full flex justify-between nav-menu">
                    {width >= 680 ? (
                        <div className="w-96 flex items-center">
                            <Nav.Item>
                                <Nav.Link className="text-[#000] font-normal" href="/best">
                                    BEST
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="ml-auto">
                                <Nav.Link className="text-[#000] font-normal" href="/new">
                                    NEW
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="ml-auto">
                                <Nav.Link className="text-[#000] font-normal" href="/outer">
                                    OUTER
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="ml-auto">
                                <Nav.Link className="text-[#000] font-normal" href="/top">
                                    TOP
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="ml-auto">
                                <Nav.Link className="text-[#000] font-normal" href="/pants">
                                    PANTS
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item className="ml-auto">
                                <Nav.Link className="text-[#000] font-normal" href="/shoes">
                                    SHOES
                                </Nav.Link>
                            </Nav.Item>
                        </div>
                    ) : (
                        <div></div>
                    )}
                    {width >= 830 ? (
                        <div className="w-32 flex mr-24">
                            {loginStatus === false ? (
                                <>
                                    <Nav.Item className="ml-6">
                                        <Nav.Link className="text-[#000] font-light" href="/join">
                                            JOIN
                                        </Nav.Link>
                                    </Nav.Item>

                                    <Nav.Item className="ml-6">
                                        <Nav.Link className="text-[#000] font-light" href="/login">
                                            LOGIN
                                        </Nav.Link>
                                    </Nav.Item>
                                </>
                            ) : (
                                <>
                                    <div className="ml-10"></div>
                                    <Nav.Item className="ml-6">
                                        <Nav.Link className="text-[#000] font-light" onClick={handleLogout}>
                                            LOGOUT
                                        </Nav.Link>
                                    </Nav.Item>
                                </>
                            )}
                            <Nav.Item className="ml-6">
                                <Nav.Link className="text-[#000] font-light" href="/cart">
                                    CART
                                </Nav.Link>
                            </Nav.Item>
                            {/* <Modal isOpen={isModalOpen} onClose={closeModal}>
                                <h2>LOGIN</h2>
                                <p>This is the content of the modal.</p>
                            </Modal> */}
                        </div>
                    ) : (
                        <div className="menu-toggle">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    )}
                </div>
            </Nav>
            <div className="sideMenu border-gray-400 bg-stone-600 rounded-lg cursor-pointer" ref={targetRef}>
                <h1 className="flex items-center justify-center h-full text-gray-50 font-semibold">TOP</h1>
            </div>
        </>
    );
};

export default NavBar;
