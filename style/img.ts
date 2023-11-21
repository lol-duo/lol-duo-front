import {PositionType} from "@/types/SearchBar";

const S3_URL = "https://lol-duo.s3.ap-northeast-2.amazonaws.com";
;
export const imgURL = {
    logo: S3_URL + "/logo/Lightmode.svg",
    laneImg: {
        ALL: S3_URL + "/mainPage/search/ALL.svg",
        TOP: S3_URL + "/mainPage/search/TOP.svg",
        JUNGLE: S3_URL + "/mainPage/search/JUNGLE.svg",
        MID: S3_URL + "/mainPage/search/MIDDLE.svg",
        BOT: S3_URL + "/mainPage/search/BOTTOM.svg",
        SUPPORT: S3_URL + "/mainPage/search/UTILITY.svg",
    } as Record<PositionType, string>
}