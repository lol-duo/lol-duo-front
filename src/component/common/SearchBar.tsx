import {NextPage} from "next";
import styled from "@emotion/styled";
import {SearchBarProps} from "@/types/SearchBar";
import SearchBarPosition from "@/component/common/SearchBarPosition";
import colorList from "../../../style/colorList";
import SearchBarChampion from "@/component/common/SearchBarChampion";

const SearchBar: NextPage<SearchBarProps> = (props) => {

    const {positionState, setPositionState, championState, setChampionState} = props;

    return (
        <SearchBarWrapper>
            <SearchBarPosition positionState={positionState} setPositionState={setPositionState}/>
            <div className="Bar"/>
            <SearchBarChampion championState={championState} setChampionState={setChampionState}/>
        </SearchBarWrapper>
    );
}

export default SearchBar;

const SearchBarWrapper = styled.div`
  position: relative;
  width: 474px;
  height: 76px;
  background-color: ${colorList.semantic.card};
  border-radius: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;

    
  .Bar {
    border: 1px solid ${colorList.grayscale["300"]};
    width: 0;
    height: 36px;
  }
    
    @media screen and (max-width: 480px) {
        width: 90vw;
    }
`
