import React, { ReactNode } from "react";
import "../app/globals.css";
import "tailwindcss/tailwind.css";
import NavBar from "./navbar";
import Footer from "./footer";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <nav>
                <NavBar />
            </nav>

            <div>
                <main>{children}</main>
            </div>

            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Layout;
