import {NextPage} from "next";
import styled from "@emotion/styled";
import colorList from "../../../style/colorList";
import fontList from "../../../style/fontList";
import {useQuery} from "react-query";
import {soloMainInfo} from "@/api/main";
import {SearchBarProps} from "@/types/SearchBar";
import Image from "next/image";
import {imgURL} from "../../../style/img";
import I18n from "@/component/locale/i18n";
import SoloMainCombi from "@/component/solo/SoloMainCombi";

const SoloTable: NextPage<SearchBarProps> = (props) => {

    const positionState = props.positionState;
    const championState = props.championState;
    const setPositionState = props.setPositionState;
    const setChampionState = props.setChampionState;

    const getSoloRankInfo = async() => {
        return soloMainInfo({championState: championState, positionState: positionState, setPositionState: setPositionState, setChampionState: setChampionState});
    }

    const {data, isLoading} = useQuery(['solo',positionState,championState], getSoloRankInfo, {
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
        <SoloTableWrapper>
            <SoloTableHeaderWrapper>
                <div className="rank">
                    Rank
                </div>
                <div className="champion">
                    Champion
                </div>
                <div className="winRate">
                    Win Rate
                </div>
            </SoloTableHeaderWrapper>
            <SoloTableBodyWrapper>
                {
                    data && data.length > 0 && data.map((item, index) => {
                        return (
                            <SoloTableIndexWrapper key={index}>
                                <div className="rank">
                                    {
                                        item.rankNumber < 4 && <div className="rank top3">
                                            {item.rankNumber}
                                        </div>
                                    }{
                                        item.rankNumber >= 4 && <div className="rank">
                                        {item.rankNumber}
                                    </div>
                                    }
                                </div>
                                <div className="championIndex">
                                    <SoloMainCombi data={item}/>
                                </div>
                                <div className="winRate">
                                    {item.winRate}
                                </div>
                            </SoloTableIndexWrapper>
                        )})
                }
                {
                    isLoading && <Image src={imgURL.loading} alt={imgURL.loading} width={50} height={50} className={"loading"}/>
                }
                {
                    data && data.length < 1 && <div className="noInfo">{noData}</div>
                }
            </SoloTableBodyWrapper>
        </SoloTableWrapper>
    );
}

export default SoloTable;

const SoloTableIndexWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 54px;
    background-color: ${colorList.semantic.card};
    
    &:hover {
        background-color: ${colorList.semantic.hover};
    }
    
    .rank {
        width: 22%;
        margin-left: 20px;
        color: ${colorList.grayscale["000"]};
        font-family: ${fontList.roboto.regular["12"].fontFamily};
        font-size: ${fontList.roboto.regular["12"].fontSize};
        font-weight: ${fontList.roboto.regular["12"].fontWeight};
        line-height: ${fontList.roboto.regular["12"].lineHeight};
        letter-spacing: ${fontList.roboto.regular["12"].letterSpacing};
    }
    
    .top3 {
        color: ${colorList.secondary.beige};
    }
    
    .winRate {
        width: 28%;
        color: ${colorList.grayscale["000"]};
        font-family: ${fontList.roboto.regular["12"].fontFamily};
        font-size: ${fontList.roboto.regular["12"].fontSize};
        font-weight: ${fontList.roboto.regular["12"].fontWeight};
        line-height: ${fontList.roboto.regular["12"].lineHeight};
        letter-spacing: ${fontList.roboto.regular["12"].letterSpacing};
    }
    
    .championIndex {
        width: 50%;
    }
`

const SoloTableBodyWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 4px;
    align-items: center;
    
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
`

const SoloTableWrapper = styled.div`
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

const SoloTableHeaderWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 32px;      

    display: flex;
    flex-direction: row;
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
    
    .rank {
        width: 22%;
        margin-left: 20px;
    }
    
    .champion {
        width: 50%;
    }
    
    .winRate {
        width: 28%;
    }

`