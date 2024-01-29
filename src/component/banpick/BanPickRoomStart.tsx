import {NextPage} from "next";
import styled from "@emotion/styled";
import {useEffect, useRef, useState} from "react";
import I18n from "@/component/locale/i18n";
import Image from "next/image";
import colorList from "../../../style/colorList";
import {Popover, PopoverContent, PopoverTrigger} from "@nextui-org/popover";
import html2canvas from "html2canvas";
import {rgba} from "color2k";
import fontList from "../../../style/fontList";
import {imgURL} from "../../../style/img";
import {Button} from "@nextui-org/react";

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
    me: string,
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
    time: number|string
    }> = (props) => {

    const {selectedChampion, now, sendMsg,text, me, setChatList,chatList, sendChat, myId, redTeam, blueTeam, myUserId, time} = props;

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
    }, [now]);

    return (
        <BanPickRoomStartWrapper>
            <div className="blueTeam">
                <div className="banList">
                    <div className={now === 0 ? "ban now" : "ban"}>
                        <div className="banImg"/>
                        {
                            now == 0 && <div className="now"/>
                        }
                        {
                            selectedChampion[0] &&
                            <Image className="img" src={`${selectedChampion[0].img}`} alt={selectedChampion[0].img} fill sizes="3840px"/>
                        }
                    </div>
                    <div className={now === 2 ? "ban now" : "ban"}>
                        <div className="banImg"/>
                        {
                            now == 2 && <div className="now"/>
                        }
                        {
                            selectedChampion[2] &&
                            <Image className="img" src={`${selectedChampion[2].img}`} alt={selectedChampion[2].img} fill sizes="3840px"/>
                        }
                    </div>
                    <div className={now === 4 ? "ban now" : "ban"}>
                        <div className="banImg"/>
                        {
                            now == 4 && <div className="now"/>
                        }
                        {
                            selectedChampion[4] &&
                            <Image className="img" src={`${selectedChampion[4].img}`} alt={selectedChampion[4].img} fill sizes="3840px"/>
                        }
                    </div>
                    <div className={now === 13 ? "ban now" : "ban"}>
                        <div className="banImg"/>
                        {
                            now == 13 && <div className="now"/>
                        }
                        {
                            selectedChampion[13] &&
                            <Image className="img" src={`${selectedChampion[13].img}`} alt={selectedChampion[13].img} fill sizes="3840px"/>
                        }
                    </div>
                    <div className={now === 15 ? "ban now last" : "ban last"}>
                        <div className="banImg"/>
                        {
                            now == 15 && <div className="now"/>
                        }
                        {
                            selectedChampion[15] &&
                            <Image className="img" src={`${selectedChampion[15].img}`} alt={selectedChampion[15].img} fill sizes="3840px"/>
                        }
                    </div>
                </div>
                <div className="pickList">
                    <Popover placement={"right"} isOpen={now === 20 && me === "blue" ? isOpen == 6 : false} onOpenChange={(open) => {
                        setIsOpen(open ? 6 : -1)
                    }}   >
                        <PopoverTrigger>
                    <div className={now === 6 ? "pick now" : now === 20 && me === "blue" ? "pick hover" : "pick"} >

                        {
                            now == 6 && <div className="now"/>
                        }
                        {
                            selectedChampion[6] &&
                            <Image className="img" src={selectedChampion[6].img} fill alt={selectedChampion[6].img} sizes="3840px"/>
                        }
                        {
                            selectedChampion[6] &&
                            <div className="championName">
                                <span>{locale==="ko" ? selectedChampion[6].ko_name : selectedChampion[6].en_name}</span>
                            </div>
                        }
                        {
                            now >= 20 &&
                            <div className="swap">
                                <div className="swap-border">
                                    <Image src="/swap.png" alt="/swap.png"
                                           height={45} width={45}/>
                                </div>
                            </div>
                        }
                        {
                            now >= 20 &&
                            <div className="championLane">
                                <Image src="/lane/TOP.svg" alt="/lane/TOP.svg"
                                       height={30} width={30}/>
                            </div>
                        }
                    </div>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopUp>
                            <div className="change_img">
                                  {selectedChampion[9] && <div className="change_div"> <Image onClick={() => changeChampion(6,9)} className="img" src={`${imgURL.laneImg.JUNGLE}`}
                                                               alt={`${imgURL.laneImg.JUNGLE}`}
                                                                                              width={50} height={50}/> </div>}
                                {selectedChampion[10] && <div className="change_div"> <Image
                                    onClick={() => changeChampion(6, 10)} className="img" src={`${imgURL.laneImg.MID}`}
                                    alt={`${imgURL.laneImg.MID}`}
                                    width={50} height={50}/> </div>}
                                    {selectedChampion[17] && <div className="change_div"> <Image
                                        onClick={() => changeChampion(6, 17)} className="img"
                                        src={`${imgURL.laneImg.BOT}`} alt={`${imgURL.laneImg.BOT}`}
                                        width={50} height={50}/> </div>}
                                        {selectedChampion[18] && <div className="change_div"> <Image
                                            onClick={() => changeChampion(6, 18)} className="img"
                                            src={`${imgURL.laneImg.SUPPORT}`} alt={`${imgURL.laneImg.SUPPORT}`}
                                            width={50} height={50}/> </div>}
                                        </div>
                            </PopUp>
                        </PopoverContent>
                    </Popover>
                    <Popover placement={"right"} isOpen={now === 20 && me === "blue" ? isOpen == 9 : false}  onOpenChange={(open) => {
                        setIsOpen(open ? 9 : -1)
                    }}   >
                        <PopoverTrigger>
                    <div className={now === 9 ? "pick now" : now === 20 && me === "blue" ? "pick hover" : "pick"} >
                        {
                            now == 9 && <div className="now"/>
                        }
                        {
                            selectedChampion[9] &&
                            <Image className="img" src={`${selectedChampion[9].img}`} alt={selectedChampion[9].img} fill sizes="3840px"/>
                        }
                        {
                            selectedChampion[9] &&
                            <div className="championName">
                                <span>{locale==="ko" ? selectedChampion[9].ko_name : selectedChampion[9].en_name}</span>
                            </div>
                        }
                        {
                            now >= 20 &&
                            <div className="swap">
                                <div className="swap-border">
                                    <Image src="/swap.png" alt="/swap.png"
                                           height={45} width={45}/>
                                </div>
                            </div>
                        }
                        {
                            now >= 20 &&
                            <div className="championLane">
                                <Image src="/lane/JUNGLE.svg" alt="/lane/JUNGLE.svg"
                                       height={30} width={30}/>
                            </div>
                        }
                    </div>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopUp>
                            <div className="change_img">
                                {selectedChampion[6] && <div className="change_div"> <Image
                                    onClick={() => changeChampion(9, 6)} className="img" src={imgURL.laneImg.TOP}
                                    alt={imgURL.laneImg.TOP}
                                    width={50} height={50}/> </div>}

                                    {selectedChampion[10] && <div className="change_div"><Image
                                        onClick={() => changeChampion(9, 10)} className="img" src={imgURL.laneImg.MID}
                                        alt={imgURL.laneImg.MID}
                                        width={50} height={50}/> </div>}
                                        {selectedChampion[17] && <div className="change_div"> <Image
                                            onClick={() => changeChampion(9, 17)} className="img"
                                            src={imgURL.laneImg.BOT} alt={imgURL.laneImg.BOT}
                                            width={50} height={50}/> </div>}
                                            {selectedChampion[18] && <div className="change_div"> <Image
                                                onClick={() => changeChampion(9, 18)} className="img"
                                                src={imgURL.laneImg.SUPPORT} alt={imgURL.laneImg.SUPPORT}
                                                width={50} height={50}/> </div>}
                                            </div>
                            </PopUp>
                        </PopoverContent>
                    </Popover>
                    <Popover placement={"right"} isOpen={now === 20 && me === "blue" ? isOpen == 10 : false}  onOpenChange={(open) => {
                        setIsOpen(open ? 10 : -1)
                    }}   >
                        <PopoverTrigger>
                        <div className={now === 10 ? "pick now" : now === 20 && me === "blue" ? "pick hover" : "pick"} >
                            {
                                now == 10 && <div className="now"/>
                            }
                        {
                            selectedChampion[10] &&
                            <Image className="img" src={`${selectedChampion[10].img}`} alt={selectedChampion[10].img} fill sizes="3840px" />
                        }
                        {
                            selectedChampion[10] &&
                            <div className="championName">
                                <span>{locale==="ko" ? selectedChampion[10].ko_name : selectedChampion[10].en_name}</span>
                            </div>
                        }
                        {
                            now >= 20 &&
                            <div className="swap">
                                <div className="swap-border">
                                    <Image src="/swap.png" alt="/swap.png"
                                           height={45} width={45}/>
                                </div>
                            </div>
                        }
                        {
                            now >= 20 &&
                            <div className="championLane">
                                <Image src="/lane/MIDDLE.svg" alt="/lane/MIDDLE.svg"
                                       height={30} width={30}/>
                            </div>
                        }
                    </div>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopUp>
                            <div className="change_img">
                                {selectedChampion[6] &&<div className="change_div">  <Image onClick={() => changeChampion(10,6)} className="img" src={imgURL.laneImg.TOP} alt={imgURL.laneImg.TOP}
                                                                                            width={50} height={50}/> </div>}

                                {selectedChampion[9] &&  <div className="change_div"> <Image
                                    onClick={() => changeChampion(10, 9)} className="img" src={imgURL.laneImg.JUNGLE}
                                    alt={imgURL.laneImg.JUNGLE}
                                    width={50} height={50}/> </div>}
                                    {selectedChampion[17] && <div className="change_div"> <Image onClick={() => changeChampion(10,17)} className="img" src={imgURL.laneImg.BOT} alt={imgURL.laneImg.BOT}
                                                                                                 width={50} height={50}/> </div>}
                                {selectedChampion[18] && <div className="change_div"> <Image
                                    onClick={() => changeChampion(10, 18)} className="img" src={imgURL.laneImg.SUPPORT}
                                    alt={imgURL.laneImg.SUPPORT}
                                    width={50} height={50}/> </div>}
                                </div>
                            </PopUp>
                        </PopoverContent>
                    </Popover>
                    <Popover placement={"right"} isOpen={now === 20 && me === "blue" ? isOpen == 17 : false} onOpenChange={(open) => {
                        setIsOpen(open ? 17 : -1)
                    }}   >
                        <PopoverTrigger>
                        <div className={now === 17 ? "pick now" : now === 20 && me === "blue" ? "pick hover" : "pick"} >
                            {
                                now == 17 && <div className="now"/>
                            }
                        {
                            selectedChampion[17] &&
                            <Image className="img" src={`${selectedChampion[17].img}`} alt={selectedChampion[17].img} fill sizes="3840px"/>
                        }
                        {
                            selectedChampion[17] &&
                            <div className="championName">
                                <span>{locale==="ko" ? selectedChampion[17].ko_name : selectedChampion[17].en_name}</span>
                            </div>
                        }
                        {
                            now >= 20 &&
                            <div className="swap">
                                <div className="swap-border">
                                    <Image src="/swap.png" alt="/swap.png"
                                           height={45} width={45}/>
                                </div>
                            </div>
                        }
                        {
                            now >= 20 &&
                            <div className="championLane">
                                <Image src="/lane/BOTTOM.svg" alt="/lane/BOTTOM.svg"
                                       height={30} width={30}/>
                            </div>
                        }
                    </div>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopUp>
                            <div className="change_img">
                                {selectedChampion[6] && <div className="change_div"><Image
                                    onClick={() => changeChampion(17, 6)} className="img" src={imgURL.laneImg.TOP}
                                    alt={imgURL.laneImg.TOP}
                                    width={50} height={50}/></div>}

                                    {selectedChampion[9] &&<div className="change_div"> <Image onClick={() => changeChampion(17,9)} className="img" src={imgURL.laneImg.JUNGLE} alt={imgURL.laneImg.JUNGLE}
                                                                                               width={50} height={50}/></div>}
                                {selectedChampion[10] && <div className="change_div"><Image
                                    onClick={() => changeChampion(17, 10)} className="img" src={imgURL.laneImg.MID}
                                    alt={imgURL.laneImg.MID}
                                    width={50} height={50}/></div>}
                                    {selectedChampion[18] && <div className="change_div"><Image
                                        onClick={() => changeChampion(17, 18)} className="img"
                                        src={imgURL.laneImg.SUPPORT} alt={imgURL.laneImg.SUPPORT}
                                        width={50} height={50}/></div>}
                                    </div>
                            </PopUp>
                        </PopoverContent>
                    </Popover>
                    <Popover placement={"right"} isOpen={now === 21 ? isOpen == 18 : false} onOpenChange={(open) => {
                        setIsOpen(open ? 18 : -1)
                    }}   >
                        <PopoverTrigger>
                        <div className={now === 18 ? "pick now last" : now === 20 && me === "blue" ? "pick last hover" : "pick last"} >
                            {
                                now == 18 && <div className="now"/>
                            }
                        {
                            selectedChampion[18] &&
                            <Image className="img" src={`${selectedChampion[18].img}`} alt={selectedChampion[18].img} fill sizes="3840px"/>
                        }
                        {
                            selectedChampion[18] &&
                            <div className="championName">
                                <span>{locale==="ko" ? selectedChampion[18].ko_name : selectedChampion[18].en_name}</span>
                            </div>
                        }
                        {
                            now >= 20 &&
                            <div className="swap">
                                <div className="swap-border">
                                    <Image src="/swap.png" alt="/swap.png"
                                           height={45} width={45}/>
                                </div>
                            </div>
                        }
                        {
                            now >= 20 &&
                            <div className="championLane">
                                <Image src="/lane/UTILITY.svg" alt="/lane/UTILITY.svg"
                                       height={30} width={30}/>
                            </div>
                        }
                        </div>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopUp>
                            <div className="change_img">
                                {selectedChampion[6] && <div className="change_div"><Image
                                    onClick={() => changeChampion(18, 6)} className="img" src={imgURL.laneImg.TOP}
                                    alt={imgURL.laneImg.TOP}
                                    width={50} height={50}/></div>}

                                    {selectedChampion[9] && <div className="change_div"><Image
                                        onClick={() => changeChampion(18, 9)} className="img"
                                        src={imgURL.laneImg.JUNGLE} alt={imgURL.laneImg.JUNGLE}
                                        width={50} height={50}/></div>}
                                        {selectedChampion[10] && <div className="change_div"><Image
                                            onClick={() => changeChampion(18, 10)} className="img"
                                            src={imgURL.laneImg.MID} alt={imgURL.laneImg.MID}
                                            width={50} height={50}/></div>}
                                            {selectedChampion[17] &&<div className="change_div"> <Image onClick={() => changeChampion(18,17)} className="img" src={imgURL.laneImg.BOT} alt={imgURL.laneImg.BOT}
                                                                                                        width={50} height={50}/></div>}
                                </div>
                            </PopUp>
                        </PopoverContent>
                    </Popover>
                </div>

            </div>
            <div className="mainList">
                <div className="subject">{text.subject}</div>
                <div className="timer">{time}</div>
                {
                    now == 20 && <div className="lastInfoList">
                        {(text.lastInfoList as any[]).map(item => (
                        <div key={item.index} className="endInfo" >{item.info}</div>
                    ))}
                    </div>
                }
                {
                    now == 21 &&
                    <div className="captureButton">
                        <Button className="captureBox">
                            <Image onClick={()=>{
                                if(firstImage.current){
                                    firstImage.current.click();
                                }
                            }} className="captureImg" src="/download.png" alt="/download.png" width={50} height={50} sizes="3840px" />
                        </Button>
                        <Button className="captureBox">
                        <Image onClick={() => {
                            if (secondImage.current) {
                                secondImage.current.click();
                            }
                        }} className="captureImg" src="/download.png" alt="/download.png"  width={50} height={50} sizes="3840px" />
                        </Button>
                    </div>
                }
                {
                    now == 21 && <div className="endInfoList">
                        {(text.endInfoList as any[]).map(item => (
                            <div key={item.index} className={`${item.index === 1 ? 'title' : 'info'}`} >{item.info}</div>
                        ))}
                    </div>
                }
                { now < 20 &&
                <div className="search">
                    <div className="lane">
                        <Image onClick={() => {
                            setLane("ALL")
                        }} className={lane === "ALL" ? "img on" : "img"} src="/lane/ALL.svg" alt="/lane/All.svg"
                               height={25} width={25}/>
                        <Image onClick={() => {
                            lane === "TOP" ? setLane("ALL") : setLane("TOP")
                        }} className={lane === "TOP" ? "img on" : "img"} src="/lane/TOP.svg" alt="/lane/TOP.svg"
                               height={25} width={25}/>
                        <Image onClick={() => {
                            lane === "JUNGLE" ? setLane("ALL") : setLane("JUNGLE")
                        }} className={lane === "JUNGLE" ? "img on" : "img"} src="/lane/JUNGLE.svg"
                               alt="/lane/JUNGLE.svg" height={25} width={25}/>
                        <Image onClick={() => {
                            lane === "MIDDLE" ? setLane("ALL") : setLane("MIDDLE")
                        }} className={lane === "MIDDLE" ? "img on" : "img"} src="/lane/MIDDLE.svg"
                               alt="/lane/MIDDLE.svg" height={25} width={25}/>
                        <Image onClick={() => {
                            lane === "BOTTOM" ? setLane("ALL") : setLane("BOTTOM")
                        }} className={lane === "BOTTOM" ? "img on" : "img"} src="/lane/BOTTOM.svg"
                               alt="/lane/BOTTOM.svg" height={25} width={25}/>
                        <Image onClick={() => {
                            lane === "UTILITY" ? setLane("ALL") : setLane("UTILITY")
                        }} className={lane === "UTILITY" ? "img on" : "img"} src="/lane/UTILITY.svg"
                               alt="/lane/UTILITY.svg" height={25} width={25}/>
                    </div>
                    <input className="text" type="text" placeholder="챔피언 이름을 검색하세요" value={search} onChange={(e) => {
                        setSearch(e.target.value)
                    }}/>
                </div>
                }
                    { now < 20 &&
                    <div className="championList">
                        {
                            championList && championList.map((item) => {
                                if (!item.en_name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) && !item.ko_name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                                    return null;
                                }
                                if (lane !== "ALL" && !item.positionList.includes(lane)) {
                                    return null;
                                }
                                if (selectedChampion.find((value) => value.en_name === item.en_name)) {
                                    return <Image className="img none" src={`/champion/${item.image}`} alt={item.name_id}
                                                  width={50} height={50} key={locale == "ko" ? item.ko_name : item.en_name}/>
                                }
                                return (
                                    <Image onClick={() => {
                                        if ((me === "red" && !blueTurn.includes(now)) || (me === "blue" && blueTurn.includes(now))) {
                                            setChampionSelect(true);
                                            sendMsg({type: "banPick", message: {img: item.name_id, en_name: item.en_name, ko_name: item.ko_name, name_id: item.name_id}});
                                        } else
                                            return;
                                    }} className="img" src={`/champion/${item.image}`} alt={item.name_id} width={50} height={50}
                                           key={locale == "ko" ? item.ko_name : item.en_name}/>
                                )
                            }).sort((a, b) => {
                                if(a?.key && b?.key){
                                    const aKey = a?.key as string;
                                    const bKey = b?.key as string;
                                    return aKey.localeCompare(bKey);
                                }
                                return 1;
                            })
                        }
                    </div>
                    }
                {now < 20 &&
                    <div className="pickButton">
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
                    </div>
                }
                <div className="chat">
                    <div className="input-text">
                        {chatList.map((value, index) => {
                            return <div key={index} style={{color: value.color}}>{
                                value.userName === "SYSTEM" ? value.chat :
                                    `${value.userName} : ${value.chat}`
                            }</div>
                        })}
                    </div>
                    <input className="send-text" type="text" value={chat} onChange={(e) => setChat(e.target.value)}
                           onKeyPress={(e) => {
                               if (e.key === "Enter") {
                                   if (chat === "" || chat.trim() === "") return;
                                   sendChat(chat);
                                   setChat("");
                                   setChatList([...chatList, {
                                       chat: chat,
                                       userName: myUserId,
                                       color: myId.current === redTeam.user ? colorList.banPick.redTeam :
                                           myId.current === blueTeam.user ? colorList.banPick.blueTeam : colorList.secondary.beige
                                   }])
                               }
                           }}/>
                </div>
            </div>
            <div className="redTeam">
                <div className="banList">
                    <div className={now === 1 ? "ban now last" : "ban last"}>
                        <div className="banImg"/>
                        {
                            now == 1 && <div className="now"/>
                        }
                        {
                            selectedChampion[1] &&
                            <Image loading="lazy" className="img" src={`${selectedChampion[1].img}`} alt={selectedChampion[1].img} fill sizes="3840px"/>
                        }
                    </div>
                    <div className={now === 3 ? "ban now" : "ban"}>
                        <div className="banImg"/>
                        {
                            now == 3 && <div className="now"/>
                        }
                        {
                            selectedChampion[3] &&
                            <Image loading="lazy" className="img" src={`${selectedChampion[3].img}`} alt={selectedChampion[3].img} fill sizes="3840px"/>
                        }
                    </div>
                    <div className={now === 5 ? "ban now" : "ban"}>
                        <div className="banImg"/>
                        {
                            now == 5 && <div className="now"/>
                        }
                        {
                            selectedChampion[5] &&
                            <Image loading="lazy" className="img" src={`${selectedChampion[5].img}`} alt={selectedChampion[5].img} fill sizes="3840px"/>
                        }
                    </div>
                    <div className={now === 12 ? "ban now" : "ban"}>
                        <div className="banImg"/>
                        {
                            now == 12 && <div className="now"/>
                        }
                        {
                            selectedChampion[12] &&
                            <Image loading="lazy" className="img" src={`${selectedChampion[12].img}`} alt={selectedChampion[12].img} fill sizes="3840px"/>
                        }
                    </div>
                    <div className={now === 14 ? "ban now" : "ban"}>
                        <div className="banImg"/>
                        {
                            now == 14 && <div className="now"/>
                        }
                        {
                            selectedChampion[14] &&
                            <Image loading="lazy" className="img" src={`${selectedChampion[14].img}`} alt={selectedChampion[14].img} fill sizes="3840px"/>
                        }
                    </div>
                </div>
                <div className="pickList">
                    <Popover placement={"left"} isOpen={now === 20 && me === "red" ? isOpen == 7 : false} onOpenChange={(open) => {
                        setIsOpen(open ? 7 : -1)
                    }}  >
                        <PopoverTrigger>
                    <div className={now === 7 ? "pick now" : now === 20 && me === "red" ? "pick hover" : "pick"} >
                        {
                            now == 7 && <div className="now"/>
                        }
                        {
                            selectedChampion[7] &&
                                    <Image loading="lazy" className="img" src={selectedChampion[7].img} alt={selectedChampion[7].img} fill sizes="3840px"/>
                        }
                        {
                            selectedChampion[7] &&
                            <div className="championName">
                                <span>{locale==="ko" ? selectedChampion[7].ko_name : selectedChampion[7].en_name}</span>
                            </div>
                        }
                        {
                            now >= 20 &&
                            <div className="swap">
                                <div className="swap-border">
                                    <Image loading="lazy" src="/swap.png" alt="/swap.png"
                                           height={45} width={45}/>
                                </div>

                            </div>
                        }
                        {
                            now >= 20 &&
                            <div className="championLane">
                                <Image loading="lazy" src="/lane/TOP.svg" alt="/lane/TOP.svg"
                                       height={30} width={30}/>
                            </div>
                        }
                    </div>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopUp>
                            <div className="change_img">
                                {selectedChampion[8] && <div className="change_div"><Image loading="lazy"
                                    onClick={() => changeChampion(7, 8)} className="img" src={imgURL.laneImg.JUNGLE}
                                    alt={imgURL.laneImg.JUNGLE}
                                    width={50} height={50}/></div>}
                                    {selectedChampion[11] && <div className="change_div"><Image loading="lazy"
                                        onClick={() => changeChampion(7, 11)} className="img" src={imgURL.laneImg.MID}
                                        alt={imgURL.laneImg.MID}
                                        width={50} height={50}/></div>}
                                        {selectedChampion[16] && <div className="change_div"><Image loading="lazy"
                                            onClick={() => changeChampion(7, 16)} className="img"
                                            src={imgURL.laneImg.BOT} alt={imgURL.laneImg.BOT}
                                            width={50} height={50}/></div>}
                                            {selectedChampion[19] && <div className="change_div"><Image loading="lazy"
                                                onClick={() => changeChampion(7, 19)} className="img"
                                                src={imgURL.laneImg.SUPPORT} alt={imgURL.laneImg.SUPPORT}
                                                width={50} height={50}/></div>}
                                            </div>
                            </PopUp>
                        </PopoverContent>
                    </Popover>
                    <Popover placement={"left"} isOpen={now === 20 && me==="red" ? isOpen == 8 : false} onOpenChange={(open) => {
                        setIsOpen(open ? 8 : -1)
                    }}  >
                        <PopoverTrigger>
                            <div className={now === 8 ? "pick now" : now === 20 && me === "red" ? "pick hover" : "pick"} >
                                {
                                    now == 8 && <div className="now"/>
                                }
                                {
                                    selectedChampion[8] &&
                                    <Image loading="lazy" className="img" src={selectedChampion[8].img} alt={selectedChampion[8].img} fill sizes="3840px"/>
                                }
                                {
                                    selectedChampion[8] &&
                                    <div className="championName">
                                        <span>{locale==="ko" ? selectedChampion[8].ko_name : selectedChampion[8].en_name}</span>
                                    </div>
                                }
                                {
                                    now >= 20 &&
                                    <div className="swap">
                                        <div className="swap-border">
                                            <Image loading="lazy" src="/swap.png" alt="/swap.png"
                                                   height={45} width={45}/>
                                        </div>
                                    </div>
                                }
                                {
                                    now >= 20 &&
                                    <div className="championLane">
                                        <Image loading="lazy" src="/lane/JUNGLE.svg" alt="/lane/JUNGLE.svg"
                                               height={30} width={30}/>
                                    </div>
                                }
                            </div>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopUp>
                            <div className="change_img">
                                {selectedChampion[7] && <div className="change_div"><Image loading="lazy"
                                    onClick={() => changeChampion(8, 7)} className="img" src={imgURL.laneImg.TOP}
                                    alt={imgURL.laneImg.TOP}
                                    width={50} height={50}/></div>}
                                    {selectedChampion[11] && <div className="change_div"><Image loading="lazy"
                                        onClick={() => changeChampion(8, 11)} className="img" src={imgURL.laneImg.MID}
                                        alt={imgURL.laneImg.MID}
                                        width={50} height={50}/></div>}
                                        {selectedChampion[16] && <div className="change_div"><Image loading="lazy"
                                            onClick={() => changeChampion(8, 16)} className="img"
                                            src={imgURL.laneImg.BOT} alt={imgURL.laneImg.BOT}
                                            width={50} height={50}/></div>}
                                            {selectedChampion[19] && <div className="change_div"><Image loading="lazy"
                                                onClick={() => changeChampion(8, 19)} className="img"
                                                src={imgURL.laneImg.SUPPORT} alt={imgURL.laneImg.SUPPORT}
                                                width={50} height={50}/></div>}
                                            </div>
                            </PopUp>
                        </PopoverContent>
                    </Popover>
                    <Popover placement={"left"} isOpen={now === 20 && me === "red" ? isOpen == 11 : false} onOpenChange={(open) => {
                        setIsOpen(open ? 11 : -1)
                    }}  >
                        <PopoverTrigger>
                            <div
                                className={now === 11 ? "pick now" : now === 20 && me === "red" ? "pick hover" : "pick"} >
                                {
                                    now == 11 && <div className="now"/>
                                }
                                {
                                    selectedChampion[11] &&
                                    <Image loading="lazy" className="img" src={`${selectedChampion[11].img}`} alt={selectedChampion[11].img} fill sizes="3840px"/>
                                }
                                {
                                    selectedChampion[11] &&
                                    <div className="championName">
                                        <span>{locale === "ko" ? selectedChampion[11].ko_name : selectedChampion[11].en_name}</span>
                                    </div>
                                }
                                {
                                    now >= 20 &&
                                    <div className="swap">
                                        <div className="swap-border">
                                    <Image loading="lazy" src="/swap.png" alt="/swap.png"
                                           height={45} width={45}/>
                                </div>
                            </div>
                        }
                        {
                            now >= 20 &&
                            <div className="championLane">
                                <Image loading="lazy" src="/lane/MIDDLE.svg" alt="/lane/MIDDLE.svg"
                                       height={30} width={30}/>
                            </div>
                        }
                    </div>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopUp>
                            <div className="change_img">
                                {selectedChampion[7] && <div className="change_div"><Image loading="lazy"
                                    onClick={() => changeChampion(11, 7)} className="img" src={imgURL.laneImg.TOP}
                                    alt={imgURL.laneImg.TOP}
                                    width={50} height={50}/></div>}
                                    {selectedChampion[8] && <div className="change_div"><Image loading="lazy"
                                        onClick={() => changeChampion(11, 8)} className="img"
                                        src={imgURL.laneImg.JUNGLE} alt={imgURL.laneImg.JUNGLE}
                                        width={50} height={50}/></div>}
                                        {selectedChampion[16] && <div className="change_div"><Image loading="lazy"
                                            onClick={() => changeChampion(11, 16)} className="img"
                                            src={imgURL.laneImg.BOT} alt={imgURL.laneImg.BOT}
                                            width={50} height={50}/></div>}
                                            {selectedChampion[19] && <div className="change_div"><Image loading="lazy"
                                                onClick={() => changeChampion(11, 19)} className="img"
                                                src={imgURL.laneImg.SUPPORT} alt={imgURL.laneImg.SUPPORT}
                                                width={50} height={50}/></div>}
                                            </div>
                            </PopUp>
                        </PopoverContent>
                    </Popover>
                    <Popover placement={"left"} isOpen={now === 20 && me === "red" ? isOpen == 16 : false} onOpenChange={(open) => {
                        setIsOpen(open ? 16 : -1)
                    }}  >
                        <PopoverTrigger>
                            <div
                                className={now === 16 ? "pick now" : now === 20 && me === "red" ? "pick hover" : "pick"} >
                                {
                                    now == 16 && <div className="now"/>
                                }
                                {
                                    selectedChampion[16] &&
                                    <Image loading="lazy" className="img" src={`${selectedChampion[16].img}`} alt={selectedChampion[16].img} fill sizes="3840px"/>
                                }
                                {
                                    selectedChampion[16] &&
                                    <div className="championName">
                                        <span>{locale === "ko" ? selectedChampion[16].ko_name : selectedChampion[16].en_name}</span>
                                    </div>
                                }
                                {
                                    now >= 20 &&
                                    <div className="swap">
                                        <div className="swap-border">
                                    <Image loading="lazy" src="/swap.png" alt="/swap.png"
                                           height={45} width={45}/>
                                </div>
                            </div>
                        }
                        {
                            now >= 20 &&
                            <div className="championLane">
                                <Image loading="lazy" src="/lane/BOTTOM.svg" alt="/lane/BOTTOM.svg"
                                       height={30} width={30}/>
                            </div>
                        }
                    </div>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopUp>
                            <div className="change_img">
                                {selectedChampion[7] && <div className="change_div"><Image loading="lazy"
                                    onClick={() => changeChampion(16, 7)} className="img" src={imgURL.laneImg.TOP}
                                    alt={imgURL.laneImg.TOP}
                                    width={50} height={50}/></div>}
                                    {selectedChampion[8] && <div className="change_div"><Image loading="lazy"
                                        onClick={() => changeChampion(16, 8)} className="img"
                                        src={imgURL.laneImg.JUNGLE} alt={imgURL.laneImg.JUNGLE}
                                        width={50} height={50}/></div>}
                                        {selectedChampion[11] && <div className="change_div"><Image loading="lazy"
                                            onClick={() => changeChampion(16, 11)} className="img"
                                            src={imgURL.laneImg.MID} alt={imgURL.laneImg.MID}
                                            width={50} height={50}/></div>}
                                            {selectedChampion[19] && <div className="change_div"><Image loading="lazy"
                                                onClick={() => changeChampion(16, 19)} className="img"
                                                src={imgURL.laneImg.SUPPORT} alt={imgURL.laneImg.SUPPORT}
                                                width={50} height={50}/></div>}
                                            </div>
                            </PopUp>
                        </PopoverContent>
                    </Popover>
                    <Popover placement={"left"} isOpen={now === 20 && me === "red" ? isOpen == 19 : false} onOpenChange={(open) => {
                        setIsOpen(open ? 19 : -1)
                    }}  >
                        <PopoverTrigger>
                            <div
                                className={now === 19 ? "pick now last" : now === 20 && me === "red" ? "pick hover last" : "pick last"} >
                                {
                                    now == 19 && <div className="now"/>
                                }
                                {
                                    selectedChampion[19] &&
                                    <Image loading="lazy" className="img" src={`${selectedChampion[19].img}`}
                                           alt={selectedChampion[19].img} fill sizes="3840px"/>
                                }
                                {
                                    selectedChampion[19] &&
                                    <div className="championName">
                                        <span>{locale === "ko" ? selectedChampion[19].ko_name : selectedChampion[19].en_name}</span>
                                    </div>
                                }
                                {
                                    now >= 20 &&
                                    <div className="swap">
                                        <div className="swap-border">
                                    <Image loading="lazy" src="/swap.png" alt="/swap.png"
                                           height={45} width={45}/>
                                </div>
                            </div>
                        }
                        {
                            now >= 20 &&
                            <div className="championLane">
                                <Image loading="lazy" src="/lane/UTILITY.svg" alt="/lane/UTILITY.svg"
                                       height={30} width={30}/>
                            </div>
                        }
                    </div>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopUp>
                            <div className="change_img">
                                {selectedChampion[7] && <div className="change_div"><Image loading="lazy"
                                    onClick={() => changeChampion(19, 7)} className="img" src={imgURL.laneImg.TOP}
                                    alt={imgURL.laneImg.TOP}
                                    width={50} height={50}/></div>}
                                    {selectedChampion[8] && <div className="change_div"><Image loading="lazy"
                                        onClick={() => changeChampion(19, 8)} className="img"
                                        src={imgURL.laneImg.JUNGLE} alt={imgURL.laneImg.JUNGLE}
                                        width={50} height={50}/></div>}
                                        {selectedChampion[11] && <div className="change_div"><Image loading="lazy"
                                            onClick={() => changeChampion(19, 11)} className="img"
                                            src={imgURL.laneImg.MID} alt={imgURL.laneImg.MID}
                                            width={50} height={50}/></div>}
                                            {selectedChampion[16] && <div className="change_div"><Image loading="lazy"
                                                onClick={() => changeChampion(19, 16)} className="img"
                                                src={imgURL.laneImg.BOT} alt={imgURL.laneImg.BOT}
                                                width={50} height={50}/></div>}
                                            </div>
                            </PopUp>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

        </BanPickRoomStartWrapper>
    );
}

export default BanPickRoomStart;

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

const BanPickRoomStartWrapper = styled.div`
    width: 95%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
    z-index: 1;

    .redTeam {
        margin-top: 20px;
        max-width: 400px;
        width: 33%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: end;

        .pickList {
            margin-top: 20px;

            height: 100%;
            width: 100%;
            background-color: rgba(0, 0, 0, 0);
            display: flex;
            flex-direction: column;
            position: relative;

            .pick {
                position: relative;
                width: 100%;
                height: 150px;
                background-color: rgba(33, 33, 33, 0.5);
                border-left: 2px solid rgba(33, 33, 33, 0.5);
                border-top: 2px solid rgba(33, 33, 33, 0.5);
                border-right: 2px solid rgba(33, 33, 33, 0.5);

                //championName 우측, 아래로 배치
                display: flex;
                justify-content: start;
                align-items: end;
                overflow: hidden;
                
                @media screen and (max-width: 1100px) {
                    height: 100px;
                }


                .img {
                    object-fit: cover;
                    object-position: top;
                    height: auto !important;
                }
                
                .championName{
                    position: relative;
                    color: ${colorList.grayscale["100"]};
                    width: 30%;
                    height: 30%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 17px;
                    font-weight: bold;
                }
                .swap{
                    
                    width: 30%;
                    height: 100%;
                    position: relative;
                    display: flex;
                    justify-content: end;
                    align-items: center;
                    opacity: 0;
                    
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
                    width:35%;
                    height: 90%;
                    display: flex;
                    justify-content: end;
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
                    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 100%, rgba(255, 255, 255, 0) 100%);
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
        }

        .banList {
            height: 100%;
            width: 100%;
            display: grid;
            grid-template-columns: repeat(5, minmax(20px, 50px)); /* 정사각형의 크기를 유지하면서 가능한 많은 열을 채움 */
            grid-auto-rows: 50px;
            justify-content: end;
            align-items: end;
            box-sizing: content-box;
            gap: 2px;
            

            .ban {
                position: relative;
                box-sizing: border-box;
                background-color: rgba(33, 33, 33, 0.5);
                .banImg {
                    z-index: 1;
                    position: relative;
                    top: 50%;
                    width: 100%;
                    height: 2px;
                    background-color: rgba(255, 255, 255, 0.5);
                    transform: rotate(45deg);                    
                }
                
                height: 100%;
                border: 2px solid rgba(33, 33, 33, 0.5);
                

                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.3; }
                }

                .now {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    z-index: 2;
                    animation: blink 5s linear infinite;
                    background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 100%);
                }
                
            }

            
        }

    }

    .mainList {
        width: 33%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        
        .lastInfoList {
            height: 500px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 50px;
            font-weight: bold;
            color: rgba(255, 255, 255, 0.7);
            white-space: pre-line;
            flex-direction: column;
        }
        
        .timer {
            font-size: 30px;
            font-weight: bold;
            color: ${colorList.grayscale["000"]};
            color: ${colorList.secondary.beige};
        }
        .captureButton {
            width: 100%;
            height: 200px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            gap: 30px;
            
            .captureBox {
                width: 60px;
                height: 60px;
                border-radius: 10px;
                border: 2px solid ${colorList.secondary.beige};
                outline: none;
                display: flex;
                justify-content: center;
                align-items: center;
                &:hover {
                    cursor: pointer;
                    background-color: ${colorList.semantic.hover};
                }
                background-color: ${colorList.semantic.card};
            }
            
            
        }
        
        .endInfoList {
                width: 90%;
                height: 300px;
                display: flex;
                flex-direction: column;
                border-radius: 10px;
                align-items: start;
            
                gap: 10px;

                .info {
                    width: 100%;
                    font-family: ${fontList.roboto.medium["16"].fontFamily};
                    font-size: ${fontList.roboto.medium["16"].fontSize};
                    font-weight: ${fontList.roboto.medium["16"].fontWeight};
                    line-height: ${fontList.roboto.medium["16"].lineHeight};
                    letter-spacing: ${fontList.roboto.medium["16"].letterSpacing};
                    color: rgba(181, 181, 181, 1);
                    text-align: left;
                    
                    align-items: flex-start;
                    -webkit-align-items: flex-start;
                }

                .title {
                    font-family: ${fontList.roboto.medium["16"].fontFamily};
                    font-size: ${fontList.roboto.medium["16"].fontSize};
                    font-weight: ${fontList.roboto.medium["16"].fontWeight};
                    line-height: ${fontList.roboto.medium["16"].lineHeight};
                    letter-spacing: ${fontList.roboto.medium["16"].letterSpacing};
                    color: rgba(181, 181, 181, 1);

                    text-align: left;
                    font-weight: bold;
                    font-size: 1.5em;
                    padding-bottom: 10px;
                    color: azure;
                }
            }

        .chat {
            width: 80%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 20px;

            .input-text {
                width: 100%;
                height: 150px;
                outline: none;
                background: rgba(0, 0, 0, 0);
                color: white;
                border: none;

                overflow-y: scroll;
                padding-right: 17px;
                box-sizing: border-box;

                ::-webkit-scrollbar {
                    width: 5px; /* 스크롤바의 width */
                    background-color: rgba(0, 0, 0, 0); /* 스크롤바의 배경색 지정 */
                }

                ::-webkit-scrollbar-corner {
                    background-color: ${colorList.semantic.card}; /* 스크롤바 교차 지점의 배경색 지정 */
                }

                ::-webkit-scrollbar-track {
                    background-color: rgba(0, 0, 0, 0); /* 스크롤바의 track 배경색 지정 */
                }

                ::-webkit-scrollbar-thumb {
                    background-color: ${colorList.semantic.hover}; /* 스크롤바의 thumb 배경색 지정 */
                    border-radius: 100px; /* 스크롤바 thumb의 모서리 둥글게 지정 */
                }
            }

            .send-text {
                width: 100%;
                height: 30px;
                border: 2px outset ${colorList.secondary.beige};
                outline: none;
                background-color: ${colorList.semantic.card};
                color: white;
            }
            @media screen and (max-width: 1100px) {
                display: none;

            }
        }
        
        
        .subject {
            font-size: 30px;
            font-weight: bold;
            color: ${colorList.grayscale["000"]};
            height: 100%;
            
            @media screen and (max-width: 1100px) {
                font-size: 25px;
            }
        }
        
        .search {
            margin-top: 15px;
            display: flex;
            flex-direction: row;
            position: relative;
            width: 100%;
            gap: 20px;
            
            @media screen and (max-width: 800px) {
                flex-direction: column;
                gap: 10px;
            }
            
            .lane {
                display: flex;
                flex-direction: row;       
                position: relative;
                left: 0;
                
                .img {
                    box-sizing: border-box;
                    filter: grayscale(100%);

                    &:hover {
                        cursor: pointer;
                        filter: grayscale(0%);
                    }
                }   
                
                .on {
                    filter: grayscale(0%);
                }
            }
            .text {
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0);
                border: none;
                border-bottom: 2px solid rgba(33, 33, 33, 0.5);
                color: ${colorList.grayscale["100"]};
                font-size: 17px;
                box-sizing: border-box;
                
                &:focus {
                    outline: none;
                }
                &::placeholder {
                    color: ${colorList.grayscale["100"]};
                }
            }
        }
        
        .pickButton {
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
        }

        .championList {
            width: 100%;
            height: 400px;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0);
            display: grid;                     
            grid-template-columns: repeat(auto-fill, minmax(50px, 1fr)); /* 정사각형의 크기를 유지하면서 가능한 많은 열을 채움 */
            grid-auto-rows: 50px;
            align-items: flex-start;
            box-sizing: content-box;

            ::-webkit-scrollbar {
                width: 10px; /* 스크롤바의 width */
                background-color: rgba(0, 0, 0, 0); /* 스크롤바의 배경색 지정 */
            }

            ::-webkit-scrollbar-corner {
                background-color: ${colorList.semantic.card}; /* 스크롤바 교차 지점의 배경색 지정 */
            }

            ::-webkit-scrollbar-track {
                background-color: rgba(33, 33, 33, 0.5); /* 스크롤바의 track 배경색 지정 */
            }

            ::-webkit-scrollbar-thumb {
                background-color: ${colorList.semantic.hover}; /* 스크롤바의 thumb 배경색 지정 */
                border-radius: 100px; /* 스크롤바 thumb의 모서리 둥글게 지정 */
            }

            .img {
                cursor: pointer;
                position: relative;
                height: 100%;
                box-sizing: border-box;
                border: 2px solid rgba(0, 0, 0, 0);
                &:hover {
                    border: 2px solid ${colorList.secondary.beige};
                }
            }
            
            .none {
                position: relative;
                height: 100%;
                filter: grayscale(100%);
                box-sizing: border-box;
                cursor: not-allowed;
                border: 2px solid rgba(0, 0, 0, 0);
                &:hover {
                    border: 2px solid rgba(0, 0, 0, 0);
                }
            }
        }
        
        button {
            width: 100px;
            height: 50px;
            margin-top: 20px;
        }
    }


    .blueTeam {
        width: 33%;
        max-width: 400px;
        height: 100%;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        align-items: start;

        .pickList {
            margin-top: 20px;

            height: 100%;
            width: 100%;
            background-color: rgba(0, 0, 0, 0);
            display: flex;
            flex-direction: column;
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
                justify-content: end;
                align-items: end;
                flex-direction: row-reverse;
                
                @media screen and (max-width: 1100px) {
                    height: 100px;
                }

                .img {
                    object-fit: cover;
                    object-position: top;
                    height: auto !important;
                }

                .championName{
                    position: relative;
                    color: ${colorList.grayscale["100"]};
                    width: 30%;
                    height: 30%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 17px;
                    font-weight: bold;
                }
                .swap{

                    width: 30%;
                    height: 100%;
                    position: relative;
                    display: flex;
                    justify-content: start;
                    align-items: center;
                    opacity: 0;

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
                    width:35%;
                    height: 90%;
                    display: flex;
                    justify-content: start;
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
        }
        
        .banList {
            height: 100%;
            width: 100%;
            display: grid;
            grid-template-columns: repeat(5, minmax(20px, 50px)); /* 정사각형의 크기를 유지하면서 가능한 많은 열을 채움 */
            grid-auto-rows: 50px;
            justify-content: start;
            align-items: start;
            box-sizing: content-box;
            gap: 2px;


            .ban {
                position: relative;
                box-sizing: border-box;
                background-color: rgba(33, 33, 33, 0.5);
                height: 100%;
                border: 2px solid rgba(33, 33, 33, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                
                .banImg {
                    z-index: 1;
                    position: absolute;
                    top: 50%;
                    width: 100%;
                    height: 2px;
                    background-color: rgba(255, 255, 255, 0.5);
                    transform: rotate(45deg);
                }

                .img {
                    height: 46px;
                    width: 100%;
                    background-size: cover;
                }

                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.3; }
                }

                .now {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    z-index: 2;
                    animation: blink 5s linear infinite;
                    background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3)  100%);
                    
                }

               
            }
        }
        

    }
`
