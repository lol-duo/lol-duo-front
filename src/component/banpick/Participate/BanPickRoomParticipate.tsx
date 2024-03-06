import { NextPage } from "next";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import I18n from "@/component/locale/i18n";
import { useEffect, useRef, useState } from "react";
import { TeamInfoType } from "@/types/banPick";
import Peer, { DataConnection } from "peerjs";
import { Chat } from "@/types/banPick";
import colorList from "@styles/colorList";
import BanPickRoomStart from "@/component/banpick/Start/BanPickRoomStart";
import ChatAndInfoBar from "@/component/banpick/Participate/ChatAndInfoBar";
import TeamBar from "@/component/banpick/Participate/TeamBar";
import InfoamtionBar from "@/component/banpick/Participate/InfoamtionBar";
import TitleBar from "@/component/banpick/Participate/TitleBar";
import Image from "next/image";

const BanPickRoomParticipate: NextPage<{rootId?: string ,timeLimited?:boolean,setTimeLimited?:(value:boolean) => void}> = (props) => {
    const {rootId,timeLimited,setTimeLimited} = props;
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
    const [connectionListSize, setConnectionListSize] = useState<number>(0);

     // 각 팀의 정보
    const [redTeam, setRedTeam] = useState<TeamInfoType>({     user: "",   status: "none", userName: "" });
    const [blueTeam, setBlueTeam] = useState<TeamInfoType>({     user: "",   status: "none", userName: "" });

    //게임 모드
    const [selectedGameMode, setSelectedGameMode] = useState<string>("1:1");
    //시간제한
    const [isTimeLimited, setIsTimeLimited] = useState<boolean>(timeLimited==undefined?true:timeLimited);
    useEffect(() => {
        if(setTimeLimited!=undefined){
            setTimeLimited(isTimeLimited);
        }
    }, [isTimeLimited]);
    //게임시작
    const [isStart, setIsStart] = useState<boolean>(false);

    //채팅
    const [chat, setChat] = useState<string>("");
    const [chatList, setChatList] = useState<Chat[]>([]);

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

    // Timer
    const isEnd = useRef<boolean>(false);
    const timerTime = useRef<number>(30);
    const [time, setTime] = useState<number|string>(30);
    const intervalId = useRef<NodeJS.Timeout | null>(null);
    const Timer = (end?: boolean, last?: boolean, isTimeLimited?:boolean) => {

        if(!isTimeLimited){
            intervalId.current && clearInterval(intervalId.current);
            timerTime.current = 30;
            setTime(text.timeLimitInfo);
            return;
        }
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
    //p2p 메시지 타입 지정하여 보내기
    const sendMsg = (message: any) => {
        try {
            connectionList.get(id as string)?.send(JSON.stringify(message));
        } catch (e) {
            window.alert("방이 존재하지 않습니다.");
            router.push("/");
        }
    }

    //p2p 메시지 보내기
    const sendTeamMsg = (message: {team: string, status: string}) => {
        connectionList.get(id as string)?.send(JSON.stringify({
            type: "teamInfo",
            team: message.team,
            id: myId.current,
            status: message.status,
            userName: myUserId
        }));
    }
    // 채팅 보내기
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
            
            // 닫기 누르기전 알림 띄우기
            window.addEventListener('beforeunload', (event) => {
                event.preventDefault();
                event.returnValue = true;
            });
            // 닫기시 peer destroy
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
                setConnectionListSize(connectionList.size);
                sendChat("방에 입장하였습니다.");
                setChatList(chatList => [...chatList, {
                    chat: "방에 입장하였습니다.",
                    userName: "SYSTEM",
                    color: "#888888"
                }]);

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
                                    setConnectionListSize(connectionList.size);
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
                        } else if(nowData.type === "currentMode"){
                            setSelectedGameMode(nowData.message.mode);
                            setIsTimeLimited(nowData.message.isTimeLimited);
                        }
                         else if(nowData.type === "soloMode"){
                            setBlueTeam(nowData.message.blueTeam);
                            setRedTeam(nowData.message.redTeam);
                            redTeamUser.current = nowData.message.redTeam.user;
                            blueTeamUser.current = nowData.message.blueTeam.user;
                            setSelectedGameMode("solo");
                        } else if(nowData.type === "1:1Mode"){
                            setBlueTeam(nowData.message.blueTeam);
                            setRedTeam(nowData.message.redTeam);
                            redTeamUser.current = nowData.message.redTeam.user;
                            blueTeamUser.current = nowData.message.blueTeam.user;   
                            setSelectedGameMode("1:1");                        
                        }else if(nowData.type ==="TimeLimitChange"){
                            setIsTimeLimited(nowData.message);
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
        });

    }, [id]);
    return (
        <BanPickRoomParticipateWrapper>
            <Person><Image src={"/person.png"} alt={"/person.png"} width={20} height={20}/><div className="person">{connectionListSize - 1}</div></Person>
            {!isStart && <TitleBar subject={text.subject}/>}
            {!isStart && <InfoamtionBar idText={text.myId} myUserId={myUserId} roomUrl={text.roomURL} roomId ={id}/>}
            {!isStart && <TeamBar blueTeam={blueTeam} redTeam={redTeam} rootId={rootId} myId={myId} sendTeamMsg={sendTeamMsg} sendMsg={sendMsg} myUserId={myUserId} hostId = {rootIdRef.current} text={text} selectedGameMode={selectedGameMode} setSelectedGameMode={setSelectedGameMode} isTimeLimited={isTimeLimited} setIsTimeLimited={setIsTimeLimited}></TeamBar>}
            {
                isStart && <BanPickRoomStart selectedChampion={selectedChampion} now={now} sendMsg={sendMsg} text={text} chatList={chatList} setChatList={setChatList}
                sendChat={sendChat} myId={myId} redTeam={redTeam} blueTeam={blueTeam} myUserId={myUserId} time={time} selectedGameMode={selectedGameMode}/>
            }
            <ChatAndInfoBar isStart={isStartRef.current} myId={myId} myUserId= {myUserId} blueTeam={blueTeam} redTeam={redTeam} chat={chat} setChat={setChat} setChatList={setChatList} sendChat={sendChat} chatList={chatList} text={text} roomUrl={text.roomURL} roomId ={id}/>
        </BanPickRoomParticipateWrapper>
    );
}

export default BanPickRoomParticipate;

const Person = styled.div`
    position: absolute;
    top: -44px;
    left: 49%;
    width: 50px;
    height: 20px;
    z-index: 100;
    color: ${colorList.grayscale["200"]};
    display: flex;
    flex-direction: row;
    gap: 5px;
    
    .person {
        display: flex;
        justify-content: center;
        align-items: center;
        
        font-size: 20px;
    }
`

const BanPickRoomParticipateWrapper = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
align-items: center;
z-index: 1;
`;