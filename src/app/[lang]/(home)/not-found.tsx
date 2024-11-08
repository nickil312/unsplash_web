import Link from "next/link";

export default function NotFound() {
    return(

        <main className="text-center">
            <h2 className="text-3x1">There was a problem.</h2>
            <p>
                We couldn't find this page.
            </p>
            <p>Go back to the <Link href="/ts_prod/unsplash_web/public">Главное меню</Link> </p>
        </main>

    )
}