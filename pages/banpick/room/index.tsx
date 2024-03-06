import {NextPage} from "next";
import styled from "@emotion/styled";
import GlobalNavigationBarLogo from "@/component/home/GlobalNavigationBarLogo";
import Head from "next/head";
import I18n from "@/component/locale/i18n";
import BanPickRoomParticipate from "@/component/banpick/Participate/BanPickRoomParticipate";

const BanPick: NextPage = () => {

    const description = I18n("common.json").description;

    return (
        <BanPickRoomWrapper>
            <Head>
                <meta charSet="utf-8"/>
                <link rel="icon" href="/favicon.svg"/>
                <link rel="apple-touch-icon" href="/favicon.svg"/>
                <link rel="shortcut icon" href="/favicon.svg"/>
                <meta name="keywords" content="롤 밴픽,밴픽,밴 픽,롤,lol banpick,ban pick,pick ban"/>
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
            <GlobalNavigationBarLogo where="banPick"/>
            <div className="banpickRoom">
                <BanPickRoomParticipate/>
            </div>
        </BanPickRoomWrapper>
    );
}
export default BanPick;

const BanPickRoomWrapper = styled.div`
    width: 100%;
    height: 100%;
    .banpickRoom {
        position: relative;
        width: 100%;
        z-index: 1;
    }
`