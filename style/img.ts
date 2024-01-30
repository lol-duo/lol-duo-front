import {PositionType} from "@/types/SearchBar";

const S3_URL = process.env["NEXT_PUBLIC_IMAGE_URL"];

export const imgURL = {
    logo: "/logo/Lightmode.svg",
    logoDark: "/logo/Darkmode.svg",
    laneImg: {
        ALL: "/lane/ALL.svg",
        TOP: "/lane/TOP.svg",
        JUNGLE: "/lane/JUNGLE.svg",
        MID: "/lane/MIDDLE.svg",
        BOT: "/lane/BOTTOM.svg",
        SUPPORT: "/lane/UTILITY.svg",
    } as Record<PositionType, string>,

    searchGlass: S3_URL + "/mainPage/search/searchGlass.svg",
    rankUp: S3_URL + "/mainPage/rankChange/RankUp.svg",
    rankDown: S3_URL + "/mainPage/rankChange/RankDown.svg",
    rankSame: S3_URL + "/mainPage/rankChange/RankSame.svg",
    downArrow: S3_URL + "/mainPage/search/downArrow.svg",
    leftArrow: S3_URL + "/mainPage/search/leftArrow.svg",
    rightArrow: S3_URL + "/mainPage/search/rightArrow.svg",
    upArrow: S3_URL + "/mainPage/search/upArrow.svg",
    allChampion: S3_URL + "/mainPage/champion/ALL.svg",
    itemIcon: S3_URL + "/detail/item/ItemArrow.svg",

    firstRank: S3_URL + "/mainPage/rankChange/1.svg",
    secondRank: S3_URL + "/mainPage/rankChange/2.svg",
    thirdRank: S3_URL + "/mainPage/rankChange/3.svg",
    fourthRank: S3_URL + "/mainPage/rankChange/4.svg",

    listImg: S3_URL + "/mainPage/icon/listImage.png",
    loading: S3_URL + "/mainPage/loading.png"
}