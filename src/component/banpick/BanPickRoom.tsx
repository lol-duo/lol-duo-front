import {NextPage} from "next";
import styled from "@emotion/styled";
import {Button} from "@nextui-org/react";
import { Peer } from "peerjs";
import {useEffect, useState} from "react";

const BanPickRoom: NextPage = () => {

    const [peerId, setPeerId] = useState<string>("");

    const createPeer = () => {
        const peer = new Peer();
        peer.on('open', function(id) {
            setPeerId(id);
            console.log('My peer ID is: ' + id);
        });
    }

    useEffect(() => {
        createPeer();
    }, []);


    const onClickButton = () => {
        const peer = new Peer();
        peer.on('open', function(id) {
            console.log('My peer ID is: ' + id);
        });
    }

    return (
        <BanPickRoomWrapper>
            <Button onClick={() => onClickButton()}>Button</Button>
        </BanPickRoomWrapper>
    );
}

export default BanPickRoom;

const BanPickRoomWrapper = styled.div`
`
