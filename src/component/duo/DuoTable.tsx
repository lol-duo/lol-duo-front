import {NextPage} from "next";
import styled from "@emotion/styled";
import colorList from "../../../style/colorList";
import fontList from "../../../style/fontList";
import DuoBigTable from "@/component/duo/DuoBigTable";
import {useQuery} from "react-query";
import {duoMainInfo} from "@/api/main";
import {DuoSearchBarProps} from "@/types/SearchBar";
import Image from "next/image";
import {imgURL} from "../../../style/img";
import DuoSmallTable from "@/component/duo/DuoSmallTable";
import I18n from "@/component/locale/i18n";

const DuoTable: NextPage<DuoSearchBarProps> = (props) => {

    const firstPosition = props.firstProps.positionState;
    const secondPosition = props.secondProps.positionState;
    const firstChampion = props.firstProps.championState;
    const secondChampion = props.secondProps.championState;

    const getDuoRankInfo = async() => {
        return duoMainInfo({champion1: firstChampion, champion1Position: firstPosition, champion2: secondChampion, champion2Position: secondPosition});
    }

    const {data, isLoading} = useQuery(['duo',firstPosition,firstChampion,secondPosition,secondChampion], getDuoRankInfo, {
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 1000 * 60 * 60,
        cacheTime: 1000 * 60 * 60,
        onError: (error) => {
            console.log(error);
        },
    });

    const noData = I18n('common.json').value.noData;

    return (
        <DuoTableWrapper>
            <DuoTableHeaderWrapper>
                Rank
            </DuoTableHeaderWrapper>
            <DuoTableBodyWrapper>
                {
                    isLoading && <Image src={imgURL.loading} alt={imgURL.loading} width={50} height={50} className={"loading"}/>
                }
                {
                    data && data.length > 3 && <DuoBigTable data={data}/>
                }
                {
                    data && data.length <= 3 && <DuoSmallTable data={data}/>
                }
                {
                    data && data.length <= 0 && <div className="noInfo">{noData}</div>
                }
            </DuoTableBodyWrapper>
        </DuoTableWrapper>
    );
}

export default DuoTable;

const DuoTableWrapper = styled.div`
    position: relative;
    width: 676px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    @media screen and (max-width: 676px) {
        width: 90vw;
    }

`

const DuoTableHeaderWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 32px;
      
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 4px 4px 0 0;
    color: ${colorList.grayscale["000"]};
    font-family: ${fontList.roboto.regular["12"].fontFamily};
    font-size: ${fontList.roboto.regular["12"].fontSize};
    font-weight: ${fontList.roboto.regular["12"].fontWeight};
    line-height: ${fontList.roboto.regular["12"].lineHeight};
    letter-spacing: ${fontList.roboto.regular["12"].letterSpacing};
    background: ${colorList.semantic.card};
    margin-top: 24px;    

`

const DuoTableBodyWrapper = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4px;
    margin-top: 4px;
    
    .noInfo {
        margin-top: 100px;
        font-family: ${fontList.roboto.regular["14"].fontFamily};
        font-size: ${fontList.roboto.regular["14"].fontSize};
        font-weight: ${fontList.roboto.regular["14"].fontWeight};
        line-height: ${fontList.roboto.regular["14"].lineHeight};
        letter-spacing: ${fontList.roboto.regular["14"].letterSpacing};
        color: ${colorList.grayscale["050"]};
    }
    
    .loading {
        margin-top: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        
        // 투명도
        opacity: 0.5;
    }
    
    .combiInfo {
        width: 100%;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: ${colorList.semantic.card};
    }
`