import {Locale} from "@/i18n.config";
import {string} from "prop-types";
import {Collections, Posts} from "@/app/globalRedux/posts/types";

interface Three_Photos {
    imageurl: string;
}
export interface Cities{
    name: string;
}
export interface Work{
    name: string;
}
export type DownloadHistoryPost ={
    _id: string;
    title: string;
    text: string;
    imageurl: string;
    download_at: string;
}
export type DownloadHistoryPostReq = Pick<DownloadHistoryPost, '_id'> ;

export type Users = {
    _id: string,
    fullname: string,
    email: string,
    avatarurl: string,
    createdat: string,
    user_role_id: number,
    banned: boolean,
    last_three_posts: Three_Photos[] | null,
    token: string | null
    location: string
    bio:string
    messages:boolean
    cities: string[] | null
    work: string[] | null
    hirevalue:boolean
    most_popular_image_url:string,
}
export type UsersForTable = {
    _id: string,
    fullname: string,
    email: string,
    avatarurl: string,
    passwordhash:string,
    createdat: string,
    updatedat: string,
    user_role_id: number,
    user_role:string
    location: string
    bio:string
    messages:boolean
    banned: boolean,
    hirevalue:boolean
    role_id: number,
    cities: string[] | null,
    work: string[] | null
}
export type RolesForTable = {
    role_id: string,
    user_role:string
}
export type LoginData = {
    email: string
    password: string
}
export type RegData = {
    email: string
    fullName: string
    password: string
}

export type LangProps = {
    params: {
        lang: Locale;
    }
}
export type EmailCheckProps = {
    email: string;
    lang: Locale;
}
export type TokenCheckState = {
    token:string
}
export type PasswordChangeProps = {
    password: string
    password2: string
}
export type PasswordChangeInAccountProps = {
    currect_password: string
    password: string
    password2: string
}
export type AccountEditProfile = {
    _id: string,
    email: string
    fullName: string
    location: string
    bio:string
    messages:boolean
}
export type NewUserImage = Pick<Users, 'avatarurl' | 'email'> ;
export type UserHire = Pick<Users, 'hirevalue' | 'work' | 'cities'> ;
export type UserIdForSend = {
    _id: string
};

export type PasswordChangePropsWiwh = {
    password: string
    token: string
}
export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}
export type UsersStatistics = {
    createdat: string,
    usercount:string
}
export type CollectionsDetail = {
    _id: string,
    limit: string | null,
    page: number | null | string,
}

// export type last_three_posts = {
//     imageurl: string | null
// }

export interface UsersSliceState {
    data: Users | null,
    status: Status,
    hireData:{
        items: Users | null,
        status: Status
    },
    usersWithSearch: {
        items: {
            users: Users[];
            photoCount: string;
            usersCount: string;
            illustrationCount: string;
            collectionsCount: string;
        },
        status: Status
    },
    download_history:{
        items:DownloadHistoryPost[]
        status:Status
    }
    api_url: string;
    data_another_user:{
        items: Users | null,
        status: Status
    },
    popular_users:{
        items: Users[] | null,
        status: Status
    },
    userStatistics: {
        items:{
            usersStats:UsersStatistics[],
            users:UsersForTable[]
        },
        status: Status
    },
    rolesDatabase: {
        items: RolesForTable[],
        status: Status
    },
    collectionsDetail: {
        items: {
            collections: Collections | null,
            posts:Posts[]
        },
        status: Status
    }

}
export type PopularUsers = {
    filterValue:string
}


