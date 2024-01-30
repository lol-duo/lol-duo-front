import {Dispatch, SetStateAction} from "react";

export declare interface SearchBarPositionProps {
    positionState: PositionType;
    setPositionState: Dispatch<SetStateAction<PositionType>>;
}

export declare interface SearchBarTextProps {
    text: string;
    isOpen: boolean;
    selectedName: string;
}

export declare interface SearchBarChampionProps {
    championState: ChampionInfo;
    setChampionState: Dispatch<SetStateAction<ChampionInfo>>;
}

export declare interface SearchBarProps extends SearchBarPositionProps, SearchBarChampionProps {
}

export declare interface DuoSearchBarProps {
    firstProps: SearchBarProps;
    secondProps: SearchBarProps;
}

export declare interface ChampionInfo {
    id: number;
    name: string;
    imgUrl: string;
}

type PositionType = "TOP" | "JUNGLE" | "MID" | "BOT" | "SUPPORT" | "ALL";

export declare interface ChampionType {
    id: number;
    en_name: string;
    name_id: string;
    image: string;
    ko_name: string;
    positionList: RealPositionType[];
}

type ChampionListType = ChampionType[];
type RealPositionType = "TOP" | "JUNGLE" | "MIDDLE" | "BOTTOM" | "UTILITY";