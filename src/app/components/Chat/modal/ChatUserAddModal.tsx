import Link from "next/link";
import React, {ChangeEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/globalRedux/store";
import {usePathname, useSearchParams} from "next/navigation";
import Pagination from "@/app/components/Pagination";
import {fetchAddUserForChat, fetchUsersForAdd} from "@/app/globalRedux/chats/asyncActions";

export default function ChatUserAddModal() {
    const {chat_detail, users_for_add} = useSelector((state: RootState) => state.chats);
    const {api_url} = useSelector((state: RootState) => state.users);
    const pathname = usePathname()
    const lang = pathname.split('/')[1];
    const [value, setValue] = useState('');
    const searchParams = useSearchParams();
    const dispatch = useDispatch<AppDispatch>();
    const [isLoading, setIsLoading] = useState(false);

    const [selectedCollections, setSelectedCollections] = useState<{ [key: string]: boolean }>({});

    const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {target} = event;
        setValue(target.value);

        // console.log(value)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            console.log("Enter", value)
            const trimmedValue = value.trim(); // remove leading and trailing whitespace
            if (trimmedValue === '' || trimmedValue.includes('  ')) { // check for empty or multiple spaces
                alert('Please fill in the search field');
            } else {

                const searchValue = trimmedValue.replace(/^\s+|\s+$/g, ''); // remove leading and trailing whitespace, but preserve spaces between words
                dispatch(fetchUsersForAdd({
                    searchtext: searchValue,
                    page: searchParams.get("page") !== null ? searchParams.get("page") : 0,
                    role_id: 0,
                    category: "",
                    posttype: '',
                    orientation: '',
                    license: '',
                    limit: searchParams.get("countview"),
                    sort: ''
                }))
            }

        }
    }

    const fetchPostsSuperDuper = async () => {
        setIsLoading(true);
        console.log("pathname", pathname)
        const trimmedValue = value.trim(); // remove leading and trailing whitespace
        const searchValue = trimmedValue.replace(/^\s+|\s+$/g, ''); // remove leading and trailing whitespace, but preserve spaces between words

        dispatch(fetchUsersForAdd({
            searchtext: searchValue,
            page: searchParams.get("page") !== null ? searchParams.get("page") : 0,
            role_id: 0,
            category: "",
            posttype: '',
            orientation: '',
            license: '',
            limit: searchParams.get("countview"),
            sort: ''
        }))


        // Сдезь будут условия на какие бд делать запросы на разные переменные чтоб было нормально
        setIsLoading(false);
    }


    useEffect(() => {
        if (users_for_add.items.length > 0) {
            const initialSelectedCollections: { [key: string]: boolean } = {};

            users_for_add.items.forEach((item) => {
                // Проверяем, есть ли пользователь в chat_detail.users
                const userExists = chat_detail?.users.some(user => user.id === item._id);
                initialSelectedCollections[item._id] = userExists ? true : false;
            });

            setSelectedCollections(initialSelectedCollections);
            console.log(selectedCollections);
        }
    }, [users_for_add, chat_detail]);


    useEffect(() => {
        // window.scrollTo(0, 0);
        // console.log("use effect")
        // console.log(`${api_url}/`)
        console.log("users_for_add", users_for_add);

        fetchPostsSuperDuper();

        // console.log("usersWithSearch",usersWithSearch)
        // console.log("data load end")
    }, [searchParams.get("page")]);


    return (
        chat_detail !== null && (
            <>

                <p className="font-bold text-xl p-2 ">{lang === "en" ? <>Add user to chat</> : <>Добавить пользователя в
                    чат</>}</p>
                <div
                    className="flex flex-col items-start w-full justify-start border-2 border border-D1 rounded-lg dark:border-76 bg-F5 dark:bg-12  ">

                    <div className="h-10 w-full px-2 pt-2 mb-2">

                        <div
                            className="w-full  bg-[#EEEEEE] dark:bg-12 hover:bg-[#E7E7E7] transition duration-200 ease-in-out ">
                            <div className="relative flex w-full  items-stretch">
        <span
            className="input-group-text flex items-center  whitespace-nowrap rounded-full pl-2 pt-1  text-center text-base font-normal"
            id="basic-addon2">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#767676" // default color
              width="24"
              height="24"
              className=" h-5 w-5 hover:fill-black transition duration-200 ease-in-out" // hover color
          >
            <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
            />
          </svg>
        </span>
                                <input
                                    type="search"
                                    className="relative m-0 block search_input_adaptive  flex-auto rounded-full placeholder-[#767676] bg-transparent pr-3 pl-2 py-2  text-base  text-black dark:text-white outline-none"
                                    // placeholder={value}
                                    placeholder={lang === 'en' ? "Search photos" : "Поиск фото"}
                                    aria-label="Searchas"
                                    aria-describedby="button-addon2"
                                    onChange={searchHandler}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="my-2 w-full   border-t-2 border-D1  dark:border-76"/>
                    <div className="p-2 flex flex-col gap-2 ">

                        {users_for_add.items.map((user) => (
                            <>
                                {/*<Link key={user._id} href={`/${lang}/${user._id}`}>*/}
                                <div className={' flex flex-row gap-2 items-center'}>
                                    <img
                                        className="rounded-full w-8 h-8"
                                        src={`${api_url}/${user.avatarurl}`}
                                        alt="user photo"
                                    />
                                    <p className='text-sm'>{user.fullname}</p>

                                    {/*</Link>*/}
                                    <div
                                        className=" left-0 right-0 top-0 w-full h-full pl-[19px] flex flex-col justify-center group-hover:bg-opacity-80 transition-all duration-100 ease-in-out"
                                        // onClick={() => {
                                        //     console.log(selectedCollections);
                                        //
                                        //     setSelectedCollections((prev) => ({
                                        //         ...prev,
                                        //         [item._id]: !prev[item._id] ?? !item.has_post
                                        //     }));
                                        //     onSubmit(item._id,_id,)
                                        //
                                        //     console.log(selectedCollections);
                                        //
                                        // }}
                                        onClick={() => {
                                            if (chat_detail !== null) {

                                                console.log(selectedCollections);

                                                // Проверяем, существует ли пользователь в chat_detail.users
                                                const userExists = chat_detail?.users.some(u => u.id === user._id);

                                                // Проверяем, существует ли пользователь в selectedCollections
                                                if (selectedCollections[user._id]) {
                                                    console.log(`Пользователь с ID ${user._id} уже добавлен.`);
                                                    return; // Выходим из функции, если пользователь уже есть
                                                }

                                                // Обновляем состояние selectedCollections
                                                const newSelectedCollections = {
                                                    ...selectedCollections,
                                                    [user._id]: userExists ? !selectedCollections[user._id] : true // Если пользователь существует, переключаем значение, иначе устанавливаем true
                                                };

                                                setSelectedCollections(newSelectedCollections);
                                                // onSubmitAddImage(_id, user._id, newSelectedCollections[user._id]);
                                                dispatch(fetchAddUserForChat({
                                                    chatId: chat_detail.chatId,
                                                    userId: user._id
                                                }))
                                                console.log(newSelectedCollections); // Выводим новое состояние
                                            }
                                        }
                                        }

                                    >


                                        <div className=" h-6 w-6   ">
                                            {
                                                selectedCollections[user._id] ? (
                                                    <>

                                                        <svg
                                                            className="  shrink-0  opacity-80 fill-white transition-all duration-100 ease-in-out "
                                                            width="24" height="24"
                                                            viewBox="0 0 24 24" version="1.1"
                                                            aria-hidden="false"
                                                        >
                                                            <desc lang="en-US">A checkmark</desc>
                                                            <path
                                                                d="m10 17.4-5-5L6.4 11l3.6 3.6L17.6 7 19 8.4l-9 9Z"
                                                            />
                                                        </svg>
                                                    </>
                                                ) : (
                                                    <svg
                                                        className="  shrink-0  opacity-80 fill-white transition-all duration-100 ease-in-out "
                                                        width="24" height="24" viewBox="0 0 24 24" version="1.1"
                                                        aria-hidden="false"
                                                    >
                                                        <desc lang="en-US">A plus sign</desc>
                                                        <path d="M11 5v6H5v2h6v6h2v-6h6v-2h-6V5h-2Z"/>
                                                    </svg>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </>

                        ))}
                    </div>
                </div>
                <Pagination/>
                <div className="mb-2"></div>
            </>
        )
    )
}