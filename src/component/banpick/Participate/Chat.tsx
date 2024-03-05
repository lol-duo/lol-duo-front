import { NextPage } from "next";
import styled from "@emotion/styled";
import colorList from "@styles/colorList";
import {Chat} from "@/types/banPick";
import { useEffect } from "react";

const Chat: NextPage<{isMainList:boolean,isStart:boolean,chatList:Chat[],setChat:Function,sendChat:Function,setChatList:Function,chat:string,myUserId:string,redTeam:any,blueTeam:any,myId:any}> = (props) => {
    
    const {isMainList,isStart,chatList,setChat,sendChat,setChatList,chat,myUserId,redTeam,blueTeam,myId} = props;

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
        <ChatWrapper className = {isMainList ?"start3": isStart? "test":"test2"} >
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
                    }}
            />
        </ChatWrapper>
    )
}

export default Chat;
const ChatWrapper =styled.div`
&.test{
    display: none;
    z-index: 1;

    @media screen and (max-width: 1100px) {
        width: 30%;
        height: 100%;
        
        display: flex;
        flex-direction: column;
        align-items: center;

        margin-top: 20px;
        margin-left: 20px;
    } 
}

&.test2{
    width: 20%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    margin-left: 30px;
}

&.start3{
    width: 80%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    margin-top: 20px;
    
    @media screen and (max-width: 1100px) {
        display: none;

    }
}

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
`
