import {CreateBankPickRoomProps} from "@/types/banPick";

export const banPickRoomInfo = async (): Promise<CreateBankPickRoomProps> => {
    const url = `${process.env["CREATE_BANKPICK_ROOM_URL"]}`;
    return fetch(url).then((res) => res.json());
}