import {NextPage} from "next";
import styled from "@emotion/styled";
import {SearchBarChampionProps} from "@/types/SearchBar";
import colorList from "../../../style/colorList";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import React, {useState} from "react";
import I18n from "@/component/locale/i18n";
import SearchBarText from "@/component/common/SearchBarText";
import Image from "next/image";

const SearchBarChampion: NextPage<SearchBarChampionProps> = (props) => {


    const {championState, setChampionState} = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const championList = I18n('champion.ts');

    const {id, name, imgUrl} = championState;

    const setIsOpenTrue = () => setIsOpen(!isOpen);

    console.log(imgUrl);

    return (
        <Dropdown onOpenChange={setIsOpenTrue}>
            <DropdownTrigger>
                <SearchBarChampionWrapper>
                    <div className="championCircle">
                        <Image className="positionImg" src={imgUrl} width={24} height={24} alt={imgUrl}/>
                    </div>
                    {<SearchBarText text="Position" isOpen={isOpen} selectedName={name}/>}
                </SearchBarChampionWrapper>
            </DropdownTrigger>
            <DropdownMenu aria-label="DuoDropDownMenu">
                <DropdownItem aria-label="DuoDropDownItem" style={{listStyle: 'none'}}>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

export default SearchBarChampion;

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

    .positionImg {
      position: relative;
    }
  }
`
