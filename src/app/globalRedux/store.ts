'use client';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import postsReducer from './posts/slice'
import usersReducer from './users/slice'
import chatsReducer from './chats/slice'
export const store = configureStore({
    reducer:{
        posts: postsReducer,
        users: usersReducer,
        chats: chatsReducer
    }
})
export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = ReturnType<typeof store.dispatch>;
export type AppDispatch = typeof store.dispatch;