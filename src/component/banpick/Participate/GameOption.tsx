import { NextPage } from "next";
import styled from "@emotion/styled";
import React, { useState } from 'react';
import TimeLimit from "@/component/banpick/Participate/TimeLimit";
import GameMode from "@/component/banpick/Participate/GameMode";

const GameOption: NextPage<{
    selectedGameMode:string,
    setSelectedGameMode:(value: string) => void,
    isTimeLimited:boolean, 
    setIsTimeLimited:(value:boolean) => void,
    sendMsg:Function,
    hostId:string,
    myUserId:string,
    myId:any,
    }> = (props) => {
    const { selectedGameMode, setSelectedGameMode,isTimeLimited,setIsTimeLimited,sendMsg,hostId,myUserId ,myId} = props;
    
    return (
        <GameOptionWrapper>
            <GameMode selectedGameMode={selectedGameMode} setSelectedGameMode={setSelectedGameMode} myUserId ={myUserId} sendMsg={sendMsg} hostId={hostId} myId={myId} ></GameMode>
            <TimeLimit isTimeLimited={isTimeLimited} setIsTimeLimited={setIsTimeLimited} hostId={hostId} myId={myId}></TimeLimit>
        </GameOptionWrapper>
        
    );
}

export default GameOption;

const GameOptionWrapper = styled.div`
//size
width: 100%;
height: 100%;

//align
display: flex;
flex-direction: column;
gap:10px;

margin-bottom: 10px;
`
