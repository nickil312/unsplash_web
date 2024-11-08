'use client'
import React, {useEffect, useState} from "react";
import ThemeSwitch from "@/app/components/ThemeSwitch";
import Link from "next/link";
import {usePathname, useSearchParams} from "next/navigation";
import {i18n} from "@/i18n.config";
import {Accordion, AccordionItem} from "@nextui-org/react";
import {useSelector} from "react-redux";
import {RootState} from "@/app/globalRedux/store";

export default function Menu() {
    const [menu, setMenu] = useState(false);
    const [menuLanguage, setMenuLanguage] = useState(false);
    const [selectedmenuLanguage, setSelectedMenuLanguage] = useState(0);
    const {data, api_url} = useSelector((state: RootState) => (state.users))

    const pathname = usePathname()
    const searchParams = useSearchParams()
    const languagePrefix = pathname.split('/')[1]; // Extract language prefix from pathname
    const pathnameUrl = pathname.replace(/^\/(en|ru)\/?/, ''); // Remove language prefix from pathname
    // console.log("pathnameUrl",pathnameUrl)
    useEffect(() => {
        if (languagePrefix === 'ru') {
            setSelectedMenuLanguage(1);
        } else if (languagePrefix === 'en') {
            setSelectedMenuLanguage(0);
        }
    }, [languagePrefix]);

    const handleClick = (index: number, item: { value: string }) => {
        const newSearchParams = new URLSearchParams(searchParams); // Create a new URLSearchParams object
        const newUrl = `/${item.value}/${pathnameUrl}?${newSearchParams.toString()}`; // Include search parameters in the new URL
        setSelectedMenuLanguage(index);
        // Navigate to the new URL
        window.location.href = newUrl;
    };


    return (
        <>
            <button role="button" aria-haspopup="true" aria-expanded="true" type="button" onClick={() => setMenu(!menu)}
                    className="fill-[#767676] hover:fill-black dark:hover:fill-white" title="View more links">
                <svg className="CYXQR" width="24" height="24" viewBox="0 0 24 24" version="1.1"
                     aria-hidden="false">
                    <desc lang="en-US">navigation menu</desc>
                    <path d="M3 16h18v2H3v-2ZM3 6v2h18V6H3Zm0 7h18v-2H3v2Z"></path>
                </svg>
            </button>
            {
                menu ? (
                    //     <div id="dropdownAvatar"
                    // // w-80 w-44
                    // // -ml-[170px]
                    //          className="z-20 absolute  mt-[13.25rem] border-[#CECECE] dark:border-[#767676] border  bg-white dark:bg-black divide-y divide-gray-100 rounded-lg shadow dark:shadow-white   dark:divide-[#292929]">
                    //         <div className="flex flex-row justify-between items-center">
                    //
                    //
                    //             <ul className="py-2 text-sm text-[#767676] dark:text-gray-200"
                    //                 aria-labelledby="dropdownUserAvatarButton">
                    //                 <li>
                    //                     <a href="#"
                    //                        className="user_dropdown_a">Dashboard</a>
                    //                 </li>
                    //                 <li>
                    //                     <a href="#"
                    //                        className="user_dropdown_a">Settings</a>
                    //                 </li>
                    //                 <li>
                    //                     <a href="#"
                    //                        className="user_dropdown_a">Earnings</a>
                    //                 </li>
                    //             </ul>
                    //             <ul className="py-2 text-sm text-[#767676] dark:text-gray-200"
                    //                 aria-labelledby="dropdownUserAvatarButton">
                    //                 <li>
                    //                     <a href="#"
                    //                        className="user_dropdown_a">Dashboard</a>
                    //                 </li>
                    //                 <li>
                    //                     <a href="#"
                    //                        className="user_dropdown_a">Settings</a>
                    //                 </li>
                    //                 <li>
                    //                     <a href="#"
                    //                        className="user_dropdown_a">Earnings</a>
                    //                 </li>
                    //             </ul>
                    //             <ul className="py-2 text-sm text-[#767676] dark:text-gray-200"
                    //                 aria-labelledby="dropdownUserAvatarButton">
                    //                 <li>
                    //                     <a href="#"
                    //                        className="user_dropdown_a">Dashboard</a>
                    //                 </li>
                    //                 <li>
                    //                     <a href="#"
                    //                        className="user_dropdown_a">Settings</a>
                    //                 </li>
                    //                 <li>
                    //                     <a href="#"
                    //                        className="user_dropdown_a">Earnings</a>
                    //                 </li>
                    //             </ul>
                    //
                    //         </div>
                    //         <div className="text-sm">
                    //             <a href="#"
                    //                className="user_dropdown_a rounded-b-md text-[#767676]  dark:hover:text-red-500 hover:text-red-500">Sign
                    //                 out</a>
                    //         </div>
                    //     </div>
                    <div  className="z-20 relative   md:block md:w-auto" id="navbar-dropdown">

                        <div id="dropdownNavbar"
                             // style={{zIndex:"12"}}
                             className="menu_adaptive dropdown_main_div">
                            <div
                                className="flex flex-row justify-between  navBar_mobile_display_none pt-6 pl-6 pr-8 pb-8">
                                <ul className="dropdown_main_div_ul" aria-labelledby="dropdownLargeButton">
                                    <li className="flex flex-row items-center">
                                        <svg width="24" height="24" className="vMc4b" viewBox="0 0 24 24">
                                            <path opacity=".5" clip-rule="evenodd" fill-rule="evenodd"
                                                  d="M19 9h-2V7h2v2Zm0 4h-2v-2h2v2Zm0 4h-2v-2h2v2Zm-2 2v2h4c.55 0 1.021-.196 1.413-.587.391-.392.587-.863.587-1.413V5c0-.55-.196-1.021-.587-1.413A1.928 1.928 0 0 0 21 3h-9c-.55 0-1.02.192-1.412.575A1.856 1.856 0 0 0 10 4.95l2 1.45V5h9v14h-4Z"
                                                  fill="#111"></path>
                                            <path clip-rule="evenodd" fill-rule="evenodd"
                                                  d="M1 20v-7.975a1.947 1.947 0 0 1 .85-1.625l5-3.575c.35-.25.733-.375 1.15-.375.417 0 .8.125 1.15.375l5 3.575a1.94 1.94 0 0 1 .85 1.625V20c0 .283-.096.52-.287.712A.968.968 0 0 1 14 21H9v-5H7v5H2a.965.965 0 0 1-.712-.288A.965.965 0 0 1 1 20Zm4-1H3v-7l5-3.55L13 12v7h-2v-5H5v5Z"
                                                  fill="#111"></path>
                                        </svg>
                                        <p className="text-black dark:text-white px-4 font-semibold">{languagePrefix === "en" ? <>Company</> : <>Компания</>}</p>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="user_dropdown_a dropdown_main_a_bg-trans">{languagePrefix === "en" ? <>About</> : <>О
                                            нас</>}</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="user_dropdown_a dropdown_main_a_bg-trans">{languagePrefix === "en" ? <>History</> : <>История</>}</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="user_dropdown_a dropdown_main_a_bg-trans">{languagePrefix === "en" ? <>Contact
                                            us</> : <>Связаться</>}</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="user_dropdown_a dropdown_main_a_bg-trans">{languagePrefix === "en" ? <>Help
                                            Center</> : <>Центр помощи</>}</a>
                                    </li>
                                </ul>
                                <ul className="dropdown_main_div_ul" aria-labelledby="dropdownLargeButton">
                                    <li className="flex flex-row items-center">
                                        <svg width="24" height="24" className="vMc4b" viewBox="0 0 24 24"
                                             fill="none">
                                            <path opacity=".5" clip-rule="evenodd" fill-rule="evenodd"
                                                  d="M17 4v16c.55 0 1.021-.196 1.413-.587.391-.392.587-.863.587-1.413V6c0-.55-.196-1.02-.587-1.412A1.927 1.927 0 0 0 17 4Zm4 2v12c.417 0 .77-.146 1.062-.438.292-.291.438-.645.438-1.062v-9c0-.417-.146-.77-.438-1.062A1.444 1.444 0 0 0 21 6Z"
                                                  fill="#111"></path>
                                            <path clip-rule="evenodd" fill-rule="evenodd"
                                                  d="M4 22c-.55 0-1.02-.196-1.412-.587A1.927 1.927 0 0 1 2 20V4c0-.55.196-1.021.588-1.413A1.925 1.925 0 0 1 4 2h9c.55 0 1.021.196 1.413.587.391.392.587.863.587 1.413v16c0 .55-.196 1.021-.587 1.413A1.928 1.928 0 0 1 13 22H4Zm9-2H4V4h9v16Z"
                                                  fill="#111"></path>
                                        </svg>
                                        <p
                                            className="text-black dark:text-white px-4 font-semibold">{languagePrefix === "en" ? <>Product</> : <>Проект</>}</p>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="user_dropdown_a dropdown_main_a_bg-trans">{languagePrefix === "en" ? <>Developers/API</> : <>Разработчики/API</>}</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="user_dropdown_a dropdown_main_a_bg-trans">{languagePrefix === "en" ? <>Unsplash
                                            for iOS</> : <>Unsplash для iOS</>}</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="user_dropdown_a dropdown_main_a_bg-trans">{languagePrefix === "en" ? <>Project
                                            structure</> : <>Структ. проекта</>}</a>
                                    </li>
                                    {
                                        (data !== null && data.user_role_id === 1) && (

                                            <li>
                                                <Link href={`/${languagePrefix}/database`}
                                                   className="user_dropdown_a dropdown_main_a_bg-trans">{languagePrefix === "en" ? <>Database</> : <>База данных</>}</Link>
                                            </li>
                                        )
                                    }

                                </ul>
                                <ul className="dropdown_main_div_ul"
                                    aria-labelledby="dropdownLargeButton">
                                    <li className="flex flex-row items-center">
                                        <svg width="24" height="24" className="vMc4b" viewBox="0 0 24 24"
                                             fill="none">
                                            <path clip-rule="evenodd" fill-rule="evenodd"
                                                  d="M.288 21.712A.965.965 0 0 0 1 22h3.5v-1.6c0-.433.054-.842.162-1.225.109-.383.28-.742.513-1.075a6.122 6.122 0 0 0-.562-.075A7.09 7.09 0 0 0 4 18c-1.2 0-2.167.221-2.9.663-.733.441-1.1 1.029-1.1 1.762V21c0 .283.096.52.288.712Zm5.999 0c.192.192.43.288.713.288h10c.283 0 .52-.096.712-.288A.965.965 0 0 0 18 21v-.6c0-1.083-.55-1.963-1.65-2.638-1.1-.675-2.55-1.012-4.35-1.012-1.783 0-3.229.337-4.337 1.012C6.554 18.437 6 19.317 6 20.4v.6c0 .283.096.52.287.712ZM19.5 20.4V22H23c.283 0 .52-.096.712-.288A.965.965 0 0 0 24 21v-.575c0-.733-.367-1.32-1.1-1.762-.733-.442-1.7-.663-2.9-.663-.217 0-.42.008-.612.025s-.38.042-.563.075c.217.333.383.692.5 1.075.117.383.175.792.175 1.225ZM9.45 19.137c.75-.258 1.6-.387 2.55-.387.95 0 1.796.125 2.538.375.741.25 1.187.542 1.337.875h-7.75c.133-.317.575-.604 1.325-.863Zm-6.862-2.724C2.979 16.804 3.45 17 4 17c.55 0 1.02-.196 1.412-.587C5.804 16.021 6 15.55 6 15s-.196-1.021-.588-1.413A1.925 1.925 0 0 0 4 13c-.55 0-1.02.196-1.412.587A1.927 1.927 0 0 0 2 15c0 .55.196 1.021.588 1.413Zm15.999 0c.392.391.863.587 1.413.587s1.021-.196 1.413-.587c.391-.392.587-.863.587-1.413s-.196-1.021-.587-1.413A1.928 1.928 0 0 0 20 13c-.55 0-1.021.196-1.413.587A1.928 1.928 0 0 0 18 15c0 .55.196 1.021.587 1.413Zm-8.712-1.288A2.893 2.893 0 0 0 12 16c.833 0 1.542-.292 2.125-.875A2.893 2.893 0 0 0 15 13c0-.833-.292-1.542-.875-2.125A2.893 2.893 0 0 0 12 10c-.833 0-1.542.292-2.125.875A2.893 2.893 0 0 0 9 13c0 .833.292 1.542.875 2.125Zm1.413-2.838A.967.967 0 0 1 12 12a.97.97 0 0 1 .713.287A.97.97 0 0 1 13 13c0 .283-.096.52-.287.712A.968.968 0 0 1 12 14a.965.965 0 0 1-.712-.288A.965.965 0 0 1 11 13c0-.283.096-.521.288-.713Z"
                                                  fill="#111"></path>
                                            <path
                                                d="M6.6 3c1.05 0 2.05.22 3 .662A6.803 6.803 0 0 1 12 5.5a6.803 6.803 0 0 1 2.4-1.838 7.037 7.037 0 0 1 3-.662c1.867 0 3.433.633 4.7 1.9C23.367 6.167 24 7.733 24 9.6c0 .633-.083 1.258-.25 1.875a9.786 9.786 0 0 1-.7 1.825 4.1 4.1 0 0 0-.65-.85 2.92 2.92 0 0 0-.875-.6c.15-.383.267-.758.35-1.125.083-.367.125-.742.125-1.125 0-1.3-.442-2.392-1.325-3.275S18.7 5 17.4 5c-1.35 0-2.387.37-3.112 1.112A60.128 60.128 0 0 0 12 8.6a48.097 48.097 0 0 0-2.287-2.5C8.988 5.367 7.95 5 6.6 5c-1.3 0-2.392.442-3.275 1.325S2 8.3 2 9.6c0 .383.042.758.125 1.125.083.367.2.742.35 1.125a2.92 2.92 0 0 0-.875.6 4.1 4.1 0 0 0-.65.85c-.3-.6-.533-1.208-.7-1.825A7.156 7.156 0 0 1 0 9.6c0-1.867.633-3.433 1.9-4.7C3.167 3.633 4.733 3 6.6 3Z"
                                                fill="#111" opacity=".5"></path>
                                        </svg>
                                        <p
                                            className="text-black dark:text-white px-4 font-semibold">{languagePrefix === "en" ? <>Community</> : <>Сообщество</>}</p>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="user_dropdown_a dropdown_main_a_bg-trans">{languagePrefix === "en" ? <>Users</> : <>Пользователи</>}</a>
                                    </li>

                                    <li>
                                        <a href="#"
                                           className="user_dropdown_a dropdown_main_a_bg-trans">{languagePrefix === "en" ? <>Photos</> : <>Фото</>}</a>
                                    </li>
                                    <li>
                                        <a href="#"
                                           className="user_dropdown_a dropdown_main_a_bg-trans">{languagePrefix === "en" ? <>Collections</> : <>Коллекции</>}</a>
                                    </li>
                                    {
                                        data !== null && data.user_role_id === 2 && (

                                            <li>
                                                <Link href={`/${languagePrefix}/banned`}
                                                   className="user_dropdown_a dropdown_main_a_bg-trans">{languagePrefix === "en" ? <>Banned
                                                    posts</> : <>Заблок. посты</>}</Link>
                                            </li>
                                        )
                                    }
                                    {
                                        data !== null && (data.user_role_id === 1 || data.user_role_id === 3)  && (

                                            <li>
                                                <Link href={`/${languagePrefix}/banned`}
                                                      className="user_dropdown_a dropdown_main_a_bg-trans">{languagePrefix === "en" ? <>Banned/Reported</> : <>Заблок./Жалобы</>}</Link>
                                            </li>
                                        )
                                    }

                                </ul>
                            </div>
                            <div className="pc_display_none">


                                <Accordion selectionMode="multiple">
                                    <AccordionItem
                                        className="menu_adaptive_buttonSize"
                                        key="1"
                                        startContent={
                                            <div className="dropdown_main_div_ul">

                                                <svg width="24" height="24" className="vMc4b" viewBox="0 0 24 24">
                                                    <path opacity=".5" clip-rule="evenodd" fill-rule="evenodd"
                                                          d="M19 9h-2V7h2v2Zm0 4h-2v-2h2v2Zm0 4h-2v-2h2v2Zm-2 2v2h4c.55 0 1.021-.196 1.413-.587.391-.392.587-.863.587-1.413V5c0-.55-.196-1.021-.587-1.413A1.928 1.928 0 0 0 21 3h-9c-.55 0-1.02.192-1.412.575A1.856 1.856 0 0 0 10 4.95l2 1.45V5h9v14h-4Z"
                                                          fill="#111"></path>
                                                    <path clip-rule="evenodd" fill-rule="evenodd"
                                                          d="M1 20v-7.975a1.947 1.947 0 0 1 .85-1.625l5-3.575c.35-.25.733-.375 1.15-.375.417 0 .8.125 1.15.375l5 3.575a1.94 1.94 0 0 1 .85 1.625V20c0 .283-.096.52-.287.712A.968.968 0 0 1 14 21H9v-5H7v5H2a.965.965 0 0 1-.712-.288A.965.965 0 0 1 1 20Zm4-1H3v-7l5-3.55L13 12v7h-2v-5H5v5Z"
                                                          fill="#111"></path>
                                                </svg>
                                            </div>
                                        }
                                        // subtitle="4 unread messages"
                                        title={<p
                                            className="text-black dark:text-white text-sm  font-semibold">{languagePrefix === "en" ? <>Company</> : <>Компания</>}</p>}
                                    >
                                        {/*{defaultContent}*/}
                                        <ul className="dropdown_main_div_ul " aria-labelledby="dropdownLargeButton">
                                            <li>
                                                <Link href="#"
                                                      className="user_dropdown_a dropdown_main_a_bg-trans">{languagePrefix === "en" ? <>About</> : <>О
                                                    нас</>}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#"
                                                      className="user_dropdown_a dropdown_main_a_bg-trans">{languagePrefix === "en" ? <>History</> : <>История</>}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#"
                                                      className="user_dropdown_a dropdown_main_a_bg-trans">{languagePrefix === "en" ? <>Contact
                                                    us</> : <>Связаться</>}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#"
                                                      className="user_dropdown_a dropdown_main_a_bg-trans">{languagePrefix === "en" ? <>Help
                                                    Center</> : <>Центр помощи</>}
                                                </Link>
                                            </li>
                                        </ul>
                                    </AccordionItem>
                                    <AccordionItem
                                        className=" menu_adaptive_buttonSize"
                                        key="2"
                                        startContent={
                                            <div className="dropdown_main_div_ul">

                                                <svg width="24" height="24" className="vMc4b" viewBox="0 0 24 24"
                                                     fill="none">
                                                    <path opacity=".5" clip-rule="evenodd" fill-rule="evenodd"
                                                          d="M17 4v16c.55 0 1.021-.196 1.413-.587.391-.392.587-.863.587-1.413V6c0-.55-.196-1.02-.587-1.412A1.927 1.927 0 0 0 17 4Zm4 2v12c.417 0 .77-.146 1.062-.438.292-.291.438-.645.438-1.062v-9c0-.417-.146-.77-.438-1.062A1.444 1.444 0 0 0 21 6Z"
                                                          fill="#111"></path>
                                                    <path clip-rule="evenodd" fill-rule="evenodd"
                                                          d="M4 22c-.55 0-1.02-.196-1.412-.587A1.927 1.927 0 0 1 2 20V4c0-.55.196-1.021.588-1.413A1.925 1.925 0 0 1 4 2h9c.55 0 1.021.196 1.413.587.391.392.587.863.587 1.413v16c0 .55-.196 1.021-.587 1.413A1.928 1.928 0 0 1 13 22H4Zm9-2H4V4h9v16Z"
                                                          fill="#111"></path>
                                                </svg>
                                            </div>
                                        }
                                        title={<p
                                            className="text-black dark:text-white text-sm  font-semibold">{languagePrefix === "en" ? <>Product</> : <>Проект</>}
                                        </p>}
                                    >
                                        <ul className="dropdown_main_div_ul" aria-labelledby="dropdownLargeButton">

                                            <li>
                                                <Link href="#"
                                                      className="user_dropdown_a dropdown_main_a_bg-trans">{languagePrefix === "en" ? <>Developers/API</> : <>Разработчики/API</>}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#"
                                                      className="user_dropdown_a dropdown_main_a_bg-trans">{languagePrefix === "en" ? <>Unsplash
                                                    for iOS</> : <>Unsplash для iOS</>}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#"
                                                      className="user_dropdown_a dropdown_main_a_bg-trans">{languagePrefix === "en" ? <>Project
                                                    structure</> : <>Структура проекта</>}
                                                </Link>
                                            </li>
                                            {
                                                (data !== null && data.user_role_id === 1) && (

                                                    <li>
                                                        <Link href={`/${languagePrefix}/database`}
                                                           className="user_dropdown_a dropdown_main_a_bg-trans">{languagePrefix === "en" ? <>Database</> : <>База данных</>}</Link>
                                                    </li>
                                                )
                                            }

                                        </ul>
                                    </AccordionItem>
                                    <AccordionItem
                                        className=" menu_adaptive_buttonSize"
                                        key="3"
                                        startContent={
                                            <div className="dropdown_main_div_ul">

                                                <svg width="24" height="24" className="vMc4b" viewBox="0 0 24 24"
                                                     fill="none">
                                                    <path clip-rule="evenodd" fill-rule="evenodd"
                                                          d="M.288 21.712A.965.965 0 0 0 1 22h3.5v-1.6c0-.433.054-.842.162-1.225.109-.383.28-.742.513-1.075a6.122 6.122 0 0 0-.562-.075A7.09 7.09 0 0 0 4 18c-1.2 0-2.167.221-2.9.663-.733.441-1.1 1.029-1.1 1.762V21c0 .283.096.52.288.712Zm5.999 0c.192.192.43.288.713.288h10c.283 0 .52-.096.712-.288A.965.965 0 0 0 18 21v-.6c0-1.083-.55-1.963-1.65-2.638-1.1-.675-2.55-1.012-4.35-1.012-1.783 0-3.229.337-4.337 1.012C6.554 18.437 6 19.317 6 20.4v.6c0 .283.096.52.287.712ZM19.5 20.4V22H23c.283 0 .52-.096.712-.288A.965.965 0 0 0 24 21v-.575c0-.733-.367-1.32-1.1-1.762-.733-.442-1.7-.663-2.9-.663-.217 0-.42.008-.612.025s-.38.042-.563.075c.217.333.383.692.5 1.075.117.383.175.792.175 1.225ZM9.45 19.137c.75-.258 1.6-.387 2.55-.387.95 0 1.796.125 2.538.375.741.25 1.187.542 1.337.875h-7.75c.133-.317.575-.604 1.325-.863Zm-6.862-2.724C2.979 16.804 3.45 17 4 17c.55 0 1.02-.196 1.412-.587C5.804 16.021 6 15.55 6 15s-.196-1.021-.588-1.413A1.925 1.925 0 0 0 4 13c-.55 0-1.02.196-1.412.587A1.927 1.927 0 0 0 2 15c0 .55.196 1.021.588 1.413Zm15.999 0c.392.391.863.587 1.413.587s1.021-.196 1.413-.587c.391-.392.587-.863.587-1.413s-.196-1.021-.587-1.413A1.928 1.928 0 0 0 20 13c-.55 0-1.021.196-1.413.587A1.928 1.928 0 0 0 18 15c0 .55.196 1.021.587 1.413Zm-8.712-1.288A2.893 2.893 0 0 0 12 16c.833 0 1.542-.292 2.125-.875A2.893 2.893 0 0 0 15 13c0-.833-.292-1.542-.875-2.125A2.893 2.893 0 0 0 12 10c-.833 0-1.542.292-2.125.875A2.893 2.893 0 0 0 9 13c0 .833.292 1.542.875 2.125Zm1.413-2.838A.967.967 0 0 1 12 12a.97.97 0 0 1 .713.287A.97.97 0 0 1 13 13c0 .283-.096.52-.287.712A.968.968 0 0 1 12 14a.965.965 0 0 1-.712-.288A.965.965 0 0 1 11 13c0-.283.096-.521.288-.713Z"
                                                          fill="#111"></path>
                                                    <path
                                                        d="M6.6 3c1.05 0 2.05.22 3 .662A6.803 6.803 0 0 1 12 5.5a6.803 6.803 0 0 1 2.4-1.838 7.037 7.037 0 0 1 3-.662c1.867 0 3.433.633 4.7 1.9C23.367 6.167 24 7.733 24 9.6c0 .633-.083 1.258-.25 1.875a9.786 9.786 0 0 1-.7 1.825 4.1 4.1 0 0 0-.65-.85 2.92 2.92 0 0 0-.875-.6c.15-.383.267-.758.35-1.125.083-.367.125-.742.125-1.125 0-1.3-.442-2.392-1.325-3.275S18.7 5 17.4 5c-1.35 0-2.387.37-3.112 1.112A60.128 60.128 0 0 0 12 8.6a48.097 48.097 0 0 0-2.287-2.5C8.988 5.367 7.95 5 6.6 5c-1.3 0-2.392.442-3.275 1.325S2 8.3 2 9.6c0 .383.042.758.125 1.125.083.367.2.742.35 1.125a2.92 2.92 0 0 0-.875.6 4.1 4.1 0 0 0-.65.85c-.3-.6-.533-1.208-.7-1.825A7.156 7.156 0 0 1 0 9.6c0-1.867.633-3.433 1.9-4.7C3.167 3.633 4.733 3 6.6 3Z"
                                                        fill="#111" opacity=".5"></path>
                                                </svg>
                                            </div>
                                        }
                                        title={<p
                                            className="text-black dark:text-white text-sm  font-semibold">{languagePrefix === "en" ? <>Community</> : <>Сообщество</>}
                                        </p>}
                                    >
                                        <ul className="dropdown_main_div_ul" aria-labelledby="dropdownLargeButton">

                                            <li>
                                                <Link href="#"
                                                      className="user_dropdown_a dropdown_main_a_bg-trans">{languagePrefix === "en" ? <>Users</> : <>Пользователи</>}
                                                </Link>
                                            </li>

                                            <li>
                                                <Link href="#"
                                                      className="user_dropdown_a dropdown_main_a_bg-trans">{languagePrefix === "en" ? <>Photos</> : <>Фото</>}
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="#"
                                                      className="user_dropdown_a dropdown_main_a_bg-trans">{languagePrefix === "en" ? <>Collections</> : <>Коллекции</>}
                                                </Link>
                                            </li>
                                            {
                                                data !== null && data.user_role_id === 2 && (

                                                    <li>
                                                        <Link href={`/${languagePrefix}/banned`}
                                                              className="user_dropdown_a dropdown_main_a_bg-trans">{languagePrefix === "en" ? <>Banned
                                                            posts</> : <>Заблок. посты</>}
                                                        </Link>
                                                    </li>
                                                )
                                            }
                                            {
                                                data !== null &&(data.user_role_id === 1 || data.user_role_id === 3) && (

                                                    <li>
                                                        <Link href={`/${languagePrefix}/banned`}
                                                              className="user_dropdown_a dropdown_main_a_bg-trans">{languagePrefix === "en" ? <>Banned/Reported</> : <>Заблок./Жалобы</>}</Link>
                                                    </li>
                                                )
                                            }

                                        </ul>
                                    </AccordionItem>
                                    <AccordionItem
                                        className=" menu_adaptive_buttonSize"
                                        key="4"
                                        startContent={
                                            <div className="dropdown_main_div_ul">

                                                <svg width="24" height="24" className="FIlrp" viewBox="0 0 24 24"
                                                     fill="none">
                                                    <path opacity=".5" clip-rule="evenodd" fill-rule="evenodd"
                                                          d="M15 18H9a.965.965 0 0 1-.712-.288A.965.965 0 0 1 8 17c0-.283.096-.52.288-.712A.965.965 0 0 1 9 16h6c.283 0 .521.096.713.288A.967.967 0 0 1 16 17c0 .283-.096.52-.287.712A.968.968 0 0 1 15 18Zm0-4H9a.965.965 0 0 1-.712-.288A.965.965 0 0 1 8 13c0-.283.096-.521.288-.713A.967.967 0 0 1 9 12h6a.97.97 0 0 1 .713.287A.97.97 0 0 1 16 13c0 .283-.096.52-.287.712A.968.968 0 0 1 15 14Z"
                                                          fill="#111"></path>
                                                    <path clip-rule="evenodd" fill-rule="evenodd"
                                                          d="M6 22c-.55 0-1.02-.196-1.412-.587A1.927 1.927 0 0 1 4 20V4c0-.55.196-1.021.588-1.413A1.925 1.925 0 0 1 6 2h7.175a1.978 1.978 0 0 1 1.4.575l4.85 4.85a1.978 1.978 0 0 1 .575 1.4V20c0 .55-.196 1.021-.587 1.413A1.928 1.928 0 0 1 18 22H6Zm7-18v4c0 .283.096.52.288.712A.965.965 0 0 0 14 9h4v11H6V4h7Z"
                                                          fill="#111"></path>
                                                </svg>
                                            </div>
                                        }
                                        title={<p
                                            className="text-black dark:text-white text-sm  font-semibold">{languagePrefix === "en" ? <>Legal</> : <>Права</>}</p>}
                                    >
                                        <ul className="dropdown_main_div_ul" aria-labelledby="dropdownLargeButton">

                                            <li>
                                                <Link href="#"
                                                      className="user_dropdown_a dropdown_main_a_bg-trans">{languagePrefix === "en" ? <>License</> : <>Лицензия</>}</Link>
                                            </li>

                                            <li>
                                                <Link href="#"
                                                      className="user_dropdown_a dropdown_main_a_bg-trans">{languagePrefix === "en" ? <>Privacy
                                                    Policy</> : <>Политика Конф.</>}</Link>
                                            </li>
                                        </ul>
                                    </AccordionItem>
                                    <AccordionItem
                                        className=" menu_adaptive_buttonSize"
                                        key="5"
                                        startContent={
                                            <div className="dropdown_main_div_ul">

                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M8 9.887c-.3-.408-.583-.854-.85-1.337a1.058 1.058 0 0 0-.4-.388A1.038 1.038 0 0 0 6.225 8c-.417 0-.708.133-.875.4-.167.267-.158.575.025.925.3.583.642 1.137 1.025 1.662.383.525.8 1.046 1.25 1.563L3.3 16.9a.948.948 0 0 0-.275.7c0 .283.092.517.275.7a.948.948 0 0 0 .7.275.948.948 0 0 0 .7-.275L9 14l3.1 3.1.75-2.05-2.4-2.45a16.134 16.134 0 0 0 2.225-3.15A18.153 18.153 0 0 0 14.1 6H16c.283 0 .52-.096.712-.287A.968.968 0 0 0 17 5a.968.968 0 0 0-.288-.713A.967.967 0 0 0 16 4h-6V3a.97.97 0 0 0-.287-.713A.97.97 0 0 0 9 2a.967.967 0 0 0-.712.287A.968.968 0 0 0 8 3v1H2a.967.967 0 0 0-.712.287A.968.968 0 0 0 1 5c0 .283.096.521.288.713A.967.967 0 0 0 2 6h10.1c-.333.95-.742 1.846-1.225 2.688A13.916 13.916 0 0 1 9.05 11.15c-.4-.433-.75-.854-1.05-1.263Z"
                                                        fill="#111111" fill-opacity="0.5" clip-rule="evenodd"
                                                        fill-rule="evenodd"></path>
                                                    <path
                                                        d="M13.35 22c-.4 0-.687-.129-.862-.387-.175-.259-.196-.58-.063-.963l3.65-9.675c.1-.267.288-.496.563-.688.275-.191.562-.287.862-.287.283 0 .567.096.85.287.283.192.475.421.575.688l3.65 9.675c.133.383.113.704-.062.963-.175.258-.471.387-.888.387a.795.795 0 0 1-.5-.175 1.006 1.006 0 0 1-.325-.425l-.85-2.45H15.1l-.875 2.45a.947.947 0 0 1-.35.425.901.901 0 0 1-.525.175Zm5.95-4.8h-3.6l1.75-4.95h.1l1.75 4.95Z"
                                                        fill="#111111" clip-rule="evenodd" fill-rule="evenodd"></path>
                                                </svg>
                                            </div>
                                        }
                                        title={<p
                                            className="text-black dark:text-white text-sm  font-semibold">{languagePrefix === "en" ? <>Language</> : <>Языки</>}</p>}
                                    >
                                        <ul className="dropdown_main_div_ul" aria-labelledby="dropdownLargeButton">
                                            {[
                                                {
                                                    label: 'English',
                                                    name: "", value: "en"
                                                },
                                                {
                                                    label: 'Русский',
                                                    name: "", value: "ru"
                                                },
                                            ].map((item, index) => (
                                                <li key={index}>
                                                    <div
                                                        role="link"
                                                        aria-disabled={index === selectedmenuLanguage ? 'false' : 'true'}
                                                        // href={item.href}
                                                        className={`block py-2 pr-4  dark:bg-black `}
                                                        // href={`/${item.value}/${pathnameUrl}`}
                                                        // onClick={() => setSelectedMenuLanguage(index)}
                                                        onClick={() => handleClick(index, item)}

                                                        // href='/'
                                                    >
                                                        <div className={`${
                                                            index === selectedmenuLanguage ? 'bd_select_page_sort_div_div_div_button_ul_div_active' : 'bd_select_page_sort_div_div_div_button_ul_div_diactive'
                                                        }`}>
                                                            <div className="mr-2">
                                                                <svg
                                                                    className="w-6 h-6 text-gray-500"
                                                                    viewBox="0 0 24 24"
                                                                    version="1.1"
                                                                    aria-hidden="false"
                                                                >
                                                                    <desc
                                                                        lang="en-US">{item.label}</desc>
                                                                    {index === selectedmenuLanguage ? (
                                                                        <path
                                                                            d="m10 17.4-5-5L6.4 11l3.6 3.6L17.6 7 19 8.4l-9 9Z"/>
                                                                    ) : (
                                                                        <path d=""/>
                                                                    )}
                                                                </svg>
                                                            </div>
                                                            <p className="flex-1 text-sm">{item.label}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}


                                        </ul>
                                    </AccordionItem>

                                </Accordion>
                                <div className="flex flex-wrap justify-center  items-center my-2 gap-2">
                                    <button type="button"
                                            className="modal_buttons fill-blue-500"
                                            title="Add this image to a collection"
                                        // onClick={() => router.push(`/${lang}/products/${id}/info`)}
                                    >
                                        <Link href={`/${languagePrefix}/photos/create`} className="ml-1 text-76">

                                            {languagePrefix === "en" ? <>Submit an image</> : <>Создать фото</>}

                                        </Link>
                                    </button>
                                    {
                                        data === null && (
                                            <>

                                                <button type="button"
                                                        className="modal_buttons fill-blue-500"
                                                        title="Add this image to a collection"
                                                    // onClick={() => router.push(`/${lang}/products/${id}/info`)}
                                                >
                                                    <Link href={`/${languagePrefix}/login`} className="ml-1 text-76">

                                                        {languagePrefix === "en" ? <>Log in</> : <>Войти</>}
                                                    </Link>
                                                </button>
                                                <button type="button"
                                                        className="modal_buttons fill-blue-500"
                                                        title="Add this image to a collection"
                                                    // onClick={() => router.push(`/${lang}/products/${id}/info`)}
                                                >
                                                    <Link href={`/${languagePrefix}/register`} className="ml-1 text-76">

                                                        {languagePrefix === "en" ? <>Sign up</> : <>Зарег.</>}

                                                    </Link>
                                                </button>
                                            </>
                                        )
                                    }

                                    <ThemeSwitch/>
                                </div>
                            </div>
                            <div className="py-1 px-6 flex items-center flex-row navBar_mobile_display_none">
                                <a href="#"
                                   className="user_dropdown_a rounded-b-md text-[#767676] text-sm  dropdown_main_a_bg-trans  dark:hover:text-white hover:text-black">{languagePrefix === "en" ? <>License</> : <>Лицензия</>}</a>
                                <a href="#"
                                   className="user_dropdown_a rounded-b-md text-[#767676] text-sm  dropdown_main_a_bg-trans  dark:hover:text-white hover:text-black">{languagePrefix === "en" ? <>Privacy
                                    Policy</> : <>Политика Конф.</>}</a>

                                <ThemeSwitch/>
                                {/*<a href="#"*/}
                                {/*   className="user_dropdown_a ml-auto rounded-b-md text-[#767676] text-sm  dropdown_main_a_bg-trans  dark:hover:text-white hover:text-black">*/}
                                {/*    English</a>*/}
                                <div className="ml-auto flex items-center gap-2 ">


                                    <svg className="w-4 h-4 fill-76 " width="24" height="24" viewBox="0 0 24 24"
                                         version="1.1"
                                         aria-hidden="false">
                                        <desc lang="en-US">Localization icon</desc>
                                        <path
                                            d="m12.87 15.07-2.54-2.51.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04ZM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12Zm-2.62 7 1.62-4.33L19.12 17h-3.24Z"></path>
                                    </svg>
                                    <button role="button" onClick={() => setMenuLanguage(!menuLanguage)}
                                            className=" language_button  rounded-b-md  text-sm  dropdown_main_a_bg-trans  dark:hover:text-white hover:text-black    "

                                            aria-haspopup="true" aria-expanded="false"
                                            type="button" title="Select your language">


                                        <span>
                            {selectedmenuLanguage === 0 ? (
                                <>
                                    English
                                </>
                            ) : null}
                                            {selectedmenuLanguage === 1 ? (
                                                <>
                                                    Русский
                                                </>
                                            ) : null}

                            </span>
                                    </button>
                                    {
                                        menuLanguage ? (
                                            <div id="dropdownAvatar"
                                                 className="z-20 absolute mt-[-17.75rem]  w-20  ">
                                                <div role="menu">
                                                    <div
                                                        className="absolute   transform translate-x-1140 translate-y-47">
                                                        <div className="transition duration-200 ease-in-out">
                                                            <div
                                                                className="bg-white  shadow dark:shadow-[0_2px_4px_rgba(255,255,255,0.2)]">
                                                                <section aria-label="Orientation">
                                                                    <div role="group"
                                                                         aria-labelledby="dropdown-menu-section:rs:">
                                                                        <ul className="bd_select_page_sort_div_div_div_button_ul ">
                                                                            {[
                                                                                {
                                                                                    label: 'English',
                                                                                    name: "", value: "en"
                                                                                },
                                                                                {
                                                                                    label: 'Русский',
                                                                                    name: "", value: "ru"
                                                                                },
                                                                            ].map((item, index) => (
                                                                                <li key={index}>
                                                                                    <div
                                                                                        role="link"
                                                                                        aria-disabled={index === selectedmenuLanguage ? 'false' : 'true'}
                                                                                        // href={item.href}
                                                                                        className={`block py-1 px-2  dark:bg-black `}
                                                                                        // href={`/${item.value}/${pathnameUrl}`}
                                                                                        // onClick={() => setSelectedMenuLanguage(index)}
                                                                                        onClick={() => handleClick(index, item)}

                                                                                        // href='/'
                                                                                    >
                                                                                        <div className={`${
                                                                                            index === selectedmenuLanguage ? 'bd_select_page_sort_div_div_div_button_ul_div_active' : 'bd_select_page_sort_div_div_div_button_ul_div_diactive'
                                                                                        }`}>
                                                                                            <div className="mr-2">
                                                                                                <svg
                                                                                                    className="w-6 h-6 text-gray-500"
                                                                                                    viewBox="0 0 24 24"
                                                                                                    version="1.1"
                                                                                                    aria-hidden="false"
                                                                                                >
                                                                                                    <desc
                                                                                                        lang="en-US">{item.label}</desc>
                                                                                                    {index === selectedmenuLanguage ? (
                                                                                                        <path
                                                                                                            d="m10 17.4-5-5L6.4 11l3.6 3.6L17.6 7 19 8.4l-9 9Z"/>
                                                                                                    ) : (
                                                                                                        <path d=""/>
                                                                                                    )}
                                                                                                </svg>
                                                                                            </div>
                                                                                            <p className="flex-1 text-sm">{item.label}</p>
                                                                                        </div>
                                                                                    </div>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                        {/*<ul className="bd_select_page_sort_div_div_div_button_ul">*/}

                                                                        {/*    <li>*/}
                                                                        {/*        <Link*/}
                                                                        {/*            role="link"*/}
                                                                        {/*            className={`block py-1 px-2  dark:bg-black`}*/}
                                                                        {/*            href="/en"*/}
                                                                        {/*        >*/}
                                                                        {/*            <div>*/}
                                                                        {/*                <svg*/}
                                                                        {/*                    className="w-6 h-6 text-gray-500"*/}
                                                                        {/*                    viewBox="0 0 24 24"*/}
                                                                        {/*                    version="1.1"*/}
                                                                        {/*                    aria-hidden="false"*/}
                                                                        {/*                >*/}
                                                                        {/*                    /!*<desc*!/*/}
                                                                        {/*                    /!*    lang="en-US">{item}</desc>*!/*/}
                                                                        {/*                    /!*{index === selectedmenuLanguage ? (*!/*/}
                                                                        {/*                    /!*    <path*!/*/}
                                                                        {/*                    /!*        d="m10 17.4-5-5L6.4 11l3.6 3.6L17.6 7 19 8.4l-9 9Z"/>*!/*/}
                                                                        {/*                    /!*) : (*!/*/}
                                                                        {/*                    /!*    <path d=""/>*!/*/}
                                                                        {/*                    /!*)}*!/*/}
                                                                        {/*                </svg>*/}
                                                                        {/*                <p className="flex-1 text-sm">en</p>*/}
                                                                        {/*            </div>*/}
                                                                        {/*        </Link>*/}
                                                                        {/*    </li>*/}
                                                                        {/*    <li>*/}
                                                                        {/*        <Link*/}
                                                                        {/*            role="link"*/}
                                                                        {/*            className={`block py-1 px-2  dark:bg-black`}*/}
                                                                        {/*            href="/ru"*/}
                                                                        {/*        >*/}
                                                                        {/*            <div>*/}
                                                                        {/*                <svg*/}
                                                                        {/*                    className="w-6 h-6 text-gray-500"*/}
                                                                        {/*                    viewBox="0 0 24 24"*/}
                                                                        {/*                    version="1.1"*/}
                                                                        {/*                    aria-hidden="false"*/}
                                                                        {/*                >*/}
                                                                        {/*                    /!*<desc*!/*/}
                                                                        {/*                    /!*    lang="en-US">{item}</desc>*!/*/}
                                                                        {/*                    /!*{index === selectedmenuLanguage ? (*!/*/}
                                                                        {/*                    /!*    <path*!/*/}
                                                                        {/*                    /!*        d="m10 17.4-5-5L6.4 11l3.6 3.6L17.6 7 19 8.4l-9 9Z"/>*!/*/}
                                                                        {/*                    /!*) : (*!/*/}
                                                                        {/*                    /!*    <path d=""/>*!/*/}
                                                                        {/*                    /!*)}*!/*/}
                                                                        {/*                </svg>*/}
                                                                        {/*                <p className="flex-1 text-sm">ru</p>*/}
                                                                        {/*            </div>*/}
                                                                        {/*        </Link>*/}
                                                                        {/*    </li>*/}
                                                                        {/*</ul>*/}
                                                                    </div>
                                                                </section>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                        ) : (
                                            <></>
                                        )
                                    }

                                </div>


                            </div>

                        </div>
                    </div>

                ) : (
                    <></>
                )
            }
        </>
    )
}