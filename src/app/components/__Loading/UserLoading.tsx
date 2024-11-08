import React from "react";

export default function UserLoading() {
    return (
        <div className="grid grid-cols-3 gap-6 "
             style={{gridTemplateColumns: 'repeat(auto-fill, minmax(362px, 1fr))'}}>
            <div className={` col-span-1 w-full`}>
                <div
                    className="p-4 gap-4 content-between border-2 rounded-md	 grid grid-flow-row	search_user_box_theme_change  ">
                    <div className="flex items-center">
                        <a className="items-center flex grow mr-2">
                            <div className="mr-4">
                                <div className="OSAWo">
                                    <div className="Y7nba">

                                        {/*<img className="rounded-full" src={avatarurl} width="80" height="80"/>*/}
                                        {/*<Image src={avatarurl} alt={fullname} width="64" height="64" />*/}
                                        <svg className="w-20 h-20  text-[#D1D1D1] rounded dark:text-[#767676]"
                                             aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                             viewBox="0 0 20 20">
                                            <path
                                                d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                                        </svg>

                                    </div>
                                </div>
                            </div>
                            <div role="status" className="max-w-sm animate-pulse">
                                <div className="h-6 w-20 px-1.5 mb-1  bg-[#D1D1D1] rounded dark:bg-[#767676] "></div>

                                <div className="flex items-center flex-row ">

                                    <div className="h-6 w-16 px-1.5  bg-[#D1D1D1] rounded dark:bg-[#767676] "></div>
                                    <div
                                        className="ml-1 h-6 w-16 px-1.5  bg-[#D1D1D1] rounded dark:bg-[#767676] "></div>


                                </div>
                                {/*<p className="Xjtbn FEdrY N46Vv">{fullname}</p>*/}
                            </div>

                        </a>
                        <button type="button"
                                className="   text-base w-14 h-8 font-medium text-center text-white bg-[#027DFA] rounded-lg hover:bg-[#006AFF] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Hire
                        </button>

                    </div>
                    <a>
                        <div className="flex animate-pulse">

                            <div className="flex-1 aspect-[4/3] mr-2">
                                <div className="bg-[#D1D1D1] dark:bg-[#767676]">
                                    <div className="HcSeS">
                                        <div className="bg-yellow-950"></div>
                                        <div
                                            className="aspect-[4/3] object-cover vertical-align: middle;"/>
                                    </div>
                                </div>

                            </div>
                            <div className="flex-1 aspect-[4/3] mr-2">
                                <div className="bg-[#D1D1D1] dark:bg-[#767676]">
                                    <div className="HcSeS">
                                        <div className="bg-yellow-950"></div>
                                        <div
                                            className="aspect-[4/3] object-cover vertical-align: middle;"/>
                                    </div>
                                </div>

                            </div>
                            <div className="flex-1 aspect-[4/3] ">
                                <div className="bg-[#D1D1D1] dark:bg-[#767676]">
                                    <div className="HcSeS">
                                        <div className="bg-yellow-950"></div>
                                        <div
                                            className="aspect-[4/3] object-cover vertical-align: middle;"/>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </a>
                    <a className="border-2 rounded-md text-center h-8 text-lg search_user_box_theme_change text-[#767676] hover:text-[#111111] dark:text-[#767676] dark:hover:text-white"
                    >View profile</a>
                </div>
            </div>
            <div className={` col-span-1 w-full`}>
                <div
                    className="p-4 gap-4 content-between border-2 rounded-md	 grid grid-flow-row	search_user_box_theme_change  ">
                    <div className="flex items-center">
                        <a className="items-center flex grow mr-2">
                            <div className="mr-4">
                                <div className="OSAWo">
                                    <div className="Y7nba">

                                        {/*<img className="rounded-full" src={avatarurl} width="80" height="80"/>*/}
                                        {/*<Image src={avatarurl} alt={fullname} width="64" height="64" />*/}
                                        <svg className="w-20 h-20  text-[#D1D1D1] rounded dark:text-[#767676]"
                                             aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                             viewBox="0 0 20 20">
                                            <path
                                                d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                                        </svg>

                                    </div>
                                </div>
                            </div>
                            <div role="status" className="max-w-sm animate-pulse">
                                <div className="h-6 w-20 px-1.5 mb-1  bg-[#D1D1D1] rounded dark:bg-[#767676] "></div>

                                <div className="flex items-center flex-row ">

                                    <div className="h-6 w-16 px-1.5  bg-[#D1D1D1] rounded dark:bg-[#767676] "></div>
                                    <div
                                        className="ml-1 h-6 w-16 px-1.5  bg-[#D1D1D1] rounded dark:bg-[#767676] "></div>


                                </div>
                                {/*<p className="Xjtbn FEdrY N46Vv">{fullname}</p>*/}
                            </div>

                        </a>
                        <button type="button"
                                className="   text-base w-14 h-8 font-medium text-center text-white bg-[#027DFA] rounded-lg hover:bg-[#006AFF] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Hire
                        </button>

                    </div>
                    <a>
                        <div className="flex animate-pulse">

                            <div className="flex-1 aspect-[4/3] mr-2">
                                <div className="bg-[#D1D1D1] dark:bg-[#767676]">
                                    <div className="HcSeS">
                                        <div className="bg-yellow-950"></div>
                                        <div
                                            className="aspect-[4/3] object-cover vertical-align: middle;"/>
                                    </div>
                                </div>

                            </div>
                            <div className="flex-1 aspect-[4/3] mr-2">
                                <div className="bg-[#D1D1D1] dark:bg-[#767676]">
                                    <div className="HcSeS">
                                        <div className="bg-yellow-950"></div>
                                        <div
                                            className="aspect-[4/3] object-cover vertical-align: middle;"/>
                                    </div>
                                </div>

                            </div>
                            <div className="flex-1 aspect-[4/3] ">
                                <div className="bg-[#D1D1D1] dark:bg-[#767676]">
                                    <div className="HcSeS">
                                        <div className="bg-yellow-950"></div>
                                        <div
                                            className="aspect-[4/3] object-cover vertical-align: middle;"/>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </a>
                    <a className="border-2 rounded-md text-center h-8 text-lg search_user_box_theme_change text-[#767676] hover:text-[#111111] dark:text-[#767676] dark:hover:text-white"
                    >View profile</a>
                </div>
            </div>
            <div className={` col-span-1 w-full`}>
                <div
                    className="p-4 gap-4 content-between border-2 rounded-md	 grid grid-flow-row	search_user_box_theme_change  ">
                    <div className="flex items-center">
                        <a className="items-center flex grow mr-2">
                            <div className="mr-4">
                                <div className="OSAWo">
                                    <div className="Y7nba">

                                        {/*<img className="rounded-full" src={avatarurl} width="80" height="80"/>*/}
                                        {/*<Image src={avatarurl} alt={fullname} width="64" height="64" />*/}
                                        <svg className="w-20 h-20  text-[#D1D1D1] rounded dark:text-[#767676]"
                                             aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                             viewBox="0 0 20 20">
                                            <path
                                                d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                                        </svg>

                                    </div>
                                </div>
                            </div>
                            <div role="status" className="max-w-sm animate-pulse">
                                <div className="h-6 w-20 px-1.5 mb-1  bg-[#D1D1D1] rounded dark:bg-[#767676] "></div>

                                <div className="flex items-center flex-row ">

                                    <div className="h-6 w-16 px-1.5  bg-[#D1D1D1] rounded dark:bg-[#767676] "></div>
                                    <div
                                        className="ml-1 h-6 w-16 px-1.5  bg-[#D1D1D1] rounded dark:bg-[#767676] "></div>


                                </div>
                                {/*<p className="Xjtbn FEdrY N46Vv">{fullname}</p>*/}
                            </div>

                        </a>
                        <button type="button"
                                className="   text-base w-14 h-8 font-medium text-center text-white bg-[#027DFA] rounded-lg hover:bg-[#006AFF] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Hire
                        </button>

                    </div>
                    <a>
                        <div className="flex animate-pulse">

                            <div className="flex-1 aspect-[4/3] mr-2">
                                <div className="bg-[#D1D1D1] dark:bg-[#767676]">
                                    <div className="HcSeS">
                                        <div className="bg-yellow-950"></div>
                                        <div
                                            className="aspect-[4/3] object-cover vertical-align: middle;"/>
                                    </div>
                                </div>

                            </div>
                            <div className="flex-1 aspect-[4/3] mr-2">
                                <div className="bg-[#D1D1D1] dark:bg-[#767676]">
                                    <div className="HcSeS">
                                        <div className="bg-yellow-950"></div>
                                        <div
                                            className="aspect-[4/3] object-cover vertical-align: middle;"/>
                                    </div>
                                </div>

                            </div>
                            <div className="flex-1 aspect-[4/3] ">
                                <div className="bg-[#D1D1D1] dark:bg-[#767676]">
                                    <div className="HcSeS">
                                        <div className="bg-yellow-950"></div>
                                        <div
                                            className="aspect-[4/3] object-cover vertical-align: middle;"/>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </a>
                    <a className="border-2 rounded-md text-center h-8 text-lg search_user_box_theme_change text-[#767676] hover:text-[#111111] dark:text-[#767676] dark:hover:text-white"
                    >View profile</a>
                </div>
            </div>
            <div className={` col-span-1 w-full`}>
                <div
                    className="p-4 gap-4 content-between border-2 rounded-md	 grid grid-flow-row	search_user_box_theme_change  ">
                    <div className="flex items-center">
                        <a className="items-center flex grow mr-2">
                            <div className="mr-4">
                                <div className="OSAWo">
                                    <div className="Y7nba">

                                        {/*<img className="rounded-full" src={avatarurl} width="80" height="80"/>*/}
                                        {/*<Image src={avatarurl} alt={fullname} width="64" height="64" />*/}
                                        <svg className="w-20 h-20  text-[#D1D1D1] rounded dark:text-[#767676]"
                                             aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                             viewBox="0 0 20 20">
                                            <path
                                                d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                                        </svg>

                                    </div>
                                </div>
                            </div>
                            <div role="status" className="max-w-sm animate-pulse">
                                <div className="h-6 w-20 px-1.5 mb-1  bg-[#D1D1D1] rounded dark:bg-[#767676] "></div>

                                <div className="flex items-center flex-row ">

                                    <div className="h-6 w-16 px-1.5  bg-[#D1D1D1] rounded dark:bg-[#767676] "></div>
                                    <div
                                        className="ml-1 h-6 w-16 px-1.5  bg-[#D1D1D1] rounded dark:bg-[#767676] "></div>


                                </div>
                                {/*<p className="Xjtbn FEdrY N46Vv">{fullname}</p>*/}
                            </div>

                        </a>
                        <button type="button"
                                className="   text-base w-14 h-8 font-medium text-center text-white bg-[#027DFA] rounded-lg hover:bg-[#006AFF] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Hire
                        </button>

                    </div>
                    <a>
                        <div className="flex animate-pulse">

                            <div className="flex-1 aspect-[4/3] mr-2">
                                <div className="bg-[#D1D1D1] dark:bg-[#767676]">
                                    <div className="HcSeS">
                                        <div className="bg-yellow-950"></div>
                                        <div
                                            className="aspect-[4/3] object-cover vertical-align: middle;"/>
                                    </div>
                                </div>

                            </div>
                            <div className="flex-1 aspect-[4/3] mr-2">
                                <div className="bg-[#D1D1D1] dark:bg-[#767676]">
                                    <div className="HcSeS">
                                        <div className="bg-yellow-950"></div>
                                        <div
                                            className="aspect-[4/3] object-cover vertical-align: middle;"/>
                                    </div>
                                </div>

                            </div>
                            <div className="flex-1 aspect-[4/3] ">
                                <div className="bg-[#D1D1D1] dark:bg-[#767676]">
                                    <div className="HcSeS">
                                        <div className="bg-yellow-950"></div>
                                        <div
                                            className="aspect-[4/3] object-cover vertical-align: middle;"/>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </a>
                    <a className="border-2 rounded-md text-center h-8 text-lg search_user_box_theme_change text-[#767676] hover:text-[#111111] dark:text-[#767676] dark:hover:text-white"
                    >View profile</a>
                </div>
            </div>
            <div className={` col-span-1 w-full`}>
                <div
                    className="p-4 gap-4 content-between border-2 rounded-md	 grid grid-flow-row	search_user_box_theme_change  ">
                    <div className="flex items-center">
                        <a className="items-center flex grow mr-2">
                            <div className="mr-4">
                                <div className="OSAWo">
                                    <div className="Y7nba">

                                        {/*<img className="rounded-full" src={avatarurl} width="80" height="80"/>*/}
                                        {/*<Image src={avatarurl} alt={fullname} width="64" height="64" />*/}
                                        <svg className="w-20 h-20  text-[#D1D1D1] rounded dark:text-[#767676]"
                                             aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                             viewBox="0 0 20 20">
                                            <path
                                                d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                                        </svg>

                                    </div>
                                </div>
                            </div>
                            <div role="status" className="max-w-sm animate-pulse">
                                <div className="h-6 w-20 px-1.5 mb-1  bg-[#D1D1D1] rounded dark:bg-[#767676] "></div>

                                <div className="flex items-center flex-row ">

                                    <div className="h-6 w-16 px-1.5  bg-[#D1D1D1] rounded dark:bg-[#767676] "></div>
                                    <div
                                        className="ml-1 h-6 w-16 px-1.5  bg-[#D1D1D1] rounded dark:bg-[#767676] "></div>


                                </div>
                                {/*<p className="Xjtbn FEdrY N46Vv">{fullname}</p>*/}
                            </div>

                        </a>
                        <button type="button"
                                className="   text-base w-14 h-8 font-medium text-center text-white bg-[#027DFA] rounded-lg hover:bg-[#006AFF] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Hire
                        </button>

                    </div>
                    <a>
                        <div className="flex animate-pulse">

                            <div className="flex-1 aspect-[4/3] mr-2">
                                <div className="bg-[#D1D1D1] dark:bg-[#767676]">
                                    <div className="HcSeS">
                                        <div className="bg-yellow-950"></div>
                                        <div
                                            className="aspect-[4/3] object-cover vertical-align: middle;"/>
                                    </div>
                                </div>

                            </div>
                            <div className="flex-1 aspect-[4/3] mr-2">
                                <div className="bg-[#D1D1D1] dark:bg-[#767676]">
                                    <div className="HcSeS">
                                        <div className="bg-yellow-950"></div>
                                        <div
                                            className="aspect-[4/3] object-cover vertical-align: middle;"/>
                                    </div>
                                </div>

                            </div>
                            <div className="flex-1 aspect-[4/3] ">
                                <div className="bg-[#D1D1D1] dark:bg-[#767676]">
                                    <div className="HcSeS">
                                        <div className="bg-yellow-950"></div>
                                        <div
                                            className="aspect-[4/3] object-cover vertical-align: middle;"/>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </a>
                    <a className="border-2 rounded-md text-center h-8 text-lg search_user_box_theme_change text-[#767676] hover:text-[#111111] dark:text-[#767676] dark:hover:text-white"
                    >View profile</a>
                </div>
            </div>
            <div className={` col-span-1 w-full`}>
                <div
                    className="p-4 gap-4 content-between border-2 rounded-md	 grid grid-flow-row	search_user_box_theme_change  ">
                    <div className="flex items-center">
                        <a className="items-center flex grow mr-2">
                            <div className="mr-4">
                                <div className="OSAWo">
                                    <div className="Y7nba">

                                        {/*<img className="rounded-full" src={avatarurl} width="80" height="80"/>*/}
                                        {/*<Image src={avatarurl} alt={fullname} width="64" height="64" />*/}
                                        <svg className="w-20 h-20  text-[#D1D1D1] rounded dark:text-[#767676]"
                                             aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                             viewBox="0 0 20 20">
                                            <path
                                                d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                                        </svg>

                                    </div>
                                </div>
                            </div>
                            <div role="status" className="max-w-sm animate-pulse">
                                <div className="h-6 w-20 px-1.5 mb-1  bg-[#D1D1D1] rounded dark:bg-[#767676] "></div>

                                <div className="flex items-center flex-row ">

                                    <div className="h-6 w-16 px-1.5  bg-[#D1D1D1] rounded dark:bg-[#767676] "></div>
                                    <div
                                        className="ml-1 h-6 w-16 px-1.5  bg-[#D1D1D1] rounded dark:bg-[#767676] "></div>


                                </div>
                                {/*<p className="Xjtbn FEdrY N46Vv">{fullname}</p>*/}
                            </div>

                        </a>
                        <button type="button"
                                className="   text-base w-14 h-8 font-medium text-center text-white bg-[#027DFA] rounded-lg hover:bg-[#006AFF] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Hire
                        </button>

                    </div>
                    <a>
                        <div className="flex animate-pulse">

                            <div className="flex-1 aspect-[4/3] mr-2">
                                <div className="bg-[#D1D1D1] dark:bg-[#767676]">
                                    <div className="HcSeS">
                                        <div className="bg-yellow-950"></div>
                                        <div
                                            className="aspect-[4/3] object-cover vertical-align: middle;"/>
                                    </div>
                                </div>

                            </div>
                            <div className="flex-1 aspect-[4/3] mr-2">
                                <div className="bg-[#D1D1D1] dark:bg-[#767676]">
                                    <div className="HcSeS">
                                        <div className="bg-yellow-950"></div>
                                        <div
                                            className="aspect-[4/3] object-cover vertical-align: middle;"/>
                                    </div>
                                </div>

                            </div>
                            <div className="flex-1 aspect-[4/3] ">
                                <div className="bg-[#D1D1D1] dark:bg-[#767676]">
                                    <div className="HcSeS">
                                        <div className="bg-yellow-950"></div>
                                        <div
                                            className="aspect-[4/3] object-cover vertical-align: middle;"/>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </a>
                    <a className="border-2 rounded-md text-center h-8 text-lg search_user_box_theme_change text-[#767676] hover:text-[#111111] dark:text-[#767676] dark:hover:text-white"
                    >View profile</a>
                </div>
            </div>
            <div className={` col-span-1 w-full`}>
                <div
                    className="p-4 gap-4 content-between border-2 rounded-md	 grid grid-flow-row	search_user_box_theme_change  ">
                    <div className="flex items-center">
                        <a className="items-center flex grow mr-2">
                            <div className="mr-4">
                                <div className="OSAWo">
                                    <div className="Y7nba">

                                        {/*<img className="rounded-full" src={avatarurl} width="80" height="80"/>*/}
                                        {/*<Image src={avatarurl} alt={fullname} width="64" height="64" />*/}
                                        <svg className="w-20 h-20  text-[#D1D1D1] rounded dark:text-[#767676]"
                                             aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                             viewBox="0 0 20 20">
                                            <path
                                                d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                                        </svg>

                                    </div>
                                </div>
                            </div>
                            <div role="status" className="max-w-sm animate-pulse">
                                <div className="h-6 w-20 px-1.5 mb-1  bg-[#D1D1D1] rounded dark:bg-[#767676] "></div>

                                <div className="flex items-center flex-row ">

                                    <div className="h-6 w-16 px-1.5  bg-[#D1D1D1] rounded dark:bg-[#767676] "></div>
                                    <div
                                        className="ml-1 h-6 w-16 px-1.5  bg-[#D1D1D1] rounded dark:bg-[#767676] "></div>


                                </div>
                                {/*<p className="Xjtbn FEdrY N46Vv">{fullname}</p>*/}
                            </div>

                        </a>
                        <button type="button"
                                className="   text-base w-14 h-8 font-medium text-center text-white bg-[#027DFA] rounded-lg hover:bg-[#006AFF] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Hire
                        </button>

                    </div>
                    <a>
                        <div className="flex animate-pulse">

                            <div className="flex-1 aspect-[4/3] mr-2">
                                <div className="bg-[#D1D1D1] dark:bg-[#767676]">
                                    <div className="HcSeS">
                                        <div className="bg-yellow-950"></div>
                                        <div
                                            className="aspect-[4/3] object-cover vertical-align: middle;"/>
                                    </div>
                                </div>

                            </div>
                            <div className="flex-1 aspect-[4/3] mr-2">
                                <div className="bg-[#D1D1D1] dark:bg-[#767676]">
                                    <div className="HcSeS">
                                        <div className="bg-yellow-950"></div>
                                        <div
                                            className="aspect-[4/3] object-cover vertical-align: middle;"/>
                                    </div>
                                </div>

                            </div>
                            <div className="flex-1 aspect-[4/3] ">
                                <div className="bg-[#D1D1D1] dark:bg-[#767676]">
                                    <div className="HcSeS">
                                        <div className="bg-yellow-950"></div>
                                        <div
                                            className="aspect-[4/3] object-cover vertical-align: middle;"/>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </a>
                    <a className="border-2 rounded-md text-center h-8 text-lg search_user_box_theme_change text-[#767676] hover:text-[#111111] dark:text-[#767676] dark:hover:text-white"
                    >View profile</a>
                </div>
            </div>
            <div className={` col-span-1 w-full`}>
                <div
                    className="p-4 gap-4 content-between border-2 rounded-md	 grid grid-flow-row	search_user_box_theme_change  ">
                    <div className="flex items-center">
                        <a className="items-center flex grow mr-2">
                            <div className="mr-4">
                                <div className="OSAWo">
                                    <div className="Y7nba">

                                        {/*<img className="rounded-full" src={avatarurl} width="80" height="80"/>*/}
                                        {/*<Image src={avatarurl} alt={fullname} width="64" height="64" />*/}
                                        <svg className="w-20 h-20  text-[#D1D1D1] rounded dark:text-[#767676]"
                                             aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                             viewBox="0 0 20 20">
                                            <path
                                                d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                                        </svg>

                                    </div>
                                </div>
                            </div>
                            <div role="status" className="max-w-sm animate-pulse">
                                <div className="h-6 w-20 px-1.5 mb-1  bg-[#D1D1D1] rounded dark:bg-[#767676] "></div>

                                <div className="flex items-center flex-row ">

                                    <div className="h-6 w-16 px-1.5  bg-[#D1D1D1] rounded dark:bg-[#767676] "></div>
                                    <div
                                        className="ml-1 h-6 w-16 px-1.5  bg-[#D1D1D1] rounded dark:bg-[#767676] "></div>


                                </div>
                                {/*<p className="Xjtbn FEdrY N46Vv">{fullname}</p>*/}
                            </div>

                        </a>
                        <button type="button"
                                className="   text-base w-14 h-8 font-medium text-center text-white bg-[#027DFA] rounded-lg hover:bg-[#006AFF] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Hire
                        </button>

                    </div>
                    <a>
                        <div className="flex animate-pulse">

                            <div className="flex-1 aspect-[4/3] mr-2">
                                <div className="bg-[#D1D1D1] dark:bg-[#767676]">
                                    <div className="HcSeS">
                                        <div className="bg-yellow-950"></div>
                                        <div
                                            className="aspect-[4/3] object-cover vertical-align: middle;"/>
                                    </div>
                                </div>

                            </div>
                            <div className="flex-1 aspect-[4/3] mr-2">
                                <div className="bg-[#D1D1D1] dark:bg-[#767676]">
                                    <div className="HcSeS">
                                        <div className="bg-yellow-950"></div>
                                        <div
                                            className="aspect-[4/3] object-cover vertical-align: middle;"/>
                                    </div>
                                </div>

                            </div>
                            <div className="flex-1 aspect-[4/3] ">
                                <div className="bg-[#D1D1D1] dark:bg-[#767676]">
                                    <div className="HcSeS">
                                        <div className="bg-yellow-950"></div>
                                        <div
                                            className="aspect-[4/3] object-cover vertical-align: middle;"/>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </a>
                    <a className="border-2 rounded-md text-center h-8 text-lg search_user_box_theme_change text-[#767676] hover:text-[#111111] dark:text-[#767676] dark:hover:text-white"
                    >View profile</a>
                </div>
            </div>
            <div className={` col-span-1 w-full`}>
                <div
                    className="p-4 gap-4 content-between border-2 rounded-md	 grid grid-flow-row	search_user_box_theme_change  ">
                    <div className="flex items-center">
                        <a className="items-center flex grow mr-2">
                            <div className="mr-4">
                                <div className="OSAWo">
                                    <div className="Y7nba">

                                        {/*<img className="rounded-full" src={avatarurl} width="80" height="80"/>*/}
                                        {/*<Image src={avatarurl} alt={fullname} width="64" height="64" />*/}
                                        <svg className="w-20 h-20  text-[#D1D1D1] rounded dark:text-[#767676]"
                                             aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                             viewBox="0 0 20 20">
                                            <path
                                                d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                                        </svg>

                                    </div>
                                </div>
                            </div>
                            <div role="status" className="max-w-sm animate-pulse">
                                <div className="h-6 w-20 px-1.5 mb-1  bg-[#D1D1D1] rounded dark:bg-[#767676] "></div>

                                <div className="flex items-center flex-row ">

                                    <div className="h-6 w-16 px-1.5  bg-[#D1D1D1] rounded dark:bg-[#767676] "></div>
                                    <div
                                        className="ml-1 h-6 w-16 px-1.5  bg-[#D1D1D1] rounded dark:bg-[#767676] "></div>


                                </div>
                                {/*<p className="Xjtbn FEdrY N46Vv">{fullname}</p>*/}
                            </div>

                        </a>
                        <button type="button"
                                className="   text-base w-14 h-8 font-medium text-center text-white bg-[#027DFA] rounded-lg hover:bg-[#006AFF] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Hire
                        </button>

                    </div>
                    <a>
                        <div className="flex animate-pulse">

                            <div className="flex-1 aspect-[4/3] mr-2">
                                <div className="bg-[#D1D1D1] dark:bg-[#767676]">
                                    <div className="HcSeS">
                                        <div className="bg-yellow-950"></div>
                                        <div
                                            className="aspect-[4/3] object-cover vertical-align: middle;"/>
                                    </div>
                                </div>

                            </div>
                            <div className="flex-1 aspect-[4/3] mr-2">
                                <div className="bg-[#D1D1D1] dark:bg-[#767676]">
                                    <div className="HcSeS">
                                        <div className="bg-yellow-950"></div>
                                        <div
                                            className="aspect-[4/3] object-cover vertical-align: middle;"/>
                                    </div>
                                </div>

                            </div>
                            <div className="flex-1 aspect-[4/3] ">
                                <div className="bg-[#D1D1D1] dark:bg-[#767676]">
                                    <div className="HcSeS">
                                        <div className="bg-yellow-950"></div>
                                        <div
                                            className="aspect-[4/3] object-cover vertical-align: middle;"/>
                                    </div>
                                </div>

                            </div>


                        </div>
                    </a>
                    <a className="border-2 rounded-md text-center h-8 text-lg search_user_box_theme_change text-[#767676] hover:text-[#111111] dark:text-[#767676] dark:hover:text-white"
                    >View profile</a>
                </div>
            </div>
        </div>
    )
}