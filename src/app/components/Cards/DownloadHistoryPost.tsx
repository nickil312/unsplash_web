import {DownloadImage} from "@/app/components/Products/func/DownloadImage";
import Link from "next/link";

export default function DownloadHistoryPost({
                                                _id,
                                                title,
                                                text,
                                                imageurl,
                                                download_at,
                                                altText,
                                                lang// Add this prop
                                            }: {
    _id: string;
    title: string;
    text: string;
    imageurl: string;
    download_at: string;
    altText: string;
    lang: string// Add this prop type
}) {

    return (
        <div className="flex flex-row  items-center justify-between w-full p-4 border-b-1 border-D1 ">
            <Link href={`/${lang}/photos/${_id}`}>

            <div className="flex flex-row  justify-start ">
                <img src={imageurl} alt={title} className="w-14 h-14 object-cover rounded"/>
                <div className="flex flex-col  justify-center pl-4">
                    <p className="text-sm">{title}</p>
                    <div className="flex flex-row  justify-center navBar_mobile_display_none">
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24"
                             className="mr-1 fill-D1">
                            <path
                                d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-1-2H6l3-3.9 2.1 2.6 3-3.9L18 17z"></path>
                        </svg>
                        <p className="text-76 text-xs">{text}</p>
                    </div>
                </div>
            </div>
            </Link>
            <div>
                <p className="text-sm">{new Intl.DateTimeFormat(`${lang}`, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }).format(new Date(download_at))}</p>
            </div>

            <div className="button_settings_style cursor-pointer"
                 onClick={() => DownloadImage(imageurl, altText, _id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-76 w-[18px] h-[18px]">
                    <path
                        d="M10.9911 15.4012V4H13V15.4012L17.7138 11.087L19.0003 12.6256L12.0004 19L5 12.6256L6.36747 11.087L10.9911 15.4012Z"></path>
                </svg>

            </div>

        </div>

    )
}

/*
    <div className="flex flex-row  items-center w-full ">
        <img src={imageurl} alt={title} className="w-20 h-20 object-cover"/>
        <p>{title}</p>
        <p>{text}</p>
        <p>{download_at}</p>
    </div>
*/