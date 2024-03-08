import { NextPage } from "next";
import styled from "@emotion/styled";
import React, { useState } from 'react';
import I18n from "@/component/locale/i18n";
import fontList from "@styles/fontList";
import {RadioGroup, Radio} from "@nextui-org/react";
import colorList from "@styles/colorList";
const GameMode: NextPage<{selectedGameMode:string,hostId:string, myUserId:string,setSelectedGameMode:(value: string) => void,sendMsg:Function,myId:any}> = (props) => {
    const { selectedGameMode, sendMsg,setSelectedGameMode,hostId ,myUserId,myId} = props;
    const text = I18n('banpick.json').value;

    const handleRadioChange = (value: string) => {
        const msg = value === "1:1" ? text.duelModeChangeMsg : text.soloModeChangeMsg;
        // 라디오 버튼이 변경되기 전에 확인 메시지를 띄우기
        
        if (window.confirm(msg)) {
            // '확인'을 누른 경우에만 라디오 버튼의 값을 변경
            value === "1:1" ? sendMsg({type:"1:1Mode",rootId : hostId,userName:myUserId}) : sendMsg({type:"soloMode",rootId : hostId,userName:myUserId});  
            setSelectedGameMode(value);
        }
      };
    return (
        <GameModeWrapper>
            <RadioGroup
                isDisabled= {hostId != myId.current}
                value={selectedGameMode}
                onValueChange={(value) => handleRadioChange(value)}
                orientation="horizontal"
            >
                <Radio value="1:1">
                    <span className="mode-text">1:1</span>
                </Radio>
                <Radio value="solo">
                    <span className="mode-text">{text.gameMode}</span>
                </Radio>
            </RadioGroup>
        </GameModeWrapper>
    );
};

export default GameMode;

const GameModeWrapper = styled.div`
//size
width: 100%;
height: 50%;

//align
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
gap:20px;

    //font
    .mode-text{
        font-family: ${fontList.roboto.regular["14"].fontFamily};
        font-size: ${fontList.roboto.regular["14"].fontSize};
        font-weight: ${fontList.roboto.regular["14"].fontWeight};
        line-height: ${fontList.roboto.regular["14"].lineHeight};
        letter-spacing: ${fontList.roboto.regular["14"].letterSpacing};
        color: rgba(181, 181, 181, 1);
    }
    //선택된 부분 안쪽 원
    .bg-primary{
        background-color: ${colorList.main.secondaryBeige};
    }
    .border-default{
        border-color:${colorList.main.secondaryBeige} !important; 
    }

`