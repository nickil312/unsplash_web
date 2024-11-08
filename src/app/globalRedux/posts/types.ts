import {string} from "prop-types";
import {ReportsCardProps} from "@/app/components/Cards/ReportsCard";

export type Posts = {
    _id: string,
    title: string,
    text: string,
    tags: string[],
    viewscount: number,
    imageurl: string,
    user_id: string,
    createdat: string,
    updatedat: string,
    category: string,
    likecount: number
    likedByUser: boolean,
    cameracompany: string,
    model: string,
    shutterspeed: string,
    aperture: string,
    focallength: string,
    dimensions: string,
    isocam: string,
    report_id: string,
    banned: boolean,
    admin_id: string,
    reasonofban: string,
    fullname: string,
    avatarurl: string,
    imageurlFull: string | null,
    posttype:string
    license:string
    hirevalue:boolean
    orientation:string
    deleted:boolean
}
export type Logs = {
    user_id: string,
    created_at: string,
    action: string,
}
export type DeleteId = {
    _id: string
};
export interface LikeAction {
    type: string;
    payload: {
        _id: string;
        liked: boolean;
    };
}
export type CollectionAddImageProps = {
    userIdAccViewed:string,
    post_id:string
}
export type ImageAddToCollectionProps = {
    _id:string,
    post_id:string,
    add:boolean
}

export type SearchAndSortParams = {
    searchtext: string | null,
    page: number | null | string,
    role_id: number | null,
    category: string | null,
    license: string | null,
    posttype: string | null,
    orientation: string | null,
    limit: string | null,
    sort: string | null
}
export type UserPosts_Likes_coll_Params = {
    page: number | null | string,
    bdType: string,
    userIdAccViewed:string
}

export type Banned_Params = {
    page: number | null | string,

}
export type Ban_Post = {
    _id: string,
    admin_id: string,
    reasonofban: string,
    banned: boolean,
}
export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}
export type ViewsLikes = {
    _id: string,
    post_id: string,
    createdat: string,
    likecount: number,
    islike: boolean,
}
export type PostsIdProps = {
    _id: string,
    user_id: string,
}
export type PostsIdPropsForStatistics = {
    _id: string
}
export type ReportsDatabase = {
    _id: string,
    user_id: string,
    reason: string,
    post_id: string
}
export interface Three_Photos {
    imageurl: string;
    post_id: string;
}
export type Collections = {
    _id: string,
    user_id: string,
    createdat: string,
    name:string,
    fullname: string,
    avatarurl: string,
    last_three_posts: Three_Photos[] | null,
    total_photos:string
    has_post: null | boolean,
    private:boolean,
    description: string,
    deleted:boolean
}
export type CollectionPostsDatabase = {
    collection_id: string,
    post_id: string,
}
export type CollectionCreateForm = {
    name:string,
    description: string,
    privateStatus:boolean
}
export type CollectionUpdateForm = {
    id:string
    name:string,
    description: string,
    privateStatus:boolean
}
export type CollectionDeleteOrRecoverForm = {
    id:string
    recover:boolean
}
export type PostsStatistics = {
    likes: PostsStatisticsLikes[],
    views: PostsStatisticsViews[],
}
export type PostsStatisticsLikes = {
    _id: string,
    posts_id:string,
    createdat: string,
    likecount: number,
    islike: boolean,
}
export type ReportCreateForm = {
    user_id: string,
    reason:string,
    post_id:string
}
export type ReportDetail = {
    user_id: string,
    fullname: string,
    avatarurl: string,
    report:string,
    _id:string
}
export type PostsStatisticsViews = {
    _id: string,
    posts_id:string,
    createdat: string,
    likecount: number,
    islike: boolean,
}
export interface PostsSliceState {
    theme: boolean;
    posts: {
        items: Posts[],
        status: Status
    },
    postsWithCategory: {
        items: Posts[],
        status: Status
    },
    onePost: {
        items: Posts | null,
        status: Status
    }
    postsWithSearch: {
        items: {
            posts: Posts[];
            photoCount: string;
            usersCount: string;
            collectionsCount: string;
            illustrationCount: string;
        },
        status: Status
    },
    collectionsWithSearch:{
        items: {
            posts: Collections[];
            photoCount: string;
            usersCount: string;
            collectionsCount: string;
            illustrationCount: string;
        },
        status: Status
    },
    posts_another_user: {
        items: {
            posts: Posts[] ;
            collections: Collections[] ;
            photoCount: string;
            likesCount: string;
            collectionsCount: string;
        },
        status: Status
    },
    postsBanned: {
        items: Posts[],
        status: Status
    },
    postStatistics:{
        items:{
            likes: PostsStatisticsLikes[],
            views: PostsStatisticsViews[],
        } ,
        status: Status
    },
    DatabasePosts: {
        items: Posts[],
        status: Status
    },
    DatabaseReports: {
        items: ReportsDatabase[],
        status: Status
    },
    DatabaseViewsLikes: {
        items: ViewsLikes[],
        status: Status
    },
    DatabaseAllCollections: {
        items: Collections[],
        status: Status
    },
    DatabaseCollectionsPosts: {
        items: CollectionPostsDatabase[],
        status: Status
    },
    DatabaseLogs: {
        items: Logs[],
        status: Status
    },
    CollectionsForAddImage: {
        items:Collections[];
        status: Status
    },
    ReportPosts: {
        items:ReportsCardProps[];
        status: Status
    },
    ReportPostsDetail:{
        items:ReportDetail[],
        status: Status
    }
    api_url: string;
}