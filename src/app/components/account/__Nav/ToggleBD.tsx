'use client'
import SortSelectBox from "@/app/components/__Header/__SortNav/SortSelectBox";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {useSelector} from "react-redux";
import {RootState} from "@/app/globalRedux/store";
import {Status} from "@/app/globalRedux/posts/types";
import {Locale} from "@/i18n.config";
import {useEffect, useState} from "react";
import {ScrollShadow} from "@nextui-org/react";

export default function ToggleBD({lang, id}: { lang: string, id: string }) {
    const pathname = usePathname()
    const searchtext = pathname.split('/').pop(); // extract the username
    const words = pathname.split('/');
    const thirdWord = words[3];

    const {items, status} = useSelector((state: RootState) => state.posts.posts_another_user);
    // const {usersWithSearch} = useSelector((state: RootState) => state.users);


    const dbSelect = [
        {
            id: 'photos',
            label: {en: 'Photos', ru: 'Фото'},
            href: `/${lang}/${id}`,
            icon: (
                <svg className="K8nmB" width="24" height="24" viewBox="0 0 24 24" version="1.1" aria-hidden="false">
                    <desc lang="en-US">A photo</desc>
                    <path
                        d="M20 3H4c-.6 0-1 .4-1 1v16c0 .6.4 1 1 1h16c.6 0 1-.4 1-1V4c0-.6-.4-1-1-1ZM5 18l3.5-4.5 2.5 3 3.5-4.5 4.5 6H5Z"></path>
                </svg>
            ),
        },
        {
            id: 'likes',
            label: {en: 'Likes', ru: 'Нравится'},
            href: `/${lang}/${id}/likes`,
            icon: (

                <svg className="K8nmB" width="24" height="24" viewBox="0 0 24 24" version="1.1" aria-hidden="false">
                    <desc lang="en-US">A heart</desc>
                    <path
                        d="M21.424 4.594c-2.101-2.125-5.603-2.125-7.804 0l-1.601 1.619-1.601-1.62c-2.101-2.124-5.603-2.124-7.804 0-2.202 2.126-2.102 5.668 0 7.894L12.019 22l9.405-9.513a5.73 5.73 0 0 0 0-7.893Z">

                    </path>
                </svg>
            ),
        },
        {
            id: 'collections',
            label: {en: 'Collections', ru: 'Коллекции'},
            href: `/${lang}/${id}/collections`,
            icon: (
                <svg className="K8nmB" width="24" height="24" viewBox="0 0 24 24" version="1.1" aria-hidden="false">
                    <desc lang="en-US">A stack of folders</desc>
                    <path
                        d="M14 4h7c1.1 0 2 .9 2 2v9c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2l.01-11c0-1.1.89-2 1.99-2h5l2 2ZM1 6h2v13h17v2H3c-1.1 0-2-.9-2-2V6Z"></path>
                </svg>
            ),
        }
    ];

    const [currentCategory, setCurrentCategory] = useState(thirdWord);

    useEffect(() => {
        const cat = localStorage.getItem('toogleBD');
        // setCurrentCategory(cat);
        // console.log("thirdWord1",thirdWord)
        // console.log("cat",cat)
        // // const storedCategory = localStorage.getItem('currentCategory');
        // console.log("searchtext",searchtext);
        if (cat !== null && cat === thirdWord) {
            //Метод при переходе
            // console.log(1)
            // console.log("thirdWord",thirdWord)
            // console.log("cat",cat)


            setCurrentCategory(cat);
            // localStorage.setItem('bdSelect', "photos");

        }
        // Метод если я открыл карточку с дет инфой чтобы показывало где я
        else if (cat !== null && cat !== thirdWord && thirdWord !== undefined
            && thirdWord !== 'likes' && thirdWord !== 'collections') {
            // && thirdWord !== 'photos'

            // console.log(3)
            // console.log("thirdWord",thirdWord)
            // console.log("cat",cat)
            setCurrentCategory(cat);

        } else {
            // Метод если я только загрузил страницу и нет данных в local
            // console.log(2)
            // console.log("thirdWord",thirdWord)
            // console.log("cat",cat)
            if (thirdWord === undefined) {
                localStorage.setItem('toogleBD', 'photos');
                setCurrentCategory('photos');

            } else {


                localStorage.setItem('toogleBD', thirdWord);
                setCurrentCategory(thirdWord);
            }
        }
    }, [pathname]);

    const handleCategoryClick = (category: string) => {
        setCurrentCategory(category);
        localStorage.setItem('toogleBD', category);
    };


    return (
        <div className="user_nav_styles ">
            <div className="px-5 py-0 ">
                {/*flex flex-row items-center justify-between*/}
                <ScrollShadow offset={3} orientation="horizontal" hideScrollBar={true}
                              className="max-w-full max-h-[80px] p-0 flex-nowrap">

                    <div className="bd_select">
                        {dbSelect.map((category) => (
                            <Link key={category.id} href={category.href}>
                                <div
                                    className={currentCategory === category.id ? 'bd_select_page_active' : 'bd_select_page_diactive'}
                                    onClick={() => handleCategoryClick(category.id)}
                                >
                                    {category.icon}
                                    <p>{lang === "en" ? category.label.en : category.label.ru}</p>
                                    {category.id === 'photos' ? (
                                        // <p>photos</p>
                                        <p>{items.photoCount === "" ? items.photoCount : items.photoCount}</p>
                                    ) : category.id === 'likes' ? (
                                        // <p>likes</p>
                                        <p>{items.likesCount === "" ? items.likesCount : items.likesCount}</p>
                                    ) : category.id === 'collections' ? (
                                        <p>{items.collectionsCount === "" ? items.collectionsCount : items.collectionsCount}</p>
                                    ) : (
                                        <></>
                                    )
                                    }
                                </div>
                            </Link>
                        ))}

                    </div>
                </ScrollShadow>

            </div>
        </div>
    )
}