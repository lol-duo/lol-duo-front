import {NextPage} from "next"
import styled from "@emotion/styled";
import colorList from "@styles/colorList";

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
                    <img className="img" src={`https://d3b83p9ttz58gf.cloudfront.net/champion${selectedChampion[turn].img}`} alt={selectedChampion[turn].img}/>
                }              
            </BanCardWrapper>
        )
}

export default BanCard;

const BanCardWrapper = styled.div`

    position: relative;
    box-sizing: border-box;
    background-color: rgba(33, 33, 33, 0.5);
    box-shadow: 0 0 10px 0 ${colorList.alpha.gray000_70};

    .now {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        z-index: 2;
        animation: blink 1s linear infinite;
        background: radial-gradient(circle at center, rgba(255, 255, 255, 0.2) 100%, rgba(255, 255, 255, 0.0) 0%);
        
    }

    .banImg {
        z-index: 4;
        position: relative;
        top: 50%;
        width: 100%;
        height: 2px;
        background-color: rgba(255, 255, 255, 0.5);
        transform: rotate(45deg);                    
    }
    
    
    width: 40px;
    height: 40px;
    
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
    }
    
    .img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        z-index: 1;
    }


`