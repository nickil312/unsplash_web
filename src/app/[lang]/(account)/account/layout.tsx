import type {Metadata} from "next";
import "@/app/globals.css";
import React from "react";
import NavBar_Clear from "@/app/components/__Header/NavBar_Clear";
import Nav from "@/app/components/account/Nav";


export const metadata: Metadata = {
    title: "Profile",
    description: "Account Profile Settings",
};

export default function AccountLayout({
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
                <div className="flex flex-col  justify-start w-1/4 px-4">
                    <Nav/>
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
