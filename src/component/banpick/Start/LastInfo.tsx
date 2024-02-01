import { NextPage } from "next";
import styled from "@emotion/styled";

const LastInfo: NextPage<{text:any}> = (props) => {

    const text  = props.text;

    return (
        <LastInfoWrapper>
            {(text.lastInfoList as any[]).map(item => (
                <div key={item.index}>{item.info}</div>
            ))}
        </LastInfoWrapper>
    )
}

export default LastInfo;

const LastInfoWrapper = styled.div`
height: 500px;
display: flex;
justify-content: center;
align-items: center;
font-size: 50px;
font-weight: bold;
color: rgba(255, 255, 255, 0.7);
white-space: pre-line;
flex-direction: column;
`
