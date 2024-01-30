import {NextPage} from "next";
import styled from "@emotion/styled";
import DuoSearchBar from "@/component/duo/DuoSearchBar";
import {useEffect, useState} from "react";
import {ChampionInfo, ChampionListType, ChampionType, PositionType} from "@/types/SearchBar";
import DuoTable from "@/component/duo/DuoTable";
import {useRouter} from "next/router";
import I18n from "@/component/locale/i18n";
import {PositionTypeGuard} from "@/types/SearchBarTypeGaurd";

const DuoMain: NextPage = () => {

    const router = useRouter();
    const {position1, champion1, position2, champion2} = router.query;

    //i18n
    const i18n = I18n("champion.ts");
    const language = i18n.language;
    const championInfoList = i18n.value as ChampionListType;

    const [firstPosition, setFirstPosition] = useState<PositionType>("ALL");
    const [secondPosition, setSecondPosition] = useState<PositionType>("ALL");
    const [firstChampion, setFirstChampion] = useState<ChampionInfo>({
        id: 0,
        name: "All",
        imgUrl: "/champion/ALL.svg"
    });
    const [secondChampion, setSecondChampion] = useState<ChampionInfo>({
        id: 0,
        name: "All",
        imgUrl: "/champion/ALL.svg"
    });

    const setPosition = (position: string, setPositionFunc: Function) => {
        if (PositionTypeGuard(position)) {
            setPositionFunc(position);
        } else {
            setPositionFunc("ALL");
        }
    };

    const setChampion = (championId: string, setChampionFunc: Function) => {
        const championInfo = championInfoList.find((item: ChampionType) => item.id === Number(championId));
        if (championInfo) {
            setChampionFunc({
                id: championInfo.id,
                name: language === "ko" ? championInfo.ko_name : championInfo.en_name,
                imgUrl: `/champion/${championInfo.image}`
            });
        } else {
            setChampionFunc({
                id: 0,
                name: "All",
                imgUrl: "/champion/ALL.svg"
            });
        }
    };

    //쿼리로 받은 값 업데이트
    useEffect(() => {
        setPosition(position1 as string, setFirstPosition);
        setChampion(champion1 as string, setFirstChampion);
        setPosition(position2 as string, setSecondPosition);
        setChampion(champion2 as string, setSecondChampion);
    }, [position1, champion1, position2, champion2]);

    //변경사항 쿼리 업데이트
    useEffect(() => {
        if (firstPosition && firstChampion && secondPosition && secondChampion)
            router.push({
                pathname: "/",
                query: {
                    position1: firstPosition,
                    champion1: firstChampion.id,
                    position2: secondPosition,
                    champion2: secondChampion.id
                }
            });
    }, [firstPosition, firstChampion, secondPosition, secondChampion]);

    return (
        <DuoMainWrapper>
            <DuoSearchBar
                firstProps={{
                    positionState: firstPosition,
                    setPositionState: setFirstPosition,
                    championState: firstChampion,
                    setChampionState: setFirstChampion
                }}
                secondProps={{
                  positionState: secondPosition,
                  setPositionState: setSecondPosition,
                  championState: secondChampion,
                  setChampionState: setSecondChampion
                }}/>
            <DuoTable
                firstProps={{
                    positionState: firstPosition,
                    setPositionState: setFirstPosition,
                    championState: firstChampion,
                    setChampionState: setFirstChampion
                }}
                secondProps={{
                    positionState: secondPosition,
                    setPositionState: setSecondPosition,
                    championState: secondChampion,
                    setChampionState: setSecondChampion
                }}/>
        </DuoMainWrapper>
    );
}

export default DuoMain;

const DuoMainWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
`
