import axios from "@/app/axois";
import {Posts} from "@/app/globalRedux/posts/types";

export default function LikeDisChange({likeValue,_id}: {likeValue:boolean,_id:string}) {
    if (likeValue) {
        axios.patch<Posts>(`/postgresql/posts/dislike/${_id}`);
        console.log('dislike post')
        return false;
    }else if(!likeValue){
        // console.log(_id)
        axios.patch<Posts>(`/postgresql/posts/like/${_id}`);
        console.log('like post')
        return true;
    }
}