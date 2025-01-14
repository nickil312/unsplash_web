'use client'
import React, {useContext, useEffect, useRef, useState} from "react";
import {WebsocketContext} from "@/app/websocket_provider";
import {usePathname, useRouter} from "next/navigation";
import ChatBody from "@/app/components/Chat/ChatBody";
// import autosize from 'autosize'
import axios from "@/app/chat_axios";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/globalRedux/store";
import OldChatMessages from "@/app/components/Chat/OldChatMessages";
import {crearChatOldMessages} from "@/app/globalRedux/chats/slice";
import {v4 as uuidv4} from 'uuid';
import {Messages} from "@/app/globalRedux/chats/types";
import {fetchOld_Messages} from "@/app/globalRedux/chats/asyncActions";
import {Status} from "@/app/globalRedux/posts/types";
import MessageCard from "@/app/components/Chat/MessageCard";

type DetailChatsProps = {
    params: {
        id: string;
    }
}
export type Message = {
    content: string
    createdAt: string
    _id: string
    fullname: string
    avatarUrl: string
    room_id: string
    type: 'recv' | 'self'
    edit: boolean
    id: string
    deleted: boolean
}
export default function ChatsDetail(params: DetailChatsProps) {
    const id = params.params.id;
    const [messages, setMessage] = useState<Array<Message>>([])
    const textarea = useRef<HTMLTextAreaElement>(null)

    const {conn} = useContext(WebsocketContext)
    const [users, setUsers] = useState<Array<{ fullname: string, _id: string }>>([])
    // const { user } = useContext(AuthContext)
    const {api_url, data} = useSelector((state: RootState) => state.users);
    const pathname = usePathname()
    const lang = pathname.split('/')[1];
    // const messagesEndRef = useRef<HTMLDivElement>(null); // Создаем ref для конца списка сообщений
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()


    const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
    const [editingMessageContent, setEditingMessageContent] = useState("");
    const [deleteId, setDeleteId] = useState<string | null>(null);


    useEffect(() => {
        if (conn === null) {
            router.push(`/${lang}`)
            return
        }

        // const roomId = conn.url.split('/')[5]
        async function getUsers() {
            try {
                const res = await axios.get(`/ws/getClients/${id}`, {
                    headers: {'Content-Type': 'application/json'},
                });
                console.log(res.data); // Выводим данные в консоль
                setUsers(res.data); // Устанавливаем пользователей
            } catch (e) {
                console.error(e);
            }
        }

        getUsers()
    }, [])

    useEffect(() => {
        // if (textarea.current) {
        //     autosize(textarea.current)
        // }

        if (conn === null) {
            router.push('/')
            return
        }

        conn.onmessage = (message) => {
            const m: Message = JSON.parse(message.data);
            console.log("m ___________ ", m)
            // Убедитесь, что fullname присутствует в сообщении
            if (m.content === 'A new user has joined the room') {
                setUsers((prevUsers) => [...prevUsers, {fullname: m.fullname, _id: m._id}]);
            }

            if (m.content === 'user left the chat') {
                setUsers((prevUsers) => prevUsers.filter((user) => user.fullname !== m.fullname));
                setMessage((prevMessages) => [...prevMessages, m]);
                return;
            }
            if (data !== null) {

                // Устанавливаем тип сообщения и fullname
                m.type = data?._id === m._id ? 'self' : 'recv';
                const date = new Date();
                m.createdAt = date.toISOString();
            }
            if (m.deleted) {
                setMessage((prevMessages) =>
                    prevMessages.filter((msg) => msg.id !== m.id) // Удаляем сообщение из состояния
                );
                setAllMessages((prevAllMessages) =>
                    prevAllMessages.filter((msg) => msg.id !== m.id) // Удаляем сообщение из состояния
                );
            } else if (m.edit) {
                setMessage((prevMessages) =>
                    prevMessages.map((msg) =>
                        msg.id === m.id ? {...msg, content: m.content,edit:true} : msg
                    )
                );
                setAllMessages((prevAllMessages) =>
                    prevAllMessages.map((msg) =>
                        msg.id === m.id ? { ...msg, content: m.content, edit: true } : msg
                    )
                );
            } else {
                setMessage((prevMessages) => [...prevMessages, m]);
            }
            // setMessage((prevMessages) => [...prevMessages, m]);
        };

        conn.onclose = () => {
        }
        conn.onerror = () => {
        }
        conn.onopen = () => {
        }
    }, [textarea, messages, conn, users])

    const sendMessage = () => {
        if (!textarea.current?.value) return
        if (conn === null) {
            router.push('/')
            return
        }

//тут придется id генерить
        const messageContent = textarea.current.value;
        if (editingMessageId === null) {

            const messageId = uuidv4().substring(0, 24);
            const message = {
                content: messageContent,
                id: messageId, // Use a unique ID for new messages
                edit: false, // Set the edit flag if editing
                deleted: false,
            };

            // Send the message through the WebSocket connection
            conn.send(JSON.stringify(message));
        } else {
            const message = {
                content: messageContent,
                id: editingMessageId, // Use a unique ID for new messages
                edit: true, // Set the edit flag if editing
                deleted: false
            };
            conn.send(JSON.stringify(message));

// Обновляем сообщение в allMessages
            setAllMessages((prevAllMessages) =>
                prevAllMessages.map((msg) =>
                    msg.id === editingMessageId ? { ...msg, content: messageContent, edit: true } : msg
                )
            );
        }
        // conn.send(textarea.current.value)


        textarea.current.value = ''
        setEditingMessageId(null); // Reset editing state after sending
        setEditingMessageContent("");
    }


    const editMessage = (message) => {
        console.log("edit button")
        if (textarea.current !== null) {
            console.log("edit button done")

            setEditingMessageId(message.id);
            setEditingMessageContent(message.content);

            textarea.current.value = message.content; // Заполняем текстовое поле содержимым сообщения
        }
    };
    const deleteMessage = (id: string) => {
        console.log("delete button")
        if (conn === null) {
            router.push('/')
            return
        }
        console.log("deleted mess _______ id", id)
        setDeleteId(id);
        // if(deleteId !== null){
        const message = {
            id: id, // Use a unique ID for new messages
            deleted: true,
            content: "deleted message",
            edit: false, // Set the edit flag if editing
        };
        conn.send(JSON.stringify(message));

        setAllMessages((prevAllMessages) => prevAllMessages.filter((msg) => msg.id !== id));

        // }
    }


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Предотвращаем переход на новую строку
            sendMessage();
        }
    };

    // __________________________
    const {items, status} = useSelector((state: RootState) => state.chats.chat_old_Messages);

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

    useEffect(() => {
        console.log(items)
        // if (!textarea.current?.value) {
        //     console.log("textarea null",textarea.current)
        // }
        //
        // if(textarea.current !== null){
        //
        // console.log("textarea",textarea.current.value)
        // }
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
                loadingMoreRef.current = true; // Устанавливаем состояние загрузки

                setPage((prevPage) => prevPage + 1); // Увеличиваем номер страницы
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
    // __________________________
    return (

        <div className='flex flex-col w-full '> {/* Установите высоту на 100% экрана */}
            <div
                className='p-4 md:mx-6 pb-14 pt-8 '> {/* Используйте flex-grow для заполнения оставшегося пространства */}
                {/*<OldChatMessages newMessages={messages} lang={lang} id={id} onEdit={editMessage}*/}
                {/*                 onDelete={deleteMessage}/>*/}
                {/*__________________________*/}


                <div
                    ref={messagesEndRef}
                    style={{
                        overflowY: "auto",
                        maxHeight: '100vh',
                        flexGrow: 1
                    }} // Установите максимальную высоту и прокрутку
                    onScroll={handleScroll} // Добавьте обработчик прокрутки
                >
                    {status === Status.LOADING ? (
                        <div style={{textAlign: 'center', padding: '20px'}}>Загрузка...</div> // Сообщение о загрузке
                    ) : status === Status.ERROR ? (
                        <div style={{textAlign: 'center', padding: '20px', color: 'red'}}>Произошла ошибка при загрузке
                            сообщений.</div> // Сообщение об ошибке
                    ) : status === Status.SUCCESS && (items === null || items.length === 0 && allMessages === null || allMessages.length === 0) ? (
                        <div style={{textAlign: 'center', padding: '20px'}}>Сообщений нет</div> // Сообщение о том, что сообщений нет
                    ) : allMessages && allMessages.length > 0 ? (
                        allMessages.map((message: Messages) => {
                            if (data !== null && message._id === data._id) {
                                return (
                                    <MessageCard
                                        key={message.id} // Добавьте уникальный ключ для каждого элемента
                                        id={message.id}
                                        _id={message._id}
                                        lang={lang}
                                        self={true}
                                        edit={message.edit}
                                        content={message.content}
                                        fullname={message.fullname}
                                        createdAt={message.createdAt}
                                        avatarUrl={message.avatarUrl}
                                        roomId={message.roomId}
                                        api_url={api_url}
                                        // @ts-ignore
                                        onEdit={() => editMessage(message)}
                                        onDelete={() => deleteMessage(message.id)}
                                    />
                                );
                            } else {
                                return (
                                    <MessageCard
                                        key={message.id} // Добавьте уникальный ключ для каждого элемента
                                        id={message.id}
                                        _id={message._id}
                                        lang={lang}
                                        self={false}
                                        edit={message.edit}
                                        content={message.content}
                                        fullname={message.fullname}
                                        createdAt={message.createdAt}
                                        avatarUrl={message.avatarUrl}
                                        roomId={message.roomId}
                                        api_url={api_url}
                                        // @ts-ignore
                                        onEdit={() => editMessage(message)}
                                        onDelete={() => deleteMessage(message.id)}
                                    />
                                );
                            }
                        })
                    ) : (
                        <div style={{textAlign: 'center', padding: '20px'}}>Неизвестный статус</div> // Сообщение для неизвестного статуса
                    )}
                    {/*<ChatBody data={newMessages} lang={lang} api_url={api_url} roomId={id} onEdit={onEdit}*/}
                    {/*          onDelete={onDelete}/>*/}
                    <ChatBody data={messages} lang={lang} api_url={api_url} roomId={id} onEdit={editMessage} onDelete={deleteMessage}/>

                </div>


                {/*__________________________*/}
                {/*<ChatBody data={messages} lang={lang} api_url={api_url} roomId={id} onEdit={editMessage} onDelete={deleteMessage}/>*/}

            </div>
            <div className='fixed bottom-0 mt-4 w-full'>
                <div className='flex md:flex-row px-4 py-2 bg-grey md:mx-4 rounded-md'>
                    <div className='flex w-full mr-4 rounded-md border border-blue'>
              <textarea
                  ref={textarea}
                  onKeyDown={handleKeyDown} // Добавляем обработчик нажатия клавиш
                  placeholder='type your message here'
                  className='w-full h-10 p-2 rounded-md focus:outline-none'
                  style={{resize: 'none'}}
              />
                    </div>
                    <div className='flex items-center'>
                        {/*<button*/}
                        {/*    className='p-2 rounded-md bg-blue text-white'*/}
                        {/*    onClick={sendMessage}*/}
                        {/*>*/}
                        {/*    Send*/}
                        {/*</button>*/}
                        <button className="p-2 rounded-md bg-blue text-white" onClick={sendMessage}>
                            {editingMessageId ? "Update" : "Send"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}