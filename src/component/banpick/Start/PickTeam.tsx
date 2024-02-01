import { NextPage } from "next";
import styled from "@emotion/styled";
import BanList from "./BanList";
import PickList from "./PickList";

const PickTeam: NextPage<{
    team:number,
    now:number,
    me:string, 
    selectedChampion: {
        img: string,
        en_name: string,
        ko_name: string,
        name_id: string,
    }[],
    changeChampion:Function, 
    imgURL:any, 
    locale:string,
    isOpen:number,
    setIsOpen:Function}> = (props) => {

    const {team,now, me,selectedChampion,changeChampion,imgURL,locale,isOpen,setIsOpen } = props;

    return (
        <PickTeamWrapper className={team ==0 ? "blueTeam":"redTeam"}>
            <BanList team={team} selectedChampion={selectedChampion} now={now}/>
            <PickList team={team} now={now} me={me} selectedChampion={selectedChampion} changeChampion={changeChampion} imgURL={imgURL} locale={locale} isOpen={isOpen} setIsOpen={setIsOpen}/>
        </PickTeamWrapper>
    )
}

export default PickTeam;

const PickTeamWrapper = styled.div`
width: 33%;
height: 100%;
max-width: 400px;
margin-top: 20px;
display: flex;
flex-direction: column;

    &.redTeam{
        align-items: end;
    }

    &.blueTeam{
        align-items: start;
    }
`
