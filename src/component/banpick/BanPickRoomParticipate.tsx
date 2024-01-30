import {NextPage} from "next";
import styled from "@emotion/styled";
import {Button} from "@nextui-org/react";
import {useEffect, useRef, useState} from "react";
import Peer, {DataConnection} from "peerjs";
import {useRouter} from "next/router";
import colorList from "../../../style/colorList";
import BanPickRoomStart from "@/component/banpick/BanPickRoomStart";
import I18n from "@/component/locale/i18n";
import fontList from "../../../style/fontList";
import {TeamInfoType} from "@/types/banPick";

const BanPickRoomParticipate: NextPage<{rootId?: string}> = (props) => {
    const rootId = props.rootId;
    const router = useRouter();
    let {id} = router.query;
    if(rootId != undefined) id = rootId;

    // text 정보
    const text = I18n('banpick.json').value;

    // 랜덤 아이디 부여
    const championInfoList = I18n('champion.ts');
    const championList = championInfoList.value as [{    en_name: string,     ko_name: string   }];
    const language = championInfoList.language;
    const randomIndex = Math.floor(Math.random() * championList.length);
    const randomInt = Math.floor(Math.random() * 10000);
    const [myUserId, setMyUserId] = useState<string>("");
    useEffect(() => {
        setMyUserId(language === "ko" ? championList[randomIndex].ko_name + randomInt : championList[randomIndex].en_name + randomInt);
    }, []);

    // peer 의 아이디
    const myId = useRef<string>("");
    const connectionList = useRef(new Map<string, DataConnection>()).current;
    const rootIdRef = useRef<string>("");
    const peer = useRef<Peer>();

    // 각 팀의 정보
    const [redTeam, setRedTeam] = useState<TeamInfoType>({     user: "",   status: "none", userName: "" });
    const [blueTeam, setBlueTeam] = useState<TeamInfoType>({     user: "",   status: "none", userName: "" });

    const [isStart, setIsStart] = useState<boolean>(false);
    const [chat, setChat] = useState<string>("");
    const [chatList, setChatList] = useState<{
        chat: string,
        userName: string,
        color: string
    }[]>([]);

    // 방 폭파
    const redTeamUser = useRef<string>("");
    const blueTeamUser = useRef<string>("");
    const isStartRef = useRef<boolean>(false);

    // 밴픽 정보
    const [selectedChampion, setSelectedChampion] = useState<{
        img: string,
            en_name: string,
            ko_name: string,
        name_id: string,
    }[]>([]);
    const [now, setNow] = useState<number>(0);

    // timer
    const isEnd = useRef<boolean>(false);
    const timerTime = useRef<number>(30);
    const [time, setTime] = useState<number|string>(30);
    const intervalId = useRef<NodeJS.Timeout | null>(null);
    const Timer = (end?: boolean, last?: boolean) => {
        if(end || isEnd.current) {
            intervalId.current && clearInterval(intervalId.current);
            timerTime.current = 30;
            setTime("END");
            return;
        }
        if(last) {
            intervalId.current && clearInterval(intervalId.current);
            timerTime.current = 60;
            setTime(60);
        }
        else if(intervalId.current != null || timerTime.current != 30) {
            intervalId.current && clearInterval(intervalId.current);
            timerTime.current = 30;
            setTime(30);
        }
        intervalId.current = setInterval(() => {
            if(timerTime.current <= 0) {
                intervalId.current && clearInterval(intervalId.current);
                timerTime.current = 30;
                setTime(30);
                return;
            }
            timerTime.current--;
            setTime(timerTime.current);
        }, 1000);
    }
    const sendMsg = (message: any) => {
        try {
            connectionList.get(id as string)?.send(JSON.stringify(message));
        } catch (e) {
            window.alert("방이 존재하지 않습니다.");
            router.push("/");
        }
    }

    const sendTeamMsg = (message: {team: string, status: string}) => {
        connectionList.get(id as string)?.send(JSON.stringify({
            type: "teamInfo",
            team: message.team,
            id: myId.current,
            status: message.status,
            userName: myUserId
        }));
    }

    const sendChat = (message: string) => {
        try {
            for(let conn of connectionList.values()) {
                conn?.send(JSON.stringify({
                    type: "chat",
                    message: {
                        chat: message,
                        userName: myUserId,
                        color: myId.current === redTeam.user ? colorList.banPick.redTeamText :
                            myId.current === blueTeam.user ? colorList.banPick.blueTeamText : colorList.grayscale["000"]
                    }
                }));
            }
        } catch (e) {
            window.alert("방이 존재하지 않습니다.");
            router.push("/");
        }
    }


    useEffect(() => {
        setTimeout(() => {
            if(!isEnd.current) {
                if(rootIdRef.current == "") {
                    alert("없는 방입니다.");
                    router.push("/");
                }
            }
        },  1500);
    }, []);

    useEffect(() => {
        if(id == undefined) return;
        // !rootId &&
         import('peerjs').then(({ default: Peer }) => {
            const nowPeer = new Peer({
                host: 'api.lolduo.net',
                port: 9000,
                path: '/',
                secure: true,
            });
            peer.current = nowPeer;

                window.addEventListener('beforeunload', (event) => {
                    event.preventDefault();
                    event.returnValue = true;
                });

                window.addEventListener('unload', (event) => {
                    peer.current?.destroy();
                });

            nowPeer.on('open', function(nowId) {
                myId.current = nowId;

                const conn2 = nowPeer?.connect(id as string);
                conn2?.on('open', function () {
                    conn2.send(JSON.stringify({
                        type: "join",
                        id: myId.current
                    }));

                    if(rootId != undefined) {
                        conn2.send(JSON.stringify({
                            type: "root",
                            id: myId.current
                        }));
                    }
                });
                connectionList.set(id as string, conn2 as DataConnection);
                sendChat("방에 입장하였습니다.");
                setChatList(chatList => [...chatList, {
                    chat: "방에 입장하였습니다.",
                    userName: "SYSTEM",
                    color: "#888888"
                }]);
            });

            nowPeer.on('connection', function(conn) {
                conn.on('data', function(data) {
                    const nowData = JSON.parse(data as string);

                    if(nowData.type === "connectionList") {
                        for(let i = 0; i < nowData.message.length; i++) {
                            if(!connectionList.has(nowData.message[i])) {
                                const conn = nowPeer?.connect(nowData.message[i]);
                                conn?.on('open', function () {
                                    conn.send(JSON.stringify({
                                        type: "join",
                                        id: myId
                                    }));
                                });
                                connectionList.set(nowData.message[i], conn as DataConnection);
                                connectionList.set(nowData.message[i], conn as DataConnection);
                            }
                        }
                        for(let key of connectionList.keys()) {
                            if(!nowData.message.includes(key) && key !== id)
                                connectionList.delete(key);
                        }
                    } else if(nowData.type === "join") {
                    } else if(nowData.type === "teamInfo") {
                        let realRedTeam = nowData.message.red;
                        let realBlueTeam = nowData.message.blue;
                        if(redTeam.user === myId.current && realRedTeam.user !== myId.current) {
                            window.alert("다른 플레이어가 RED팀에 먼저 참가하였습니다.");
                        } else if (blueTeam.user === myId.current && realBlueTeam.user !== myId.current) {
                            window.alert("다른 플레이어가 BLUE팀에 먼저 참가하였습니다.");
                        }
                        setRedTeam(realRedTeam);
                        setBlueTeam(realBlueTeam);
                        redTeamUser.current = realRedTeam.user;
                        blueTeamUser.current = realBlueTeam.user;
                    } else if(nowData.type === "chat") {
                        setChatList(chatList => [...chatList, nowData.message]);
                    } else if(nowData.type === "start") {
                        Timer();
                        setIsStart(true);
                        isStartRef.current = true;
                    } else if(nowData.type === "banPick") {
                        setSelectedChampion(selectedChampion => {
                            const newSelectedChampion = [...selectedChampion];
                            newSelectedChampion[nowData.message.now] = nowData.message.selectedChampion;
                            return newSelectedChampion;
                        });
                    } else if(nowData.type === "next") {
                        Timer();
                        setNow(nowData.message.now);
                    } else if(nowData.type === "root") {
                        rootIdRef.current = nowData.message.id;
                    } else if(nowData.type === "banPickAll") {
                        setSelectedChampion(nowData.message.selectedChampion);
                    } else if(nowData.type === "end") {
                        isEnd.current = true;
                        Timer(true);
                        setNow(21);
                    } else if(nowData.type === "last") {
                        Timer(false, true);
                        setNow(nowData.message.now);
                    }

                    if(isEnd.current){
                        setNow(21);
                    }
                });
                conn.on('close', () => {
                    connectionList.delete(conn.peer);
                    if(!isEnd.current) {
                        if (conn.peer === rootIdRef.current && isStartRef.current) {
                            alert("방장이 나갔습니다.");
                            setTimeout(() => {
                                router.push("/");
                            }, 1000);
                        }
                        if (redTeamUser.current === conn.peer && isStartRef.current) {
                            alert("RED팀이 나갔습니다.");
                            setTimeout(() => {
                                router.push("/");
                            }, 1000);
                        } else if (blueTeamUser.current === conn.peer && isStartRef.current) {
                            alert("BLUE팀이 나갔습니다.");
                            setTimeout(() => {
                                router.push("/");
                            }, 1000);
                        }
                    }
                });
            });

        });

    }, [id]);

    const handleCopyClipBoard = async (text: string) => {
        // Navigator clipboard api needs a secure context (https)

        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            alert('클립보드에 복사되었습니다');
        } else {
            // Use the 'out of viewport hidden text area' trick
            const textArea = document.createElement("textarea");
            textArea.value = text;

            // Move textarea out of the viewport so it's not visible
            textArea.style.position = "absolute";
            textArea.style.left = "-999999px";

            document.body.prepend(textArea);
            textArea.select();

            try {
                document.execCommand('copy');
                alert('클립보드에 복사되었습니다');
            } catch (error) {
                alert('복사에 실패하였습니다');
            } finally {
                textArea.remove();
            }
        }
    };

    const isScrolledToBottom = () => {
        const scrollOffset = 25;
        const input = document.querySelector('.input-text');
        if(input == null) return;
        return input.scrollTop + input.clientHeight >= input.scrollHeight - scrollOffset;
    }

    useEffect(() => {
        const input = document.querySelector('.input-text');
        if(input == null) return;
        if(isScrolledToBottom()) input.scrollTop = input.scrollHeight;
    }, [chatList]);

    return (
        <BanPickRoomWrapper>
            {!isStart && <div className="subject">{text.subject}</div>}
            {!isStart &&
                <div className="infoMation">
                    <div className="userId">
                        <div className="title">{text.myId}</div>
                        <div className="id">{myUserId}</div>
                    </div>
                    <div className="roomInfo">
                        <div className="title">{text.roomURL}</div>
                        <div className="url">
                            <div className="link">{`https://lolduo.net/banpick/room?id=${id}`}</div>
                            <div className="copyButton" onClick={() => handleCopyClipBoard(`https://lolduo.net/banpick/room?id=${id}`)}>copy</div>
                        </div>
                    </div>
                </div>
            }
            {!isStart && <>
                <div className="진영">
                    <div className="blue">
                        <div className="title">{text.blueTeam}</div>
                        <div className="status">
                            {blueTeam.user === "" && text.status.waiting}
                            {blueTeam.user === myId.current && myUserId + " ( ME )"}
                            {blueTeam.user !== myId.current && blueTeam.user !== "" && blueTeam.userName}
                        </div>
                        <div className="in_button">
                            {blueTeam.user === myId.current &&
                                <div className="readyButton">
                                    {
                                        blueTeam.user === myId.current && blueTeam.status === "in" &&
                                        <Button
                                            onClick={() => sendTeamMsg({team: "blue", status: "ready"})}>준비하기</Button>
                                    }
                                    {
                                        blueTeam.user === myId.current && blueTeam.status === "ready" &&
                                        <Button onClick={() => sendTeamMsg({team: "blue", status: "in"})}>준비
                                            취소하기</Button>
                                    }
                                    {
                                        blueTeam.user !== myId.current && <Button disabled={true}>준비하기</Button>
                                    }
                                </div>
                            }
                            {redTeam.user !== myId.current && blueTeam.status === "none" && <Button
                                onClick={() => sendTeamMsg({team: "blue", status: "in"})}>BLUE 팀 참가하기</Button>}
                            {(redTeam.user === myId.current || (blueTeam.user !== myId.current && blueTeam.user !== "" && blueTeam.status !== "ready")) && blueTeam.status !== "ready" &&
                                <Button disabled={true} className="none">BLUE 팀 참가하기</Button>}
                            {blueTeam.status === "in" && blueTeam.user === myId.current && <Button
                                className="outButton"
                                onClick={() => sendTeamMsg({team: "blue", status: "none"})}>나가기</Button>}
                            {blueTeam.user !== myId.current && blueTeam.status === "ready" && <Button
                                disabled={true}>RED 팀 준비완료</Button>}
                        </div>
                    </div>
                    <div className="startAndReadyButton">
                        <div className="startButton">
                            {rootId != undefined &&
                                <Button disabled={(!(redTeam.status === "ready" && blueTeam.status === "ready"))}
                                        onClick={() => sendMsg({type: "start", id: rootId})}>게임 시작</Button>}
                            {rootId == undefined &&
                                <Button disabled={true}>게임 시작</Button>}
                            <div className="info">
                                {text.startButtonInfo}
                            </div>
                        </div>
                    </div>
                    <div className="red">
                        <div className="title">{text.redTeam}</div>
                        <div className="status">
                            {redTeam.user === "" && text.status.waiting}
                            {redTeam.user === myId.current && myUserId + " ( ME )"}
                            {redTeam.user !== myId.current && redTeam.user !== "" && redTeam.userName}
                        </div>
                        <div className="in_button">
                            {redTeam.user === myId.current &&
                                <div className="readyButton">
                                    {
                                        redTeam.user === myId.current && redTeam.status === "in" &&
                                        <Button
                                            onClick={() => sendTeamMsg({team: "red", status: "ready"})}>준비하기</Button>
                                    }
                                    {
                                        redTeam.user === myId.current && redTeam.status === "ready" &&
                                        <Button onClick={() => sendTeamMsg({team: "red", status: "in"})}>준비
                                            취소하기</Button>
                                    }
                                    {
                                        redTeam.user !== myId.current &&
                                        <Button disabled={true}>준비하기</Button>
                                    }
                                </div>
                            }
                            {blueTeam.user !== myId.current && redTeam.status === "none" &&
                                <Button onClick={() => sendTeamMsg({team: "red", status: "in"})}>RED 팀 참가하기</Button>}
                            {(blueTeam.user === myId.current || (redTeam.user !== myId.current && redTeam.user !== "" && redTeam.status !== "ready")) && redTeam.status !== "ready" &&
                                <Button disabled={true} className="none">RED 팀 참가하기</Button>}
                            {redTeam.status === "in" && redTeam.user === myId.current &&
                                <Button className="outButton"
                                        onClick={() => sendTeamMsg({team: "red", status: "none"})}>나가기</Button>}
                            {redTeam.user !== myId.current && redTeam.status === "ready" &&
                                <Button disabled={true}>RED 팀 준비완료</Button>}
                        </div>
                    </div>

                </div>
            </>
            }
            {
                isStart && <BanPickRoomStart selectedChampion={selectedChampion} now={now} sendMsg={sendMsg} text={text} me={myId.current === blueTeam.user ? "blue" : myId.current === redTeam.user ? "red" : "none"} chatList={chatList} setChatList={setChatList}
                sendChat={sendChat} myId={myId} redTeam={redTeam} blueTeam={blueTeam} myUserId={myUserId} time={time} />
            }
            <div className="bottom">
                {!isStart && <div className="chat">
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
                                       color: myId.current === redTeam.user ? colorList.banPick.redTeamText :
                                           myId.current === blueTeam.user ? colorList.banPick.blueTeamText : colorList.secondary.beige
                                   }])
                               }
                           }}/>
                </div>}
                {isStart && <div className="chat2">
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
                                       color: myId.current === redTeam.user ? colorList.banPick.redTeamText :
                                           myId.current === blueTeam.user ? colorList.banPick.blueTeamText : colorList.secondary.beige
                                   }])
                               }
                           }}/>
                </div>}
                {!isStart && <div className="between"></div> }
                {!isStart && <div className="info">
                    <div className="infoList">
                    {(text.infoList as any[]).map(item => (
                        <div key={item.index} className={`${item.index === 1 ? 'title' : 'info'}`}
                        >{item.info}</div>
                    ))}
                    </div>
                </div>}
                {isStart && <div className="infoMationBottom">
                    <div className="userId">
                        <div className="title">{text.myId}</div>
                        <div className="id">{myUserId}</div>
                    </div>
                    <div className="roomInfo">
                        <div className="title">{text.roomURL}</div>
                        <div className="url">
                            <div className="link">{`https://lolduo.net/banpick/room?id=${id}`}</div>
                            <div className="copyButton"
                                 onClick={() => handleCopyClipBoard(`https://lolduo.net/banpick/room?id=${id}`)}>copy
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        </BanPickRoomWrapper>
    );
}

export default BanPickRoomParticipate;

const BanPickRoomWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;

    .subject {
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;

        font-weight: bold;
        font-size: 30px;
        color: ${colorList.grayscale["000"]};
    }

    .infoMation {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 20px;

        .userId {
            width: 20%;
            height: 100%;
            min-height: 60px;
            display: flex;
            flex-direction: column;
            background: rgba(47, 47, 47, 1);
            border-radius: 10px;
            align-items: center;
            justify-content: center;
            
            
            .title {
                width: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;

                font-family: ${fontList.roboto.regular["14"].fontFamily};
                font-size: ${fontList.roboto.regular["14"].fontSize};
                font-weight: ${fontList.roboto.regular["14"].fontWeight};
                line-height: ${fontList.roboto.regular["14"].lineHeight};
                letter-spacing: ${fontList.roboto.regular["14"].letterSpacing};
                color: rgba(181, 181, 181, 1);
            }
            
            .id {
                width: 90%;
                height: 50%;
                display: flex;
                align-items: center;
                justify-content: center;

                font-family: ${fontList.roboto.medium["16"].fontFamily};
                font-size: ${fontList.roboto.medium["16"].fontSize};
                font-weight: ${fontList.roboto.medium["16"].fontWeight};
                line-height: ${fontList.roboto.medium["16"].lineHeight};
                letter-spacing: ${fontList.roboto.medium["16"].letterSpacing};
                color: rgba(249, 249, 249, 1);
            }
        }
        
        .roomInfo {
            width: 70%;
            height: 100%;
            min-height: 60px;
            display: flex;
            flex-direction: column;
            background: rgba(47, 47, 47, 1);
            border-radius: 10px;
            align-items: center;
            justify-content: center;
            
            .title {
                width: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;

                font-family: ${fontList.roboto.regular["14"].fontFamily};
                font-size: ${fontList.roboto.regular["14"].fontSize};
                font-weight: ${fontList.roboto.regular["14"].fontWeight};
                line-height: ${fontList.roboto.regular["14"].lineHeight};
                letter-spacing: ${fontList.roboto.regular["14"].letterSpacing};
                color: ${colorList.grayscale["100"]};
            }
            
            .url {
                width: 90%;
                height: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;

                
                
                font-family: ${fontList.roboto.medium["16"].fontFamily};
                font-size: ${fontList.roboto.medium["16"].fontSize};
                font-weight: ${fontList.roboto.medium["16"].fontWeight};
                line-height: ${fontList.roboto.medium["16"].lineHeight};
                letter-spacing: ${fontList.roboto.medium["16"].letterSpacing};
                color: ${colorList.grayscale["000"]};
                
                .link{
                    text-overflow:ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
                
                .copyButton {
                    width: 50px;
                    height: 20px;
                    border-radius: 10px;
                    background-color: ${colorList.grayscale["200"]};
                    opacity: 0.8;
                    color: ${colorList.grayscale["000"]};
                    
                    font-family: ${fontList.roboto.medium["16"].fontFamily};
                    font-size: ${fontList.roboto.medium["16"].fontSize};
                    font-weight: ${fontList.roboto.medium["16"].fontWeight};
                    line-height: ${fontList.roboto.medium["16"].lineHeight};
                    letter-spacing: ${fontList.roboto.medium["16"].letterSpacing};
                        
                    display: flex;
                    justify-content: center;
                    
                    &:hover {
                        background-color: #888888;
                        cursor: pointer;
                    }
                    
                    &:active {
                        outline: none;
                    }
                    &:focus {
                        outline: none;
                    }
                }
            }
        }
    }
    
    .bottom {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap:10px;
        
        .chat {
            width: 20%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-left: 30px;
            
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
            
        }

        .chat2 {
            display: none;
            z-index: 1;
            
            @media screen and (max-width: 1100px) {
                margin-top: 20px;
                margin-left: 20px;
                width: 30%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;

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
            } 

            

        }
        
        .info {
            width: 70%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: end;
            justify-content: end;
            
            .infoList {
                width: 500px;
                height: 100%;
                display: flex;
                flex-direction: column;
                border-radius: 10px;
                justify-content: center;
                align-items: start;
                
                @media screen and (max-width: 750px) {
                    width: 100%;
                }
                

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
        }
        .infoMationBottom {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 20px;
            z-index: 1;
            
            @media screen and (max-width: 1100px) {
                width: 65%;
                align-items: end;                
            }
    
            .userId {
                width: 20%;
                height: 100%;
                min-height: 60px;
                display: flex;
                flex-direction: column;
                background: rgba(47, 47, 47, 1);
                border-radius: 10px;
                align-items: center;
                justify-content: center;
                
                
                .title {
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
    
                    font-family: ${fontList.roboto.regular["14"].fontFamily};
                    font-size: ${fontList.roboto.regular["14"].fontSize};
                    font-weight: ${fontList.roboto.regular["14"].fontWeight};
                    line-height: ${fontList.roboto.regular["14"].lineHeight};
                    letter-spacing: ${fontList.roboto.regular["14"].letterSpacing};
                    color: rgba(181, 181, 181, 1);
                }
                
                .id {
                    width: 90%;
                    height: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
    
                    font-family: ${fontList.roboto.medium["16"].fontFamily};
                    font-size: ${fontList.roboto.medium["16"].fontSize};
                    font-weight: ${fontList.roboto.medium["16"].fontWeight};
                    line-height: ${fontList.roboto.medium["16"].lineHeight};
                    letter-spacing: ${fontList.roboto.medium["16"].letterSpacing};
                    color: rgba(249, 249, 249, 1);
                }
            }
            
            .roomInfo {
                width: 70%;
                height: 100%;
                min-height: 60px;
                display: flex;
                flex-direction: column;
                background: rgba(47, 47, 47, 1);
                border-radius: 10px;
                align-items: center;
                justify-content: center;
                
                .title {
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
    
                    font-family: ${fontList.roboto.regular["14"].fontFamily};
                    font-size: ${fontList.roboto.regular["14"].fontSize};
                    font-weight: ${fontList.roboto.regular["14"].fontWeight};
                    line-height: ${fontList.roboto.regular["14"].lineHeight};
                    letter-spacing: ${fontList.roboto.regular["14"].letterSpacing};
                    color: ${colorList.grayscale["100"]};
                }
                
                .url {
                    width: 90%;
                    height: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
    
                    
                    
                    font-family: ${fontList.roboto.medium["16"].fontFamily};
                    font-size: ${fontList.roboto.medium["16"].fontSize};
                    font-weight: ${fontList.roboto.medium["16"].fontWeight};
                    line-height: ${fontList.roboto.medium["16"].lineHeight};
                    letter-spacing: ${fontList.roboto.medium["16"].letterSpacing};
                    color: ${colorList.grayscale["000"]};
                    
                    .link{
                        text-overflow:ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                    
                    .copyButton {
                        width: 50px;
                        height: 20px;
                        border-radius: 10px;
                        background-color: ${colorList.grayscale["200"]};
                        opacity: 0.8;
                        color: ${colorList.grayscale["000"]};
                        
                        font-family: ${fontList.roboto.medium["16"].fontFamily};
                        font-size: ${fontList.roboto.medium["16"].fontSize};
                        font-weight: ${fontList.roboto.medium["16"].fontWeight};
                        line-height: ${fontList.roboto.medium["16"].lineHeight};
                        letter-spacing: ${fontList.roboto.medium["16"].letterSpacing};
                            
                        display: flex;
                        justify-content: center;
                        
                        &:hover {
                            background-color: #888888;
                            cursor: pointer;
                        }
                        
                        &:active {
                            outline: none;
                        }
                        &:focus {
                            outline: none;
                        }
                    }
                }
        }
    }
    }
    
    .진영 {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 20px;
        
        .startAndReadyButton {
            margin-top: 30px;
            width: 20%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            
            .startButton {
                width: 100%;
                height: 50%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 5px;

                Button {
                    width: 100%;
                    height: 70px;
                    border-radius: 10px;
                    border-left-color: ${colorList.banPick.blueTeam};
                    border-right-color: ${colorList.banPick.redTeam};
                    border-bottom-color: linear-gradient(to right, ${colorList.banPick.blueTeam}, ${colorList.banPick.redTeam});
                    background: linear-gradient(to right, ${colorList.banPick.blueTeam}, ${colorList.banPick.redTeam});

                    border-top-color: rgba(118, 118, 118, 0.3);

                    color: white;
                    font-weight: bold;
                    font-size: 20px;

                    &:active {
                        outline: none;
                    }
                    
                    &:focus {
                        outline: none;
                    }
                    
                    
                    &:hover {
                        background: linear-gradient(to right, ${colorList.banPick.blueTeamHover}, ${colorList.banPick.redTeamHover});
                        cursor: pointer;
                    }

                    &:disabled {
                        
                        &:hover {
                            background: linear-gradient(to right, ${colorList.banPick.blueTeam}, ${colorList.banPick.redTeam});
                            cursor: default;
                        }
                        
                        opacity: 0.5;
                        cursor: default;
                    }
                }
                
                .info {
                    color: #888888;
                    height: 20px;
                    
                    font-family: ${fontList.roboto.regular["14"].fontFamily};
                    font-size: ${fontList.roboto.regular["14"].fontSize};
                    font-weight: ${fontList.roboto.regular["14"].fontWeight};
                    line-height: ${fontList.roboto.regular["14"].lineHeight};
                    letter-spacing: ${fontList.roboto.regular["14"].letterSpacing};
                    
                    @media (max-width: 1400px) {
                        font-size: 12px;
                    }
                    
                    @media (max-width: 1200px) {
                        font-size: 10px;
                    }
                }
            }
        }
        
        .red {
            width: 40%;
            height: 300px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 15px;
            
            .title {
                width: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;

                font-family: ${fontList.roboto.regular["20"].fontFamily};
                font-size: ${fontList.roboto.regular["20"].fontSize};
                font-weight: ${fontList.roboto.regular["20"].fontWeight};
                line-height: ${fontList.roboto.regular["20"].lineHeight};
                letter-spacing: ${fontList.roboto.regular["20"].letterSpacing};
                color: ${colorList.grayscale["000"]};
            }
            
            .status {
                width: 50%;
                height: 35px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;

                background-color: white;
                border : 2px solid ${colorList.banPick.redTeam};
                border-radius: 10px;

                font-family: ${fontList.roboto.regular["14"].fontFamily};
                font-size: ${fontList.roboto.regular["14"].fontSize};
                line-height: ${fontList.roboto.regular["14"].lineHeight};
                letter-spacing: ${fontList.roboto.regular["14"].letterSpacing};
                color: ${colorList.grayscale["400"]};
                
                font-weight: bold;
            }
            
            .in_button {
                width: 100%;
                height: 40px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                gap: 10px;
                
                .readyButton {
                width: 35%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                
                Button {
                    width: 100%;
                    height: 50px;

                    border-radius: 10px;
                    background: ${colorList.banPick.redTeam};
                    border-left-color: ${colorList.banPick.redTeam};
                    border-right-color: ${colorList.banPick.blueTeam};
                    border-top-color: rgba(118, 118, 118, 0.3);
                    color: white;

                    &:active {
                        outline: none;
                    }

                    &:focus {
                        outline: none;
                    }
                    
                     &:disabled {
                         opacity: 0.5;
                         cursor: default;
                     }
                }
            }
                
                .outButton {
                        width: 15%;
                        height: 100%;
                        border-radius: 10px;
                        border: none;
                        background-color: ${colorList.grayscale["200"]};
                        opacity: 0.8;
                        color: ${colorList.grayscale["000"]};

                        &:hover {
                            background-color: #888888;
                            cursor: pointer;
                        }

                        &:active {
                            outline: none;
                        }
                        &:focus {
                            outline: none;
                        }

                        &:disabled {
                            background-color: ${colorList.banPick.redTeamHover};
                            opacity: 0.5;
                            cursor: default;
                        }
                }
                
                Button {
                    width: 50%;
                    height: 100%;
                    border-radius: 10px;
                    border: none;
                    background-color: ${colorList.banPick.redTeam};
                    color: white;
                    font-weight: bold;
                    font-size: 15px;
                    
                    &:hover {
                        background-color: ${colorList.banPick.redTeamHover};
                        cursor: pointer;
                    }

                    &:active {
                        outline: none;
                    }
                    &:focus {
                        outline: none;
                    }
                    
                    &:disabled {
                        background-color: ${colorList.banPick.redTeamHover2};
                        opacity: 0.5;
                        cursor: default;
                    }
                }
            }
        }
        
        .blue {
            width: 40%;
            height: 300px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 10px;
            
            .title {
                width: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;

                font-family: ${fontList.roboto.regular["20"].fontFamily};
                font-size: ${fontList.roboto.regular["20"].fontSize};
                font-weight: ${fontList.roboto.regular["20"].fontWeight};
                line-height: ${fontList.roboto.regular["20"].lineHeight};
                letter-spacing: ${fontList.roboto.regular["20"].letterSpacing};
                color: ${colorList.grayscale["000"]};
            }
            
            .status {
                width: 50%;
                height: 35px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;

                background-color: white;
                border : 2px solid ${colorList.banPick.blueTeam};
                border-radius: 10px;

                font-family: ${fontList.roboto.regular["14"].fontFamily};
                font-size: ${fontList.roboto.regular["14"].fontSize};
                line-height: ${fontList.roboto.regular["14"].lineHeight};
                letter-spacing: ${fontList.roboto.regular["14"].letterSpacing};
                color: ${colorList.grayscale["400"]};

                font-weight: bold;
            }

            .in_button {
                width: 100%;
                height: 40px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                gap: 10px;

                .readyButton {
                    width: 35%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;

                    Button {
                        width: 100%;
                        height: 50px;

                        border-radius: 10px;
                        background: ${colorList.banPick.blueTeam};
                        border-left-color: ${colorList.banPick.blueTeam};
                        border-right-color: ${colorList.banPick.redTeam};
                        border-top-color: rgba(118, 118, 118, 0.3);
                        color: white;

                        &:active {
                            outline: none;
                        }

                        &:disabled {
                            opacity: 0.5;
                            cursor: default;
                        }
                    }
                }

                .outButton {
                    width: 15%;
                    height: 100%;
                    border-radius: 10px;
                    border: none;
                    background-color: ${colorList.grayscale["200"]};
                    opacity: 0.8;
                    color: ${colorList.grayscale["000"]};

                    &:hover {
                        background-color: #888888;
                        cursor: pointer;
                    }

                    &:active {
                        outline: none;
                    }
                    &:focus {
                        outline: none;
                    }

                    &:disabled {
                        background-color: ${colorList.banPick.blueTeamHover};
                        opacity: 0.5;
                        cursor: default;
                    }
                }

                Button {
                    width: 50%;
                    height: 100%;
                    border-radius: 10px;
                    border: none;
                    background-color: ${colorList.banPick.blueTeam};
                    color: white;
                    font-weight: bold;
                    font-size: 15px;

                    &:hover {
                        background-color: ${colorList.banPick.blueTeamHover};
                        cursor: pointer;
                    }

                    &:active {
                        outline: none;
                    }
                    &:focus {
                        outline: none;
                    }

                    &:disabled {
                        background-color: ${colorList.banPick.blueTeamHover2};
                        opacity: 0.5;
                        cursor: default;
                    }
                }
            }
        }
        
    }
`
