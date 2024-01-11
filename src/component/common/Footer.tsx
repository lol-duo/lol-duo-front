import {NextPage} from "next";
import styled from "@emotion/styled";
import fontList from "../../../style/fontList";
import colorList from "../../../style/colorList";
import {imgURL} from "../../../style/img";
import Image from "next/image";

const Footer: NextPage = () => {

    const riotText = "© 2022 lolduo.net isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends \n" +
        "© Riot Games, Inc";

    return (
        <FooterWrapper>
            <div className="logo">
                <Image className="logoImg" src={imgURL.logoDark} alt={imgURL.logoDark} width={165} height={32}/>
            </div>
            <div className="text">{
                riotText
            }</div>
        </FooterWrapper>
    );
}

export default Footer;

const FooterWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  height: 144px;
    margin-left: 60px;
    margin-top: 108px;
    margin-right: 60px;

  .text {
    display: flex;
    gap: 4px;
    font-family: ${fontList.roboto.regular["11"].fontFamily};
    font-size: ${fontList.roboto.regular["11"].fontSize};
    font-weight: ${fontList.roboto.regular["11"].fontWeight};
    line-height: ${fontList.roboto.regular["11"].lineHeight};
    letter-spacing: ${fontList.roboto.regular["11"].letterSpacing};
    color: ${colorList.grayscale["200"]};
    height: 64px;
      width: 579px;
      @media screen and (max-width: 640px) {
            width: 100%;
      }
  }
`
