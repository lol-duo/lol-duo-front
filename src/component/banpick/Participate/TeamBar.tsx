import { NextPage } from "next";
import styled from "@emotion/styled";
import Team from "@/component/banpick/Participate/Team";
import TeamReady from "./TeamReady";

const TeamBar: NextPage<{blueTeam:any,redTeam:any,rootId:any,myId:any,sendTeamMsg:Function,sendMsg:Function,myUserId:string,text:any}> = (props) => {

    const {blueTeam, redTeam, myId, sendMsg, sendTeamMsg, myUserId, text, rootId} = props;
    
    return (
        <TeamBarWrapper>
            <TeamBarWrapper>
                <Team Team={0} blueTeam={blueTeam} redTeam={redTeam} myId={myId} sendTeamMsg={sendTeamMsg} myUserId={myUserId} text={text}></Team>
                <TeamReady rootId={rootId} blueTeam={blueTeam} redTeam= {redTeam} sendMsg={sendMsg} text={text} ></TeamReady>
                <Team Team={1} blueTeam={blueTeam} redTeam={redTeam} myId={myId} sendTeamMsg={sendTeamMsg} myUserId={myUserId} text={text}></Team>
            </TeamBarWrapper>
        </TeamBarWrapper>
    )
}

export default TeamBar;

const TeamBarWrapper = styled.div`
//size
width: 100%;
height: 100%;

//align
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
gap: 20px;

`
