import { NextPage } from "next";
import styled from "@emotion/styled";
import React, { useState } from 'react';
import TimeLimit from "@/component/banpick/Participate/TimeLimit";
import GameMode from "@/component/banpick/Participate/GameMode";

const GameOption: NextPage<{selectedGameMode:string,setSelectedGameMode:Function}> = (props) => {
    const { selectedGameMode, setSelectedGameMode } = props;

    return (
        <GameOptionWrapper>
            <GameMode selectedGameMode={selectedGameMode} setSelectedGameMode={setSelectedGameMode} ></GameMode>
            <TimeLimit></TimeLimit>
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
