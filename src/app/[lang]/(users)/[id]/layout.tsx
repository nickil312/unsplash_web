import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "@/app/globals.css";
import Link from "next/link";
import NavBar from "@/app/components/__Header/NavBar";
import {Providers} from "@/app/globalRedux/provider";
import {ProvidersTheme} from "@/app/providers";
import Pagination from "@/app/components/Pagination";
import BottomBar from "@/app/components/BottomBar";
import NavBar_Clear from "@/app/components/__Header/NavBar_Clear";
import UsersPage from "@/app/components/account/__ProfileData/UsersPage";
import {Locale} from "@/i18n.config";
import ToggleBD from "@/app/components/account/__Nav/ToggleBD";
import React from "react";


export const metadata: Metadata = {
    title: "User",
    description: "",
};

export default function LoginLayout({
                                        children,
                                        params,
                                        // lang
                                    }: Readonly<{
    children: React.ReactNode;
    params: {id: string}
    // lang: {lang: Locale}

}>) {

    return (
        <>

            {/*// <html lang="en" suppressHydrationWarning>*/}
            {/*// <body>*/}
            {/*// <Providers>*/}
            {/*//     <ProvidersTheme>*/}
            {/*<ToggleBD lang={lang} id={params.id} />*/}
            <UsersPage params={params}/>
            {children}
            <Pagination/>
            {/*// /!*    </ProvidersTheme>*!/*/}
            {/*// /!*</Providers>*!/*/}
            {/*// /!*<p>layout 2</p>*!/*/}
            {/*// /!*</body>*!/*/}
            {/*// /!*</html>*!/*/}
        </>
    );
}
