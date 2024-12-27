'use client'

import {ChatsSliceState} from "@/app/globalRedux/chats/types";
import {Status} from "@/app/globalRedux/posts/types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchAllChats, fetchOld_Messages} from "@/app/globalRedux/chats/asyncActions";

const initialState: ChatsSliceState = {
    api_url: "http://localhost:4444",
    chatsAll: {
        items: [],
        status: Status.LOADING
    },
    chat_old_Messages:{
        items: [],
        status: Status.LOADING
    }
}
export const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllChats.pending, (state) => {
            state.chatsAll.status = Status.LOADING
            state.chatsAll.items = []
        });
        builder.addCase(fetchAllChats.fulfilled, (state, action) => {
            state.chatsAll.items = action.payload
            state.chatsAll.status = Status.SUCCESS
        });
        builder.addCase(fetchAllChats.rejected, (state) => {
            state.chatsAll.items = []
            state.chatsAll.status = Status.ERROR
        });
        builder.addCase(fetchOld_Messages.pending, (state) => {
            state.chat_old_Messages.status = Status.LOADING
            state.chat_old_Messages.items = []
        });
        builder.addCase(fetchOld_Messages.fulfilled, (state, action) => {
            state.chat_old_Messages.items = action.payload
            state.chat_old_Messages.status = Status.SUCCESS
        });
        builder.addCase(fetchOld_Messages.rejected, (state) => {
            state.chat_old_Messages.items = []
            state.chat_old_Messages.status = Status.ERROR
        });
    },
})

export default chatsSlice.reducer;