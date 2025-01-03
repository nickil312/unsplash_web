import {Messages} from "@/app/globalRedux/chats/types";
import React from "react";
import Link from "next/link";

type MessageCardProps = Messages & {
    self: boolean;
    lang: string;
    api_url: string;
}
export default function MessageCard({
                                        fullname,
                                        avatarUrl,
                                        _id,
                                        content,
                                        createdAt,
                                        self,
                                        lang,
                                        api_url
                                    }: MessageCardProps) {
    if (self) {

        return (
            <div className={'flex flex-row mt-2 w-full items-end justify-end'}>

                <p>
                    {content}
                </p>

                <div className='text-xs ml-2'>{new Intl.DateTimeFormat(`${lang}`, {
                    hour: '2-digit',
                    minute: '2-digit'
                }).format(new Date(createdAt))}</div>


            </div>
        )
    } else {

        return (
            <div className={'mt-2 flex flex-row '}>
                <Link href={`/${lang}/${_id}`} >

                <img className="rounded-full w-8 h-8 "
                     src={`${api_url}/${avatarUrl}`}
                     alt="user photo"/>
                </Link>
                <div className="flex flex-col ml-2">

                    <div className='text-sm'>{fullname}</div>
                    {/*<div className='text-sm'>{_id} - id</div>*/}
                    <div className="flex flex-row mt-2 items-end ">

                    <p>
                        {content}
                    </p>

                        <div className='text-xs ml-2'>{new Intl.DateTimeFormat(`${lang}`, {
                            hour: '2-digit',
                            minute: '2-digit'
                        }).format(new Date(createdAt))}</div>


                    </div>
                </div>
            </div>

        )
    }
}
