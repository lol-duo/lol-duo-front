import {NextPage} from "next";
import styled from "@emotion/styled";
import colorList from "../../../style/colorList";
import fontList from "../../../style/fontList";
import {useRouter} from "next/router";

const GlobalNavigationBar: NextPage = () => {

    const router = useRouter();
    let duoClassName = "nav";
    let soloClassName = "nav";
    let banpickName = "nav";

    if(router.pathname === "/solo") {
        soloClassName = "nav active";
    }

    if(router.pathname === "/") {
        duoClassName = "nav active";
    }

    if(router.pathname === "/banpick") {
        banpickName = "nav active";
    }

    const onClickNav = (info: string) => {
        switch (info) {
            case "solo":
                router.push("/solo");
                break;
            case "duo":
                router.push("/");
                break;
            case "banpick":
                router.push("/banpick");
                break;
        }
    }

    return (
        <GlobalNavigationBarWrapper>
            <ul className="navList">
                <div className={duoClassName} onClick={() => onClickNav("duo")}>
                    Duo
                </div>
                <div className={soloClassName} onClick={() => onClickNav("solo")}>
                    Solo
                </div>
                <div className={banpickName} onClick={() => onClickNav("banpick")}>
                    BanPick
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

    text-decoration: none;
      
    &:hover {
      cursor: pointer;
      border-bottom: 2px solid ${colorList.grayscale["200"]};
      color: ${colorList.grayscale["200"]};
    }
      
  }
    .active {
        border-bottom: 2px solid ${colorList.grayscale["050"]};
        color: ${colorList.grayscale["050"]};
    }
`