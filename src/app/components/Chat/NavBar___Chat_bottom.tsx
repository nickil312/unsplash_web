'use client'
import {usePathname} from "next/navigation";
import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/app/globalRedux/store";
import {Modal, ModalBody, ModalContent, useDisclosure} from "@nextui-org/modal";
import {router} from "next/client";
import ChatDetailModal from "@/app/components/Chat/modal/ChatDetailModal";

export default function NavBar_Chat_bottom() {
    const pathname = usePathname();
    const lang = pathname.split('/')[1] as "en" | "ru";
    const {chat_info} = useSelector((state: RootState) => state.chats);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    useEffect(() => {
        // console.log(pathname);
        console.log("chat_info", chat_info)
    }, [pathname]);

    // Проверяем, начинается ли путь с /en/chats/ или /ru/chats/ и есть ли что-то после
    if ((pathname.startsWith("/en/chats/") || pathname.startsWith("/ru/chats/"))) {
        return (
            <>
                {
                    chat_info !== null ? (
                        <>

                            <Modal size="xl" placement="center" onOpenChange={onOpenChange} isOpen={isOpen}
                                   classNames={{
                                       body: "p-0 rounded-sm dark:bg-black"
                                   }}>
                                <ModalContent>


                                    <ModalBody>
                                        <ChatDetailModal chatId={chat_info.chatId} />
                                    </ModalBody>


                                </ModalContent>
                            </Modal>

                            <div className="flex items-center justify-start w-full"
                                 onClick={() => (chat_info !== null ? onOpen() : router.push(`/${lang}/chats`))}

                            >

                                <p className=" w-full">{chat_info.chatName}</p>
                                <div className="flex items-center justify-end gap-2 w-full">


                                    {
                                        chat_info.isGroup && (

                                            <svg xmlns="http://www.w3.org/2000/svg" className={"fill-76"} id="Layer_1"
                                                 data-name="Layer 1"
                                                 viewBox="0 0 24 24" width="18" height="18">
                                                <path
                                                    d="M12,16a4,4,0,1,1,4-4A4,4,0,0,1,12,16Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,12,10Zm6,13A6,6,0,0,0,6,23a1,1,0,0,0,2,0,4,4,0,0,1,8,0,1,1,0,0,0,2,0ZM18,8a4,4,0,1,1,4-4A4,4,0,0,1,18,8Zm0-6a2,2,0,1,0,2,2A2,2,0,0,0,18,2Zm6,13a6.006,6.006,0,0,0-6-6,1,1,0,0,0,0,2,4,4,0,0,1,4,4,1,1,0,0,0,2,0ZM6,8a4,4,0,1,1,4-4A4,4,0,0,1,6,8ZM6,2A2,2,0,1,0,8,4,2,2,0,0,0,6,2ZM2,15a4,4,0,0,1,4-4A1,1,0,0,0,6,9a6.006,6.006,0,0,0-6,6,1,1,0,0,0,2,0Z"/>
                                            </svg>

                                        )
                                    }
                                    {
                                        !chat_info.isGroup && (


                                            <svg xmlns="http://www.w3.org/2000/svg" className={"fill-76"} height="18"
                                                 viewBox="0 0 24 24" width="18">
                                                <path
                                                    d="m7.5 13a4.5 4.5 0 1 1 4.5-4.5 4.505 4.505 0 0 1 -4.5 4.5zm0-7a2.5 2.5 0 1 0 2.5 2.5 2.5 2.5 0 0 0 -2.5-2.5zm7.5 17v-.5a7.5 7.5 0 0 0 -15 0v.5a1 1 0 0 0 2 0v-.5a5.5 5.5 0 0 1 11 0v.5a1 1 0 0 0 2 0zm9-5a7 7 0 0 0 -11.667-5.217 1 1 0 1 0 1.334 1.49 5 5 0 0 1 8.333 3.727 1 1 0 0 0 2 0zm-6.5-9a4.5 4.5 0 1 1 4.5-4.5 4.505 4.505 0 0 1 -4.5 4.5zm0-7a2.5 2.5 0 1 0 2.5 2.5 2.5 2.5 0 0 0 -2.5-2.5z"/>
                                            </svg>


                                        )
                                    }
                                    {
                                        chat_info.isTechSup && (


                                            <svg xmlns="http://www.w3.org/2000/svg" className={"fill-76"}
                                                 viewBox="0 0 24 24" width="18" height="18">
                                                <path
                                                    d="m7,14c2.206,0,4-1.794,4-4s-1.794-4-4-4-4,1.794-4,4,1.794,4,4,4Zm0-6c1.103,0,2,.897,2,2s-.897,2-2,2-2-.897-2-2,.897-2,2-2Zm7,15c0,.553-.448,1-1,1s-1-.447-1-1c0-2.757-2.243-5-5-5s-5,2.243-5,5c0,.553-.448,1-1,1s-1-.447-1-1c0-3.859,3.14-7,7-7s7,3.141,7,7ZM24,5v8c0,2.757-2.243,5-5,5h-4c-.552,0-1-.447-1-1v-2c0-.553.448-1,1-1h3c.552,0,1,.447,1,1v1c1.654,0,3-1.346,3-3V5c0-1.654-1.346-3-3-3h-9.535c-1.068,0-2.064.575-2.599,1.501-.277.478-.888.643-1.366.364-.479-.276-.642-.888-.365-1.366.892-1.541,2.551-2.499,4.331-2.499h9.535c2.757,0,5,2.243,5,5Z"/>
                                            </svg>


                                        )
                                    }
                                </div>
                            </div>
                        </>
                    ) : (
                        <p>error with chat</p>
                    )

                }
                {/*<p>{chat_info !== null ? chat_info.chatName : <p>ошибка с чатом</p>}</p>*/}
            </>
        );
    }

    return null; // Возвращаем null, если условие не выполнено
}