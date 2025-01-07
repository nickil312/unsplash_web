import React, {ChangeEvent, useState} from "react";
import {useForm} from "react-hook-form";
import {ChatChangeDetail, ChatChangeImageReq, ChatCreateForm} from "@/app/globalRedux/chats/types";
import axios from "@/app/axois";
import {fetchChatImageChange, fetchCreateChat} from "@/app/globalRedux/chats/asyncActions";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/globalRedux/store";
import {Switch} from "@nextui-org/react";
import {fetchCreateCollection} from "@/app/globalRedux/posts/asyncActions";
import {useRouter} from "next/navigation";

export default function ChatGroupCreateModal({lang}: { lang: string }) {
    const dispatch = useDispatch<AppDispatch>();

    const {api_url, data} = useSelector((state: RootState) => state.users);

    const [chatIcon, setChatIcon] = useState('');
    const [senderrorImage, setSendErrorImage] = useState(false);
    const [geterrorImage, setgetErrorImage] = useState(false);
    const [sendResponseerrorImage, setSendResponseErrorImage] = useState(false);
    const [SuccessImageChange, setSuccessImageChange] = useState(false);
    const [SuccessDataChange, setSuccessDataChange] = useState(false);
    const [error, setError] = useState(false);

    const router = useRouter();

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: {errors, isValid},

    } = useForm<ChatCreateForm>({
        defaultValues: {},
    });

    const onSubmit = handleSubmit((values) => {
        console.log(values)
        if (data !== null) {
            dispatch(fetchCreateChat({
                _id: data._id,
                userId: "",
                chatName: values.chatName,
                isTechSup: values.isTechSup,
                description: values.description,
                chat_image: values.chat_image,
                isGroup: true
            }))
                .then((response) => {
                    console.log(response)
                    if (response.meta.requestStatus === 'rejected') {
                        setError(true);
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
                    // setSendDataChange(true);
                })
        }else {
            console.log("data null!")
            router.push(`/${lang}/login`);

        }

    })

    const [characterNameCount, setCharacterNameCount] = useState(20);
    const [characterCount, setCharacterCount] = useState(250);

    const handleNameChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let newBio = e.target.value;
        const maxRows = 1; // максимальное количество строк
        const rows = newBio.split('\n').length;
        if (rows > maxRows) {
            newBio = newBio.split('\n').slice(0, maxRows).join('\n');
        }
        setValue('chatName', newBio);
        setCharacterNameCount(20 - newBio.length);
    };

    const handleDescChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let newBio = e.target.value;
        const maxRows = 6; // максимальное количество строк
        const rows = newBio.split('\n').length;
        if (rows > maxRows) {
            newBio = newBio.split('\n').slice(0, maxRows).join('\n');
        }
        setValue('description', newBio);
        setCharacterCount(250 - newBio.length);
    };


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result;
                if (result !== null && typeof result === 'string') {
                    setChatIcon(result)
                    uploadFile(file); // Вызываем функцию для отправки файла

                }
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadFile = async (file: File) => {
        const formData = new FormData();
        formData.append('image', file);
        console.log(formData)

        try {
            const response = await axios.post(`${api_url}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                setValue('chat_image', response.data.compressedUrl)
            } else {
                console.error('Ошибка при отправке файла:', response.status);
                setSendErrorImage(true);
            }
        } catch (error) {
            console.error('Ошибка при загрузке файла:', error);
            setgetErrorImage(true)
        }
    };


    return (
        <>
            <form onSubmit={onSubmit} className="flex flex-col text-center h-full mt-2 mb-2">
                <div className="flex flex-col w-[170px] h-[170px] items-center w-full justify-center">

                    <div className="relative rounded-full w-[128px] h-[128px] m-auto overflow-hidden ">
                        <img
                            alt="user photo"
                            sizes="128px"
                            className="upload-circular__image upload-circular__image--large js-general-uploader-new-upload-target"
                            // src={`${api_url}/${data.avatarurl}`}
                            src={`${chatIcon ? `${chatIcon}` : `${api_url}/uploads/down/Extra%20Large%20300x300.jpg`}`}
                        />

                    </div>

                    <p
                        className="cursor-pointer settings_links_diactive text-sm w-[150px]"
                        // @ts-ignore
                        onClick={() => document.getElementById('fileInput').click()} // Имитация клика по input
                    >
                        <input
                            type="file"
                            id="fileInput" // Уникальный ID для input
                            onChange={handleFileChange}
                            style={{display: 'none'}} // Скрываем элемент
                        />
                        {lang === "en" ? <>Change chat image</> : <>Изменить фото чата</>}
                    </p>
                </div>

                <label
                    className="inputStyle_title">{lang === "en" ? <>Name</> : <>Название</>}</label>
                <div className="relative mb-6 flex flex-col items-start">



                                            <textarea
                                                className="w-full max-h-[40px] resize-none h-auto block px-3 py-1.5 border-2 border-D1 dark:border-76 rounded "
                                                rows={4} data-character-count="20"
                                                placeholder={lang === "en" ? "Название чата" : "Название чата"}
                                                {...register("chatName", {
                                                    required: true,
                                                    maxLength: 20,
                                                    onChange: handleNameChange,
                                                })}>
                                            </textarea>
                    <div
                        className="bottom-2 absolute right-2.5 text-sm text-76 pointer-events-none">{characterNameCount}</div>

                    {/*<p className="settings_under_input_text">{lang === "en" ? <>Max avalible rows 6</> : <>Макс.*/}
                    {/*    доступные строки 6</>}</p>*/}
                </div>
                {(errors.chatName?.type === "required" || errors.chatName?.type === "maxLength") && (
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
                                <li>{lang === "en" ? <>Max length - 20 symbols</> : <>Максимальная длина -
                                    20
                                    букв</>}</li>
                                <li>{lang === "en" ? <>Min length - 1 symbol</> : <>Минимальная длина - 1
                                    буква</>}</li>
                                <li>{lang === "en" ? <>This field is required</> : <>Поле необходимо
                                    заполнить</>}</li>
                            </ul>
                        </div>
                    </div>

                )}
                <label
                    className="inputStyle_title">{lang === "en" ? <>Description <span
                    className="text-76">(optional)</span></> : <>Описание <span
                    className="text-76">(необязательное)</span></>}</label>
                <div className="relative mb-8 flex flex-col items-start">



                                            <textarea
                                                className="w-full min-h-10 resize-none h-auto block px-3 py-1.5 border-2 border-D1 dark:border-76 rounded "
                                                rows={4} data-character-count="250"
                                                {...register("description", {
                                                    required: false,
                                                    maxLength: 250,
                                                    onChange: handleDescChange,
                                                })}>
                                            </textarea>
                    <div
                        className="bottom-7 absolute right-2.5 text-sm text-76 pointer-events-none">{characterCount}</div>

                    <p className="settings_under_input_text">{lang === "en" ? <>Max avalible rows
                        6</> : <>Макс.
                        доступные строки 6</>}</p>
                </div>
                {(errors.description?.type === "maxLength") && (
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
                                <li>{lang === "en" ? <>Max length - 250 symbols</> : <>Максимальная длина -
                                    20
                                    букв</>}</li>
                                <li>{lang === "en" ? <>Min length - 1 symbol</> : <>Минимальная длина - 1
                                    буква</>}</li>
                                <li>{lang === "en" ? <>This field is required</> : <>Поле необходимо
                                    заполнить</>}</li>
                            </ul>
                        </div>
                    </div>

                )}
                <div className="flex flex-col gap-2 mb-4 items-start">
                    <Switch
                        defaultSelected
                        onValueChange={(value) => setValue('isTechSup', value)} // Update the posttype field when the switch is toggled
                        {...register('isTechSup')}
                    >
                        {lang === "en" ? <>Технический чат.</> : <>Technical chat.</>}
                    </Switch>
                    <p className="text-small text-default-500">{lang === "en" ? <>Creating a chat with technical
                        support.</> : <>Создание чата с тех. поддержкой.</>}</p>
                </div>


                <button type="submit"
                        className="text-white bg-[#171717] hover:bg-[#222222]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium justify-center rounded-lg  px-5 py-3 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 ">
                    {lang === "en" ? <>Create chat</> : <>Создать чат</>}
                </button>
                {
                    error && (

                        <div id="toast-danger"
                             className={"fixed flex items-center w-full max-w-xs p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12"}

                             role="alert">
                            <div
                                className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                                <svg className="w-5 h-5" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg"
                                     fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                                </svg>
                                <span className="sr-only">Error icon</span>
                            </div>
                            <div className="ms-3 text-sm font-normal">{lang === "en" ? <>Error creating post!</> : <>Ошибка
                                с созданием поста!</>}</div>
                            <button type="button"
                                    onClick={() => setError(false)}
                                    className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 border-0 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-12 dark:hover:bg-1E"
                                    data-dismiss-target="#toast-danger" aria-label="Close">
                                <span className="sr-only">Close</span>
                                <svg className="w-3 h-3" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg"
                                     fill="none"
                                     viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                            </button>
                        </div>
                    )
                }
                {
                    SuccessDataChange && (

                        <div id="toast-success"

                             className={"fixed flex items-center w-full max-w-xs p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12"}
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
                            <div className="ms-3 text-sm font-normal">{lang === "en" ? <>Chat
                                updated.</> : <>Чат
                                обновлен.</>}</div>
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
                {
                    geterrorImage && (

                        <div id="toast-danger"
                             className="fixed flex items-center w-full max-w-xs p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12"
                             role="alert">
                            <div
                                className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                                <svg className="w-5 h-5" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg"
                                     fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                                </svg>
                                <span className="sr-only">Error icon</span>
                            </div>
                            <div className="ms-3 text-sm font-normal">{lang === "en" ? <>Error image
                                upload!</> : <>Ошибка с загрузкой картинки!</>}</div>
                            <button type="button"
                                    onClick={() => setgetErrorImage(false)}
                                    className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 border-0 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-12 dark:hover:bg-1E"
                                    data-dismiss-target="#toast-danger" aria-label="Close">
                                <span className="sr-only">Close</span>
                                <svg className="w-3 h-3" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg"
                                     fill="none"
                                     viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                            </button>
                        </div>
                    )
                }
                {
                    senderrorImage && (

                        <div id="toast-danger"
                             className="fixed flex items-center w-full max-w-xs p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12"
                             role="alert">
                            <div
                                className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                                <svg className="w-5 h-5" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg"
                                     fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                                </svg>
                                <span className="sr-only">Error icon</span>
                            </div>
                            <div className="ms-3 text-sm font-normal">{lang === "en" ? <>Error sending
                                image!</> : <>Ошибка с отправкой картинки!</>}</div>
                            <button type="button"
                                    onClick={() => setSendErrorImage(false)}
                                    className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 border-0 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-12 dark:hover:bg-1E"
                                    data-dismiss-target="#toast-danger" aria-label="Close">
                                <span className="sr-only">Close</span>
                                <svg className="w-3 h-3" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg"
                                     fill="none"
                                     viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                            </button>
                        </div>
                    )
                }
                {
                    sendResponseerrorImage && (

                        <div id="toast-danger"
                             className="fixed flex items-center w-full max-w-xs p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12"
                             role="alert">
                            <div
                                className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                                <svg className="w-5 h-5" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg"
                                     fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                                </svg>
                                <span className="sr-only">Error icon</span>
                            </div>
                            <div className="ms-3 text-sm font-normal">{lang === "en" ? <>Server
                                error!</> : <>Ошибка сервера!</>}</div>
                            <button type="button"
                                    onClick={() => setSendResponseErrorImage(false)}
                                    className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 border-0 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-12 dark:hover:bg-1E"
                                    data-dismiss-target="#toast-danger" aria-label="Close">
                                <span className="sr-only">Close</span>
                                <svg className="w-3 h-3" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg"
                                     fill="none"
                                     viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                            </button>
                        </div>
                    )
                }
                {
                    SuccessImageChange && (

                        <div id="toast-success"
                             className="fixed flex items-center w-full max-w-xs p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12"
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
                            <div className="ms-3 text-sm font-normal">{lang === "en" ? <>Image
                                changed.</> : <>Картинка изменена.</>}</div>
                            <button type="button"
                                    onClick={() => setSuccessImageChange(false)}
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
            </form>
        </>
    )
}