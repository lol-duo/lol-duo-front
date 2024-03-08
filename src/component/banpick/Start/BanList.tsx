import { NextPage } from "next"
import styled from "@emotion/styled";
import BanCard from "@/component/banpick/Start/BanCard";

const BanList: NextPage<{
    team: number,
    selectedChampion: {
        img: string,
        en_name: string,
        ko_name: string,
        name_id: string,
    }[],
    now: number,
    }> = (props) => {
        const {now, selectedChampion, team} = props;
        const blueTeamTurn = [0,2,4,13,15];
        const redTeamTurn = [1,3,5,12,14];
        //blue
        if(team===0){
            return (
                <BanListWrapper className="blueTeam">
                {blueTeamTurn.map((turn, index) => (
                    <BanCard key={index} selectedChampion={selectedChampion} now={now} turn={turn}></BanCard>
                ))}
                </BanListWrapper>
            )
        }
        //red
        else{
            return (
                <BanListWrapper className="redTeam">
                {redTeamTurn.map((turn, index) => (
                    <BanCard key={index} selectedChampion={selectedChampion} now={now} turn={turn}></BanCard>
                ))}
                </BanListWrapper>
            )
        }
}

export default BanList;

const BanListWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    box-sizing: content-box;
    gap: 5px;

    &.blueTeam {
        justify-content: start;
        align-items: start;
    }
    &.redTeam {
        justify-content: end;
        align-items: end;
    }
`