import type {Metadata} from "next";
import React from "react";
import NavBar_Chat from "@/app/components/__Header/NavBar_Chat";

export const metadata: Metadata = {
    title: "Unsplash",
    description: "Photo/illustraion page",
};

export default function ChatsLayout({
                                               children
                                           }: Readonly<{
    children: React.ReactNode;

}>) {
    return (
        <>

            <div className="mt-20 ">
                <NavBar_Chat/>
            </div>
            <div className="mt-10">
            {children}
            </div>


        </>
    );
}
