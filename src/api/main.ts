import {DuoChampionInfoProps, DuoMainInfoProps, SoloMainInfoProps} from "@/types/api";
import {SearchBarProps} from "@/types/SearchBar";


export const duoMainInfo = async (championInfo: DuoChampionInfoProps): Promise<[DuoMainInfoProps]> => {
    const url = `${process.env["API_URL"]}?championId=${championInfo.champion1.id}&position=${championInfo.champion1Position}&championId2=${championInfo.champion2.id}&position2=${championInfo.champion2Position}`;
    return fetch(url).then((res) => res.json());
}

export const soloMainInfo = async (championInfo: SearchBarProps): Promise<[SoloMainInfoProps]> => {
    const url = `${process.env["SOLO_API_URL"]}?championId=${championInfo.championState.id}&position=${championInfo.positionState}`;
    return fetch(url).then((res) => res.json());
}