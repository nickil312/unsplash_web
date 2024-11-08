'use client'
import {usePathname} from "next/navigation";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/globalRedux/store";
import {fetchGetDownloadHistory} from "@/app/globalRedux/users/asyncActions";
import {Status} from "@/app/globalRedux/users/types";
import DownloadHistoryPost from "@/app/components/Cards/DownloadHistoryPost";
import DownloadHistoryLoading from "@/app/components/__Loading/DownloadHistoryLoading";

export default function downloadHistoryPage() {
    const pathname = usePathname()
    const lang = pathname.split('/')[1];
    const dispatch = useDispatch<AppDispatch>()
    const {items, status} = useSelector((state: RootState) => (state.users.download_history))
    const {api_url} = useSelector((state: RootState) => (state.users))

    useEffect(() => {
        dispatch(fetchGetDownloadHistory())
    }, [])
    return (
        <>


            <div className="relative mb-8 flex flex-col items-start ">
                <p className="settings_Title_adaptive mb-4">{lang === "en" ? <>Download history</> : <>История
                    скачивания</>}</p>
                <p className="mb-4">{lang === "en" ? <>Your download history includes everything that you have
                    downloaded while being logged in.
                    It is only visible to you. Some activity might take some time to appear.</> : <>Ваша история
                    загрузок включает в себя все, что вы скачали, находясь в системе. Она видна только вам. Для
                    появления некоторых действий может потребоваться некоторое время.</>}</p>
                {
                    items.length > 0 && status === Status.SUCCESS ? (
                        <div className="border border-D1 rounded-[6px] w-full">
                            {

                                items.map((item, index) => (
                                    <DownloadHistoryPost key={index} _id={item._id} title={item.title}
                                                         text={item.text}
                                                         imageurl={`${api_url}/${item.imageurl}`}
                                                         altText={item.imageurl}
                                                         download_at={item.download_at}
                                                         lang={lang}
                                    />
                                ))
                            }
                        </div>


                    ) : items.length === 0 && status === Status.SUCCESS ? (
                        <p className="text-center w-full text-xl mt-10">No data</p>
                    ) : (
                        <div className="border border-D1 rounded-[6px] w-full">
                            {Array(8).fill(0).map((_, index) => (
                                <DownloadHistoryLoading key={index} />
                            ))}
                        </div>
                    )
                }
            </div>
        </>
    )
}