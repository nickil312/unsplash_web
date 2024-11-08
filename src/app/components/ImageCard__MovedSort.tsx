import SortSelectBox from "@/app/components/__Header/__SortNav/SortSelectBox";
import React, {useEffect} from "react";
import {Locale} from "@/i18n.config";
import {image, ScrollShadow} from "@nextui-org/react";
import Link from "next/link";
import {DownloadImage} from "@/app/components/Products/func/DownloadImage";
import {usePathname} from "next/navigation";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/globalRedux/store";
import {fetchGetPopularUsers} from "@/app/globalRedux/users/asyncActions";
import {Status} from "@/app/globalRedux/posts/types";

export default function ImageCardMovedSort({lang, api_url}: { lang: string, api_url: string }) {
    // console.log(api_url)
    const pathname = usePathname()
    const searchtext = pathname.split('/').pop(); // extract the username
    const {data} = useSelector((state: RootState) => (state.users))
    const {items, status} = useSelector((state: RootState) => (state.users.popular_users))
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        if (searchtext !== undefined) {
            const filterValue = searchtext;
            console.log("filterValue", filterValue)
            if (searchtext === 'en' || searchtext === 'ru') {
                // @ts-ignore
                dispatch(fetchGetPopularUsers(filterValue))

            } else {

                // @ts-ignore
                dispatch(fetchGetPopularUsers(filterValue))
            }
        }
    }, []);
    const categories = [
        {
            id: 'photos',
            label: {en: 'Photos', ru: 'Фото'},
            text: {
                en: 'Explore the best and latest illustrations & vectors on Unsplash.',
                ru: 'Познакомьтесь с лучшими и новейшими иллюстрациями и векторами на Unsplash.'
            },
            image: `${api_url}/uploads/down/Figueroa Unsplash.jpg`

        },
        {
            id: 'illustrations',
            label: {en: 'Illustrations', ru: 'Иллюстрации'},
            text: {
                en: 'Explore the best and latest illustrations & vectors on Unsplash.',
                ru: 'Познакомьтесь с лучшими и новейшими иллюстрациями и векторами на Unsplash.'
            },

            image: `${api_url}/uploads/down/Pinterest.jpeg`

        },
        {
            id: 'unsplash_plus',
            label: {en: 'Unsplash+', ru: 'Unsplash+'},
            text: {
                en: 'Incredible photographs and illustrations from photographers with Unsplash.',
                ru: 'Невероятные фотографии и иллюстрации от фотографов с Unsplash.'
            },
            image: `${api_url}/uploads/down/La RentreÌe Sept 2019.jpeg`

        },
        {
            id: 'wallpapers',
            label: {en: 'Wallpapers', ru: 'Обои'},
            text: {
                en: 'From epic drone shots to inspiring moments in nature — submit your best desktop and mobile backgrounds.',
                ru: 'От эпичных снимков с дрона до вдохновляющих моментов на природе — присылайте свои лучшие фоны для рабочего стола и мобильных устройств.'
            },
            image: `${api_url}/uploads/down/tamas-tokos-3O3R0g3Ab4s-unsplash.jpg`

        },
        {
            id: 'nature',
            label: {en: 'Nature', ru: 'Природа'},
            text: {
                en: 'Photographers capture breathtaking landscapes, diverse flora & fauna, and mesmerizing natural phenomena, immersing you in the great outdoors.',
                ru: 'Фотографы запечатлевают захватывающие дух пейзажи, разнообразную флору и фауну, а также завораживающие природные явления, погружая вас в атмосферу дикой природы.'
            },
            image: `${api_url}/uploads/down/ran-liwen-LuReuFfgwfU-unsplash.jpg`

        },
        {
            id: '3d_renders',
            label: {en: '3D Renders', ru: '3D Рендеры'},
            text: {
                en: 'Showcasing digitally rendered creations that blur reality and imagination, from architectural visualizations to fantastical worlds, highlighting digital craftsmanship.',
                ru: 'Демонстрация созданных с помощью цифровой обработки творений, в которых реальность и воображение сливаются воедино: от архитектурных визуализаций до фантастических миров, подчеркивающих цифровое мастерство.'
            },

            image: `${api_url}/uploads/down/963D80C3-26E5-42B6-8CBB-5D0D86957E0E.jpg`

        },
        {
            id: 'cars',
            label: {en: 'Cars', ru: 'Машины'},
            text: {
                en: 'Collections of various cars from collectible to durable and tuned ones.',
                ru: 'Коллекции различных машин от коллекционных до прочных и тюнингованных.'
            },
            image: `${api_url}/uploads/down/8D9B7F92-2218-4DE9-86C4-2C4C4DF0CA98.jpg`

        },
        {
            id: 'minimalism',
            label: {en: 'Minimalism', ru: 'Минимализм'},
            text: {en: 'Photos with minimalist style.', ru: 'Фотографии с стилем минимализм.'},
            image: `${api_url}/uploads/down/9D63D81F-D35F-473F-94EC-78E61FA5485A.jpg`

        },
        {
            id: 'monochromatic',
            label: {en: 'Monochromatic', ru: 'Монохромные'},
            text: {en: 'Monochrome photographs.', ru: 'Монохромные фотографии.'},
            image: `${api_url}/uploads/down/B9A98C91-ED62-48EF-B546-DA68A8240766.jpg`

        },
        {
            id: 'street_photography',
            label: {en: 'Street Photography', ru: 'Уличная фотография'},
            text: {
                en: 'From quiet passages in charming towns to the hustle and bustle of cities, this category examines street photography in every form.',
                ru: 'От тихих улочек очаровательных городков до суеты больших городов — в этой категории рассматривается уличная фотография во всех ее проявлениях.'
            },

            image: `${api_url}/uploads/down/Figueroa Unsplash.jpg`
        },
        {
            id: 'textures_and_patterns',
            label: {en: 'Textures & Patterns', ru: 'Текстуры & Паттерны'},
            text: {
                en: 'Whether you’re looking for stunning macro-photography or shots of complex architectural shapes — you’ve come to the right place.',
                ru: 'Если вы ищете потрясающие макрофотографии или снимки сложных архитектурных форм — вы попали по адресу.'
            },
            image: `${api_url}/uploads/down/9D3B7563-C248-45F8-9B42-C216086C87C9.jpg`

        }, {
            id: 'animals',
            label: { en: 'Animals', ru: 'Животные' },
            text: {
                en: 'Capturing the beauty, behaviour and diversity of animals, this category celebrates the wonders of the animal kingdom.',
                ru: 'Эта категория, отражающая красоту, поведение и разнообразие животных, прославляет чудеса животного мира.'
            },

            image: `${api_url}/uploads/down/Figueroa Unsplash.jpg`

        },  {
            id: 'food',
            label: { en: 'Food', ru: 'Еда' },
            text: {
                en: 'Food and drink take center stage in this category, where photographers transform meals and beverages into captivating works of art.',
                ru: 'Еда и напитки занимают центральное место в этой категории, где фотографы превращают блюда и напитки в захватывающие произведения искусства.'
            },

            image: `${api_url}/uploads/down/Figueroa Unsplash.jpg`

        }, {
            id: 'tech',
            label: { en: 'Tech', ru: 'Технологии' },
            text: {
                en: 'Фотографии современных технологий',
                ru: 'Photos of modern technologies'
            },

            image: `${api_url}/uploads/down/Figueroa Unsplash.jpg`

        },{
            id: 'shoes',
            label: { en: 'Shoes', ru: 'Обувь' },
            text: {
                en: 'This gallery contains various photographs of shoes and famous collaborations',
                ru: 'В этом каздели разные фотографии обуви и известных коллабораций'
            },

            image: `${api_url}/uploads/down/Figueroa Unsplash.jpg`

        },
        {
            id: 'people',
            label: { en: 'People', ru: 'Люди' },
            text: {
                en: 'In this category, photographers capture emotions, cultures, and stories through candid moments and formal portraits.',
                ru: 'В этой категории фотографы запечатлевают эмоции, культуры и истории с помощью искренних моментов и официальных портретов.'
            },

            image: `${api_url}/uploads/down/Figueroa Unsplash.jpg`

        },
    ];
    // console.log(searchtext);

    return (
        <>
            {/*mx-16*/}
            {
                searchtext === 'en' || searchtext === "ru" ? (
                        <div className="mb-4 w-full flex flex-row justify-center ">


                            <section
                                className="flex flex-col w-64  gap-5 p-5 justify-between border border-E0 dark:border-76 rounded-lg ">

                                <div className="gap-2 flex flex-wrap h-fit">
                                    <a className="border border-E0 dark:border-76   text  px-2  rounded w-fit h-fit "
                                       href={`/${lang}/s/photos/anime`}>{lang === "en" ? <>Anime</> : <>Аниме</>}</a>
                                    <a className="border border-E0 dark:border-76  text  px-2 rounded w-fit h-fit"
                                       href={`/${lang}/s/photos/gaming`}>{lang === "en" ? <>Gaming</> : <>Игровое</>}</a>
                                    <a className="border border-E0 dark:border-76 text  px-2 rounded w-fit h-fit"
                                       href={`/${lang}/s/photos/fastfood`}>{lang === "en" ? <>Fastfood</> : <>Фастфуд</>}</a>
                                    <a className="border border-E0 dark:border-76 text  px-2 rounded w-fit h-fit"
                                       href={`/${lang}/s/photos/film-camera`}>{lang === "en" ? <>Film
                                        camera</> : <>Кинокамера</>}</a>
                                    <a className="border border-E0 dark:border-76 text  px-2 rounded w-fit h-fit"
                                       href={`/${lang}/s/photos/japan`}>{lang === "en" ? <>Japan</> : <>Япония</>}</a>
                                    <a className="border border-E0 dark:border-76 text  px-2 rounded w-fit h-fit"
                                       href={`${lang}/s/photos/sport-car`}>{lang === "en" ? <>Sport car</> : <>Спортивная
                                        машина</>}</a>
                                    <a className="border border-E0 dark:border-76 text  px-2 rounded w-fit h-fit"
                                       href={`/${lang}/s/photos/porsche`}>{lang === "en" ? <>Porsche</> : <>Porsche</>}</a>
                                    <a className="border border-E0 dark:border-76 text  px-2 rounded w-fit h-fit"
                                       href={`/${lang}/s/photos/3d-render`}>{lang === "en" ? <>3D Render</> : <>3D
                                        Рендеры</>}</a>

                                </div>

                                <div className="flex flex-row h-fit mt-auto ">
                                    <svg width="24" className="mr-1 fill-black dark:fill-white" height="24"
                                         viewBox="0 0 24 24"
                                         version="1.1" aria-hidden="false">
                                        <desc lang="en-US">A trend sign</desc>
                                        <path
                                            d="m16 6 2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6Z"></path>
                                    </svg>
                                    <span><p>{lang === "en" ? <>Trending searches</> : <>Трендовые поиски</>}</p></span>
                                </div>

                            </section>
                            <div
                                className=" border border-E0 dark:border-76  ml-2 rounded-lg p-5 h-[306px] w-[306px] navBar_mobile_display_none ">
                                <p className="font-semibold  ">{lang === "en" ? <>Top contributors</> : <>Лучшие
                                    участники</>}</p>

                                {
                                    status === Status.LOADING ? (
                                        <>
                                            {[...Array(4)].map((_, index) => (
                                                <div className="flex items-center animate-pulse flex-row mt-5">
                                                    <svg className="w-10 h-10 mr-2  text-76"
                                                         aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                         fill="currentColor"
                                                         viewBox="0 0 20 20">
                                                        <path
                                                            d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                                                    </svg>
                                                    <div className="flex flex-col">
                                                        <div className="h-4 bg-76 rounded-full  w-32 mb-2"></div>
                                                        <div className="h-2.5 bg-76 rounded-full  w-36 mb-2"></div>

                                                    </div>
                                                </div>
                                            ))}
                                        </>

                                    ) : (
                                        items !== null && items.map((item) => (
                                            <Link href={`/${lang}/${item._id}`} className="flex items-center flex-row mt-5">
                                                <img
                                                    width={36}
                                                    alt={`${api_url}/${item.avatarurl}`}
                                                    src={`${api_url}/${item.avatarurl}`}
                                                    className="rounded-full object-cover w-10 h-10 mr-2"
                                                />
                                                <div className="flex flex-col">
                                                    <p className="font-semibold">{item.fullname}</p>
                                                    <p className="opacity-80 text-xs">
                                                        {item.hirevalue && (lang === "en" ? <>Available for
                                                            hire</> : <>Доступен для найма</>)}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))
                                    )
                                }


                            </div>
                            {

                                status === Status.LOADING ? (
                                    <>
                                        <div
                                            className=" ml-2 animate-pulse  rounded-lg bg-76 flex items-center justify-center  h-[306px] w-[306px] navBar_mobile_display_none ">
                                            <svg className="rounded-lg text-gray-200 w-10 h-10 "
                                                 aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                 fill="currentColor" viewBox="0 0 16 20">
                                                <path
                                                    d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
                                                <path
                                                    d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
                                            </svg>
                                        </div>
                                    </>
                                ) : (
                                    items !== null && items.length > 0 && (

                                        <div
                                            className=" ml-2 relative  rounded-lg  h-[306px] w-[306px] navBar_mobile_display_none  ">
                                            {
                                                items[0] && items[0].most_popular_image_url && (
                                                <img
                                                className="rounded-lg object-cover h-[306px] w-[306px] hover:brightness-95 transition duration-300 ease-in-out"
                                                src={`${api_url}/${items[0].most_popular_image_url}`} alt=""/>
                                    )
                            }

                            <p className="absolute bottom-11 ml-4 text-white text-xs">{lang === "en" ? <>Featured</> : <>Избранное</>}</p>
                            <p className="absolute bottom-5 ml-4 text-white">{items[0].fullname}</p>
                                        </div>
                                    )
                                )
                            }
                            {/*w-[400px]*/}
                            <Link href="/plus"
                                  className="flex flex-row h-[306px]  mx-2 w-auto  border border-E0  dark:border-76 rounded-lg navBar_mobile_display_none middle_display_none">
                                <div className="flex items-start flex-col w-[231px]  py-5 pl-5 gap-4">

                                    <svg className="shrink-0" width="32" height="32" viewBox="0 0 24 24" version="1.1"
                                         aria-hidden="false">
                                        <desc lang="en-US">Plus sign for Unsplash+</desc>
                                        <path
                                            d="M11.281 8.3H8.156V3.125L11.281 1v7.3Zm.316 4.05H4.955V7.868L1.5 10.636v4.55h6.656V22h4.713l3.552-2.84h-4.824v-6.81Zm4.24 0v2.835h4.587l2.911-2.834h-7.497Z"></path>
                                    </svg>
                                    <h3 className="flex flex-col items-start font-bold text-lg">{lang === "en" ? <>Unlock
                                        everything</> : <>Разблокируйте все,</>}
                                        <p className="xLL4X">{lang === "en" ? <>Unsplash+ has to offer.</> : <>что может
                                            предложить Unsplash+.</>}</p>
                                        <p className="xLL4X">{lang === "en" ? <>Cancel anytime.</> : <>Отменить в любое
                                            время.</>}</p>
                                    </h3>
                                    <div className='modal_buttons bg-black hover:bg-2A mt-auto'>
                                        {/*style={{height:"fit-content"}}*/}
                                        <p className="text-white">{lang === "en" ? <>Upgrade
                                            to <strong>Unsplash+</strong></> : <>Обновитесь
                                            до <strong>Unsplash+</strong></>}</p>
                                    </div>

                                </div>
                                <div className="w-64 h-[305px]">

                                    <img alt="image" className=" h-[304px] py-1 px-1 rounded-r-lg  w-64 object-cover"
                                         src={`${api_url}/uploads/down/Tomas Malik Unsplash.jpg`}/>
                                </div>

                            </Link>

                        </div>
                    ) :
                    // @ts-ignore
                    categories.filter(category => searchtext.includes(category.id)).map(category => (
                        <div className="flex flex-row justify-center gap-6 ">

                            <div key={category.id} className=" w-[636px] mb-8  mt-auto mx-2">
                                <p className="text-4xl font-bold ">{lang === "en" ? category.label.en : category.label.ru}</p>
                                <p className="text-76">{lang === "en" ? <>Curated by Unsplash</> : <>Подготовлено
                                    Unsplash</>}</p>
                                <p className="mt-4">{lang === "en" ? category.text.en : category.text.ru}</p>
                            </div>
                            <div
                                className=" border border-E0  dark:border-76  rounded-lg p-5 h-[306px] w-[306px] navBar_mobile_display_none ">
                                <p className="font-semibold  ">{lang === "en" ? <>Top contributors</> : <>Лучшие
                                    участники</>}</p>

                                {
                                    status === Status.LOADING ? (
                                        <>
                                            {[...Array(4)].map((_, index) => (
                                                <div className="flex items-center animate-pulse flex-row mt-5">
                                                    <svg className="w-10 h-10 mr-2  text-76"
                                                         aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                         fill="currentColor"
                                                         viewBox="0 0 20 20">
                                                        <path
                                                            d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                                                    </svg>
                                                    <div className="flex flex-col">
                                                        <div className="h-4 bg-76 rounded-full  w-32 mb-2"></div>
                                                        <div className="h-2.5 bg-76 rounded-full  w-36 mb-2"></div>

                                                    </div>
                                                </div>
                                            ))}
                                        </>

                                    ) : (
                                        items !== null && items.map((item) => (
                                            <Link href={`/${lang}/${item._id}`} className="flex items-center flex-row mt-5">
                                                <img
                                                    width={36}
                                                    alt={`${api_url}/${item.avatarurl}`}
                                                    src={`${api_url}/${item.avatarurl}`}
                                                    className="rounded-full object-cover w-10 h-10 mr-2"
                                                />
                                                <div className="flex flex-col">
                                                    <p className="font-semibold">{item.fullname}</p>
                                                    <p className="opacity-80 text-xs">
                                                        {item.hirevalue && (lang === "en" ? <>Available for
                                                            hire</> : <>Доступен
                                                            для
                                                            найма</>)}
                                                    </p>
                                                </div>
                                            </Link>
                                        )))
                                }


                            </div>
                            {
                                status === Status.LOADING ? (
                                    <>
                                        <div
                                            className=" mr-2  animate-pulse  rounded-lg bg-76 flex items-center justify-center  h-[306px] w-[306px] navBar_mobile_display_none ">
                                            <svg className="rounded-lg text-gray-200 w-10 h-10 "
                                                 aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                 fill="currentColor" viewBox="0 0 16 20">
                                                <path
                                                    d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/>
                                                <path
                                                    d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/>
                                            </svg>
                                        </div>
                                    </>
                                ) : (
                                    items !== null && items.length > 0 && (

                                        <div
                                            className=" relative mr-2  rounded-lg  h-[306px] w-[306px] navBar_mobile_display_none ">
                                            {
                                                items[0] && items[0].most_popular_image_url && (
                                                    <img
                                                        className="rounded-lg object-cover h-[306px] w-[306px] hover:brightness-95 transition duration-300 ease-in-out"
                                                        src={`${api_url}/${items[0].most_popular_image_url}`} alt=""/>
                                                )
                                            }
                                            <p className="absolute bottom-11 ml-4 text-white text-xs">{lang === "en" ? <>Featured</> : <>Избранное</>}</p>
                                            <p className="absolute bottom-5 ml-4 text-white">{items[0].fullname}</p>
                                        </div>
                                    ))
                            }
                        </div>
                    ))
            }


            <div className="floating_sort_select_box">
                {/*className="sticky top-40"*/}
                <SortSelectBox lang={lang}/>
            </div>
        </>
    )
}