import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "@/app/globals.css";
import Link from "next/link";
import NavBar from "@/app/components/__Header/NavBar";
import {Providers} from "@/app/globalRedux/provider";
import BottomBar from "@/app/components/BottomBar";
import Pagination from "@/app/components/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {changeTheme} from "@/app/globalRedux/posts/slice";
import {RootState} from "@/app/globalRedux/store";
import {useSearchParams} from "next/navigation";
import {ProvidersTheme} from "@/app/providers";
import CategotiesSelect from "@/app/components/__Header/__SortNav/CategotiesSelect";
import React from "react";


export const metadata: Metadata = {
    title: "Unsplash",
    description: "Unsplash Categories",
};

export default function RootLayout({
                                       children,
                                       photos
                                   }: Readonly<{
    children: React.ReactNode;
    photos: React.ReactNode;
}>) {
    return (
        // <html lang="en" suppressHydrationWarning>
        // <body>
        // <Providers>
        //     <ProvidersTheme>
        <>
            <div className="mt-40 ">
                <NavBar/>

            </div>
            {children}
            {photos}
            {/*//     </ProvidersTheme>*/}
            {/*</Providers>*/}
            <Pagination/>
            <BottomBar/>
        </>
        // {/*<p>layout 1</p>*/}
        // </body>
        // </html>
    );
}