import { NextPage } from "next";
import styled from "@emotion/styled";
import React, { useState } from 'react';
import I18n from "@/component/locale/i18n";
import fontList from "@styles/fontList";
import {Switch} from "@nextui-org/react";
const TimeLimit: NextPage<{
    isTimeLimited:any, 
    setIsTimeLimited:(value:boolean) => void,
    hostId:string,
    myId:any,
    }> = (props) => {
    
    const {isTimeLimited,hostId,myId,setIsTimeLimited} = props;
    const text = I18n('banpick.json').value;
    // useState를 사용하여 초기값 설정
    const handleToggle = () => {
        setIsTimeLimited(!isTimeLimited);
    };
    return (
        <TimeLimitWrapper>
            <div>{text.timeLimit} {isTimeLimited ? "ON" : "OFF"}</div>
            <Switch
                isDisabled= {hostId != myId.current}
                isSelected={isTimeLimited}
                onChange={handleToggle}
            />
        </TimeLimitWrapper>
        
    );
}

export default TimeLimit;

const TimeLimitWrapper = styled.div`
//size
width: 100%;
height: 100%;

//align
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
gap:20px;


//font
font-family: ${fontList.roboto.regular["14"].fontFamily};
font-size: ${fontList.roboto.regular["14"].fontSize};
font-weight: ${fontList.roboto.regular["14"].fontWeight};
line-height: ${fontList.roboto.regular["14"].lineHeight};
letter-spacing: ${fontList.roboto.regular["14"].letterSpacing};
color: rgba(181, 181, 181, 1);


`
