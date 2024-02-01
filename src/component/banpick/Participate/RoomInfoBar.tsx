import { NextPage } from "next";
import styled from "@emotion/styled";
import fontList from "@styles/fontList";
import colorList from "@styles/colorList";



const RoomInfoBar: NextPage<{roomUrl:string,roomId:string}> = (props) => {

    const {roomUrl, roomId} = props;
    
    return (
        <RoomInfoBarWrapper>
            <div className="title">{roomUrl}</div>
            <div className="url">
                <div className="link">{`https://lolduo.net/banpick/room?id=${roomId}`}</div>
                <div className="copyButton" onClick={() => handleCopyClipBoard(`https://lolduo.net/banpick/room?id=${roomId}`)}>copy</div>
            </div>
        </RoomInfoBarWrapper>
    )
}

export default RoomInfoBar;

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

const RoomInfoBarWrapper = styled.div`
    //size
    width: 70%;
    height: 100%;
    min-height: 60px;

    //align
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    //etc
    background: rgba(47, 47, 47, 1);
    border-radius: 10px;

    .title {
        //size 
        width: 100%;

        //font
        font-family: ${fontList.roboto.regular["14"].fontFamily};
        font-size: ${fontList.roboto.regular["14"].fontSize};
        font-weight: ${fontList.roboto.regular["14"].fontWeight};
        line-height: ${fontList.roboto.regular["14"].lineHeight};
        letter-spacing: ${fontList.roboto.regular["14"].letterSpacing};
        color: ${colorList.grayscale["100"]};

        //align
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

    }
    
    .url {
        //size
        width: 90%;
        height: 50%;

        //font
        font-family: ${fontList.roboto.medium["16"].fontFamily};
        font-size: ${fontList.roboto.medium["16"].fontSize};
        font-weight: ${fontList.roboto.medium["16"].fontWeight};
        line-height: ${fontList.roboto.medium["16"].lineHeight};
        letter-spacing: ${fontList.roboto.medium["16"].letterSpacing};
        color: ${colorList.grayscale["000"]};

        //align
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;

        .link{
            text-overflow:ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
        
        .copyButton {
            //size
            width: 50px;
            height: 20px;

            //font 
            font-family: ${fontList.roboto.medium["16"].fontFamily};
            font-size: ${fontList.roboto.medium["16"].fontSize};
            font-weight: ${fontList.roboto.medium["16"].fontWeight};
            line-height: ${fontList.roboto.medium["16"].lineHeight};
            letter-spacing: ${fontList.roboto.medium["16"].letterSpacing};

            //align
            display: flex;
            justify-content: center;

            //etc
            border-radius: 10px;
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
        }
`
