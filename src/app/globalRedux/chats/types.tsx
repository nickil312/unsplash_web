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
export type Messages = {
    id:string,
    content:string,
    fullname: string,
    avatarUrl:string,
    roomId:string,
    _id:string,
    createdAt:string,
}
export type UserIdReq = {
    _id: string,
}
export type ChatIdReq = {
    chatId: string,
}
export interface ChatsSliceState {
    chatsAll: {
        items: Chats[],
        status: Status
    },
    chat_old_Messages:{
        items: Messages[],
        status: Status
    }
    api_url: string;

}