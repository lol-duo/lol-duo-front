import {NextPage} from "next";
import styled from "@emotion/styled";
import colorList from "../../../style/colorList";
import {useRouter} from "next/router";
import {imgURL} from "@styles/img";
import I18n from "@/component/locale/i18n";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea,
    useDisclosure
} from "@nextui-org/react";
import {useState} from "react";
import {suggestionAPI} from "@/api/main";


const GlobalNavigationBarLogo: NextPage<{where?: string}> = (props) => {

    const router = useRouter();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [input, setInput] = useState("");
    const [emailOrPhone, setEmailOrPhone] = useState("");
    const onClickNavLogo = () => {
        router.push("/");
    }

    const i18n = I18n('common.json').value;
    const suggestion = i18n.suggestion;
    const placeholder = i18n.suggestionPlaceholder;
    const content = i18n.suggestionContent;
    const notification = i18n.suggestionNotification;
    const action = i18n.suggestionAction;
    const close = i18n.suggestionClose;
    const success = i18n.suggestionSuccess

    const sendSuggestion = () => {
        if(input !== "") {
            suggestionAPI(input, emailOrPhone)
            setInput("");
            setEmailOrPhone("");
            window.alert(success);
        }
    }
    /*
    <div className={props.where === "banPick" ? "total none" : "total"}>
    <div className={props.where === "banPick" ? "logo banPick" : "logo"}>
    */
    return (
        <GlobalNavigationBarLogoWrapper>
            
            <div className={props.where === "banPick" ? "total" : "total"}>
            <div className={props.where === "banPick" ? "logo" : "logo"}>
                <img className="logoImg" src={imgURL.logo} onClick={() => onClickNavLogo()} width={164.8} height={32} alt={imgURL.logo}/>
            </div>
            <div className="건의하기" onClick={() => {
                onOpen();
            }}>
                {suggestion}
            </div>
            <Modal
                size={"sm"}
                isOpen={isOpen}
                onClose={onClose}
                backdrop="blur"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{suggestion}</ModalHeader>
                            <ModalBody>
                                <Textarea content={input} onChange={(e) => setInput(e.target.value)} placeholder={content}/>
                                <Input
                                    label="Email or Phone Number"
                                    placeholder={placeholder}
                                    variant="bordered"
                                    content={emailOrPhone}
                                    onChange={(e) => setEmailOrPhone(e.target.value)}
                                />
                                <p>{notification}</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    {close}
                                </Button>
                                <Button color="primary" onPress={() => {
                                    sendSuggestion();
                                    onClose();
                                }}>
                                    {action}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            </div>
        </GlobalNavigationBarLogoWrapper>
    );
}

export default GlobalNavigationBarLogo;

const GlobalNavigationBarLogoWrapper = styled.div`
    .total {
        height: 56px;
        box-sizing: border-box;
        z-index: 1;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background: ${colorList.semantic.card};
    }
    
    .none {
        background: none;
    }
    
    .건의하기 {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        color: ${colorList.grayscale["000"]};
        cursor: pointer;
        padding: 0 60px 0 0;
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
        background: rgba(255, 255, 255, 0);
  }
`