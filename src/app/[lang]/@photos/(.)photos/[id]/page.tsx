'use client'
import React, {useEffect, useState} from "react";
import {PageNotFoundError} from "next/dist/shared/lib/utils";
import {notFound, usePathname} from "next/navigation";
import {Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@nextui-org/modal";
import {Button} from "@nextui-org/button";
import {useRouter} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {fetchBanPost, fetchDeletePost, fetchOnePost, fetchUnBanPost} from "@/app/globalRedux/posts/asyncActions";
import {data} from "@formatjs/intl-localematcher/abstract/languageMatching";
import {AppDispatch, RootState} from "@/app/globalRedux/store";
import {Ban_Post, LikeAction, PostsIdProps, Status} from "@/app/globalRedux/posts/types";
import Link from "next/link";
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/react";
import CopyLink from "@/app/components/Products/modal/copyLink";
import {DownloadImage} from "@/app/components/Products/func/DownloadImage";
import CollabIcon from "@/app/components/Products/CollabIcon";
import {truncateText} from "@/app/components/Products/func/truncateText";
import LikeDisChange from "@/app/components/Products/func/LikeDisChange";
import {DynamicChangeLikeIcon} from "@/app/globalRedux/posts/slice";
import {useForm} from "react-hook-form";
import {FormData} from "@/app/[lang]/(photos & illustrations)/photos/create/CreateForm";
import CollectionModal from "@/app/components/Products/modal/CollectionModal/CollectionModal";
import ReportModal from "@/app/components/Products/modal/ReportModal/ReportModal";
import {fetchCreateChat} from "@/app/globalRedux/chats/asyncActions";

type DetailPostInfoProps = {
    params: {
        id: string;
    }
}
//
// async function goError(id: number) {
//     if (id === 123) {
//         console.log("ban")
//         notFound()
//     }
// }

export default function DetailPostInfoModal(params: DetailPostInfoProps) {
// const DetailPostInfo: React.FC<DetailPostInfoProps> = React.memo({params}) => {
    const id = params.params.id;
    const router = useRouter();
    const {data, api_url} = useSelector((state: RootState) => (state.users))
    const {items, status} = useSelector((state: RootState) => state.posts.onePost);
    const pathname = usePathname()
    const [liked, setLiked] = useState(false);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [isModalOpenReport, setIsModalOpenReport] = useState(false); // Состояние для управления модальным окном


    const handleButtonClick = () => {
        setIsModalOpenReport(true); // Открываем модальное окно
    };

    const closeModal = () => {
        setIsModalOpenReport(false); // Закрываем модальное окно
    };


    const pageModalStatus = true;


    const [SuccessDataChange, setSuccessDataChange] = useState(false);
    const [sendDataChange, setSendDataChange] = useState(false);
    const [error, setError] = useState(false);

    const [SuccessDataChangeRazban, setSuccessDataChangeRazban] = useState(false);
    const [errorRazban, setErrorRazban] = useState(false);


    const lang = pathname.split('/')[1];
    console.log("detail params window", params)


    const handleToggleLike = () => {
        if (data !== null) {
            if (items !== null) {
                const newLikedState = LikeDisChange({likeValue: liked, _id: items._id});
                if (newLikedState !== undefined) {
                    setLiked(newLikedState);
                    // const payload = {
                    //     _id: id,
                    //     liked:newLikedState
                    // }
                    // dispatch(DynamicChangeLikeIcon(payload))
                }
            }
        } else {
            router.push(`${lang}/login`);
        }


    };


    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: {errors, isValid},
    } = useForm<Ban_Post>()


    const onSubmitUnBan = () => {
        if (data !== null && items !== null) {
            dispatch(fetchUnBanPost({
                admin_id: data._id,
                reasonofban: "",
                _id: id,
                banned: false
            }))
                .then((response) => {
                    console.log(response)
                    if (response.meta.requestStatus === 'rejected') {
                        setErrorRazban(true);
                        // console.log("Request failed")
                        // setSendResponseErrorImage(true)
                    } else if (response.meta.requestStatus === 'fulfilled') {
                        // console.log("Request fulfilled")
                        setSuccessDataChangeRazban(true);
                        // router.push(`/${lang}`);
                        // setSuccessImageChange(true)
                    }
                    // handle success response
                })
                .catch((error) => {
                    console.log(error)
                    setSendDataChange(true);
                })
        }

    }
    const onSubmit = handleSubmit((values) => {
        console.log(values)
        if (data !== null && items !== null) {
            values._id = id;
            values.banned = items.banned;
            values.admin_id = data._id;
            console.log(values)
            dispatch(fetchBanPost(values))
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
                    setSendDataChange(true);
                })
        }
    })


    // console.log(params.params.id)
    // console.log(id)
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        // 2 запроса один ток 1 с id для того чтобы
        // определить на сервере лайкнул или нет и
        // потом еще коллекции подлючаться
        if (data !== null) {
            console.log("data !== null")
            const params = {
                _id: id,
                user_id: data._id,
            }
            dispatch(fetchOnePost(params))
                .then((response) => {
                    console.log(response)
                    if (response.meta.requestStatus === 'rejected') {
                        console.log("Request failed")

                    } else if (response.meta.requestStatus === 'fulfilled') {
                        console.log("Request fulfilled")

                        const {payload} = response;
                        // console.log("payload",payload)
                        if (payload !== null) {
                            // console.log("payload", payload);
                            const payloadData = payload as {
                                likedByUser: boolean;
                            };
                            const {
                                likedByUser,
                            } = payloadData;
                            setLiked(likedByUser);

                        }
                    }
                    // handle success response
                })
                .catch((error) => {
                    console.log(error)

                })
        } else {
            console.log("data null")

            const params = {
                _id: id,
                user_id: ""
            }
            dispatch(fetchOnePost(params))
                .then((response) => {
                    console.log(response)
                    if (response.meta.requestStatus === 'rejected') {
                        console.log("Request failed")

                    } else if (response.meta.requestStatus === 'fulfilled') {
                        console.log("Request fulfilled")
                    }
                    // handle success response
                })
                .catch((error) => {
                    console.log(error)

                })
        }

    }, [])
    return (
        // <ModalWindow>
        //  <Modal>
        //      <ModalHeader className="flex flex-col gap-1">
        //
        //         <main>
        //             <div>
        //                 DetailPostInfo Modal window - {id}
        //             </div>
        //
        //         </main>
        //      </ModalHeader>
        //  </Modal>

        // </ModalWindow>
        // <div className="z-20">

        <Modal
            size="5xl"
            backdrop="opaque"
            isOpen={true}
            scrollBehavior='outside'
            placement="center"
            onClose={() => router.back()}
            isDismissable={true}
            isKeyboardDismissDisabled={false}
            classNames={{}}
        >
            <ModalContent>
                {/*<ModalHeader className="flex flex-col gap-1">*/}
                {/*    Modal Title*/}
                {/*</ModalHeader>*/}
                <ModalBody>
                    {status === Status.SUCCESS && items !== null ? (
                        <div>
                            <div className="A8FGA sHWy7  top-0 sticky z-30 bg-white dark:bg-[#17181C] ">
                                <div className="tza0z TtePL _UNLg items-center flex gap-2 my-3 py-2">
                                    <div className="HLz3f flex-grow min-w-0">
                                <span className="W_7cp FoNsx">
                                <div>
                                    <span className="N25dY items-center flex gap-2">
                                        <Link className="fB0Pu" href={`/${lang}/${items.user_id}`}>
                                            {
                                                items.license === "Free" ? (
                                                    <div className="OSAWo">
                                                        <div className="Y7nba">
                                                            <img className="rounded-full w-8 h-8 "
                                                                // src="https://images.unsplash.com/profile-1709797368653-c9a3d3c2bf26?fm=jpg&amp;q=60&amp;w=3000&amp;ixlib=rb-4.0.3&amp;crop=faces&amp;fit=crop&amp;h=32"
                                                                 src={`${api_url}/${items.avatarurl}`}
                                                                 alt="user photo"/>


                                                        </div>
                                                    </div>
                                                ) : items.license === "Unsplash+" ? (
                                                    <CollabIcon lang={lang} avatarurl={`${api_url}/${items.avatarurl}`}
                                                                user_id={items.user_id} mode={3}/>

                                                ) : (
                                                    <>Error</>
                                                )
                                            }

                                        </Link>
                                        <div className="TeuLI flex flex-col min-w-0">
                                            <Link
                                                className="BkSVh FEdrY SfGU7 ZR5jm jQEvX ZR5jm font-semibold "
                                                href={`/${lang}/${items.user_id}`}>{items.fullname}
                                            </Link>
                                            <div
                                                className="yYlOu FEdrY xjeZk YCEoC tracking-[.01em] text-xs">
                                                {
                                                    items.license === "Free" ? (
                                                        items.hirevalue && (

                                                            <Link
                                                                className="DlY2G OQSsT SfGU7 tUutM text-[#007fff] flex items-center  "
                                                                href={`/${lang}/${items.user_id}`}>{lang === "en" ? <>Available</> : <>Доступен</>}

                                                                <p
                                                                    className="ml-1 navBar_mobile_display_none">
                                                                    {lang === "en" ? <>for hire</> : <>для найма</>}


                                                                </p>
                                                                <svg
                                                                    className="WcLcf fill-[#007fff] h-3 ml-1 w-3"
                                                                    width="24"
                                                                    height="24" viewBox="0 0 24 24"
                                                                    version="1.1"
                                                                    aria-hidden="false">
                                                                    <desc
                                                                        lang="en-US">A checkmark inside of a circle
                                                                    </desc>
                                                                    <path
                                                                        d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6-6.1 1.5 1.5-7.5 7.6z"></path>
                                                                </svg>
                                                            </Link>
                                                        )
                                                    ) : items.license === "Unsplash+" ? (
                                                        <>
                                                            <p className="DlY2G OQSsT SfGU7 tUutM text-76 flex items-center  navBar_mobile_display_none">
                                                                {
                                                                    lang === "en" ? truncateText(`In collaboration with ${items.fullname}`, 29) : truncateText(` В сотрудничестве с ${items.fullname}`, 29)
                                                                }
                                                            </p>
                                                            <p className="DlY2G OQSsT SfGU7 tUutM text-76 flex items-center pc_display_none">
                                                                {
                                                                    lang === "en" ? `Collab.` : `Cотруднич.`
                                                                }
                                                            </p>
                                                        </>

                                                    ) : (
                                                        <>Error</>
                                                    )

                                                }
                                                    </div>
                                                    </div>
                                                    </span>
                                                    </div>
                                                    </span>
                                    </div>
                                    <div className="NvAEz flex gap-2">
                                        <button type="button"
                                                onClick={handleToggleLike}
                                            //modal_buttons
                                                className={liked ? 'modal_like_active' : "modal_buttons"}
                                                title="Like this image">
                                            <svg className=""
                                                // fill="currentColor"
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
                                                className="modal_buttons"
                                                title="Add this image to a collection">
                                            <svg fill="currentColor" width="16" height="16" viewBox="0 0 24 24"
                                                 version="1.1"
                                                 aria-hidden="false">
                                                <desc lang="en-US">A plus sign</desc>
                                                <path d="M21.8 10.5h-8.3V2.2h-3v8.3H2.2v3h8.3v8.3h3v-8.3h8.3z"></path>
                                            </svg>
                                        </button>
                                        <Modal size="3xl" placement="center" onOpenChange={onOpenChange} isOpen={isOpen}
                                               classNames={{
                                                   body: "p-0 rounded-sm dark:bg-black"
                                               }}>
                                            <ModalContent>


                                                <ModalBody>
                                                    <CollectionModal _id={id}
                                                                     imageUrl={`${api_url}/${items.imageurl}`}/>

                                                </ModalBody>


                                            </ModalContent>
                                        </Modal>
                                        <Modal size="3xl" placement="center" onOpenChange={closeModal} isOpen={isModalOpenReport} classNames={{
                                            body: "p-0 rounded-sm dark:bg-black"
                                        }}>
                                            <ModalContent>


                                                <ModalBody>
                                                    {/*<CollectionModal _id={id} imageUrl={`${api_url}/${items.imageurl}`}/>*/}
                                                    <ReportModal post_id={id}/>
                                                </ModalBody>


                                            </ModalContent>
                                        </Modal>
                                        <div className="download_button_div_adaptive">
                                            {
                                                items.license === "Unsplash+" ? (
                                                    // modal_buttons bg-black
                                                    <div className="modal_buttons_unpslash "
                                                         style={{backgroundColor: "black"}}>
                                                        <svg width="15" height="15" viewBox="0 0 24 24" version="1.1"
                                                             aria-hidden="false">
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
                                                    </div>
                                                ) : (
                                                    <div
                                                        onClick={() => DownloadImage(`${api_url}/${items?.imageurl}`, items?.imageurl, id)}
                                                        className="download_button_gradient">
                                                        {lang === "en" ? <>Download</> : <>Скачать</>}
                                                        <p className="ml-1 navBar_mobile_display_none">
                                                            {lang === "en" ? <>free</> : <>бесплатно</>}
                                                        </p>
                                                    </div>
                                                )
                                            }


                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pb-5 py-2.5">
                                <div>

                                    <img
                                        src={`${api_url}/${items.imageurlFull}`}
                                        alt={items.text}
                                        className="w-full h-full object-cover "
                                    />
                                </div>
                            </div>
                            <div className="modal_text">
                                <div>
                                    <p>
                                        {lang === "en" ? <>Views</> : <>Просмотры</>}

                                    </p>
                                    <p>
                                        {items.viewscount}
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        {lang === "en" ? <>Likes</> : <>Лайков</>}

                                    </p>
                                    <p>
                                        {items.likecount}
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        {lang === "en" ? <>Featured</> : <>Избранные</>}

                                    </p>
                                    <p>
                                        {items.posttype}, {items.category}
                                    </p>
                                </div>
                                <div className="ml-auto buttons_class">
                                    {/*<button type="button"*/}
                                    {/*        className="modal_buttons "*/}
                                    {/*        title="Add this image to a collection">*/}
                                    {/*    <svg fill="currentColor" width="16" height="16" viewBox="0 0 24 24"*/}
                                    {/*         version="1.1"*/}
                                    {/*         aria-hidden="false">*/}
                                    {/*        <desc lang="en-US">A plus sign</desc>*/}
                                    {/*        <path*/}
                                    {/*            d="M13 20v-5.5c-5.556 0-8.222 1-11 5.5C2 13.25 5.222 8.625 13 7.5V2l9 9-9 9Z"></path>*/}
                                    {/*    </svg>*/}
                                    {/*    <span className="ml-1">*/}
                                    {/*    Share*/}
                                    {/*    </span>*/}
                                    {/*</button>*/}
                                    <Dropdown
                                        showArrow={true}
                                        classNames={{
                                            base: "before:bg-default-200", // change arrow background
                                            content: "py-0 px-0 rounded-lg p-0 "
                                        }}
                                    >
                                        <DropdownTrigger>
                                            <button type="button"
                                                    className="modal_buttons "
                                                    title="Add this image to a collection">
                                                <svg fill="currentColor" width="16" height="16" viewBox="0 0 24 24"
                                                     version="1.1"
                                                     aria-hidden="false">
                                                    <desc lang="en-US">A plus sign</desc>
                                                    <path
                                                        d="M13 20v-5.5c-5.556 0-8.222 1-11 5.5C2 13.25 5.222 8.625 13 7.5V2l9 9-9 9Z"></path>
                                                </svg>
                                                <span className="ml-1 navBar_mobile_display_none">
                                                {lang === "en" ? <>Share</> : <>Поделиться</>}

                                        </span>
                                            </button>
                                        </DropdownTrigger>
                                        <DropdownMenu
                                            classNames={{
                                                base: "p-0  rounded-lg "
                                            }}

                                            aria-label="Static Actions">
                                            <DropdownItem classNames={{
                                                base: "hover:bg-2A"
                                            }} key="copy" startContent={<CopyLink/>}>{lang === "en" ? <>Copy
                                                link</> : <>Скопировать ссылку</>}</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                    {
                                        (data !== null && data._id === items.user_id) && (
                                            <>
                                                <button type="button"
                                                        className="modal_buttons fill-blue-500"
                                                        title="Add this image to a collection"
                                                        onClick={() => router.push(`/${lang}/photos/${id}/statistics`)}>
                                                    <svg width="16" height="16" viewBox="0 0 24 24"
                                                         version="1.1"
                                                         aria-hidden="false">
                                                        <desc lang="en-US">A plus sign</desc>

                                                        <g>
                                                            <g>

                                                                <path className="fill-blue-500"
                                                                      d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2Zm1.111 8.889v6.667H10.89v-6.667h2.222Zm0-4.445v2.223H10.89V6.444h2.222Z"></path>
                                                            </g>
                                                        </g>

                                                    </svg>
                                                    <span className="ml-1 text-blue-500  navBar_mobile_display_none">
                                                        {lang === "en" ? <>Statistics</> : <>Статистика</>}

                                        </span>
                                                </button>
                                                <button type="button"
                                                        className="modal_buttons "
                                                        title="Add this image to a collection"
                                                        onClick={() => router.push(`/${lang}/photos/${id}/update`)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 14 14" id="Pencil--Streamline-Core" height="14"
                                                         width="14">
                                                        <desc>Pencil Streamline Icon: https://streamlinehq.com</desc>
                                                        <path id="Union" fill="#000000"
                                                              d="M10.715 -0.000976562c-0.1998 0 -0.3976 0.039922962 -0.5818 0.117424562 -0.18301 0.07702 -0.34892 0.18961 -0.48808 0.331228L1.40732 8.64549c-0.06116 0.06086 -0.10553 0.13651 -0.12879 0.21959L0.0185299 13.3651c-0.0487051 0.1739 0.0001992 0.3606 0.1279281 0.4884 0.12773 0.1277 0.314422 0.1766 0.488369 0.1279l4.500003 -1.26c0.08308 -0.0233 0.15873 -0.0677 0.21959 -0.1288l8.19768 -8.2377 0.0014 -0.00135c0.1399 -0.13917 0.251 -0.30459 0.3269 -0.48679 0.0762 -0.18278 0.1154 -0.37884 0.1154 -0.57686 0 -0.19802 -0.0392 -0.39408 -0.1154 -0.57687 -0.0759 -0.1822 -0.187 -0.34763 -0.3269 -0.48679l-0.0014 -0.00134L11.7859 0.448721c-0.1393 -0.14211 -0.3056 -0.255064 -0.4891 -0.332273 -0.1842 -0.0775016 -0.382 -0.117424562 -0.5818 -0.117424562Z"
                                                              stroke-width="1"></path>
                                                    </svg>

                                                    <span className="ml-1 navBar_mobile_display_none">
                                                      {lang === "en" ? <>Change</> : <>Изменить</>}

                                        </span>
                                                </button>
                                                <button type="button"
                                                        className="modal_buttons "
                                                        onClick={() => {
                                                            const confirmMessage = lang === "en" ? "Are you sure you want to delete this post?" : "Вы уверены, что хотите удалить этот пост?";
                                                            if (window.confirm(confirmMessage)) {
                                                                const params = {
                                                                    _id: id
                                                                }
                                                                dispatch(fetchDeletePost(params))
                                                                // router.push(`/${lang}`)
                                                            }
                                                        }}
                                                        title="Add this image to a collection">
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                         viewBox="0 0 24 24" id="Delete-Keyboard--Streamline-Core"
                                                         height="16" width="16">
                                                        <desc>Delete Keyboard Streamline Icon:
                                                            https://streamlinehq.com
                                                        </desc>
                                                        <g>
                                                            <path id="Subtract" fill="#000000" fill-rule="evenodd"
                                                                  d="M4.781828571428571 18.771942857142857C5.525142857142857 19.644514285714287 6.613885714285714 20.146971428571426 7.760057142857143 20.14662857142857H19.84902857142857C22.00902857142857 20.1468 23.759999999999998 18.395657142857143 23.759999999999998 16.235657142857143V7.764342857142857C23.759999999999998 5.604342857142857 22.00902857142857 3.8533714285714282 19.84902857142857 3.8533714285714282H7.760057142857143C6.613885714285714 3.853028571428571 5.525142857142857 4.355485714285714 4.781828571428571 5.228057142857143L1.173942857142857 9.463714285714286C-0.0713142857142857 10.925314285714284 -0.0713142857142857 13.074685714285714 1.173942857142857 14.536285714285713L4.781828571428571 18.771942857142857ZM9.015428571428572 7.590342857142856C9.492857142857142 7.112914285714286 10.266857142857143 7.112914285714286 10.744114285714286 7.590342857142856L13.384114285714286 10.230342857142857L16.02205714285714 7.590342857142856C16.687371428571428 6.925028571428571 17.8236 7.229314285714286 18.06702857142857 8.138228571428572C18.180171428571427 8.560114285714286 18.059485714285714 9.010285714285715 17.750742857142857 9.31902857142857L15.110742857142856 11.958857142857141L17.750742857142857 14.598857142857142C18.41605714285714 15.264171428571427 18.1116 16.4004 17.202685714285714 16.64382857142857C16.780971428571426 16.75697142857143 16.3308 16.636285714285712 16.02205714285714 16.327542857142856L13.38205714285714 13.687542857142857L10.742228571428571 16.327542857142856C10.057028571428571 16.97245714285714 8.930742857142857 16.63388571428571 8.714914285714286 15.718114285714286C8.62062857142857 15.318171428571429 8.7336 14.897657142857144 9.015428571428572 14.598857142857142L11.65542857142857 11.958857142857141L9.015428571428572 9.31902857142857C8.538 8.8416 8.538 8.0676 9.015428571428572 7.590342857142856Z"
                                                                  clip-rule="evenodd" stroke-width="1"></path>
                                                        </g>
                                                    </svg>
                                                    <span className="ml-1 text-red-500 navBar_mobile_display_none">
                                                        {lang === "en" ? <>Delete</> : <>Удалить</>}

                                        </span>
                                                </button>
                                            </>
                                        )
                                    }
                                    {(data === null || data._id !== items.user_id) && (

                                        <button type="button"
                                                className="modal_buttons fill-red-500 text-red-500 "
                                                onClick={handleButtonClick}
                                                title="Add this image to a collection">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"
                                                 id="Warning-Circle--Streamline-Core" height="13" width="13">
                                                <g>

                                                    <path id="Subtract" className="fill-red-500" fill-rule="evenodd"
                                                          d="M7 14c3.866 0 7 -3.134 7 -7 0 -3.86599 -3.134 -7 -7 -7 -3.86599 0 -7 3.13401 -7 7 0 3.866 3.13401 7 7 7ZM7 3.125c0.41421 0 0.75 0.33579 0.75 0.75v3.25c0 0.41421 -0.33579 0.75 -0.75 0.75s-0.75 -0.33579 -0.75 -0.75v-3.25c0 -0.41421 0.33579 -0.75 0.75 -0.75Zm1 6.75c0 0.5523 -0.44772 1 -1 1s-1 -0.4477 -1 -1c0 -0.55228 0.44772 -1 1 -1s1 0.44772 1 1Z"
                                                          clip-rule="evenodd" stroke-width="1">

                                                    </path>
                                                </g>
                                            </svg>
                                            <span className="ml-1 text-red-500 navBar_mobile_display_none">
                                            {lang === "en" ? <>Report</> : <>Пожаловаться</>}

                                        </span>
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div>
                                <div className="h-8 navBar_mobile_display_none"></div>
                                {/*Текст с описанием*/}
                                <div className="text-sm ">
                                    <p>{items.title}</p>
                                    <p>{items.text}</p>
                                </div>
                                <div className="h-4"></div>

                                {/*Инфа*/}
                                <div>
                                    <div className="modal_info">
                                        {
                                            items.posttype === 'Photos' ? (
                                                <div className="">

                                                <span className="">
                                                    <svg className="_pJqy" width="16" height="16"
                                                         viewBox="0 0 24 24" version="1.1" aria-hidden="false">
                                                        <desc lang="en-US">A map marker</desc>
                                                        <path
                                                            d="M17.6 4.2C16 2.7 14.1 2 12 2s-4 .7-5.6 2.2C4.8 5.7 4 7.7 4 10.2c0 1.7.7 3.5 2 5.4 1.3 2 3.3 4.1 6 6.4 2.7-2.3 4.7-4.4 6-6.4 1.3-2 2-3.8 2-5.4 0-2.5-.8-4.5-2.4-6zm-1.1 10.1c-1 1.5-2.5 3.2-4.5 5.1-2-1.9-3.5-3.6-4.5-5.1-1-1.5-1.5-2.9-1.5-4.1 0-1.8.6-3.3 1.7-4.5C8.9 4.6 10.3 4 12 4s3.1.6 4.3 1.7c1.2 1.2 1.7 2.6 1.7 4.5 0 1.2-.5 2.5-1.5 4.1zm-2-4.3c0 1.4-1.1 2.5-2.5 2.5S9.5 11.4 9.5 10s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5z"></path></svg>
                                                    <span className="">Noosa, QLD, Australia</span>
                                                </span>
                                                </div>
                                            ) : (
                                                <></>
                                            )
                                        }
                                        <div>
                                        <span className="jgdig">
                                            <svg className="_pJqy" width="16" height="16"
                                                 viewBox="0 0 24 24" version="1.1"
                                                 aria-hidden="false">
                                                <desc
                                                    lang="en-US">Calendar outlined</desc>
                                                <path
                                                    d="M21 6v14c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h1V2h2v2h8V2h2v2h1c1.1 0 2 .9 2 2zM5 8h14V6H5v2zm14 12V10H5v10h14z"></path></svg>
                                            <span>{lang === "en" ? <>Published</> : <>Опубликовано</>} {new Intl.DateTimeFormat(`${lang}`, {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            }).format(new Date(items.createdat))}</span>
                                        </span>
                                        </div>

                                        {
                                            items.posttype === 'Photos' ? (
                                                <div>




                                                    <span
                                                        className="jgdig">
                                            <svg className="_pJqy" width="16" height="16"
                                                 viewBox="0 0 24 24" version="1.1" aria-hidden="false">
                                                <desc lang="en-US">Camera</desc>
                                                <path
                                                    d="m14.12 4 1.83 2H20v12H4V6h4.05l1.83-2h4.24ZM15 2H9L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2Zm-3 7c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3Zm0-2c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5Z"></path></svg>
                                            <span>{items.cameracompany}, {items.model}, {items.aperture}, {items.shutterspeed}, {items.focallength} </span>

                                    </span>

                                                </div>
                                            ) : (
                                                <></>
                                            )

                                        }
                                        {
                                            items.posttype === 'Photos' ? (
                                                <div>


                                                        <span
                                                            className="">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"
                                                 id="Orientation-Landscape--Streamline-Core" height="14" width="14">
                                                <path id="Subtract" fill-rule="evenodd"
                                                      d="M14 11c0 0.8284 -0.6716 1.5 -1.5 1.5h-11C0.671573 12.5 0 11.8284 0 11V3c0 -0.82843 0.671573 -1.5 1.5 -1.5h11c0.8284 0 1.5 0.67157 1.5 1.5v8Zm-3.0312 -6.0331c0 0.81019 -0.6567 1.46697 -1.46692 1.46697 -0.81018 0 -1.46697 -0.65678 -1.46697 -1.46697 0 -0.81018 0.65679 -1.46696 1.46697 -1.46696 0.81022 0 1.46692 0.65678 1.46692 1.46696ZM1.95792 6.71378c1.56381 -0.03536 3.08932 0.48605 4.30433 1.47119C7.31905 9.04183 8.08114 10.201 8.45163 11.5L1.5 11.5c-0.27614 0 -0.5 -0.2239 -0.5 -0.5V6.77458c0.31324 -0.04123 0.62903 -0.06151 0.94527 -0.06067l0 0.00016 0.01265 -0.00029ZM9.48612 11.5h3.01398c0.2762 0 0.5 -0.2239 0.5 -0.5V9.30899c-0.6321 -0.17885 -1.2865 -0.26961 -1.9446 -0.26924l-0.0013 0c-0.8201 -0.00178 -1.63323 0.13623 -2.40479 0.40694 0.37577 0.63641 0.65877 1.32771 0.83671 2.05331Z"
                                                      clip-rule="evenodd" stroke-width="1"></path>

                                        </svg>
                                            <span>{items.dimensions}, ISO - {items.isocam} </span>

                                    </span>
                                                </div>
                                            ) : (
                                                <></>
                                            )

                                        }
                                        <div>


                                                    <span className="jgdig">
                                                    <svg
                                                        className="_pJqy" width="16" height="16" viewBox="0 0 24 24"
                                                        version="1.1"
                                                        aria-hidden="false">
                                                    <desc lang="en-US">Safety
                                                    </desc>
                                                    <path
                                                        d="m10 14.2 6.6-6.6L18 9l-8 8-4-4 1.4-1.4 2.6 2.6ZM21 5v6c0 5.5-3.8 10.7-9 12-5.2-1.3-9-6.5-9-12V5l9-4 9 4Zm-2 1.3-7-3.1-7 3.1V11c0 4.5 3 8.7 7 9.9 4-1.2 7-5.4 7-9.9V6.3Z"></path></svg>
                                                    <span
                                                        className="IwfFI jhw7y">{items.license} {lang === "en" ? <>License</> : <>Лицензия</>}

                                            </span>
                                        </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="h-8"></div>

                                {/*Теги*/}
                                <div className="mb-4">
                                    <div className="flex flex-row flex-wrap gap-2">

                                        {
                                            items.tags.map(item => (
                                                <Link href={`/${lang}/s/photos/${item}`}>
                                                    <p className="modal_tags">{item}</p>
                                                </Link>
                                            ))
                                        }
                                    </div>
                                </div>

                                <div className="">


                                    {
                                        items.banned && (
                                            <>
                                                <p className="text-red-500 mb-2">{lang === "en" ? <>Post banned:
                                                    {items.reasonofban}
                                                </> : <>Запись заблокирована: {items.reasonofban} </>}</p>
                                                {
                                                    data !== null && (data.user_role_id === 1 || data.user_role_id === 3) ? (
                                                        <></>
                                                    ) : data !== null && data.user_role_id === 2 ? (
                                                        <button type="button"
                                                                className="modal_buttons fill-red-500 text-red-500 "
                                                                onClick={() => {
                                                                    if (data !== null && items?.admin_id) {
                                                                        if (id !== data._id) {
                                                                            dispatch(fetchCreateChat({
                                                                                _id: data._id,
                                                                                userId: items.admin_id,
                                                                                chatName: "Tech support chat",
                                                                                isTechSup: true,
                                                                                description: `Tech support chat about post - ${items.title} `,
                                                                                chat_image: "",
                                                                                isGroup: false
                                                                            }))
                                                                            router.push(`/${lang}/chats`);

                                                                        }
                                                                    }
                                                                }}
                                                                title="Add this image to a collection">
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"
                                                                 id="Warning-Circle--Streamline-Core" height="13"
                                                                 width="13">
                                                                <g>

                                                                    <path id="Subtract" className="fill-red-500"
                                                                          fill-rule="evenodd"
                                                                          d="M7 14c3.866 0 7 -3.134 7 -7 0 -3.86599 -3.134 -7 -7 -7 -3.86599 0 -7 3.13401 -7 7 0 3.866 3.13401 7 7 7ZM7 3.125c0.41421 0 0.75 0.33579 0.75 0.75v3.25c0 0.41421 -0.33579 0.75 -0.75 0.75s-0.75 -0.33579 -0.75 -0.75v-3.25c0 -0.41421 0.33579 -0.75 0.75 -0.75Zm1 6.75c0 0.5523 -0.44772 1 -1 1s-1 -0.4477 -1 -1c0 -0.55228 0.44772 -1 1 -1s1 0.44772 1 1Z"
                                                                          clip-rule="evenodd" stroke-width="1">

                                                                    </path>
                                                                </g>
                                                            </svg>
                                                            <span
                                                                className="ml-1 text-red-500 navBar_mobile_display_none">
                                            {lang === "en" ? <>Write tech support</> : <>Написать тех. поддержке</>}

                                        </span>
                                                        </button>
                                                    ) : (
                                                        <></>
                                                    )

                                                }

                                            </>
                                        )
                                    }
                                    {
                                        data !== null && data.user_role_id === 3 && (
                                            <>
                                                <form onSubmit={() => onSubmit()}>

                                                    <label
                                                        className="inputStyle_title">{lang === "en" ? <>Reason of
                                                        ban</> : <>Причина
                                                        блокировки</>}</label>
                                                    <input type="text" className="inputStyle"
                                                           placeholder={lang === "en" ? "Violated community rules" : "Нарушил правила сообщества"}
                                                           {...register("reasonofban", {
                                                               required: true, minLength: 2,
                                                               pattern: /^.*[a-zA-Zа-яА-Я]+.*$/
                                                           })} />
                                                    {(errors.reasonofban?.type === "required" || errors.reasonofban?.type === 'minLength' || errors.reasonofban?.type === 'pattern') && (
                                                        <div
                                                            className="flex p-4 mb-4 w-full text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-950 dark:text-red-400"
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
                                                                    <li>{lang === "en" ? <>You can only enter
                                                                        letters.</> : <>Можно
                                                                        вписывать только
                                                                        буквы.</>}</li>
                                                                    <li>{lang === "en" ? <>Minimum length 2
                                                                        characters.</> : <>Минимальная длина 2
                                                                        символа.</>}</li>
                                                                </ul>
                                                            </div>
                                                        </div>

                                                    )}
                                                    {/*    */}
                                                    <button type="submit" onClick={() => onSubmit()}
                                                            className="w-full mb-4 text-white bg-[#171717] hover:bg-[#222222]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium justify-center rounded-lg text-lg px-5 py-3 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 ">
                                                        {lang === "en" ? <>Ban post</> : <>Заблокировать запись</>}
                                                    </button>
                                                </form>
                                                <button type="button" onClick={() => onSubmitUnBan()}
                                                        className="w-full mb-4 text-white bg-[#171717] hover:bg-[#222222]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium justify-center rounded-lg text-lg px-5 py-3 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 ">
                                                    {lang === "en" ? <>UnBan post</> : <>Разблокировать запись</>}
                                                </button>
                                                {
                                                    error && (

                                                        <div id="toast-danger"
                                                             className={pageModalStatus ? " flex items-center w-full mb-4  p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12" : "fixed flex items-center w-full max-w-xs p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12"}

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
                                                            <div
                                                                className="ms-3 text-sm font-normal">{lang === "en" ? <>Blocking
                                                                error!</> : <>Ошибка
                                                                блокировки!</>}</div>
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
                                                                          stroke-width="2"
                                                                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    SuccessDataChange && (

                                                        <div id="toast-success"

                                                             className={pageModalStatus ? " flex items-center w-full mb-4  p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12" : "fixed flex items-center w-full max-w-xs p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12"}
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
                                                            <div className="ms-3 text-sm font-normal">{lang === "en" ? <>Post
                                                                banned.</> : <>Запись
                                                                заблокирована.</>}</div>
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
                                                    sendDataChange && (

                                                        <div id="toast-danger"
                                                             className={pageModalStatus ? " flex items-center w-full mb-4  p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12" : "fixed flex items-center w-full max-w-xs p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12"}

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
                                                            <div className="ms-3 text-sm font-normal">{lang === "en" ? <>Send
                                                                error!</> : <>Ошибка
                                                                отправки!</>}</div>
                                                            <button type="button"
                                                                    onClick={() => setSendDataChange(false)}
                                                                    className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 border-0 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-12 dark:hover:bg-1E"
                                                                    data-dismiss-target="#toast-danger" aria-label="Close">
                                                                <span className="sr-only">Close</span>
                                                                <svg className="w-3 h-3" aria-hidden="true"
                                                                     xmlns="http://www.w3.org/2000/svg"
                                                                     fill="none"
                                                                     viewBox="0 0 14 14">
                                                                    <path stroke="currentColor" stroke-linecap="round"
                                                                          stroke-linejoin="round"
                                                                          stroke-width="2"
                                                                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    errorRazban && (

                                                        <div id="toast-danger"
                                                             className={pageModalStatus ? " flex items-center w-full mb-4  p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12" : "fixed flex items-center w-full max-w-xs p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12"}

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
                                                            <div
                                                                className="ms-3 text-sm font-normal">{lang === "en" ? <>UNBlocking
                                                                error!</> : <>Ошибка
                                                                разблокировки!</>}</div>
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
                                                                          stroke-width="2"
                                                                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    SuccessDataChangeRazban && (

                                                        <div id="toast-success"

                                                             className={pageModalStatus ? " flex items-center w-full mb-4  p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12" : "fixed flex items-center w-full max-w-xs p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12"}
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
                                                            <div className="ms-3 text-sm font-normal">{lang === "en" ? <>Post
                                                                unbanned.</> : <>Запись
                                                                разблокирована.</>}</div>
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

                                </div>


                            </div>
                        </div>
                    ) : (<></>
                    )
                    }


                </ModalBody>


            </ModalContent>
        </Modal>

        // </div>

    )
        ;
}
// export default DetailPostInfo