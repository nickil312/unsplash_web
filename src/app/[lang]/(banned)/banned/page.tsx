'use client'
import Gallary from "@/app/components/Products/Gallary";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/globalRedux/store";
import {fetchAllPosts, fetchBannedPosts} from "@/app/globalRedux/posts/asyncActions";
import {usePathname, useSearchParams} from "next/navigation";

export default function BannedPage() {
    const {data, api_url} = useSelector((state: RootState) => (state.users))
    const {items, status} = useSelector((state: RootState) => state.posts.postsBanned);

    const dispatch = useDispatch<AppDispatch>();
    const searchParams = useSearchParams();
    const pathname = usePathname()
    const language = pathname.split('/')[1];


    const fetchPostsSuperDuper = async () => {


        dispatch(fetchBannedPosts({
            page: searchParams.get("page") !== null ? searchParams.get("page") : 0,
        }))
        console.log(items)

    }


    useEffect(() => {
        fetchPostsSuperDuper()
    }, [searchParams.get("page")]);
    return (
        <>
            {/*// <p>text banned</p>*/}
            <Gallary status={status} language={language} items={items} api_url={api_url}/>
        </>

    )
}
