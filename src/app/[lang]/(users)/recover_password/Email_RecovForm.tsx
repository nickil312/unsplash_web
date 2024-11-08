'use client'
import {useForm} from "react-hook-form";
import {EmailCheckProps, LoginData} from "@/app/globalRedux/users/types";
import {Locale} from "@/i18n.config";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/app/globalRedux/store";
import {fetchRecover_pass_CheckEmail} from "@/app/globalRedux/users/asyncActions";
import {useState} from "react";

export default function Email_RecovForm({lang}: { lang: Locale }) {

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);


    const dispatch = useDispatch<AppDispatch>();
    const {
        register,
        setValue,
        handleSubmit,

        formState: {errors, isValid,},

    } = useForm<EmailCheckProps>({
        defaultValues: {
            email: 'test@test.ru',
        },
    });

    const onSubmit = handleSubmit((data) => {
        console.log(data)
        const fulldata = {
            email: data.email,
            lang: lang
        }
        dispatch(fetchRecover_pass_CheckEmail(fulldata))
            .then((response) => {
                console.log(response)
                if (response.meta.requestStatus === 'rejected') {
                    // console.log("Request failed")
                    setError(true);
                } else if (response.meta.requestStatus === 'fulfilled') {
                    // console.log("Request fulfilled")
                    // router.push(`/${lang}`);
                    setSuccess(true);

                }
                // handle success response
            })
            .catch((error) => {
                console.log(error)

            })
    });

    return (
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
            <button type="submit"
                    className="text-white bg-[#171717] hover:bg-[#222222]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium justify-center rounded-lg text-lg px-5 py-3 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 ">
                {lang === "en" ? <>Send email to reset password</> : <>Отправить письмо для восстановления пароля</>}
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
                        <div className="ms-3 text-sm font-normal">{lang === "en" ? <>There is no account with this
                            email!</> : <>Аккаунта с такой почтой не существует!</>}</div>
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
            {

                success && (
                    <div id="toast-success"
                         className="fixed flex items-center w-full max-w-xs p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12"
                         role="alert">
                        <div
                            className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                 fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                            </svg>
                            <span className="sr-only">Check icon</span>
                        </div>
                        <div className="ms-3 text-sm font-normal">{lang === "en" ? <>A password recovery email has been sent to your email address.</> : <>Письмо для восстановления пароля отправлено на почту.</>}</div>
                        <button type="button"
                                onClick={() => setSuccess(false)}
                                className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 border-0 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-12 dark:hover:bg-1E"
                                data-dismiss-target="#toast-success" aria-label="Close">
                            <span className="sr-only">Close</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                        </button>
                    </div>
                )
            }

        </form>
    )
}