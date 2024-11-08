import {useSelector} from "react-redux";
import {RootState} from "@/app/globalRedux/store";
import Link from "next/link";
import {Three_Photos} from "@/app/globalRedux/posts/types";
import {string} from "prop-types";
import React from "react";

export type CollectionsProps = {
    _id: string,
    user_id: string,
    createdat: string,
    name: string,
    fullname: string,
    last_three_posts: Three_Photos[] | null,
    lang: string
    total_photos: string
    deleted: boolean
    privateStatus: boolean
}
export default function CollectionCard({
                                           _id,
                                           fullname,
                                           name,
                                           last_three_posts,
                                           lang,
                                           user_id,
                                           total_photos,
                                           deleted,
                                           privateStatus
                                       }: CollectionsProps) {
    const {api_url} = useSelector((state: RootState) => state.posts);

    if (last_three_posts !== null) {
        //
        // console.log(last_three_posts[0]);
        // console.log("user_id",user_id)
    }
    return (
        <Link href={`/${lang}/collection/${_id}`}>
            <div className="flex  flex-col rounded-lg ">
                {/*w-[330px]*/}
                {
                    last_three_posts !== null ? (
                        <div className="flex flex-row gap-0.5 h-72 hover:opacity-80 duration-200">
                            {

                                last_three_posts.length > 0 && last_three_posts[0] !== null ? (
                                    <img
                                        src={`${api_url}/${last_three_posts[0].imageurl}`}
                                        alt={last_three_posts[0].imageurl}
                                        // className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
                                        className="w-56 h-72 object-cover rounded-l-lg"
                                    />
                                ) : (
                                    <div className="bg-D1 dark:bg-76 w-56 h-72 rounded-l-lg"></div>
                                )
                            }
                            <div className="flex flex-col gap-0.5">
                                {

                                    last_three_posts.length > 1 && last_three_posts[1] !== null ? (
                                        <img
                                            src={`${api_url}/${last_three_posts[1].imageurl}`}
                                            alt={last_three_posts[1].imageurl}
                                            // className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
                                            className="w-44 h-36 object-cover rounded-tr-lg"
                                        />
                                    ) : (
                                        <div className="bg-D1 dark:bg-76 w-44 h-36 rounded-tr-lg"></div>
                                    )
                                }
                                {
                                    last_three_posts.length > 2 && last_three_posts[2] !== null ? (
                                        <img
                                            src={`${api_url}/${last_three_posts[2].imageurl}`}
                                            alt={last_three_posts[2].imageurl}
                                            className="w-44 h-[142px] object-cover rounded-br-lg"
                                        />
                                    ) : (
                                        <div className="bg-D1 dark:bg-76 w-44 h-[142px] rounded-br-lg"></div>
                                    )
                                }
                            </div>
                        </div>

                    ) : (
                        <div className="flex flex-row gap-0.5 h-72">
                            <div className="bg-D1 dark:bg-76 w-56 h-72 rounded-l-lg"></div>
                            <div className="flex flex-col gap-0.5 ">
                                <div className="bg-D1 dark:bg-76 w-44 h-36 rounded-tr-lg"></div>
                                <div className="bg-D1 dark:bg-76 w-44 h-[142px] rounded-br-lg"></div>
                            </div>
                        </div>
                    )

                }

                <div className="flex flex-row items-center mt-2">
                    {
                        privateStatus && (

                            <svg className="shrink-0 fill-76 w-3 h-3 mr-1.5" width="24" height="24" viewBox="0 0 24 24"
                                 version="1.1" aria-hidden="false"
                            >
                                <desc lang="en-US">A lock</desc>
                                <path
                                    d="M19 11h-1.5V7.5C17.5 4.5 15 2 12 2S6.5 4.5 6.5 7.5V11H5c-.6 0-1 .4-1 1v9c0 .6.4 1 1 1h14c.6 0 1-.4 1-1v-9c0-.6-.4-1-1-1ZM8.5 7.5C8.5 5.6 10.1 4 12 4s3.5 1.6 3.5 3.5V11h-7V7.5Z"></path>
                            </svg>
                        )
                    }
                    <p className="text-lg font-bold ">{name}</p>
                </div>
                <div className="flex flex-row gap-2 items-center">

                    <p className="mt-1 text-sm ">{total_photos}{lang === "en" ? <> images</> : <> фотографии</>}</p>
                    <p className="mt-1 text-sm ">{lang === "en" ? <>Curated by </> : <>Создано </>}{fullname}</p>
                    {
                        deleted && (

                            <p className="bg-red-500 rounded px-2 text-sm h-fit">{lang === "en" ? <>Deleted</> : <>Удален</>}</p>
                        )
                    }
                </div>

            </div>
        </Link>
    )
}