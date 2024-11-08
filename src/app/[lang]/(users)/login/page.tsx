import ThemeSwitch from "@/app/components/ThemeSwitch";
import Link from "next/link";
import LoginForm from "@/app/[lang]/(users)/login/LoginForm";
import {usePathname} from "next/navigation";
import {getDictionary} from "@/lib/dictionary";
import {LangProps} from "@/app/globalRedux/users/types";

export default function RegOrLogin({params}:LangProps) {
    return (
        <main className="m-auto LoginPage_adaptive">
            <div className="flex flex-col text-center h-full">
                <div className="text-center">
                    <p className="text-3xl font-bold">{params.lang === "en" ? <>Login</> : <>Вход</>}</p>
                    <p className="text-base mt-4">{params.lang === "en" ? <>Welcome back.</> : <>Добро пожаловать.</>}</p>
                </div>
                <div className="flex flex-col text-center h-full mt-8 mb-4">
                    <button type="button"
                            className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium justify-center rounded-lg text-base px-5 py-3 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 ">
                        <svg className="w-5 h-5 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                             fill="currentColor" viewBox="0 0 18 19">
                            <path fill-rule="evenodd"
                                  d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                                  clip-rule="evenodd"/>
                        </svg>
                        {params.lang === "en" ? <>Sign in with</> : <>Войти с помощью</>} Google
                    </button>
                    <p className="my-4">{params.lang === "en" ? <>OR</> : <>ИЛИ</>}</p>
                    <LoginForm lang={params.lang}/>


                </div>
                <div
                    className="bg-white mt-auto overflow-hidden pb-10 pt-10 relative shadow-[0_0px_0px_1px_rgba(0,0,0,0.3)] dark:bg-black dark:shadow-[0_0px_0px_1px_rgba(255,255,255,0.3)] ">
                    {params.lang === "en" ? <>Don’t have an account?</> : <>Не имеете аккаунт?</>}
                    <Link className="pl-1 LinkStyle_default" href={`/${params.lang}/register`}>{params.lang === "en" ? <>Join</> : <>Присоединиться</>}</Link>
                    <svg
                        className="fill-[none] stroke-[#D1D1D1] opacity-8 stroke-[1.5] absolute pointer-events-none -bottom-[10px] left-[4%]"
                        style={{strokeLinecap: "round"}} width="182" height="86" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M43.268 1.471c-11.206.54-22.788 3.669-31.596 10.734C-1.078 22.435-2.35 39.097 9.405 51.12c11.884 12.154 32.194 17.12 48.204 12.741 4.955-1.355 19.666-8.944 13.358-16.521-6.018-7.229-21.23-5.946-28.683-3.458-6.158 2.056-11.646 6.205-12.796 12.96-2.248 13.209 7.936 25.114 17.727 32.555 16.072 12.213 35.92 19.617 55.411 23.973 19.712 4.406 42.14 6.367 61.06-1.73 6.398-2.737 11.807-7.276 16.11-12.636.399-.497 1.542-2.033 1.164-1.52"></path>
                    </svg>
                    <svg
                        className="fill-[none] stroke-[#D1D1D1] opacity-8 stroke-[1.5] absolute pointer-events-none top-0 right-[5%]"
                        style={{strokeLinecap: "round"}} width="53" height="51" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path
                                d="M13.81 47.388c-2.05-.767-4.005-1.768-5.967-2.716a64.79 64.79 0 0 0-4.025-1.792c-.063-.025-1.036-.312-.998-.456.081-.313.512-.654.71-.877 1.072-1.197 2.106-2.416 3.004-3.744 1.273-1.882 2.492-4.036 2.763-6.3"></path>
                            <path
                                d="M3 42.42c15.225-3.279 28.41-9.747 36.76-23.393C46.038 8.767 50.728-3.093 52.217-15"></path>
                        </g>
                    </svg>
                </div>

            </div>
        </main>
    )
}