import { NextPage } from "next";
import styled from "@emotion/styled";
import { Button } from "@nextui-org/react";
import colorList from "@styles/colorList";

const LastInfo: NextPage<{
    text:any,
    sendMsg: (message: any) => void,
    me:string,
    selectLane:string,    
    }> = (props) => {
    
    const {text,sendMsg,me,selectLane}  = props;
    let LaneSelectText;
    switch (selectLane) {
    case "":
        LaneSelectText = me === "none" ? text.laneSelectWaitObserver : text.laneSelect;
        break;
    case "red":
        LaneSelectText = me === "blue" ? text.laneSelect : text.laneSelectWaitBlue;
        break;
    case "blue":
        LaneSelectText = me === "red" ? text.laneSelect : text.laneSelectWaitRed;
        break;
    }
    const fontSizeClass = LaneSelectText ===text.laneSelect? "font-short" : "font-long";
    
    const myTeam = me === "none"? "observer" :me;
    return (
        <LastInfoWrapper>
            <Button
            isDisabled={myTeam === "observer" || selectLane===myTeam}
            className={`LaneSelectButton text-white ${myTeam} ${fontSizeClass}`}
            onClick={() =>
                sendMsg({
                    type: "laneSelect", 
                    selectTeam: myTeam
                })
            }
            ><span style={{whiteSpace:'pre-line', }}>
                {LaneSelectText}
            </span>
        </Button>
        </LastInfoWrapper>
    )
}

export default LastInfo;

const LastInfoWrapper = styled.div`
    width:50%;
    height: 330px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    @media (max-width: 800px) {
        width: 50%;
        max-width: none;
        position: relative;
        height: 40px;
    }
    
    .LaneSelectButton {
        //size
        width: 100%;
        height: 20%;
    
        border-radius: 10px;
        
        font-weight: bold;
        line-height: 1.2;

        @media (max-width: 800px) {
            height: 40px;
            margin-top: 0;
        }
    
    }
    .red{
        background-color: ${colorList.banPick.redTeam};
    
        /disabled 상태
    
        &:disabled {
            background-color: ${colorList.banPick.redTeamHover2};
            opacity: 0.5;
            cursor: default;
        }
    }
    .blue{
        background-color: ${colorList.banPick.blueTeam};
    
        //disabled 상태
    
        &:disabled {
            background-color: ${colorList.banPick.blueTeamHover2};
            opacity: 0.5;
            cursor: default;
        }
    }
    //관전자
    .observer{
        background-color: ${colorList.semantic.hover};
    
    }
    
    .font-short{
        font-size : 2vmax;
    }
    .font-long{
        font-size :1.6vmax
    }
`
