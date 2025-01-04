import {Status} from "@/app/globalRedux/posts/types";
import {Users} from "@/app/globalRedux/users/types";
export type Chats = {
    chatId:string,
    chatName: string,
    createdAt: string,
    msg:string,
    msgUsId:string,
    msgCrt:string,
    fullName:string,
    avatarUrl:string
    isGroup:boolean,
    isTechSup:boolean
    description:string
    chat_image:boolean
    users:ChatUser[]
}
export type ChatUser = {
    id:string
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
export type ChatChangeImageReq = {
    chat_image:string,
    id:string,
}
export type AddUserForChat = {
    chatId:string,
    userId:string
}
export type ExitReq = {
    chatId:string
}
export type ChatChangeDetail = {
    id:string,
    name:string,
    description:string
}
export type UserIdReq = {
    _id: string,
}
export type ChatIdReq = {
    chatId: string,
}
export type ChatIdAndPageReq = {
    chatId: string,
    page: string,
}
export interface ChatsSliceState {
    chat_info:Chats | null,
    chat_detail:Chats | null,
    chatsAll: {
        items: Chats[],
        status: Status
    },
    chat_old_Messages:{
        items: Messages[],
        status: Status
    }
    users_for_add:{
        items: Users[],
        status: Status
    },
    api_url: string;

}