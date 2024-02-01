import { NextPage } from "next";
import styled from "@emotion/styled";
import colorList from "@styles/colorList";

const TitleBar: NextPage<{subject:string}> = (props) => {

    // 롤 벤픽 전략 시뮬레이터 Title
    const subject  = props.subject;
    
    return (
        <TitleBarWrapper>{subject}</TitleBarWrapper>
    )
}

export default TitleBar;

const TitleBarWrapper = styled.div`
        //size
        width: 100%;
        height: 100px;

        //font 
        font-weight: bold;
        font-size: 30px;
        color: ${colorList.grayscale["000"]};

        //align 
        display: flex;
        align-items: center;
        justify-content: center;

`
