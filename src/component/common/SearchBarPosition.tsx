import {NextPage} from "next";
import styled from "@emotion/styled";
import {SearchBarPositionProps} from "@/types/SearchBar";
import colorList from "../../../style/colorList";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import SearchBarPositionDropDown from "@/component/common/SearchBarPositionDropDown";
import {imgURL} from "../../../style/img";
import SearchBarText from "@/component/common/SearchBarText";
import {useState} from "react";
import Image from "next/image";
import I18n from "@/component/locale/i18n";

const SearchBarPosition: NextPage<SearchBarPositionProps> = (props) => {

    const {positionState, setPositionState} = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const setIsOpenTrue = () => setIsOpen(!isOpen);

    const positionName = I18n('common.json').value.lane;

    return (
        <Dropdown onOpenChange={setIsOpenTrue}>
            <DropdownTrigger>
                <SearchBarPositionWrapper>
                    <div className="positionCircle">
                        <Image className="positionImg" src={imgURL.laneImg[positionState]} width={24} height={24}
                               alt={imgURL.laneImg[positionState]}/>
                    </div>
                    {<SearchBarText text="Position" isOpen={isOpen} selectedName={positionName[positionState]}/>}
                </SearchBarPositionWrapper>
            </DropdownTrigger>
            <DropdownMenu aria-label="DuoDropDownMenu">
                <DropdownItem aria-label="DuoDropDownItem" style={{listStyle: 'none', outline: 'none'}}>
                    <SearchBarPositionDropDown positionState={positionState} setPositionState={setPositionState}/>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

export default SearchBarPosition;

const SearchBarPositionWrapper = styled.div`
  width: 134px;
  height: 44px;
  position: relative;
  display: flex;
  gap: 12px;


  .positionCircle {
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
