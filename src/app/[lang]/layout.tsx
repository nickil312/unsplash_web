import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "@/app/globals.css";
import Link from "next/link";
import NavBar from "@/app/components/__Header/NavBar";
import {Providers} from "@/app/globalRedux/provider";
import BottomBar from "@/app/components/BottomBar";
import Pagination from "@/app/components/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {changeTheme} from "@/app/globalRedux/posts/slice";
import {RootState} from "@/app/globalRedux/store";
import { useSearchParams} from "next/navigation";
import {ProvidersTheme} from "@/app/providers";
import {useMessages} from "next-intl";
import {NextIntlClientProvider} from "next-intl";
import {i18n, Locale} from "@/i18n.config";
import {NextUIProviders} from "@/app/NextUiProvider";
import Websocket_provider from "@/app/websocket_provider";


export const metadata: Metadata = {
    title: "Photos",
    description: "Unsplash",
};

// export type Props = {
//     children: React.ReactNode;
//     params: {
//         locale: "en" | "ru";
//     }
// }
export async function generateStaticParams() {
    return i18n.locales.map(locale => ({ lang: locale }))
}

export default function RootLayout({
                                        children,photos, params
}:{
    children: React.ReactNode
    photos: React.ReactNode
    params: {lang: Locale}
}) {


    return (
        <html lang={params.lang} suppressHydrationWarning>
        <body>
        <Providers>
            <ProvidersTheme>
                <NextUIProviders>
                    <Websocket_provider>


                {/*<NextIntlClientProvider messages={messages}>*/}
                {children}
                {photos}
                {/*</NextIntlClientProvider>*/}
                    </Websocket_provider>
                </NextUIProviders>
            </ProvidersTheme>
        </Providers>
        {/*<p>layout 1</p>*/}
        </body>
        </html>
    );
}
