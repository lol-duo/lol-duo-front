import { NextPage } from "next";
import styled from "@emotion/styled";
import ChampionSelect from "@/component/banpick/Start/ChampionSelect";
import Title from "@/component/banpick/Start/Title";
import Timer from "@/component/banpick/Start/Timer";
import Chat from "@/component/banpick/Participate/Chat";
import Image from "next/image";
import {Button} from "@nextui-org/react";
import LastInfo from "./LastInfo";
import EndInfo from "./EndInfo";
import Capture from "./Capture";

const MainList: NextPage<{
    lane:string,
    setLane:Function,
    search:any,
    setSearch:Function,
    now:number
    championList:
    [{id: number, 
        en_name: string, 
        name_id: string, 
        image: string, 
        ko_name: string, 
        positionList: string[]
    }],
    blueTurn:any,
    locale:string,
    sendMsg: (message: any) => void,
    me: string,
    setChampionSelect:Function,
    selectedChampion: {
        img: string,
        en_name: string,
        ko_name: string,
        name_id: string,
    }[],
    championSelect:boolean,
    text:any,
    time: number|string,

    chatList:Chat[],
    setChat:Function,
    sendChat:Function,
    setChatList:Function,
    chat:string,
    myUserId:string,
    redTeam:any,
    blueTeam:any,
    myId:any,
    firstImage:any,
    secondImage:any,
    selectLane:string,
}> = (props) => {

    const { lane, setLane, search, setSearch, now, text, time} = props;
    const { championList, blueTurn, locale, sendMsg, me, setChampionSelect, selectedChampion,championSelect} = props;
    const {chatList, setChat, sendChat, setChatList, chat, myUserId, redTeam, blueTeam, myId,firstImage,secondImage,selectLane} = props;

    return (
        <MainListWrapper>
            <Title subject={text.subject}/>
            <Timer time={time}/>
            {now == 20 && <LastInfo text={text} sendMsg={sendMsg} me={me} selectLane={selectLane}/>}
            {now == 21 && <Capture firstImage={firstImage} secondImage={secondImage}/>}
            {now == 21 && <EndInfo text={text}/> }
            <ChampionSelect lane={lane} setLane={setLane} search={search} setSearch={setSearch} now={now} 
                championList={championList} blueTurn={blueTurn} locale={locale} sendMsg={sendMsg} me={me} setChampionSelect={setChampionSelect} selectedChampion={selectedChampion} championSelect={championSelect}/>
            <Chat isMainList={true} isStart={true} myId={myId} myUserId= {myUserId} blueTeam={blueTeam} redTeam={redTeam} chat={chat} setChat={setChat} setChatList={setChatList} sendChat={sendChat} chatList={chatList}/>
        </MainListWrapper>
    )
}

export default MainList;

const MainListWrapper = styled.div`

width: 33%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

    button {
        width: 100px;
        height: 50px;
        margin-top: 20px;
    }
`
