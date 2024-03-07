import {NextPage} from "next";
import {DuoMainInfoProps} from "@/types/api";
import DuoMainSmallCombi from "@/component/duo/DuoMainSmallCombi";
import {imgURL} from "@styles/img";
import styled from "@emotion/styled";
import colorList from "../../../style/colorList";
import fontList from "../../../style/fontList";

const DuoSmallIndex: NextPage<{data: DuoMainInfoProps, idx: number}> = (props) => {
    const {data, idx} = props;
    return (
        <DuoSmallIndexWrapper>
            <div className="otherCombi" key={idx}>
                <div className="rank">
                    <div className="rankText">
                        {data.rankNumber}
                    </div>
                </div>
                <div className="combi">
                    <DuoMainSmallCombi data={data.champion1}/>
                    <div className="winRate">
                        <img src={imgURL.listImg} alt={imgURL.listImg} width={20} height={1}/>
                        <div className="winRateText">
                            {data.winRate}
                        </div>
                        <img src={imgURL.listImg} alt={imgURL.listImg} width={20} height={1}/>
                    </div>
                    <DuoMainSmallCombi data={data.champion2}/>
                </div>
                <div className="rank"/>
            </div>
        </DuoSmallIndexWrapper>
    )
}

export default DuoSmallIndex;


const DuoSmallIndexWrapper = styled.div`
    width: 100%;
    .otherCombi {
        width: 100%;
        height: 76px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        
        background-color: ${colorList.semantic.card};
        
        &:hover {
            background-color: ${colorList.semantic.hover};
        }
        
        .rank {
            width: 88px;
            height: 68px;
            font-family: ${fontList.roboto.regular["12"].fontFamily};
            font-size: ${fontList.roboto.regular["12"].fontSize};
            font-weight: ${fontList.roboto.regular["12"].fontWeight};
            line-height: ${fontList.roboto.regular["12"].lineHeight};
            letter-spacing: ${fontList.roboto.regular["12"].letterSpacing};
            color: ${colorList.grayscale["050"]};
            display: flex;
            align-items: center;
            .rankText {
                margin-left: 12px;
            }
        }
        
        .combi {
            width: 302px;
            height: 62px;
            display: flex;
            flex-direction: row;
            gap: 8px;
            
            .winRate {
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 4px;
                
                .winRateText {
                    width: 64px;
                    height: 14px;
                    font-family: ${fontList.roboto.regular["12"].fontFamily};
                    font-size: ${fontList.roboto.regular["12"].fontSize};
                    font-weight: ${fontList.roboto.regular["12"].fontWeight};
                    line-height: ${fontList.roboto.regular["12"].lineHeight};
                    letter-spacing: ${fontList.roboto.regular["12"].letterSpacing};
                    color: ${colorList.grayscale["000"]};                    
                    text-align: center;
                }
            }
        }
    }
`
