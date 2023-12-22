import "../app/globals.css";
import "tailwindcss/tailwind.css";
import NavBar from "../components/navbar";
import Footer from "../components/footer";

export default function Layout({ children }) {
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
}
