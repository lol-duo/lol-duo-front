import { NextPage } from "next";
import styled from "@emotion/styled";
import UserIdBar from "@/component/banpick/Participate/UserIdBar";
import RoomInfoBar from "@/component/banpick/Participate/RoomInfoBar";

const InfoamtionBar: NextPage<{idText:string,myUserId:string,roomUrl:string,roomId:any}> = (props) => {

    const {idText, myUserId, roomUrl, roomId} = props;

    return (
        <InfoamtionBarWrapper>
            <UserIdBar idText={idText} myUserId={myUserId}></UserIdBar>
            <RoomInfoBar roomUrl={roomUrl} roomId={roomId}></RoomInfoBar>
        </InfoamtionBarWrapper>
    )
}

export default InfoamtionBar;

const InfoamtionBarWrapper = styled.div`
//size
width: 100%;
height: 100%;

//align
display: flex;
flex-direction: row;
justify-content: center;

//etc 
gap: 20px;
`
