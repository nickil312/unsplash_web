'use client'

import {ChatsSliceState} from "@/app/globalRedux/chats/types";
import {Status} from "@/app/globalRedux/posts/types";
import {createSlice} from "@reduxjs/toolkit";
import {
    fetchAllChats,
    fetchChatDetail,
    fetchOld_Messages,
    fetchUsersForAdd
} from "@/app/globalRedux/chats/asyncActions";

const initialState: ChatsSliceState = {
    api_url: "http://localhost:4444",
    chat_info: null,
    chat_detail:null,
    chatsAll: {
        items: [],
        status: Status.LOADING
    },
    chat_old_Messages:{
        items: [],
        status: Status.LOADING
    },
    users_for_add:{
        items: [],
        status: Status.LOADING
    },

}
export const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        saveChat_info(state,action) {
            state.chat_info = action.payload;
        },
        crearChatOldMessages(state) {
            state.chat_old_Messages.items = []
        }
    },
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
        builder.addCase(fetchUsersForAdd.pending, (state) => {
            state.users_for_add.status = Status.LOADING
            state.users_for_add.items = []
        });
        builder.addCase(fetchUsersForAdd.fulfilled, (state, action) => {
            // @ts-ignore
            state.users_for_add.items = action.payload.posts
            state.users_for_add.status = Status.SUCCESS
        });
        builder.addCase(fetchUsersForAdd.rejected, (state) => {
            state.users_for_add.items = []
            state.users_for_add.status = Status.ERROR
        });
        builder.addCase(fetchChatDetail.pending, (state) => {
            state.chat_detail = null
        });
        builder.addCase(fetchChatDetail.fulfilled, (state, action) => {
            state.chat_detail = action.payload
        });
        builder.addCase(fetchChatDetail.rejected, (state) => {
            state.chat_detail = null
        });
    },
})
export const {saveChat_info,crearChatOldMessages} = chatsSlice.actions;

export default chatsSlice.reducer;