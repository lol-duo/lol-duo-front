import {PositionType} from "@/types/SearchBar";

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

    searchGlass: "/mainPage/search/searchGlass.svg",
    rankUp: "/mainPage/rankChange/RankUp.svg",
    rankDown: "/mainPage/rankChange/RankDown.svg",
    rankSame: "/mainPage/rankChange/RankSame.svg",
    downArrow: "/mainPage/search/downArrow.svg",
    leftArrow: "/mainPage/search/leftArrow.svg",
    rightArrow: "/mainPage/search/rightArrow.svg",
    upArrow: "/mainPage/search/upArrow.svg",
    allChampion:"/mainPage/champion/ALL.svg",
    itemIcon: "/detail/item/ItemArrow.svg",

    firstRank: "/mainPage/rankChange/1.svg",
    secondRank: "/mainPage/rankChange/2.svg",
    thirdRank: "/mainPage/rankChange/3.svg",
    fourthRank: "/mainPage/rankChange/4.svg",

    listImg: "/mainPage/icon/listImage.png",
    loading: "/mainPage/loading.png"
}