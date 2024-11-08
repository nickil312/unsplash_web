'use client'
import {usePathname, useSearchParams} from "next/navigation";
import React, {useEffect} from "react";
import {fetchPosts_Likes_coll_another_user} from "@/app/globalRedux/posts/asyncActions";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/globalRedux/store";
import {Status} from "@/app/globalRedux/posts/types";
import Gallary from "@/app/components/Products/Gallary";
import PostsLoading from "@/app/components/__Loading/PostsLoading";
import CollectionCard from "@/app/components/Cards/CollectionCard";
import CollectionCardLoading from "@/app/components/__Loading/CollectionCardLoading";

type DetailUsersProps = {
    params: {
        id: string;
    }
}

export default function UsersCollections(params: DetailUsersProps) {
    const id = params.params.id;
    const dispatch = useDispatch<AppDispatch>();
    // const {items, status} = useSelector((state: RootState) => state.users.data_another_user);
    // const {api_url, data} = useSelector((state: RootState) => state.users);
    const {items, status} = useSelector((state: RootState) => state.posts.posts_another_user);
    const pathname = usePathname()
    const lang = pathname.split('/')[1];
    const searchParams = useSearchParams();

    useEffect(() => {


        dispatch(fetchPosts_Likes_coll_another_user({
            bdType: "collections",
            page:searchParams.get("page") !== null ? searchParams.get("page") : 0,
            userIdAccViewed:id
        }))

    }, [searchParams.get("page")])

    return (
        <>
            {status === Status.SUCCESS && items.collections.length === 0 ? (
                <p className="flex items-center mt-12 text-xl justify-center">{
                    lang === "en" ? <>No collections!</> : <>Коллекции закончились!</>
                }</p>
            ) : status === Status.SUCCESS && items.collections.length >0 ? (
                    <div className="mt-2 md:mx-52">
                        <div className="grid grid-cols-3 gap-7 px-2"
                             style={{gridTemplateColumns: 'repeat(auto-fill, minmax(362px, 1fr))'}}>
                            {items.collections.map((coll) => (
                                <CollectionCard _id={coll._id} user_id={coll.user_id} createdat={coll.createdat} name={coll.name} fullname={coll.fullname} last_three_posts={coll.last_three_posts} lang={lang} total_photos={coll.total_photos} deleted={coll.deleted} privateStatus={coll.private} />
                            ))}

                        </div>
                    </div>

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
                )}

        </>
    )
}