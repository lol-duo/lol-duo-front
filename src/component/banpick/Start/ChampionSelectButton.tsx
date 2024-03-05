import { NextPage } from "next";
import styled from "@emotion/styled";
import colorList from "@styles/colorList";

const ChampionSelectButton: NextPage<{
    now:number,
    me: string,
    blueTurn:any,
    sendMsg: (message: any) => void,
    setChampionSelect:Function,
    championSelect:boolean,
}> = (props) => {

    const {now,me,blueTurn,sendMsg,setChampionSelect,championSelect}    = props;
    
    if(now<20){
        return (
            <ChampionSelectButtonWrapper>
                {me === "none" && <div className="none">선택</div>}
                {
                    me === "red" &&
                    <div className={!blueTurn.includes(now) && championSelect ? "red_on" : "red"}
                            onClick={() => {
                                if (blueTurn.includes(now) || !championSelect) return;
                                setChampionSelect(false);
                                sendMsg({
                                    type: "next",
                                    message: {}
                                });
                            }}>선택</div>
                }
                {
                    me === "blue" &&
                    <div className={blueTurn.includes(now) && championSelect ? "blue_on" : "blue"}
                            onClick={() => {
                                if (!blueTurn.includes(now) || !championSelect) return;
                                setChampionSelect(false);
                                sendMsg({
                                    type: "next",
                                    message: {}
                                });
                            }}>선택</div>
                }           
            </ChampionSelectButtonWrapper>
        )
    }

}

export default ChampionSelectButton;

const ChampionSelectButtonWrapper = styled.div`
width: 100%;
height: 100%;
margin-top: 10px;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
    
.none {
    width: 100%;
    height: 100%;
    background-color: ${colorList.semantic.hover};
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${colorList.grayscale["000"]};
    font-size: 20px;
    font-weight: bold;
    &:hover {
        cursor: not-allowed;
    }
}

.red {
    width: 50%;
    height: 40px;
    background-color: ${colorList.banPick.redTeamHover2};
    opacity: 0.5;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${colorList.grayscale["000"]};
    font-size: 20px;
    font-weight: bold;
    &:hover {
        cursor: not-allowed;
    }
}

.red_on {
    width: 50%;
    height: 40px;
    background-color: ${colorList.banPick.redTeam};
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${colorList.grayscale["000"]};
    font-size: 20px;
    font-weight: bold;
    &:hover {
        cursor: pointer;
        background-color: ${colorList.banPick.redTeamHover};
    }
}

.blue {
    width: 50%;
    height: 40px;
    background-color: ${colorList.banPick.blueTeamHover2};
    opacity: 0.5;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${colorList.grayscale["000"]};
    font-size: 20px;
    font-weight: bold;
    &:hover {
        cursor: not-allowed;
    }
}

.blue_on {
    width: 50%;
    height: 40px;
    background-color: ${colorList.banPick.blueTeam};
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${colorList.grayscale["000"]};
    font-size: 20px;
    font-weight: bold;
    &:hover {
        cursor: pointer;
        background-color: ${colorList.banPick.blueTeamHover};
    }
}
`
