// @ts-ignore
import {saveAs} from 'file-saver';
import axios from "@/app/axois";
import {DownloadHistoryPost} from "@/app/globalRedux/users/types";

export const DownloadImage = (imageUrl:string,altText:string,_id:string) => {
    // imageUrl - `${api_url}/${post.imageurl}`
    // altText - post.imageurl
    // _Id - post._id
    const fullImage = imageUrl.replace(/\/down/g, '');
    console.log(fullImage)
    const filename = altText.replace(/^.*\//, "");
    console.log(filename)
    saveAs(fullImage, filename)
    const values = {
        _id:_id
    }
    // добавление поста в историю скачивания
    axios.post<DownloadHistoryPost>(`/userpostgresql/auth/downloadHistory`,values)

}