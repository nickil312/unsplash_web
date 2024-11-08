'use client'
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {fetchPostStatistics} from "@/app/globalRedux/posts/asyncActions";
import {AppDispatch, RootState} from "@/app/globalRedux/store";
import {ScrollShadow, Tooltip} from "@nextui-org/react";
import {Status} from "@/app/globalRedux/posts/types";
import {usePathname} from "next/navigation";

type DetailPostInfoProps = {
    params: {
        id: string;
    }
}
export default function StatisticsPost(params: DetailPostInfoProps) {
    const id = params.params.id
    const {items, status} = useSelector((state: RootState) => state.posts.postStatistics);
    const pathname = usePathname()
    const lang = pathname.split('/')[1];

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchPostStatistics({
            _id: id
        }))
    }, []);


    return (
        <div className="p-8">
            <p className="text-xl ">{lang === "en" ? <>Likes</> : <>Лайки записи</>}</p>
            <p className="text-sm text-76 mb-2">{lang === "en" ? <>Hover over the green column to see detailed
                information</> : <>Hаведите курсор на зеленый столбец чтобы посмотреть детальную информацию</>}</p>
            {
                status === Status.LOADING ? (
                    <div className="animate-pulse flex flex-row gap-2 items-end">
                        <div className="flex items-center  w-8 h-[20px] rounded bg-[#F3F4F6] dark:bg-[#EEEEEE]"></div>
                        <div className="flex items-center  w-8 h-[50px] rounded bg-[#F3F4F6] dark:bg-[#EEEEEE]"></div>
                        <div className="flex items-center  w-8 h-[30px] rounded bg-[#F3F4F6] dark:bg-[#EEEEEE]"></div>
                        <div className="flex items-center  w-8 h-[40px] rounded bg-[#F3F4F6] dark:bg-[#EEEEEE]"></div>
                        <div className="flex items-center  w-8 h-[20px] rounded bg-[#F3F4F6] dark:bg-[#EEEEEE]"></div>
                        <div className="flex items-center  w-8 h-[50px] rounded bg-[#F3F4F6] dark:bg-[#EEEEEE]"></div>
                        <div className="flex items-center  w-8 h-[30px] rounded bg-[#F3F4F6] dark:bg-[#EEEEEE]"></div>
                        <div className="flex items-center  w-8 h-[40px] rounded bg-[#F3F4F6] dark:bg-[#EEEEEE]"></div>
                        <div className="flex items-center  w-8 h-[50px] rounded bg-[#F3F4F6] dark:bg-[#EEEEEE]"></div>
                    </div>
                ) : (
                    items.likes.length > 0 ? (
                        <ScrollShadow
                            hideScrollBar
                            offset={100}
                            orientation="horizontal"
                            className="max-w-full  p-0 flex flex-row gap-2 items-end "
                        >
                            {
                                items.likes.map((item) => (
                                    <div className="w-8">
                                        <Tooltip
                                            content={
                                                <div className="px-1 py-2">
                                                    <p>{item.likecount} - {lang === "en" ? <>likes</> : <>лайков</>}</p>

                                                    <p>{new Intl.DateTimeFormat(`${lang}`, {
                                                        year: 'numeric',
                                                        month: 'numeric',
                                                        day: 'numeric'
                                                    }).format(new Date(item.createdat))}</p>
                                                </div>
                                            }
                                            color="default">
                                            <div key={item._id} className="bg-green-300 w-8 rounded"
                                                 style={{height: `${item.likecount * 20}px`}}>
                                            </div>
                                        </Tooltip>
                                    </div>

                                ))
                            }
                        </ScrollShadow>
                    ) : (
                        <p>{lang === "en" ? <>There is no data on likes</> : <>Данных по лайкам нет</>}</p>
                    )
                )
            }
            <p className="text-xl ">{lang === "en" ? <>Views</> : <>Просмотры записи</>}</p>
            <p className="text-sm text-76 mb-2">{lang === "en" ? <>Hover over the green column to see detailed
                information</> : <>Hаведите курсор на зеленый столбец чтобы посмотреть детальную информацию</>}</p>

            {
                status === Status.LOADING ? (
                    <div className="animate-pulse flex flex-row gap-2 items-end">
                        <div className="flex items-center  w-8 h-[20px] rounded bg-[#F3F4F6] dark:bg-[#EEEEEE]"></div>
                        <div className="flex items-center  w-8 h-[50px] rounded bg-[#F3F4F6] dark:bg-[#EEEEEE]"></div>
                        <div className="flex items-center  w-8 h-[30px] rounded bg-[#F3F4F6] dark:bg-[#EEEEEE]"></div>
                        <div className="flex items-center  w-8 h-[40px] rounded bg-[#F3F4F6] dark:bg-[#EEEEEE]"></div>
                        <div className="flex items-center  w-8 h-[20px] rounded bg-[#F3F4F6] dark:bg-[#EEEEEE]"></div>
                        <div className="flex items-center  w-8 h-[50px] rounded bg-[#F3F4F6] dark:bg-[#EEEEEE]"></div>
                        <div className="flex items-center  w-8 h-[30px] rounded bg-[#F3F4F6] dark:bg-[#EEEEEE]"></div>
                        <div className="flex items-center  w-8 h-[40px] rounded bg-[#F3F4F6] dark:bg-[#EEEEEE]"></div>
                        <div className="flex items-center  w-8 h-[50px] rounded bg-[#F3F4F6] dark:bg-[#EEEEEE]"></div>
                    </div>
                ) : (
                items.views.length > 0 ? (
                    <ScrollShadow
                        hideScrollBar
                        offset={100}
                        orientation="horizontal"
                        className="max-w-full  p-0 flex flex-row gap-2 items-end "
                    >
                        {
                            items.views.map((item) => (
                                <div className="w-8">
                                    <Tooltip className="flex flex-nowrap w-full"
                                             content={
                                                 <div className="px-1 py-2">
                                                     <p>{item.likecount} - {lang === "en" ? <>views</> : <>просмотров</>}</p>

                                                     <p>{new Intl.DateTimeFormat(`${lang}`, {
                                                         year: 'numeric',
                                                         month: 'numeric',
                                                         day: 'numeric'
                                                     }).format(new Date(item.createdat))}</p>
                                                 </div>
                                             }
                                             color="default">
                                        <div key={item._id} className="bg-green-300 w-8 rounded"
                                             style={{height: `${item.likecount * 20}px`}}>
                                        </div>
                                    </Tooltip>
                                </div>
                            ))
                        }
                    </ScrollShadow>
                ) : (
                    <p>{lang === "en" ? <>No viewing data available</> : <>Данных по просмотрам нет</>}</p>

                )
                )
            }
        </div>
    )

}