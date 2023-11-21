import {NextPage} from "next";
import styled from "@emotion/styled";
import fontList from "../../../style/fontList";
import colorList from "../../../style/colorList";

const SearchBarText: NextPage = (props) => {

    return (
        <SearchBarTextWrapper>
        </SearchBarTextWrapper>
    );
}

export default SearchBarText;

const SearchBarTextWrapper = styled.div`
  font-family: ${fontList.roboto.regular["14"].fontFamily};
  font-size: ${fontList.roboto.regular["14"].fontSize};
  font-weight: ${fontList.roboto.regular["14"].fontWeight};
  line-height: ${fontList.roboto.regular["14"].lineHeight};
  letter-spacing: ${fontList.roboto.regular["14"].letterSpacing};
  color: ${colorList.grayscale["100"]};
`
