"use client"

import {useForm} from "react-hook-form";
import Link from "next/link";
import {useDispatch} from "react-redux";
import {fetchAuth} from "@/app/globalRedux/users/asyncActions";
import {AppDispatch} from "@/app/globalRedux/store";
import {LoginData, Users} from "@/app/globalRedux/users/types";
import {useRouter} from "next/navigation";
import {useState} from "react";


export default function LoginForm({lang}: { lang: string }) {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const [error, setError] = useState(false);
    const {
        register,
        setValue,
        handleSubmit,

        formState: {errors, isValid,},

    } = useForm<LoginData>({
        defaultValues: {
            email: 'test@test.ru',
            password: '112123',
        },
    });

    const onSubmit = handleSubmit((data) => {
        console.log(data)
        dispatch(fetchAuth(data))
            // console.log(authData)
            // if (!authData) {
            //     console.log("No payload user no reg")
            // }
            .then((response) => {
                console.log(response)
                if (response.meta.requestStatus === 'rejected') {
                    console.log("Request failed")
                    setError(true);
                } else if (response.meta.requestStatus === 'fulfilled') {
                    // console.log('getted token',localStorage.getItem('token'))
                    //     сохранение токена сделано в запросе с языком так же будет
                        router.push(`/${lang}`);
                }
                // handle success response
            })
            .catch((error) => {
                console.log(error)

            })
    })

    return (
        <>

            <form onSubmit={onSubmit} className="flex flex-col text-center h-full mt-2 mb-8">
                <label className="inputStyle_title">{lang === "en" ? <>Email</> : <>Почта</>}</label>
                <input type="email" className="inputStyle"
                       {...register("email", {
                           required: true,
                           pattern: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
                       })} />
                {errors.email?.type === "pattern" && (
                    <div
                        className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-950 dark:text-red-400"
                        role="alert">
                        <svg className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <span className="sr-only">Danger</span>
                        <div className="flex flex-col items-start">
                            <span className="font-medium">{lang === "en" ? <>Ensure that these requirements are
                                met:</> : <>Убедитесь, что эти требования выполнены:</>}</span>
                            <ul className="mt-1.5 list-disc list-inside flex flex-col items-start ">
                                <li>{lang === "en" ? <>Write email in the field - Example:</> : <>Напишите почту в поле
                                    - Пример:</>} example@example.com
                                </li>
                            </ul>
                        </div>
                    </div>

                )}
                <div className="flex justify-between">
                    <label className="inputStyle_title">{lang === "en" ? <>Password</> : <>Пароль</>}</label>
                    <Link href={`/${lang}/recover_password`}
                          className="text-right mb-1 LinkStyle_default">{lang === "en" ? <>Forgot your
                        password?</> : <>Забыл свой пароль?</>}</Link>
                </div>
                <input type="password" className="inputStyle"
                       {...register("password", {required: true, minLength: 6})} />
                {errors.password?.type === "minLength" && (
                    <div
                        className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-950 dark:text-red-400"
                        role="alert">
                        <svg className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <span className="sr-only">Danger</span>
                        <div className="flex flex-col items-start">
                            <span className="font-medium">{lang === "en" ? <>Ensure that these requirements are
                                met:</> : <>Убедитесь, что эти требования выполнены:</>}</span>
                            <ul className="mt-1.5 list-disc list-inside flex flex-col items-start ">
                                <li>{lang === "en" ? <>Password minimum length 8 symbol</> : <>Минимальная длина пароля:
                                    8 символов.</>}</li>
                            </ul>
                        </div>
                    </div>
                )}
                {/*<input type="submit" value="Create" disabled={!isValid}/>*/}
                <button type="submit"
                        className="text-white bg-[#171717] hover:bg-[#222222]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium justify-center rounded-lg text-lg px-5 py-3 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 ">
                    {lang === "en" ? <>Login</> : <>Войти</>}
                </button>
                {
                    error && (

                        <div id="toast-danger"
                             className="fixed flex items-center w-full max-w-xs p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12"
                             role="alert">
                            <div
                                className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                     fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                                </svg>
                                <span className="sr-only">Error icon</span>
                            </div>
                            <div className="ms-3 text-sm font-normal">{lang === "en" ? <>Wrong password or
                                email!</> : <>Неправильный пароль или email!</>}</div>
                            <button type="button"
                                    onClick={() => setError(false)}
                                    className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 border-0 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-12 dark:hover:bg-1E"
                                    data-dismiss-target="#toast-danger" aria-label="Close">
                                <span className="sr-only">Close</span>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                     fill="none"
                                     viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                          stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                            </button>
                        </div>
                    )
                }
            </form>

        </>
    )
}