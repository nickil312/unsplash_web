import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/globalRedux/store";
import React, {ChangeEvent, useEffect, useState} from "react";
import {
    fetchChatDetail,
    fetchChatDetailChange,
    fetchChatExit,
    fetchChatImageChange
} from "@/app/globalRedux/chats/asyncActions";
import {ScrollShadow} from "@nextui-org/react";
import {usePathname, useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import Link from "next/link";
import axios from "@/app/axois";
import {ChatChangeDetail, ChatChangeImageReq} from "@/app/globalRedux/chats/types";
import {Modal, ModalBody, ModalContent, useDisclosure} from "@nextui-org/modal";
import ChatUserAddModal from "@/app/components/Chat/modal/ChatUserAddModal";

export default function ChatDetailModal({chatId}: { chatId: string }) {
    const dispatch = useDispatch<AppDispatch>();
    const {chat_detail} = useSelector((state: RootState) => state.chats);
    const {api_url} = useSelector((state: RootState) => state.users);
    const pathname = usePathname()
    const lang = pathname.split('/')[1];
    const [SuccessDataChange, setSuccessDataChange] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [chatIcon, setChatIcon] = useState('');
    const [senderrorImage, setSendErrorImage] = useState(false);
    const [geterrorImage, setgetErrorImage] = useState(false);
    const [sendResponseerrorImage, setSendResponseErrorImage] = useState(false);
    const [SuccessImageChange, setSuccessImageChange] = useState(false);
    const router = useRouter()
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    // console.log("_id",_id)


    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: {errors, isValid},

    } = useForm<ChatChangeDetail>({
        defaultValues: {},
    });
    const onSubmit = handleSubmit((values) => {
        console.log(values)
        if (chat_detail !== null) {
            dispatch(fetchChatDetailChange(values))
                // {
                //     id: chat_detail.chatId,
                //         name: values.name,
                //     description: values.description
                // }
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

    const [characterNameCount, setCharacterNameCount] = useState(20);
    const [characterCount, setCharacterCount] = useState(250);

    const handleNameChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let newBio = e.target.value;
        const maxRows = 1; // максимальное количество строк
        const rows = newBio.split('\n').length;
        if (rows > maxRows) {
            newBio = newBio.split('\n').slice(0, maxRows).join('\n');
        }
        setValue('name', newBio);
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
                console.log('Файл успешно загружен!', response);
                if (chat_detail !== null) {

                    const changedata: ChatChangeImageReq = {
                        id: chat_detail.chatId,
                        chat_image: response.data.compressedUrl,

                    }
                    console.log("changedata", changedata);
                    dispatch(fetchChatImageChange(changedata))
                        .then((response) => {
                            console.log(response)
                            if (response.meta.requestStatus === 'rejected') {
                                // console.log("Request failed")
                                setSendResponseErrorImage(true)
                            } else if (response.meta.requestStatus === 'fulfilled') {
                                // console.log("Request fulfilled")
                                // router.push(`/${lang}`);
                                setSuccessImageChange(true)
                            }
                            // handle success response
                        })
                        .catch((error) => {
                            console.log(error)

                        })
                }

            } else {
                console.error('Ошибка при отправке файла:', response.status);
                setSendErrorImage(true);
            }
        } catch (error) {
            console.error('Ошибка при загрузке файла:', error);
            setgetErrorImage(true)
        }
    };


    useEffect(() => {
        if (chatId !== null) {

            dispatch(fetchChatDetail({
                chatId: chatId
            }))
        }
    }, [])

    useEffect(() => {

        if (chat_detail !== null) {
            // console.log(2)
            setValue("name", chat_detail.chatName);
            setValue("description", chat_detail.description);
            setValue('id', chat_detail.chatId)
        }
        // console.log(1)
    }, [chat_detail])

    return (

        chat_detail !== null ? (
            <>
                <Modal size="xl" placement="center" onOpenChange={onOpenChange} isOpen={isOpen}
                       classNames={{
                           body: "p-2 gap-0 rounded-sm dark:bg-black"
                       }}>
                    <ModalContent>


                        <ModalBody>
                            <ChatUserAddModal/>
                        </ModalBody>


                    </ModalContent>
                </Modal>

                <ScrollShadow hideScrollBar
                              orientation="horizontal" className="md:w-[560px] w-full h-96">

                    <div
                        className={`md:w-[560px] w-full   ${isActive ? 'transform translateX(0) visibility-visible' : 'transform translateX(100%) hidden'} transition-transform md:p-8 p-3 duration-300 cubic-bezier(0.2, 0.05, 0.03, 0.95) transition-visibility`}
                    >
                        <p className="text-xl mb-2 dark:text-D1 font-bold">{lang === "en" ? <>Update
                            chat</> : <>Изменить
                            чат</>}</p>
                        <div className="flex flex-col w-[170px] h-[170px] items-center w-full justify-center">

                            <div className="relative rounded-full w-[128px] h-[128px] m-auto overflow-hidden ">
                                <img
                                    alt="user photo"
                                    sizes="128px"
                                    className="upload-circular__image upload-circular__image--large js-general-uploader-new-upload-target"
                                    // src={`${api_url}/${data.avatarurl}`}
                                    src={`${chatIcon ? `${chatIcon}` : `${api_url}/${chat_detail.chat_image}`}`}
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

                        <form onSubmit={onSubmit} className="flex flex-col text-center h-full mt-2 mb-2">
                            <label
                                className="inputStyle_title">{lang === "en" ? <>Name</> : <>Название</>}</label>
                            <div className="relative mb-6 flex flex-col items-start">



                                            <textarea
                                                className="w-full max-h-[40px] resize-none h-auto block px-3 py-1.5 border-2 border-D1 dark:border-76 rounded "
                                                rows={4} data-character-count="20"
                                                placeholder={lang === "en" ? "Название чата" : "Название чата"}
                                                {...register("name", {
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
                            {(errors.name?.type === "required" || errors.name?.type === "maxLength") && (
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


                            <div className="flex flex-row items-center mb-2 justify-between">

                                <p onClick={() => {
                                    setIsActive(!isActive)
                                }} className="text-76 cursor-pointer">{lang === "en" ? <>Cancel</> : <>Отменить</>}
                                </p>
                                <button type="submit"
                                        className="text-white bg-[#171717] hover:bg-[#222222]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium justify-center rounded-lg  px-5 py-3 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 ">
                                    {lang === "en" ? <>Change chat</> : <>Изменить чат</>}
                                </button>
                            </div>
                        </form>


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

                    </div>

                    {/*<div className="flex flex-col md:w-[560px] w-full md:p-8 p-1 ">*/}
                    <div
                        className={`flex flex-col md:w-[560px] w-full md:p-8 p-1  ${isActive ? 'hidden' : ''}`}>
                        {/*<p className="text-xl mb-2 dark:text-D1 font-bold">{lang === "en" ? <>Add to*/}
                        {/*    Collection</> : <>Добавить в Коллекцию</>}</p>*/}


                        <div className="flex flex-col items-center w-full gap-4">
                            <div className="flex flex-row items-center w-full gap-2">

                                <img className="rounded-full w-36 h-36"
                                    // src="https://images.unsplash.com/profile-1709797368653-c9a3d3c2bf26?fm=jpg&amp;q=60&amp;w=3000&amp;ixlib=rb-4.0.3&amp;crop=faces&amp;fit=crop&amp;h=32"
                                     src={`${api_url}/${chat_detail.chat_image}`}
                                     alt="user photo"/>
                                <div className="flex items-center flex-col">

                                    <p className="font-bold text-xl">{chat_detail.chatName}</p>
                                    {/*<p>{chat_detail.description}</p>*/}
                                    <div className="mt-0.5">

                                        {chat_detail.description.split('\n').map((line, index) => (
                                            <p key={index}>{line}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-row items-center w-full gap-2">
                                {
                                    chat_detail.isGroup && (

                                        <div
                                            onClick={() => (chat_detail !== null ? onOpen() : router.push(`/${lang}/chats`))}

                                            className="flex border-2 border cursor-pointer border-D1 rounded-lg h-[80px]  dark:border-76 bg-F5 dark:bg-12 hover:dark:bg-1E hover:bg-EE w-full items-center justify-center transition-all duration-100 ease-in-out flex-col">
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24"
                                                 width="18"
                                                 className="chat_icon_color_change"
                                                 height="18">
                                                <path
                                                    d="M23,11H21V9a1,1,0,0,0-2,0v2H17a1,1,0,0,0,0,2h2v2a1,1,0,0,0,2,0V13h2a1,1,0,0,0,0-2Z"/>
                                                <path
                                                    d="M9,12A6,6,0,1,0,3,6,6.006,6.006,0,0,0,9,12ZM9,2A4,4,0,1,1,5,6,4,4,0,0,1,9,2Z"/>
                                                <path
                                                    d="M9,14a9.01,9.01,0,0,0-9,9,1,1,0,0,0,2,0,7,7,0,0,1,14,0,1,1,0,0,0,2,0A9.01,9.01,0,0,0,9,14Z"/>
                                            </svg>
                                            <p className=" text-76 dark:text-D1 font-bold">{lang === "en" ? <>Add</> : <>Добавить</>}</p>
                                        </div>
                                    )
                                }
                                {
                                    !chat_detail.isTechSup && (

                                        <div
                                            onClick={() => {
                                                setIsActive(!isActive)

                                            }}
                                            className="flex border-2 border cursor-pointer border-D1 rounded-lg h-[80px]  dark:border-76 bg-F5 dark:bg-12 hover:dark:bg-1E hover:bg-EE w-full items-center justify-center transition-all duration-100 ease-in-out flex-col">
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24"
                                                 width="18"
                                                 height="18" className="chat_icon_color_change">
                                                <path
                                                    d="M18.656.93,6.464,13.122A4.966,4.966,0,0,0,5,16.657V18a1,1,0,0,0,1,1H7.343a4.966,4.966,0,0,0,3.535-1.464L23.07,5.344a3.125,3.125,0,0,0,0-4.414A3.194,3.194,0,0,0,18.656.93Zm3,3L9.464,16.122A3.02,3.02,0,0,1,7.343,17H7v-.343a3.02,3.02,0,0,1,.878-2.121L20.07,2.344a1.148,1.148,0,0,1,1.586,0A1.123,1.123,0,0,1,21.656,3.93Z"/>
                                                <path
                                                    d="M23,8.979a1,1,0,0,0-1,1V15H18a3,3,0,0,0-3,3v4H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2h9.042a1,1,0,0,0,0-2H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H16.343a4.968,4.968,0,0,0,3.536-1.464l2.656-2.658A4.968,4.968,0,0,0,24,16.343V9.979A1,1,0,0,0,23,8.979ZM18.465,21.122a2.975,2.975,0,0,1-1.465.8V18a1,1,0,0,1,1-1h3.925a3.016,3.016,0,0,1-.8,1.464Z"/>
                                            </svg>
                                            <p className=" text-76 dark:text-D1 font-bold">{lang === "en" ? <>Update</> : <>Обновить</>}</p>
                                        </div>
                                    )
                                }

                                <div
                                    onClick={() => {
                                        dispatch(fetchChatExit({
                                            chatId: chatId
                                        }))
                                        router.push(`/${lang}`)

                                    }}
                                    className="flex border-2 border cursor-pointer border-D1 rounded-lg h-[80px]  dark:border-76 bg-F5 dark:bg-12 hover:dark:bg-1E hover:bg-EE w-full items-center justify-center transition-all duration-100 ease-in-out flex-col">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="red" width="18" height="18"
                                         id="Layer_1"
                                         data-name="Layer 1"
                                         viewBox="0 0 24 24">
                                        <path
                                            d="m24,15c0,.617-.24,1.197-.678,1.634l-2.072,2.073c-.195.195-.451.293-.707.293s-.512-.098-.707-.293c-.391-.391-.391-1.023,0-1.414l1.292-1.293h-6.128c-.553,0-1-.447-1-1s.447-1,1-1h6.128l-1.292-1.293c-.391-.391-.391-1.023,0-1.414s1.023-.391,1.414,0l2.073,2.074c.437.436.677,1.016.677,1.633ZM6.5,11c-.828,0-1.5.672-1.5,1.5s.672,1.5,1.5,1.5,1.5-.672,1.5-1.5-.672-1.5-1.5-1.5Zm9.5,8v2c0,1.654-1.346,3-3,3H3c-1.654,0-3-1.346-3-3V5.621C0,3.246,1.69,1.184,4.019.718L7.216.079c1.181-.236,2.391.066,3.321.829.375.307.665.685.902,1.092h.561c2.206,0,4,1.794,4,4v5c0,.553-.447,1-1,1s-1-.447-1-1v-5c0-1.103-.897-2-2-2h0s0,0,0,0v17.999h1c.552,0,1-.448,1-1v-2c0-.553.447-1,1-1s1,.447,1,1Zm-6-14.999c0-.602-.267-1.165-.731-1.546-.362-.297-.808-.454-1.266-.454-.131,0-.264.013-.396.039l-3.196.639c-1.397.279-2.411,1.517-2.411,2.942v15.379c0,.552.449,1,1,1h7V4.001Z"/>
                                    </svg>
                                    <p className="text-76 dark:text-D1 font-bold">
                                        {chat_detail.isGroup ?
                                            (lang === "en" ? <>Exit</> : <>Выйти</>) :
                                            (lang === "en" ? <>Delete</> : <>Удалить</>)
                                        }
                                    </p>
                                </div>
                            </div>
                            <div
                                className="flex flex-col items-start w-full justify-start border-2 border border-D1 rounded-lg dark:border-76 bg-F5 dark:bg-12 p-2 gap-2">
                                {chat_detail.users.map((user) => (
                                    <Link key={user.id} href={`/${lang}/${user.id}`}>
                                        <div className={' flex flex-row gap-2 items-center'}>
                                            <img
                                                className="rounded-full w-8 h-8"
                                                src={`${api_url}/${user.avatarUrl}`}
                                                alt="user photo"
                                            />
                                            <p className='text-sm'>{user.fullName}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            <p className="text-xs text-76 flex w-full -mt-3 justify-start">{chat_detail.isGroup ?
                                (lang === "en" ? <>Group chat</> : <>Групповой чат</>) :
                                (lang === "en" ? <>Personal chat</> : <>Личный чат</>)
                            }</p>
                            <p className="text-xs text-76 flex w-full -mt-3 justify-start">{chat_detail.isTechSup ?
                                (lang === "en" ? <>tech support</> : <>техподдержки</>) :
                                (lang === "en" ? <></> : <></>)
                            }</p>

                        </div>
                    </div>
                </ScrollShadow>
            </>
        ) : (

            <p>нет данных</p>
        )

    )
}