import {NextPage} from "next";
import SoloMain from "@/component/solo/SoloMain";
import HomeHeader from "@/component/home/Header";
import styled from "@emotion/styled";
import Head from "next/head";
import I18n from "@/component/locale/i18n";

const Solo: NextPage = () => {

    const description = I18n("common.json").description;
    return (
        <SoloPageWrapper>
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
            <SoloMain></SoloMain>
        </SoloPageWrapper>
    );
}

export default Solo;

const SoloPageWrapper = styled.div`
    width: 100%
`