import {NextPage} from "next";
import styled from "@emotion/styled";
import colorList from "../../../style/colorList";
import fontList from "../../../style/fontList";
import {useRouter} from "next/router";

const GlobalNavigationBar: NextPage = () => {

    const router = useRouter();

    const onClickNav = (info: string) => {
        switch (info) {
            case "solo":
                router.push("/solo");
                break;
            case "duo":
                router.push("/");
                break;
        }
    }

    return (
        <GlobalNavigationBarWrapper>
            <ul className="navList">
                <div className="nav" onClick={() => onClickNav("solo")}>
                    Duo
                </div>
                <div className="nav" onClick={() => onClickNav("duo")}>
                    Solo
                </div>
            </ul>
        </GlobalNavigationBarWrapper>
    );
}

export default GlobalNavigationBar;

const GlobalNavigationBarWrapper = styled.div`

  height: 48px;
  padding: 0 60px 0 60px;
  background: ${colorList.semantic.card};

  .navList {
    list-style: none;
    display: flex;
    flex-direction: row;
    gap: 1px;
    margin: 0;
    padding: 0;
  }

  .nav {
    font-family: ${fontList.roboto.regular["20"].fontFamily};
    font-size: ${fontList.roboto.regular["20"].fontSize};
    font-weight: ${fontList.roboto.regular["20"].fontWeight};
    line-height: ${fontList.roboto.regular["20"].lineHeight};
    letter-spacing: ${fontList.roboto.regular["20"].letterSpacing};
    color: ${colorList.grayscale["200"]};
    padding: 12px 16px;
    width: auto;

    &:hover {
      border-bottom: 2px solid ${colorList.grayscale["050"]};
      color: ${colorList.grayscale["050"]};
    }

    text-decoration: none;
  }
`