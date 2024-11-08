'use client'
import {usePathname} from "next/navigation";
import RegForm from "@/app/[lang]/(users)/register/RegForm";
import {useSelector} from "react-redux";
import {RootState} from "@/app/globalRedux/store";
import Logo from "@/app/components/Logo";
import Link from "next/link";
import React from "react";
import {LangProps} from "@/app/globalRedux/users/types";

export default function RegisterPage({params}:LangProps) {

    const {api_url} = useSelector((state: RootState) => state.posts);

    return (
        <div className="reg_adaptive">
            <div className="image_text_box">
                <div className="dsXx7">

                    <div className="h-full left-0  w-full">
                        <div className="P_V8q">

                            <img alt="image" className="object-cover h-full align-middle w-full aspect-auto"
                                 src={`${api_url}/uploads/Pinterest.jpeg`}/>
                        </div>
                    </div>
                </div>
                <div className="ImageText">
                    <div className="my-auto">
                        <p className="mb-4 Text_title text-white">{params.lang === "en" ? <>Creation starts here</> : <>Создание начинается здесь</>}</p>
                        <p className="Text_text text-white">
                            {params.lang === "en" ? <>Access 123,131 free, high-resolution photos you can`t find anywhere else</> : <>Получите доступ к 123,131 бесплатным фотографиям в высоком разрешении, которые вы больше нигде не найдете.</>}
                        </p>

                    </div>
                </div>


            </div>
            <div className="RegForm">
                <div className="text-center mb-16">

                <p className="Text_title mb-4">{params.lang === "en" ? <>Join Unsplash</> : <>Присоединись к Unsplash</>}</p>
                <p>{params.lang === "en" ? <>Already have account?</> : <>Уже есть аккаунт?</>} <Link className="LinkStyle_default" href={`/${params.lang}/login`}>{params.lang === "en" ? <>Login</> : <>Войти</>}</Link></p>
                </div>

                <RegForm lang={params.lang}/>
            </div>
        </div>
    )
}