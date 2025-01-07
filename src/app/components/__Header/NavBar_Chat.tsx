'use client'
import Link from "next/link";
import Image from "next/image";
import SearchBar from "@/app/components/__Header/SearchBar";
import BDSelect from "@/app/components/__Header/__SortNav/BDSelect";
import BottomBar from "@/app/components/BottomBar";
import NavBar__BottomChange from "@/app/components/__Header/NavBar__BottomChange";
import Logo from "@/app/components/Logo";
import ThemeSwitch from "@/app/components/ThemeSwitch";
import React from "react";
import NavBar__UserChangeIcon from "@/app/components/__Header/NavBar__UserChangeIcon";
import Menu from "@/app/components/__Header/Menu";
import {Locale} from "@/i18n.config";
import {getDictionary} from "@/lib/dictionary";
import {usePathname} from "next/navigation";
import CategotiesSelect from "@/app/components/__Header/__SortNav/CategotiesSelect";
import NavBar_Chat_bottom from "@/app/components/Chat/NavBar___Chat_bottom";
import {Modal, ModalBody, ModalContent} from "@nextui-org/modal";
import ChatDetailModal from "@/app/components/Chat/modal/ChatDetailModal";
import {router} from "next/client";
import NavBarAllChats_bottom from "@/app/components/Chat/NavBar__AllChats_bottom";


export default  function NavBar_Chat() {
    // const {NavBar} = await getDictionary(language);
    // console.log("lang",lang)
    const pathname = usePathname()
    const lang = pathname.split('/')[1] as "en" | "ru";

    return (
        <nav>
            {/*<h1>Unsplash</h1>*/}
            {/*<Link href="/">Главная страница </Link>*/}
            {/*<Link href="/photos">Главная 2</Link>*/}
            <header>
                <div>
                    <nav>
                        <Link href={`/${lang}`}>
                            <Logo/>
                        </Link>


                        <SearchBar lang={lang} />

                        <ul>
                            <li className="navBar_mobile_display_none">
                                <Link href={`/${lang}/chats`}>
                                    {/*Explore*/}
                                    {lang === "en" ? <>Chats</> : <>Чаты</>}
                                </Link>
                            </li>
                            <div className="bg-[#d1d1d1] h-12 w-px mr-6 navBar_mobile_display_none"></div>
                            <li className="navBar_mobile_display_none">
                                <Link href={`/${lang}/photos/create`}>{lang === "en" ? <>Submit an image</> : <>Создать фото</>}</Link>
                            </li>

                            <NavBar__UserChangeIcon lang={lang} />

                            <Menu/>

                        </ul>
                        {/*<ThemeSwitch/>*/}


                    </nav>
                </div>
                {
                    pathname === `/${lang}/chats` ? (
                        <NavBarAllChats_bottom lang={lang}/>
                    ) : (

                <NavBar_Chat_bottom/>
                    )
                }
                {/*<BDSelect lang={lang}/>*/}
                {/*<CategotiesSelect lang={lang}/>*/}
                {/*<BottomBar/>*/}
                {/*<NavBar__BottomChange lang={lang}/>*/}
                {/*Тут будет выдор категории*/}
            </header>
        </nav>
    )
}