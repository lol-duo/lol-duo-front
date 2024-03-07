import {PositionType} from "@/types/SearchBar";
const cloudFrontURL = "https://d3b83p9ttz58gf.cloudfront.net";

export const imgURL = {
    logo: cloudFrontURL + "/logo/Lightmode.svg",
    logoDark: cloudFrontURL + "/logo/Darkmode.svg",
    laneImg: {
        ALL: cloudFrontURL + "/lane/ALL.svg",
        TOP: cloudFrontURL + "/lane/TOP.svg",
        JUNGLE: cloudFrontURL + "/lane/JUNGLE.svg",
        MID: cloudFrontURL + "/lane/MIDDLE.svg",
        BOT: cloudFrontURL + "/lane/BOTTOM.svg",
        SUPPORT: cloudFrontURL + "/lane/UTILITY.svg",
    } as Record<PositionType, string>,

    searchGlass: cloudFrontURL + "/mainPage/search/searchGlass.svg",
    rankUp: cloudFrontURL + "/mainPage/rankChange/RankUp.svg",
    rankDown: cloudFrontURL + "/mainPage/rankChange/RankDown.svg",
    rankSame: cloudFrontURL + "/mainPage/rankChange/RankSame.svg",
    downArrow: cloudFrontURL + "/mainPage/search/downArrow.svg",
    leftArrow: cloudFrontURL + "/mainPage/search/leftArrow.svg",
    rightArrow: cloudFrontURL + "/mainPage/search/rightArrow.svg",
    upArrow: cloudFrontURL + "/mainPage/search/upArrow.svg",
    allChampion: cloudFrontURL + "/mainPage/champion/ALL.svg",
    itemIcon: cloudFrontURL + "/detail/item/ItemArrow.svg",

    firstRank: cloudFrontURL + "/mainPage/rankChange/1.svg",
    secondRank: cloudFrontURL + "/mainPage/rankChange/2.svg",
    thirdRank: cloudFrontURL + "/mainPage/rankChange/3.svg",
    fourthRank: cloudFrontURL + "/mainPage/rankChange/4.svg",

    listImg: cloudFrontURL + "/mainPage/icon/listImage.png",
    loading: cloudFrontURL + "/mainPage/loading.png",

    swap: cloudFrontURL + "/banpick/swap.png",
    download: cloudFrontURL + "/banpick/download.png",
}