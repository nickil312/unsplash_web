'use client'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/globalRedux/store";
import Link from "next/link";
import {DownloadImage} from "@/app/components/Products/func/DownloadImage";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {Modal, ModalBody, ModalContent, useDisclosure} from "@nextui-org/modal";
import CollectionModal from "@/app/components/Products/modal/CollectionModal/CollectionModal";
import {fetchLikesViewsDatabase, fetchReportedPostsDetail} from "@/app/globalRedux/posts/asyncActions";
import {Status} from "@/app/globalRedux/posts/types";

export interface ReportsCardProps {
    imageurl: string;
    fullname: string;
    title: string;
    text: string;
    user_id: string;
    post_id: string;
    _id: string;
    lang: string
    report_count: string
    banned: boolean
}

export default function ReportsCard({
                                        imageurl,
                                        fullname,
                                        title,
                                        text,
                                        user_id,
                                        post_id,
                                        _id,
                                        lang,
                                        report_count,
                                        banned
                                    }: ReportsCardProps) {
    const router = useRouter();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const {data, api_url} = useSelector((state: RootState) => (state.users))
    const dispatch = useDispatch<AppDispatch>();
    const {items, status} = useSelector((state: RootState) => state.posts.ReportPostsDetail);

    // useEffect(() => {
    //
    // }, []);

    return (
        <div className="flex flex-row  items-center justify-between w-full p-4 border-b-1 border-D1 ">

            <Link href={`/${lang}/photos/${_id}`}>
                <div className="flex flex-row  justify-start ">
                    <img src={`${api_url}/${imageurl}`} alt={title} className="w-14 h-14 object-cover rounded"/>
                    <div className="flex flex-col  justify-center pl-4">
                        <p className="text-sm">{title}</p>
                        <div className="flex flex-row  justify-start navBar_mobile_display_none">
                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"
                                 className="mr-1 fill-D1">
                                <path
                                    d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-1-2H6l3-3.9 2.1 2.6 3-3.9L18 17z"></path>
                            </svg>
                            <p className="text-76 text-xs">{text}</p>
                        </div>
                        {/*<div className="flex flex-row  justify-center navBar_mobile_display_none">*/}
                        {/*    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"*/}
                        {/*         className="mr-1 fill-D1">*/}
                        {/*        <path*/}
                        {/*            d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-1-2H6l3-3.9 2.1 2.6 3-3.9L18 17z"></path>*/}
                        {/*    </svg>*/}
                        {/*    <p className="text-76 text-xs">{fullname}</p>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </Link>

            <p>{lang === "en" ? "report count" : "количество жалоб"} - {report_count}</p>

            <div className="button_settings_style cursor-pointer"
                // onClick={() => (data !== null ? onOpen() : router.push(`/${lang}/login`))}
                 onClick={() => {
                     if (data !== null) {
                         console.log(post_id)
                         dispatch(fetchReportedPostsDetail({_id: post_id})); // Вызов dispatch
                         onOpen(); // Затем открываем модальное окно
                         console.log("items", items)
                     } else {
                         router.push(`/${lang}/login`); // Если data равно null, перенаправляем на страницу логина
                     }
                 }}
            >

                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                     className="fill-76 w-[18px] h-[18px]">
                    <path
                        d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2Zm1.111 8.889v6.667H10.89v-6.667h2.222Zm0-4.445v2.223H10.89V6.444h2.222Z"></path>
                </svg>

            </div>
            <Modal size="3xl" placement="center" onOpenChange={onOpenChange} isOpen={isOpen} classNames={{
                body: "p-0 rounded-sm dark:bg-black"
            }}>
                <ModalContent>


                    <ModalBody>

                        {status === Status.LOADING ? (
                            <p>Loading...</p>
                        ) : items && items.length > 0 && status === Status.SUCCESS ? (
                            items.map((item) => (
                                <div className="p-3 border-y dark:border-29">
                                    <Link href={`/${lang}/${item.user_id}`}>
                                        <div className="flex flex-row items-center justify-start gap-2">

                                            <img className="rounded-full w-8 h-8 "
                                                // src="https://images.unsplash.com/profile-1709797368653-c9a3d3c2bf26?fm=jpg&amp;q=60&amp;w=3000&amp;ixlib=rb-4.0.3&amp;crop=faces&amp;fit=crop&amp;h=32"
                                                 src={`${api_url}/${item.avatarurl}`}
                                                 alt="user photo"/>
                                            <p>{item.fullname}</p>
                                        </div>
                                    </Link>
                                    {
                                        item.report && (

                                            <div className="my-4">

                                                {item.report.split('\n').map((line, index) => (
                                                    <p key={index}>{line}</p>
                                                ))}
                                            </div>
                                        )
                                    }
                                </div>
                            ))
                        ) : (
                            <p>No reported posts found.</p> // Сообщение, если нет постов
                        )}
                    </ModalBody>


                </ModalContent>
            </Modal>


        </div>
    )
}