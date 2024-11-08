import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axois";
import {Posts, PostsStatistics, SearchAndSortParams} from "@/app/globalRedux/posts/types";
import {
    AccountEditProfile, CollectionsDetail, DownloadHistoryPost, DownloadHistoryPostReq,
    EmailCheckProps,
    LoginData, NewUserImage, PasswordChangeInAccountProps,
    PasswordChangeProps, PasswordChangePropsWiwh, PopularUsers,
    RegData, RolesForTable,
    TokenCheckState, UserHire, UserIdForSend,
    Users, UsersStatistics
} from "@/app/globalRedux/users/types";
export const fetchAllUsersWithSearch = createAsyncThunk<Users[], SearchAndSortParams>(
    'users/fetchAllUsersWithSearch',
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
        const {data} = await axios.get<Users[]>(`/userpostgresql/auth/?searchtext=${searchtext}&limit=${limit}&page=${page}&search=true`)
        console.log('all users with search', data)
        return data;
    });
export const fetchAuth = createAsyncThunk<Users,LoginData>(
    'users/fetchAuth',
    async (params) => {
        console.log("auth params",params)
        const {data} = await axios.post<Users>(`/userpostgresql/auth/login`,params)
        console.log('user auth', data)

        if (data.token) {
            localStorage.setItem('token', data.token);
            console.log("data token",data.token)
        }
        return data;
    });
export const fetchAuthMe = createAsyncThunk<Users>(
    'users/fetchAuthMe',
    async () => {
        const {data} = await axios.get<Users>(`/userpostgresql/auth/me`)
        console.log('user auth me', data)
        return data;
    });
export const fetchRegister = createAsyncThunk<Users,RegData>(
    'users/fetchRegister',
    async (values) => {
        console.log(values)
        const {data} = await axios.post<Users>(`/userpostgresql/auth/register`,values)
        console.log('user register', data)
        return data;
    });

export const fetchRecover_pass_CheckEmail = createAsyncThunk<Users,EmailCheckProps>(
    'users/fetchRecover_pass_CheckEmail',
    async (values) => {
        console.log(values)
        console.log(values)
        const {data} = await axios.post<Users>(`/userpostgresql/auth/recover_password/check_email`,values)
        console.log('user check email', data)
        return data;
    });
export const fetchRecover_pass_Get_Token = createAsyncThunk<Users,TokenCheckState>(
    'users/fetchRecover_pass_Get_Token',
    async (values) => {
        console.log(values)
        console.log(values)
        const {data} = await axios.post<Users>(`/userpostgresql/auth/recover_password/get_token`,values)
        console.log('user check email', data)
        return data;
    });
export const fetchRecover_pass_change_password = createAsyncThunk<Users,PasswordChangePropsWiwh>(
    'users/fetchRecover_pass_change_password',
    async (values) => {
        console.log(values)
        console.log(values)
        const {data} = await axios.post<Users>(`/userpostgresql/auth/recover_password/change_password`,values)
        console.log('user check email', data)
        return data;
    });
export const fetchRecover_pass_change_passwordInAccount = createAsyncThunk<Users,PasswordChangeInAccountProps>(
    'users/fetchRecover_pass_change_passwordInAccount',
    async (values) => {
        console.log(values)
        console.log(values)
        const {data} = await axios.patch<Users>(`/userpostgresql/auth/changePassword`,values)
        console.log('user change pass in account', data)
        return data;
    });
export const fetchChangeProfileImg = createAsyncThunk<Users,NewUserImage>(
    'users/fetchChangeProfileImg',
    async (values) => {
        console.log(values)
        console.log(values)
        const {data} = await axios.patch<Users>(`/userpostgresql/auth/changeProfileImg`,values)
        console.log('user change ava in account', data)
        return data;
    });
export const fetchChangeProfileData = createAsyncThunk<Users,AccountEditProfile>(
    'users/fetchChangeProfileData',
    async (values) => {
        console.log(values)
        console.log(values)
        const {data} = await axios.patch<Users>(`/userpostgresql/auth/changeProfileData`,values)
        console.log('user change data in account', data)
        return data;
    });

export const fetchChangeHireData = createAsyncThunk<Users,UserHire>(
    'users/fetchChangeHireData',
    async (values) => {
        // console.log(values)
        // console.log(values)
        const {data} = await axios.patch<Users>(`/userpostgresql/auth/changeHireData`,values)
        console.log('user change hire data in account', data)
        return data;
    });
export const fetchGetHireData = createAsyncThunk<Users>(
    'users/fetchGetHireData',
    async () => {
        // console.log(values)
        // console.log(values)
        const {data} = await axios.get<Users>(`/userpostgresql/auth/changeHireData`)
        console.log('user get hire data in account', data)
        return data;
    });
export const fetchGetDownloadHistory = createAsyncThunk<DownloadHistoryPost[]>(
    'users/fetchGetDownloadHistory',
    async () => {
        // console.log(values)
        // console.log(values)
        const {data} = await axios.get<DownloadHistoryPost[]>(`/userpostgresql/auth/downloadHistory`)
        console.log('user get download history data in account', data)
        return data;
    });
export const fetchGetUserDataAndDataAnotherUser = createAsyncThunk<Users,UserIdForSend>(
    'users/fetchGetUserDataAndDataAnotherUser',
    async (values) => {
        // console.log(values)
        console.log(values)

        const {data} = await axios.get<Users>(`/postgresql/user/${values._id}`)
        console.log('get user data and data another user', data)
        return data;
    });
export const fetchGetPopularUsers = createAsyncThunk<Users,PopularUsers>(
    'users/fetchGetPopularUsers',
    async (values) => {
        // console.log(values)
        console.log("values",values)

        const {data} = await axios.get<Users>(`userpostgresql/users/popular/${values}`)
        console.log('get popular users', data)
        return data;
    });
export const fetchUsersStatistics = createAsyncThunk<UsersStatistics[]>(
    'posts/fetchUsersStatistics',
    async () => {

        // console.log(params)
        const {data} = await axios.get<UsersStatistics[]>(`/userpostgresql/auth/user/statistics/`)
        console.log('statistics users ', data)
        return data;
    })
export const fetchRolesDatabase = createAsyncThunk<RolesForTable[]>(
    'posts/fetchRolesDatabase',
    async () => {

        // console.log(params)
        const {data} = await axios.get<RolesForTable[]>(`/userpostgresql/auth/roles/database/`)
        console.log('database roles ', data)
        return data;
    })
export const fetchCollectionsDetail = createAsyncThunk<Posts[],CollectionsDetail>(
    'posts/fetchCollectionsDetail',
    async (params) => {

        // console.log(params)
        const {data} = await axios.get<Posts[]>(`/postgresql/collections/${params._id}?&limit=&page=${params.page}`)
        console.log('collections detail', data)
        return data;
    })

