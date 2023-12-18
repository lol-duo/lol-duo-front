import {NextPage} from "next";
import styled from "@emotion/styled";
import {DuoSearchBarProps} from "@/types/SearchBar";
import SearchBar from "@/component/common/SearchBar";

const DuoSearchBar: NextPage<DuoSearchBarProps> = (props) => {

    const {firstProps, secondProps} = props;

    return (
        <DuoSearchBarWrapper>
            <SearchBar positionState={firstProps.positionState} setPositionState={firstProps.setPositionState}
                       championState={firstProps.championState} setChampionState={secondProps.setChampionState}/>
            <SearchBar positionState={secondProps.positionState} setPositionState={secondProps.setPositionState}
                       championState={secondProps.championState} setChampionState={secondProps.setChampionState}/>
        </DuoSearchBarWrapper>
    );
}

export default DuoSearchBar;

const DuoSearchBarWrapper = styled.div`
  width: 960px;
  top: 76px;
  gap: 12px;
  display: flex;
  flex-direction: row;
  position: relative;
`
