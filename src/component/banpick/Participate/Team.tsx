import { NextPage } from "next";
import styled from "@emotion/styled";
import { Button } from "@nextui-org/react";
import fontList from "@styles/fontList";
import colorList from "@styles/colorList";

const Team: NextPage<{Team:number,blueTeam:any,redTeam:any,myId:any,sendTeamMsg:Function,myUserId:string,text:any,selectedGameMode:string}> = (props) => {

    const {Team,blueTeam,redTeam,myId,sendTeamMsg,myUserId,text,selectedGameMode} = props;
    // 블루팀
    if(Team === 0){
        return (
            <BlueWrapper>
                <div className="title">{text.blueTeam}</div>
                <div className="status">
                    {blueTeam.user === "" && text.status.waiting}
                    {blueTeam.user === myId.current && myUserId + " ( ME )"}
                    {blueTeam.user !== myId.current && blueTeam.user !== "" && blueTeam.userName}
                </div>
                <div className="in_button">
                    {selectedGameMode !== "solo" && blueTeam.user === myId.current &&
                        <div className="readyButton">
                            {
                                blueTeam.user === myId.current && blueTeam.status === "in" &&
                                <Button
                                    onClick={() => sendTeamMsg({team: "blue", status: "ready"})}>준비하기</Button>
                            }
                            {
                                blueTeam.user === myId.current && blueTeam.status === "ready" &&
                                <Button onClick={() => sendTeamMsg({team: "blue", status: "in"})}>준비
                                    취소하기</Button>
                            }
                            {
                                blueTeam.user !== myId.current && <Button disabled={true}>준비하기</Button>
                            }
                        </div>
                    }
                    {selectedGameMode!=="solo" && redTeam.user !== myId.current && blueTeam.status === "none" && <Button
                        onClick={() => sendTeamMsg({team: "blue", status: "in"})}>BLUE 팀 참가하기</Button>}
                    {selectedGameMode!=="solo" && (redTeam.user === myId.current || (blueTeam.user !== myId.current && blueTeam.user !== "" && blueTeam.status !== "ready")) && blueTeam.status !== "ready" &&
                        <Button disabled={true} className="none">BLUE 팀 참가하기</Button>}
                    {blueTeam.status === "in" && blueTeam.user === myId.current && <Button
                        className="outButton"
                        onClick={() => sendTeamMsg({team: "blue", status: "none"})}>나가기</Button>}
                    {(selectedGameMode==="solo" || (blueTeam.user !== myId.current && blueTeam.status === "ready") ) && <Button
                        disabled={true}>RED 팀 준비완료</Button>}
                </div>
            </BlueWrapper>
        )
    }
    // 레드팀
    else {
        return (
            <RedWrapper>
                <div className="title">{text.redTeam}</div>
                <div className="status">
                    {redTeam.user === "" && text.status.waiting}
                    {redTeam.user === myId.current && myUserId + " ( ME )"}
                    {redTeam.user !== myId.current && redTeam.user !== "" && redTeam.userName}
                </div>
                <div className="in_button">
                    {selectedGameMode !== "solo" && redTeam.user === myId.current &&
                        <div className="readyButton">
                            {
                                redTeam.user === myId.current && redTeam.status === "in" &&
                                <Button
                                    onClick={() => sendTeamMsg({team: "red", status: "ready"})}>준비하기</Button>
                            }
                            {
                                redTeam.user === myId.current && redTeam.status === "ready" &&
                                <Button onClick={() => sendTeamMsg({team: "red", status: "in"})}>준비
                                    취소하기</Button>
                            }
                            {
                                redTeam.user !== myId.current &&
                                <Button disabled={true}>준비하기</Button>
                            }
                        </div>
                    }
                    {selectedGameMode!=="solo" && blueTeam.user !== myId.current && redTeam.status === "none" &&
                        <Button onClick={() => sendTeamMsg({team: "red", status: "in"})}>RED 팀 참가하기</Button>}
                    {selectedGameMode!=="solo" && (blueTeam.user === myId.current || (redTeam.user !== myId.current && redTeam.user !== "" && redTeam.status !== "ready")) && redTeam.status !== "ready" &&
                        <Button disabled={true} className="none">RED 팀 참가하기</Button>}
                    {redTeam.status === "in" && redTeam.user === myId.current &&
                        <Button className="outButton"
                                onClick={() => sendTeamMsg({team: "red", status: "none"})}>나가기</Button>}
                    {(selectedGameMode==="solo" ||  (redTeam.user !== myId.current && redTeam.status === "ready")) &&
                        <Button disabled={true}>RED 팀 준비완료</Button>}
                </div>
            </RedWrapper>
        )
    }

}

export default Team;

const BlueWrapper = styled.div`
//size
width: 40%;
height: 300px;

//align
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 10px;
    
    .title {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        font-family: ${fontList.roboto.regular["20"].fontFamily};
        font-size: ${fontList.roboto.regular["20"].fontSize};
        font-weight: ${fontList.roboto.regular["20"].fontWeight};
        line-height: ${fontList.roboto.regular["20"].lineHeight};
        letter-spacing: ${fontList.roboto.regular["20"].letterSpacing};
        color: ${colorList.grayscale["000"]};
    }
    
    .status {
        width: 50%;
        height: 35px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        background-color: white;
        border : 2px solid ${colorList.banPick.blueTeam};
        border-radius: 10px;

        font-family: ${fontList.roboto.regular["14"].fontFamily};
        font-size: ${fontList.roboto.regular["14"].fontSize};
        line-height: ${fontList.roboto.regular["14"].lineHeight};
        letter-spacing: ${fontList.roboto.regular["14"].letterSpacing};
        color: ${colorList.grayscale["400"]};

        font-weight: bold;
    }

    .in_button {
        width: 100%;
        height: 40px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 10px;

        .readyButton {
            width: 35%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            Button {
                width: 100%;
                height: 50px;

                border-radius: 10px;
                background: ${colorList.banPick.blueTeam};
                border-left-color: ${colorList.banPick.blueTeam};
                border-right-color: ${colorList.banPick.redTeam};
                border-top-color: rgba(118, 118, 118, 0.3);
                color: white;

                &:active {
                    outline: none;
                }

                &:disabled {
                    opacity: 0.5;
                    cursor: default;
                }
            }
        }

        .outButton {
            width: 15%;
            height: 100%;
            border-radius: 10px;
            border: none;
            background-color: ${colorList.grayscale["200"]};
            opacity: 0.8;
            color: ${colorList.grayscale["000"]};

            &:hover {
                background-color: #888888;
                cursor: pointer;
            }

            &:active {
                outline: none;
            }
            &:focus {
                outline: none;
            }

            &:disabled {
                background-color: ${colorList.banPick.blueTeamHover};
                opacity: 0.5;
                cursor: default;
            }
        }

        Button {
            width: 50%;
            height: 100%;
            border-radius: 10px;
            border: none;
            background-color: ${colorList.banPick.blueTeam};
            color: white;
            font-weight: bold;
            font-size: 15px;

            &:hover {
                background-color: ${colorList.banPick.blueTeamHover};
                cursor: pointer;
            }

            &:active {
                outline: none;
            }
            &:focus {
                outline: none;
            }

            &:disabled {
                background-color: ${colorList.banPick.blueTeamHover2};
                opacity: 0.5;
                cursor: default;
            }
        }
    }
`
const RedWrapper = styled.div`
//size
width: 40%;
height: 300px;

//align
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
gap: 15px;
    
    .title, .status{
        //align
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .title {
        //size
        width: 100%;

        //font
        font-family: ${fontList.roboto.regular["20"].fontFamily};
        font-size: ${fontList.roboto.regular["20"].fontSize};
        font-weight: ${fontList.roboto.regular["20"].fontWeight};
        line-height: ${fontList.roboto.regular["20"].lineHeight};
        letter-spacing: ${fontList.roboto.regular["20"].letterSpacing};
        color: ${colorList.grayscale["000"]};

    }
    
    .status {
        //size
        width: 50%;
        height: 35px;

        //font
        font-family: ${fontList.roboto.regular["14"].fontFamily};
        font-size: ${fontList.roboto.regular["14"].fontSize};
        font-weight: bold;
        line-height: ${fontList.roboto.regular["14"].lineHeight};
        letter-spacing: ${fontList.roboto.regular["14"].letterSpacing};
        color: ${colorList.grayscale["400"]};

        //etc
        background-color: white;
        border : 2px solid ${colorList.banPick.redTeam};
        border-radius: 10px;
    }
    
    .in_button {
        width: 100%;
        height: 40px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 10px;
        
        .readyButton {
        width: 35%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        
        Button {
            width: 100%;
            height: 50px;

            border-radius: 10px;
            background: ${colorList.banPick.redTeam};
            border-left-color: ${colorList.banPick.redTeam};
            border-right-color: ${colorList.banPick.blueTeam};
            border-top-color: rgba(118, 118, 118, 0.3);
            color: white;

            &:active {
                outline: none;
            }

            &:focus {
                outline: none;
            }
            
             &:disabled {
                 opacity: 0.5;
                 cursor: default;
             }
        }
    }
        
        .outButton {
                width: 15%;
                height: 100%;
                border-radius: 10px;
                border: none;
                background-color: ${colorList.grayscale["200"]};
                opacity: 0.8;
                color: ${colorList.grayscale["000"]};

                &:hover {
                    background-color: #888888;
                    cursor: pointer;
                }

                &:active {
                    outline: none;
                }
                &:focus {
                    outline: none;
                }

                &:disabled {
                    background-color: ${colorList.banPick.redTeamHover};
                    opacity: 0.5;
                    cursor: default;
                }
        }
        
        Button {
            width: 50%;
            height: 100%;
            border-radius: 10px;
            border: none;
            background-color: ${colorList.banPick.redTeam};
            color: white;
            font-weight: bold;
            font-size: 15px;
            
            &:hover {
                background-color: ${colorList.banPick.redTeamHover};
                cursor: pointer;
            }

            &:active {
                outline: none;
            }
            &:focus {
                outline: none;
            }
            
            &:disabled {
                background-color: ${colorList.banPick.redTeamHover2};
                opacity: 0.5;
                cursor: default;
            }
        }
    }
`