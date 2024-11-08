import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "@/app/globals.css";
import Link from "next/link";
import NavBar from "@/app/components/__Header/NavBar";
import {Providers} from "@/app/globalRedux/provider";
import {ProvidersTheme} from "@/app/providers";
import React from "react";
import {Locale} from "@/i18n.config";
import NavBar_Clear from "@/app/components/__Header/NavBar_Clear";
import Pagination from "@/app/components/Pagination";
import Banned_Nav from "@/app/components/banned/__Nav/Banned_Nav";


export const metadata: Metadata = {
    title: "Unsplash",
    description: "Photo/illustraion page",
};

export default function PhotosBannedLayout({
                                         children
                                     }: Readonly<{
    children: React.ReactNode;

}>) {
    // console.log("photos layout");
    return (
        <>
            {/*// <html lang="en" suppressHydrationWarning>*/}
            {/*// <body>*/}
            {/*// <Providers>*/}
            {/*//   <ProvidersTheme>*/}
            <div className="mt-20 ">
                <NavBar_Clear/>

            </div>
            <Banned_Nav/>
            {children}
            <Pagination/>


            {/*//   </ProvidersTheme>*/}
            {/*// </Providers>*/}
            {/*//*/}
            {/*// </body>*/}
            {/*// </html>*/}
        </>
    );
}
