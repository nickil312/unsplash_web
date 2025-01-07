'use client'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/globalRedux/store";
import {usePathname, useRouter} from "next/navigation";
import React, {useEffect, useRef, useState} from "react";
import {fetchOld_Messages} from "@/app/globalRedux/chats/asyncActions";
import {Messages} from "@/app/globalRedux/chats/types";
import MessageCard from "@/app/components/Chat/MessageCard";
import {Status} from "@/app/globalRedux/posts/types";
import {crearChatOldMessages} from "@/app/globalRedux/chats/slice";

export default function OldChatMessages({lang, id}: { lang: string, id: string }) {
    const dispatch = useDispatch<AppDispatch>();
    const {items, status} = useSelector((state: RootState) => state.chats.chat_old_Messages);
    const {api_url, data} = useSelector((state: RootState) => state.users);
    const pathname = usePathname()
    const router = useRouter()

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [page, setPage] = useState(1); // Состояние для хранения номера страницы
    const [allMessages, setAllMessages] = useState<Messages[]>(items); // Состояние для хранения всех сообщений

    const loadingMoreRef = useRef(false); // Используем useRef для отслеживания состояния загрузки


    useEffect(() => {
        if (data !== null) {
            dispatch(fetchOld_Messages({
                chatId: id,
                page: page.toString()
            }))
        }

        console.log(page)
    }, [data, page]);

    // useEffect(() => {
    //     // Обновляем состояние allMessages при изменении items, если items не пустой и является массивом
    //     if (items !== null && Array.isArray(items) && items.length > 0) {
    //         setAllMessages((prevMessages) => {
    //             // Проверяем, чтобы избежать дублирования
    //             const newMessages = items.filter(item => !prevMessages.some(prev => prev.id === item.id));
    //             return [...newMessages, ...prevMessages];
    //         });
    //
    //     }
    //
    // }, [items]);
    useEffect(() => {
        console.log(items)
        if (items === null && status === Status.SUCCESS){
            dispatch(crearChatOldMessages());
        } else {
            // Обновляем состояние allMessages при изменении items, если items не пустой и является массивом
            if (items !== null && Array.isArray(items) && items.length > 0) {
                // Проверяем, если roomId первого элемента не равен id
                if (items[0].roomId !== id) {
                    dispatch(crearChatOldMessages());

                } else {

                    setAllMessages((prevMessages) => {
                        // Проверяем, чтобы избежать дублирования
                        const newMessages = items.filter(item => !prevMessages.some(prev => prev.id === item.id));
                        return [...newMessages, ...prevMessages];
                    });
                }
            }
        }
    }, [items, id]);
    const handleScroll = () => {
        if (messagesEndRef.current) {
            const {scrollTop} = messagesEndRef.current;
            if (scrollTop === 0 && !loadingMoreRef.current) { // Если прокрутка достигла верхнего края
                console.log("Reached the top, loading more messages...");
                // const currentScrollHeight = messagesEndRef.current.scrollHeight; // Сохраняем текущее значение высоты
                loadingMoreRef.current = true; // Устанавливаем состояние загрузки

                // setPage(page + 1); // Увеличиваем номер страницы
                setPage((prevPage) => prevPage + 1); // Увеличиваем номер страницы

                // После загрузки новых сообщений, восстанавливаем scrollTop
                // setTimeout(() => {
                //     if (messagesEndRef.current) { // Проверяем, что messagesEndRef.current не null
                //         const newScrollHeight = messagesEndRef.current.scrollHeight; // Получаем новую высоту после загрузки
                //         messagesEndRef.current.scrollTop = newScrollHeight - currentScrollHeight; // Восстанавливаем позицию прокрутки
                //     }
                // }, 100); // Задержка, чтобы убедиться, что новые сообщения загружены
            }
        }
    };
    // Используем useEffect для добавления обработчика события прокрутки
    useEffect(() => {
        const currentRef = messagesEndRef.current;
        if (currentRef) {
            currentRef.addEventListener("scroll", handleScroll);
        }

        // Убираем обработчик при размонтировании компонента
        return () => {
            if (currentRef) {
                currentRef.removeEventListener("scroll", handleScroll);
            }
        };
    }, [messagesEndRef]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight; // Прокручиваем вниз
        }
    }, [allMessages]); // Запускаем эффект при изменении allMessages

// Используем useEffect для отслеживания изменения page и сброса loadingMoreRef
    useEffect(() => {
        if (loadingMoreRef.current) {
            if (messagesEndRef.current) {
                const currentScrollHeight = messagesEndRef.current.scrollHeight; // Сохраняем текущее значение высоты

                loadingMoreRef.current = false; // Сбрасываем состояние загрузки после обновления page

                const newScrollHeight = messagesEndRef.current.scrollHeight; // Получаем новую высоту после загрузки
                messagesEndRef.current.scrollTop = newScrollHeight - currentScrollHeight; // Восстанавливаем позицию прокрутки
            }
        }
    }, [page]);

    // return (
    //
    //
    //     // <div ref={messagesEndRef}
    //     //
    //     //      style={{overflowY: 'auto', maxHeight: '400px'}}> {/* Установите максимальную высоту и прокрутку */}
    //     <div
    //         ref={messagesEndRef}
    //         style={{overflowY: "auto", maxHeight: '100vh', flexGrow: 1}} // Установите максимальную высоту и прокрутку
    //         onScroll={handleScroll} // Добавьте обработчик прокрутки
    //     >
    //         {allMessages && allMessages.length > 0 ? (
    //
    //             allMessages.map((message: Messages) => {
    //                 if (data !== null && message._id === data._id) {
    //                     return (
    //
    //                         <MessageCard id={message.id} _id={message._id} lang={lang}
    //                                      self={true} content={message.content}
    //                                      fullname={message.fullname}
    //                                      createdAt={message.createdAt}
    //                                      avatarUrl={message.avatarUrl}
    //                                      roomId={message.roomId}
    //                                      api_url={api_url}/>
    //                     )
    //                 } else {
    //                     return (
    //                         <MessageCard id={message.id} _id={message._id} lang={lang}
    //                                      self={false} content={message.content}
    //                                      fullname={message.fullname}
    //                                      createdAt={message.createdAt}
    //                                      avatarUrl={message.avatarUrl}
    //                                      roomId={message.roomId}
    //                                      api_url={api_url}/>
    //                     );
    //                 }
    //             })) : (
    //             items === null ? (
    //                 <div style={{textAlign: 'center', padding: '20px'}}>Сообщений нет</div> // Сообщение о том, что сообщений нет
    //             ) : (
    //                 <div style={{textAlign: 'center', padding: '20px'}}>Загрузка...</div> // Текст загрузки
    //             ))
    //         }
    //     </div>
    //
    // )
    return (
        <div
            ref={messagesEndRef}
            style={{ overflowY: "auto", maxHeight: '100vh', flexGrow: 1 }} // Установите максимальную высоту и прокрутку
            onScroll={handleScroll} // Добавьте обработчик прокрутки
        >
            {status === Status.LOADING ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>Загрузка...</div> // Сообщение о загрузке
            ) : status === Status.ERROR ? (
                <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>Произошла ошибка при загрузке сообщений.</div> // Сообщение об ошибке
            ) : status === Status.SUCCESS && (items === null || items.length === 0 && allMessages && allMessages.length < 0) ? (
                <div style={{ textAlign: 'center', padding: '20px' }}>Сообщений нет</div> // Сообщение о том, что сообщений нет
            ) : allMessages && allMessages.length > 0 ? (
                allMessages.map((message: Messages) => {
                    if (data !== null && message._id === data._id) {
                        return (
                            <MessageCard
                                key={message._id} // Добавьте уникальный ключ для каждого элемента
                                id={message.id}
                                _id={message._id}
                                lang={lang}
                                self={true}
                                content={message.content}
                                fullname={message.fullname}
                                createdAt={message.createdAt}
                                avatarUrl={message.avatarUrl}
                                roomId={message.roomId}
                                api_url={api_url}
                            />
                        );
                    } else {
                        return (
                            <MessageCard
                                key={message._id} // Добавьте уникальный ключ для каждого элемента
                                id={message.id}
                                _id={message._id}
                                lang={lang}
                                self={false}
                                content={message.content}
                                fullname={message.fullname}
                                createdAt={message.createdAt}
                                avatarUrl={message.avatarUrl}
                                roomId={message.roomId}
                                api_url={api_url}
                            />
                        );
                    }
                })
            ) : (
                <div style={{ textAlign: 'center', padding: '20px' }}>Неизвестный статус</div> // Сообщение для неизвестного статуса
            )}
        </div>
    );}