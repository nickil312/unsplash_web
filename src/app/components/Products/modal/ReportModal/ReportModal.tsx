'use client'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/globalRedux/store";
import {usePathname} from "next/navigation";
import {useForm} from "react-hook-form";
import {CollectionCreateForm, ReportCreateForm} from "@/app/globalRedux/posts/types";
import React, {ChangeEvent, useState} from "react";
import {fetchCreateCollection, fetchCreateReportForPost} from "@/app/globalRedux/posts/asyncActions";

interface ReportModalProps {
    post_id: string
}

export default function ReportModal({post_id}: ReportModalProps) {
    const {data} = useSelector((state: RootState) => (state.users))
    const pathname = usePathname()
    const lang = pathname.split('/')[1];
    const dispatch = useDispatch<AppDispatch>();
    const [SuccessDataChange, setSuccessDataChange] = useState(false);

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: {errors, isValid,},

    } = useForm<ReportCreateForm>({
        defaultValues: {},
    });
    const onSubmit = handleSubmit((values) => {
        console.log(values)
        if (data !== null) {
            values.post_id = post_id
            values.user_id = data._id
            console.log(values)
            dispatch(fetchCreateReportForPost(values))
                .then((response) => {
                    console.log(response)
                    if (response.meta.requestStatus === 'rejected') {
                        // console.log("Request failed")
                        // setSendResponseErrorImage(true)
                    } else if (response.meta.requestStatus === 'fulfilled') {
                        // console.log("Request fulfilled")
                        setSuccessDataChange(true);
                        // router.push(`/${lang}`);
                        // setSuccessImageChange(true)
                    }
                    // handle success response
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    })

    const [characterCount, setCharacterCount] = useState(250);
    const handleDescChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let newBio = e.target.value;
        const maxRows = 6; // максимальное количество строк
        const rows = newBio.split('\n').length;
        if (rows > maxRows) {
            newBio = newBio.split('\n').slice(0, maxRows).join('\n');
        }
        setValue('reason', newBio);
        setCharacterCount(250 - newBio.length);
    };


    return (
        <>

            <form onSubmit={onSubmit} className="flex flex-col text-center h-full mt-2 mb-2 px-6 py-2">
                <p className="text-2xl font-bold text-left mb-4">{lang === "en" ? <>Report image</> : <>Жалоба на
                    картинку</>}</p>
                <label
                    className="inputStyle_title">{lang === "en" ? <>Reason of report</> : <>Причина жалобы</>}</label>
                <div className="relative mb-8 flex flex-col items-start">
                                            <textarea
                                                className="w-full min-h-10 resize-none h-auto block px-3 py-1.5 border-2 border-D1 dark:border-76 rounded "
                                                rows={4} data-character-count="250"
                                                {...register("reason", {
                                                    required: true,
                                                    maxLength: 250,
                                                    onChange: handleDescChange,
                                                })}>
                                            </textarea>
                    <div
                        className="bottom-7 absolute right-2.5 text-sm text-76 pointer-events-none">{characterCount}</div>

                    <p className="settings_under_input_text">{lang === "en" ? <>Max avalible rows 6</> : <>Макс.
                        доступные строки 6</>}</p>
                </div>
                {(errors.reason?.type === "maxLength" || errors.reason?.type === "required") && (
                    <div
                        className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-950 dark:text-red-400"
                        role="alert">
                        <svg className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
                             aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                             viewBox="0 0 20 20">
                            <path
                                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <span className="sr-only">Danger</span>
                        <div className="flex flex-col items-start">
                            <span className="font-medium">{lang === "en" ? <>Ensure that these requirements are
                                met:</> : <>Убедитесь, что эти требования выполнены:</>}</span>
                            <ul className="mt-1.5 list-disc list-inside flex flex-col items-start ">
                                <li>{lang === "en" ? <>Max length - 250 symbols</> : <>Максимальная длина - 20
                                    букв</>}</li>
                                <li>{lang === "en" ? <>Min length - 1 symbol</> : <>Минимальная длина - 1
                                    буква</>}</li>
                                <li>{lang === "en" ? <>This field is required</> : <>Поле необходимо
                                    заполнить</>}</li>
                            </ul>
                        </div>
                    </div>

                )}
                <div className="flex flex-row items-center mb-2 justify-end">

                    <button type="submit"
                            className="text-white bg-[#171717] hover:bg-[#222222]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium justify-center rounded-lg  px-5 py-3 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 ">
                        {lang === "en" ? <>Create report</> : <>Создать жалобу</>}
                    </button>
                </div>

            </form>
            {
                SuccessDataChange && (

                    <div id="toast-success"

                         className={"fixed flex items-center w-full max-w-xs p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12" }
                        // className="fixed flex items-center w-full max-w-xs p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12"
                         role="alert">
                        <div
                            className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                            <svg className="w-5 h-5" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                            </svg>
                            <span className="sr-only">Check icon</span>
                        </div>
                        <div className="ms-3 text-sm font-normal">{lang === "en" ? <>Report created.</> : <>Жалоба
                            создана.</>}</div>
                        <button type="button"
                                onClick={() => setSuccessDataChange(false)}
                                className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 border-0 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-12 dark:hover:bg-1E"
                                data-dismiss-target="#toast-success" aria-label="Close">
                            <span className="sr-only">Close</span>
                            <svg className="w-3 h-3" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round"
                                      stroke-linejoin="round" stroke-width="2"
                                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                        </button>
                    </div>
                )
            }

        </>
    )
}