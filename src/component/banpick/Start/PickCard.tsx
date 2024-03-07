import {NextPage} from "next"
import styled from "@emotion/styled";
import {Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";
import colorList from "@styles/colorList";

const PickCard: NextPage<{
    team:number,
    now:number, 
    me:string, 
    selectedChampion: {
        img: string,
        en_name: string,
        ko_name: string,
        name_id: string,
    }[],
    changeChampion:Function, 
    imgURL:any, 
    locale:string,
    isOpen:number,
    setIsOpen:Function
    turn:number,
    selectedGameMode:string,
    selectLane:string,
    }> = (props) => {  

    const {team,now, me, selectedChampion, changeChampion, imgURL, locale, isOpen, setIsOpen, turn,selectedGameMode,selectLane} = props;
    const blueTeamTurn = [6,9,10,17,18];
    const redTeamTurn = [7,8,11,16,19];
    const lane = ["TOP", "JUNGLE", "MID", "BOT", "SUPPORT"];
    const myLane = team === 0 ? lane[blueTeamTurn.indexOf(turn)] : lane[redTeamTurn.indexOf(turn)];
    //관전자가 SoloMode에서 픽 변경 가능한 문제 해결 위하여 추가
    const isSoloModeHost = selectedGameMode === "solo" && (me === "blue" || me ==="red");
    if(team == 0){
        return (
            <PickCardWrapper  >
                <Popover placement={"right"} isOpen={now === 20 && (me === "blue" || isSoloModeHost ) && me!==selectLane ? isOpen == turn : false}  onOpenChange={(open) => {
                        setIsOpen(open ? turn : -1)
                    }}  style={{backgroundColor: "none"}} classNames={{
                    content: "bg-content1-none shadow-none hover:none focus:none",
                }}>
                <PopoverTrigger>
                    <div className={now === turn ? "pick now blue" : now === 20 && (me === "blue" || isSoloModeHost) && me!==selectLane  ? "pick hover blue" : "pick blue"} >
                        {
                            now == turn && <div className="now"/>
                        }
                        {
                            selectedChampion[turn] &&
                            <img loading="eager" className="img" src={`https://d3b83p9ttz58gf.cloudfront.net${selectedChampion[turn].img}`} alt={selectedChampion[turn].img}/>
                        }
                        {
                            selectedChampion[turn] &&
                            <div className="championName blue">
                                <span>{locale==="ko" ? selectedChampion[turn].ko_name : selectedChampion[turn].en_name}</span>
                            </div>
                        }
                        {
                            now >= 20 &&
                            <div className="swap">
                                <div className="swap-border">
                                    <img src={imgURL.swap} alt={imgURL.swap}
                                            height={45} width={45}/>
                                </div>
                            </div>
                        }
                        {
                            now >= 20 &&
                            <div className="championLane blue">
                            <img loading="lazy" src={imgURL.laneImg[myLane]} alt={myLane}
                                height={30} width={30}/>
                        </div>
                        }
                    </div>
                </PopoverTrigger>
                <PopoverContent >
                    <PopUp>
                        <div className="change_img">
                            {blueTeamTurn.map((value, index) => (
                                value !== turn && selectedChampion[value] && (
                                    <div key={index} className="change_div"> <img
                                        onClick={() => changeChampion(turn, value)} className="img"
                                        src={imgURL.laneImg[lane[index]]}
                                        alt={lane[index]}
                                        width={50}
                                        height={50}
                                    />
                                    </div>
                                )
                            ))}
                        </div>
                    </PopUp>
                </PopoverContent>
            </Popover>            
            </PickCardWrapper>
        )        
    }
    else{
        return (
            <PickCardWrapper>
                <Popover placement={"left"} isOpen={now === 20 &&( me === "red" || isSoloModeHost) && me!==selectLane ? isOpen == turn : false} onOpenChange={(open) => {
                    setIsOpen(open ? turn : -1)
                }}  style={{backgroundColor: "none"}} classNames={{
                    content: "bg-content1-none shadow-none hover:none focus:none",
                }}>
                    <PopoverTrigger>
                <div className={now === turn ? "pick now red" : now === 20 && (me === "red" || isSoloModeHost) && me!==selectLane ? "pick hover red" : "pick red"} >
                    {
                        now == turn && <div className="now"/>
                    }
                    {
                        selectedChampion[turn] &&
                                    <img loading="eager" className="img" src={`https://d3b83p9ttz58gf.cloudfront.net${selectedChampion[turn].img}`} alt={selectedChampion[turn].img}/>
                        }
                        {
                            selectedChampion[turn] &&
                            <div className="championName red">
                                <span>{locale==="ko" ? selectedChampion[turn].ko_name : selectedChampion[turn].en_name}</span>
                            </div>
                        }
                        {
                            now >= 20 &&
                            <div className="swap">
                                <div className="swap-border">
                                    <img loading="lazy" src={imgURL.swap} alt={imgURL.swap}
                                        height={45} width={45}/>
                                </div>

                            </div>
                        }
                        {
                            now >= 20 &&
                            <div className="championLane red">
                                <img loading="lazy" src={imgURL.laneImg[myLane]} alt={imgURL.laneImg[myLane]}
                                    height={30} width={30}/>
                            </div>
                        }
                    </div>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopUp>
                            <div className="change_img">
                                {redTeamTurn.map((value, index) => (
                                        value !== turn && selectedChampion[value] && (
                                            <div key={index} className="change_div"> <img
                                                onClick={() => changeChampion(turn, value)} className="img"
                                                src={imgURL.laneImg[lane[index]]}
                                                alt={lane[index]}
                                                width={50}
                                                height={50}
                                            />
                                            </div>
                                            
                                        )
                                ))}
                            </div>
                        </PopUp>
                    </PopoverContent>
                </Popover>
            </PickCardWrapper>
        )
    }
}

export default PickCard;

const PickCardWrapper = styled.div`
width: 100%;
height: 100%;

position: relative;

    .pick {
        position: relative;
        width: 100%;
        height: 150px;
        background-color: rgba(33, 33, 33, 0.5);
        border-left: 2px solid rgba(33, 33, 33, 0.5);
        border-top: 2px solid rgba(33, 33, 33, 0.5);
        border-right: 2px solid rgba(33, 33, 33, 0.5);
        overflow: hidden;

        //championName 우측, 아래로 배치
        display: flex;
        align-items: end;
        
        
        &.blue {
            flex-direction: row-reverse;
            justify-content: end;
        }

        &.red {
            flex-direction: row;
            justify-content: start;
        }
        
        @media screen and (max-width: 1100px) {
            height: 100px;
        }

        .img {
            position: absolute;
            height: auto !important;
            inset: 0;
        }

        .championName{
            position: relative;
            color: ${colorList.grayscale["100"]};
            width: 50%;
            height: 30%;
            display: flex;
            
            align-items: center;
            font-size: 17px;
            font-weight: bold;

            &.blue {
                justify-content: end;
                margin-right: 10px;
            }
            
            &.red {
                justify-content: start;
                margin-left: 10px;
            }
        }
        .swap{
            
            width: 100%;
            height: 100%;
            position: absolute;
            display: flex;
            align-items: center;
            opacity: 0;
            justify-content: center;

            .swap-border{
                width: 60px;
                height: 60px;
                object-position: center;
                display: flex;
                align-items: center;
                justify-content: center;
                border:4px solid ${colorList.secondary.beige};
                border-radius: 50%;
                background-color: rgba(33,33,33,0.8);
            }
        }                
        .championLane{

            position: relative;
            width: 50%;
            height: 90%;
            display: flex;
       
            &.blue {
                justify-content: start;
                margin-left: 15px;
            }
            
            &.red {
                justify-content: end;
                margin-right: 15px;
            }
        }

        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
        }

        .now {
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: 2;
            animation: blink 5s linear infinite;
            background: linear-gradient(270deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 100%, rgba(255, 255, 255, 0) 100%);
        }
    }

    .last {
        border-bottom: 2px solid rgba(33, 33, 33, 0.5);
    }
    
    .hover{
        &:hover {
            cursor: pointer;
            filter: contrast(80%);
            .swap{
                opacity: 1;
            }
        }
    }
`


const PopUp = styled.div`
    .change_img {
        position: relative;
        display: grid;
        background-color: rgba(33, 33, 33, 0.7);
        width: 100px;
        height: 100px;
        place-items: center;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        border-radius: 10px;
        
        .change_div{
            border: 2px solid rgba(0, 0, 0, 0);
            border-radius: 50%;
            width: 45px;
            height: 45px;
            display: flex;
            justify-content: center;
            align-items: center;

            &:hover {
                border: 2px solid ${colorList.secondary.beige};
                cursor: pointer;
            }
            
            .img {
                width: 35px;
                height: 35px;                
                object-position: center;
            }
        }
       
        
    }
`