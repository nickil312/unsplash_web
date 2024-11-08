import {useSelector} from "react-redux";
import {RootState} from "@/app/globalRedux/store";
import Link from "next/link";
import {Three_Photos} from "@/app/globalRedux/posts/types";
import {string} from "prop-types";
import React from "react";


export default function CollectionCardLoading() {

    return (
        <div className="flex  flex-col rounded-lg animate-pulse">


            <div className="flex flex-row gap-0.5 h-72">
                <div className="bg-D1 dark:bg-76 w-72 h-72 rounded-l-lg"></div>
                <div className="flex flex-col gap-0.5 ">
                    <div className="bg-D1 dark:bg-76 w-44 h-36 rounded-tr-lg"></div>
                    <div className="bg-D1 dark:bg-76 w-44 h-[142px] rounded-br-lg"></div>
                </div>
            </div>


            <p className="mt-4 h-4 w-32 rounded-sm bg-D1 dark:bg-76"></p>

            <div className="flex flex-row gap-2 ">
                <p className="mt-2 h-4 w-32 rounded-sm bg-D1 dark:bg-76"></p>
                <p className="mt-2 h-4 w-32 rounded-sm bg-D1 dark:bg-76"></p>

            </div>

        </div>
    )
}