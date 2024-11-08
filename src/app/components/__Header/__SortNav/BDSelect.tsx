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

export default function BDSelect({lang}: { lang: Locale }) {
    const pathname = usePathname()
    const searchtext = pathname.split('/').pop(); // extract the username
    const words = pathname.split('/');
    const thirdWord = words[3];

    const {items, status} = useSelector((state: RootState) => state.posts.postsWithSearch);
    const {usersWithSearch} = useSelector((state: RootState) => state.users);
    const {collectionsWithSearch} = useSelector((state: RootState) => state.posts);

    // let photosClassName, illustrationsClassName, collectionsClassName, usersClassName;
    // if (pathname.startsWith('/en/s/photos/') || pathname.startsWith('/ru/s/photos/')) {
    //     photosClassName = 'bd_select_page_active';
    //     illustrationsClassName = 'bd_select_page_diactive';
    //     usersClassName = 'bd_select_page_diactive';
    //     collectionsClassName = 'bd_select_page_diactive';
    // } else if (pathname.startsWith('/en/s/illustrations/') || pathname.startsWith('/ru/s/illustrations/')) {
    //     photosClassName = 'bd_select_page_diactive';
    //     illustrationsClassName = 'bd_select_page_active';
    //     usersClassName = 'bd_select_page_diactive';
    //     collectionsClassName = 'bd_select_page_diactive';
    // } else if (pathname.startsWith('/en/s/collections/') || pathname.startsWith('/ru/s/collections/')) {
    //     photosClassName = 'bd_select_page_diactive';
    //     illustrationsClassName = 'bd_select_page_diactive';
    //     usersClassName = 'bd_select_page_diactive';
    //     collectionsClassName = 'bd_select_page_active';
    // } else if (pathname.startsWith('/en/s/users/') || pathname.startsWith('/ru/s/users/')) {
    //     photosClassName = 'bd_select_page_diactive';
    //     illustrationsClassName = 'bd_select_page_diactive';
    //     usersClassName = 'bd_select_page_active';
    //     collectionsClassName = 'bd_select_page_diactive';
    // }
    const dbSelect = [
        {
            id: 'photos',
            label: {en: 'Photos', ru: 'Фото'},
            href: `/${lang}/s/photos/${searchtext}`,
            icon: (
                <svg className="K8nmB" width="24" height="24" viewBox="0 0 24 24" version="1.1" aria-hidden="false">
                    <desc lang="en-US">A photo</desc>
                    <path
                        d="M20 3H4c-.6 0-1 .4-1 1v16c0 .6.4 1 1 1h16c.6 0 1-.4 1-1V4c0-.6-.4-1-1-1ZM5 18l3.5-4.5 2.5 3 3.5-4.5 4.5 6H5Z"></path>
                </svg>
            ),
        },
        {
            id: 'illustrations',
            label: {en: 'Illustrations', ru: 'Иллюстрации'},
            href: `/${lang}/s/illustrations/${searchtext}`,
            icon: (
                <svg className="K8nmB" width="24" height="24" viewBox="0 0 24 24" version="1.1" aria-hidden="false">
                    <desc lang="en-US">Pen Tool</desc>
                    <path
                        d="m16.184 2.953-2.12 2.124L18.83 9.84l2.12-2.12a2.13 2.13 0 0 0 0-3.013l-1.75-1.755a2.13 2.13 0 0 0-3.015 0Zm-3.06 2.904-.35.107-5.483 1.644a2.434 2.434 0 0 0-1.61 1.56L2.31 19.222c-.145.43-.039.91.277 1.233l5.846-5.841a1.826 1.826 0 1 1 .86.86l-5.846 5.845c.328.316.803.426 1.233.277l10.058-3.371a2.442 2.442 0 0 0 1.56-1.61l1.645-5.484.106-.35-4.924-4.924Z"></path>
                </svg>
            ),
        },
        {
            id: 'collections',
            label: {en: 'Collections', ru: 'Коллекции'},
            href: `/${lang}/s/collections/${searchtext}`,
            icon: (
                <svg className="K8nmB" width="24" height="24" viewBox="0 0 24 24" version="1.1" aria-hidden="false">
                    <desc lang="en-US">A stack of folders</desc>
                    <path
                        d="M14 4h7c1.1 0 2 .9 2 2v9c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2l.01-11c0-1.1.89-2 1.99-2h5l2 2ZM1 6h2v13h17v2H3c-1.1 0-2-.9-2-2V6Z"></path>
                </svg>
            ),
        },
        {
            id: 'users',
            label: {en: 'Users', ru: 'Пользователи'},
            href: `/${lang}/s/users/${searchtext}`,
            icon: (
                <svg className="K8nmB" width="24" height="24" viewBox="0 0 24 24" version="1.1" aria-hidden="false">
                    <desc lang="en-US">A group of people</desc>
                    <path
                        d="M23 17v3h-4v-3c0-1.7-1-2.9-2.3-3.9 2.7.4 6.3 1.7 6.3 3.9ZM9 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4Zm6 0c2.2 0 4-1.8 4-4s-1.8-4-4-4c-.5 0-.9.1-1.3.2C14.5 5.3 15 6.6 15 8s-.5 2.7-1.3 3.8c.4.1.8.2 1.3.2Zm-6 1c-2.7 0-8 1.3-8 4v3h16v-3c0-2.7-5.3-4-8-4Z"></path>
                </svg>
            ),
        },
    ];

    const [currentCategory, setCurrentCategory] = useState(thirdWord);

    useEffect(() => {
        const cat = localStorage.getItem('bdSelect');
        // setCurrentCategory(cat);
        // console.log("thirdWord",thirdWord)
        // console.log("cat",cat)
        // // const storedCategory = localStorage.getItem('currentCategory');
        // console.log("searchtext",searchtext);
        if(cat !== null && cat === thirdWord){
            //Метод при переходе
            // console.log(1)
            // console.log("thirdWord",thirdWord)
            // console.log("cat",cat)


            setCurrentCategory(cat);
            // localStorage.setItem('bdSelect', "photos");

        }
        // Метод если я открыл карточку с дет инфой чтобы показывало где я
        else if(cat !== null && cat !== thirdWord && thirdWord !== 'photos'
            && thirdWord !== 'illustrations' && thirdWord !== 'collections' && thirdWord !== 'users'){
            // console.log(3)
            // console.log("thirdWord",thirdWord)
            // console.log("cat",cat)
            setCurrentCategory(cat);

        }
        else {
            // Метод если я только загрузил страницу и нет данных в local
            // console.log(2)
            // console.log("thirdWord",thirdWord)
            // console.log("cat",cat)

            localStorage.setItem('bdSelect', thirdWord);
            setCurrentCategory(thirdWord);
        }
    }, [pathname]);

    const handleCategoryClick = (category: string) => {
        setCurrentCategory(category);
        localStorage.setItem('bdSelect', category);
    };


    return (
        // <div className="flex flex-col ">
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
                                        // <p>{usersWithSearch.items.photoCount === "" ? items.photoCount : usersWithSearch.items.photoCount}</p>
                                        <p>{usersWithSearch.items.photoCount !== "" ? usersWithSearch.items.photoCount :
                                            items.photoCount !== "" ? items.photoCount :
                                                collectionsWithSearch.items.photoCount}</p>
                                    ) : category.id === 'illustrations' ? (
                                        // <p>{usersWithSearch.items.illustrationCount === "" ? items.illustrationCount : usersWithSearch.items.illustrationCount}</p>
                                        <p>
                                            {usersWithSearch.items.illustrationCount !== "" ? usersWithSearch.items.illustrationCount :
                                                items.illustrationCount !== "" ? items.illustrationCount :
                                                    collectionsWithSearch.items.illustrationCount}
                                        </p>
                                    ) : category.id === 'collections' ? (
                                        // <p>{usersWithSearch.items.collectionsCount === "" ? items.collectionsCount : usersWithSearch.items.collectionsCount}</p>
                                        <p>
                                            {usersWithSearch.items.collectionsCount !== "" ? usersWithSearch.items.collectionsCount :
                                                items.collectionsCount !== "" ? items.collectionsCount :
                                                    collectionsWithSearch.items.collectionsCount}
                                        </p>
                                    ) : category.id === 'users' ? (
                                        // <p>{usersWithSearch.items.usersCount === "" ? items.usersCount : usersWithSearch.items.usersCount}</p>
                                        <p>
                                            {usersWithSearch.items.usersCount !== "" ? usersWithSearch.items.usersCount :
                                                items.usersCount !== "" ? items.usersCount :
                                                    collectionsWithSearch.items.usersCount}
                                        </p>
                                    ) : (
                                        <></>
                                    )
                                    }
                                </div>
                            </Link>
                        ))}

                    </div>
                </ScrollShadow>
                {/*<div className="navBar_mobile_display_none">*/}

                {/*<SortSelectBox lang={lang}/>*/}
                {/*</div>*/}
            </div>
        //     <SortSelectBox lang={lang}/>
        //
        // </div>


        // <div
        //     className="bd_select">
        //
        //     <Link href={`/${lang}/s/photos/${searchtext}`}>
        //
        //         <div className={photosClassName}>
        //             <svg className="K8nmB" width="24" height="24" viewBox="0 0 24 24" version="1.1" aria-hidden="false">
        //                 <desc lang="en-US">A photo</desc>
        //                 <path
        //                     d="M20 3H4c-.6 0-1 .4-1 1v16c0 .6.4 1 1 1h16c.6 0 1-.4 1-1V4c0-.6-.4-1-1-1ZM5 18l3.5-4.5 2.5 3 3.5-4.5 4.5 6H5Z"></path>
        //             </svg>
        //             <p>{lang === "en" ? <>Photos</> : <>Фото</>}</p>
        //
        //             {/*<p> Photos</p>*/}
        //             <p>{usersWithSearch.items.photoCount === "" ? items.photoCount : usersWithSearch.items.photoCount}</p>
        //
        //
        //         </div>
        //     </Link>
        //     <Link href={`/${lang}/s/illustrations/${searchtext}`}>
        //
        //         <div className={illustrationsClassName}>
        //             <svg className="K8nmB" width="24" height="24" viewBox="0 0 24 24" version="1.1" aria-hidden="false">
        //                 <desc lang="en-US">Pen Tool</desc>
        //                 <path
        //                     d="m16.184 2.953-2.12 2.124L18.83 9.84l2.12-2.12a2.13 2.13 0 0 0 0-3.013l-1.75-1.755a2.13 2.13 0 0 0-3.015 0Zm-3.06 2.904-.35.107-5.483 1.644a2.434 2.434 0 0 0-1.61 1.56L2.31 19.222c-.145.43-.039.91.277 1.233l5.846-5.841a1.826 1.826 0 1 1 .86.86l-5.846 5.845c.328.316.803.426 1.233.277l10.058-3.371a2.442 2.442 0 0 0 1.56-1.61l1.645-5.484.106-.35-4.924-4.924Z"></path>
        //             </svg>
        //
        //             <p>{lang === "en" ? <>Illustrations</> : <>Иллюстрации</>}</p>
        //             {/*<p>Illustrations</p>*/}
        //             <p>{usersWithSearch.items.illustrationCount === "" ? items.illustrationCount : usersWithSearch.items.illustrationCount}</p>
        //
        //         </div>
        //     </Link>
        //     <Link href={`/${lang}/s/collections/${searchtext}`}>
        //
        //         <div className={collectionsClassName}>
        //             <svg className="K8nmB" width="24" height="24" viewBox="0 0 24 24" version="1.1" aria-hidden="false">
        //                 <desc lang="en-US">A stack of folders</desc>
        //                 <path
        //                     d="M14 4h7c1.1 0 2 .9 2 2v9c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2l.01-11c0-1.1.89-2 1.99-2h5l2 2ZM1 6h2v13h17v2H3c-1.1 0-2-.9-2-2V6Z"></path>
        //             </svg>
        //
        //             {/*<p> Collections</p>*/}
        //             <p>{lang === "en" ? <>Collections</> : <>Коллекции</>}</p>
        //
        //             <p>0</p>
        //
        //         </div>
        //     </Link>
        //     <Link href={`/${lang}/s/users/${searchtext}`}>
        //
        //         <div className={usersClassName}>
        //             <svg className="K8nmB" width="24" height="24" viewBox="0 0 24 24" version="1.1" aria-hidden="false">
        //                 <desc lang="en-US">A group of people</desc>
        //                 <path
        //                     d="M23 17v3h-4v-3c0-1.7-1-2.9-2.3-3.9 2.7.4 6.3 1.7 6.3 3.9ZM9 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4Zm6 0c2.2 0 4-1.8 4-4s-1.8-4-4-4c-.5 0-.9.1-1.3.2C14.5 5.3 15 6.6 15 8s-.5 2.7-1.3 3.8c.4.1.8.2 1.3.2Zm-6 1c-2.7 0-8 1.3-8 4v3h16v-3c0-2.7-5.3-4-8-4Z"></path>
        //             </svg>
        //             <p>{lang === "en" ? <>Users</> : <>Пользователи</>}</p>
        //
        //             {/*<p>Users</p>*/}
        //             <p>{usersWithSearch.items.usersCount === "" ? items.usersCount : usersWithSearch.items.usersCount}</p>
        //
        //         </div>
        //     </Link>
        //     <SortSelectBox lang={lang}/>
        //
        // </div>
        // {/*<div className="ml-auto">*/}
        //
        // {/*    */}
        // {/*</div>*/}
        // {/*</div>*/}
    )
}