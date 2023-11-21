import {NextPage} from "next";
import styled from "@emotion/styled";
import {SearchBarPositionProps} from "@/types/SearchBar";
import colorList from "../../../style/colorList";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import SearchBarPositionDropDown from "@/component/common/SearchBarPositionDropDown";
import {imgURL} from "../../../style/img";

const SearchBarPosition: NextPage<SearchBarPositionProps> = (props) => {

    const {positionState, setPositionState} = props;

    return (
        <Dropdown>
            <DropdownTrigger>
                <SearchBarPositionWrapper>
                    <div className="positionCircle">
                        <img className="positionImg" src={imgURL.laneImg[positionState]}
                             alt={imgURL.laneImg[positionState]}/>
                    </div>
                </SearchBarPositionWrapper>
            </DropdownTrigger>
            <DropdownMenu aria-label="DuoDropDownMenu">
                <DropdownItem aria-label="DuoDropDownItem">
                    <SearchBarPositionDropDown positionState={positionState} setPositionState={setPositionState}/>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

export default SearchBarPosition;

const SearchBarPositionWrapper = styled.div`
  top: 16px;
  left: 32px;
  width: 134px;
  height: 44px;
  position: relative;

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
      width: 24px;
      height: 24px;
    }
  }
`
