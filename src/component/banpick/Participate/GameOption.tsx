import { NextPage } from "next";
import styled from "@emotion/styled";
import React, { useState } from 'react';
import TimeLimit from "@/component/banpick/Participate/TimeLimit";
import GameMode from "@/component/banpick/Participate/GameMode";

const GameOption: NextPage<{
    selectedGameMode:string,
    setSelectedGameMode:(value: string) => void,
    sendMsg:Function,
    hostId:string,
    myUserId:string,
    myId:any,
    isTimeLimited:boolean,
    setTimeLimited :any,
    }> = (props) => {
    const { selectedGameMode, setSelectedGameMode,sendMsg,hostId,myUserId ,myId,isTimeLimited,setTimeLimited} = props;
    
    return (
        <GameOptionWrapper>
            <GameMode selectedGameMode={selectedGameMode} setSelectedGameMode={setSelectedGameMode} myUserId ={myUserId} sendMsg={sendMsg} hostId={hostId} myId={myId} ></GameMode>
            <TimeLimit hostId={hostId} myId={myId} isTimeLimited={isTimeLimited} setTimeLimited ={setTimeLimited}></TimeLimit>
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
