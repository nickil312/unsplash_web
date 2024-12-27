'use client'

import {ChatsSliceState} from "@/app/globalRedux/chats/types";
import {Status} from "@/app/globalRedux/posts/types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchAllChats} from "@/app/globalRedux/chats/asyncActions";

const initialState: ChatsSliceState = {
    api_url: "http://localhost:4444",
    chatsAll: {
        items: [],
        status: Status.LOADING
    },
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
    },
})

export default chatsSlice.reducer;