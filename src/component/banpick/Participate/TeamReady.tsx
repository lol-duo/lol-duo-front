import { NextPage } from "next";
import styled from "@emotion/styled";
import fontList from "@styles/fontList";
import colorList from "@styles/colorList";
import { Button } from "@nextui-org/react";
import GameOption from "@/component/banpick/Participate/GameOption";

const TeamReady: NextPage<{
    rootId:string,
    blueTeam:any,
    redTeam:any,
    sendMsg:Function,
    text:any,
    selectedGameMode:string,
    setSelectedGameMode:(value: string) => void,
    hostId:string,
    myUserId:string,
    myId:any,
    isTimeLimited:boolean,
    setTimeLimited :any,
    }> = (props) => {
    
    const {rootId, blueTeam, redTeam, sendMsg, text,selectedGameMode,setSelectedGameMode,hostId,myUserId,myId,isTimeLimited,setTimeLimited} = props;
    
    return (
        <TeamReadyWrapper>
            <div className="teamReadyCard">
                <GameOption selectedGameMode={selectedGameMode} setSelectedGameMode={setSelectedGameMode} myUserId ={myUserId} sendMsg={sendMsg} hostId={hostId} myId={myId} isTimeLimited={isTimeLimited} setTimeLimited ={setTimeLimited}></GameOption>
                <div className="startButton">
                    {rootId != undefined &&
                        <Button disabled={(!(redTeam.status === "ready" && blueTeam.status === "ready"))}
                                onClick={() => sendMsg({type: "start", id: rootId})}>게임 시작</Button>}
                    {rootId == undefined &&
                        <Button disabled={true}>게임 시작</Button>}
                    <div className="info">
                        {text.startButtonInfo}
                    </div>
                </div>
            </div>         
        </TeamReadyWrapper>
    )
}

export default TeamReady;

const TeamReadyWrapper = styled.div`
//size
width: 25%;
height: 270px;
min-wdith: 300px;

//align
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

    .teamReadyCard{
        width: 100%;
        height : 80%;
        border-radius: 10px;
        border: 2px solid ${colorList.secondary.beige};
        background: rgba(47, 47, 47, 1);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap:15px;
        
        .startButton {
            //size
            width: 80%;
            height: 50%;
    
            //align
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 5px;
    
            Button {
                //size
                width: 100%;
                height: 70px;
    
                border-radius: 10px;
                border-left-color: ${colorList.banPick.blueTeam};
                border-right-color: ${colorList.banPick.redTeam};
                border-bottom-color: linear-gradient(to right, ${colorList.banPick.blueTeam}, ${colorList.banPick.redTeam});
                background: linear-gradient(to right, ${colorList.banPick.blueTeam}, ${colorList.banPick.redTeam});
    
                border: 2px solid ${colorList.secondary.beige};
                //황금색 테두리 때문에 임시 주석 03.07 ajw 
                //border-top-color: rgba(118, 118, 118, 0.3);
    
                color: white;
                font-weight: bold;
                font-size: 20px;
    
                &:active {
                    outline: none;
                }
                
                &:focus {
                    outline: none;
                }
            
                &:hover {
                    background: linear-gradient(to right, ${colorList.banPick.blueTeamHover}, ${colorList.banPick.redTeamHover});
                    cursor: pointer;
                }
    
                &:disabled {
                    
                    &:hover {
                        background: linear-gradient(to right, ${colorList.banPick.blueTeam}, ${colorList.banPick.redTeam});
                        cursor: default;
                    }
                    
                    opacity: 0.5;
                    cursor: default;
                }
            }
            
            .info {
                color: #888888;
                height: 20px;
                
                font-family: ${fontList.roboto.regular["14"].fontFamily};
                font-size: ${fontList.roboto.regular["14"].fontSize};
                font-weight: ${fontList.roboto.regular["14"].fontWeight};
                line-height: ${fontList.roboto.regular["14"].lineHeight};
                letter-spacing: ${fontList.roboto.regular["14"].letterSpacing};
                
                @media (max-width: 1400px) {
                    font-size: 12px;
                }
                
                @media (max-width: 1200px) {
                    font-size: 10px;
                }
            }
        }
    }

`
