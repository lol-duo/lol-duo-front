import { NextPage } from "next";
import styled from "@emotion/styled";
import colorList from "@styles/colorList";

const Title: NextPage<{subject:string}> = (props) => {

    // 롤 벤픽 전략 시뮬레이터 Title
    const subject  = props.subject;
    
    return (
        <TitleWrapper>{subject}</TitleWrapper>
    )
}

export default Title;

const TitleWrapper = styled.div`
    font-size: 30px;
    font-weight: bold;
    color: ${colorList.grayscale["000"]};
    height: 100%;
    
    @media screen and (max-width: 1100px) {
        font-size: 25px;
    }
    
    @media screen and (max-width: 800px) {
        display: none;
    }

`
