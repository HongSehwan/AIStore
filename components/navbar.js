import "tailwindcss/tailwind.css";
import { useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";

function NavBar() {
    const [width, setWidth] = useState(10000);

    const handleResize = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
            // cleanup
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    return (
        <Nav
            activeKey="/"
            className="nav-wrapper flex fixed w-full t-0  bg-[#a29bfe]/60 h-16 items-center border-b-0 border-b-[#000] shadow-lg"
        >
            <div className="nav-logo ml-8">
                <Nav.Link href="/">
                    <Image className="nav-logo" src="/images/AIStoreLogo.png" alt="LOGO" />
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
                        <Nav.Item className="ml-6">
                            <Nav.Link className="text-[#000] font-light">Join</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="ml-6">
                            <Nav.Link className="text-[#000] font-light">Login</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="ml-6">
                            <Nav.Link className="text-[#000] font-light">Cart</Nav.Link>
                        </Nav.Item>
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
    );
}

export default NavBar;
