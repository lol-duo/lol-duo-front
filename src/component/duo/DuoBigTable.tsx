import {NextPage} from "next";
import styled from "@emotion/styled";
import colorList from "../../../style/colorList";
import {DuoMainInfoProps} from "@/types/api";
import DuoMainBigCombi from "@/component/duo/DuoMainBigCombi";
import {imgURL} from "../../../style/img";
import DuoSmallIndex from "@/component/duo/DuoSmallIndex";


const DuoBigTable: NextPage<{data: [DuoMainInfoProps]}> = (props) => {


    const secondAndThirdCombiList = props.data.slice(1, 3);
    const otherCombiList = props.data.slice(3, props.data.length);

    return (
        <DuoBigTableWrapper>
            <div className="firstCombi">
                <DuoMainBigCombi data={props.data[0]} rankImg={imgURL.firstRank} donutColor={colorList.chart.first}/>
            </div>
            <div className="secondAndThirdCombi">
                <div className="combi">
                    <DuoMainBigCombi data={secondAndThirdCombiList[0]} rankImg={imgURL.secondRank} donutColor={colorList.chart.second}/>
                </div>
                <div className="combi">
                    <DuoMainBigCombi data={secondAndThirdCombiList[1]} rankImg={imgURL.thirdRank} donutColor={colorList.chart.third}/>
                </div>
            </div>
            {
                otherCombiList.map((combi, idx) => {
                    return (
                        <DuoSmallIndex data={combi} idx={idx} key={idx}/>
                    )
                })
            }
        </DuoBigTableWrapper>
    );

}

export default DuoBigTable;

const DuoBigTableWrapper = styled.div`
  position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    width: 100%;
    
    .firstCombi {
        width: 100%;
        height: 210px;
        background-color: ${colorList.semantic.card};
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
            background-color: ${colorList.semantic.hover};
        }
    }
    
    .secondAndThirdCombi {
        width: 100%;
        height: 210px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 4px;


        @media screen and (max-width: 676px) {
            width: 100%;
            height: 420px;
            flex-direction: column;
        }
        
        .combi {
            width: 100%;
            height: 210px;
            background-color: ${colorList.semantic.card};
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            &:hover {
                background-color: ${colorList.semantic.hover};
            }
        }        
        
    }
`
