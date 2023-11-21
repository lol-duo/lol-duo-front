import {NextPage} from "next";
import styled from "@emotion/styled";
import {SearchBarProps} from "@/types/SearchBar";
import SearchBarPosition from "@/component/common/SearchBarPosition";
import colorList from "../../../style/colorList";

const SearchBar: NextPage<SearchBarProps> = (props) => {

    const {positionState, setPositionState} = props;

    return (
        <SearchBarWrapper>
            <SearchBarPosition positionState={positionState} setPositionState={setPositionState}/>
        </SearchBarWrapper>
    );
}

export default SearchBar;

const SearchBarWrapper = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 474px;
  height: 76px;
  background-color: ${colorList.semantic.card};
  border-radius: 100px;
  

`
