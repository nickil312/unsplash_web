'use client'
import ReportsCard from "@/app/components/Cards/ReportsCard";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/globalRedux/store";
import {usePathname, useSearchParams} from "next/navigation";
import {fetchBannedPosts, fetchReportedPosts} from "@/app/globalRedux/posts/asyncActions";
import {useEffect} from "react";
import {Status} from "@/app/globalRedux/posts/types";

export default function ReportPage() {
    const {data, api_url} = useSelector((state: RootState) => (state.users))
    const {items, status} = useSelector((state: RootState) => state.posts.ReportPosts);

    const dispatch = useDispatch<AppDispatch>();
    const searchParams = useSearchParams();
    const pathname = usePathname()
    const language = pathname.split('/')[1];

    const fetchPostsSuperDuper = async () => {


        dispatch(fetchReportedPosts({
            page: searchParams.get("page") !== null ? searchParams.get("page") : 0,
        }))
        console.log(items)

    }


    useEffect(() => {
        fetchPostsSuperDuper()
    }, [searchParams.get("page")]);

    return (
        <div className="relative md:p-0 p-3 mb-8 md:mx-52 flex flex-col items-start ">
            <div className="border border-D1 rounded-[6px] w-full">

                {status === Status.LOADING ? (
                    <p>Loading...</p>
                ) : items && items.length > 0 && status === Status.SUCCESS ? (
                    items.map((item) => (
                        <ReportsCard
                            key={item._id} // Убедитесь, что _id уникален для каждого поста
                            imageurl={item.imageurl} // Предполагается, что у вас есть поле imageUrl
                            title={item.title} // Предполагается, что у вас есть поле title
                            text={item.text} // Предполагается, что у вас есть поле text
                            fullname={item.fullname} // Предполагается, что у вас есть поле fullname
                            user_id={item.user_id} // Предполагается, что у вас есть поле user_id
                            post_id={item._id} // Предполагается, что у вас есть поле post_id
                            _id={item._id} // Уникальный идентификатор поста
                            report_count={item.report_count} // Уникальный идентификатор поста
                            lang={language} // Используем язык из pathname
                            banned={item.banned} // Предполагается, что у вас есть поле banned
                        />
                    ))
                ) : (
                    <p>No reported posts found.</p> // Сообщение, если нет постов
                )}
            </div>
        </div>
    )
}