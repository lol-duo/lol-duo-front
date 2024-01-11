import {AppProps} from "next/app";
import colorList from "../style/colorList";
import {QueryClient, QueryClientProvider} from "react-query";
import HomeHeader from "@/component/home/Header";
import Footer from "@/component/common/Footer";
import Head from "next/head";
import I18n from "@/component/locale/i18n";

function MyApp({ Component, pageProps }: AppProps) {
    const queryClient = new QueryClient();

    const description = I18n("common.json").description;

    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <link href="/favicon.svg" rel="icon"/>
                <meta content="LOL-DUO" property="og:title"/>
                <meta content="Provides good information when playing LOL co-op" property="og:description"/>
                <meta content="https://www.lolduo.net" property="og:url"/>
                <meta content="/1200_600.svg" property="og:image"/>
                <meta
                    content={description}
                    name="description"
                />
                <link href="/favicon.svg" rel="apple-touch-icon"/>
                <title>LOL-DUO</title>
            </Head>
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
                #__next > div:nth-child(2) {
                    height: 100%;
                }
            `}</style>

            <QueryClientProvider client={queryClient}>
                <HomeHeader/>
                <Component {...pageProps} />
                <Footer/>
            </QueryClientProvider>
        </>
    )
        ;
}

export default MyApp;
