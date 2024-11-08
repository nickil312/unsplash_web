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
import NavBar_Clear from "@/app/components/__Header/NavBar_Clear";
import Nav from "@/app/components/account/Nav";
import DataBaseNav from "@/app/components/__DataBase/DataBaseNav";


export const metadata: Metadata = {
    title: "Database",
    description: "Database tables",
};

export default function DataBaseLayout({
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
            <div className="mt-20 ">
                <NavBar_Clear/>

            </div>
            <div className="settings_layout_adaptive ">
                <div className="flex flex-col  justify-start w-auto px-4">
                    <DataBaseNav/>
                </div>
                <div className="w-full px-16">
                    {children}
                    {photos}

                </div>
            </div>

            {/*//     </ProvidersTheme>*/}
            {/*</Providers>*/}

        </>
        // {/*<p>layout 1</p>*/}
        // </body>
        // </html>
    );
}
