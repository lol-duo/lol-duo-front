import {PositionType} from "@/types/SearchBar";

export function PositionTypeGuard(arg: any): arg is PositionType {
    return arg === "TOP" || arg === "JUNGLE" || arg === "MID" || arg === "BOT" || arg === "SUPPORT" || arg === "ALL";
}