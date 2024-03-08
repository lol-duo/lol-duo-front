import { NextPage } from "next";
import styled from "@emotion/styled";
import colorList from "@styles/colorList";
import {imgURL} from "@styles/img";

const ChampionSelectSearch: NextPage<{lane:string,setLane:Function,search:any,setSearch:Function,now:number}> = (props) => {

    const { lane, setLane, search, setSearch, now } = props;
    
    if(now<20){
        return(
            <ChampionSelectSearchWrapper>
            <div className="lane">
                <img onClick={() => {
                    setLane("ALL")
                }} className={lane === "ALL" ? "img on" : "img"} src={imgURL.laneImg.ALL} alt="/lane/All.svg"
                        height={25} width={25}/>
                <img onClick={() => {
                    lane === "TOP" ? setLane("ALL") : setLane("TOP")
                }} className={lane === "TOP" ? "img on" : "img"} src={imgURL.laneImg.TOP} alt="/lane/TOP.svg"
                        height={25} width={25}/>
                <img onClick={() => {
                    lane === "JUNGLE" ? setLane("ALL") : setLane("JUNGLE")
                }} className={lane === "JUNGLE" ? "img on" : "img"} src={imgURL.laneImg.JUNGLE} alt="/lane/JUNGLE.svg" height={25} width={25}/>
                <img onClick={() => {
                    lane === "MIDDLE" ? setLane("ALL") : setLane("MIDDLE")
                }} className={lane === "MIDDLE" ? "img on" : "img"} src={imgURL.laneImg.MID} alt="/lane/MIDDLE.svg" height={25} width={25}/>
                <img onClick={() => {
                    lane === "BOTTOM" ? setLane("ALL") : setLane("BOTTOM")
                }} className={lane === "BOTTOM" ? "img on" : "img"} src={imgURL.laneImg.BOT} alt="/lane/BOTTOM.svg" height={25} width={25}/>
                <img onClick={() => {
                    lane === "UTILITY" ? setLane("ALL") : setLane("UTILITY")
                }} className={lane === "UTILITY" ? "img on" : "img"} src={imgURL.laneImg.SUPPORT} alt="/lane/UTILITY.svg" height={25} width={25}/>
            </div>
            <input className="text" type="text" placeholder="챔피언 이름을 검색하세요" value={search} onChange={(e) => {
                setSearch(e.target.value)
            }}/>           
        </ChampionSelectSearchWrapper>

        )
    }
}

export default ChampionSelectSearch;

const ChampionSelectSearchWrapper = styled.div`
        margin-top: 15px;
        display: flex;
        flex-direction: row;
        position: relative;
        width: 100%;
        gap: 20px;
        justify-content: end;
        align-items: end;
    
    @media screen and (max-width: 800px) {
        margin-top: 0;
    }
    
    .lane {
        display: flex;
        flex-direction: row;       
        position: relative;
        left: 0;
        
        @media screen and (max-width: 850px) {
            width: 22px;
            height: 22px;
        }
        
        .img {
            box-sizing: border-box;
            filter: grayscale(100%);

            &:hover {
                cursor: pointer;
                filter: grayscale(0%);
            }
        }
        
        .on {
            filter: grayscale(0%);
        }
    }
    .text {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0);
        border: none;
        border-bottom: 2px solid rgba(33, 33, 33, 0.5);
        color: ${colorList.grayscale["100"]};
        font-size: 12px;
        box-sizing: border-box;
        text-align: right;
        
        &:focus {
            outline: none;
        }
        &::placeholder {
            color: ${colorList.grayscale["200"]};
        }
    }
`
