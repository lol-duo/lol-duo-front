import { NextPage } from "next";
import styled from "@emotion/styled";
import ChampionSelectSearch from "@/component/banpick/Start/ChampionSelectSearch";
import ChampionSelectList from "@/component/banpick/Start/ChampionSelectList";
import ChampionSelectButton from "@/component/banpick/Start/ChampionSelectButton";

const ChampionSelect: NextPage<{
    lane:string,
    setLane:Function,
    search:any,
    setSearch:Function,
    now:number,
    championList:
    [{id: number, 
        en_name: string, 
        name_id: string, 
        image: string, 
        ko_name: string, 
        positionList: string[]
    }],
    blueTurn:any,
    locale:string,
    sendMsg: (message: any) => void,
    me: string,
    setChampionSelect:Function,
    selectedChampion: {
        img: string,
        en_name: string,
        ko_name: string,
        name_id: string,
    }[],
    championSelect:boolean,
}> = (props) => {

    const { lane, setLane, search, setSearch, now } = props;
    const { championList, blueTurn, locale, sendMsg, me, setChampionSelect, selectedChampion,championSelect} = props;
    
    return (
        <ChampionSelectWrapper>
            <ChampionSelectSearch lane={lane} setLane={setLane} search={search} setSearch={setSearch} now={now}></ChampionSelectSearch>
            <ChampionSelectList now={now} championList={championList} blueTurn={blueTurn} locale={locale} sendMsg={sendMsg} me={me} setChampionSelect={setChampionSelect} selectedChampion={selectedChampion} search={search} lane={lane}></ChampionSelectList>
            <ChampionSelectButton now={now} me={me} blueTurn={blueTurn} sendMsg={sendMsg} setChampionSelect={setChampionSelect} championSelect={championSelect}></ChampionSelectButton>
        </ChampionSelectWrapper>
    )
}
export default ChampionSelect;

const ChampionSelectWrapper = styled.div`
    width: 100%;
`
