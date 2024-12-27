import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "@/app/chat_axios";
import {Chats, UserIdReq} from "@/app/globalRedux/chats/types";

export const fetchAllChats = createAsyncThunk<Chats[],UserIdReq>(
    'posts/fetchAllChats', async (params) => {

        console.log('all chats req')
        const {data} = await axios.get<Chats[]>(`/chats/${params._id}`)
        console.log('all chats', data)
        return data;
    })