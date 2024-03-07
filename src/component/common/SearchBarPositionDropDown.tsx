import {NextPage} from "next";
import styled from "@emotion/styled";
import {PositionType, SearchBarPositionProps} from "@/types/SearchBar";
import colorList from "../../../style/colorList";
import {imgURL} from "@styles/img";

const SearchBarPositionDropDown: NextPage<SearchBarPositionProps> = (props) => {

    const positionTypeList: PositionType[] = ["ALL", "TOP", "JUNGLE", "MID", "BOT", "SUPPORT"];
    const {positionState, setPositionState} = props;

    return (
        <SearchBarPositionDropDownWrapper>
            <>{
                positionTypeList.map((positionType) => (
                        (
                            positionState === positionType ?
                                <div className="positionCircle" key={positionType}
                                     style={{backgroundColor: colorList.alpha.secondaryBeige_20}}
                                     onClick={() => setPositionState(positionType)}>
                                    <img key={positionType + "img"} className="positionImg" width={24} height={24}
                                           src={imgURL.laneImg[positionType]}
                                           alt={imgURL.laneImg[positionType]}/>
                                </div> : <div className="positionCircle" key={positionType}
                                              onClick={() => setPositionState(positionType)}>
                                    <img key={positionType + "img"} className="positionImg" width={24} height={24}
                                           src={imgURL.laneImg[positionType]}
                                           alt={imgURL.laneImg[positionType]}/>
                                </div>
                        )
                    )
                )
            }</>
        </SearchBarPositionDropDownWrapper>

    );
}

export default SearchBarPositionDropDown;

const SearchBarPositionDropDownWrapper = styled.div`
    
    display: flex;
    gap: 8px;
    width: 336px;
    height: 60px;
    padding: 8px 16px 8px 16px;
    border-radius: 100px;
    background-color: ${colorList.semantic.card};
    box-shadow: 0 0 10px 0 ${colorList.alpha.gray000_70};
    position: relative;
    top: 4px;
    
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
