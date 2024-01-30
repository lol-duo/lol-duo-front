import {AppProps} from "next/app";
import colorList from "../style/colorList";
import {QueryClient, QueryClientProvider} from "react-query";
import Footer from "@/component/common/Footer";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
    const queryClient = new QueryClient();

    return (
        <>
            <style global jsx>{`
                html {
                    box-sizing: border-box;
                    height: 100%;
                    width: 100%;
                    margin: 0;
                }

                body {
                    width: 100vw;
                    margin: 0;
                    background-color: ${colorList.semantic.background};
                }

                //todo 해당 css는 추후 component 이슈 해결하고 지울 것 2024.01.11 ajw
                #__next > div:nth-child(1) {
                    height: 100%;
                }
            `}</style>
            <Head>
                <meta name="naver-site-verification" content="5ba4384c6d894c26269fbffc41266ed0371ea7fb"/>
            </Head>
            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
                <Footer/>
            </QueryClientProvider>
        </>
    )
        ;
}

export default MyApp;
