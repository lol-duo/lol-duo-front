import {NextPage} from "next";
import styled from "@emotion/styled";
import {Button} from "@nextui-org/react";
import colorList from "@styles/colorList";
import {imgURL} from "@styles/img";

const Capture: NextPage<{firstImage:any,secondImage:any}> = (props) => {

    const {firstImage,secondImage}  = props;

    return (
        <CaptureWrapper>
            <Button className="captureBox">
                <img onClick={()=>{
                    if(firstImage.current){
                        firstImage.current.click();
                    }
                }} className="captureImg" src={imgURL.download} alt={imgURL.download} width={50} height={50} sizes="3840px" />
            </Button>
            <Button className="captureBox">
            <img onClick={() => {
                if (secondImage.current) {
                    secondImage.current.click();
                }
            }} className="captureImg" src={imgURL.download} alt={imgURL.download}  width={50} height={50} sizes="3840px" />
            </Button>
        </CaptureWrapper>
    )
}

export default Capture;

const CaptureWrapper = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 30px;
    
    @media (max-width: 800px) {
        height: 50px;
    }
    
    .captureBox {
        width: 60px;
        height: 60px;
        border-radius: 10px;
        border: 2px solid ${colorList.secondary.beige};
        outline: none;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover {
            cursor: pointer;
            background-color: ${colorList.semantic.hover};
        }
        background-color: ${colorList.semantic.card};
    }
`
