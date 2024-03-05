import { NextPage } from "next";
import styled from "@emotion/styled";
import React, { useState } from 'react';
import I18n from "@/component/locale/i18n";1
import fontList from "@styles/fontList";


const GameMode: NextPage<{}> = (props) => {
    const [selectedOption, setSelectedOption] = useState<string>("1:1");

    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
    };
    const text = I18n('banpick.json').value;
    return (
        <GameModeWrapper>
            <label>
                <input
                    type="radio"
                    name="radioGroup"
                    value="1:1"
                    defaultChecked={selectedOption === "1:1"}
                    onChange={() => handleOptionChange("1:1")}
                />
                1:1
            </label>

            <label>
                <input
                    type="radio"
                    name="radioGroup"
                    value="solo"
                    defaultChecked={selectedOption === "solo"}
                    onChange={() => handleOptionChange("solo")}
                />
                {text.gameMode}
            </label>
        </GameModeWrapper>
    );
};

export default GameMode;

const GameModeWrapper = styled.div`
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
