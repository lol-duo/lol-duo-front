import {NextPage} from "next";
import styled from "@emotion/styled";
import {ChampionInfo, SearchBarChampionProps} from "@/types/SearchBar";
import colorList from "../../../style/colorList";
import {Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger} from "@nextui-org/react";
import React, {useState} from "react";
import I18n from "@/component/locale/i18n";
import SearchBarText from "@/component/common/SearchBarText";
import Image from "next/image";
import {imgURL} from "../../../style/img";

const SearchBarChampion: NextPage<SearchBarChampionProps> = (props) => {


    const {championState, setChampionState} = props;

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [userSearchState, setUserSearchState] = useState<string>("");

    const championList = I18n('champion.ts').value as Array<ChampionInfo>;
    const language = I18n('common.json').language;

    let {id, name, imgUrl} = championState;

    if (id === 0 && language === "ko") name = "전체";
    else if (id === 0) name = "All";

    const setIsOpenTrue = () => setIsOpen(!isOpen);
    const glassImg = imgURL.searchGlass;

    return (
        <Dropdown onOpenChange={setIsOpenTrue}>
            <DropdownTrigger>
                <SearchBarChampionWrapper>
                    <div className="championCircle">
                        <Image className="championImg" src={imgUrl} width={44} height={44} alt={imgUrl}/>
                    </div>
                    {<SearchBarText text="Champion" isOpen={isOpen} selectedName={name}/>}
                </SearchBarChampionWrapper>
            </DropdownTrigger>
            <DropdownMenu aria-label="DuoDropDownMenu">
                {/*<ChampionSearchWrapper>*/}
                {/*    <input type="text" value={userSearchState}*/}
                {/*           onChange={(e) => setUserSearchState(e.target.value)}/>*/}
                {/*    <Image src={glassImg} alt={glassImg} width={16} height={16}/>*/}
                {/*</ChampionSearchWrapper>*/}
                <DropdownSection title="Actions" style={{listStyle: 'none', outline: 'none'}}>

                    <DropdownItem aria-label="DuoDropDownItem" style={{listStyle: 'none', outline: 'none'}}>
                        <div>test</div>
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    );
}

export default SearchBarChampion;

const ChampionSearchWrapper = styled.div`
  width: 244px;
  height: 253px;
  background-color: ${colorList.semantic.card};
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

    &:hover {
      border: 1px solid ${colorList.grayscale["300"]};
    }

    .championImg {
      position: relative;
    }
  }
`
