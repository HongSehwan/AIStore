import React, { useEffect, useState } from "react";
import Layout from "components/layout";

export default function MyApp({ Component, pageProps }) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (typeof document === "undefined") return <></>;

    const modalRoot = document.getElementById("modal-root");
    if (!modalRoot) {
        const div = document.createElement("div");
        div.id = "modal-root";
        document.body.appendChild(div);
    }
    return (
        isClient && (
            <Layout>
                <div className="main-container">
                    <Component {...pageProps} />
                </div>
            </Layout>
        )
    );
}
