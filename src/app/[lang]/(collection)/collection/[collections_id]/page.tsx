'use client'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/globalRedux/store";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import React, {ChangeEvent, useEffect, useState} from "react";
import {
    fetchCreateCollection, fetchDeleteOrRecoverCollection,
    fetchPosts_Likes_coll_another_user,
    fetchUpdateCollection
} from "@/app/globalRedux/posts/asyncActions";
import {fetchCollectionsDetail} from "@/app/globalRedux/users/asyncActions";
import {Status} from "@/app/globalRedux/users/types";
import Link from "next/link";
import Gallary from "@/app/components/Products/Gallary";
import {Modal, ModalBody, ModalContent, useDisclosure} from "@nextui-org/modal";
import CollectionModal from "@/app/components/Products/modal/CollectionModal/CollectionModal";
import {useForm} from "react-hook-form";
import {CollectionCreateForm, CollectionUpdateForm} from "@/app/globalRedux/posts/types";

type DetailUsersProps = {
    params: {
        id: string;
        collections_id: string;
    }
}
export default function CollectionsPage(params: DetailUsersProps) {

    const id = params.params.id;
    const collections_id = params.params.collections_id;
    const dispatch = useDispatch<AppDispatch>();
    // const {items, status} = useSelector((state: RootState) => state.users.data_another_user);
    const {api_url, data} = useSelector((state: RootState) => state.users);
    const {items, status} = useSelector((state: RootState) => state.users.collectionsDetail);
    const pathname = usePathname()
    const lang = pathname.split('/')[1];
    const searchParams = useSearchParams();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const router = useRouter();

    const [SuccessDataChange, setSuccessDataChange] = useState(false);
    const [SuccessDelete, setSuccessDelete] = useState(false);
    const [SuccessRecover, setSuccessRecover] = useState(false);


    const [privateState, setPrivateState] = useState(false);

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: {errors, isValid,},

    } = useForm<CollectionUpdateForm>({
        defaultValues: {
            privateStatus: privateState
        },
    });


    useEffect(() => {
        if (items.collections !== null) {
            setValue('name', items.collections.name);
            setValue('description', items.collections.description);
            setValue('privateStatus', items.collections.private)
            setPrivateState(items.collections.private);

            setCharacterNameCount(20 - items.collections.name.length);
            if (items.collections.description !== null) {

                setCharacterCount(250 - items.collections.description.length);
            }
        }
    }, [items.collections]);


    const onSubmit = handleSubmit((values) => {
        console.log(values)
        // console.log(collections_id)
        dispatch(fetchUpdateCollection({
            id: collections_id,
            name: values.name,
            description: values.description,
            privateStatus: values.privateStatus
        }))
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
    })
    const onChangePrivate = () => {
        setPrivateState(!privateState);
        setValue('privateStatus', !privateState);
    };


    const DeleteCollection = (recover: boolean) => {
        console.log("delete")
        dispatch(fetchDeleteOrRecoverCollection({
            id: collections_id,
            recover: recover
        }))
            .then((response) => {
                console.log(response)
                if (response.meta.requestStatus === 'rejected') {
                    // console.log("Request failed")
                    // setSendResponseErrorImage(true)
                } else if (response.meta.requestStatus === 'fulfilled') {
                    // console.log("Request fulfilled")
                    if (recover) {
                        setSuccessRecover(true);
                    } else if (!recover) {
                        setSuccessDelete(true);
                    }
                    // router.push(`/${lang}`);
                    // setSuccessImageChange(true)
                }
                // handle success response
            })
            .catch((error) => {
                console.log(error)
            })
    }

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


    useEffect(() => {

        // console.log(params)
        // console.log(collections_id)

        dispatch(fetchCollectionsDetail({
            _id: collections_id,
            limit: '',
            page: searchParams.get("page") !== null ? searchParams.get("page") : 0,
        }))


    }, [searchParams.get("page")])


    // console.log(items)
    return (
        <>
            <Modal size="xl" placement="center" onOpenChange={onOpenChange} isOpen={isOpen} classNames={{
                body: "p-0 rounded-sm dark:bg-black"
            }}>
                <ModalContent>


                    <ModalBody>

                        <div
                            className={` w-full transform translateX(0) visibility-visible transition-transform md:p-8 p-4 duration-300 cubic-bezier(0.2, 0.05, 0.03, 0.95) transition-visibility`}
                        >
                            <p className="text-xl mb-2 dark:text-D1 font-bold">{lang === "en" ? <>Edit
                                collection</> : <>Изменить коллекцию</>}</p>

                            <form onSubmit={onSubmit} className="flex flex-col text-center h-full mt-2 mb-2">
                                <label
                                    className="inputStyle_title">{lang === "en" ? <>Name</> : <>Название</>}</label>
                                <div className="relative mb-6 flex flex-col items-start">



                                            <textarea
                                                className="w-full max-h-[40px] resize-none h-auto block px-3 py-1.5 border-2 border-D1 dark:border-76 rounded "
                                                rows={4} data-character-count="20"
                                                placeholder={lang === "en" ? "Beautifull photos" : "Красивые фотографии"}
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
                                                <li>{lang === "en" ? <>Max length - 20 symbols</> : <>Максимальная длина
                                                    - 20 букв</>}</li>
                                                <li>{lang === "en" ? <>Min length - 1 symbol</> : <>Минимальная длина -
                                                    1 буква</>}</li>
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
                                                <li>{lang === "en" ? <>Max length - 250 symbols</> : <>Максимальная
                                                    длина - 20
                                                    букв</>}</li>
                                                <li>{lang === "en" ? <>Min length - 1 symbol</> : <>Минимальная длина -
                                                    1
                                                    буква</>}</li>
                                                <li>{lang === "en" ? <>This field is required</> : <>Поле необходимо
                                                    заполнить</>}</li>
                                            </ul>
                                        </div>
                                    </div>

                                )}
                                <div className="flex flex-row items-center mb-2">
                                    <input id="allow-messages-checkbox"
                                           className="mr-[8px]"
                                           type="checkbox"
                                           {...register('privateStatus')}
                                           onChange={onChangePrivate}
                                           checked={privateState}
                                    />
                                    <p>{lang === "en" ? <>Make collection private</> : <>Сделать коллекцию
                                        приватной</>}</p>

                                    <svg className="shrink-0 fill-76 w-4 h-4 ml-2" width="24" height="24"
                                         viewBox="0 0 24 24"
                                         version="1.1"
                                         aria-hidden="false">
                                        <desc lang="en-US">A lock</desc>
                                        <path
                                            d="M19 11h-1.5V7.5C17.5 4.5 15 2 12 2S6.5 4.5 6.5 7.5V11H5c-.6 0-1 .4-1 1v9c0 .6.4 1 1 1h14c.6 0 1-.4 1-1v-9c0-.6-.4-1-1-1ZM8.5 7.5C8.5 5.6 10.1 4 12 4s3.5 1.6 3.5 3.5V11h-7V7.5Z"></path>
                                    </svg>
                                </div>

                                <div className="flex flex-row items-center mb-2 justify-between">


                                    {
                                        items.collections !== null && items.collections.deleted && (
                                            <p className="underline text-red-500 cursor-pointer"
                                               onClick={() => DeleteCollection(true)}
                                            >
                                                {lang === "en" ? <>Recover Collection</> : <>Восстановить коллекцию</>}</p>

                                            // <p className="bg-red-500 rounded px-2  h-fit ml-2 text-xl">{lang === "en" ? <>Deleted</> : <>Удален</>}</p>
                                        )
                                    }
                                    {
                                        items.collections !== null && items.collections.deleted === false && (
                                            <p className="underline text-red-500 cursor-pointer"
                                               onClick={() => DeleteCollection(false)}>{lang === "en" ? <>Delete
                                                Collection</> : <>Удалить коллекцию</>}</p>
                                        )

                                    }

                                    <button type="submit"
                                            className="text-white bg-[#171717] hover:bg-[#222222]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium justify-center rounded-lg  px-5 py-3 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 ">
                                        {lang === "en" ? <>Save</> : <>Сохранить</>}
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
                                        <div className="ms-3 text-sm font-normal">{lang === "en" ? <>Collection
                                            updated.</> : <>Коллекция
                                            обновлена.</>}</div>
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
                                SuccessDelete && (

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
                                        <div className="ms-3 text-sm font-normal">{lang === "en" ? <>Collection
                                            deleted.</> : <>Коллекция
                                            удалена.</>}</div>
                                        <button type="button"
                                                onClick={() => setSuccessDelete(false)}
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
                                SuccessRecover && (

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
                                        <div className="ms-3 text-sm font-normal">{lang === "en" ? <>Collection
                                            recovered.</> : <>Коллекция
                                            восстановлена.</>}</div>
                                        <button type="button"
                                                onClick={() => setSuccessRecover(false)}
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

                    </ModalBody>


                </ModalContent>
            </Modal>

            {
                items.collections !== null && status === Status.SUCCESS ? (


                    <div className="w-full md:px-52 md:p-0 p-2 ">

                        <div className="flex md:flex-row md:items-center flex-col">
                            <div className="flex flex-col">
                                <div className="flex flex-row items-center">
                                    {
                                        items.collections.private && (

                                            <svg className="shrink-0 fill-76 mr-3" width="24" height="24"
                                                 viewBox="0 0 24 24"
                                                 version="1.1"
                                                 aria-hidden="false">
                                                <desc lang="en-US">A lock</desc>
                                                <path
                                                    d="M19 11h-1.5V7.5C17.5 4.5 15 2 12 2S6.5 4.5 6.5 7.5V11H5c-.6 0-1 .4-1 1v9c0 .6.4 1 1 1h14c.6 0 1-.4 1-1v-9c0-.6-.4-1-1-1ZM8.5 7.5C8.5 5.6 10.1 4 12 4s3.5 1.6 3.5 3.5V11h-7V7.5Z"></path>
                                            </svg>
                                        )
                                    }
                                    <p className="text-[48px] ">{items.collections.name}</p>
                                    {
                                        items.collections.deleted && (

                                            <p className="bg-red-500 rounded px-2  h-fit ml-2 text-xl">{lang === "en" ? <>Deleted</> : <>Удален</>}</p>
                                        )
                                    }
                                </div>
                                {
                                    items.collections.description && (

                                        <div className="my-4">

                                            {items.collections.description.split('\n').map((line, index) => (
                                                <p key={index}>{line}</p>
                                            ))}
                                        </div>
                                    )
                                }


                                <Link href={`/${lang}/${items.collections.user_id}`}
                                      className="flex items-center flex-row">

                                    <img
                                        width={36}
                                        alt={`${api_url}/${items.collections.avatarurl}`}
                                        src={`${api_url}/${items.collections.avatarurl}`}
                                        className="rounded-full object-cover w-8 h-8 mr-2"
                                    />

                                    <p className=" text_size_adaptive font-semibold">{items.collections.fullname} </p>
                                </Link>
                                <p className="md:mt-16 mt-4">{items.collections.total_photos} {lang === "en" ? <> images</> : <> фотографии</>}</p>
                            </div>
                            {
                                data !== null && data._id === items.collections.user_id && (

                                    <button type="button"
                                            onClick={() => (data !== null ? onOpen() : router.push(`/${lang}/login`))}
                                            className="modal_buttons  md:ml-auto  mt-2"
                                            title="Add this image to a collection">
                    <span className="">
                    {lang === "en" ? <>Edit</> : <>Изменить</>}
                    </span>
                                    </button>
                                )
                            }
                        </div>

                    </div>


                ) : (
                    <div className="w-full md:px-52 md:p-0 p-2 animate-pulse">

                        <div className="flex md:flex-row md:items-center flex-col">
                            <div className="flex flex-col">
                                <div className="flex flex-row items-center rounded-lg bg-76 h-10 w-56">
                                </div>
                                <div className="flex flex-row">
                                    <div className=" rounded-full bg-76 h-5 w-5 mt-2"></div>
                                    <div className=" rounded bg-76 h-5 w-10 mt-2 ml-2"></div>
                                </div>
                                <div className="md:mt-16 mt-4  rounded bg-76 h-5 w-32 "></div>
                            </div>

                        </div>

                    </div>
                )
            }
            {
                items.posts.length > 0 ? (
                    <Gallary status={status} language={lang} items={items.posts} api_url={api_url}/>
                ) : (
                    <p className="flex items-center mt-12 text-xl justify-center">{
                        lang === "en" ? <>No posts!</> : <>Посты закончились!</>
                    }</p>
                )
            }
        </>
    )
}