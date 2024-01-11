import {NextPage} from "next";
import styled from "@emotion/styled";
import {ChampionInfo, SearchBarChampionProps} from "@/types/SearchBar";
import colorList from "../../../style/colorList";
import React, {useState} from "react";
import I18n from "@/component/locale/i18n";
import SearchBarText from "@/component/common/SearchBarText";
import Image from "next/image";
import {imgURL} from "../../../style/img";
import {Popover, PopoverContent, PopoverTrigger} from "@nextui-org/popover";

const SearchBarChampion: NextPage<SearchBarChampionProps> = (props) => {


    const {championState, setChampionState} = props;

    const [userSearchState, setUserSearchState] = useState<string>("");
    const [isOpen, setIsOpen] = useState(false);

    const championList = I18n('champion.ts').value as Array<ChampionInfo>;
    const language = I18n('common.json').language;

    let {id, name, imgUrl} = championState;

    if (id === 0 && language === "ko") name = "전체";
    else if (id === 0) name = "All";

    const glassImg = imgURL.searchGlass;

    return (
        <Popover placement={"bottom-start"} isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)} >
            <PopoverTrigger>
                <SearchBarChampionWrapper >
                    <div className="championCircle">
                        <Image className="championImg" src={imgUrl} width={44} height={44} alt={imgUrl}/>
                    </div>
                    {<SearchBarText text="Champion" isOpen={isOpen} selectedName={name}/>}
                </SearchBarChampionWrapper>
            </PopoverTrigger>
            <PopoverContent >
                <ChampionSearchWrapper style={{position: "relative", top:"15px"}}>
                    <input className="championNameInput" type="text" value={userSearchState}
                           onChange={(e) => setUserSearchState(e.target.value)}/>
                    <Image className="glassIcon" src={glassImg} alt={glassImg} width={16} height={16}/>
                    <div className="championList">{
                        championList.filter((champion) => {
                            if (language === "ko") return champion.name.includes(userSearchState);
                            else return champion.name.includes(userSearchState);
                        }).map((champion) => {
                            return (
                                <div className="champion" key={champion.id}
                                     onClick={() => {
                                         setChampionState(champion);
                                         setIsOpen(false);
                                     }}>
                                    <Image className="championImg" src={champion.imgUrl} width={36} height={36}
                                           alt={champion.imgUrl}/>
                                </div>
                            )
                        })
                    }</div>
                </ChampionSearchWrapper>
            </PopoverContent>
        </Popover>
    );
}

export default SearchBarChampion;

const ChampionSearchWrapper = styled.div`
  width: 244px;
  height: 253px;
  background-color: ${colorList.semantic.card};
    border-radius: 10px;
    
    .championNameInput {
        position: relative;
        background-color: ${colorList.semantic.card};
        border: none;
        border-bottom: 1px solid ${colorList.grayscale["100"]};
        outline: none;
        color: ${colorList.grayscale["100"]};
        left: 16px;
        top: 8px;
        width: 213px;
        
    }
    .glassIcon {
        position: relative;
        top: 8px;
    }
    .championList {
        position: relative;
        top: 15px;
        left: 16px;
        width: 222px;
        height: 216px;
        overflow: auto;
        display: grid;
        gap: 4px;
        grid-template-columns: repeat(5, 41px);
        grid-template-rows: repeat(5, 36px);
        grid-column-gap: 0;
        
        ::-webkit-scrollbar {
            width: 10px; /* 스크롤바의 width */
        }

        ::-webkit-scrollbar-corner {
            background-color: ${colorList.semantic.card}; /* 스크롤바 교차 지점의 배경색 지정 */
        }

        ::-webkit-scrollbar-track {
            background-color: ${colorList.semantic.card}; /* 스크롤바의 track 배경색 지정 */
        }

        ::-webkit-scrollbar-thumb {
            background-color: ${colorList.semantic.hover}; /* 스크롤바의 thumb 배경색 지정 */
            border-radius: 100px; /* 스크롤바 thumb의 모서리 둥글게 지정 */
        }
        
        .champion {
            position: relative;
            width: 36px;
            height: 36px;
        }
        
        .championImg {
            position: relative;
            border: 2px solid ${colorList.semantic.card};
            &:hover {
                border: 2px solid ${colorList.alpha.gray000_70};
            }
        }
    }
`

const SearchBarChampionWrapper = styled.div`
  width: 134px;
  height: 44px;
  position: relative;
  display: flex;
  gap: 12px;


  .championCircle {
    box-sizing: border-box;
    width: 44px;
    height: 44px;
    background-color: ${colorList.grayscale["400"]};
    border-radius: 50%;

    //centering
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .championImg {
      position: relative;
        border-radius: 50%;
        border: 1px dashed ${colorList.secondary.beige};
    }
  }
`
