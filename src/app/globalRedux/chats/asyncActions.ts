import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "@/app/chat_axios";
import {ChatIdReq, Chats, Messages, UserIdReq} from "@/app/globalRedux/chats/types";

export const fetchAllChats = createAsyncThunk<Chats[],UserIdReq>(
    'posts/fetchAllChats', async (params) => {

        console.log('all chats req')
        const {data} = await axios.get<Chats[]>(`/chats/${params._id}`)
        console.log('all chats', data)
        return data;
    })
export const fetchOld_Messages = createAsyncThunk<Messages[],ChatIdReq>(
    'posts/fetchOld_Messages', async (params) => {

        console.log('old messages')
        const {data} = await axios.get<Messages[]>(`/messages/${params.chatId}`)
        console.log('old messages', data)
        return data;
    })