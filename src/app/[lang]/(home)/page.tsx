'use client'
import {AppDispatch, RootState} from "@/app/globalRedux/store";
import {useDispatch, useSelector} from "react-redux";
import {Status} from "@/app/globalRedux/posts/types";
import React, {useEffect, useState} from "react";
import {fetchAllPosts} from "@/app/globalRedux/posts/asyncActions";
import PostCard from "@/app/components/Cards/PostCard";
import Link from "next/link";
import {usePathname, useSearchParams} from "next/navigation";
import ImageCardMovedSort from "@/app/components/ImageCard__MovedSort";
import PostsLoading from "@/app/components/__Loading/PostsLoading";
import Gallary from "@/app/components/Products/Gallary";


export default function Home() {
    const {api_url} = useSelector((state: RootState) => state.posts);
    const dispatch = useDispatch<AppDispatch>();
    const {items, status} = useSelector((state: RootState) => state.posts.posts);
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const pathname = usePathname()
    const language = pathname.split('/')[1];

    // Use language in your component
    // console.log(`Language: ${language}`);

    const fetchPostsSuperDuper = async () => {
        setIsLoading(true);

        dispatch(fetchAllPosts({
            searchtext: "",
            posttype: 'photos',
            page: searchParams.get("page") !== null ? searchParams.get("page") : 0,
            role_id: 0,
            category: "ban",
            orientation: searchParams.get("orientation"),
            license: searchParams.get("license"),
            limit: searchParams.get("countview"),
            sort: searchParams.get("sort")
        }))
        setIsLoading(false);
    }


    useEffect(() => {
        // window.scrollTo(0, 0);
        // console.log("data load")
        // console.log(`${api_url}/`)


        fetchPostsSuperDuper();

    }, [searchParams.get("sort"),
        searchParams.get("page"),
        searchParams.get("license"),
        searchParams.get("orientation"),
        searchParams.get("countview")]);


    return (
        <main>
            <ImageCardMovedSort lang={language} api_url={api_url}/>
            <Gallary status={status} language={language} items={items} api_url={api_url} />
        </main>
    );
}
