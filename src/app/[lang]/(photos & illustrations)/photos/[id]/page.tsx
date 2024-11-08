import React from "react";
import {PageNotFoundError} from "next/dist/shared/lib/utils";
import {notFound} from "next/navigation";

type DetailPostInfoProps = {
    params: {
        id: string;
    }
}
//
// async function goError(id: number) {
//     if (id === 123) {
//         console.log("ban")
//         notFound()
//     }
// }

export default function DetailPostInfo(params: DetailPostInfoProps) {
// const DetailPostInfo: React.FC<DetailPostInfoProps> = React.memo({params}) => {
    const id = params.params.id;

    console.log("detail params",params)
    // console.log(params.params.id)
    // console.log(id)
    return (
        <main>
            <div>
                DetailPostInfo - {id}
            </div>

        </main>
    );
}
// export default DetailPostInfo