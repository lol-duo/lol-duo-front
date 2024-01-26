import {NextPage} from "next";
import BanPickRoom from "@/component/banpick/BanPickRoom";
import GlobalNavigationBarLogo from "@/component/home/GlobalNavigationBarLogo";
import styled from "@emotion/styled";

const BanPick: NextPage = () => {

    return (
        <BanPickWrapper>
            <div className="backImg" style={{
                position: "fixed",
                top:'0',
                left:'0',
                width: '100%',
                height: '100%',
                zIndex: -1,
                backgroundImage: "url('/redBlue2.png')",
                backgroundSize: "cover",
                backgroundPosition:"center",
                opacity: 0.5
            }}/>
            <GlobalNavigationBarLogo where="banPick"/>
            <BanPickRoom/>
        </BanPickWrapper>

    );
}
export default BanPick;

const BanPickWrapper = styled.div`
    width: 100%;
    height: 100%;
    
`