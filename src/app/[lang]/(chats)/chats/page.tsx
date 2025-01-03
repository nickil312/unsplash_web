'use client'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/globalRedux/store";
import React, {useContext, useEffect} from "react";
import {fetchAllChats} from "@/app/globalRedux/chats/asyncActions";
import {Status} from "@/app/globalRedux/posts/types";
import PostsLoading from "@/app/components/__Loading/PostsLoading";
import {usePathname, useRouter} from "next/navigation";
import {WebsocketContext} from "@/app/websocket_provider";
import {saveChat_info} from "@/app/globalRedux/chats/slice";

export default function ChatsDetail() {
    const dispatch = useDispatch<AppDispatch>();
    const {items, status} = useSelector((state: RootState) => state.chats.chatsAll);
    const {api_url, data} = useSelector((state: RootState) => state.users);
    const pathname = usePathname()
    const lang = pathname.split('/')[1];
    const router = useRouter()
    const {setConn} = useContext(WebsocketContext)

    useEffect(() => {
        if (data !== null) {

            dispatch(fetchAllChats({
                _id: data._id
            }))
        }
    }, [data]);

    const joinRoom = (roomId: string) => {
        if (data !== null) {
            console.log("id есть", data._id)
            const ws = new WebSocket(
                `ws://localhost:8080/ws/joinRoom/${roomId}?userId=${data._id}&username=${data.fullname}&avatarUrl=${data.avatarurl}`
            )
            if (ws.OPEN) {
                setConn(ws)
                // dispatch(saveChat_info({
                //     chatId: roomId,
                // }))
                // router.push(`/${lang}/chats/${roomId}`)
                // Находим объект чата с id === roomId
                const chatInfo = items.find(item => item.chatId === roomId);

                if (chatInfo) {
                    dispatch(saveChat_info(chatInfo)); // Передаем найденный объект
                    router.push(`/${lang}/chats/${roomId}`);
                } else {
                    console.log("Чат не найден");
                }
                // return
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
                        <div key={post.chatId} className={` col-span-1 w-full mt-2 pr-2 md:pr-0`}
                             onClick={() => joinRoom(post.chatId)}>
                            <div className={"flex flex-row w-full"}>


                                <img className="rounded-full w-24 h-24 mr-2"
                                    // src="https://images.unsplash.com/profile-1709797368653-c9a3d3c2bf26?fm=jpg&amp;q=60&amp;w=3000&amp;ixlib=rb-4.0.3&amp;crop=faces&amp;fit=crop&amp;h=32"
                                     src={`${api_url}/${post.chat_image}`}
                                     alt="user photo"/>
                                <div className="border-b border-76 w-4/6">
                                    <div className="flex items-center justify-start w-full">

                                        <p className="font-bold w-full">{post.chatName}</p>
                                        <div className="flex items-center justify-end gap-2 w-full">


                                            {
                                                post.isGroup && (

                                                    <svg xmlns="http://www.w3.org/2000/svg" className={"fill-76"}
                                                         id="Layer_1"
                                                         data-name="Layer 1"
                                                         viewBox="0 0 24 24" width="18" height="18">
                                                        <path
                                                            d="M12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,12,10Zm6,13A6,6,0,0,0,6,23a1,1,0,0,0,2,0,4,4,0,0,1,8,0,1,1,0,0,0,2,0ZM18,8a4,4,0,1,1,4-4A4,4,0,0,1,18,8Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,18,2Zm6,13a6.006,6.006,0,0,0-6-6,1,1,0,0,0,0,2,4,4,0,0,1,4,4,1,1,0,0,0,2,0ZM6,8a4,4,0,1,1,4-4A4,4,0,0,1,6,8ZM6,2A2,2,0,1,0,8,4,2,2,0,0,0,6,2ZM2,15a4,4,0,0,1,4-4A1,1,0,0,0,6,9a6.006,6.006,0,0,0-6,6,1,1,0,0,0,2,0Z"/>
                                                    </svg>

                                                )
                                            }
                                            {
                                                !post.isGroup && (


                                                    <svg xmlns="http://www.w3.org/2000/svg" className={"fill-76"}
                                                         height="18"
                                                         viewBox="0 0 24 24" width="18">
                                                        <path
                                                            d="m7.5 13a4.5 4.5 0 1 1 4.5-4.5 4.505 4.505 0 0 1 -4.5 4.5zm0-7a2.5 2.5 0 1 0 2.5 2.5 2.5 2.5 0 0 0 -2.5-2.5zm7.5 17v-.5a7.5 7.5 0 0 0 -15 0v.5a1 1 0 0 0 2 0v-.5a5.5 5.5 0 0 1 11 0v.5a1 1 0 0 0 2 0zm9-5a7 7 0 0 0 -11.667-5.217 1 1 0 1 0 1.334 1.49 5 5 0 0 1 8.333 3.727 1 1 0 0 0 2 0zm-6.5-9a4.5 4.5 0 1 1 4.5-4.5 4.505 4.505 0 0 1 -4.5 4.5zm0-7a2.5 2.5 0 1 0 2.5 2.5 2.5 2.5 0 0 0 -2.5-2.5z"/>
                                                    </svg>


                                                )
                                            }
                                            {
                                                post.isTechSup && (


                                                    <svg xmlns="http://www.w3.org/2000/svg" className={"fill-76"}
                                                         viewBox="0 0 24 24" width="18" height="18">
                                                        <path
                                                            d="m7,14c2.206,0,4-1.794,4-4s-1.794-4-4-4-4,1.794-4,4,1.794,4,4,4Zm0-6c1.103,0,2,.897,2,2s-.897,2-2,2-2-.897-2-2,.897-2,2-2Zm7,15c0,.553-.448,1-1,1s-1-.447-1-1c0-2.757-2.243-5-5-5s-5,2.243-5,5c0,.553-.448,1-1,1s-1-.447-1-1c0-3.859,3.14-7,7-7s7,3.141,7,7ZM24,5v8c0,2.757-2.243,5-5,5h-4c-.552,0-1-.447-1-1v-2c0-.553.448-1,1-1h3c.552,0,1,.447,1,1v1c1.654,0,3-1.346,3-3V5c0-1.654-1.346-3-3-3h-9.535c-1.068,0-2.064.575-2.599,1.501-.277.478-.888.643-1.366.364-.479-.276-.642-.888-.365-1.366.892-1.541,2.551-2.499,4.331-2.499h9.535c2.757,0,5,2.243,5,5Z"/>
                                                    </svg>


                                                )
                                            }
                                        </div>
                                    </div>
                                    <p className="font-bold">{post.isGroup}</p>
                                    <p className="font-bold">{post.isTechSup}</p>
                                    <div className="flex flex-row mt-1 justify-start items-center">

                                        <img className="rounded-full w-8 h-8 hidden md:block"
                                            // src="https://images.unsplash.com/profile-1709797368653-c9a3d3c2bf26?fm=jpg&amp;q=60&amp;w=3000&amp;ixlib=rb-4.0.3&amp;crop=faces&amp;fit=crop&amp;h=32"
                                             src={`${api_url}/${post.avatarUrl}`}
                                             alt="user photo"/>
                                        <p className="text-sm md:ml-2">{post.fullName}</p>
                                    </div>
                                    <div className="flex flex-row justify-between mt-2">

                                        <p className="text-sm">{post.msg}</p>
                                        <p className="text-sm">{(() => {
                                            const messageDate = new Date(post.msgCrt);
                                            const today = new Date();

                                            // Сравниваем только год, месяц и день
                                            if (messageDate.getFullYear() === today.getFullYear() &&
                                                messageDate.getMonth() === today.getMonth() &&
                                                messageDate.getDate() === today.getDate()) {
                                                // Если сообщение сегодня, показываем время
                                                return messageDate.toLocaleTimeString([], {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                });
                                            } else {
                                                // Иначе показываем дату
                                                return new Intl.DateTimeFormat(`${lang}`, {
                                                    year: 'numeric',
                                                    month: '2-digit',
                                                    day: '2-digit'

                                                }).format(messageDate);
                                            }
                                        })()}</p>
                                    </div>
                                    {/*<p>{post.msgUsId}</p>*/}
                                </div>
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