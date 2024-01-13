import {NextPage} from "next";
import styled from "@emotion/styled";
import {Button} from "@nextui-org/button";
import {banPickRoomInfo} from "@/api/banpick";
import {useRouter} from "next/router";

const BankPickMain: NextPage = () => {

    const router = useRouter();

    const getBanPickRoomUrlInfo = async() => {
        return await banPickRoomInfo();
    }

    const onClickNav = async () => {
        let info = await getBanPickRoomUrlInfo();
        await router.push(`/banpick/room?id=${info.id}`);
    }

    return (
        <BanPickMainWrapper>
            <Button onClick={()=>onClickNav()}>

            </Button>
        </BanPickMainWrapper>
    );
}

export default BankPickMain;

const BanPickMainWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;

`
