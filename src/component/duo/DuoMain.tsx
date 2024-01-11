import {NextPage} from "next";
import styled from "@emotion/styled";
import DuoSearchBar from "@/component/duo/DuoSearchBar";
import {useState} from "react";
import {ChampionInfo, PositionType} from "@/types/SearchBar";
import DuoTable from "@/component/duo/DuoTable";

const DuoMain: NextPage = () => {

    const S3_URL = process.env["NEXT_PUBLIC_IMAGE_URL"];

    const [firstPosition, setFirstPosition] = useState<PositionType>("ALL");
    const [secondPosition, setSecondPosition] = useState<PositionType>("ALL");
    const [firstChampion, setFirstChampion] = useState<ChampionInfo>({
        id: 0,
        name: "All",
        imgUrl: S3_URL + "/champion/ALL.svg"
    });
    const [secondChampion, setSecondChampion] = useState<ChampionInfo>({
        id: 0,
        name: "All",
        imgUrl: S3_URL + "/champion/ALL.svg"
    });


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
            <DuoTable firstProps={{
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
