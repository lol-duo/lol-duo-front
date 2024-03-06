import {NextPage} from "next";
import styled from "@emotion/styled";
import {useEffect, useRef, useState} from "react";
import {DataConnection} from "peerjs";
import BanPickRoomParticipate from "@/component/banpick/Participate/BanPickRoomParticipate";
import {TeamInfoType} from "@/types/banPick";
import {useRouter} from "next/router";
import I18n from "@/component/locale/i18n";

const BanPickRoom: NextPage = () => {

    const [myId, setMyId] = useState<string>("");
    const redTeam = useRef<TeamInfoType>({user: "",   status: "none",userName: ""}).current;
    const blueTeam = useRef<TeamInfoType>({user: "",   status: "none",userName: ""}).current;
    const connectionList = useRef(new Map<string, DataConnection>()).current;
    const now = useRef<number>(0);
    const selectedChampion= useRef(new Array<{
        img: string,
        en_name: string,
        ko_name: string,
        name_id: string
    }>()).current;
    const rootId = useRef<string>("");
    const isStart = useRef<boolean>(false);
    const championInfoList = I18n('champion.ts');
    const championList = championInfoList.value as [{ name_id: string, en_name: string, ko_name: string }];
    const isEnd = useRef<boolean>(false);
    const isLast = useRef<boolean>(false);
    const currentMode = useRef<string>("1:1");
    const [isTimeLimited, setIsTimeLimited] = useState<boolean>(true);
    const isTimeLimitedRef = useRef<boolean>(isTimeLimited);
    const router = useRouter();

    async function setLast(isTimeLimited: boolean) {

        //시간 제한 모드 일때만 실행 
        if(isTimeLimited){
            isLast.current = true;
            setTimeout(() => {
                if(now.current === 20) {
                        isEnd.current = true;
                        for(let conn of connectionList.values()) {
                            conn?.send(JSON.stringify({
                                type: "end",
                                message: {
                                    now : now.current
                                }
                            }));
                        }
                    }
            }, 60 * 1000);
        }

    }

    async function setRandomChampion(current: number , isTimeLimited: boolean) {
        //시간 제한 모드 일때만 실행
        if(isTimeLimited){
            setTimeout(() => {
                if(now.current === current && now.current < 20) {
                    if (selectedChampion[current] == undefined) {
                        let randomIndex = Math.floor(Math.random() * championList.length);
                        let randomChampion = championList[randomIndex];
                        while(selectedChampion.find((value) => value.en_name === randomChampion.en_name) != undefined) {
                            randomIndex = Math.floor(Math.random() * championList.length);
                            randomChampion = championList[randomIndex];
                        }
                        let imgURL = `/centered/${randomChampion.name_id}_0.jpg`
                        if ((current >= 0 && current <= 5) || (current >= 12 && current <= 15)) {
                            imgURL = `/champion/${randomChampion.name_id}.png`
                        }
                        selectedChampion[current] = {
                            img: imgURL,
                            en_name: randomChampion.en_name,
                            ko_name: randomChampion.ko_name,
                            name_id: randomChampion.name_id
                        }
                        now.current++;

                        if(now.current === 20) {
                            isLast.current = true;
                            for (let conn of connectionList.values()) {
                                conn?.send(JSON.stringify({
                                    type: "banPick",
                                    message: {
                                        now: current,
                                        selectedChampion: selectedChampion[current]
                                    }
                                }));
                            }
                            for(let conn of connectionList.values()) {
                                conn?.send(JSON.stringify({
                                    type: "last",
                                    message: {
                                        now : now.current
                                    }
                                }));
                            }
                            setLast(isTimeLimited);
                        } else {
                            for (let conn of connectionList.values()) {
                                conn?.send(JSON.stringify({
                                    type: "banPick",
                                    message: {
                                        now: current,
                                        selectedChampion: selectedChampion[current]
                                    }
                                }));
                                conn?.send(JSON.stringify({
                                    type: "next",
                                    message: {
                                        now : now.current
                                    }
                                }));
                            }
                            setRandomChampion(now.current,isTimeLimited);
                        }
                    } else {
                        now.current++;
                        if(now.current === 20) {
                            isLast.current = true;
                            for(let conn of connectionList.values()) {
                                conn?.send(JSON.stringify({
                                    type: "last",
                                    message: {
                                        now : now.current
                                    }
                                }));
                            }
                            setLast(isTimeLimited);
                        } else {
                            for (let conn of connectionList.values()) {
                                conn?.send(JSON.stringify({
                                    type: "next",
                                    message: {
                                        now : now.current
                                    }
                                }));
                            }
                            setRandomChampion(now.current,isTimeLimited);
                        }
                    }

                }
            }, 30 * 1000);
        
        }
    }
    //시간 제한 토글시
    useEffect(() => {
        for(let conn of connectionList.values()) {
            conn?.send(JSON.stringify({
                type: "TimeLimitChange",
                message: isTimeLimited
            }));
        }
        isTimeLimitedRef.current = isTimeLimited;
    },[isTimeLimited]);

    useEffect(() => {
        try {
            import('peerjs').then(({default: Peer}) => {
                const nowPeer = new Peer({
                    host: 'api.lolduo.net',
                    port: 9000,
                    path: '/',
                    secure: true,
                });

                nowPeer.on('open', function (id) {
                    setMyId(id)
                });

                nowPeer.on('connection', function (conn) {
                    conn.on('data', function (data) {

                        const nowData = JSON.parse(data as any);
                        if (nowData.type === "join") {
                            const conn2 = nowPeer?.connect(nowData.id);
                            connectionList.set(nowData.id, conn2 as DataConnection);
                            conn2?.on('open', function () {
                                conn2.send(JSON.stringify({
                                    type: "connectionList",
                                    message: Array.from(connectionList.keys())
                                }));
                                conn2.send(JSON.stringify({
                                    type: "teamInfo",
                                    message: {
                                        red: redTeam,
                                        blue: blueTeam
                                    }
                                }));
                                conn2.send(JSON.stringify({
                                    type: "currentMode",
                                    message: {
                                        mode: currentMode.current,
                                        isTimeLimited: isTimeLimitedRef.current 
                                    }
                                }));
                                conn2.send(JSON.stringify({
                                    type: "root",
                                    message: {
                                        id : rootId.current
                                    }
                                }));
                                if(isStart.current) {
                                    conn2.send(JSON.stringify({
                                        type: "start",
                                    }));
                                }
                                if(isEnd.current) {
                                    conn2.send(JSON.stringify({
                                        type: "end",
                                        message: {
                                            now : now.current
                                        }
                                    }));
                                }
                                if(isLast.current){
                                    conn2.send(JSON.stringify({
                                        type: "last",
                                        message: {
                                            now : now.current
                                        }
                                    }));
                                }
                                conn2.send(JSON.stringify({
                                    type: "next",
                                    message: {
                                        now : now.current
                                    }
                                }));
                                conn2.send(JSON.stringify({
                                    type: "banPickAll",
                                    message: {
                                        selectedChampion : selectedChampion
                                    }
                                }));
                            });
                            for(let conn of connectionList.values()) {
                                if(conn?.peer !== nowData.id) {
                                    conn?.send(JSON.stringify({
                                        type: "connectionList",
                                        message: Array.from(connectionList.keys())
                                    }));
                                }
                            }
                        } else if (nowData.type === "disconnect") {
                            connectionList.delete(nowData.id);
                            for(let conn of connectionList.values()) {
                                conn?.send(JSON.stringify({
                                    type: "connectionList",
                                    message: Array.from(connectionList.keys())
                                }));
                            }
                        } else if (nowData.type === "teamInfo") {
                            if(nowData.team === "red") {
                                if(redTeam.user === "" || redTeam.user === nowData.id) {
                                    redTeam.user = nowData.status === "none" ? "" : nowData.id;
                                    redTeam.status = nowData.status;
                                    redTeam.userName = nowData.userName;
                                }
                            } else {
                                if(blueTeam.user === "" || blueTeam.user === nowData.id) {
                                    blueTeam.user = nowData.status === "none" ? "" : nowData.id;
                                    blueTeam.status = nowData.status;
                                    blueTeam.userName = nowData.userName;
                                }
                            }
                            for(let conn of connectionList.values()) {
                                conn?.send(JSON.stringify({
                                    type: "teamInfo",
                                    message: {
                                        red: redTeam,
                                        blue: blueTeam
                                    }
                                }));
                            }
                        } else if (nowData.type === "start") {
                            isStart.current = true;
                            for(let conn of connectionList.values()) {
                                conn?.send(JSON.stringify({
                                    type: "start",
                                }));
                            }
                            setRandomChampion(now.current,isTimeLimitedRef.current);
                        } else if (nowData.type === "banPick") {
                            let imgURL = `/centered/${nowData.message.img}_0.jpg`
                            if((now.current >= 0 && now.current <= 5) || (now.current >= 12 && now.current <= 15)) {
                                imgURL = `/champion/${nowData.message.img}.png`
                            }
                            selectedChampion[now.current] = {
                                img: imgURL,
                                en_name: nowData.message.en_name,
                                ko_name: nowData.message.ko_name,
                                name_id: nowData.message.name_id
                            }
                            for(let conn of connectionList.values()) {
                                conn?.send(JSON.stringify({
                                    type: "banPick",
                                    message: {
                                        now : now.current,
                                        selectedChampion: selectedChampion[now.current]
                                    }
                                }));
                            }
                        } else if (nowData.type === "next") {
                            now.current++;
                            if(now.current === 20) {
                                isLast.current = true;
                                for(let conn of connectionList.values()) {
                                    conn?.send(JSON.stringify({
                                        type: "last",
                                        message: {
                                            now : now.current
                                        }
                                    }));
                                }
                                setLast(isTimeLimited);
                            } else {
                                for(let conn of connectionList.values()) {
                                    conn?.send(JSON.stringify({
                                        type: "next",
                                        message: {
                                            now : now.current
                                        }
                                    }));
                                }
                                setRandomChampion(now.current,isTimeLimitedRef.current);
                            }
                        } else if (nowData.type === "root") {
                            rootId.current = nowData.id;
                            for(let conn of connectionList.values()) {
                                conn?.send(JSON.stringify({
                                    type: "root",
                                    message: {
                                        id : nowData.id
                                    }
                                }));
                            }
                        } else if (nowData.type === "changeBanPick") {
                            selectedChampion[nowData.now] = nowData.message;
                            for(let conn of connectionList.values()) {
                                conn?.send(JSON.stringify({
                                    type: "banPick",
                                    message: {
                                        now : nowData.now,
                                        selectedChampion: selectedChampion[nowData.now]
                                    }
                                }));
                            }
                        //Solo 모드
                        } else if(nowData.type ==="soloMode"){
                            redTeam.user = nowData.rootId;
                            redTeam.status = "ready";
                            redTeam.userName = nowData.userName;

                            blueTeam.user = nowData.rootId;
                            blueTeam.status = "ready";
                            blueTeam.userName = nowData.userName;
                            currentMode.current = "solo";                            
                            for(let conn of connectionList.values()) {
                                conn?.send(JSON.stringify({
                                    type: "soloMode",
                                    message: {
                                        blueTeam : blueTeam,
                                        redTeam : redTeam
                                    },
                                    mode: "solo"
                                }));
                            }                      
                        // 1:1 모드
                        } else if(nowData.type ==="1:1Mode"){
                            redTeam.user = "";
                            redTeam.status = "none";
                            redTeam.userName = "";

                            blueTeam.user = "";
                            blueTeam.status = "none";
                            blueTeam.userName = "";      
                            currentMode.current = "1:1";             
                            for(let conn of connectionList.values()) {
                                conn?.send(JSON.stringify({
                                    type: "1:1Mode",
                                    message: {
                                        blueTeam : blueTeam,
                                        redTeam : redTeam
                                    },
                                    mode: "1:1"
                                }));
                            }                               
                        }
                    });
                    conn.on('close', () => {
                        connectionList.delete(conn.peer);
                        if(!isEnd.current) {
                            if (redTeam.user === conn.peer) {
                                if (isStart.current) {
                                    alert("레드 팀원이 나갔습니다.");
                                    setTimeout(() => {
                                        router.push("/");
                                    }, 1000);
                                } else {
                                    redTeam.user = "";
                                    redTeam.status = "none";
                                    redTeam.userName = "";
                                    for (let conn of connectionList.values()) {
                                        conn?.send(JSON.stringify({
                                            type: "teamInfo",
                                            message: {
                                                red: redTeam,
                                                blue: blueTeam
                                            }
                                        }));
                                    }
                                }
                            } else if (blueTeam.user === conn.peer) {
                                if (isStart.current) {
                                    alert("블루 팀원이 나갔습니다.");
                                    setTimeout(() => {
                                        router.push("/");
                                    }, 1000);
                                } else {
                                    blueTeam.user = "";
                                    blueTeam.status = "none";
                                    blueTeam.userName = "";
                                    for (let conn of connectionList.values()) {
                                        conn?.send(JSON.stringify({
                                            type: "teamInfo",
                                            message: {
                                                red: redTeam,
                                                blue: blueTeam
                                            }
                                        }));
                                    }
                                }
                            } else {
                                for (let conn of connectionList.values()) {
                                    conn?.send(JSON.stringify({
                                        type: "connectionList",
                                        message: Array.from(connectionList.keys())
                                    }));
                                }
                            }
                        }
                    });

                });
            });
        } catch (e) {
            console.log(e);
        }
    }, []);

    return (
        <BanPickRoomWrapper>
            {
                myId != "" && <BanPickRoomParticipate rootId={myId} timeLimited={isTimeLimited} setTimeLimited={setIsTimeLimited} />
            }
        </BanPickRoomWrapper>
    );
}

export default BanPickRoom;

const BanPickRoomWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
`
