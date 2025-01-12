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
import {Button} from "@nextui-org/button";
import {Input} from "@nextui-org/input";

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
                    <div className={'flex flex-row mt-2 w-full items-end justify-end'}>

                        <p>
                            {content}
                        </p>
                        {edit &&
                            <p className="text-gray-500">(changed)</p>} {/* Отображаем "(changed)" если edit true */}


                        <div className='text-xs ml-2'>{new Intl.DateTimeFormat(`${lang}`, {
                            hour: '2-digit',
                            minute: '2-digit'
                        }).format(new Date(createdAt))}</div>
                        {/* Кнопка редактирования для сообщений от себя */}
                        {/*<button onClick={onEdit} className="ml-2 text-blue-500">Edit</button>*/}


                    </div>
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
            <div className={'mt-2 flex flex-row '}>
                <Link href={`/${lang}/${_id}`}>

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
                        {/* Кнопка редактирования для сообщений от других пользователей */}
                        {/*<button onClick={onEdit} className="ml-2 text-blue-500">Edit</button>*/}

                    </div>
                </div>
            </div>

        )
    }
}
