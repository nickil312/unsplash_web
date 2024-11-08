'use client'
import {useRouter, usePathname, useSearchParams} from "next/navigation";
import {useCallback, useState} from "react";

export default function Pagination() {
    const router = useRouter();
    const pathname = usePathname();
    const language = pathname.split('/')[1];
    const searchParams = useSearchParams();
    // const [currentPage, setCurrentPage] = useState(1);
    const currentPage = parseInt(searchParams.get("page") ?? "0", 10);
    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    // const handleNextClick = () => {
    //     const nextPage = currentPage + 1;
    //     setCurrentPage(nextPage);
    //     router.push(`${pathname}?${createQueryString("page", nextPage.toString())}`);
    // };
    //
    // const handlePrevClick = () => {
    //     if (currentPage > 0) {
    //         const prevPage = currentPage - 1;
    //         setCurrentPage(prevPage);
    //         router.push(`${pathname}?${createQueryString("page", prevPage.toString())}`);
    //     }
    // };

    const handleNextClick = () => {
        const nextPage = currentPage + 1;
        router.push(`${pathname}?${createQueryString("page", nextPage.toString())}`);
    };

    const handlePrevClick = () => {
        if (currentPage > 0) {
            const prevPage = currentPage - 1;
            router.push(`${pathname}?${createQueryString("page", prevPage.toString())}`);
        }
    };


    return (
        <>
            <div className="flex flex-col items-center">
                <div className="inline-flex mt-4 xs:mt-0">
                    <div dir="ltr">
                    <button
                        onClick={handlePrevClick}
                        className="pagin_button_left"
                    >
                        <svg
                            className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 5H1m0 0 4 4M1 5l4-4"
                            />
                        </svg>
                        {language === "en" ? <>Prev</> : <>Пред</>}
                    </button>
                    </div>
                    <div dir="rtl">


                        <button
                            onClick={handleNextClick}
                            className="pagin_button_right"
                        >
                            <svg
                                className="w-3.5 h-3.5 me-2 rtl:rotate-360"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                            </svg>
                            {language === "en" ? <>Next</> : <>След</>}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}