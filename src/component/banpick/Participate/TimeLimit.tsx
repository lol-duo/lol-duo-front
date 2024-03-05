import { NextPage } from "next";
import styled from "@emotion/styled";
import {Button} from "@nextui-org/react";
import React, { useState } from 'react';
import I18n from "@/component/locale/i18n";
import fontList from "@styles/fontList";
import {Switch} from "@nextui-org/react";
const TimeLimit: NextPage<{isTimeUnlimited:boolean, setIsTimeUnlimited:(value: boolean) => void}> = (props) => {

    const {isTimeUnlimited, setIsTimeUnlimited} = props;
    const text = I18n('banpick.json').value;
    const handleToggle = () => {
        setIsTimeUnlimited(!isTimeUnlimited);
    };
    return (
        <TimeLimitWrapper>
            <div>{text.timeLimit}{isTimeUnlimited ? " OFF" : " ON"}</div>
            <Switch
                defaultChecked={isTimeUnlimited}
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
