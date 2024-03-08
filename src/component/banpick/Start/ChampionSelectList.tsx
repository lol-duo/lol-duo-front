import {NextPage} from "next";
import styled from "@emotion/styled";
import colorList from "@styles/colorList";

const ChampionSelectList: NextPage<{
    now:number,
    championList:
        [{id: number, 
            en_name: string, 
            name_id: string, 
            image: string, 
            ko_name: string, 
            positionList: string[]
        }],
    blueTurn:any,
    locale:string,
    sendMsg: (message: any) => void,
    me: string,
    setChampionSelect:Function,
    selectedChampion: {
        img: string,
        en_name: string,
        ko_name: string,
        name_id: string,
    }[],
    search: string,
    lane:string,
    }> = (props) => {

    const {championList, search, lane, selectedChampion, setChampionSelect, sendMsg, me, blueTurn, now, locale} = props;

    if(now<20){
        return (
            <ChampionSelectListWrapper>
                {
                    championList && championList.map((item) => {
                        if(item.id === 0) return null;
                        if (!item.en_name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) && !item.ko_name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                            return null;
                        }
                        if (lane !== "ALL" && !item.positionList.includes(lane)) {
                            return null;
                        }
                        if (selectedChampion.find((value) => value.en_name === item.en_name)) {
                            return <img className="img none" src={`https://d3b83p9ttz58gf.cloudfront.net/champion/${item.image}`} alt={item.name_id}
                                            width={50} height={50} key={locale == "ko" ? item.ko_name : item.en_name}/>
                        }
                        return (
                            <img onClick={() => {
                                if ((me === "red" && !blueTurn.includes(now)) || (me === "blue" && blueTurn.includes(now))) {
                                    setChampionSelect(true);
                                    sendMsg({type: "banPick", message: {img: item.name_id, en_name: item.en_name, ko_name: item.ko_name, name_id: item.name_id}});
                                } else{
                                    return;
                                }
                            }} className="img" src={`https://d3b83p9ttz58gf.cloudfront.net/champion/${item.image}`} alt={item.name_id} width={50} height={50}
                                    key={locale == "ko" ? item.ko_name : item.en_name}/>
                        )
                    }).sort((a, b) => {
                        if(a?.key && b?.key){
                            const aKey = a?.key as string;
                            const bKey = b?.key as string;
                            return aKey.localeCompare(bKey);
                        }
                        return 1;
                    })
                }            
            </ChampionSelectListWrapper>
        )
    }
}

export default ChampionSelectList;

const ChampionSelectListWrapper = styled.div`
    width: 100%;
    height: 250px;
    min-width: 250px;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0);
    display: grid;                     
    grid-template-columns: repeat(auto-fill, minmax(50px, 1fr)); /* 정사각형의 크기를 유지하면서 가능한 많은 열을 채움 */
    grid-auto-rows: 50px;
    align-items: flex-start;
    box-sizing: content-box;

    ::-webkit-scrollbar {
        width: 10px; /* 스크롤바의 width */
        background-color: rgba(0, 0, 0, 0); /* 스크롤바의 배경색 지정 */
    }

    ::-webkit-scrollbar-corner {
        background-color: ${colorList.semantic.card}; /* 스크롤바 교차 지점의 배경색 지정 */
    }

    ::-webkit-scrollbar-track {
        background-color: rgba(33, 33, 33, 0.5); /* 스크롤바의 track 배경색 지정 */
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${colorList.semantic.hover}; /* 스크롤바의 thumb 배경색 지정 */
        border-radius: 100px; /* 스크롤바 thumb의 모서리 둥글게 지정 */
    }

    .img {
        cursor: pointer;
        position: relative;
        height: 100%;
        box-sizing: border-box;
        border: 2px solid rgba(0, 0, 0, 0);
        &:hover {
            border: 2px solid ${colorList.secondary.beige};
        }
    }
    
    .none {
        position: relative;
        height: 100%;
        filter: grayscale(100%);
        box-sizing: border-box;
        cursor: not-allowed;
        border: 2px solid rgba(0, 0, 0, 0);
        &:hover {
            border: 2px solid rgba(0, 0, 0, 0);
        }
    }
`
