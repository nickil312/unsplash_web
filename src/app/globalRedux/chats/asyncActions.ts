import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "@/app/chat_axios";
import axios_node_server from "@/app/axois";
import {
    ChatChangeDetail,
    ChatChangeImageReq,
    ChatIdReq,
    Chats, ExitReq,
    Messages,
    UserIdReq
} from "@/app/globalRedux/chats/types";

export const fetchAllChats = createAsyncThunk<Chats[],UserIdReq>(
    'chats/fetchAllChats', async (params) => {

        console.log('all chats req')
        const {data} = await axios.get<Chats[]>(`/chats/${params._id}`)
        console.log('all chats', data)
        return data;
    })
export const fetchOld_Messages = createAsyncThunk<Messages[],ChatIdReq>(
    'chats/fetchOld_Messages', async (params) => {

        console.log('old messages')
        const {data} = await axios.get<Messages[]>(`/messages/${params.chatId}`)
        console.log('old messages', data)
        return data;
    })
export const fetchChatDetail = createAsyncThunk<Chats,ChatIdReq>(
    'chats/fetchChatDetail', async (params) => {

        console.log('chat details')
        const {data} = await axios.get<Chats>(`/chat/details/${params.chatId}`)
        console.log('chat details', data)
        return data;
    })
export const fetchChatImageChange = createAsyncThunk<Chats,ChatChangeImageReq>(
    'chats/fetchChatImageChange', async (params) => {

        console.log('chat image change')
        const {data} = await axios_node_server.patch<Chats>(`/postgresql/chat/changeProfileImg/`,params)
        console.log('chat image change', data)
        return data;
    })
export const fetchChatDetailChange = createAsyncThunk<Chats,ChatChangeDetail>(
    'chats/fetchChatDetailChange', async (params) => {

        console.log('chat detail change')
        const {data} = await axios_node_server.patch<Chats>(`/postgresql/chat/detail/${params.id}`,params)
        console.log('chat detail change', data)
        return data;
    })
export const fetchChatExit = createAsyncThunk<Chats,ExitReq>(
    'chats/fetchChatExit', async (params) => {

        console.log('chat exit')
        const {data} = await axios_node_server.patch<Chats>(`/postgresql/chat/exit`,params)
        console.log('chat exit', data)
        return data;
    })