import {NextPage} from "next";
import styled from "@emotion/styled";
import {useRouter} from "next/router";

const BankPickRoomMain: NextPage = () => {

    const router = useRouter();
    const {id} = router.query;
    console.log(id);

    return (
        <BanPickRoomMainWrapper>
        </BanPickRoomMainWrapper>
    );
}

export default BankPickRoomMain;

const BanPickRoomMainWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;

`
