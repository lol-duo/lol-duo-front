import {NextPage} from "next";
import styled from "@emotion/styled";
import colorList from "../../../style/colorList";
import {useRouter} from "next/router";
import {imgURL} from "@styles/img";
import Image from "next/image";
import I18n from "@/component/locale/i18n";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";


const GlobalNavigationBarLogo: NextPage<{where?: string}> = (props) => {

    const router = useRouter();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const onClickNavLogo = () => {
        router.push("/");
    }

    const suggestion = I18n('common.json').value.suggestion;

    return (
        <GlobalNavigationBarLogoWrapper>
            <div className={props.where === "banPick" ? "logo banPick" : "logo"}>
                <Image className="logoImg" src={imgURL.logo} onClick={() => onClickNavLogo()} width={164.8} height={32}
                       alt={imgURL.logo}/>
            </div>
            <div className="건의하기" onClick={() => {
                console.log("건의하기");
                onOpen();
            }}>
                {suggestion}
            </div>
            <Modal
                size={"sm"}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Nullam pulvinar risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Nullam pulvinar risus non risus hendrerit venenatis.
                                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                                </p>
                                <p>
                                    Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                                    dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis.
                                    Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </GlobalNavigationBarLogoWrapper>
    );
}

export default GlobalNavigationBarLogo;

const GlobalNavigationBarLogoWrapper = styled.div`
  height: 56px;
  box-sizing: border-box;
    z-index: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    
    .건의하기 {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 0 60px 0 0;
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        color: ${colorList.grayscale["200"]};
        cursor: pointer;
    }
             
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