'use client'
import Link from "next/link";
import React from "react";
import {usePathname} from "next/navigation";
import {useSelector} from "react-redux";
import {RootState} from "@/app/globalRedux/store";

export default function Banned_Nav() {
    const pathname = usePathname()
    const lang = pathname.split('/')[1];
    const page_end = pathname.split('/').pop(); // extract the username
    const {data, api_url} = useSelector((state: RootState) => (state.users))

    const accountSet = [
        {
            id: 'banned',
            label: {en: 'Banned', ru: 'Заблокированные'},
            href: `/${lang}/banned`,
        },
        {
            id: 'report',
            label: {en: 'Report', ru: 'Жалобы'},
            href: `/${lang}/banned/report`,
        },
        // {
        //     id: 'download_history',
        //     label: { en: 'Download history', ru: 'История скачивания' },
        //     href: `/${lang}/account/download_history`,
        // },
        // {
        //     id: 'change_password',
        //     label: { en: 'Change password', ru: 'Изменить пароль' },
        //     href: `/${lang}/account/change_password`,
        // },
        // {
        //     id: 'applications',
        //     label: { en: 'Applications', ru: 'Приложения' },
        //     href: `/${lang}/account/applications`,
        // },
        // {
        //     id: 'close_account',
        //     label: { en: 'Delete account', ru: 'Удалить аккаунт' },
        //     href: `/${lang}/account/close_account`,
        // }
    ];

    return (
        <>

            {
                data !== null && (data.user_role_id === 1 || data.user_role_id === 3) ? (

                    <div className="md:ml-52 pl-3">
                        <p className="mb-7 settings_Title_adaptive">{lang === "en" ? <>Account Settings</> : <>Настройки
                            аккаунта</>}</p>
                        <ul>
                            {accountSet.map((item) => (
                                <li key={item.id} className="mb-4">
                                    <Link href={item.href}
                                          className={page_end === item.id ? 'settings_links_active' : 'settings_links_diactive'}>{lang === 'en' ? item.label.en : item.label.ru}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <></>
                )
            }
        </>

    )
}