'use client'
import BottomBar from "@/app/components/BottomBar";
import BDSelect from "@/app/components/__Header/__SortNav/BDSelect";

import {usePathname} from 'next/navigation'
import {useRouter} from 'next/router';
import CategotiesSelect from "@/app/components/__Header/__SortNav/CategotiesSelect";
import {Locale} from "@/i18n.config";

export default function NavBar__BottomChange({lang}:{lang:Locale}) {
    const pathname = usePathname()

    let bottomBarOrBDSelect;
    if (pathname === '/ru' || pathname === '/en' || pathname.startsWith('/t/')) {
        console.log("1",pathname)
        bottomBarOrBDSelect = <CategotiesSelect lang={lang}/>;
    } else if (pathname.startsWith('/ru/t/') || pathname.startsWith('/en/t/')) {
        console.log("2",pathname)
        bottomBarOrBDSelect = <CategotiesSelect lang={lang}/>;
    } else if (pathname.startsWith('/s/photos/') || pathname.startsWith('/s/users/') || pathname.startsWith('/s/collections/') || pathname.startsWith('/s/illustrations/') || pathname.startsWith('/ru/s/photos/') || pathname.startsWith('/ru/s/users/') || pathname.startsWith('/ru/s/collections/') || pathname.startsWith('/ru/s/illustrations/')
        || pathname.startsWith('/en/s/photos/') || pathname.startsWith('/en/s/users/') || pathname.startsWith('/en/s/collections/') || pathname.startsWith('/en/s/illustrations/')) {
        bottomBarOrBDSelect = <BDSelect lang={lang}/>;
        console.log("3",pathname)
    }else{
        console.log("4",pathname)
    }

    // const router = useRouter();
    // const { pathname, asPath } = router;
    // const referrer = document.referrer;
    // let bottomBarOrBDSelect;
    //
    // if (referrer && (referrer.startsWith('/ru') || referrer.startsWith('/en') || referrer.startsWith('/t/'))) {
    //     // If the referrer URL starts with /ru, /en, or /t/, show the CategotiesSelect component
    //     bottomBarOrBDSelect = <CategotiesSelect lang={lang}/>;
    // } else if (referrer && (referrer.startsWith('/s/photos/') || referrer.startsWith('/s/users/') || referrer.startsWith('/s/collections/') || referrer.startsWith('/s/illustrations/') || referrer.startsWith('/ru/s/photos/') || referrer.startsWith('/ru/s/users/') || referrer.startsWith('/ru/s/collections/') || referrer.startsWith('/ru/s/illustrations/')
    //     || referrer.startsWith('/en/s/photos/') || referrer.startsWith('/en/s/users/') || referrer.startsWith('/en/s/collections/') || referrer.startsWith('/en/s/illustrations/'))) {
    //     // If the referrer URL starts with /s/photos/, /s/users/, etc., show the BDSelect component
    //     bottomBarOrBDSelect = <BDSelect lang={lang}/>;
    // } else if (pathname === '/ru' || pathname === '/en' || pathname.startsWith('/t/')) {
    //     console.log("1",pathname)
    //     bottomBarOrBDSelect = <CategotiesSelect lang={lang}/>;
    // } else if (pathname.startsWith('/ru/t/') || pathname.startsWith('/en/t/')) {
    //     console.log("2",pathname)
    //     bottomBarOrBDSelect = <CategotiesSelect lang={lang}/>;
    // } else if (pathname.startsWith('/s/photos/') || pathname.startsWith('/s/users/') || pathname.startsWith('/s/collections/') || pathname.startsWith('/s/illustrations/') || pathname.startsWith('/ru/s/photos/') || pathname.startsWith('/ru/s/users/') || pathname.startsWith('/ru/s/collections/') || pathname.startsWith('/ru/s/illustrations/')
    //     || pathname.startsWith('/en/s/photos/') || pathname.startsWith('/en/s/users/') || pathname.startsWith('/en/s/collections/') || pathname.startsWith('/en/s/illustrations/')) {
    //     bottomBarOrBDSelect = <BDSelect lang={lang}/>;
    //     console.log("3",pathname)
    // } else {
    //     console.log("4",pathname)
    // }

    return (
        <>
        {bottomBarOrBDSelect}
        </>

    )


}