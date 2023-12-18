import {NextPage} from "next";
import styled from "@emotion/styled";
import colorList from "../../../style/colorList";
import {useRouter} from "next/router";
import {imgURL} from "../../../style/img";
import Image from "next/image";

const GlobalNavigationBarLogo: NextPage = () => {

    const router = useRouter();

    const onClickNavLogo = () => {
        router.push("/");
    }

    return (
        <GlobalNavigationBarLogoWrapper>
            <Image className="logoImg" src={imgURL.logo} onClick={onClickNavLogo}
                   alt={imgURL.logo}/>
        </GlobalNavigationBarLogoWrapper>
    );
}

export default GlobalNavigationBarLogo;

const GlobalNavigationBarLogoWrapper = styled.div`
  height: 56px;
  box-sizing: border-box;
  padding: 0 0 0 60px;
  background: ${colorList.semantic.card};

  .logoImg {
    position: relative;
    left: 0;
    top: 12px;
    height: 32px;
    width: 164.8px;
  }
`