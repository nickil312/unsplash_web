import type {Metadata} from "next";
import React from "react";
import NavBar_Clear from "@/app/components/__Header/NavBar_Clear";
import Banned_Nav from "@/app/components/banned/__Nav/Banned_Nav";
import Pagination from "@/app/components/Pagination";

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
                <NavBar_Clear/>
            </div>
            {children}


        </>
    );
}
