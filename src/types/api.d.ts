import {ChampionInfo, PositionType} from "@/types/SearchBar";

export declare interface DuoMainInfoProps {
    id1?: number;
    id2?: number;
    rankChangeImgUrl?: string;
    rankChangeNumber?: number;
    champion1: MainChampionInfo;
    champion2: MainChampionInfo;
    winRate: string;
    totalGames?: int;
    rankNumber: number;
}

export declare interface SoloMainInfoProps extends MainChampionInfo{
    id?: number;
    rankChangeImgUrl?: string;
    rankChangeNumber?: number;
    winRate: string;
    totalGames?: int;
    rankNumber: number;
}

export declare interface MainChampionInfo {
    championName: string;
    championImgUrl: string;
    mainRuneImgUrl: string;
    positionImgUrl: string;
}

export declare interface DuoChampionInfoProps {
    champion1: ChampionInfo;
    champion2: ChampionInfo;
    champion1Position: PositionType;
    champion2Position: PositionType;
}