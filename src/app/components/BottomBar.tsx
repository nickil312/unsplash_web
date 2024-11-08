import Image from "next/image";
import React from "react";
import Logo from "@/app/components/Logo";
export default function BottomBar() {
    return (
        <div className="mx-auto mt-20">
            <div className="flex flex-wrap items-center justify-center">

            <Logo/>
            </div>
            <p className="text-center mt-8 text-black dark:text-white">Make something awesome</p>
            <p className="text-center mt-2 text-black dark:text-white">Создайте что-нибудь невероятное</p>
        </div>
    )
}

