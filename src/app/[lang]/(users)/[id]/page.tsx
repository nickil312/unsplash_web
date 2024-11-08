'use client'
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/globalRedux/store";
import {fetchGetUserDataAndDataAnotherUser} from "@/app/globalRedux/users/asyncActions";
import {usePathname, useSearchParams} from "next/navigation";
import {Cities, work} from "@/app/[lang]/(account)/account/hiring/page";
import ToggleBD from "@/app/components/account/__Nav/ToggleBD";
import {fetchPosts_Likes_coll_another_user} from "@/app/globalRedux/posts/asyncActions";
import {Status} from "@/app/globalRedux/posts/types";
import PostCard from "@/app/components/Cards/PostCard";
import PostsLoading from "@/app/components/__Loading/PostsLoading";
import Gallary from "@/app/components/Products/Gallary";

type DetailUsersProps = {
    params: {
        id: string;
    }
}

export default function UsersPhotos(params: DetailUsersProps) {
    const id = params.params.id;
    const dispatch = useDispatch<AppDispatch>();
    const {items, status} = useSelector((state: RootState) => state.posts.posts_another_user);
    const {api_url, data} = useSelector((state: RootState) => state.users);
    const pathname = usePathname()
    const lang = pathname.split('/')[1];
    const searchParams = useSearchParams();

    useEffect(() => {

        dispatch(fetchPosts_Likes_coll_another_user({
            bdType: "photos",
            page:searchParams.get("page") !== null ? searchParams.get("page") : 0,
            userIdAccViewed:id
        }))

    }, [searchParams.get("page")])
    return (
        <>

            {status === Status.SUCCESS &&  items.posts.length === 0 ? (
                <p className="flex items-center mt-12 text-xl justify-center">{
                    lang === "en" ? <>No posts!</> : <>Посты закончились!</>
                }</p>
            ) : status === Status.SUCCESS && items.posts.length > 0 ? (
                <Gallary status={status} language={lang} items={items.posts} api_url={api_url} />
            ) : (
                <PostsLoading />
            )}

        </>
    )
}