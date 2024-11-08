'use client'
import {usePathname, useSearchParams} from "next/navigation";
import Email_RecovForm from "@/app/[lang]/(users)/recover_password/Email_RecovForm";
import Link from "next/link";
import Logo from "@/app/components/Logo";
import {Locale} from "@/i18n.config";
import {LangProps, TokenCheckState} from "@/app/globalRedux/users/types";
import Pass_RecovForm from "@/app/[lang]/(users)/recover_password/Pass_RecovForm";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/app/globalRedux/store";
import {fetchRecover_pass_Get_Token} from "@/app/globalRedux/users/asyncActions";
import {useState} from "react";

// interface ResetPasswordPageProps {
//     searchParams:{ [key:string]: string | string[] | undefined }
// }
export default function Recover_PasswordPage({params}: LangProps) {
    // const pathname = usePathname();
    // const lang = pathname.split('/')[1];
    const searchParams = useSearchParams()
    const dispatch = useDispatch<AppDispatch>();
    const [request, setRequest] = useState<number>(0);

    if (searchParams.get("token")) {
        const token = searchParams.get("token");
        if (token !== null) {
            const tokenCheckState: TokenCheckState = { token: token };

            dispatch(fetchRecover_pass_Get_Token(tokenCheckState))
                .then((response) => {
                    console.log(response)
                    if (response.meta.requestStatus === 'rejected') {
                        console.log("Request failed")
                        // setError(true);
                        setRequest(2)
                    } else if (response.meta.requestStatus === 'fulfilled') {
                        console.log("Request fulfilled")
                        // router.push(`/${lang}`);
                        // setSuccess(true);
                        setRequest(1)

                    }
                    // handle success response
                })
                .catch((error) => {
                    console.log(error)

                })
            if(request === 1){
                return (
                    <div className="px-3 mx-auto max-w-[1320px]">
                        <div className="table w-full h-full">
                            <div className="table-cell align-middle">
                                <div className="-mx-3">
                                    <div className="block mx-auto Email_and_text_adaptive">


                                        <div className="text-center mb-16">
                                            {/*<Link href={`/${params.lang}/`}>*/}
                                            {/*    <Logo/>*/}
                                            {/*</Link>*/}
                                            <p className="Text_title mb-4">

                                                {params.lang === 'en' ? <>Change password.</> : <>Измените пароль.</>}

                                            </p>
                                            <p>
                                                {params.lang === 'en' ? <>Enter password to change password for your account.</> : <>Введите пароль, чтобы изменить пароль для вашей учетной записи.</>}


                                            </p>
                                        </div>
                                        <div>

                                            <Pass_RecovForm lang={params.lang}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }else if (request === 2) {
                return (
                    <div className="px-3 mx-auto max-w-[1320px]">
                        <div className="table w-full h-full">
                            <div className="table-cell align-middle">
                                <div className="-mx-3">
                                    <div className="block mx-auto Email_and_text_adaptive">


                                        <div className="text-center mb-16">
                                            {/*<Link href={`/${params.lang}/`}>*/}
                                            {/*    <Logo/>*/}
                                            {/*</Link>*/}
                                            <p className="Text_title mb-4">
                                                {params.lang === 'en' ? <>Token is invalid or expired.</> : <>Токен недействительный или просрочен.</>}
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                )
            }

        }
    } else {
        return (
            <div className="px-3 mx-auto max-w-[1320px]">
                <div className="table w-full h-full">
                    <div className="table-cell align-middle">
                        <div className="-mx-3">
                            <div className="block mx-auto Email_and_text_adaptive">


                                <div className="text-center mb-16">
                                    {/*<Link href={`/${params.lang}/`}>*/}
                                    {/*    <Logo/>*/}
                                    {/*</Link>*/}
                                    <p className="Text_title mb-4">
                                        {params.lang === 'en' ? <>Forgot your password?</> : <>Забыли пароль?</>}
                                    </p>
                                    <p>
                                        {params.lang === 'en' ? <>Enter the email address associated with your account and we’ll send you a link to reset your password.</> : <>Введите адрес электронной почты, связанный с вашей учетной записью, и мы вышлем вам ссылку для сброса пароля.</>}
                                    </p>
                                </div>
                                <div>

                                    <Email_RecovForm lang={params.lang}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}