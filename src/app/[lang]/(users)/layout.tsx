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


export const metadata: Metadata = {
    title: "Login/Register",
    description: "Pages to login or register",
};

export default function LoginLayout({
                                       children,
                                        photos,
                                   }: Readonly<{
    children: React.ReactNode;
    photos: React.ReactNode;
}>) {

    return (
        <>

        {/*// <html lang="en" suppressHydrationWarning>*/}
        {/*// <body>*/}
        {/*// <Providers>*/}
        {/*//     <ProvidersTheme>*/}
                 <div className="mt-40 ">
                     <NavBar_Clear />
                 </div>
                {children}
                {photos}
        {/*// /!*    </ProvidersTheme>*!/*/}
        {/*// /!*</Providers>*!/*/}
        {/*// /!*<p>layout 2</p>*!/*/}
        {/*// /!*</body>*!/*/}
        {/*// /!*</html>*!/*/}
        </>
    );
}
