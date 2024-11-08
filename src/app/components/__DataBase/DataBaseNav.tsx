'use client'
import {usePathname} from "next/navigation";
import Link from "next/link";

export default function DataBaseNav(){
    const pathname = usePathname()
    const lang = pathname.split('/')[1] as "en" | "ru";
    const page_end = pathname.split('/').pop(); // extract the username
    // console.log(page_end)
    const accountSet = [
        {
            id: 'database',
            label: { en: 'Users', ru: 'Пользователи' },
            href: `/${lang}/database`,
        },
        {
            id: 'roles',
            label: { en: 'Roles', ru: 'Роли' },
            href: `/${lang}/database/roles`,
        },
        {
            id: 'posts',
            label: { en: 'Posts', ru: 'Посты' },
            href: `/${lang}/database/posts`,
        },
        {
            id: 'reports',
            label: { en: 'Reports', ru: 'Жалобы' },
            href: `/${lang}/database/reports`,
        },
        {
            id: 'likes&views',
            label: { en: 'Likes/Views', ru: 'Лайки/Просмоты' },
            href: `/${lang}/database/likes&views`,
        },
        {
            id: 'allcollections',
            label: { en: 'Collections', ru: 'Коллекции' },
            href: `/${lang}/database/allcollections`,
        },
        {
            id: 'collectionsposts',
            label: { en: 'Posts and Collections', ru: 'Записи и Коллекции' },
            href: `/${lang}/database/collectionsposts`,
        },
        {
            id: 'logs',
            label: { en: 'Logs', ru: 'Логи' },
            href: `/${lang}/database/logs`,
        }
    ];

    return (
        <>
            <p className="mb-7  settings_Title_adaptive">{lang === "en" ? <>Database tables</> : <>Таблицы базы данных</>}</p>
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