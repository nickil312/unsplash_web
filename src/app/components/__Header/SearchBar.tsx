'use client';
import React, {ChangeEvent, useCallback, useState} from "react";
import {redirect, useRouter, useSearchParams} from "next/navigation";
import {Locale} from "@/i18n.config";

export default function SearchBar({lang}:{lang:Locale}) {
    const router = useRouter()
    const searchParams = useSearchParams();

    const [value, setValue] = useState('');

    const searchHandler =  (event: ChangeEvent<HTMLInputElement>) => {
        const {target} = event;
        setValue(target.value);

        // console.log(value)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key ==='Enter'){
            console.log("Enter",value)
            const trimmedValue = value.trim(); // remove leading and trailing whitespace
            if (trimmedValue === '' || trimmedValue.includes('  ')) { // check for empty or multiple spaces
                alert('Please fill in the search field');
            }else{
                // createQueryString("page")
                // router.push(`?${createQueryString("page", "0")}`);
                const searchValue = trimmedValue.replace(/^\s+|\s+$/g, ''); // remove leading and trailing whitespace, but preserve spaces between words
                // const searchValue = trimmedValue.replace(/\s+/g, ''); // remove all spaces
                router.push(`/${lang}/s/photos/${searchValue}/?${createQueryString("page", "0")}`)
            }
            // console.log(value)
            // console.log(`/s/photos/${value}`)

            // redirect(`/s/photos/${value}`)
        }
    }
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );
    return (
        <div className="h-10 w-3/12 ml-5 mr-5 search_adaptive">

            <div
                className="w-full rounded-full bg-[#EEEEEE] dark:bg-12 hover:bg-[#E7E7E7] transition duration-200 ease-in-out ">
                <div className="relative flex w-full  items-stretch">
        <span
            className="input-group-text flex items-center  whitespace-nowrap rounded-full pl-4 pt-1  text-center text-base font-normal"
            id="basic-addon2">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#767676" // default color
              width="24"
              height="24"
              className=" h-5 w-5 hover:fill-black transition duration-200 ease-in-out" // hover color
          >
            <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
            />
          </svg>
        </span>
                    <input
                        type="search"
                        className="relative m-0 block search_input_adaptive  flex-auto rounded-full placeholder-[#767676] bg-transparent pr-3 pl-2 py-2  text-base  text-black dark:text-white outline-none"
                        // placeholder={value}
                        placeholder={lang === 'en' ? "Search photos" : "Поиск фото"}
                        aria-label="Searchas"
                        aria-describedby="button-addon2"
                        onChange={searchHandler}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </div>
        </div>
    );
}