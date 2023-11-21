import {Dispatch, SetStateAction} from "react";

export declare interface SearchBarPositionProps {
    positionState: PositionType;
    setPositionState: Dispatch<SetStateAction<PositionType>>
}

export declare interface SearchBarChampionProps {
    // champion: string;
    // setChampion: Dispatch<SetStateAction<string>>
}

export declare interface SearchBarProps extends SearchBarPositionProps, SearchBarChampionProps {
}

export declare interface DuoSearchBarProps {
    firstProps: SearchBarProps;
    secondProps: SearchBarProps;
}

export declare interface ChampionInfo {
    position: PositionType;
    champion: {
        id: number;
        name: string;
        championImgUrl: string;
    }
}

type PositionType = "TOP" | "JUNGLE" | "MID" | "BOT" | "SUPPORT" | "ALL";