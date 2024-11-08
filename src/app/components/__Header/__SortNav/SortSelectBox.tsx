import {useCallback, useEffect, useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export default function SortSelectBox({lang}:{lang:string}) {

    const searchParams = useSearchParams();
    const [selectedOrientation, setSelectedOrientation] = useState<number>();
    const [selectedLicense, setSelectedLicense] = useState<number>();
    const [selectedSort, setSelectedSort] = useState<number>();
    const [selectedCountView, setCountView] = useState<number>();
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        const license = searchParams.get('license');
        if (license) {
            switch (license) {
                case 'plus':
                    setSelectedLicense(1);
                    break;
                case 'free':
                    setSelectedLicense(2);
                    break;
                default:
                    setSelectedLicense(0);
            }
        } else {
            setSelectedLicense(0);
        }
        const sort = searchParams.get('sort');
        if (sort) {
            switch (sort) {
                case 'popular':
                    setSelectedSort(1);
                    break;
                case 'desc':
                    setSelectedSort(2);
                    break;
                default:
                    setSelectedSort(0);
            }
        } else {
            setSelectedSort(0);
        }
        const orientation = searchParams.get('orientation');
        if (orientation) {
            switch (orientation) {
                case 'landscape':
                    setSelectedOrientation(1);
                    break;
                case 'portrait':
                    setSelectedOrientation(2);
                    break;
                default:
                    setSelectedOrientation(0);
            }
        } else {
            setSelectedOrientation(0);
        }
        const countview = searchParams.get('countview');
        if (countview) {
            switch (countview) {
                case '18':
                    setCountView(1);
                    break;
                case '27':
                    setCountView(2);
                    break;
                case '36':
                    setCountView(3);
                    break;
                default:
                    setCountView(0);
            }
        } else {
            setCountView(0);
        }
        console.log('page upadte')
    }, [searchParams]);

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            if (name === 'license') {
                params.delete('license'); // Remove existing 'orientation' parameter
                params.set(name, value)

            } else if (name === 'sort') {
                params.delete('sort'); // Remove existing 'orientation' parameter
                params.set(name, value)
            } else if (name === 'orientation') {
                params.delete('orientation'); // Remove existing 'orientation' parameter
                params.set(name, value)
            }else if (name === 'countview') {
                params.delete('countview'); // Remove existing 'orientation' parameter
                params.set(name, value)
            }

            if (params.get('license') === '') {
                params.delete('license');
            }else if (params.get('sort') === '') {
                params.delete('sort');
            }else if (params.get('orientation') === '') {
                params.delete('orientation');
            }else if (params.get('countview') === '') {
                params.delete('countview');
            }
            console.log(name, value)
            return params.toString()
        },
        [searchParams]
    )



    const [isOpenLicense, setIsOpenLicense] = useState(false);
    const [isOpenOrientation, setIsOpenOrientation] = useState(false);
    const [isOpenSort, setIsOpenSort] = useState(false);
    const [isOpenCountView, setIsOpenCountView] = useState(false);

    const handleLicenseButtonClick = () => {
        setIsOpenLicense(!isOpenLicense);
        setIsOpenOrientation(false);
        setIsOpenSort(false);
        setIsOpenCountView(false);
    };

    const handleOrientationButtonClick = () => {
        setIsOpenOrientation(!isOpenOrientation);
        setIsOpenLicense(false);
        setIsOpenSort(false);
        setIsOpenCountView(false);
    };

    const handleSortButtonClick = () => {
        setIsOpenSort(!isOpenSort);
        setIsOpenLicense(false);
        setIsOpenOrientation(false);
        setIsOpenCountView(false);
    };
    const handleCountViewButtonClick = () => {
        setIsOpenCountView(!isOpenCountView);
        setIsOpenSort(false);
        setIsOpenLicense(false);
        setIsOpenOrientation(false);
    };


    return (
        <div className="bd_select_page_sort_div">
            <div className="flex-grow">
                <div className="items-center flex gap-2 flex-wrap">
                    <button onClick={() => {
                        const params = new URLSearchParams(searchParams.toString());
                        params.delete('license');
                        params.delete('orientation');
                        params.delete('sort');
                        params.delete('countview');
                        router.push(`${pathname}?${params.toString()}`);

                    }}>
                        {lang === "en" ? <>Clear</> : <>Очистить</>}
                    </button>
                    <div className="bd_select_page_sort_div_div_div_button">
                        <button
                            role="button"
                            aria-haspopup="true"
                            aria-expanded={isOpenCountView}
                            type="button"
                            onClick={handleCountViewButtonClick}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 14 14"
                                 id="Ascending-Number-Order--Streamline-Core" height="14" width="14">
                                <desc>Ascending Number Order Streamline Icon: https://streamlinehq.com</desc>
                                    <path id="Union"  fill-rule="evenodd"
                                          d="M3.75002 0c0.55229 0 1 0.447715 1 1v9h1.5c0.30335 0 0.57683 0.1827 0.69291 0.463 0.11609 0.2802 0.05192 0.6028 -0.16258 0.8173l-2.5 2.5c-0.29289 0.2929 -0.76776 0.2929 -1.06066 0l-2.499998 -2.5c-0.214499 -0.2145 -0.278665 -0.5371 -0.16258 -0.8173 0.116086 -0.2803 0.389563 -0.463 0.692908 -0.463h1.5V1c0 -0.552285 0.44772 -1 1 -1Zm8.16678 0.75c0 -0.414214 -0.3358 -0.75 -0.75 -0.75s-0.75 0.335786 -0.75 0.75c0 0.27614 -0.2239 0.5 -0.50001 0.5h-0.41667c-0.41421 0 -0.75 0.33579 -0.75 0.75s0.33579 0.75 0.75 0.75h0.41667c0.17261 0 0.34021 -0.02188 0.50001 -0.06301V5h-0.91668c-0.41421 0 -0.75 0.33579 -0.75 0.75s0.33579 0.75 0.75 0.75h3.33338c0.4142 0 0.75 -0.33579 0.75 -0.75s-0.3358 -0.75 -0.75 -0.75h-0.9167V0.75Zm-0.8384 9.3438 -0.6563 0c-0.371 0 -0.67185 -0.30085 -0.67185 -0.67191s0.30085 -0.67187 0.67185 -0.67187l0.6562 -0.00001c0.3695 0 0.6692 0.29811 0.6719 0.66689v0.00997c-0.0027 0.36877 -0.3024 0.66693 -0.6718 0.66693Zm-0.0001 -2.84379c1.1105 -0.00001 2.0264 0.83342 2.1562 1.9089 0.0103 0.04958 0.0157 0.10095 0.0157 0.15359v0.10042l0 0.00897 0 0.00896v2.50665c0 1.1391 -0.9234 2.0625 -2.0625 2.0625h-0.875c-0.89918 0 -1.66215 -0.575 -1.94492 -1.3751 -0.13804 -0.3905 0.06666 -0.819 0.45719 -0.957 0.39054 -0.1381 0.81903 0.0666 0.95707 0.4572 0.07757 0.2194 0.28696 0.3749 0.53066 0.3749h0.875c0.3107 0 0.5625 -0.2518 0.5625 -0.5625v-0.4497c-0.2116 0.0688 -0.4374 0.106 -0.6718 0.106l-0.6563 0c-1.19947 0 -2.17185 -0.9724 -2.17185 -2.17192 0 -1.19948 0.97237 -2.17186 2.17185 -2.17186l0.6562 -0.00001Z"
                                          clip-rule="evenodd" stroke-width="1"></path>

                            </svg>

                            <div className=" flex-shrink-0 w-1.5"></div>
                            <span>
                            {selectedCountView === 0 ? (
                                <>
                                    <span
                                        className="color-[#767676]">{lang === "en" ? <>Show</> : <>Показывать</>} </span> 9
                                </>
                            ) : null}
                                {selectedCountView === 1 ? (
                                    <>
                                        18
                                    </>
                                ) : null}
                                {selectedCountView === 2 ? (
                                    <>
                                        27
                                    </>
                                ) : null}
                                {selectedCountView === 3 ? (
                                    <>
                                        36
                                    </>
                                ) : null}

                            </span>
                            {/*                      <span className="color-[#767676]">License</span> All*/}
                            {/*</span>*/}
                            <div className=" flex-shrink-0 w-1.5"></div>
                            <svg className=" w-5 h-5" viewBox="0 0 24 24" version="1.1"
                                 aria-hidden="false">
                                <desc lang="en-US">Arrow down</desc>
                                <path d="m6 9 6 7 6-7H6Z"></path>
                            </svg>
                        </button>
                        {isOpenCountView && (
                            <div role="menu">
                                <div className="absolute  transform translate-x-1140 translate-y-47">
                                    <div className="transition duration-200 ease-in-out">
                                        <div className="bd_select_page_sort_menu">
                                            <section aria-label="Orientation">
                                                <span className="sr-only" id="dropdown-menu-section:rs:">License</span>
                                                <div role="group" aria-labelledby="dropdown-menu-section:rs:">
                                                    <ul className="bd_select_page_sort_div_div_div_button_ul">
                                                        {[
                                                            {
                                                                label: '9',
                                                                name: "countview", value: ""
                                                            },
                                                            {
                                                                label: '18',
                                                                name: "countview", value: "18"
                                                            },
                                                            {
                                                                label: '27',
                                                                name: "countview", value: "27"
                                                            },
                                                            {
                                                                label: '36',
                                                                name: "countview", value: "36"
                                                            },
                                                        ].map((item, index) => (
                                                            <li key={index}>
                                                                <a
                                                                    role="link"
                                                                    aria-disabled={index === selectedCountView ? 'false' : 'true'}
                                                                    // href={item.href}
                                                                    className={`block py-2 px-4 `}
                                                                    onClick={() => {
                                                                        router.push(pathname + '?' + createQueryString(item.name, item.value))
                                                                    }}
                                                                >
                                                                    <div className={`${
                                                                        index === selectedCountView ? 'bd_select_page_sort_div_div_div_button_ul_div_active' : 'bd_select_page_sort_div_div_div_button_ul_div_diactive'
                                                                    }`}>
                                                                        <div className="mr-2">
                                                                            <svg
                                                                                className="w-6 h-6 text-gray-500"
                                                                                viewBox="0 0 24 24"
                                                                                version="1.1"
                                                                                aria-hidden="false"
                                                                            >
                                                                                <desc lang="en-US">{item.label}</desc>
                                                                                {index === selectedCountView ? (
                                                                                    <path
                                                                                        d="m10 17.4-5-5L6.4 11l3.6 3.6L17.6 7 19 8.4l-9 9Z"/>
                                                                                ) : (
                                                                                    <path d=""/>
                                                                                )}
                                                                            </svg>
                                                                        </div>
                                                                        <p className="flex-1">{item.label}</p>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {(pathname !== '/ru/t/unsplash_plus' && pathname !== '/en/t/unsplash_plus' )&& (
                        <div className="bd_select_page_sort_div_div_div_button">
                            <button
                                role="button"
                                aria-haspopup="true"
                                aria-expanded={isOpenLicense}
                                type="button"
                                onClick={handleLicenseButtonClick}
                            >
                                <svg className="JcjCN w-5 h-5" viewBox="0 0 24 24" version="1.1" aria-hidden="false">
                                    <desc lang="en-US">A copyright icon ©</desc>
                                    <path
                                        d="M10 11.87v.27c0 .33.03.67.08 1 .05.33.16.63.3.88s.34.46.59.62c.23.15.53.22.89.23.21-.01.41-.03.6-.1.2-.07.37-.17.52-.3.15-.13.27-.28.36-.46.09-.18.14-.37.15-.58h1.79c-.01.41-.12.79-.3 1.15s-.43.67-.74.94c-.31.27-.67.48-1.08.63-.41.15-.85.23-1.32.23-.65 0-1.22-.12-1.7-.34-.48-.22-.88-.53-1.2-.91s-.56-.83-.71-1.35c-.15-.52-.23-1.06-.23-1.64v-.27c0-.58.09-1.12.24-1.64.15-.52.39-.97.71-1.36s.72-.69 1.2-.92c.48-.23 1.05-.34 1.7-.34.51 0 .97.07 1.39.23.42.16.78.38 1.08.66s.53.62.7 1.01c.17.39.26.82.28 1.29h-1.79c-.01-.22-.05-.44-.14-.64-.09-.2-.2-.38-.34-.53-.14-.15-.32-.27-.52-.36-.19-.08-.4-.12-.63-.13-.37.01-.67.08-.91.23-.25.16-.45.37-.59.62s-.25.54-.3.87c-.05.33-.08.66-.08 1.01ZM22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10Zm-2 0c0-4.41-3.59-8-8-8s-8 3.59-8 8 3.59 8 8 8 8-3.59 8-8Z"></path>
                                </svg>
                                <div className=" flex-shrink-0 w-1.5"></div>
                                <span>
                            {selectedLicense === 0 ? (
                                <>
                                    <span className="color-[#767676]">{lang === "en" ? <>License</> : <>Лицензия</>}</span> {lang === "en" ? <>All</> : <>Все</>}
                                </>
                            ) : null}
                                    {selectedLicense === 1 ? (
                                        <>
                                            Unsplash+
                                        </>
                                    ) : null}
                                    {selectedLicense === 2 ? (
                                        <>
                                            {lang === "en" ? <>Free</> : <>Бесплатные</>}
                                        </>
                                    ) : null}

                            </span>
                                {/*                      <span className="color-[#767676]">License</span> All*/}
                                {/*</span>*/}
                                <div className=" flex-shrink-0 w-1.5"></div>
                                <svg className=" w-5 h-5" viewBox="0 0 24 24" version="1.1"
                                     aria-hidden="false">
                                    <desc lang="en-US">Arrow down</desc>
                                    <path d="m6 9 6 7 6-7H6Z"></path>
                                </svg>
                            </button>
                            {isOpenLicense && (
                                <div role="menu">
                                    <div className="absolute  transform translate-x-1140 translate-y-47">
                                        <div className="transition duration-200 ease-in-out">
                                            <div className="bd_select_page_sort_menu">
                                                <section aria-label="Orientation">
                                                    <span className="sr-only"
                                                          id="dropdown-menu-section:rs:">License</span>
                                                    <div role="group" aria-labelledby="dropdown-menu-section:rs:">
                                                        <ul className="bd_select_page_sort_div_div_div_button_ul">
                                                            {[
                                                                {
                                                                    label: 'All',
                                                                    labelru: 'Все',
                                                                    name: "license", value: ""
                                                                },
                                                                {
                                                                    label: 'Unsplash+',
                                                                    labelru: 'Unsplash+',
                                                                    name: "license", value: "plus"
                                                                },
                                                                {
                                                                    label: 'Free',
                                                                    labelru: 'Бесплатные',
                                                                    name: "license", value: "free"
                                                                },
                                                            ].map((item, index) => (
                                                                <li key={index}>
                                                                    <a
                                                                        role="link"
                                                                        aria-disabled={index === selectedLicense ? 'false' : 'true'}
                                                                        // href={item.href}
                                                                        className={`block py-2 px-4 `}
                                                                        onClick={() => {
                                                                            router.push(pathname + '?' + createQueryString(item.name, item.value))
                                                                        }}
                                                                    >
                                                                        <div className={`${
                                                                            index === selectedLicense ? 'bd_select_page_sort_div_div_div_button_ul_div_active' : 'bd_select_page_sort_div_div_div_button_ul_div_diactive'
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
                                                                                    {index === selectedLicense ? (
                                                                                        <path
                                                                                            d="m10 17.4-5-5L6.4 11l3.6 3.6L17.6 7 19 8.4l-9 9Z"/>
                                                                                    ) : (
                                                                                        <path d=""/>
                                                                                    )}
                                                                                </svg>
                                                                            </div>
                                                                            <p className="flex-1">{
                                                                                lang === "en" ? <>{item.label}</> : <>{item.labelru}</>
                                                                            }</p>
                                                                        </div>
                                                                    </a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </section>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                    )}
                    <div className="bd_select_page_sort_div_div_div_button">
                        <button
                            role="button"
                            aria-haspopup="true"
                            aria-expanded={isOpenOrientation}
                            type="button"
                            onClick={handleOrientationButtonClick}
                        >
                            <svg className="color-[#AAAAAA] w-5 h-5" viewBox="0 0 24 24" version="1.1" color="#AAAAAA"
                                 aria-hidden="false">
                                <desc lang="en-US">A copyright icon ©</desc>
                                {selectedOrientation === 0 ? (
                                    <path
                                        d="M9 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h4v14zm10-7h-4c-1.1 0-2 .9-2 2v5c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-5c0-1.1-.9-2-2-2zm0 7h-4v-5h4v5zm0-16h-4c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 5h-4V5h4v3z"></path>

                                ) : null}
                                {selectedOrientation === 1 ? (
                                    <path
                                        d="M19 5H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 12H5V7h14v10z"></path>

                                ) : null}
                                {selectedOrientation === 2 ? (
                                    <path
                                        d="M17 3H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7V5h10v14z"></path>

                                ) : null}
                            </svg>
                            <div className=" flex-shrink-0 w-1.5"></div>
                            <span>
                            {selectedOrientation === 0 ? (
                                <>
                                    <span className="color-[#767676]">{lang === "en" ? <>Orientation</> : <>Ориентация</>}</span> {lang === "en" ? <>All</> : <>Все</>}
                                </>
                            ) : null}
                                {selectedOrientation === 1 ? (
                                    <>
                                        {lang === "en" ? <>Landscape</> : <>Горизонтальная</>}
                                    </>
                                ) : null}
                                {selectedOrientation === 2 ? (
                                    <>
                                        {lang === "en" ? <>Portrait</> : <>Вертикальная</>}
                                    </>
                                ) : null}

                            </span>

                            <div className=" flex-shrink-0 w-1.5"></div>
                            <svg className=" w-5 h-5" viewBox="0 0 24 24" version="1.1"
                                 aria-hidden="false">
                                <desc lang="en-US">Arrow down</desc>
                                <path d="m6 9 6 7 6-7H6Z"></path>
                            </svg>
                        </button>
                        {isOpenOrientation && (
                            <div role="menu">
                                <div className="absolute  transform translate-x-1140 translate-y-47">
                                    <div className="transition duration-200 ease-in-out">
                                        <div className="bd_select_page_sort_menu">
                                            <section aria-label='Orientation'>
                                                <span className="sr-only"
                                                      id="dropdown-menu-section:rs:">Orientation</span>
                                                <div role="group" aria-labelledby="dropdown-menu-section:rs:">
                                                    <ul className="bd_select_page_sort_div_div_div_button_ul">
                                                        {[
                                                            {
                                                                label: 'All',
                                                                labelru: 'Все',
                                                                name: "orientation", value: "",
                                                                path: "M9 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h4v14zm10-7h-4c-1.1 0-2 .9-2 2v5c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-5c0-1.1-.9-2-2-2zm0 7h-4v-5h4v5zm0-16h-4c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 5h-4V5h4v3z",
                                                            },
                                                            {
                                                                label: 'Landscape',
                                                                labelru: 'Горизонтальная',
                                                                name: "orientation", value: "landscape",
                                                                path: "M19 5H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 12H5V7h14v10z",
                                                            },
                                                            {
                                                                label: 'Portrait',
                                                                labelru: 'Вертикальная',
                                                                name: "orientation", value: "portrait",
                                                                path: "M17 3H7c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7V5h10v14z",
                                                            },
                                                        ].map((item, index) => (
                                                            <li key={index}>
                                                                <a
                                                                    role="link"
                                                                    aria-disabled={index === selectedOrientation ? 'false' : 'true'}
                                                                    className={`block py-2 px-4 `}
                                                                    onClick={() => {
                                                                        router.push(pathname + '?' + createQueryString(item.name, item.value))
                                                                    }}
                                                                >
                                                                    <div className={`${
                                                                        index === selectedOrientation ? 'bd_select_page_sort_div_div_div_button_ul_div_active' : 'bd_select_page_sort_div_div_div_button_ul_div_diactive'
                                                                    }`}>
                                                                        <div className="mr-2">
                                                                            <svg
                                                                                className="w-6 h-6 text-gray-500"
                                                                                viewBox="0 0 24 24"
                                                                                version="1.1"
                                                                                aria-hidden="false"
                                                                            >
                                                                                <desc lang="en-US">{item.label}</desc>

                                                                                <path d={item.path}/>

                                                                            </svg>
                                                                        </div>
                                                                        <p className="flex-1">{
                                                                            lang === "en" ? <>{item.label}</> : <>{item.labelru}</>

                                                                        }</p>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="bd_select_page_sort_div_div_div_button">
                        <button
                            role="button"
                            aria-haspopup="true"
                            aria-expanded={isOpenSort}
                            type="button"
                            onClick={handleSortButtonClick}
                        >
                            <svg className="JcjCN w-5 h-5" viewBox="0 0 24 24" version="1.1" aria-hidden="false">
                                <desc lang="en-US">A copyright icon ©</desc>
                                <path
                                    d="m12 5.83 2.46 2.46a.996.996 0 1 0 1.41-1.41L12.7 3.7a.996.996 0 0 0-1.41 0L8.12 6.88a.996.996 0 1 0 1.41 1.41L12 5.83Zm0 12.34-2.46-2.46a.996.996 0 1 0-1.41 1.41l3.17 3.18c.39.39 1.02.39 1.41 0l3.17-3.17a.996.996 0 1 0-1.41-1.41L12 18.17Z"></path>
                            </svg>
                            <div className=" flex-shrink-0 w-1.5"></div>
                            <span>
                            {selectedSort === 0 ? (
                                <>
                                    <span className="color-[#767676]">{lang === "en" ? <>Sort by</> : <>Сортировать по</>}</span> {lang === "en" ? <>Newest</> : <>Новым</>}
                                </>
                            ) : null}
                                {selectedSort === 1 ? (
                                    <>
                                        {lang === "en" ? <>Popular</> : <>Популярным</>}

                                    </>
                                ) : null}
                                {selectedSort === 2 ? (
                                    <>
                                        {lang === "en" ? <>Oldest</> : <>Старым</>}

                                    </>
                                ) : null}

                            </span>
                            {/*                  <span>*/}
                            {/*  <span>Sort by </span> Relevance*/}
                            {/*</span>*/}
                            <div className=" flex-shrink-0 w-1.5"></div>
                            <svg className=" w-5 h-5" viewBox="0 0 24 24" version="1.1"
                                 aria-hidden="false">
                                <desc lang="en-US">Arrow down</desc>
                                <path d="m6 9 6 7 6-7H6Z"></path>
                            </svg>
                        </button>
                        {isOpenSort && (
                            <div role="menu">
                                <div className="absolute  transform translate-x-1140 translate-y-47">
                                    <div className="transition duration-200 ease-in-out">
                                        <div className="bd_select_page_sort_menu">
                                            <section aria-label="Orientation">
                                                <span className="sr-only"
                                                      id="dropdown-menu-section:rs:">Orientation</span>
                                                <div role="group" aria-labelledby="dropdown-menu-section:rs:">
                                                    <ul className="bd_select_page_sort_div_div_div_button_ul">
                                                        {[
                                                            {
                                                                label: 'Newest',
                                                                labelru: 'Новым',
                                                                name: "sort", value: ""
                                                            },
                                                            {
                                                                label: 'Popular',
                                                                labelru: 'Популярным',
                                                                name: "sort", value: "popular"
                                                            },
                                                            {
                                                                label: 'Oldest',
                                                                labelru: 'Старым',
                                                                name: "sort", value: "desc"
                                                            },
                                                        ].map((item, index) => (
                                                            <li key={index}>
                                                                <a
                                                                    role="link"
                                                                    aria-disabled={index === selectedSort ? 'false' : 'true'}
                                                                    // href={item.href}
                                                                    className="block py-2 px-4"
                                                                    onClick={() => {
                                                                        router.push(pathname + '?' + createQueryString(item.name, item.value))
                                                                    }}
                                                                >
                                                                    <div className={`${
                                                                        index === selectedSort ? 'bd_select_page_sort_div_div_div_button_ul_div_active' : 'bd_select_page_sort_div_div_div_button_ul_div_diactive'
                                                                    }`}>
                                                                        <div className="mr-2">
                                                                            <svg
                                                                                className="w-6 h-6"
                                                                                viewBox="0 0 24 24"
                                                                                version="1.1"
                                                                                aria-hidden="false"
                                                                            >
                                                                                <desc lang="en-US">{item.label}</desc>
                                                                                {index === selectedSort ? (
                                                                                    <path
                                                                                        d="m10 17.4-5-5L6.4 11l3.6 3.6L17.6 7 19 8.4l-9 9Z"/>
                                                                                ) : (
                                                                                    <path d=""/>
                                                                                )}
                                                                            </svg>
                                                                        </div>
                                                                        <p className="flex-1">{
                                                                            lang === "en" ? <>{item.label}</> : <>{item.labelru}</>
                                                                        }</p>
                                                                    </div>
                                                                </a>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}