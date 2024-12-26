'use client';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
    Collections,
    LikeAction, Logs,
    Posts,
    PostsSliceState,
    PostsStatistics,
    PostsStatisticsLikes, PostsStatisticsViews, ReportDetail, ReportsDatabase,
    Status, ViewsLikes,
} from "@/app/globalRedux/posts/types";
import {
    fetchAllCollectionsDatabase,
    fetchAllPosts,
    fetchAllPostsWithCategory,
    fetchAllPostsWithSearch,
    fetchBannedPosts,
    fetchCollectionsForAddImage, fetchCollectionsPostsDatabase,
    fetchCollectionsWithSearch,
    fetchLikesViewsDatabase, fetchLogsDatabase,
    fetchOnePost,
    fetchPosts_Likes_coll_another_user,
    fetchPostsDatabase,
    fetchPostStatistics, fetchReportedPosts, fetchReportedPostsDetail,
    fetchReportsDatabase
} from "@/app/globalRedux/posts/asyncActions";
import {string} from "prop-types";
import {ReportsCardProps} from "@/app/components/Cards/ReportsCard";


const initialState: PostsSliceState = {
    theme: false,
    // api_url: "http://192.168.0.33:4444",
    api_url: "http://172.20.10.2:4444",
    // api_url: "http://localhost:4444",
    // api_url: "http://172.20.10.5:4444",
    // api_url: "http://192.168.145.235:4444",
    posts: {
        items: [],
        status: Status.LOADING,
    },
    postsWithCategory: {
        items: [],
        status: Status.LOADING,
    },
    onePost: {
        items: null,
        status: Status.LOADING,
    },
    postsWithSearch: {
        items: {
            posts: [],
            photoCount: "",
            usersCount: "",
            illustrationCount: "",
            collectionsCount: ""
        },
        status: Status.LOADING,
    },
    collectionsWithSearch:{
        items: {
            posts: [],
            photoCount: "",
            usersCount: "",
            collectionsCount: "",
            illustrationCount: "",
        },
        status: Status.LOADING
    },
    posts_another_user: {
        items: {
            posts: [],
            collections: [],
            photoCount: "",
            likesCount: "",
            collectionsCount: "",
        },
        status: Status.LOADING,
    },
    postsBanned: {
        items: [],
        status: Status.LOADING
    },
    postStatistics: {
        items: {
            likes: [],
            views: [],
        },
        status: Status.LOADING
    },
    DatabasePosts: {
        items: [],
        status: Status.LOADING
    },
    DatabaseReports: {
        items: [],
        status: Status.LOADING
    },
    DatabaseViewsLikes: {
        items: [],
        status: Status.LOADING
    },
    DatabaseAllCollections: {
        items: [],
        status: Status.LOADING
    },
    DatabaseCollectionsPosts: {
        items: [],
        status: Status.LOADING
    },
    DatabaseLogs: {
        items: [],
        status: Status.LOADING
    },
    CollectionsForAddImage: {
        items:[],
        status: Status.LOADING
    },
    ReportPosts: {
        items:[],
        status: Status.LOADING
    },
    ReportPostsDetail:{
        items:[],
        status: Status.LOADING
    }
}


export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        clearPostsWithSearchCount(state) {
            state.postsWithSearch.items.photoCount = "";
            state.postsWithSearch.items.usersCount = "";
            state.postsWithSearch.items.illustrationCount = "";
            state.postsWithSearch.items.collectionsCount = "";
        },
        changeTheme: (state) => {
            state.theme = !state.theme;
        },
        //не работает страница в кеше храниться и нужно как будто кеш менять
        DynamicChangeLikeIcon: (state, action: LikeAction) => {
            const {_id, liked} = action.payload;
            console.log(_id, liked);
            const postIndex = state.posts.items.findIndex((post) => post._id === _id);
            if (postIndex !== -1) {
                state.posts.items[postIndex].likedByUser = liked;
            }
            console.log(state.posts.items[postIndex].likedByUser);
            return state;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllPosts.pending, (state) => {
            state.posts.status = Status.LOADING
            state.posts.items = []
        });
        builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
            state.posts.items = action.payload
            state.posts.status = Status.SUCCESS
        });
        builder.addCase(fetchAllPosts.rejected, (state) => {
            state.posts.items = []
            state.posts.status = Status.ERROR
        });
        builder.addCase(fetchAllPostsWithCategory.pending, (state) => {
            state.postsWithCategory.status = Status.LOADING
            state.postsWithCategory.items = []
        });
        builder.addCase(fetchAllPostsWithCategory.fulfilled, (state, action) => {
            state.postsWithCategory.items = action.payload
            state.postsWithCategory.status = Status.SUCCESS
        });
        builder.addCase(fetchAllPostsWithCategory.rejected, (state) => {
            state.postsWithCategory.items = []
            state.postsWithCategory.status = Status.ERROR
        });
        builder.addCase(fetchOnePost.pending, (state) => {
            state.onePost.status = Status.LOADING
            state.onePost.items = null;
        });
        builder.addCase(fetchOnePost.fulfilled, (state, action) => {
            state.onePost.items = action.payload
            state.onePost.status = Status.SUCCESS
        });
        builder.addCase(fetchOnePost.rejected, (state) => {
            state.onePost.items = null
            state.onePost.status = Status.ERROR
        });
        builder.addCase(fetchBannedPosts.pending, (state) => {
            state.postsBanned.status = Status.LOADING
            state.postsBanned.items = [];
        });
        builder.addCase(fetchBannedPosts.fulfilled, (state, action) => {
            state.postsBanned.items = action.payload
            state.postsBanned.status = Status.SUCCESS
        });
        builder.addCase(fetchBannedPosts.rejected, (state) => {
            state.postsBanned.items = []
            state.postsBanned.status = Status.ERROR
        });

        builder.addCase(fetchAllPostsWithSearch.pending, (state) => {
            state.postsWithSearch.status = Status.LOADING
            state.postsWithSearch.items.posts = []
            state.postsWithSearch.items.photoCount = ""
            state.postsWithSearch.items.usersCount = ""
            state.postsWithSearch.items.illustrationCount = ""
            state.postsWithSearch.items.collectionsCount = ""
        });
        builder.addCase(fetchAllPostsWithSearch.fulfilled, (state, action) => {
            // if (state.postsWithSearch.items.length === 0) {
            //
            //     console.log("items.length чистый")
// @ts-ignore
            state.postsWithSearch.items.posts = action.payload.posts
            // @ts-ignore
            state.postsWithSearch.items.photoCount = action.payload.photoCount
            // @ts-ignore
            state.postsWithSearch.items.usersCount = action.payload.usersCount
            // @ts-ignore
            state.postsWithSearch.items.illustrationCount = action.payload.illustrationCount
// @ts-ignore
            state.postsWithSearch.items.collectionsCount = action.payload.collectionsCount

            state.postsWithSearch.status = Status.SUCCESS
            // console.log("action", action.payload)
            // console.log("action posts", action.payload.posts)
            // console.log("action postsCount", action.payload.postsCount)

            // } else {
            //     console.log("items.length грязный")
            //     state.postsWithSearch.items = [...state.postsWithSearch.items, ...action.payload];
            //     state.postsWithSearch.status = Status.SUCCESS
            // }

            // state.postsWithSearch.items = action.payload
        });
        builder.addCase(fetchAllPostsWithSearch.rejected, (state) => {
            state.postsWithSearch.items.posts = []
            state.postsWithSearch.items.photoCount = ""
            state.postsWithSearch.items.usersCount = ""
            state.postsWithSearch.items.illustrationCount = ""
            state.postsWithSearch.items.collectionsCount = ""
            state.postsWithSearch.status = Status.ERROR
        });
        builder.addCase(fetchPosts_Likes_coll_another_user.pending, (state) => {
            state.posts_another_user.status = Status.LOADING
            state.posts_another_user.items.posts = []
            state.posts_another_user.items.collections = []
            state.posts_another_user.items.photoCount = ""
            state.posts_another_user.items.likesCount = ""
            state.posts_another_user.items.collectionsCount = ""
            // state.posts_another_user.items.illustrationCount = ""
        });
        builder.addCase(fetchPosts_Likes_coll_another_user.fulfilled, (state, action) => {
            // if (state.postsWithSearch.items.length === 0) {
            //
            //     console.log("items.length чистый")


            // @ts-ignore
            state.posts_another_user.items.posts = action.payload.posts || [];
            console.log(state.posts_another_user.items.posts)
// @ts-ignore
            state.posts_another_user.items.collections = action.payload.collections || [];
            console.log(state.posts_another_user.items.collections)

            // @ts-ignore
            state.posts_another_user.items.photoCount = action.payload.photoCount
            // @ts-ignore
            state.posts_another_user.items.likesCount = action.payload.likesCount
// @ts-ignore
            state.posts_another_user.items.collectionsCount = action.payload.collectionsCount

            state.posts_another_user.status = Status.SUCCESS
            // console.log("action", action.payload)
            // console.log("action posts", action.payload.posts)
            // console.log("action postsCount", action.payload.postsCount)

            // } else {
            //     console.log("items.length грязный")
            //     state.postsWithSearch.items = [...state.postsWithSearch.items, ...action.payload];
            //     state.postsWithSearch.status = Status.SUCCESS
            // }

            // state.postsWithSearch.items = action.payload
        });
        builder.addCase(fetchPosts_Likes_coll_another_user.rejected, (state) => {
            state.posts_another_user.items.posts = []
            state.posts_another_user.items.collections = []
            state.posts_another_user.items.photoCount = ""
            state.posts_another_user.items.likesCount = ""
            state.posts_another_user.items.collectionsCount = ""
            // state.posts_another_user.items.illustrationCount = ""
            state.posts_another_user.status = Status.ERROR
        });


        builder.addCase(fetchCollectionsWithSearch.pending, (state) => {
            state.collectionsWithSearch.status = Status.LOADING
            state.collectionsWithSearch.items.posts = []
            state.collectionsWithSearch.items.photoCount = ""
            state.collectionsWithSearch.items.usersCount = ""
            state.collectionsWithSearch.items.collectionsCount = ""
            state.collectionsWithSearch.items.illustrationCount = ""
        });
        builder.addCase(fetchCollectionsWithSearch.fulfilled, (state, action) => {
            // if (state.postsWithSearch.items.length === 0) {
            //
            //     console.log("items.length чистый")


            // @ts-ignore
            state.collectionsWithSearch.items.posts = action.payload.posts;


            // @ts-ignore
            state.collectionsWithSearch.items.photoCount = action.payload.photoCount
            // @ts-ignore
            state.collectionsWithSearch.items.usersCount = action.payload.usersCount
// @ts-ignore
            state.collectionsWithSearch.items.collectionsCount = action.payload.collectionsCount
            // @ts-ignore
            state.collectionsWithSearch.items.illustrationCount = action.payload.illustrationCount

            state.collectionsWithSearch.status = Status.SUCCESS
            // console.log("action", action.payload)
            // console.log("action posts", action.payload.posts)
            // console.log("action postsCount", action.payload.postsCount)

            // } else {
            //     console.log("items.length грязный")
            //     state.postsWithSearch.items = [...state.postsWithSearch.items, ...action.payload];
            //     state.postsWithSearch.status = Status.SUCCESS
            // }

            // state.postsWithSearch.items = action.payload
        });
        builder.addCase(fetchCollectionsWithSearch.rejected, (state) => {
            state.collectionsWithSearch.items.posts = []
            state.collectionsWithSearch.items.photoCount = ""
            state.collectionsWithSearch.items.usersCount = ""
            state.collectionsWithSearch.items.collectionsCount = ""
            state.collectionsWithSearch.items.illustrationCount = ""
            state.collectionsWithSearch.status = Status.ERROR
        });

        builder.addCase(fetchPostStatistics.pending, (state) => {
            state.postStatistics.status = Status.LOADING
            state.postStatistics.items.views = [];
            state.postStatistics.items.likes = [];
        });
        builder.addCase(fetchPostStatistics.fulfilled, (state, action) => {
            // @ts-ignore
            state.postStatistics.items.views = action.payload.views
            // @ts-ignore
            state.postStatistics.items.likes = action.payload.likes
            state.postStatistics.status = Status.SUCCESS
        });
        builder.addCase(fetchPostStatistics.rejected, (state) => {
            state.postStatistics.items.likes = []
            state.postStatistics.items.views = []
            state.postStatistics.status = Status.ERROR
        });
        builder.addCase(fetchPostsDatabase.pending, (state) => {
            state.DatabasePosts.status = Status.LOADING
            state.DatabasePosts.items = [];
        });
        builder.addCase(fetchPostsDatabase.fulfilled, (state, action) => {
            state.DatabasePosts.items = action.payload
            state.DatabasePosts.status = Status.SUCCESS
        });
        builder.addCase(fetchPostsDatabase.rejected, (state) => {
            state.DatabasePosts.items = []
            state.DatabasePosts.status = Status.ERROR
        });
        builder.addCase(fetchReportsDatabase.pending, (state) => {
            state.DatabaseReports.status = Status.LOADING
            state.DatabaseReports.items = [];
        });
        builder.addCase(fetchReportsDatabase.fulfilled, (state, action) => {
            state.DatabaseReports.items = action.payload
            state.DatabaseReports.status = Status.SUCCESS
        });
        builder.addCase(fetchReportsDatabase.rejected, (state) => {
            state.DatabaseReports.items = []
            state.DatabaseReports.status = Status.ERROR
        });
        builder.addCase(fetchLikesViewsDatabase.pending, (state) => {
            state.DatabaseViewsLikes.status = Status.LOADING
            state.DatabaseViewsLikes.items = [];
        });
        builder.addCase(fetchLikesViewsDatabase.fulfilled, (state, action) => {
            state.DatabaseViewsLikes.items = action.payload
            state.DatabaseViewsLikes.status = Status.SUCCESS
        });
        builder.addCase(fetchLikesViewsDatabase.rejected, (state) => {
            state.DatabaseViewsLikes.items = []
            state.DatabaseViewsLikes.status = Status.ERROR
        });
        builder.addCase(fetchAllCollectionsDatabase.pending, (state) => {
            state.DatabaseAllCollections.status = Status.LOADING
            state.DatabaseAllCollections.items = [];
        });
        builder.addCase(fetchAllCollectionsDatabase.fulfilled, (state, action) => {
            state.DatabaseAllCollections.items = action.payload
            state.DatabaseAllCollections.status = Status.SUCCESS
        });
        builder.addCase(fetchAllCollectionsDatabase.rejected, (state) => {
            state.DatabaseAllCollections.items = []
            state.DatabaseAllCollections.status = Status.ERROR
        });
        builder.addCase(fetchCollectionsPostsDatabase.pending, (state) => {
            state.DatabaseCollectionsPosts.status = Status.LOADING
            state.DatabaseCollectionsPosts.items = [];
        });
        builder.addCase(fetchCollectionsPostsDatabase.fulfilled, (state, action) => {
            state.DatabaseCollectionsPosts.items = action.payload
            state.DatabaseCollectionsPosts.status = Status.SUCCESS
        });
        builder.addCase(fetchCollectionsPostsDatabase.rejected, (state) => {
            state.DatabaseCollectionsPosts.items = []
            state.DatabaseCollectionsPosts.status = Status.ERROR
        });
        builder.addCase(fetchLogsDatabase.pending, (state) => {
            state.DatabaseLogs.status = Status.LOADING
            state.DatabaseLogs.items = [];
        });
        builder.addCase(fetchLogsDatabase.fulfilled, (state, action) => {
            state.DatabaseLogs.items = action.payload
            state.DatabaseLogs.status = Status.SUCCESS
        });
        builder.addCase(fetchLogsDatabase.rejected, (state) => {
            state.DatabaseLogs.items = []
            state.DatabaseLogs.status = Status.ERROR
        });
        builder.addCase(fetchCollectionsForAddImage.pending, (state) => {
            state.CollectionsForAddImage.status = Status.LOADING
            state.CollectionsForAddImage.items = [];
        });
        builder.addCase(fetchCollectionsForAddImage.fulfilled, (state, action) => {
            state.CollectionsForAddImage.items = action.payload
            state.CollectionsForAddImage.status = Status.SUCCESS
        });
        builder.addCase(fetchCollectionsForAddImage.rejected, (state) => {
            state.CollectionsForAddImage.items = []
            state.CollectionsForAddImage.status = Status.ERROR
        });
        builder.addCase(fetchReportedPosts.pending, (state) => {
            state.ReportPosts.status = Status.LOADING
            state.ReportPosts.items = [];
        });
        builder.addCase(fetchReportedPosts.fulfilled, (state, action) => {
            state.ReportPosts.items = action.payload
            state.ReportPosts.status = Status.SUCCESS
        });
        builder.addCase(fetchReportedPosts.rejected, (state) => {
            state.ReportPosts.items = []
            state.ReportPosts.status = Status.ERROR
        });
        builder.addCase(fetchReportedPostsDetail.pending, (state) => {
            state.ReportPostsDetail.status = Status.LOADING
            state.ReportPostsDetail.items = [];
        });
        builder.addCase(fetchReportedPostsDetail.fulfilled, (state, action) => {
            state.ReportPostsDetail.items = action.payload
            state.ReportPostsDetail.status = Status.SUCCESS
        });
        builder.addCase(fetchReportedPostsDetail.rejected, (state) => {
            state.ReportPostsDetail.items = []
            state.ReportPostsDetail.status = Status.ERROR
        });
    },
})
export const {changeTheme, clearPostsWithSearchCount, DynamicChangeLikeIcon} = postsSlice.actions;
export default postsSlice.reducer;