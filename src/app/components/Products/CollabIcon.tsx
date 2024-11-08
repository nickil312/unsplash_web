import React from "react";
import Link from "next/link";

interface CollabIconProps {
    avatarurl: string;
    user_id: string;
    lang: string;
    mode: number;
}

export default function CollabIcon({avatarurl, mode, user_id,lang}: CollabIconProps) {
    return (
        <div className={mode === 1 ? "w-8 h-8 mr-4" : mode === 2 ? "w-8 h-8 " : "w-8 h-8"}>
            <div className="unsplash_collab">
                <svg className="-mt-0.5" width="18" height="18" viewBox="0 0 32 32"
                     version="1.1"
                     aria-hidden="false">
                    <desc lang="en-US">Unsplash logo</desc>
                    <path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path>
                </svg>
            </div>
            {/*<Link href={}>*/}

            <div
                className={mode === 1 ? "absolute bottom-[17px] left-3" : mode === 2 ? "absolute bottom-[2px] left-[-1px]" : "absolute "}>
                <div className="relative">
                    <Link href={`/${lang}/${user_id}`}>
                        <img
                            width={36}
                            alt={avatarurl}
                            src={avatarurl}
                            className={mode === 3 ? "rounded-full object-cover w-4 h-4 bg-EE block relative bottom-[14px] left-[-1px]" : "rounded-full object-cover w-4 h-4 bg-EE block relative"}
                        />
                    </Link>
                </div>
            </div>
            {/*</Link>*/}
        </div>
    )
}