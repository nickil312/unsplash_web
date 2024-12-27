import {Status} from "@/app/globalRedux/posts/types";
export type Chats = {
    chatId:string,
    chatName: string,
    createdAt: string,
    msg:string,
    msgUsId:string,
    msgCrt:string,
    fullName:string,
    avatarUrl:string
}
export type UserIdReq = {
    _id: string,
}
export interface ChatsSliceState {
    chatsAll: {
        items: Chats[],
        status: Status
    },
    api_url: string;

}