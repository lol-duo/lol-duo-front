import {NextPage} from "next";
import styled from "@emotion/styled";
import {useEffect, useState} from "react";
import {ChampionInfo, ChampionListType, ChampionType, PositionType} from "@/types/SearchBar";
import SearchBar from "@/component/common/SearchBar";
import SoloTable from "@/component/solo/SoloTable";
import {PositionTypeGuard} from "@/types/SearchBarTypeGaurd";
import {useRouter} from "next/router";
import I18n from "@/component/locale/i18n";
import {imgURL} from "@styles/img";

const SoloMain: NextPage = () => {

    const router = useRouter();
    const {position, champion} = router.query;

    //i18n
    const i18n = I18n("champion.ts");
    const language = i18n.language;
    const championInfoList = i18n.value as ChampionListType;

    const [nowPosition, setNowPosition] = useState<PositionType>("ALL");
    const [nowChampion, setNowChampion] = useState<ChampionInfo>({
        id: 0,
        name: "All",
        imgUrl: imgURL.allChampion
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
                imgUrl: `https://d3b83p9ttz58gf.cloudfront.net/champion/${championInfo.image}`
            });
        } else {
            setChampionFunc({
                id: 0,
                name: "All",
                imgUrl: imgURL.allChampion
            });
        }
    };

    //쿼리로 받은 값 업데이트
    useEffect(() => {
        setPosition(position as string, setNowPosition);
        setChampion(champion as string, setNowChampion);
    }, [position, champion]);

    //변경사항 쿼리 업데이트
    useEffect(() => {
        if(nowPosition && nowChampion)
            router.push({
                pathname: "/solo",
                query: {
                    position: nowPosition,
                    champion: nowChampion.id,
                }
            });
    },[nowChampion, nowPosition]);

    return (
        <SoloMainWrapper>
            <div style={{marginTop: "76px"}}>
                <SearchBar positionState={nowPosition} setPositionState={setNowPosition} championState={nowChampion} setChampionState={setNowChampion}/>
            </div>
            <SoloTable positionState={nowPosition} setPositionState={setNowPosition} championState={nowChampion}  setChampionState={setNowChampion}/>
        </SoloMainWrapper>
    );
}

export default SoloMain;

const SoloMainWrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100%;

`
