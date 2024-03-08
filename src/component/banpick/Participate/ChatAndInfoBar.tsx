import { NextPage } from "next";
import styled from "@emotion/styled";
import Chat from "@/component/banpick/Participate/Chat";
import GameInfo from "@/component/banpick/Participate/GameInfo";

const ChatAndInfoBar: NextPage<{isStart:boolean, text:any,roomId:any,roomUrl:string,myUserId:string,chatList:Chat[],setChat:Function,sendChat:Function,setChatList:Function,chat:string,redTeam:any,blueTeam:any,myId:any }> = (props) => {

    const {isStart, text, roomId, roomUrl, myUserId, chatList, setChat, sendChat, setChatList, chat, redTeam, blueTeam, myId} = props;

    return (
        <ChatAndInfoBarWrapper>
            <div className ="chatWrapper">
            {!isStart && <Chat isMainList={false} isStart={isStart} myId={myId} myUserId= {myUserId} blueTeam={blueTeam} redTeam={redTeam} chat={chat} setChat={setChat} setChatList={setChatList} sendChat={sendChat} chatList={chatList}/>}
            </div>
                        <GameInfo isStart={isStart} text={text} roomId={roomId} roomUrl={roomUrl} myUserId={myUserId}/>
        </ChatAndInfoBarWrapper>
    )
}

export default ChatAndInfoBar;

const ChatAndInfoBarWrapper = styled.div`
    //size
    width: 100%;
    height: 100%;
    
    //align
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content:center;
    gap:20px;
    
    margin-top: 40px;

    .chatWrapper{
        width: 30%;
    }
`
