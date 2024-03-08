import { NextPage } from "next";
import styled from "@emotion/styled";
import fontList from "@styles/fontList";
import UserIdBar from "@/component/banpick/Participate/UserIdBar";
import RoomInfoBar from "@/component/banpick/Participate/RoomInfoBar";


const GameInfo: NextPage<{isStart:boolean,text:any,roomUrl:string,roomId:string,myUserId:string}> = (props) => {

    const {isStart, text, roomUrl, roomId, myUserId} = props;

    if(!isStart){
        return (
        <GameInfoWrapper>
            <div className="infoList">
            {(text.infoList as any[]).map(item => (
                <div key={item.index} className={`${item.index === 1 ? 'title' : 'info'}`}
                >{item.info}</div>
            ))}
            </div>
        </GameInfoWrapper>
        )
    }
    else{
        return (
        <InfoMationBottomWrapper>
            <UserIdBar idText={text.myId} myUserId={myUserId}></UserIdBar>
            <RoomInfoBar roomUrl={roomUrl} roomId={roomId}></RoomInfoBar>
        </InfoMationBottomWrapper>
        )
    }
}

export default GameInfo;

const GameInfoWrapper = styled.div`
    //size
    width: 70%;
    height: 100%;
    
    //align
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: end;
    
    .infoList {
    width: 500px;
    height: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    justify-content: center;
    align-items: start;
    gap: 10px;
    
    @media screen and (max-width: 750px) {
        width: 100%;
    }

    .info {
        //size
        width: 100%;

        //font
        font-family: ${fontList.roboto.medium["16"].fontFamily};
        font-size: ${fontList.roboto.medium["16"].fontSize};
        font-weight: ${fontList.roboto.medium["16"].fontWeight};
        line-height: ${fontList.roboto.medium["16"].lineHeight};
        letter-spacing: ${fontList.roboto.medium["16"].letterSpacing};
        color: rgba(181, 181, 181, 1);

        //align
        text-align: left;
        align-items: flex-start;
        -webkit-align-items: flex-start;
    }

    .title {

        //font
        font-family: ${fontList.roboto.medium["16"].fontFamily};
        line-height: ${fontList.roboto.medium["16"].lineHeight};
        letter-spacing: ${fontList.roboto.medium["16"].letterSpacing};
        color: rgba(181, 181, 181, 1);
        font-weight: bold;
        font-size: 1.5em;
        color: azure;
        text-align: left;
        padding-bottom: 10px;
        
    }
}`

const InfoMationBottomWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    z-index: 1;
`