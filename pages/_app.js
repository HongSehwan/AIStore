import Layout from "components/layout";

export default function MyApp({ Component, pageProps }) {
    return (
        <Layout>
            <div className="main-container">
                <Component {...pageProps} />
            </div>
        </Layout>
    );
}
