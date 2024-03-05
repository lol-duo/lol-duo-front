export declare interface TeamInfoType {
    user: string,
    status: StatusType,
    userName: string
}

type StatusType = "none" | "in" | "ready";


export declare interface Chat {
    chat: string,
    userName: string,
    color: string
}