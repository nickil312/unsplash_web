import Link from "next/link";
import {DownloadImage} from "@/app/components/Products/func/DownloadImage";

export default function DownloadHistoryLoading() {

    return(
        <div className="flex flex-row animate-pulse  items-center justify-between w-full p-4 border-b-1 border-D1 ">

                <div className="flex flex-row  justify-start ">
                    <div className="w-14 h-14  rounded bg-76"/>
                    <div className="flex flex-col  justify-center pl-4">
                        <div className="h-3 w-40 bg-76 rounded-full"></div>
                        <div className="flex flex-row  justify-start navBar_mobile_display_none">
                            <div className="h-2.5 w-32 bg-76 mt-1 rounded-full"></div>
                        </div>
                    </div>
                </div>
            <div>
                <div className="h-3 w-32 bg-76 mt-1 rounded-full"></div>
            </div>

            <div className="button_settings_style">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                     className="fill-76 w-[18px] h-[18px]">
                    <path
                        d="M10.9911 15.4012V4H13V15.4012L17.7138 11.087L19.0003 12.6256L12.0004 19L5 12.6256L6.36747 11.087L10.9911 15.4012Z"></path>
                </svg>

            </div>

        </div>
    )
}