import {NextPage} from "next";
import styled from "@emotion/styled";
import colorList from "../../../style/colorList";
import {useRouter} from "next/router";
import {imgURL} from "../../../style/img";
import Image from "next/image";

const GlobalNavigationBarLogo: NextPage<{where?: string}> = (props) => {
//dd
    const router = useRouter();
    const onClickNavLogo = () => {
        router.push("/");
    }

    return (
        <GlobalNavigationBarLogoWrapper>
            <div className={props.where === "banPick" ? "logo banPick" : "logo"}>
                <Image className="logoImg" src={imgURL.logo} onClick={() => onClickNavLogo()} width={164.8} height={32}
                       alt={imgURL.logo}/>
            </div>
        </GlobalNavigationBarLogoWrapper>
    );
}

export default GlobalNavigationBarLogo;

const GlobalNavigationBarLogoWrapper = styled.div`
  height: 56px;
  box-sizing: border-box;
    z-index: 1;

             
  .logo {
      background: ${colorList.semantic.card};
      height: 100%;
      padding: 0 0 0 60px;

      .logoImg {
          position: relative;
          left: 0;
          top: 12px;
          cursor: pointer;
      }
  }
      
    
    .banPick {
        //background: linear-gradient(180deg, ${colorList.semantic.background} 0%, rgba(255, 255, 255, 0) 100%);
        background: rgba(255, 255, 255, 0);
  }

  
`