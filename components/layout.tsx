import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import { RecoilRoot, RecoilEnv } from "recoil";
import "../app/globals.css";
import "tailwindcss/tailwind.css";
import NavBar from "./navbar";
import Footer from "./footer";

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const router = useRouter();
    return (
        <RecoilRoot>
            <div>
                <nav>
                    <NavBar />
                </nav>

                <div>
                    <main>{children}</main>
                </div>

                {router.asPath === "/join" || router.asPath === "/login" ? null : (
                    <footer>
                        <Footer />
                    </footer>
                )}
            </div>
        </RecoilRoot>
    );
};

export default Layout;
