import {NextPage} from "next";
import styled from "@emotion/styled";
import fontList from "../../../style/fontList";
import colorList from "../../../style/colorList";
import {SearchBarTextProps} from "@/types/SearchBar";
import {imgURL} from "@styles/img";

const SearchBarText: NextPage<SearchBarTextProps> = (props) => {
    const {text, isOpen, selectedName} = props;

    return (
        <SearchBarTextWrapper>
            <div className="text">
                {text}
                {
                    isOpen ?
                        <img className="Arrow" src={imgURL.upArrow} alt={imgURL.upArrow} width={16} height={16}/> :
                        <img className="Arrow" src={imgURL.downArrow} alt={imgURL.downArrow} width={16} height={16}/>
                }
            </div>
            <div className="selectedName">{selectedName}</div>
        </SearchBarTextWrapper>
    );
}

export default SearchBarText;

const SearchBarTextWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  height: 40px;
  width: 74px;

  .text {
    display: flex;
    gap: 4px;
    font-family: ${fontList.roboto.regular["14"].fontFamily};
    font-size: ${fontList.roboto.regular["14"].fontSize};
    font-weight: ${fontList.roboto.regular["14"].fontWeight};
    line-height: ${fontList.roboto.regular["14"].lineHeight};
    letter-spacing: ${fontList.roboto.regular["14"].letterSpacing};
    color: ${colorList.grayscale["100"]};

    .Arrow {
      position: relative;
      height: 16px;
      width: 16px;
    }
  }

  .selectedName {
    font-family: ${fontList.roboto.medium["16"].fontFamily};
    font-size: ${fontList.roboto.medium["16"].fontSize};
    font-weight: ${fontList.roboto.medium["16"].fontWeight};
    line-height: ${fontList.roboto.medium["16"].lineHeight};
    letter-spacing: ${fontList.roboto.medium["16"].letterSpacing};
    color: ${colorList.grayscale["000"]};
    height: 19px;
  }
`
