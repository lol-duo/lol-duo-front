import styled from "@emotion/styled";
import { NextPage } from "next"
import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import {imgURL} from "@styles/img";
import I18n from "@/component/locale/i18n";
import PickTeam from "@/component/banpick/Start/PickTeam";
import MainList from "@/component/banpick/Start/MainList";
import {rgba} from "color2k";
const BanPickRoomStart: NextPage<{
    selectedChampion: {
        img: string,
        en_name: string,
        ko_name: string,
        name_id: string,
    }[],
    now: number,
    sendMsg: (message: any) => void,
    text: any,
    chatList: {
        chat: string,
        userName: string,
        color: string
    }[],
    setChatList: (chatList: any) => void,
    sendChat: (chat: string) => void,
    myUserId: string,
    myId: any,
    redTeam: any,
    blueTeam: any,
    time: number|string,
    selectedGameMode:string,
    hostId:string,
    selectLane:string,
    }> = (props) => {

        const {selectedChampion, now, sendMsg,text, setChatList,chatList, sendChat, myId, redTeam, blueTeam, myUserId, time,selectedGameMode,hostId,selectLane} = props;
        const [me, setMe] = useState<string>(myId.current === blueTeam.user ? "blue" : myId.current === redTeam.user ? "red" : "none");
        const [search, setSearch] = useState<string>("");
        const [lane, setLane] = useState<string>("ALL");
        const [championSelect, setChampionSelect] = useState<boolean>(false);

        const I18nChampion = I18n('champion.ts');
        const locale = I18nChampion.language;
        const championList = I18nChampion.value as [{id: number, en_name: string, name_id: string, image: string, ko_name: string, positionList: string[]}];
        const blueTurn = [0,2,4,13,15, 6,9,10,17,18];

        const [chat, setChat] = useState<string>("");
        const [isOpen, setIsOpen] = useState(-1);
    
        const firstImage = useRef<HTMLAnchorElement>();
        const secondImage = useRef<HTMLAnchorElement>();
        
        const changeChampion = (index: number, index2: number) => {
            setIsOpen(-1)
            sendMsg({type: "changeBanPick", now: index, message: {img: selectedChampion[index2].img, en_name: selectedChampion[index2].en_name, ko_name: selectedChampion[index2].ko_name, name_id: selectedChampion[index2].name_id}});
            sendMsg({type: "changeBanPick", now: index2, message: {img: selectedChampion[index].img, en_name: selectedChampion[index].en_name, ko_name: selectedChampion[index].ko_name, name_id: selectedChampion[index].name_id}});
        }
        useEffect(() => {
            if (now == 20) {
                html2canvas(document.body, {
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: rgba(0,0,0,0),
                    windowHeight: 980,
                    windowWidth: 1150,
                    width: 1150,
                    height: 980,
                    scale: 1,
                    imageTimeout: 15000,
                    logging: true,
                }).then(function (canvas) {
                    let link = document.createElement('a');
                    link.download = 'image.png';
                    link.href = canvas.toDataURL("png");
                    firstImage.current = link;
                });
            } else if (now == 21) {
                html2canvas(document.body, {
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: rgba(0,0,0,0),
                    windowHeight: 980,
                    windowWidth: 1150,
                    width: 1150,
                    height: 980,
                    scale: 1,
                    imageTimeout: 15000,
                    logging: true,
                }).then(function (canvas) {
                    let link = document.createElement('a');
                    link.download = 'image.png';
                    link.href = canvas.toDataURL("png");
                    secondImage.current = link;
                });
            }
            if(selectedGameMode==="solo" && myId.current === hostId){
                blueTurn.indexOf(now) != -1 ? setMe("blue") :setMe("red");
            }
        }, [now]);
        return (
            <BanPickRoomStartWrapper>
                <PickTeam team={0} now={now} me={me} selectedChampion={selectedChampion} changeChampion={changeChampion} imgURL={imgURL} locale={locale} isOpen={isOpen} setIsOpen={setIsOpen} selectedGameMode={selectedGameMode} selectLane={selectLane}/>
                <MainList time={time} text={text} lane={lane} setLane={setLane} search={search} setSearch={setSearch} now={now}
                championList={championList} blueTurn={blueTurn} locale={locale} sendMsg={sendMsg} me={me} setChampionSelect={setChampionSelect} selectedChampion={selectedChampion} championSelect={championSelect} 
                chatList={chatList} chat={chat} setChat={setChat} sendChat={sendChat} setChatList={setChatList}  myUserId={myUserId} redTeam={redTeam} blueTeam={blueTeam} myId={myId}
                firstImage={firstImage} secondImage={secondImage} selectLane={selectLane}/>
                <PickTeam team={1} now={now} me={me} selectedChampion={selectedChampion} changeChampion={changeChampion} imgURL={imgURL} locale={locale} isOpen={isOpen} setIsOpen={setIsOpen} selectedGameMode={selectedGameMode} selectLane={selectLane}/>
            </BanPickRoomStartWrapper>
        )
}

export default BanPickRoomStart;

const BanPickRoomStartWrapper = styled.div`
    width: 95%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
    z-index: 1;
    max-width: 1000px;
    max-height: 700px;
    position: relative;
    
    @media (max-width: 800px) {
        flex-direction: column;
        max-width: none;
        max-height: none;
        gap: 2px;
        margin-top: 5px;
    }
`

