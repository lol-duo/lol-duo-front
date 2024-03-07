import {NextPage} from "next";
import styled from "@emotion/styled";
import colorList from "../../../style/colorList";
import fontList from "../../../style/fontList";
import Image from "next/image";
import {MainChampionInfo} from "@/types/api";


const DuoMainSmallCombi: NextPage<{data: MainChampionInfo}> = (props) => {

    const {championImgUrl, championName, positionImgUrl, mainRuneImgUrl} = props.data;

    return (
        <MainSmallCombiWrapper>
            <div className="championImg">
                <Image src={mainRuneImgUrl} alt={mainRuneImgUrl} width={20} height={20}/>
                <div className="championImgLane">
                    <Image className="champion" src={`${championImgUrl}`} alt={championImgUrl} width={40} height={40}/>
                    <Image className="lane"  src={positionImgUrl} alt={positionImgUrl} width={20} height={20}/>
                </div>
            </div>
            <div className="championName">
                {championName}
            </div>
        </MainSmallCombiWrapper>
    );
}

export default DuoMainSmallCombi;

const MainSmallCombiWrapper = styled.div`
  position: relative;
    width: 87px;
    height: 62px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    .championImg {
        width: 70px;
        height: 46px;
        position: relative;
        display: flex;
        flex-direction: row;
        gap: 2px;
        justify-content: center;
        align-items: center;
        .championImgLane {
            position: relative;
            width: 48px;
            height: 46px;
            
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
