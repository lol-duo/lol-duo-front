import {NextPage} from "next";
import styled from "@emotion/styled";
import colorList from "../../../style/colorList";
import fontList from "../../../style/fontList";
import {DuoMainInfoProps, MainChampionInfo} from "@/types/api";
import DonutChart from "@/component/duo/DonutChart";

const DuoMainBigCombiChampion: NextPage<{data: MainChampionInfo}> = (props) => {
    const {championImgUrl, championName, positionImgUrl, mainRuneImgUrl} = props.data;

    return (
        <DuoMainBigCombiChampionWrapper>
            <div className="championImg">
                <img src={mainRuneImgUrl} alt={mainRuneImgUrl} width={24} height={24}/>
                <div className="championImgLane">
                    <img className="champion" src={championImgUrl} alt={championImgUrl} width={64} height={64}/>
                    <img className="lane"  src={positionImgUrl} alt={positionImgUrl} width={24} height={24}/>
                </div>
            </div>
            <div className="championName">
                {championName}
            </div>
        </DuoMainBigCombiChampionWrapper>
    );
}


const DuoMainBigCombi: NextPage<{ data: DuoMainInfoProps, rankImg: string, donutColor: string }> = (props) => {

    return (
        <DuoMainBigCombiWrapper>
            <img src={props.rankImg} alt={props.rankImg} width={32} height={32}/>
            <div className="champion">
                <DuoMainBigCombiChampion data={props.data.champion1}/>
                <DonutChart color={props.donutColor} percent={props.data.winRate}/>
                <DuoMainBigCombiChampion data={props.data.champion2}/>
            </div>
        </DuoMainBigCombiWrapper>
    );
}

export default DuoMainBigCombi;

const DuoMainBigCombiWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 28px;
    width: 300px;
    height: 146px;
    
    .champion {
        display: flex;
        flex-direction: row;
        gap: 21px;
        align-items: center;
    }
`

const DuoMainBigCombiChampionWrapper = styled.div`
  position: relative;
    width: 99px;
    height: 86px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    .championImg {
        width: 100%;
        height: 72px;
        position: relative;
        display: flex;
        flex-direction: row;
        gap: 2px;
        justify-content: center;
        align-items: center;
        .championImgLane {
            position: relative;
            width: 73px;
            height: 70px;
            
            .champion {
                position: absolute;
                top: 0;
                left: 0;
                border-radius: 50%;
            }
            
            .lane {
                position: absolute;
                bottom: 0;
                right: 0;
            }
        }
    }
   
    
    .championName {
        color: ${colorList.grayscale["000"]};
        height: 14px;
        width: 87px;
        font-family: ${fontList.roboto.bold["12"].fontFamily};
        font-size: ${fontList.roboto.bold["12"].fontSize};
        font-weight: ${fontList.roboto.bold["12"].fontWeight};
        line-height: ${fontList.roboto.bold["12"].lineHeight};
        letter-spacing: ${fontList.roboto.bold["12"].letterSpacing};
        text-align: center;
    }
`
