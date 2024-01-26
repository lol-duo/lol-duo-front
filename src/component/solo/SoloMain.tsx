import {NextPage} from "next";
import styled from "@emotion/styled";
import {useState} from "react";
import {ChampionInfo, PositionType} from "@/types/SearchBar";
import SearchBar from "@/component/common/SearchBar";
import SoloTable from "@/component/solo/SoloTable";

const SoloMain: NextPage = () => {

    const S3_URL = process.env["NEXT_PUBLIC_IMAGE_URL"];

    const [position, setPosition] = useState<PositionType>("ALL");
    const [champion, setChampion] = useState<ChampionInfo>({
        id: 0,
        name: "All",
        imgUrl: S3_URL + "/champion/ALL.svg"
    });

    return (
        <SoloMainWrapper>
            <div style={{marginTop: "76px"}}>
                <SearchBar positionState={position} setPositionState={setPosition} championState={champion} setChampionState={setChampion}/>
            </div>
            <SoloTable positionState={position} championState={champion} setPositionState={setPosition} setChampionState={setChampion}/>
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
