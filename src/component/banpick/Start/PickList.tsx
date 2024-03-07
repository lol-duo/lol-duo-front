import { NextPage } from "next"
import styled from "@emotion/styled";
import PickCard from "@/component/banpick/Start/PickCard";

const PickList: NextPage<{
    team: number,
    now: number,
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
    setIsOpen:Function,
    selectedGameMode:string,
    selectLane:string,
    }> = (props) => {
    
    const {team,now, me,selectedChampion,changeChampion,imgURL,locale,isOpen,setIsOpen,selectedGameMode,selectLane} = props;
    const blueTeamTurn = [6,9,10,17,18];
    const redTeamTurn = [7,8,11,16,19];
        //blue
        if(team===0){
            return (
                <PickListWrapper>
                    {blueTeamTurn.map((turn, index) => (
                        <PickCard key={index} team={team} now={now} me={me} selectedChampion={selectedChampion} changeChampion={changeChampion} imgURL={imgURL} locale={locale} isOpen={isOpen} setIsOpen={setIsOpen} turn={turn} selectedGameMode={selectedGameMode} selectLane={selectLane}/>
                    ))}
                </PickListWrapper>
            )
        }
        //red
        else{
            return (
                <PickListWrapper>
                    {redTeamTurn.map((turn, index) => (
                        <PickCard key={index} team={team} now={now} me={me} selectedChampion={selectedChampion} changeChampion={changeChampion} imgURL={imgURL} locale={locale} isOpen={isOpen} setIsOpen={setIsOpen} turn={turn} selectedGameMode ={selectedGameMode} selectLane={selectLane}/>
                    ))}
                </PickListWrapper>
            )
        }
}

export default PickList;

const PickListWrapper = styled.div`
margin-top: 20px;
height: 100%;
width: 100%;
background-color: rgba(0, 0, 0, 0);
display: flex;
flex-direction: column;
position: relative;
`