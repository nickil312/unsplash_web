'use client'
import {Posts, Status} from "@/app/globalRedux/posts/types";
import PostCard from "../../../../../components/Cards/PostCard";
import React, {Suspense, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/globalRedux/store";
import {fetchAllPosts, fetchAllPostsWithSearch, fetchCollectionsWithSearch} from "@/app/globalRedux/posts/asyncActions";
import {usePathname, useSearchParams} from "next/navigation";
import InfiniteScroll from "react-infinite-scroll-component";
import ContentLoader from "react-content-loader"
import PostsLoading from "@/app/components/__Loading/PostsLoading";
import {fetchAllUsersWithSearch} from "@/app/globalRedux/users/asyncActions";
import UserCard from "@/app/components/Cards/UserCard";
import UserLoading from "@/app/components/__Loading/UserLoading";
import {clearPostsWithSearchCount} from "@/app/globalRedux/posts/slice";
import {clearUsersWithSearchCount} from "@/app/globalRedux/users/slice";
import ImageCardMovedSort from "@/app/components/ImageCard__MovedSort";
import SortSelectBox from "@/app/components/__Header/__SortNav/SortSelectBox";
import Gallary from "@/app/components/Products/Gallary";
import CollectionCard from "@/app/components/Cards/CollectionCard";
import CollectionCardLoading from "@/app/components/__Loading/CollectionCardLoading";


type DetailPostInfoProps = {
    params: {
        slug: string;
        searchText: string;
    }
}

export default function SearchPage(params: DetailPostInfoProps) {
    const {api_url} = useSelector((state: RootState) => state.posts);
    const dispatch = useDispatch<AppDispatch>();
    const {items, status} = useSelector((state: RootState) => state.posts.postsWithSearch);
    const {usersWithSearch} = useSelector((state: RootState) => state.users);
    const {collectionsWithSearch} = useSelector((state: RootState) => state.posts);
    const isPostLoading = status === Status.LOADING;
    const [isLoading, setIsLoading] = useState(false);
    const [hasMoreData, sethasMoreData] = useState(true);
    const searchParams = useSearchParams();
    // const [page, setPage] = useState<number>(0);
    const {data} = useSelector((state: RootState) => (state.users))
    const data_status = useSelector((state: RootState) => (state.users.status))

    // const [allItems, setAllItems] = useState<Posts[]>(); // <--- new variable to store all items
    const pathname = usePathname()
    const language = pathname.split('/')[1];


    const fetchPostsSuperDuper = async () => {
        setIsLoading(true);
        console.log("pathname", pathname)
        if (pathname.startsWith("/ru/s/photos/") || pathname.startsWith("/ru/s/illustrations/")
            || pathname.startsWith("/en/s/photos/") || pathname.startsWith("/en/s/illustrations/")) {
            dispatch(clearUsersWithSearchCount())
            dispatch(fetchAllPostsWithSearch({
                searchtext: params.params.searchText,
                page: searchParams.get("page") !== null ? searchParams.get("page") : 0,
                role_id: 0,
                category: "",
                posttype: params.params.slug,
                orientation: searchParams.get("orientation"),
                license: searchParams.get("license"),
                limit: searchParams.get("countview"),
                sort: searchParams.get("sort")
            }))
        } else if (pathname.startsWith("/ru/s/users/") || pathname.startsWith("/en/s/users/")) {
            dispatch(clearPostsWithSearchCount());
            dispatch(fetchAllUsersWithSearch({
                searchtext: params.params.searchText,
                page: searchParams.get("page") !== null ? searchParams.get("page") : 0,
                role_id: 0,
                category: "",
                posttype: '',
                orientation: '',
                license: '',
                limit: searchParams.get("countview"),
                sort: ''
            }))
        } else if (pathname.startsWith("/ru/s/collections/") || pathname.startsWith("/en/s/collections/")) {
            dispatch(clearPostsWithSearchCount());
            dispatch(clearUsersWithSearchCount())
            dispatch(fetchCollectionsWithSearch({
                searchtext: params.params.searchText,
                page: searchParams.get("page") !== null ? searchParams.get("page") : 0,
                role_id: 0,
                category: "",
                posttype: '',
                orientation: '',
                license: '',
                limit: searchParams.get("countview"),
                sort: ''
            }))
        }

        // Сдезь будут условия на какие бд делать запросы на разные переменные чтоб было нормально
        setIsLoading(false);
    }


    useEffect(() => {
        // window.scrollTo(0, 0);
        // console.log("use effect")
        // console.log(`${api_url}/`)


        fetchPostsSuperDuper();

        // console.log("usersWithSearch",usersWithSearch)
        // console.log("data load end")
    }, [searchParams.get("sort"),
        searchParams.get("page"),
        searchParams.get("license"),
        searchParams.get("orientation"),
        searchParams.get("countview")]);


    return (
        <main>
            {/*<ImageCardMovedSort lang={language}/>*/}
            <div className="floating_sort_select_box">
                {/*className="sticky top-40"*/}
                <SortSelectBox lang={language}/>
            </div>
            <div>
                {/*<p>{params.params.searchText}</p>*/}
                {pathname.startsWith("/en/s/users/") || pathname.startsWith("/ru/s/users/") ? (
                    usersWithSearch.status === Status.SUCCESS ? (
                        usersWithSearch.items.users.length > 0 ? (
                            <div className="">
                                <div className="grid grid-cols-3 gap-7 px-2"
                                     style={{gridTemplateColumns: 'repeat(auto-fill, minmax(362px, 1fr))'}}>
                                    {usersWithSearch.items.users.map((user) => (
                                        <div key={user._id} className={`col-span-1 w-full`}>
                                            {/* Render user card component here */}
                                            <UserCard
                                                fullname={user.fullname}
                                                avatarurl={`${api_url}/${user.avatarurl}`}
                                                _id={user._id}
                                                banned={user.banned}
                                                user_role_id={user.user_role_id}
                                                last_three_posts={user.last_three_posts}
                                                lang={language}
                                                user_id={data !== null ? data.user_role_id : 2}
                                                hirevalue={user.hirevalue}

                                            />
                                            {/*<p>{user.last_three_posts}</p>*/}
                                        </div>
                                    ))}

                                </div>
                            </div>
                        ) : (
                            <div className="col-span-1 w-full flex justify-center items-center h-full">
                                <div className="mt-72 mb-72">
                                    <p className="text-4xl font-bold ">Пользователи закончились!</p>
                                    {/*<button onClick={() => {*/}
                                    {/*}} className="text-4xl font-bold ">Вернуться в начало</button>*/}
                                </div>
                            </div>
                        )
                    ) : (
                        <UserLoading/>
                    )
                ) : pathname.startsWith("/en/s/collections/") || pathname.startsWith("/ru/s/collections/") ? (
                    collectionsWithSearch.status === Status.SUCCESS ? (
                        collectionsWithSearch.items.posts.length > 0 ? (
                            <div className="mt-2 md:mx-52">
                                <div className="grid grid-cols-3 gap-7 px-2"
                                     style={{gridTemplateColumns: 'repeat(auto-fill, minmax(362px, 1fr))'}}>
                                    {collectionsWithSearch.items.posts.map((coll) => (
                                        <CollectionCard _id={coll._id} user_id={coll.user_id} createdat={coll.createdat}
                                                        name={coll.name} fullname={coll.fullname}
                                                        last_three_posts={coll.last_three_posts} lang={language}
                                                        total_photos={coll.total_photos} deleted={coll.deleted}
                                                        privateStatus={coll.private}
                                        />
                                    ))}

                                </div>
                            </div>
                        ) : (
                            <div className="col-span-1 w-full flex justify-center items-center h-full">
                                <div className="mt-72 mb-72">
                                    <p className="text-4xl font-bold ">Коллекции закончились!</p>
                                    {/*<button onClick={() => {*/}
                                    {/*}} className="text-4xl font-bold ">Вернуться в начало</button>*/}
                                </div>
                            </div>
                        )
                    ) : (
                        <div className="mt-2 md:mx-52">
                            <div className="grid grid-cols-3 gap-7 px-2"
                                 style={{gridTemplateColumns: 'repeat(auto-fill, minmax(362px, 1fr))'}}>
                                <CollectionCardLoading/>
                                <CollectionCardLoading/>
                                <CollectionCardLoading/>
                                <CollectionCardLoading/>
                                <CollectionCardLoading/>
                                <CollectionCardLoading/>


                            </div>
                        </div>
                        // <UserLoading/>
                    )
                ) : (
                    status === Status.SUCCESS ? (
                        items.posts.length > 0 ? (
                            <Gallary status={status} language={language} items={items.posts} api_url={api_url}/>

                        ) : (
                            <div className="col-span-1 w-full flex justify-center items-center h-full">
                                <div className="mt-72 mb-72">
                                    <p className="text-4xl font-bold ">Посты закончились!</p>
                                    {/*<button onClick={() => {*/}
                                    {/*}} className="text-4xl font-bold ">Вернуться в начало</button>*/}
                                </div>
                            </div>
                        )
                    ) : (
                        <PostsLoading/>
                    )
                )}
            </div>
        </main>
    )
}