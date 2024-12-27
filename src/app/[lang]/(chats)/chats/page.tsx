'use client'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/globalRedux/store";
import React, {useContext, useEffect} from "react";
import {fetchAllChats} from "@/app/globalRedux/chats/asyncActions";
import {Status} from "@/app/globalRedux/posts/types";
import PostsLoading from "@/app/components/__Loading/PostsLoading";
import {usePathname, useRouter} from "next/navigation";
import {WebsocketContext} from "@/app/websocket_provider";

export default function ChatsDetail() {
    const dispatch = useDispatch<AppDispatch>();
    const {items, status} = useSelector((state: RootState) => state.chats.chatsAll);
    const {api_url, data} = useSelector((state: RootState) => state.users);
    const pathname = usePathname()
    const lang = pathname.split('/')[1];
    const router = useRouter()
    const { setConn } = useContext(WebsocketContext)

    useEffect(() => {
        if (data !== null) {

            dispatch(fetchAllChats({
                _id: data._id
            }))
        }
    }, [data]);

    const joinRoom = (roomId: string) => {
        if (data !== null) {
            console.log("id есть",data._id)
            const ws = new WebSocket(
                `ws://localhost:8080/ws/joinRoom/${roomId}?userId=${data._id}&username=${data.fullname}`
            )
            if (ws.OPEN) {
                setConn(ws)
                router.push(`/${lang}/chats/${roomId}`)
                return
            }
        }
        console.log("id нет",)
    }


    return (
        <>

            {status === Status.SUCCESS && items.length === 0 ? (
                <p className="flex items-center mt-12 text-xl justify-center">{
                    lang === "en" ? <>No posts!</> : <>Посты закончились!</>
                }</p>
            ) : status === Status.SUCCESS && items.length > 0 ? (
                <div className="grid grid-cols-3 gap-6 "
                    // px-16
                     style={{gridTemplateColumns: 'repeat(auto-fill, minmax(362px, 1fr))'}}>
                    {items.map((post, index) => (
                        // <Link href={`/${lang}/chats/${post.chatId}`} className="cursor-pointer">
                            <div key={post.chatId} className={` col-span-1 w-full mt-2`} onClick={() => joinRoom(post.chatId)}>
                                <div className="border-b border-76">
                                    <p className="font-bold">{post.chatName}</p>
                                    <div className="flex flex-row mt-1 justify-start items-center">

                                        <img className="rounded-full w-8 h-8 hidden md:block"
                                            // src="https://images.unsplash.com/profile-1709797368653-c9a3d3c2bf26?fm=jpg&amp;q=60&amp;w=3000&amp;ixlib=rb-4.0.3&amp;crop=faces&amp;fit=crop&amp;h=32"
                                             src={`${api_url}/${post.avatarUrl}`}
                                             alt="user photo"/>
                                        <p className="text-sm md:ml-2">{post.fullName}</p>
                                    </div>
                                    <div className="flex flex-row justify-between mt-2">

                                        <p className="text-sm">{post.msg}</p>
                                        <p className="text-sm">{new Intl.DateTimeFormat(`${lang}`, {
                                            year: '2-digit',
                                            month: '2-digit',
                                            day: '2-digit'
                                        }).format(new Date(post.msgCrt))}</p>
                                    </div>
                                    {/*<p>{post.msgUsId}</p>*/}
                                </div>
                            </div>
                        // </Link>
                    ))}
                </div>
            ) : (
                <PostsLoading/>
            )}

        </>
    )
}