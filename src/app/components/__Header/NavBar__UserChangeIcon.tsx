'use client'
import {usePathname} from 'next/navigation'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/globalRedux/store";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {fetchAuthMe} from "@/app/globalRedux/users/asyncActions";
import {logout} from "@/app/globalRedux/users/slice";
import {Locale} from "@/i18n.config";
import {fetchAllPosts} from "@/app/globalRedux/posts/asyncActions";

export default function NavBar__UserChangeIcon({lang}:{lang:Locale})  {

        // const {NavBar} = await getDictionary(lang);


    // const isAuth = useSelector((state:RootState) => Boolean(state.users.data))
    const {data, api_url} = useSelector((state: RootState) => (state.users))
    // const [isAuth, setIsAuth] = useState(false);
    const [menu, setMenu] = useState(false);
    // const [token, setToken] = useState(null);
    const dispatch = useDispatch<AppDispatch>();
        const pathname = usePathname();
    useEffect(() => {
        const token = localStorage.getItem('token');

        // console.log("token", token);
        // console.log("data", data);
        if (token && data !== null) {
            // setIsAuth(true);

            // You can also dispatch an action to set the user data here
            // dispatch(setUserData(token));
        } else if(token){

            dispatch(fetchAuthMe());
            // setIsAuth(true);

        }
        else {
            // setIsAuth(false);
        }
    }, []);
    let userIconOrLogin;
    if (data === null) {
        // console.log(isAuth)
        // console.log("data",data)
        // console.log("posts",posts)
        userIconOrLogin = <li className="navBar_mobile_display_none"><Link href={`/${lang}/login`}>
            {
                pathname.startsWith("/ru") ?(
                    <>
                    Войти
                    </>
                ) : (
                    <>
                    Login
                    </>
                )
        }

        </Link></li>;
    } else if (data !== null) {
        // console.log("lang",lang)
        userIconOrLogin = <>
            <button id="dropdownUserAvatarButton" data-dropdown-toggle="dropdownAvatar"
                    className="flex mr-2 text-sm bg-gray-800 rounded-full  focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    type="button" onClick={() => setMenu(!menu)}>
                <img className="rounded-full w-8 h-8" src={`${api_url}/${data.avatarurl}`} alt="user photo"/>
            </button>
            {
                menu ? (
                    <div id="dropdownAvatar"
                         className="user_menu_adaptive dropdown_main_div ">
                        <ul className="dropdown_main_div_ul" aria-labelledby="dropdownUserAvatarButton">
                            <li>
                                <Link href={`/${lang}/${data._id}`}
                                   className="user_dropdown_a dropdown_main_a_bg-trans">
                                    {
                                        lang === "en" ? <>View profile</> : <>Профиль</>
                                    }
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/account`}
                                   className="user_dropdown_a dropdown_main_a_bg-trans">
                                    {
                                        lang === "en" ? <>Settings</> : <>Настройки</>
                                    }
                                </Link>
                            </li>
                            <li>
                                <Link href={`/${lang}/account/download_history`}
                                   className="user_dropdown_a dropdown_main_a_bg-trans">
                                    {
                                        lang === "en" ? <>Downloading history</> : <>История скачивания</>
                                    }
                                </Link>
                            </li>
                        </ul>
                        <div className="text-sm">
                            <Link href={`/${lang}`} onClick={() => {
                                dispatch(logout())
                                dispatch(fetchAllPosts({
                                    searchtext: "",
                                    posttype: 'photos',
                                    page: 0,
                                    role_id: 0,
                                    category: "ban",
                                    orientation: null,
                                    license: null,
                                    limit: null,
                                    sort: null,
                                }))
                            }}
                               className="user_dropdown_a pl-4 rounded-b-md text-[#767676]  dark:hover:text-red-500 hover:text-red-500">
                                {
                                    lang === "en" ? <>Sign out</> : <>Выйти</>
                                } {data.fullname}
                            </Link>
                        </div>
                    </div>
                ) : (
                    <></>
                )
            }


        </>;
        // console.log("data",data)
        // console.log("posts",posts)
        // console.log(isAuth)
    }

    return (
        <>
            {userIconOrLogin}
        </>

    )


}