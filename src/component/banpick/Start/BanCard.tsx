import { NextPage } from "next"
import styled from "@emotion/styled";
import Image from "next/image";

const BanCard: NextPage<{
    selectedChampion: {
        img: string,
        en_name: string,
        ko_name: string,
        name_id: string,
    }[],
    now: number,
    turn: number,
    }> = (props) => {

        const {selectedChampion, now, turn} = props;

        return (
            <BanCardWrapper className={now === turn ? "ban now" : "ban"}>
                <div className="banImg"/>
                {
                    now == turn && <div className="now"/>
                }
                {
                    selectedChampion[turn] &&
                    <Image className="img" src={`${selectedChampion[turn].img}`} alt={selectedChampion[turn].img} fill sizes="3840px"/>
                }              
            </BanCardWrapper>
        )
}

export default BanCard;

const BanCardWrapper = styled.div`

position: relative;
box-sizing: border-box;
background-color: rgba(33, 33, 33, 0.5);

.now {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    z-index: 2;
    animation: blink 5s linear infinite;
    background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 100%);
}

    .banImg {
        z-index: 1;
        position: relative;
        top: 50%;
        width: 100%;
        height: 2px;
        background-color: rgba(255, 255, 255, 0.5);
        transform: rotate(45deg);                    
    }

height: 100%;
border: 2px solid rgba(33, 33, 33, 0.5);


@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
}


`