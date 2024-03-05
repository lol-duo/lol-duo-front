import { NextPage } from "next";
import styled from "@emotion/styled";
import fontList from "@styles/fontList";

const UserIdBar: NextPage<{idText:string,myUserId:string}> = (props) => {

    // 내 아이디 Component
    const {idText, myUserId} = props;
    return (
        <UserIdBarWrapper>
            <div className="title">{idText}</div>
            <div className="id">{myUserId}</div>
        </UserIdBarWrapper>
    )
}

export default UserIdBar;

const UserIdBarWrapper = styled.div`
    //size
    width: 20%;
    height: 100%;
    min-height: 60px;

    //align
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    //etc
    background: rgba(47, 47, 47, 1);
    border-radius: 10px;

    .title {
        //size
        width: 100%;

        //font
        font-family: ${fontList.roboto.regular["14"].fontFamily};
        font-size: ${fontList.roboto.regular["14"].fontSize};
        font-weight: ${fontList.roboto.regular["14"].fontWeight};
        line-height: ${fontList.roboto.regular["14"].lineHeight};
        letter-spacing: ${fontList.roboto.regular["14"].letterSpacing};
        color: rgba(181, 181, 181, 1);

        //align
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .id {
        //size
        width: 90%;
        height: 50%;

        //font
        font-family: ${fontList.roboto.medium["16"].fontFamily};
        font-size: ${fontList.roboto.medium["16"].fontSize};
        font-weight: ${fontList.roboto.medium["16"].fontWeight};
        line-height: ${fontList.roboto.medium["16"].lineHeight};
        letter-spacing: ${fontList.roboto.medium["16"].letterSpacing};
        color: rgba(249, 249, 249, 1);

        //align
        display: flex;
        align-items: center;
        justify-content: center;

    }
`
