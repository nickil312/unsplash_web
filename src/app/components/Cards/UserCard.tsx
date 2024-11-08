import Image from "next/image";
import {useSelector} from "react-redux";
import {RootState} from "@/app/globalRedux/store";
import Link from "next/link";

interface Three_Photos {
    imageurl: string;
}

interface UserProps {

    _id: string,
    fullname: string,
    avatarurl: string,
    user_role_id: number,
    banned: boolean,
    last_three_posts: Three_Photos[] | null
    lang: string
    user_id: number,
    hirevalue: boolean | null,
}

export default function UserCard({
                                     _id,
                                     fullname,
                                     avatarurl,
                                     user_role_id,
                                     banned,
                                     last_three_posts,
                                     lang,
                                     user_id,
                                     hirevalue
                                 }: UserProps) {
    const {api_url} = useSelector((state: RootState) => state.posts);

    if (last_three_posts !== null) {
        //
        // console.log(last_three_posts[0]);
        // console.log("user_id",user_id)
    }
    // console.log("hirevalue", hirevalue)

    return (
        <>

            <div
                className="p-4 gap-4 content-between border-2 rounded-md	 grid grid-flow-row	search_user_box_theme_change  ">
                <div className="flex items-center">
                    <div className="items-center flex grow mr-2">
                        <div className="mr-4">
                            <div className="OSAWo">
                                <div className="Y7nba">
                                    <img className="rounded-full h-20 object-cover" src={avatarurl} width="80"
                                         height="80"/>
                                    {/*<Image src={avatarurl} alt={fullname} width="64" height="64" />*/}

                                </div>
                            </div>
                        </div>
                        <div className="HFlcI">
                            <h5 className="font-bold text-xl">{fullname}</h5>
                            <div className="flex items-center flex-row ">
                                {
                                    (user_id === 1 || user_id === 3) && (


                                        user_role_id === 1 ? (
                                            <p className="bg-red-200 w-fit  px-2 rounded dark:text-black">{lang === "en" ? <>Admin</> : <>Админ</>}</p>
                                        ) : user_role_id === 2 ? (
                                            <p className="bg-gray-200 w-fit px-2 rounded dark:text-black">{lang === "en" ? <>User</> : <>Пользователь</>}</p>

                                        ) : user_role_id === 3 ? (
                                            <p className="bg-blue-200 w-fit px-2 rounded dark:text-black">{lang === "en" ? <>Manager</> : <>Менеджер</>}</p>

                                        ) : (
                                            <p>{lang === "en" ? <>Error</> : <>Ошибка</>}</p>
                                        )
                                    )
                                }
                                {
                                    banned ? (
                                        <p className="ml-1 bg-red-500  w-fit px-2 rounded dark:text-black">{lang === "en" ? <>Banned</> : <>Забанен</>}</p>
                                    ) : (
                                        <></>
                                    )
                                }
                            </div>
                            {/*<p className="Xjtbn FEdrY N46Vv">{fullname}</p>*/}
                        </div>

                    </div>
                    {
                        hirevalue && (
                            <button type="button"
                                    className="   text w-fit h-8 px-2 font-medium text-center text-white bg-[#027DFA] rounded-lg hover:bg-[#006AFF] focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                {lang === "en" ? <>Hire</> : <>Нанять</>}
                            </button>
                        )
                    }

                </div>
                <div>
                    <div className="flex">
                        {
                            last_three_posts !== null ? (
                                // last_three_posts.map((photos, index) => (
                                //         <div key={index} onClick={() => console.log(`${api_url}/${photos}`)} className="flex-1 aspect-[4/3] mr-2">
                                //             {photos.imageurl ? (
                                //                 <div className="_4PPW">
                                //                     <div className="HcSeS">
                                //                         <div className="bg-yellow-950"></div>
                                //                         <img
                                //                             src={`${api_url}/${photos.imageurl}`}
                                //                             className="aspect-[4/3] object-cover vertical-align: middle;"
                                //                         />
                                //                     </div>
                                //                 </div>
                                //             ) : (
                                //                 <div className="_4PPW" style={{ backgroundColor: 'gray' }}>
                                //                     <div className="HcSeS">
                                //                         <div className="bg-yellow-950"></div>
                                //                         <div className="aspect-[4/3] object-cover vertical-align: middle;" />
                                //                     </div>
                                //                 </div>
                                //             )}
                                //         </div>
                                //     ))
                                last_three_posts.length === 3 ? (
                                    last_three_posts.map((post, index) => (
                                        <div key={index} onClick={() => console.log(`${api_url}/${post.imageurl}`)}
                                             className={`flex-1 aspect-[4/3] ${index === 2 ? '' : 'mr-2'}`}>
                                            {post.imageurl ? (
                                                <div className="_4PPW">
                                                    <div className="HcSeS">
                                                        <div className="bg-yellow-950"></div>
                                                        <img
                                                            src={`${api_url}/${post.imageurl}`}
                                                            className="aspect-[4/3] object-cover vertical-align: middle;"
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="bg-[#D1D1D1] dark:bg-[#767676]">
                                                    <div className="HcSeS">
                                                        <div className="bg-yellow-950"></div>
                                                        <div
                                                            className="aspect-[4/3] object-cover vertical-align: middle;"/>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-wrap">
                                        {last_three_posts.map((post, index) => (
                                            <div key={index} onClick={() => console.log(`${api_url}/${post.imageurl}`)}
                                                 className={`flex-1 aspect-[4/3] ${index === last_three_posts.length ? '' : 'mr-2'}`}>
                                                {post.imageurl ? (
                                                    <div className="_4PPW">
                                                        <div className="HcSeS">
                                                            <div className="bg-yellow-950"></div>
                                                            <img
                                                                src={`${api_url}/${post.imageurl}`}
                                                                className="aspect-[4/3] object-cover vertical-align: middle;"
                                                            />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="bg-[#D1D1D1] dark:bg-[#767676]">
                                                        <div className="HcSeS">
                                                            <div className="bg-yellow-950"></div>
                                                            <div
                                                                className="aspect-[4/3] bg-[#EEEEEE] object-cover vertical-align: middle;"/>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                        {[...Array(3 - last_three_posts.length)].map((_, index) => (
                                            <div key={index}
                                                 className={`flex-1 aspect-[4/3] ${index === 1 ? '' : 'mr-2'}`}>
                                                <div className="bg-[#D1D1D1] dark:bg-[#767676]">
                                                    <div className="HcSeS">
                                                        <div className="bg-yellow-950"></div>
                                                        <div
                                                            className="aspect-[4/3] bg-[#EEEEEE] object-cover vertical-align: middle;"/>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )
                            ) : (
                                <></>
                            )
                        }


                    </div>
                </div>
                <Link href={`/${lang}/${_id}`}
                      className="border-2 rounded-md text-center h-8  text-lg search_user_box_theme_change text-[#767676] hover:text-[#111111] dark:text-[#767676] dark:hover:text-white"
                >{lang === "en" ? <>View profile</> : <>Смотреть профиль</>}</Link>
            </div>
        </>
    )
}