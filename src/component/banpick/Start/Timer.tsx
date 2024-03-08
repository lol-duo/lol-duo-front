import { NextPage } from "next";
import styled from "@emotion/styled";
import colorList from "@styles/colorList";

const Timer: NextPage<{time: number|string}> = (props) => {

    const time = props.time;
    
    return (
        <TimerWrapper>{time}</TimerWrapper>
    )
}

export default Timer;

const TimerWrapper = styled.div`
    font-size: 30px;
    font-weight: bold;
    color: ${colorList.grayscale["000"]};
    color: ${colorList.secondary.beige};
    
    @media screen and (max-width: 800px) {
        font-size: 20px;
    }
`
