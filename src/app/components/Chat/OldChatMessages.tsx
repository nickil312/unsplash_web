'use client'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/globalRedux/store";
import {usePathname, useRouter} from "next/navigation";
import React, {useEffect} from "react";
import {fetchOld_Messages} from "@/app/globalRedux/chats/asyncActions";
import {Messages} from "@/app/globalRedux/chats/types";
import MessageCard from "@/app/components/Chat/MessageCard";

export default function OldChatMessages({lang,id}: {lang: string,id:string}) {
    const dispatch = useDispatch<AppDispatch>();
    const {items, status} = useSelector((state: RootState) => state.chats.chat_old_Messages);
    const {api_url, data} = useSelector((state: RootState) => state.users);
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        if (data !== null) {
            dispatch(fetchOld_Messages({
                chatId:id
            }))
        }
    }, [data]);

    return(
    <>
        {items.map((message: Messages) => {
            if (data !== null && message._id === data._id) {
                return(

                <MessageCard id={message.id} _id={message._id} lang={lang}
                             self={true} content={message.content}
                             fullname={message.fullname}
                             createdAt={message.createdAt}
                             avatarUrl={message.avatarUrl}
                             roomId={message.roomId}
                             api_url={api_url}/>
                    )
            } else {
                return (
                    <MessageCard id={message.id} _id={message._id} lang={lang}
                                 self={false} content={message.content}
                                 fullname={message.fullname}
                                 createdAt={message.createdAt}
                                 avatarUrl={message.avatarUrl}
                                 roomId={message.roomId}
                                 api_url={api_url}/>
                );
            }
        })}
    </>

)
}