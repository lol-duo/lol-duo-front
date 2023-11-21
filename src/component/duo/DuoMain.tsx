import {NextPage} from "next";
import styled from "@emotion/styled";
import DuoSearchBar from "@/component/duo/DuoSearchBar";
import {useState} from "react";
import {PositionType} from "@/types/SearchBar";

const DuoMain: NextPage = () => {

    const [firstPosition, setFirstPosition] = useState<PositionType>("ALL");
    const [secondPosition, setSecondPosition] = useState<PositionType>("ALL");

    return (
        <DuoMainWrapper>
            <DuoSearchBar firstProps={{positionState: firstPosition, setPositionState: setFirstPosition}}
                          secondProps={{positionState: secondPosition, setPositionState: setSecondPosition}}/>
            {/*<DuoTableHeader newCss={{*/}
            {/*    marginTop: "24px",*/}
            {/*}}/>*/}
            {/*<div css={css({*/}
            {/*    marginTop: "4px",*/}
            {/*    display: "flex",*/}
            {/*    flexDirection: "column",*/}
            {/*    gap: "4px",*/}

            {/*})}>*/}
            {/*    {*/}
            {/*        mainChampion.length > 3 ?*/}
            {/*            <>*/}
            {/*                <Link key="firstBigTable" to={{*/}
            {/*                    pathname: "/duo/detail",*/}
            {/*                    search: `${createSearchParams({id: mainChampion[0].id + ""})}`*/}
            {/*                }}>*/}
            {/*                    <BigDuoTable rankInfo={mainChampion[0]}/>*/}
            {/*                </Link>*/}
            {/*                <div css={css({*/}
            {/*                    display: "flex",*/}
            {/*                    flexDirection: "row",*/}
            {/*                    gap: "4px"*/}
            {/*                })}>*/}
            {/*                    <Link to={{*/}
            {/*                        pathname: "/duo/detail",*/}
            {/*                        search: `${createSearchParams({id: mainChampion[1].id + ""})}`*/}
            {/*                    }}>*/}
            {/*                        <BigDuoTable rankInfo={mainChampion[1]}/>*/}
            {/*                    </Link>*/}
            {/*                    <Link to={{*/}
            {/*                        pathname: "/duo/detail",*/}
            {/*                        search: `${createSearchParams({id: mainChampion[2].id + ""})}`*/}
            {/*                    }}>*/}
            {/*                        <BigDuoTable rankInfo={mainChampion[2]}/>*/}
            {/*                    </Link>*/}
            {/*                </div>*/}
            {/*                {*/}
            {/*                    mainChampion.map((champion, index) => {*/}
            {/*                        if (index > 2) {*/}
            {/*                            return (*/}
            {/*                                <Link key={index} to={{*/}
            {/*                                    pathname: "/duo/detail",*/}
            {/*                                    search: `${createSearchParams({id: mainChampion[index].id + ""})}`*/}
            {/*                                }}>*/}
            {/*                                    <DuoTable rankInfo={champion}/>*/}
            {/*                                </Link>)*/}
            {/*                        } else {*/}
            {/*                            return null;*/}
            {/*                        }*/}
            {/*                    })*/}
            {/*                }*/}
            {/*            </>*/}
            {/*            : mainChampion.length === 0 ?*/}
            {/*                <div css={{*/}
            {/*                    height: "17px",*/}
            {/*                    width: "258px",*/}
            {/*                    ...fontList.roboto.regular["14"],*/}
            {/*                    color: colorList.grayscale["000"],*/}
            {/*                    position: "relative",*/}
            {/*                    top: "54px",*/}
            {/*                }}>현재 포지션/챔피언의 데이터가 부족합니다.</div>*/}
            {/*                :*/}
            {/*                mainChampion.map((champion, index) => {*/}
            {/*                    return (*/}
            {/*                        <Link key={index} to={{*/}
            {/*                            pathname: "/duo/detail",*/}
            {/*                            search: `${createSearchParams({id: mainChampion[index].id + ""})}`*/}
            {/*                        }}>*/}
            {/*                            <DuoTable rankInfo={champion}/>*/}
            {/*                        </Link>*/}
            {/*                    )*/}
            {/*                })*/}
            {/*    }*/}
            {/*</div>*/}
        </DuoMainWrapper>
    );
}

export default DuoMain;

const DuoMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

`
