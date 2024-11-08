type DetailChatsProps = {
    params: {
        id: string;
    }
}
export default function ChatsDetail(params: DetailChatsProps){
    const id = params.params.id;

    return(
        <p>chat messanger - {id}</p>
    )
}