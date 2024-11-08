'use client'
import UpdateForm from "@/app/[lang]/(photos & illustrations)/photos/[id]/update/UpdateForm";
type DetailPostInfoProps = {
    params: {
        id: string;
    }
}
// TODO: UpdateDunction
export default function UpdatePost(params: DetailPostInfoProps){
    // @ts-ignore
    // const { id } = useRouter(); // assuming you're using Next.js' `useRouter` hook


    return(
        <main>
            <h2 className="text-primary text-center">Update post</h2>
            <UpdateForm params={params.params} />
        </main>
    )
}