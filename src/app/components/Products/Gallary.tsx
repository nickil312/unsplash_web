import {Posts, Status} from "@/app/globalRedux/posts/types";
import PostCard from "@/app/components/Cards/PostCard";
import PostsLoading from "@/app/components/__Loading/PostsLoading";
import React from "react";
import {useSearchParams} from "next/navigation";
interface GallaryProps {
    status: Status;
    items: Posts[];
    language: string;
    api_url: string;
}

export default function Gallary({ status, items, language, api_url }: GallaryProps) {
    const searchParams = useSearchParams();

    return (
        <div>
            {status === Status.SUCCESS ? (

                // <div className="grid grid-cols-3 gap-6 "
                //      // px-16
                //      style={{gridTemplateColumns: 'repeat(auto-fill, minmax(362px, 1fr))'}}>
                //     {items.map((post, index) => (
                //
                //         <div key={post._id} className={` col-span-1 w-full mt-2`}>
                //             <PostCard
                //                 key={post._id}
                //                 _id={post._id}
                //                 fullname={post.fullname}
                //                 avatarurl={`${api_url}/${post.avatarurl}`}
                //                 user_id={post.user_id}
                //                 altText={post.imageurl}
                //                 imageUrl={`${api_url}/${post.imageurl}`}
                //                 lang={language}
                //                 likedByUser={post.likedByUser}
                //                 license={post.license}
                //                 hirevalue={post.hirevalue}
                //                 banned={post.banned}
                //             />
                //         </div>
                //     ))}
                // </div>

                <div className="gallary_adaptive_and_styles grid">
                    {/*{Array(Math.ceil(items.length / 3)).fill(0).map((_, index) => (*/}
                    {/* @ts-ignore*/}

                    {Array(Math.ceil(items.length / (parseInt(searchParams.get("countview")) ? parseInt(searchParams.get("countview")) / 3 : 3))).fill(0).map((_, index) => (
                        <div key={index}>
                            {/*{items.slice(index * 3, (index + 1) * 3).map((post) => (*/}
                            {/* @ts-ignore*/}

                            {items.slice(index * (parseInt(searchParams.get("countview")) ? parseInt(searchParams.get("countview")) / 3 : 3), (index + 1) * (parseInt(searchParams.get("countview")) ? parseInt(searchParams.get("countview")) / 3 : 3)).map((post) => (

                                <PostCard
                                    key={post._id}
                                    _id={post._id}
                                    fullname={post.fullname}
                                    avatarurl={`${api_url}/${post.avatarurl}`}
                                    user_id={post.user_id}
                                    altText={post.imageurl}
                                    imageUrl={`${api_url}/${post.imageurl}`}
                                    lang={language}
                                    likedByUser={post.likedByUser}
                                    license={post.license}
                                    hirevalue={post.hirevalue}
                                    banned={post.banned}
                                />
                            ))}
                        </div>
                    ))}
                </div>

            ) : (
                <PostsLoading/>

            )}
        </div>
    )
}
// export default Gallary;