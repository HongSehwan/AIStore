import React, { useEffect, useState } from "react";
import Layout from "@/components/layout";
import { sql } from "@vercel/postgres";

interface MyAppProps {
    Component: React.ComponentType<any>;
    pageProps: any;
}

export default function MyApp({ Component, pageProps }: MyAppProps) {
    const [isClient, setIsClient] = useState<boolean>(false);

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
