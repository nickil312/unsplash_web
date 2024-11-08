'use client'
import {usePathname} from "next/navigation";
import Link from "next/link";

export default function Nav(){
    const pathname = usePathname()
    const lang = pathname.split('/')[1] as "en" | "ru";
    const page_end = pathname.split('/').pop(); // extract the username
    // console.log(page_end)
    const accountSet = [
        {
            id: 'account',
            label: { en: 'Edit profile', ru: 'Изменить профиль' },
            href: `/${lang}/account`,
        },
        {
            id: 'hiring',
            label: { en: 'Hiring', ru: 'Найм' },
            href: `/${lang}/account/hiring`,
        },
        {
            id: 'download_history',
            label: { en: 'Download history', ru: 'История скачивания' },
            href: `/${lang}/account/download_history`,
        },
        {
            id: 'change_password',
            label: { en: 'Change password', ru: 'Изменить пароль' },
            href: `/${lang}/account/change_password`,
        },
        {
            id: 'applications',
            label: { en: 'Applications', ru: 'Приложения' },
            href: `/${lang}/account/applications`,
        },
        {
            id: 'close_account',
            label: { en: 'Delete account', ru: 'Удалить аккаунт' },
            href: `/${lang}/account/close_account`,
        }
    ];

    return (
        <>
            <p className="mb-7 settings_Title_adaptive">{lang === "en" ? <>Account Settings</> : <>Настройки аккаунта</>}</p>
        <ul>
            {accountSet.map((item) => (
                <li key={item.id} className="mb-4">
                    <Link href={item.href}
                          className={page_end === item.id ? 'settings_links_active' : 'settings_links_diactive'}>{lang === 'en' ? item.label.en : item.label.ru}</Link>
                </li>
            ))}
        </ul>
        </>
    )
}