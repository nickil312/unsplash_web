'use client';
import {createSlice} from '@reduxjs/toolkit';
import {
    DownloadHistoryPost,
    RolesForTable,
    Status,
    Users,
    UsersSliceState,
    UsersStatistics
} from "@/app/globalRedux/users/types";
import {fetchAllPosts} from "@/app/globalRedux/posts/asyncActions";
import {
    fetchAllUsersWithSearch,
    fetchAuth,
    fetchAuthMe, fetchCollectionsDetail, fetchGetDownloadHistory,
    fetchGetHireData, fetchGetPopularUsers, fetchGetUserDataAndDataAnotherUser,
    fetchRegister, fetchRolesDatabase, fetchUsersStatistics
} from "@/app/globalRedux/users/asyncActions";
import {RootState} from "@/app/globalRedux/store";
import {Collections, Posts} from "@/app/globalRedux/posts/types";

const initialState: UsersSliceState = {
    api_url: "http://172.20.10.2:4444",
    // api_url: "http://localhost:4444",
    // api_url: "http://192.168.145.235:4444",
    // api_url: "http://192.168.1.44:4444",
    // api_url: "http://192.168.0.33:4444",
    data: null,
    status: Status.LOADING,
    hireData:{
        items: null,
        status: Status.LOADING,
    },
    usersWithSearch:{
        items:{
            users: [],
            photoCount: "",
            usersCount: "",
            illustrationCount: "",
            collectionsCount: "",
        },
        status: Status.LOADING
    },
    download_history:{
        items:[],
        status:Status.LOADING
    },
    data_another_user:{
        items: null,
        status: Status.LOADING
    },
    popular_users:{
        items: null,
        status: Status.LOADING
    },
    userStatistics: {
        items:{
            usersStats:[],
            users:[]
        },
        status: Status.LOADING
    },
    rolesDatabase: {
        items: [],
        status: Status.LOADING
    },
    collectionsDetail: {
        items: {
            collections: null,
            posts:[]
        },
        status: Status.LOADING
    }
}
export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        clearUsersWithSearchCount(state) {
            state.usersWithSearch.items.photoCount = "";
            state.usersWithSearch.items.usersCount = "";
            state.usersWithSearch.items.illustrationCount = "";
            state.usersWithSearch.items.collectionsCount = "";
        },
        logout(state){
            state.data = null;
            localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllUsersWithSearch.pending, (state) => {
            state.usersWithSearch.status = Status.LOADING
            state.usersWithSearch.items.users = []
            // @ts-ignore
            state.usersWithSearch.items.usersCount = ""
            // @ts-ignore
            state.usersWithSearch.items.illustrationCount = ""
            // @ts-ignore
            state.usersWithSearch.items.photoCount = ""
// @ts-ignore
            state.usersWithSearch.items.collectionsCount = ""

            // state.usersWithSearch.items.last_three_posts = []

        });
        builder.addCase(fetchAllUsersWithSearch.fulfilled, (state, action) => {
            // @ts-ignore
            state.usersWithSearch.items.users = action.payload.posts
            // @ts-ignore
            state.usersWithSearch.items.usersCount = action.payload.usersCount
            // @ts-ignore
            state.usersWithSearch.items.illustrationCount = action.payload.illustrationCount
            // @ts-ignore
            state.usersWithSearch.items.photoCount = action.payload.photoCount
            // @ts-ignore
            state.usersWithSearch.items.collectionsCount = action.payload.collectionsCount
            state.usersWithSearch.status = Status.SUCCESS
            // state.usersWithSearch.items.last_three_posts = []

        });
        builder.addCase(fetchAllUsersWithSearch.rejected, (state) => {
            state.usersWithSearch.items.users = []
            // @ts-ignore
            state.usersWithSearch.items.usersCount = ""
            // @ts-ignore
            state.usersWithSearch.items.illustrationCount = ""
            // @ts-ignore
            state.usersWithSearch.items.photoCount = ""
// @ts-ignore
            state.usersWithSearch.items.collectionsCount = ""

            // state.usersWithSearch.items.last_three_posts = []
            state.usersWithSearch.status = Status.ERROR
        });
        builder.addCase(fetchAuth.pending, (state) => {
            state.status = Status.LOADING
            state.data = null;
        });
        builder.addCase(fetchAuth.fulfilled, (state, action) => {
            state.data = action.payload;
            console.log('action.payload',action.payload);
            console.log('data',state.data);
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchAuth.rejected, (state) => {
            state.data = null;
            state.status = Status.ERROR;
        });
        builder.addCase(fetchAuthMe.pending, (state) => {
            state.status = Status.LOADING
            state.data = null;
        });
        builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
            state.data = action.payload;
            // console.log('action.payload',action.payload);
            // console.log('data',state.data);
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchAuthMe.rejected, (state) => {
            state.data = null;
            state.status = Status.ERROR;
        });
        builder.addCase(fetchRegister.pending, (state) => {
            state.status = Status.LOADING
            state.data = null;
        });
        builder.addCase(fetchRegister.fulfilled, (state, action) => {
            state.data = action.payload;
            // console.log('action.payload',action.payload);
            // console.log('data',state.data);
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchRegister.rejected, (state) => {
            state.data = null;
            state.status = Status.ERROR;
        });
        builder.addCase(fetchGetDownloadHistory.pending, (state) => {
            state.download_history.status = Status.LOADING
            state.download_history.items = [];
        });
        builder.addCase(fetchGetDownloadHistory.fulfilled, (state, action) => {
            state.download_history.items = action.payload;
            // console.log('action.payload',action.payload);
            // console.log('data',state.data);
            state.download_history.status = Status.SUCCESS;
        });
        builder.addCase(fetchGetDownloadHistory.rejected, (state) => {
            state.download_history.items = [];
            state.download_history.status = Status.ERROR;
        });
        builder.addCase(fetchGetUserDataAndDataAnotherUser.pending, (state) => {
            state.data_another_user.status = Status.LOADING
            state.data_another_user.items = null;
        });
        builder.addCase(fetchGetUserDataAndDataAnotherUser.fulfilled, (state, action) => {
            state.data_another_user.items = action.payload;
            // console.log('action.payload',action.payload);
            // console.log('data',state.data);
            state.data_another_user.status = Status.SUCCESS;
        });
        builder.addCase(fetchGetUserDataAndDataAnotherUser.rejected, (state) => {
            state.data_another_user.items = null;
            state.data_another_user.status = Status.ERROR;
        });
        builder.addCase(fetchGetPopularUsers.pending, (state) => {
            state.popular_users.status = Status.LOADING
            state.popular_users.items = null;
        });
        builder.addCase(fetchGetPopularUsers.fulfilled, (state, action) => {
            // @ts-ignore
            state.popular_users.items = action.payload;
            // console.log('action.payload',action.payload);
            // console.log('data',state.data);
            state.popular_users.status = Status.SUCCESS;
        });
        builder.addCase(fetchGetPopularUsers.rejected, (state) => {
            state.popular_users.items = null;
            state.popular_users.status = Status.ERROR;
        });
        builder.addCase(fetchUsersStatistics.pending, (state) => {
            state.userStatistics.status = Status.LOADING
            state.userStatistics.items.users = [];
            state.userStatistics.items.usersStats = [];
        });
        builder.addCase(fetchUsersStatistics.fulfilled, (state, action) => {
            // @ts-ignore
            state.userStatistics.items.users = action.payload.users;
            // @ts-ignore
            state.userStatistics.items.usersStats = action.payload.usersStats;
            state.userStatistics.status = Status.SUCCESS;
        });
        builder.addCase(fetchUsersStatistics.rejected, (state) => {
            state.userStatistics.items.users = [];
            state.userStatistics.items.usersStats = [];
            state.userStatistics.status = Status.ERROR;
        });
        builder.addCase(fetchRolesDatabase.pending, (state) => {
            state.rolesDatabase.status = Status.LOADING
            state.rolesDatabase.items = [];
        });
        builder.addCase(fetchRolesDatabase.fulfilled, (state, action) => {
            state.rolesDatabase.items = action.payload;
            state.rolesDatabase.status = Status.SUCCESS;
        });
        builder.addCase(fetchRolesDatabase.rejected, (state) => {
            state.rolesDatabase.items = [];
            state.rolesDatabase.status = Status.ERROR;
        });
        builder.addCase(fetchCollectionsDetail.pending, (state) => {
            state.collectionsDetail.status = Status.LOADING
            state.collectionsDetail.items.collections = null;
            state.collectionsDetail.items.posts = [];
        });
        builder.addCase(fetchCollectionsDetail.fulfilled, (state, action) => {
            // @ts-ignore
            state.collectionsDetail.items.collections = action.payload.collection;
            // @ts-ignore
            state.collectionsDetail.items.posts = action.payload.posts;
            state.collectionsDetail.status = Status.SUCCESS;
        });
        builder.addCase(fetchCollectionsDetail.rejected, (state) => {
            state.collectionsDetail.items.collections = null;
            state.collectionsDetail.items.posts = [];
            state.collectionsDetail.status = Status.ERROR;
        });
    },
})
export const {clearUsersWithSearchCount,logout} = usersSlice.actions;
export default usersSlice.reducer;




