import React from 'react'
import {Message} from "@/app/[lang]/(chats)/chats/[id]/page";
import MessageCard from "@/app/components/Chat/MessageCard";


export default function ChatBody ({ data,lang,api_url,roomId }: { data: Array<Message>,lang: string,api_url:string,roomId:string }) {
    // в MessageCard в id просто заглушка стоит нужно будет пофиксить
    return (
        <>
            {data.map((message: Message, index: number) => {
                if (message.type === 'self') {
                    return (

                    <MessageCard id={message._id} _id={message._id} lang={lang}
                                 self={true} content={message.content}
                                 fullname={message.fullname}
                                 createdAt={message.createdAt}
                                 avatarUrl={message.avatarUrl}
                                 roomId={roomId}
                                 api_url={api_url}/>
                    );
                } else {
                    return (
                        // <div className='mt-2' key={index}>
                        //     <div className='text-sm'>{message.fullname}</div>
                        //     <div className='text-sm'>{message._id}</div>
                        //     <div className='text-sm'>{new Intl.DateTimeFormat(`${lang}`, {
                        //         hour: '2-digit',
                        //         minute: '2-digit'
                        //     }).format(new Date(message.createdAt))}</div>
                        //     <div>
                        //         <div className='bg-grey text-dark-secondary px-4 py-1 rounded-md inline-block mt-1'>
                        //             {message.content}
                        //         </div>
                        //     </div>
                        // </div>
                        <MessageCard id={message._id} _id={message._id} lang={lang}
                                     self={false} content={message.content}
                                     fullname={message.fullname}
                                     createdAt={message.createdAt}
                                     avatarUrl={message.avatarUrl}
                                     roomId={roomId}
                                     api_url={api_url}/>
                    );
                }
            })}
        </>
    );
};
