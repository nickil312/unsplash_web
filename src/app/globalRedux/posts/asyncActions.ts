import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axois";
import {
    Ban_Post,
    Banned_Params,
    CollectionAddImageProps,
    CollectionCreateForm,
    CollectionDeleteOrRecoverForm, CollectionPostsDatabase,
    Collections,
    CollectionUpdateForm,
    DeleteId,
    ImageAddToCollectionProps, Logs,
    Posts,
    PostsIdProps,
    PostsIdPropsForStatistics,
    PostsStatistics, ReportCreateForm, ReportDetail,
    ReportsDatabase,
    SearchAndSortParams,
    UserPosts_Likes_coll_Params,
    ViewsLikes,
} from "@/app/globalRedux/posts/types";
import {FormData} from "@/app/[lang]/(photos & illustrations)/photos/create/CreateForm";
import {ReportsCardProps} from "@/app/components/Cards/ReportsCard";
export const fetchAllPosts = createAsyncThunk<Posts[], SearchAndSortParams>(
    'posts/fetchAllPosts', async (params) => {
        const {
            searchtext,
            page,
            role_id,
            category,
            sort,
            posttype,
            orientation,
            license,
            limit,

        } = params
        console.log('all posts params',params)

        const {data} = await axios.get<Posts[]>(`/postgresql/posts/?page=${page}&role_id=0&searchtext=&posttype=${posttype}&category=&sort=${sort}&license=${license}&orientation=${orientation}&limit=${limit}&search=false`)
    console.log('all posts', data)
    return data;
})
export const fetchAllPostsWithSearch = createAsyncThunk<Posts[], SearchAndSortParams>(
    'posts/fetchAllPostsWithSearch',
    async (params) => {
        const {
            searchtext,
            page,
            role_id,
            license,
            orientation,
            limit,
            sort,
            posttype,
        } = params
        console.log(params)
    const {data} = await axios.get<Posts[]>(`/postgresql/posts/?page=${page}&role_id=0&searchtext=${searchtext}&posttype=${posttype}&category=&sort=${sort}&license=${license}&orientation=${orientation}&limit=${limit}&search=true`)
    console.log('all posts with search', data)
    return data;
})
export const fetchAllPostsWithCategory = createAsyncThunk<Posts[], SearchAndSortParams>(
    'posts/fetchAllPostsWithCategory',
    async (params) => {
        const {
            searchtext,
            page,
            category,
            role_id,
            license,
            orientation,
            limit,
            sort,
            posttype,
        } = params
        console.log(params)
        const {data} = await axios.get<Posts[]>(`/postgresql/posts/?page=${page}&role_id=0&searchtext=&posttype=${posttype}&category=${category}&sort=${sort}&license=${license}&orientation=${orientation}&limit=${limit}&search=false`)
        console.log('all posts with categories', data)
        return data;
    })
export const fetchOnePost = createAsyncThunk<Posts, PostsIdProps>(
    'posts/fetchOnePost',
    async (params) => {
        const {
            _id,
            user_id,
        } = params
        console.log(params)
        const {data} = await axios.get<Posts>(`/postgresql/posts/detail/${_id}?user_id=${params.user_id}`);
        console.log('one post', data)
        return data;
    })
export const fetchPosts_Likes_coll_another_user = createAsyncThunk<Posts[], UserPosts_Likes_coll_Params>(
    'posts/fetchPosts_Likes_coll_another_user',
    async (params) => {
        const {
            bdType,
            page,
            userIdAccViewed
        } = params
        console.log(params)
        const {data} = await axios.get<Posts[]>(`/postgresql/posts/user/?page=${page}&bdType=${bdType}&userIdAccViewed=${userIdAccViewed}`)
        console.log('user posts likes coll', data)
        return data;
    })
export const fetchCreatePost = createAsyncThunk<Posts[], FormData>(
    'posts/fetchCreatePost',
    async (params) => {

        console.log(params)
        const {data} = await axios.post<Posts[]>(`/postgresql/posts/`,params)
        console.log('create posts ', data)
        return data;
    })
export const fetchUpdatePost = createAsyncThunk<Posts[], FormData>(
    'posts/fetchUpdatePost',
    async (params) => {

        console.log(params)
        const {data} = await axios.patch<Posts[]>(`/postgresql/posts/${params._id}`,params)
        console.log('update posts ', data)
        return data;
    })
export const fetchDeletePost = createAsyncThunk<Posts[], DeleteId>(
    'posts/fetchDeletePost',
    async (params) => {

        console.log(params)
        const {data} = await axios.delete<Posts[]>(`/postgresql/posts/${params._id}`)
        console.log('update posts ', data)
        return data;
    })
export const fetchBannedPosts = createAsyncThunk<Posts[], Banned_Params>(
    'posts/fetchBannedPosts',
    async (params) => {

        console.log(params)
        const {data} = await axios.get<Posts[]>(`/postgresql/posts/ban_post/get/?page=${params.page}`)
        console.log('banned posts ', data)
        return data;
    });
export const fetchBanPost = createAsyncThunk<Posts[], Ban_Post>(
    'posts/fetchBanPost',
    async (params) => {

        console.log(params)
        const {data} = await axios.patch<Posts[]>(`/postgresql/posts/ban_post/update`,params)
        console.log('ban post ', data)
        return data;
    })
export const fetchUnBanPost = createAsyncThunk<Posts[], Ban_Post>(
    'posts/fetchUnBanPost',
    async (params) => {

        console.log(params)
        const {data} = await axios.patch<Posts[]>(`/postgresql/posts/unban_post/${params._id}`,params)
        console.log('ban post ', data)
        return data;
    })
export const fetchPostStatistics = createAsyncThunk<PostsStatistics[], PostsIdPropsForStatistics>(
    'posts/fetchPostStatistics',
    async (params) => {

        console.log(params)
        const {data} = await axios.get<PostsStatistics[]>(`/postgresql/posts/detail/statistics/${params._id}`)
        console.log('statistics post ', data)
        return data;
    })
export const fetchPostsDatabase = createAsyncThunk<Posts[]>(
    'posts/fetchPostsDatabase',
    async () => {

        // console.log(params)
        const {data} = await axios.get<Posts[]>(`/postgresql/database/posts`)
        console.log('database post ', data)
        return data;
    })
export const fetchReportsDatabase = createAsyncThunk<ReportsDatabase[]>(
    'posts/fetchReportsDatabase',
    async () => {

        // console.log(params)
        const {data} = await axios.get<ReportsDatabase[]>(`/postgresql/database/reports`)
        console.log('database reports ', data)
        return data;
    })
export const fetchLikesViewsDatabase = createAsyncThunk<ViewsLikes[]>(
    'posts/fetchLikesViewsDatabase',
    async () => {

        // console.log(params)
        const {data} = await axios.get<ViewsLikes[]>(`/postgresql/database/likesviews`)
        console.log('database likesViews ', data)
        return data;
    });
export const fetchAllCollectionsDatabase = createAsyncThunk<Collections[]>(
    'posts/fetchAllCollectionsDatabase',
    async () => {

        // console.log(params)
        const {data} = await axios.get<Collections[]>(`/postgresql/database/collections`)
        console.log('database all collections ', data)
        return data;
    });
export const fetchCollectionsPostsDatabase = createAsyncThunk<CollectionPostsDatabase[]>(
    'posts/fetchCollectionsPostsDatabase',
    async () => {

        // console.log(params)
        const {data} = await axios.get<CollectionPostsDatabase[]>(`/postgresql/database/collectionsposts`)
        console.log('database  collections posts', data)
        return data;
    });
export const fetchLogsDatabase = createAsyncThunk<Logs[]>(
    'posts/fetchLogsDatabase',
    async () => {

        // console.log(params)
        const {data} = await axios.get<Logs[]>(`/postgresql/database/logs`)
        console.log('database  logs', data)
        return data;
    });
export const fetchReportedPosts = createAsyncThunk<ReportsCardProps[],Banned_Params>(
    'posts/fetchReportedPosts',
    async (params) => {

        // console.log(params)
        const {data} = await axios.get<ReportsCardProps[]>(`/postgresql/posts/report/?page=${params.page}`)
        console.log('reported posts', data)
        return data;
    });
export const fetchReportedPostsDetail = createAsyncThunk<ReportDetail[],DeleteId>(
    'posts/fetchReportedPostsDetail',
    async (params) => {

        // console.log(params)
        const {data} = await axios.get<ReportDetail[]>(`/postgresql/posts/report/${params._id}`)
        console.log('reported posts detail', data)
        return data;
    });
export const fetchCreateReportForPost = createAsyncThunk<ReportCreateForm[],ReportCreateForm>(
    'posts/fetchCreateReportForPost',
    async (params) => {

        const {data} = await axios.post<ReportCreateForm[]>(`/postgresql/posts/report/${params.post_id}`,params)
        console.log('create report for post', data)
        return data;
    });
export const fetchCollectionsWithSearch = createAsyncThunk<Collections[],SearchAndSortParams>(
    'posts/fetchCollectionsWithSearch',
    async (params) => {
        const {
            searchtext,
            page,
            role_id,
            license,
            orientation,
            limit,
            sort,
            posttype,
        } = params
        console.log(params)
        // console.log(params)
        const {data} = await axios.get<Collections[]>(`/postgresql/collections/?search=true&searchtext=${searchtext}&limit=${limit}&page=${page}`)
        console.log('Collection search', data)
        return data;
    });
export const fetchCollectionsForAddImage = createAsyncThunk<Collections[],CollectionAddImageProps>(
    'posts/fetchCollectionsForAddImage',
    async (params) => {
        const {
            post_id,
            userIdAccViewed
        } = params
        // console.log(params)
        // console.log(params)
        const {data} = await axios.get<Collections[]>(`/postgresql/posts/user?page=0&bdType=collections&userIdAccViewed=${userIdAccViewed}&post_id=${post_id}`)
        console.log('Collections for add image', data)
        return data;
    });
export const fetchAddImageToCollection = createAsyncThunk<Collections[],ImageAddToCollectionProps>(
    'posts/fetchAddImageToCollection',
    async (params) => {

        const {data} = await axios.patch<Collections[]>(`/postgresql/collections`,params)
        console.log('Add/minus image to collection', data)
        return data;
    });
export const fetchCreateCollection = createAsyncThunk<Collections[],CollectionCreateForm>(
    'posts/fetchCreateCollection',
    async (params) => {

        const {data} = await axios.post<Collections[]>(`/postgresql/collections`,params)
        console.log('create collection', data)
        return data;
    });
export const fetchUpdateCollection = createAsyncThunk<Collections[],CollectionUpdateForm>(
    'posts/fetchUpdateCollection',
    async (params) => {

        const {data} = await axios.patch<Collections[]>(`/postgresql/collections/${params.id}`,params)
        console.log('update collection', data)
        return data;
    });
export const fetchDeleteOrRecoverCollection = createAsyncThunk<Collections[],CollectionDeleteOrRecoverForm>(
    'posts/fetchDeleteOrRecoverCollection',
    async (params) => {

        const {data} = await axios.delete<Collections[]>(`/postgresql/collections/${params.id}?recover=${params.recover}`)
        console.log('update collection', data)
        return data;
    });