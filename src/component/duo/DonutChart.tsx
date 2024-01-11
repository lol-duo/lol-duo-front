import styled from "@emotion/styled";
import colorList from "../../../style/colorList";
import {keyframes} from "@emotion/react";
import fontList from "../../../style/fontList";
import {NextPage} from "next";

const DonutChart: NextPage<{color: string, percent: string}> = (props) => {
    const {color, percent} = props;
    let intPercent = parseFloat(percent) / 100;
    return (
        <Chart>
            <AniSvg viewBox="0 0 200 200">
                <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="#ebebeb"
                    strokeWidth="12.6"
                />
                <AnimatedCircle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke={color}
                    strokeWidth="12.8"
                    strokeDasharray={`${2 * Math.PI * 90 * intPercent} ${
                        2 * Math.PI * 90 * (1 - intPercent)
                    }`}
                    strokeDashoffset={2 * Math.PI * 90 * 0.25}
                />
            </AniSvg>
            <Percent color={color}>{Math.round(intPercent * 10000) / 100}%</Percent>
        </Chart>
    );
}

export default DonutChart;

const Chart = styled.div`
  width: 60px;
  height: 60px;
  position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const AniSvg = styled.svg`
  position: absolute;
  background-color: ${colorList.grayscale["400"]};
  border: 3px solid ${colorList.grayscale["400"]};
  border-radius: 50%;
`;

const circleFill = keyframes`
  0% {
    stroke-dasharray: 0 ${2 * Math.PI * 90};
  }
`;

const AnimatedCircle = styled.circle`
  animation: ${circleFill} 1s ease;
`;

const Percent = styled.span`
  position: relative;
  color: ${colorList.grayscale["000"]};
    font-family: ${fontList.roboto.bold["12"].fontFamily};
  font-size: ${fontList.roboto.bold["12"].fontSize};
  font-weight: ${fontList.roboto.bold["12"].fontWeight};
  line-height: ${fontList.roboto.bold["12"].lineHeight};
  letter-spacing: ${fontList.roboto.bold["12"].letterSpacing};
`;