import {Messages} from "@/app/globalRedux/chats/types";
import React from "react";
import Link from "next/link";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    PopoverContent,
    Popover,
    PopoverTrigger
} from "@nextui-org/react";


type MessageCardProps = Messages & {
    self: boolean;
    lang: string;
    api_url: string;
    onEdit: () => void;
    onDelete: () => void;
}
export default function MessageCard({
                                        fullname,
                                        avatarUrl,
                                        _id,
                                        content,
                                        createdAt,
                                        self,
                                        lang,
                                        api_url,
                                        onEdit,
                                        edit,
                                        onDelete
                                    }: MessageCardProps) {
    if (self) {

        return (

            <Popover showArrow offset={10} placement="bottom-end">
                <PopoverTrigger>
                    {
                        edit ? (
                            <div className={'flex flex-col mt-2 w-full items-end justify-end'}>

                                <p>
                                    {content}
                                </p>
                                <div className="flex flex-row gap-0.5 mt-1 items-end justify-end">

                                {/* Отображаем "(changed)" если edit true */}
                                <p className='text-xs text-gray-500'>
                                    {lang === "en" ? <>edited</> : <>изменено</>}
                                </p>

                                <div className='text-xs ml-2'>{new Intl.DateTimeFormat(`${lang}`, {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                }).format(new Date(createdAt))}</div>
                                </div>
                                {/* Кнопка редактирования для сообщений от себя */}
                                {/*<button onClick={onEdit} className="ml-2 text-blue-500">Edit</button>*/}


                            </div>
                        ) : (
                            <div className={'flex flex-col mt-2 w-full items-end justify-end'}>

                                <p>
                                    {content}
                                </p>


                                <div className='text-xs ml-2'>{new Intl.DateTimeFormat(`${lang}`, {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                }).format(new Date(createdAt))}</div>
                                {/* Кнопка редактирования для сообщений от себя */}
                                {/*<button onClick={onEdit} className="ml-2 text-blue-500">Edit</button>*/}


                            </div>
                        )
                    }

                </PopoverTrigger>
                <PopoverContent className="w-fit">
                    <div className="px-1 py-2 w-full flex flex-col justify-end ">
                        <button onClick={onEdit}>Edit</button>
                        <button onClick={onDelete} className="text-red-500 font-bold mt-1">Delete</button>
                    </div>


                </PopoverContent>
            </Popover>
        )
    } else {

        return (
            <div className={'mt-2 flex flex-row w-full'}>

                {/*<Link href={`/${lang}/${_id}`}>*/}
                    <img className="rounded-full w-8 h-8 shrink-0"
                         src={`${api_url}/${avatarUrl}`}
                         alt="user photo"/>
                {/*</Link>*/}
                <div className="flex flex-col ml-2 w-fit">

                    <p className='text-sm'>{fullname}</p>
                    {/*<div className='text-sm'>{_id} - id</div>*/}
                    <div className="flex flex-row mt-1 items-end ">

                        <p className="flex  ">
                            {content}
                        </p>

                        {/* Кнопка редактирования для сообщений от других пользователей */}
                        {/*<button onClick={onEdit} className="ml-2 text-blue-500">Edit</button>*/}

                    </div>
                    <div className="flex flex-row">
                        {
                            edit && (
                        <div className='text-xs text-gray-500 mr-1'>
                            {lang === "en" ? <>edited</> : <>изменено</>}
                        </div>

                            )
                        }
                        <div className='text-xs '>{new Intl.DateTimeFormat(`${lang}`, {
                            hour: '2-digit',
                            minute: '2-digit'
                        }).format(new Date(createdAt))}</div>
                    </div>
                </div>
            </div>

        )
    }
}
