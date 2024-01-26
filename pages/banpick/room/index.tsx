import {NextPage} from "next";
import BanPickRoomParticipate from "@/component/banpick/BanPickRoomParticipate";
import styled from "@emotion/styled";
import GlobalNavigationBarLogo from "@/component/home/GlobalNavigationBarLogo";

const BanPick: NextPage = () => {

    return (
        <BanPickRoomWrapper>
            <div className="backImg" style={{
                position: "fixed",
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                zIndex: 0,
                backgroundImage: "url('/redBlue2.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.5
            }}/>
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