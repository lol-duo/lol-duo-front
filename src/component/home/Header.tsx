import {NextPage} from "next";
import styled from "@emotion/styled";
import GlobalNavigationBarLogo from "@/component/home/GlobalNavigationBarLogo";
import GlobalNavigationBar from "@/component/home/GlobalNavigationBar";

const HomeHeader: NextPage = () => {
    return (
        <HeaderWrapper>
            <GlobalNavigationBarLogo/>
            <GlobalNavigationBar/>
        </HeaderWrapper>
    );
}

export default HomeHeader;

const HeaderWrapper = styled.div`
    position: relative;
    z-index: 0;
`
