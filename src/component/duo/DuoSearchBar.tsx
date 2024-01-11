import {NextPage} from "next";
import styled from "@emotion/styled";
import {DuoSearchBarProps} from "@/types/SearchBar";
import SearchBar from "@/component/common/SearchBar";

const DuoSearchBar: NextPage<DuoSearchBarProps> = (props) => {

    const {firstProps, secondProps} = props;

    return (
        <DuoSearchBarWrapper>
            <SearchBar positionState={firstProps.positionState} setPositionState={firstProps.setPositionState}
                       championState={firstProps.championState} setChampionState={firstProps.setChampionState}/>
            <SearchBar positionState={secondProps.positionState} setPositionState={secondProps.setPositionState}
                       championState={secondProps.championState} setChampionState={secondProps.setChampionState}/>
        </DuoSearchBarWrapper>
    );
}

export default DuoSearchBar;

const DuoSearchBarWrapper = styled.div`
    gap: 12px;
    display: flex;
    flex-direction: row;
    position: relative;
    margin-top: 76px;
    align-items: center;
    
    @media screen and (max-width: 960px) {
        flex-direction: column;
    }
`
