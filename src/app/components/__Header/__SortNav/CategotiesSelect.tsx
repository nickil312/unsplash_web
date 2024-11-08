'use client'
import Link from "next/link";
import SortSelectBox from "@/app/components/__Header/__SortNav/SortSelectBox";
import {usePathname} from "next/navigation";
import {Locale} from "@/i18n.config";
import {getDictionary} from "@/lib/dictionary";
import {useEffect, useState} from "react";
import { ScrollShadow } from "@nextui-org/react";

export default function CategotiesSelect({lang}: { lang: Locale }) {
    const pathname = usePathname()
    const searchtext = pathname.split('/').pop(); // extract the username

    const [currentCategory, setCurrentCategory] = useState("");
    useEffect(() => {
        const storedCategory = localStorage.getItem('currentCategory');
        console.log("searchtext",searchtext);
        if(searchtext === "en" || searchtext === "ru"){
            setCurrentCategory("photos");
            localStorage.setItem('currentCategory', "photos");

        }
        else if (storedCategory) {
            setCurrentCategory(storedCategory);
        }

    }, [pathname]);

    const handleCategoryClick = (category:string) => {
        setCurrentCategory(category);
        localStorage.setItem('currentCategory', category);
    };
    const categories = [
        {
            id: 'photos',
            label: { en: 'Photos', ru: 'Фото' },
            href: `/${lang}`,
        },
        {
            id: 'illustrations',
            label: { en: 'Illustrations', ru: 'Иллюстрации' },
            href: `/${lang}/t/illustrations/`,
        },
        {
            id: 'unsplash_plus',
            label: { en: 'Unsplash+', ru: 'Unsplash+' },
            href: `/${lang}/t/unsplash_plus/`,
        },
        {
            id: 'wallpapers',
            label: { en: 'Wallpapers', ru: 'Обои' },
            href: `/${lang}/t/wallpapers/`,
        },
        {
            id: 'nature',
            label: { en: 'Nature', ru: 'Природа' },
            href: `/${lang}/t/nature/`,
        },
        {
            id: '3d_renders',
            label: { en: '3D Renders', ru: '3D Рендеры' },
            href: `/${lang}/t/3d_renders/`,
        },
        {
            id: 'cars',
            label: { en: 'Cars', ru: 'Машины' },
            href: `/${lang}/t/cars/`,
        },
        {
            id: 'minimalism',
            label: { en: 'Minimalism', ru: 'Минимализм' },
            href: `/${lang}/t/minimalism/`,
        },
        {
            id: 'monochromatic',
            label: { en: 'Monochromatic', ru: 'Монохромные' },
            href: `/${lang}/t/monochromatic/`,
        },
        {
            id: 'street_photography',
            label: { en: 'Street Photography', ru: 'Уличная фотография' },
            href: `/${lang}/t/street_photography/`,
        },
        {
            id: 'textures_and_patterns',
            label: { en: 'Textures & Patterns', ru: 'Текстуры & Паттерны' },
            href: `/${lang}/t/textures_and_patterns/`,
        },{
            id: 'animals',
            label: { en: 'Animals', ru: 'Животные' },
            href: `/${lang}/t/animals/`,
        },{
            id: 'food',
            label: { en: 'Food', ru: 'Еда' },
            href: `/${lang}/t/food/`,
        },{
            id: 'tech',
            label: { en: 'Tech', ru: 'Технологии' },
            href: `/${lang}/t/tech/`,
        },
        {
            id: 'shoes',
            label: { en: 'Shoes', ru: 'Обувь' },
            href: `/${lang}/t/shoes/`,
        },
        {
            id: 'people',
            label: { en: 'People', ru: 'Люди' },
            href: `/${lang}/t/people/`,
        }
    ];

    // let photosClassName, illustrationsClassName, unsplashClassName,
    //     wallpapersClassName, natureClassName, rendersClassName,
    //     carsClassName, minimalismClassName, monochromaticClassName,
    //     street_photographyClassName, textures_and_patternsClassName;
    // if (searchtext === 'ru' || searchtext === 'en') {
    //     photosClassName = 'bd_select_page_active';
    //     illustrationsClassName = 'bd_select_page_diactive';
    //     wallpapersClassName = 'bd_select_page_diactive';
    //     unsplashClassName = 'bd_select_page_diactive';
    //     natureClassName = 'bd_select_page_diactive';
    //     rendersClassName = 'bd_select_page_diactive';
    //     carsClassName = 'bd_select_page_diactive';
    //     minimalismClassName = 'bd_select_page_diactive';
    //     monochromaticClassName = 'bd_select_page_diactive';
    //     street_photographyClassName = 'bd_select_page_diactive';
    //     textures_and_patternsClassName = 'bd_select_page_diactive';
    // } else if (searchtext === 'illustrations') {
    //     photosClassName = 'bd_select_page_diactive';
    //     illustrationsClassName = 'bd_select_page_active';
    //     wallpapersClassName = 'bd_select_page_diactive';
    //     unsplashClassName = 'bd_select_page_diactive';
    //     natureClassName = 'bd_select_page_diactive';
    //     rendersClassName = 'bd_select_page_diactive';
    //     carsClassName = 'bd_select_page_diactive';
    //     minimalismClassName = 'bd_select_page_diactive';
    //     monochromaticClassName = 'bd_select_page_diactive';
    //     street_photographyClassName = 'bd_select_page_diactive';
    //     textures_and_patternsClassName = 'bd_select_page_diactive';
    // } else if (searchtext === 'unsplash_plus') {
    //     photosClassName = 'bd_select_page_diactive';
    //     illustrationsClassName = 'bd_select_page_diactive';
    //     wallpapersClassName = 'bd_select_page_diactive';
    //     unsplashClassName = 'bd_select_page_active';
    //     natureClassName = 'bd_select_page_diactive';
    //     rendersClassName = 'bd_select_page_diactive';
    //     carsClassName = 'bd_select_page_diactive';
    //     minimalismClassName = 'bd_select_page_diactive';
    //     monochromaticClassName = 'bd_select_page_diactive';
    //     street_photographyClassName = 'bd_select_page_diactive';
    //     textures_and_patternsClassName = 'bd_select_page_diactive';
    // } else if (searchtext === 'wallpapers') {
    //     photosClassName = 'bd_select_page_diactive';
    //     illustrationsClassName = 'bd_select_page_diactive';
    //     wallpapersClassName = 'bd_select_page_active';
    //     unsplashClassName = 'bd_select_page_diactive';
    //     natureClassName = 'bd_select_page_diactive';
    //     rendersClassName = 'bd_select_page_diactive';
    //     carsClassName = 'bd_select_page_diactive';
    //     minimalismClassName = 'bd_select_page_diactive';
    //     monochromaticClassName = 'bd_select_page_diactive';
    //     street_photographyClassName = 'bd_select_page_diactive';
    //     textures_and_patternsClassName = 'bd_select_page_diactive';
    // } else if (searchtext === 'nature') {
    //     photosClassName = 'bd_select_page_diactive';
    //     illustrationsClassName = 'bd_select_page_diactive';
    //     wallpapersClassName = 'bd_select_page_diactive';
    //     unsplashClassName = 'bd_select_page_diactive';
    //     natureClassName = 'bd_select_page_active';
    //     rendersClassName = 'bd_select_page_diactive';
    //     carsClassName = 'bd_select_page_diactive';
    //     minimalismClassName = 'bd_select_page_diactive';
    //     monochromaticClassName = 'bd_select_page_diactive';
    //     street_photographyClassName = 'bd_select_page_diactive';
    //     textures_and_patternsClassName = 'bd_select_page_diactive';
    // } else if (searchtext === '3d_renders') {
    //     photosClassName = 'bd_select_page_diactive';
    //     illustrationsClassName = 'bd_select_page_diactive';
    //     wallpapersClassName = 'bd_select_page_diactive';
    //     unsplashClassName = 'bd_select_page_diactive';
    //     natureClassName = 'bd_select_page_diactive';
    //     rendersClassName = 'bd_select_page_active';
    //     carsClassName = 'bd_select_page_diactive';
    //     minimalismClassName = 'bd_select_page_diactive';
    //     monochromaticClassName = 'bd_select_page_diactive';
    //     street_photographyClassName = 'bd_select_page_diactive';
    //     textures_and_patternsClassName = 'bd_select_page_diactive';
    // } else if (searchtext === 'cars') {
    //     photosClassName = 'bd_select_page_diactive';
    //     illustrationsClassName = 'bd_select_page_diactive';
    //     wallpapersClassName = 'bd_select_page_diactive';
    //     unsplashClassName = 'bd_select_page_diactive';
    //     natureClassName = 'bd_select_page_diactive';
    //     rendersClassName = 'bd_select_page_diactive';
    //     carsClassName = 'bd_select_page_active';
    //     minimalismClassName = 'bd_select_page_diactive';
    //     monochromaticClassName = 'bd_select_page_diactive';
    //     street_photographyClassName = 'bd_select_page_diactive';
    //     textures_and_patternsClassName = 'bd_select_page_diactive';
    // } else if (searchtext === 'minimalism') {
    //     photosClassName = 'bd_select_page_diactive';
    //     illustrationsClassName = 'bd_select_page_diactive';
    //     wallpapersClassName = 'bd_select_page_diactive';
    //     unsplashClassName = 'bd_select_page_diactive';
    //     natureClassName = 'bd_select_page_diactive';
    //     rendersClassName = 'bd_select_page_diactive';
    //     carsClassName = 'bd_select_page_diactive';
    //     minimalismClassName = 'bd_select_page_active';
    //     monochromaticClassName = 'bd_select_page_diactive';
    //     street_photographyClassName = 'bd_select_page_diactive';
    //     textures_and_patternsClassName = 'bd_select_page_diactive';
    // } else if (searchtext === 'monochromatic') {
    //     photosClassName = 'bd_select_page_diactive';
    //     illustrationsClassName = 'bd_select_page_diactive';
    //     wallpapersClassName = 'bd_select_page_diactive';
    //     unsplashClassName = 'bd_select_page_diactive';
    //     natureClassName = 'bd_select_page_diactive';
    //     rendersClassName = 'bd_select_page_diactive';
    //     carsClassName = 'bd_select_page_diactive';
    //     minimalismClassName = 'bd_select_page_diactive';
    //     monochromaticClassName = 'bd_select_page_active';
    //     street_photographyClassName = 'bd_select_page_diactive';
    //     textures_and_patternsClassName = 'bd_select_page_diactive';
    // } else if (searchtext === 'street_photography') {
    //     photosClassName = 'bd_select_page_diactive';
    //     illustrationsClassName = 'bd_select_page_diactive';
    //     wallpapersClassName = 'bd_select_page_diactive';
    //     unsplashClassName = 'bd_select_page_diactive';
    //     natureClassName = 'bd_select_page_diactive';
    //     rendersClassName = 'bd_select_page_diactive';
    //     carsClassName = 'bd_select_page_diactive';
    //     minimalismClassName = 'bd_select_page_diactive';
    //     monochromaticClassName = 'bd_select_page_diactive';
    //     street_photographyClassName = 'bd_select_page_active';
    //     textures_and_patternsClassName = 'bd_select_page_diactive';
    // } else if (searchtext === 'textures_and_patterns') {
    //     photosClassName = 'bd_select_page_diactive';
    //     illustrationsClassName = 'bd_select_page_diactive';
    //     wallpapersClassName = 'bd_select_page_diactive';
    //     unsplashClassName = 'bd_select_page_diactive';
    //     natureClassName = 'bd_select_page_diactive';
    //     rendersClassName = 'bd_select_page_diactive';
    //     carsClassName = 'bd_select_page_diactive';
    //     minimalismClassName = 'bd_select_page_diactive';
    //     monochromaticClassName = 'bd_select_page_diactive';
    //     street_photographyClassName = 'bd_select_page_diactive';
    //     textures_and_patternsClassName = 'bd_select_page_active';
    // }
    return (


        // <div className="categories_select">
        //     {categories.map((category,index) => (
        //         <>
        //         <Link key={category.id} href={category.href}>
        //             <div
        //                 className={currentCategory === category.id ? 'bd_select_page_active' : 'bd_select_page_diactive'}
        //                 onClick={() => handleCategoryClick(category.id)}
        //             >
        //                 <p>{lang === "en" ? category.label.en : category.label.ru}</p>
        //             </div>
        //         </Link>
        //             {index === 2 && (
        //                 <div className="bg-[#d1d1d1] h-8 w-px navBar_mobile_display_none"></div>
        //             )}
        //         </>
        //
        //     ))}
        // </div>
        <div className="px-5 py-0">

        <ScrollShadow offset={0}  size={20} orientation="horizontal" hideScrollBar={true} className="max-w-full max-h-[80px] p-0 flex-nowrap">

        <div className="categories_select">
            {categories.map((category, index) => (
                // <>
                    <Link key={category.id} href={category.href}>
                        <div
                            className={currentCategory === category.id ? 'bd_select_page_active' : 'bd_select_page_diactive'}
                            onClick={() => handleCategoryClick(category.id)}
                        >
                            <p>{lang === "en" ? category.label.en : category.label.ru}</p>
                        </div>
                    </Link>
                /*
            {index === 2 && (
                <div className="bg-[#d1d1d1] h-8 w-px navBar_mobile_display_none"></div>
                )}
                */

                // </>

            ))}
        </div>
        </ScrollShadow>
        </div>


        // <div className=" flex-grow min-w-0 isolate relative">
        // <div className="w-full flex overflow-x-auto  ">
        // scroll_class

        // <div
        //     className="categories_select">
        //
        //     <Link href={`/${lang}`}>
        //         <div
        //             className={currentCategory === 'photos' ? 'bd_select_page_active' : 'bd_select_page_active'}
        //             onClick={() => handleCategoryClick('photos')}>
        //             <p>{lang === "en" ? <>Photos</> : <>Фото</>}</p>
        //         </div>
        //     </Link>
        //     <Link href={`/${lang}/t/illustrations/`}>
        //         <div
        //             className={currentCategory === 'illustrations' ? 'bd_select_page_active' : 'bd_select_page_active'}
        //             onClick={() => handleCategoryClick('illustrations')}>
        //             <p>{lang === "en" ? <>Illustrations</> : <>Иллюстрации</>}</p>
        //         </div>
        //     </Link>
        //     <Link href={`/${lang}/t/unsplash_plus/`}>
        //         <div
        //             className={currentCategory === 'unsplash_plus' ? 'bd_select_page_active' : 'bd_select_page_active'}
        //             onClick={() => handleCategoryClick('unsplash_plus')}>
        //             <p>{lang === "en" ? <>Unsplash+</> : <>Unsplash+</>}</p>
        //         </div>
        //     </Link>
        //
        //     <div className="bg-[#d1d1d1] h-8 w-px navBar_mobile_display_none"></div>
        //
        //     <Link href={`/${lang}/t/wallpapers/`}>
        //         <div
        //             className={currentCategory === 'wallpapers' ? 'bd_select_page_active' : 'bd_select_page_active'}
        //             onClick={() => handleCategoryClick('wallpapers')}>
        //             <p>{lang === "en" ? <>Wallpapers</> : <>Обои</>}</p>
        //         </div>
        //     </Link>
        //     <Link href={`/${lang}/t/wallpapers/`}>
        //         <div
        //             className={currentCategory === 'wallpapers' ? 'bd_select_page_active' : 'bd_select_page_active'}
        //             onClick={() => handleCategoryClick('wallpapers')}>
        //             <p>{lang === "en" ? <>Wallpapers</> : <>Обои</>}</p>
        //         </div>
        //     </Link>
        //
        //     <Link href={`/${lang}/t/nature/`}>
        //         <div className={natureClassName}>
        //             <p>{lang === "en" ? <>Nature</> : <>Природа</>}</p>
        //         </div>
        //     </Link>
        //     <Link href={`/${lang}/t/3d_renders/`}>
        //         <div className={rendersClassName}>
        //             <p>{lang === "en" ? <>3D Renders</> : <>3D Рендеры</>}</p>
        //         </div>
        //     </Link>
        //     <Link href={`/${lang}/t/cars/`}>
        //         <div className={carsClassName}>
        //             <p>{lang === "en" ? <>Cars</> : <>Машины</>}</p>
        //         </div>
        //     </Link>
        //     <Link href={`/${lang}/t/minimalism/`}>
        //         <div className={minimalismClassName}>
        //             <p>{lang === "en" ? <>Minimalism</> : <>Минимализм</>}</p>
        //         </div>
        //     </Link>
        //     <Link href={`/${lang}/t/monochromatic/`}>
        //         <div className={monochromaticClassName}>
        //             <p>{lang === "en" ? <>Monochromatic</> : <>Монохромные</>}</p>
        //
        //         </div>
        //     </Link>
        //     <Link href={`/${lang}/t/street_photography/`}>
        //         <div className={street_photographyClassName}>
        //             <p>{lang === "en" ? <>Street Photography</> : <>Уличная фотография</>}</p>
        //         </div>
        //     </Link>
        //     <Link href={`/${lang}/t/textures_and_patterns/`}>
        //         <div className={textures_and_patternsClassName}>
        //             <p>{lang === "en" ? <>Textures & Patterns</> : <>Текстуры & Паттерны</>}</p>
        //         </div>
        //     </Link>
        //
        // </div>

        //  {/*</div>*/}
        // {/*// </div>*/}

        // <div className="shadow-black shadow">
        //     <div className="px-2">
        //         <div className="ossD0 items-center gap-6 flex" >
        //             <div className="P_V8q ">
        //                 <ul className="ossD0 GxtYC items-center gap-6 flex ">
        //                     <li className="ul3z_"><a aria-current="page" className="oaSYM ZR5jm SNFLF"
        //                                              href="/">Photos</a></li>
        //                     <li className="ul3z_"><a className="oaSYM ZR5jm" href="/illustrations">Illustrations</a>
        //                     </li>
        //                     <li className="ul3z_"><a className="oaSYM ZR5jm" href="/plus/new">Unsplash+</a></li>
        //                 </ul>
        //             </div>
        //             <div className="pqHHy P_V8q bg-D1 h-8 w-[1px] "></div>
        //             <div className="z882H RSNpo vrZAX flex-grow min-w-0 isolate relative">
        //                 <div className="h9Kv0 scroll_class">
        //                     <ul className="ossD0 GxtYC " >
        //                         <li className="ul3z_"><a aria-current="page" className="oaSYM ZR5jm SNFLF"
        //                                                  href="/">Photos</a></li>
        //                         <li className="ul3z_"><a className="oaSYM ZR5jm" href="/illustrations">Illustrations</a>
        //                         </li>
        //                         <li className="ul3z_"><a className="oaSYM ZR5jm" href="/plus/new">Unsplash+</a></li>
        //                         <li><a className="oaSYM ZR5jm" href="/t/golden-hour">
        //                         </a></li>
        //                         <li><a className="oaSYM ZR5jm" href="/t/wallpapers">Wallpapers</a></li>
        //                         <li><a className="oaSYM ZR5jm" href="/t/nature">Nature</a></li>
        //                         <li><a className="oaSYM ZR5jm" href="/t/3d-renders">3D Renders</a></li>
        //                         <li><a className="oaSYM ZR5jm" href="/t/travel">Travel</a></li>
        //                         <li><a className="oaSYM ZR5jm"
        //                                href="/t/architecture-interior">Architecture &amp; Interiors</a></li>
        //                         <li><a className="oaSYM ZR5jm" href="/t/textures-patterns">Textures &amp; Patterns</a>
        //                         </li>
        //                         <li><a className="oaSYM ZR5jm" href="/t/street-photography">Street Photography</a></li>
        //                         <li><a className="oaSYM ZR5jm" href="/t/film">Film</a></li>
        //                         <li><a className="oaSYM ZR5jm" href="/t/archival">Archival</a></li>
        //                         <li><a className="oaSYM ZR5jm" href="/t/experimental">Experimental</a></li>
        //                         <li><a className="oaSYM ZR5jm" href="/t/animals">Animals</a></li>
        //                         <li><a className="oaSYM ZR5jm" href="/t/fashion-beauty">Fashion &amp; Beauty</a></li>
        //                         <li><a className="oaSYM ZR5jm" href="/t/people">People</a></li>
        //                         <li><a className="oaSYM ZR5jm" href="/t/spirituality">Spirituality</a></li>
        //                         <li><a className="oaSYM ZR5jm" href="/t/business-work">Business &amp; Work</a></li>
        //                         <li><a className="oaSYM ZR5jm" href="/t/food-drink">Food &amp; Drink</a></li>
        //                         <li><a className="oaSYM ZR5jm" href="/t/health">Health &amp; Wellness</a></li>
        //                         <li><a className="oaSYM ZR5jm" href="/t/sports">Sports</a></li>
        //                         <li><a className="oaSYM ZR5jm" href="/t/current-events">Current Events</a></li>
        //                     </ul>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )

}
// import Link from "next/link";
// import SortSelectBox from "@/app/components/__Header/__SortNav/SortSelectBox";
// import { usePathname } from "next/navigation";
//
// const categories = [
//     { name: "Photos", href: "/" },
//     { name: "Illustrations", href: "/t/illustrations/" },
//     { name: "Unsplash+", href: "/t/unsplash_plus/" },
//     { name: "Wallpapers", href: "/t/wallpapers/" },
//     { name: "Nature", href: "/t/nature/" },
//     { name: "3D Renders", href: "/t/3d_renders/" },
//     { name: "Cars", href: "/t/cars/" },
//     { name: "Minimalism", href: "/t/minimalism/" },
//     { name: "Monochromatic", href: "/t/monochromatic/" },
//     { name: "Street Photography", href: "/t/street_photography/" },
//     { name: "Textures & Patterns", href: "/t/textures_and_patterns/" },
// ];
// export default function CategotiesSelect() {
//     const pathname = usePathname();
//     const searchtext = pathname.split('/').pop();
//
//     return (
//         <div
//             className="flex gap-x-8 items-center px-5 pt-3 py-0 whitespace-nowrap bg-white text-neutral-500 max-md:flex-wrap"
//         >
//             {categories.map((category, index) => (
//                 <Link key={index} href={category.href}>
//                     <div
//                         className={
//                             pathname.replace(/^\/t\//, '/') === category.href || searchtext === category.name.toLowerCase().replace(/\s+/g, '_')
//                                 ? 'bd_select_page_active'
//                                 : 'bd_select_page_diactive'
//                         }
//                     >
//                         <p>{category.name}</p>
//                     </div>
//                 </Link>
//             ))}
//             <div className="bg-[#d1d1d1] h-8 w-px"></div>
//         </div>
//     );
// }