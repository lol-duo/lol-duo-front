import {NextPage} from "next";
import {HomeCssWrapper} from "@/component/home/HomeCssWrapper";
import DuoMain from "@/component/duo/DuoMain";
import HomeHeader from "@/component/home/Header";
import Head from "next/head";
import I18n from "@/component/locale/i18n";

const Home: NextPage = () => {

    const description = I18n("common.json").description;

    return (
        <HomeCssWrapper>
            <Head>
                <meta charSet="utf-8"/>
                <link rel="icon" href="/favicon.svg"/>
                <link rel="apple-touch-icon" href="/favicon.svg"/>
                <link rel="shortcut icon" href="/favicon.svg"/>
                <meta name="keywords" content="LOL-DUO,LOL,DUO,롤듀오,롤,듀오,LOL,LOL듀오,LOL 듀오"/>
                <meta name="author" content="LOL-DUO"/>

                <meta content="LOL-DUO" property="og:title"/>
                <meta content={description} property="og:description"/>
                <meta content="https://www.lolduo.net" property="og:url"/>
                <meta content="/1200_600.svg" property="og:image"/>
                <meta
                    content={description}
                    name="description"
                />
                <meta content="width=device-width, initial-scale=1" name="viewport"/>
                <meta content="#000000" name="theme-color"/>
                <link href="/favicon.svg" rel="apple-touch-icon"/>
                <title>LOL-DUO</title>
            </Head>
            <HomeHeader/>
            <DuoMain/>
        </HomeCssWrapper>
    );
}
export default Home;