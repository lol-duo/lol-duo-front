import {AppProps} from "next/app";
import colorList from "../style/colorList";
import {QueryClient, QueryClientProvider} from "react-query";
import Footer from "@/component/common/Footer";
import Head from "next/head";
import {NextUIProvider} from "@nextui-org/react";
import "./input.css"

function MyApp({ Component, pageProps }: AppProps) {
    const queryClient = new QueryClient();

    return (
        <>
            <style global jsx>{`
                body {
                    background-color: ${colorList.semantic.background};
                }
            `}</style>
            <Head>
                <meta name="naver-site-verification" content="5ba4384c6d894c26269fbffc41266ed0371ea7fb"/>
                <script async
                        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9404910404961679"
                        crossOrigin="anonymous"></script>
            </Head>

            <QueryClientProvider client={queryClient}>
                <NextUIProvider>
                    <Component {...pageProps} />
                    <Footer/>
                </NextUIProvider>
            </QueryClientProvider>

        </>
    )
        ;
}

export default MyApp;
