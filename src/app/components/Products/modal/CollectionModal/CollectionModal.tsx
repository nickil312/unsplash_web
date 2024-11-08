'use client'
import React, {ChangeEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/globalRedux/store";
import {
    fetchAddImageToCollection,
    fetchCollectionsForAddImage,
    fetchCreateCollection
} from "@/app/globalRedux/posts/asyncActions";
import {CollectionCreateForm, Status} from "@/app/globalRedux/posts/types";
import {ScrollShadow} from "@nextui-org/react";
import {useForm} from "react-hook-form";
import {AccountEditProfile} from "@/app/globalRedux/users/types";
import {usePathname} from "next/navigation";

interface CollectionModalProps {
    _id: string
    imageUrl: string
}

export default function CollectionModal({_id, imageUrl}: CollectionModalProps) {
    // console.log("CollectionModal", _id);
    const dispatch = useDispatch<AppDispatch>();
    const {data} = useSelector((state: RootState) => (state.users))
    const {items, status} = useSelector((state: RootState) => state.posts.CollectionsForAddImage);
    const {api_url} = useSelector((state: RootState) => state.posts);
    const [selectedCollections, setSelectedCollections] = useState<{ [key: string]: boolean }>({});
    const [isActive, setIsActive] = useState(false);
    const pathname = usePathname()
    const lang = pathname.split('/')[1];
    const [SuccessDataChange, setSuccessDataChange] = useState(false);

    // console.log("_id",_id)

    const [privateState, setPrivateState] = useState(false);

    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: {errors, isValid,},

    } = useForm<CollectionCreateForm>({
        defaultValues: {
            privateStatus: privateState
        },
    });
    const onSubmit = handleSubmit((values) => {
        console.log(values)
        dispatch(fetchCreateCollection(values))
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
        if (data !== null) {
            dispatch(fetchCollectionsForAddImage({
                post_id: _id,
                userIdAccViewed: data._id
            }))
        }
    }, []);

    useEffect(() => {
        if (items.length > 0) {
            const initialSelectedCollections: { [key: string]: boolean } = {};
            items.forEach((item) => {
                initialSelectedCollections[item._id] = item.has_post!;
            });
            setSelectedCollections(initialSelectedCollections);
            console.log(selectedCollections);
        }
    }, [items]);
    const onSubmitAddImage = (_id: string, collection_id: string,add:boolean) => {
        dispatch(fetchAddImageToCollection({
            _id:collection_id,
            post_id:_id,
            add:add
        }))
        console.log("collection id",collection_id,"post_id",_id,"add",add)
    }

    return (
        <div className="flex md:flex-row flex-col w-full relative">

            <img
                src={imageUrl}
                alt="Image"
                // className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
                className="md:max-w-48 h-56 w-full  md:h-96 object-cover "
            />

            {/*<div className="md:w-[560px] w-full md:p-8 p-1 absolute hidden">*/}
            {/*    <p>Create new collection</p>*/}
            {/*</div>*/}


            <ScrollShadow hideScrollBar
                          orientation="horizontal" className="md:w-[560px] w-full h-96">
                {/*<div*/}
                {/*    className="md:w-[560px] w-full md:p-8 p-1 absolute left-0  transform translateX(100%) transition-transform duration-300 cubic-bezier(0.2, 0.05, 0.03, 0.95) transition-visibility ">*/}
                {/*    <p>Create new collectionфывфывфывфюылводфлыовдфлыовдфлыов</p>*/}
                {/*</div>*/}
                <div
                    className={`md:w-[560px] w-full   ${isActive ? 'transform translateX(0) visibility-visible' : 'transform translateX(100%) hidden'} transition-transform md:p-8 p-3 duration-300 cubic-bezier(0.2, 0.05, 0.03, 0.95) transition-visibility`}
                >
                    <p className="text-xl mb-2 dark:text-D1 font-bold">{lang === "en" ? <>Create new collection</> : <>Создать новую коллекцию</>}</p>

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
                                        <li>{lang === "en" ? <>Max length - 20 symbols</> : <>Максимальная длина - 20
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

                            <p className="settings_under_input_text">{lang === "en" ? <>Max avalible rows 6</> : <>Макс.
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
                        <div className="flex flex-row items-center mb-2">
                            <input id="allow-messages-checkbox"
                                   className="mr-[8px]"
                                   type="checkbox"
                                   {...register('privateStatus')}
                                   onChange={onChangePrivate}
                                   checked={privateState}
                            />
                            <p>{lang === "en" ? <>Make collection private</> : <>Сделать коллекцию приватной</>}</p>

                            <svg className="shrink-0 fill-76 w-4 h-4 ml-2" width="24" height="24" viewBox="0 0 24 24"
                                 version="1.1"
                                 aria-hidden="false">
                                <desc lang="en-US">A lock</desc>
                                <path
                                    d="M19 11h-1.5V7.5C17.5 4.5 15 2 12 2S6.5 4.5 6.5 7.5V11H5c-.6 0-1 .4-1 1v9c0 .6.4 1 1 1h14c.6 0 1-.4 1-1v-9c0-.6-.4-1-1-1ZM8.5 7.5C8.5 5.6 10.1 4 12 4s3.5 1.6 3.5 3.5V11h-7V7.5Z"></path>
                            </svg>
                        </div>

                        <div className="flex flex-row items-center mb-2 justify-between">

                        <p onClick={() => {
                            setIsActive(!isActive)
                        }} className="text-76 cursor-pointer">{lang === "en" ? <>Cancel</> : <>Отменить</>}
                        </p>
                        <button type="submit"
                                className="text-white bg-[#171717] hover:bg-[#222222]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium justify-center rounded-lg  px-5 py-3 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 ">
                            {lang === "en" ? <>Create collection</> : <>Создать коллекцию</>}
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
                                <div className="ms-3 text-sm font-normal">{lang === "en" ? <>Collection created.</> : <>Коллекция
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

                </div>

                {/*<div className="flex flex-col md:w-[560px] w-full md:p-8 p-1 ">*/}
                <div
                    className={`flex flex-col md:w-[560px] w-full md:p-8 p-1 cursor-pointer ${isActive ? 'hidden' : ''}`}>
                    <p className="text-xl mb-2 dark:text-D1 font-bold">{lang === "en" ? <>Add to
                        Collection</> : <>Добавить в Коллекцию</>}</p>

                    <div
                        onClick={() => {
                            setIsActive(!isActive)

                        }}
                        className="flex border-2 border-dashed border-D1 rounded-lg h-[80px] mb-3 pl-[19px] dark:border-76 bg-F5 dark:bg-12 hover:bg-EE w-full items-center transition-all duration-100 ease-in-out">
                        <p className="text-xl text-76 dark:text-D1 font-bold">{lang === "en" ? <>Create a new
                            collection</> : <>Создать новую коллекцию</>}</p>
                    </div>
                    {
                        status !== Status.SUCCESS ? (
                            <div className="animate-pulse">
                                <div
                                    className="flex  rounded-lg h-[80px] mb-3 pl-[19px] bg-[#F3F4F6] dark:bg-[#EEEEEE]  w-full items-center ">
                                </div>
                                <div
                                    className="flex  rounded-lg h-[80px] mb-3 pl-[19px] bg-[#F3F4F6] dark:bg-[#EEEEEE]  w-full items-center ">
                                </div>
                                <div
                                    className="flex  rounded-lg h-[80px] mb-3 pl-[19px] bg-[#F3F4F6] dark:bg-[#EEEEEE]  w-full items-center ">
                                </div>
                                {/*<p>{status}</p>*/}
                            </div>
                        ) : (
                            items.length > 0 ? (
                                items.map((item, index) => (
                                    <div key={index}
                                         className="flex flex-col  rounded-lg h-[80px] mb-3  w-full  ">
                                        <div
                                            className="relative bg-black bg-opacity-70 hover:bg-opacity-10 rounded-lg group">
                                            {
                                                item.last_three_posts !== null && item.last_three_posts[0].imageurl !== null ? (
                                                    <img
                                                        src={`${api_url}/${item.last_three_posts[0].imageurl}`}
                                                        alt="Image"
                                                        className="w-full h-[80px] object-cover rounded-lg group-hover:brightness-50 transition-all duration-100 ease-in-out"/>
                                                ) : (
                                                    <img
                                                        src={imageUrl}
                                                        alt="Image"
                                                        className="w-full h-[80px] object-cover rounded-lg group-hover:brightness-50 transition-all duration-100 ease-in-out"/>

                                                )
                                            }

                                            <div
                                                className="absolute left-0 right-0 top-0 w-full h-full pl-[19px] flex flex-col justify-center group-hover:bg-opacity-80 transition-all duration-100 ease-in-out"
                                                // onClick={() => {
                                                //     console.log(selectedCollections);
                                                //
                                                //     setSelectedCollections((prev) => ({
                                                //         ...prev,
                                                //         [item._id]: !prev[item._id] ?? !item.has_post
                                                //     }));
                                                //     onSubmit(item._id,_id,)
                                                //
                                                //     console.log(selectedCollections);
                                                //
                                                // }}
                                                onClick={() => {
                                                    console.log(selectedCollections);

                                                    const newSelectedCollections = {
                                                        ...selectedCollections,
                                                        [item._id]: !selectedCollections[item._id] ?? !item.has_post
                                                    };
                                                    setSelectedCollections(newSelectedCollections);
                                                    onSubmitAddImage(_id, item._id, newSelectedCollections[item._id]);

                                                    console.log(selectedCollections);
                                                }}

                                            >


                                                <div className="absolute h-6 w-6 right-5  group-hover:block ">
                                                    {
                                                        selectedCollections[item._id] ? (
                                                            <>
                                                                <svg
                                                                    className="absolute  shrink-0  opacity-80 fill-white transition-all duration-100 ease-in-out hidden  group-hover:block "
                                                                    width="24" height="24"
                                                                    viewBox="0 0 24 24" version="1.1"
                                                                    aria-hidden="false"
                                                                >
                                                                    <desc lang="en-US">A minus sign</desc>
                                                                    <path d="M5 11h14v2H5z"></path>
                                                                </svg>
                                                                <svg
                                                                    className="absolute  shrink-0  opacity-80 fill-white transition-all duration-100 ease-in-out block group-hover:hidden"
                                                                    width="24" height="24"
                                                                    viewBox="0 0 24 24" version="1.1"
                                                                    aria-hidden="false"
                                                                >
                                                                    <desc lang="en-US">A checkmark</desc>
                                                                    <path
                                                                        d="m10 17.4-5-5L6.4 11l3.6 3.6L17.6 7 19 8.4l-9 9Z"
                                                                    />
                                                                </svg>
                                                            </>
                                                        ) : (
                                                            <svg
                                                                className="absolute  shrink-0  opacity-80 fill-white transition-all duration-100 ease-in-out hidden  group-hover:block"
                                                                width="24" height="24" viewBox="0 0 24 24" version="1.1"
                                                                aria-hidden="false"
                                                            >
                                                                <desc lang="en-US">A plus sign</desc>
                                                                <path d="M11 5v6H5v2h6v6h2v-6h6v-2h-6V5h-2Z"/>
                                                            </svg>
                                                        )
                                                    }
                                                </div>

                                                <p className="text-xs text-white opacity-80">{item.total_photos} {lang === "en" ? <>photos</> : <>фотографии</>}</p>
                                                <div className="flex flex-row items-center">
                                                    {
                                                        item.private && (
                                                            <svg className="shrink-0 h-3 w-3 opacity-80 fill-white mr-2"
                                                                 width="24"
                                                                 height="24"
                                                                 viewBox="0 0 24 24" version="1.1" aria-hidden="false"
                                                            >
                                                                <desc lang="en-US">A lock</desc>
                                                                <path
                                                                    d="M19 11h-1.5V7.5C17.5 4.5 15 2 12 2S6.5 4.5 6.5 7.5V11H5c-.6 0-1 .4-1 1v9c0 .6.4 1 1 1h14c.6 0 1-.4 1-1v-9c0-.6-.4-1-1-1ZM8.5 7.5C8.5 5.6 10.1 4 12 4s3.5 1.6 3.5 3.5V11h-7V7.5Z"></path>
                                                            </svg>
                                                        )
                                                    }

                                                    <p className="text-xl text-white font-bold">{item.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (

                                <p>{lang === "en" ? <>You have no collections</> : <>У вас нет коллекций</>}
                                </p>
                            )
                        )
                    }
                </div>
            </ScrollShadow>


        </div>


    )
}