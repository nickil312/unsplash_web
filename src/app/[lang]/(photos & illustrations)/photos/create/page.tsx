import CreateForm from "@/app/[lang]/(photos & illustrations)/photos/create/CreateForm";

export default function CreatePost(){
    return(
        <main>
            <h2 className="text-primary text-center">Add a new Post</h2>
            <CreateForm pageModalStatus={false}/>
        </main>
    )
}