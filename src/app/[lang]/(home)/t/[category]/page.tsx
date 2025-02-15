'use client'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/globalRedux/store";
import {Status} from "@/app/globalRedux/posts/types";
import React, {useEffect, useState} from "react";
import {usePathname, useSearchParams} from "next/navigation";
import {fetchAllPosts, fetchAllPostsWithCategory} from "@/app/globalRedux/posts/asyncActions";
import PostCard from "@/app/components/Cards/PostCard";
import ThemeSwitch from "@/app/components/ThemeSwitch";
import ImageCardMovedSort from "@/app/components/ImageCard__MovedSort";
import PostsLoading from "@/app/components/__Loading/PostsLoading";
import Gallary from "@/app/components/Products/Gallary";

type DetailPostInfoProps = {
    params: {
        category: string;
    }
}

export default function CategoryPage(params: DetailPostInfoProps) {
    const {api_url} = useSelector((state: RootState) => state.posts);
    const dispatch = useDispatch<AppDispatch>();
    const {items, status} = useSelector((state: RootState) => state.posts.postsWithCategory);
    const isPostLoading = status === Status.LOADING;
    const [isLoading, setIsLoading] = useState(false);
    const searchParams = useSearchParams();
    const pathname = usePathname()
    const language = pathname.split('/')[1];

    const [isHovered, setIsHovered] = useState(false);


    const fetchPostsSuperDuper = async () => {
        setIsLoading(true);
        // console.log(pathname)
        if (pathname.startsWith('/ru/t/illustrations') || pathname.startsWith('/en/t/illustrations')) {
            dispatch(fetchAllPostsWithCategory({
                posttype: 'illustrations',
                page: searchParams.get("page") !== null ? searchParams.get("page") : 0,
                role_id: 0,
                category: "",
                searchtext: '',
                license: searchParams.get("license"),
                orientation: searchParams.get("orientation"),
                limit: searchParams.get("countview"),
                sort: searchParams.get("sort")
            }))
            // globalThis.metrics?.categoryPopularity.inc({
            //     category_name:"illustrations",
            //     date:Date.now()
            // });
            // globalThis.metrics?.userSignups.inc({
            //     plan_type: "free",
            //     referral_source: "direct"
            // });
        } else if (pathname.startsWith('/ru/t/unsplash_plus') || pathname.startsWith('/en/t/unsplash_plus')) {
            dispatch(fetchAllPostsWithCategory({
                posttype: '',
                page: searchParams.get("page") !== null ? searchParams.get("page") : 0,
                role_id: 0,
                category: "",
                searchtext: '',
                license: 'plus',
                orientation: searchParams.get("orientation"),
                limit: searchParams.get("countview"),
                sort: searchParams.get("sort")
            }))
            // globalThis.metrics?.categoryPopularity.inc({
            //     category_name:"unsplash_plus",
            //     date:Date.now()
            // });
        } else {
            // console.log("wallpapers")
            dispatch(fetchAllPostsWithCategory({
                posttype: '',
                page: searchParams.get("page") !== null ? searchParams.get("page") : 0,
                role_id: 0,
                searchtext: '',
                category: params.params.category.charAt(0).toUpperCase() + params.params.category.slice(1),
                license: searchParams.get("license"),
                orientation: searchParams.get("orientation"),
                limit: searchParams.get("countview"),
                sort: searchParams.get("sort")
            }))
            // globalThis.metrics?.categoryPopularity.inc({
            //     category_name:params.params.category.charAt(0).toUpperCase() + params.params.category.slice(1),
            //     date:Date.now()
            // });
        }
        setIsLoading(false);
    }
    useEffect(() => {
        // window.scrollTo(0, 0);
        // console.log("data load")
        // console.log(`${api_url}/`)


        fetchPostsSuperDuper();


        // console.log("data load end")
    }, [searchParams.get("page"),
        searchParams.get("license"),
        searchParams.get("orientation"),
        searchParams.get("countview"),
        searchParams.get("sort")])


    return (
        <main>
            <ImageCardMovedSort lang={language} api_url={api_url}/>
            <Gallary status={status} language={language} items={items} api_url={api_url} />


        </main>
    )
}