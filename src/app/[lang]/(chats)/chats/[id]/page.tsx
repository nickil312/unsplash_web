'use client'
import {useContext, useEffect, useRef, useState} from "react";
import {WebsocketContext} from "@/app/websocket_provider";
import {usePathname, useRouter} from "next/navigation";
import ChatBody from "@/app/components/Chat/ChatBody";
// import autosize from 'autosize'
import axios from "@/app/chat_axios";
import {useSelector} from "react-redux";
import {RootState} from "@/app/globalRedux/store";
import OldChatMessages from "@/app/components/Chat/OldChatMessages";

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

    const router = useRouter()

    useEffect(() => {
        if (conn === null) {
            router.push(`/${lang}`)
            return
        }

        // const roomId = conn.url.split('/')[5]
        async function getUsers() {
            // try {
            //     const res = await fetch(`${API_URL}/ws/getClients/${roomId}`, {
            //         method: 'GET',
            //         headers: { 'Content-Type': 'application/json' },
            //     })
            //     const data = await res.json()
            //     console.log(data)
            //     setUsers(data)
            // } catch (e) {
            //     console.error(e)
            // }
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

        // conn.onmessage = (message) => {
        //   const m: Message = JSON.parse(message.data)
        //   if (m.content == 'A new user has joined the room') {
        //     setUsers([...users, { fullname: m.fullname }])
        //   }

        //   if (m.content == 'user left the chat') {
        //     const deleteUser = users.filter((user) => user.fullname != m.fullname)
        //     setUsers([...deleteUser])
        //     setMessage([...messages, m])
        //     return
        //   }

        //   user?.fullname == m.fullname ? (m.type = 'self') : (m.type = 'recv')
        //   setMessage([...messages, m])
        // }
        conn.onmessage = (message) => {
            const m: Message = JSON.parse(message.data);

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
                m.type = data?.fullname === m.fullname ? 'self' : 'recv';
                const date = new Date();
                m.createdAt = date.toISOString();
            }
            setMessage((prevMessages) => [...prevMessages, m]);
        };

        conn.onclose = () => {
        }
        conn.onerror = () => {
        }
        conn.onopen = () => {
        }
    }, [textarea, messages, conn, users])

    // // Прокрутка вниз при обновлении сообщений
    // useEffect(() => {
    //     if (messagesEndRef.current) {
    //         messagesEndRef.current.scrollIntoView({ behavior: "instant" });
    //     }
    // }, [messages]);


    const sendMessage = () => {
        if (!textarea.current?.value) return
        if (conn === null) {
            router.push('/')
            return
        }


        conn.send(textarea.current.value)


        textarea.current.value = ''
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Предотвращаем переход на новую строку
            sendMessage();
        }
    };


    return (
        <>
            <div className='flex flex-col w-full'>
                <div className='p-4 md:mx-6 mb-14'>
                    <OldChatMessages lang={lang} id={id}/>
                    <ChatBody data={messages} lang={lang} api_url={api_url} roomId={id}/>
                    {/*<div ref={messagesEndRef} /> /!* Элемент для прокрутки *!/*/}

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
                            <button
                                className='p-2 rounded-md bg-blue text-white'
                                onClick={sendMessage}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}