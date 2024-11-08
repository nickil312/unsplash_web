'use client'
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/globalRedux/store";
import {fetchGetUserDataAndDataAnotherUser} from "@/app/globalRedux/users/asyncActions";
import {usePathname} from "next/navigation";
import {Cities, work} from "@/app/[lang]/(account)/account/hiring/page";
import ToggleBD from "@/app/components/account/__Nav/ToggleBD";

type DetailUsersProps = {
    params: {
        id: string;
    }
}

export default function UsersPage(params: DetailUsersProps) {
    const id = params.params.id;
    const dispatch = useDispatch<AppDispatch>();
    const {items, status} = useSelector((state: RootState) => state.users.data_another_user);
    const {api_url, data} = useSelector((state: RootState) => state.users);
    const pathname = usePathname()
    const lang = pathname.split('/')[1];
    useEffect(() => {

        dispatch(fetchGetUserDataAndDataAnotherUser({
            _id: id
        }))

    }, [])
    return (
        <>

            <div>
                {
                    items !== null ? (
                        <div className="users_data_adaptive">
                            <div>
                                <img
                                    src={`${api_url}/${items.avatarurl}`}
                                    alt={items.fullname}
                                    className=" w-[150px] h-[150px] object-cover rounded-full"
                                />

                            </div>
                            <div className="users_data_MainBlock_adaptive">
                                <div className="flex flex-row w-full gap-6 items-center">

                                    <p className="text-[40px] w-auto font-bold">{items.fullname}</p>
                                    <div className="flex flex-row w-full  items-center gap-2">
                                        {
                                            ((items.hirevalue !== null) && items.hirevalue) && (

                                                <div
                                                    className="  w-fit h-8 px-2.5 flex text-sm text-center items-center text-white bg-[#027DFA] rounded hover:bg-[#006AFF] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                    <p>{lang === "en" ? <>Hire</> : <>Нанять</>}</p>

                                                </div>
                                            )
                                        }
                                        {
                                            ((items.messages !== null) && items.messages) && (
                                                <div
                                                    className="button_settings_style" style={{
                                                    height: 32,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    width: "42px"
                                                }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                         viewBox="0 0 24 24" className="fill-76 w-[18px] h-[18px]">
                                                        <path
                                                            d="M20 4H4C2.88 4 2 4.88 2 6V18C2 19.12 2.88 20 4 20H20C21.12 20 22 19.12 22 18V6C22 4.88 21.12 4 20 4ZM20 8L12 12.96L4 8V6L12 10.96L20 6V8Z"></path>
                                                    </svg>

                                                </div>
                                            )
                                        }

                                        {(data === null || data._id !== items._id) && (

                                            <button type="button"
                                                    className="modal_buttons fill-red-500 text-red-500 "
                                                    title="Report user">
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
                                <div className="gap-y-4 flex flex-col">
                                    <div>{lang === "en" ? <>Download free, beautiful high-quality photos curated
                                        by {items.fullname}.</> : <>Загрузите бесплатно красивые высококачественные
                                        фотографии, отобранные {items.fullname}.</>}</div>
                                    <div className="flex flex-col w-full items-start gap-2 ">


                                        {
                                            ((items.hirevalue !== null) && items.hirevalue) && (


                                                <p className="DlY2G OQSsT SfGU7 tUutM text-base text-[#007fff] flex items-center  ">
                                                    <svg
                                                        className="WcLcf fill-[#007fff] h-4 mr-2 w-4"
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
                                                    {lang === "en" ? <>Available</> : <>Доступен</>}

                                                    <p
                                                        className="ml-1 navBar_mobile_display_none">
                                                        {lang === "en" ? <>for hire</> : <>для найма</>}


                                                    </p>

                                                </p>
                                            )
                                        }
                                        {
                                            ((items.location !== null) && items.location) && (
                                                <div className="user_profile_icons_text ">
                                                    <svg className="ugnhF" width="16" height="16" viewBox="0 0 24 24"
                                                         version="1.1"
                                                         aria-hidden="false">
                                                        <desc lang="en-US">A map marker</desc>
                                                        <path
                                                            d="M5.988 15.637C7.313 17.596 9.317 19.717 12 22c2.683-2.283 4.688-4.404 6.013-6.363C19.338 13.679 20 11.867 20 10.2c0-2.5-.804-4.492-2.413-5.975C15.979 2.742 14.117 2 12 2c-2.117 0-3.979.742-5.587 2.225C4.804 5.708 4 7.7 4 10.2c0 1.667.663 3.479 1.988 5.437ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                                                    </svg>
                                                    <p>
                                                        {items.location}
                                                    </p>
                                                </div>
                                            )
                                        }
                                        {
                                            items.cities !== null ? (
                                                <div className="user_profile_icons_text  ">

                                                    {/*<svg width="16px" height="16px" viewBox="0 0 24 24"*/}
                                                    {/*     fill="none"*/}
                                                    {/*     xmlns="http://www.w3.org/2000/svg">*/}
                                                    {/*    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>*/}
                                                    {/*    <g id="SVGRepo_tracerCarrier" stroke-linecap="round"*/}
                                                    {/*       stroke-linejoin="round"></g>*/}
                                                    {/*    <path*/}
                                                    {/*        d="M14 19.9999V9.82831C14 9.29787 13.7893 8.78916 13.4142 8.41409L10.4142 5.41409C9.63317 4.63304 8.36684 4.63304 7.58579 5.41409L4.58579 8.41409C4.21071 8.78916 4 9.29787 4 9.82831V17.9999C4 19.1045 4.89542 19.9999 5.99998 19.9999L9 19.9999M14 19.9999L19 19.9999C20.1046 19.9999 21 19.1045 21 17.9999V12.8284C21 12.2979 20.7893 11.7892 20.4142 11.4141L18.4142 9.41415C17.6332 8.6331 16.3668 8.6331 15.5858 9.41415L14 10.9999M14 19.9999L9 19.9999M9 19.9999V15.9999"*/}
                                                    {/*        stroke="#767676" stroke-width="2" stroke-linecap="round"*/}
                                                    {/*        stroke-linejoin="round"></path>*/}

                                                    {/*</svg>*/}
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 14 14" id="Building-2--Streamline-Core"
                                                         height="14" width="14">
                                                        <desc>Building 2 Streamline Icon: https://streamlinehq.com
                                                        </desc>
                                                        <path id="Subtract" fill="#767676" fill-rule="evenodd"
                                                              d="M4.52109 0.137869c-0.19308 -0.1838252 -0.49643 -0.1838252 -0.68952 0L0.155238 3.63787C0.0561082 3.73224 0 3.86313 0 4v9.5c0 0.2761 0.223858 0.5 0.5 0.5h2.67633v-2c0 -0.5523 0.44772 -1 1 -1 0.55229 0 1 0.4477 1 1v2h2.67633c0.27615 0 0.5 -0.2239 0.5 -0.5V4c0 -0.13687 -0.0561 -0.26776 -0.15523 -0.36213L4.52109 0.137869ZM9.76862 6.5c0 -0.27614 0.22385 -0.5 0.49998 -0.5H13.5c0.2761 0 0.5 0.22386 0.5 0.5v7c0 0.2761 -0.2239 0.5 -0.5 0.5h-3.2314c-0.27613 0 -0.49998 -0.2239 -0.49998 -0.5v-7ZM2.1727 7.76298c0 -0.34518 0.27982 -0.625 0.625 -0.625h2.75725c0.34518 0 0.625 0.27982 0.625 0.625s-0.27982 0.625 -0.625 0.625H2.7977c-0.34518 0 -0.625 -0.27982 -0.625 -0.625Zm0.625 -3.23235c-0.34518 0 -0.625 0.27982 -0.625 0.625s0.27982 0.625 0.625 0.625h2.75725c0.34518 0 0.625 -0.27982 0.625 -0.625s-0.27982 -0.625 -0.625 -0.625H2.7977Z"
                                                              clip-rule="evenodd" stroke-width="1"></path>

                                                    </svg>
                                                    {/*<p>{items.cities.join(', ')}</p>*/}

                                                    <p>
                                                        {items.cities.map((cityId) => {
                                                            const matchingCity = Cities.find((city) => city.id === cityId);
                                                            return matchingCity ? (lang === 'en' ? matchingCity.label.en : matchingCity.label.ru) : cityId;
                                                        }).join(', ')}
                                                    </p>
                                                </div>
                                            ) : (
                                                <></>
                                            )

                                        }
                                        {
                                            items.work !== null ? (
                                                <div className="user_profile_icons_text">
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                         viewBox="0 0 14 14"
                                                         id="Camera-1--Streamline-Core" height="14" width="14">
                                                        <desc>Camera 1 Streamline Icon: https://streamlinehq.com</desc>
                                                        <path id="Subtract" fill="#767676" fill-rule="evenodd"
                                                              d="M4.6 1.7c0.09443 -0.1259 0.24262 -0.2 0.4 -0.2h4c0.15738 0 0.30557 0.0741 0.4 0.2l1.35 1.8h1.75c0.3978 0 0.7794 0.15804 1.0607 0.43934S14 4.60217 14 5v6c0 0.3978 -0.158 0.7794 -0.4393 1.0607S12.8978 12.5 12.5 12.5h-11c-0.39783 0 -0.779356 -0.158 -1.06066 -0.4393C0.158035 11.7794 0 11.3978 0 11V5c0 -0.39782 0.158035 -0.77936 0.43934 -1.06066C0.720644 3.65804 1.10217 3.5 1.5 3.5h1.75L4.6 1.7Zm4.86132 6.01132c0 1.35936 -1.10198 2.46128 -2.46133 2.46128 -1.35935 0 -2.46132 -1.10192 -2.46132 -2.46128 0 -1.35935 1.10197 -2.46132 2.46132 -2.46132 1.35935 0 2.46133 1.10197 2.46133 2.46132Z"
                                                              clip-rule="evenodd" stroke-width="1"></path>

                                                    </svg>
                                                    {/*<p>{items.work.join(', ')}</p>*/}
                                                    <p>
                                                        {items.work.map((cityId) => {
                                                            const matchingWork = work.find((city) => city.id === cityId);
                                                            return matchingWork ? (lang === 'en' ? matchingWork.label.en : matchingWork.label.ru) : cityId;
                                                        }).join(', ')}
                                                    </p>
                                                </div>
                                            ) : (
                                                <></>
                                            )
                                        }

                                    </div>
                                    {
                                        (items.bio !== null) && (
                                            <div>
                                                {lang === "en" ? <>Bio</> : <>Биография</>}
                                                <div className="mt-0.5">

                                                    {items.bio.split('\n').map((line, index) => (
                                                        <p key={index}>{line}</p>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    }

                                </div>
                            </div>
                        </div>
                    ) : (


                        // <p>loading</p>
                        <div className="users_data_adaptive">
                            <div>
                                <svg className="w-[150px] h-[150px] text-76 dark:text-76" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                                </svg>


                            </div>
                            <div className="users_data_MainBlock_adaptive">
                                <div className="flex flex-row w-full gap-6 items-center mt-0.5">

                                    <div className="h-10 bg-76 rounded dark:bg-76 w-64"></div>

                                    <div className="flex flex-row w-full  items-center gap-2">


                                        <div
                                            className="  w-fit h-8 px-2.5 flex text-sm text-center items-center text-white bg-[#027DFA] rounded hover:bg-[#006AFF] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <p>{lang === "en" ? <>Hire</> : <>Нанять</>}</p>

                                        </div>


                                        <div
                                            className="button_settings_style" style={{
                                            height: 32,
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: "42px"
                                        }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                 viewBox="0 0 24 24" className="fill-76 w-[18px] h-[18px]">
                                                <path
                                                    d="M20 4H4C2.88 4 2 4.88 2 6V18C2 19.12 2.88 20 4 20H20C21.12 20 22 19.12 22 18V6C22 4.88 21.12 4 20 4ZM20 8L12 12.96L4 8V6L12 10.96L20 6V8Z"></path>
                                            </svg>

                                        </div>


                                        <button type="button"
                                                className="modal_buttons fill-red-500 text-red-500 "
                                                title="Report user">
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

                                    </div>
                                </div>
                                <div className="flex flex-col items-start justify-start w-full ">
                                    <div className="h-48 bg-76 rounded  w-80 my-4"></div>


                                </div>
                            </div>
                        </div>
                        )
                }
            </div>

            <ToggleBD lang={lang} id={id}/>


        </>
    )
}