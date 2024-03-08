import { NextPage } from "next";
import styled from "@emotion/styled";
import fontList from "@styles/fontList";

const EndInfo: NextPage<{text:any}> = (props) => {

    const text  = props.text;

    return (
        <EndInfoWrapper>
            {(text.endInfoList as any[]).map(item => (
                <div key={item.index} className={`${item.index === 1 ? 'title' : 'info'}`} >{item.info}</div>
            ))}
        </EndInfoWrapper>
    )
}

export default EndInfo;

const EndInfoWrapper = styled.div`
    width: 90%;
    height: 300px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    align-items: start;
    
    @media (max-width: 800px) {
        height: 100px;
    }
    
    gap: 10px;
    
        .info {
            width: 100%;
            font-family: ${fontList.roboto.medium["16"].fontFamily};
            font-size: ${fontList.roboto.medium["16"].fontSize};
            font-weight: ${fontList.roboto.medium["16"].fontWeight};
            line-height: ${fontList.roboto.medium["16"].lineHeight};
            letter-spacing: ${fontList.roboto.medium["16"].letterSpacing};
            color: rgba(181, 181, 181, 1);
            text-align: left;
            
            align-items: flex-start;
            -webkit-align-items: flex-start;
        }
    
        .title {
            font-family: ${fontList.roboto.medium["16"].fontFamily};
            line-height: ${fontList.roboto.medium["16"].lineHeight};
            letter-spacing: ${fontList.roboto.medium["16"].letterSpacing};
            color: rgba(181, 181, 181, 1);
    
            text-align: left;
            font-weight: bold;
            font-size: 1.5em;
            padding-bottom: 10px;
            color: azure;
        }
`
