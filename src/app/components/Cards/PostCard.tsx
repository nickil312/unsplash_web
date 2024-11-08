'use client'
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {Locale} from "@/i18n.config";
import {useSelector} from "react-redux";
import {RootState} from "@/app/globalRedux/store";
import {DownloadImage} from "@/app/components/Products/func/DownloadImage";
import CollabIcon from "@/app/components/Products/CollabIcon";
import {truncateText} from "@/app/components/Products/func/truncateText";
import LikeDisChange from "@/app/components/Products/func/LikeDisChange";
import {useRouter} from "next/navigation";
import {Modal, ModalBody, ModalContent, ModalHeader, useDisclosure} from "@nextui-org/modal";
import {Button} from "@nextui-org/button";
import CollectionModal from "@/app/components/Products/modal/CollectionModal/CollectionModal";


interface PhotoCardProps {
    imageUrl: string;
    altText: string;
    fullname: string;
    avatarurl: string;
    user_id: string;
    _id: string;
    lang: string
    license: string
    likedByUser: boolean
    hirevalue: boolean
    banned: boolean
}


const PostCard: React.FC<PhotoCardProps> = ({
                                                imageUrl,
                                                altText,
                                                fullname,
                                                avatarurl,
                                                user_id,
                                                _id,
                                                lang,
                                                license,
                                                likedByUser,
                                                hirevalue,
                                                banned
                                            }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [liked, setLiked] = useState(false);
    const {data} = useSelector((state: RootState) => (state.users))
    const router = useRouter();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    useEffect(() => {
        setLiked(likedByUser);
    }, []);

    const handleToggleLike = () => {
        if (data !== null) {
            const newLikedState = LikeDisChange({likeValue: liked, _id: _id});
            if (newLikedState !== undefined) {
                setLiked(newLikedState);
            }
        } else {
            router.push(`/${lang}/login`);
        }


    };
    // return (
    //     <div
    //         className="w-full relative overflow-hidden  w-[550px] h-[550px] shadow-lg "
    //         // className="h-auto max-w-full rounded-lg relative overflow-hidden"
    //         // w-[550px] h-[550px]
    //         // h-auto max-w-full rounded-lg
    //         onMouseEnter={() => setIsHovered(true)}
    //         onMouseLeave={() => setIsHovered(false)}
    //     >
    //
    //         <img
    //             src={imageUrl}
    //             alt={altText}
    //             className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
    //             // className="w-full max-w-full object-cover transition-transform duration-300 transform hover:scale-105"
    //         />
    //
    //         {isHovered && (
    //             <Link href={`/${lang}/photos/${_id}`}>
    //                 <div className="absolute inset-0 flex items-center justify-center">
    //                     <div className="absolute top-4 right-4 flex space-x-4">
    //                         {/* Это лайк записи*/}
    //                         <Link href={`/${lang}/photos/create`}>
    //                             {/*PostCard_buttons*/}
    //                             <button className={likedByUser ? "like_active" :"PostCard_buttons"}>
    //                                 <svg
    //                                     xmlns="http://www.w3.org/2000/svg"
    //                                     className="h-6 w-6 m-auto"
    //                                     viewBox="0 0 24 24"
    //                                     // stroke="currentColor"
    //
    //                                 >
    //                                     <path
    //                                         strokeLinecap="round"
    //                                         strokeLinejoin="round"
    //                                         strokeWidth={2}
    //                                         // className="fill-[#555555]"
    //                                         d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    //                                     />
    //
    //                                 </svg>
    //
    //                             </button>
    //                         </Link>
    //                         {/* Добавление в коллекции*/}
    //
    //
    //                         <button className="PostCard_buttons">
    //
    //                             <svg
    //                                 xmlns="http://www.w3.org/2000/svg"
    //                                 className="h-6 w-6 m-auto"
    //                                 viewBox="0 0 24 24"
    //                                 stroke="currentColor"
    //                             >
    //                                 <path
    //                                     strokeLinecap="round"
    //                                     strokeLinejoin="round"
    //                                     strokeWidth={2}
    //                                     d="M12 4v16m8-8H4"
    //                                 />
    //                             </svg>
    //                         </button>
    //                     </div>
    //                     <div className="absolute bottom-0 right-0 p-4">
    //                         {/* Это скачка фотки*/}
    //                         {/*<Link href="">*/}
    //
    //                             <button className="PostCard_buttons" onClick={() =>
    //                                 DownloadImage(imageUrl,altText,_id)
    //                                 // const fileName = imageUrl.split("/").pop();
    //                                 // const aTag = document.createElement("a");
    //                                 // aTag.href = imageUrl;
    //                                 // aTag.setAttribute("download", `${fileName}`);
    //                                 // document.body.appendChild(aTag);
    //                                 // aTag.click();
    //                                 // console.log(1)
    //                                 // aTag.remove();
    //                                 // console.log(2)
    //                             }>
    //                                 <svg className="h-6 w-6 m-auto"
    //                                      viewBox="0 0 24 24"
    //                                      fill="none"
    //                                      xmlns="http://www.w3.org/2000/svg">
    //                                     <g id="Interface / Download">
    //                                         <path id="Vector"
    //                                               d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12"
    //                                               stroke="#555555"
    //                                               stroke-width="2"
    //                                               stroke-linecap="round"
    //                                               stroke-linejoin="round"/>
    //                                     </g>
    //                                 </svg>
    //                             </button>
    //                         {/*</Link>*/}
    //
    //
    //                     </div>
    //                     <div
    //                         className="absolute bottom-0 left-0  w-3/4	  right-0 p-4 flex items-center"
    //                     >
    //                         <img
    //                             width={36}
    //                             alt={avatarurl}
    //                             src={avatarurl}
    //                             className="rounded-full object-cover w-12 h-12 mr-4"
    //                         />
    //                         <div>
    //                             <p className="text-white text-base font-semibold">{fullname} </p>
    //                             <p className="text-[#FFF] opacity-80 text-sm">
    //                                 {
    //                                     lang === "en" ? <>Available for hire</> : <>Доступен для найма</>
    //                                 }
    //
    //                             </p>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </Link>
    //         )}
    //     </div>
    // );
    return (
        // <div className="mt-4">
        //     <Link href={`/${lang}/photos/${_id}`}>
        //     <img
        //         src={imageUrl}
        //         alt={altText}
        //         // className="w-full h-full object-cover"
        //         className="h-auto max-w-full "
        //     />
        //     </Link>
        // </div>
        <>

        <Modal size="3xl" placement="center" onOpenChange={onOpenChange}   isOpen={isOpen}  classNames={{
            body:"p-0 rounded-sm dark:bg-black"
        }}>
            <ModalContent>


                <ModalBody>
                    <CollectionModal _id={_id} imageUrl={imageUrl}/>

                </ModalBody>



            </ModalContent>
        </Modal>
        <div className="mt-4">
            <div className="w-full flex items-center flex-nowrap flex-row px-3 pb-3 pc_display_none">
                {
                    license === "Free" ? (
                        <>
                            <Link href={`/${lang}/${user_id}`} className="flex items-center flex-row">

                                <img
                                    width={36}
                                    alt={avatarurl}
                                    src={avatarurl}
                                    className="rounded-full object-cover w-8 h-8 mr-2"
                                />

                                <p className=" text_size_adaptive font-semibold">{fullname} </p>
                            </Link>
                        </>
                    ) : license === "Unsplash+" ? (
                        <>
                            <CollabIcon lang={lang} avatarurl={avatarurl} user_id={user_id} mode={3}/>
                            <div className="flex flex-col ml-2">
                                <p className=" text-sm font-semibold ">Unsplash+ </p>
                                <Link href={`/${lang}/${user_id}`}>

                                    <p className="text-76 opacity-80 text-xs">
                                        {
                                            lang === "en" ? truncateText(`In collaboration with ${fullname}`, 29) : truncateText(` В сотрудничестве с ${fullname}`, 29)
                                        }
                                    </p>
                                </Link>
                            </div>

                        </>
                    ) : (
                        <>Error</>
                    )
                }

                {/*    сделать условие на unsplash+ */}
            </div>
            <div
                // className="w-full relative overflow-hidden  w-[550px] h-[550px] shadow-lg "
                className="max-w-full h-auto relative overflow-hidden shadow-lg "
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Link href={`/${lang}/photos/${_id}`}>
                    <img
                        src={imageUrl}
                        alt={altText}
                        // className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
                        className="max-w-full h-auto object-cover"
                    />
                </Link>
                {
                    license === "Unsplash+" && (
                        <div className={`${banned ? "absolute top-14 " : "absolute top-4"} left-4 flex space-x-4 `}>
                            <svg className="h-8 w-8 fill-white" width="24" height="24" viewBox="0 0 24 24"
                                 version="1.1"
                                 aria-hidden="false">
                                <desc lang="en-US">Plus sign for Unsplash+</desc>
                                <path
                                    d="M11.281 8.3H8.156V3.125L11.281 1v7.3Zm.316 4.05H4.955V7.868L1.5 10.636v4.55h6.656V22h4.713l3.552-2.84h-4.824v-6.81Zm4.24 0v2.835h4.587l2.911-2.834h-7.497Z"></path>
                            </svg>
                        </div>
                    )
                }
                {
                    banned && (
                        <div className="absolute top-4 left-4 flex space-x-4 bg-red-500 rounded px-1">
                            <p>{lang === "en" ? <>Banned</> : <>Заблокирован</>}</p>
                        </div>
                    )
                }


                {isHovered && (
                    <>

                        <div className="absolute top-4 right-4 flex space-x-2">
                            {/* Это лайк записи*/}
                            <button
                                onClick={handleToggleLike}

                                className={liked ? "like_active navBar_mobile_display_none" : "PostCard_buttons navBar_mobile_display_none"}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    // className="h-6 w-6 m-auto"
                                    className=""
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                            </button>
                            {/* Добавление в коллекции*/}
                            {/*<button className="PostCard_buttons navBar_mobile_display_none" onClick={onOpen}>*/}
                            {/*    <svg*/}
                            {/*        xmlns="http://www.w3.org/2000/svg"*/}
                            {/*        // className="h-6 w-6 m-auto"*/}
                            {/*        className=" "*/}
                            {/*        viewBox="0 0 24 24"*/}
                            {/*        stroke="currentColor"*/}
                            {/*    >*/}
                            {/*        <path*/}
                            {/*            strokeLinecap="round"*/}
                            {/*            strokeLinejoin="round"*/}
                            {/*            strokeWidth={3}*/}
                            {/*            d="M12 4v16m8-8H4"*/}
                            {/*        />*/}
                            {/*    </svg>*/}
                            {/*</button>*/}
                            {/*<Link href={`/${lang}/photos/${_id}/collections`}>*/}

                                <button
                                    className="PostCard_buttons navBar_mobile_display_none"
                                    onClick={() => (data !== null ? onOpen() : router.push(`/${lang}/login`))}
                                    // onClick={() => (data !== null ? router.push(`/${lang}/photos/${_id}/collections`) : router.push(`/${lang}/login`))}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className=" "
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={3}
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                </button>
                            {/*</Link>*/}
                            {/*onOpenChange={onOpenChange}*/}


                        </div>
                        <div className="absolute bottom-0 right-0 p-4 navBar_mobile_display_none">
                            {/* Это скачка фотки*/}
                            {
                                license === "Free" ? (
                                    <button className="PostCard_buttons" onClick={() =>
                                        DownloadImage(imageUrl, altText, _id)
                                    }>
                                        <svg
                                            // className="h-6 w-6 m-auto"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <g id="Interface / Download">
                                                <path id="Vector"
                                                      d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12"
                                                      stroke="#555555"
                                                      stroke-width="3"
                                                      stroke-linecap="round"
                                                      stroke-linejoin="round"/>
                                            </g>
                                        </svg>
                                    </button>
                                ) : license === "Unsplash+" ? (
                                    <div className="modal_buttons_unpslash ">
                                        <svg width="15" height="15" viewBox="0 0 24 24" version="1.1"
                                             aria-hidden="false">
                                            <desc lang="en-US">A lock</desc>
                                            <g>
                                                <g>
                                                    <g>
                                                        <path className=" "
                                                              d="M19 11h-1.5V7.5C17.5 4.5 15 2 12 2S6.5 4.5 6.5 7.5V11H5c-.6 0-1 .4-1 1v9c0 .6.4 1 1 1h14c.6 0 1-.4 1-1v-9c0-.6-.4-1-1-1ZM8.5 7.5C8.5 5.6 10.1 4 12 4s3.5 1.6 3.5 3.5V11h-7V7.5Z"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                        <p className="ml-1 ">{lang === "en" ? <>Download</> : <>Скачать</>}</p>
                                    </div>

                                ) : (<p>Error</p>)
                            }

                        </div>
                        <div
                            className="absolute bottom-0 left-0  w-fit right-0 p-4 flex items-center navBar_mobile_display_none"
                        >
                            {
                                license === "Free" ? (
                                    <Link href={`/${lang}/${user_id}`}>

                                        <img
                                            width={36}
                                            alt={avatarurl}
                                            src={avatarurl}
                                            className="rounded-full object-cover w-8 h-8 mr-2"
                                        />
                                    </Link>

                                ) : license === "Unsplash+" ? (
                                    <CollabIcon lang={lang} avatarurl={avatarurl} user_id={user_id} mode={1}/>
                                ) : (
                                    <>Error</>
                                )
                            }


                            <div className="w-auto">
                                {
                                    license === "Free" ? (
                                        <>
                                            <p className="text-white text-base font-semibold">{fullname} </p>
                                            <p className="text-[#FFF] opacity-80 text-xs">
                                                {
                                                    hirevalue && (
                                                        lang === "en" ? <>Available for hire</> : <>Доступен для найма</>
                                                    )
                                                }
                                            </p>
                                        </>
                                    ) : license === "Unsplash+" ? (
                                        <>
                                            <p className="text-white text-base font-semibold">Unsplash+ </p>
                                            <p className="text-[#FFF] opacity-80 text-xs adaptive_display_none">
                                                {

                                                    lang === "en" ? truncateText(`In collaboration with ${fullname}`, 26) : truncateText(` В сотрудничестве с ${fullname}`, 24)
                                                }
                                            </p>
                                            <p className="text-[#FFF] opacity-80 text-xs adaptive_display_active">
                                                {

                                                    lang === "en" ? truncateText(`In collaboration with ${fullname}`, 15) : truncateText(` В сотрудничестве с ${fullname}`, 15)
                                                }
                                            </p>
                                        </>
                                    ) : (
                                        <>Error</>
                                    )
                                }

                            </div>
                        </div>
                        {/*</div>*/}
                    </>
                )}
            </div>
            <div className=" flex items-center justify-between flex-nowrap h-[32px] flex-row mx-3 mt-3 pc_display_none">
                <div>


                    <button type="button"
                            onClick={handleToggleLike}

                            className={liked ? 'modal_like_active' : "modal_buttons"}

                            title="Like this image">
                        <svg className=""
                             width="16" height="16" viewBox="0 0 24 24"
                             version="1.1"
                             aria-hidden="false">
                            <desc lang="en-US">A heart</desc>
                            <path
                                d="M21.424 4.594c-2.101-2.125-5.603-2.125-7.804 0l-1.601 1.619-1.601-1.62c-2.101-2.124-5.603-2.124-7.804 0-2.202 2.126-2.102 5.668 0 7.894L12.019 22l9.405-9.513a5.73 5.73 0 0 0 0-7.893Z"></path>
                        </svg>
                    </button>
                    <button type="button"
                            onClick={() => (data !== null ? onOpen() : router.push(`/${lang}/login`))}
                            className="modal_buttons ml-2"
                            title="Add this image to a collection">
                        <svg fill="currentColor" width="16" height="16" viewBox="0 0 24 24"
                             version="1.1"
                             aria-hidden="false">
                            <desc lang="en-US">A plus sign</desc>
                            <path d="M21.8 10.5h-8.3V2.2h-3v8.3H2.2v3h8.3v8.3h3v-8.3h8.3z"></path>
                        </svg>
                    </button>
                </div>
                <div className={license === "Unsplash+" ? 'modal_buttons bg-black' : " modal_buttons "}>
                    {
                        license === "Free" ? (
                            <div onClick={() =>
                                DownloadImage(imageUrl, altText, _id)
                            }>
                                {lang === "en" ? <>Download</> : <>Скачать</>}
                            </div>
                        ) : license === "Unsplash+" ? (
                            <>
                                <svg width="15" height="15" viewBox="0 0 24 24" version="1.1" aria-hidden="false">
                                    <desc lang="en-US">A lock</desc>
                                    <g>
                                        <g>
                                            <g>
                                                <path className="fill-white "
                                                      d="M19 11h-1.5V7.5C17.5 4.5 15 2 12 2S6.5 4.5 6.5 7.5V11H5c-.6 0-1 .4-1 1v9c0 .6.4 1 1 1h14c.6 0 1-.4 1-1v-9c0-.6-.4-1-1-1ZM8.5 7.5C8.5 5.6 10.1 4 12 4s3.5 1.6 3.5 3.5V11h-7V7.5Z"></path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                <p className="ml-1 text-white">{lang === "en" ? <>Download</> : <>Скачать</>}</p>
                            </>

                        ) : (<p>Error</p>)
                    }

                </div>

            </div>
        </div>
        </>
        // <>
        //     <div className="w-full flex items-center flex-nowrap flex-row px-3 pb-3 pc_display_none">
        //         {
        //             license === "Free" ? (
        //                 <>
        //                     <Link href={`/${lang}/${user_id}`} className="flex items-center flex-row">
        //
        //                         <img
        //                             width={36}
        //                             alt={avatarurl}
        //                             src={avatarurl}
        //                             className="rounded-full object-cover w-8 h-8 mr-2"
        //                         />
        //
        //                         <p className=" text_size_adaptive font-semibold">{fullname} </p>
        //                     </Link>
        //                 </>
        //             ) : license === "Unsplash+" ? (
        //                 <>
        //                     <CollabIcon lang={lang} avatarurl={avatarurl} user_id={user_id} mode={3}/>
        //                     <div className="flex flex-col ml-2">
        //                         <p className=" text-sm font-semibold ">Unsplash+ </p>
        //                         <Link href={`/${lang}/${user_id}`}>
        //
        //                             <p className="text-76 opacity-80 text-xs">
        //                                 {
        //                                     lang === "en" ? truncateText(`In collaboration with ${fullname}`, 29) : truncateText(` В сотрудничестве с ${fullname}`, 29)
        //                                 }
        //                             </p>
        //                         </Link>
        //                     </div>
        //
        //                 </>
        //             ) : (
        //                 <>Error</>
        //             )
        //         }
        //
        //         {/*    сделать условие на unsplash+ */}
        //     </div>
        //     <div
        //         className="w-full relative overflow-hidden  w-[550px] h-[550px] shadow-lg "
        //         onMouseEnter={() => setIsHovered(true)}
        //         onMouseLeave={() => setIsHovered(false)}
        //     >
        //         <Link href={`/${lang}/photos/${_id}`}>
        //             <img
        //                 src={imageUrl}
        //                 alt={altText}
        //                 className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
        //             />
        //         </Link>
        //         {
        //             license === "Unsplash+" && (
        //                 <div className={`${banned ? "absolute top-14 " : "absolute top-4"} left-4 flex space-x-4 `}>
        //                     <svg className="h-10 w-10 fill-white" width="24" height="24" viewBox="0 0 24 24"
        //                          version="1.1"
        //                          aria-hidden="false">
        //                         <desc lang="en-US">Plus sign for Unsplash+</desc>
        //                         <path
        //                             d="M11.281 8.3H8.156V3.125L11.281 1v7.3Zm.316 4.05H4.955V7.868L1.5 10.636v4.55h6.656V22h4.713l3.552-2.84h-4.824v-6.81Zm4.24 0v2.835h4.587l2.911-2.834h-7.497Z"></path>
        //                     </svg>
        //                 </div>
        //             )
        //         }
        //         {
        //             banned && (
        //                 <div className="absolute top-4 left-4 flex space-x-4 bg-red-500 rounded px-1">
        //                     <p>{lang === "en" ? <>Banned</> : <>Заблокирован</>}</p>
        //                 </div>
        //             )
        //         }
        //
        //
        //         {isHovered && (
        //             <>
        //
        //                 <div className="absolute top-4 right-4 flex space-x-4">
        //                     {/* Это лайк записи*/}
        //                     <button
        //                         onClick={handleToggleLike}
        //
        //                         className={liked ? "like_active navBar_mobile_display_none" : "PostCard_buttons navBar_mobile_display_none"}>
        //                         <svg
        //                             xmlns="http://www.w3.org/2000/svg"
        //                             className="h-6 w-6 m-auto"
        //                             viewBox="0 0 24 24"
        //                         >
        //                             <path
        //                                 strokeLinecap="round"
        //                                 strokeLinejoin="round"
        //                                 strokeWidth={2}
        //                                 d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        //                             />
        //                         </svg>
        //                     </button>
        //                     {/* Добавление в коллекции*/}
        //                     <button className="PostCard_buttons navBar_mobile_display_none">
        //                         <svg
        //                             xmlns="http://www.w3.org/2000/svg"
        //                             className="h-6 w-6 m-auto"
        //                             viewBox="0 0 24 24"
        //                             stroke="currentColor"
        //                         >
        //                             <path
        //                                 strokeLinecap="round"
        //                                 strokeLinejoin="round"
        //                                 strokeWidth={2}
        //                                 d="M12 4v16m8-8H4"
        //                             />
        //                         </svg>
        //                     </button>
        //                 </div>
        //                 <div className="absolute bottom-0 right-0 p-4 navBar_mobile_display_none">
        //                     {/* Это скачка фотки*/}
        //                     {
        //                         license === "Free" ? (
        //                             <button className="PostCard_buttons" onClick={() =>
        //                                 DownloadImage(imageUrl, altText, _id)
        //                             }>
        //                                 <svg className="h-6 w-6 m-auto"
        //                                      viewBox="0 0 24 24"
        //                                      fill="none"
        //                                      xmlns="http://www.w3.org/2000/svg">
        //                                     <g id="Interface / Download">
        //                                         <path id="Vector"
        //                                               d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12"
        //                                               stroke="#555555"
        //                                               stroke-width="2"
        //                                               stroke-linecap="round"
        //                                               stroke-linejoin="round"/>
        //                                     </g>
        //                                 </svg>
        //                             </button>
        //                         ) : license === "Unsplash+" ? (
        //                             <div className="modal_buttons_unpslash ">
        //                                 <svg width="15" height="15" viewBox="0 0 24 24" version="1.1"
        //                                      aria-hidden="false">
        //                                     <desc lang="en-US">A lock</desc>
        //                                     <g>
        //                                         <g>
        //                                             <g>
        //                                                 <path className=" "
        //                                                       d="M19 11h-1.5V7.5C17.5 4.5 15 2 12 2S6.5 4.5 6.5 7.5V11H5c-.6 0-1 .4-1 1v9c0 .6.4 1 1 1h14c.6 0 1-.4 1-1v-9c0-.6-.4-1-1-1ZM8.5 7.5C8.5 5.6 10.1 4 12 4s3.5 1.6 3.5 3.5V11h-7V7.5Z"></path>
        //                                             </g>
        //                                         </g>
        //                                     </g>
        //                                 </svg>
        //                                 <p className="ml-1 ">{lang === "en" ? <>Download</> : <>Скачать</>}</p>
        //                             </div>
        //
        //                         ) : (<p>Error</p>)
        //                     }
        //
        //                 </div>
        //                 <div
        //                     className="absolute bottom-0 left-0  w-3/4	  right-0 p-4 flex items-center navBar_mobile_display_none"
        //                 >
        //                     {
        //                         license === "Free" ? (
        //                             <Link href={`/${lang}/${user_id}`}>
        //
        //                                 <img
        //                                     width={36}
        //                                     alt={avatarurl}
        //                                     src={avatarurl}
        //                                     className="rounded-full object-cover w-12 h-12 mr-4"
        //                                 />
        //                             </Link>
        //
        //                         ) : license === "Unsplash+" ? (
        //                             <CollabIcon lang={lang} avatarurl={avatarurl} user_id={user_id} mode={1}/>
        //                         ) : (
        //                             <>Error</>
        //                         )
        //                     }
        //
        //
        //                     <div>
        //                         {
        //                             license === "Free" ? (
        //                                 <>
        //                                     <p className="text-white text-base font-semibold">{fullname} </p>
        //                                     <p className="text-[#FFF] opacity-80 text-xs">
        //                                         {
        //                                             hirevalue && (
        //                                                 lang === "en" ? <>Available for hire</> : <>Доступен для найма</>
        //                                             )
        //                                         }
        //                                     </p>
        //                                 </>
        //                             ) : license === "Unsplash+" ? (
        //                                 <>
        //                                     <p className="text-white text-base font-semibold">Unsplash+ </p>
        //                                     <p className="text-[#FFF] opacity-80 text-xs">
        //                                         {
        //
        //                                             lang === "en" ? truncateText(`In collaboration with ${fullname}`, 29) : truncateText(` В сотрудничестве с ${fullname}`, 29)
        //                                         }
        //                                     </p>
        //                                 </>
        //                             ) : (
        //                                 <>Error</>
        //                             )
        //                         }
        //
        //                     </div>
        //                 </div>
        //                 {/*</div>*/}
        //             </>
        //         )}
        //     </div>
        //     <div className=" flex items-center justify-between flex-nowrap h-[32px] flex-row mx-3 mt-3 pc_display_none">
        //         <div>
        //
        //
        //             <button type="button"
        //                     onClick={handleToggleLike}
        //
        //                     className={liked ? 'modal_like_active' : "modal_buttons"}
        //
        //                     title="Like this image">
        //                 <svg className=""
        //                      width="16" height="16" viewBox="0 0 24 24"
        //                      version="1.1"
        //                      aria-hidden="false">
        //                     <desc lang="en-US">A heart</desc>
        //                     <path
        //                         d="M21.424 4.594c-2.101-2.125-5.603-2.125-7.804 0l-1.601 1.619-1.601-1.62c-2.101-2.124-5.603-2.124-7.804 0-2.202 2.126-2.102 5.668 0 7.894L12.019 22l9.405-9.513a5.73 5.73 0 0 0 0-7.893Z"></path>
        //                 </svg>
        //             </button>
        //             <button type="button"
        //                     className="modal_buttons ml-2"
        //                     title="Add this image to a collection">
        //                 <svg fill="currentColor" width="16" height="16" viewBox="0 0 24 24"
        //                      version="1.1"
        //                      aria-hidden="false">
        //                     <desc lang="en-US">A plus sign</desc>
        //                     <path d="M21.8 10.5h-8.3V2.2h-3v8.3H2.2v3h8.3v8.3h3v-8.3h8.3z"></path>
        //                 </svg>
        //             </button>
        //         </div>
        //         <div className={license === "Unsplash+" ? 'modal_buttons bg-black' : " modal_buttons "}>
        //             {
        //                 license === "Free" ? (
        //                     <div onClick={() =>
        //                         DownloadImage(imageUrl, altText, _id)
        //                     }>
        //                         {lang === "en" ? <>Download</> : <>Скачать</>}
        //                     </div>
        //                 ) : license === "Unsplash+" ? (
        //                     <>
        //                         <svg width="15" height="15" viewBox="0 0 24 24" version="1.1" aria-hidden="false">
        //                             <desc lang="en-US">A lock</desc>
        //                             <g>
        //                                 <g>
        //                                     <g>
        //                                         <path className="fill-white "
        //                                               d="M19 11h-1.5V7.5C17.5 4.5 15 2 12 2S6.5 4.5 6.5 7.5V11H5c-.6 0-1 .4-1 1v9c0 .6.4 1 1 1h14c.6 0 1-.4 1-1v-9c0-.6-.4-1-1-1ZM8.5 7.5C8.5 5.6 10.1 4 12 4s3.5 1.6 3.5 3.5V11h-7V7.5Z"></path>
        //                                     </g>
        //                                 </g>
        //                             </g>
        //                         </svg>
        //                         <p className="ml-1 text-white">{lang === "en" ? <>Download</> : <>Скачать</>}</p>
        //                     </>
        //
        //                 ) : (<p>Error</p>)
        //             }
        //
        //         </div>
        //
        //     </div>
        // </>

    );

};

export default PostCard;