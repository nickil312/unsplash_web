'use client'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/globalRedux/store";
import {usePathname, useRouter} from "next/navigation";
import {ChangeEvent, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {AccountEditProfile, NewUserImage, RegData} from "@/app/globalRedux/users/types";
import {Locale} from "@/i18n.config";
import axios from "@/app/axois";
import {fetchChangeProfileData, fetchChangeProfileImg} from "@/app/globalRedux/users/asyncActions";
import Link from "next/link";

export default function EditProf_Form() {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const [error, setError] = useState(false);
    const [senderrorImage, setSendErrorImage] = useState(false);
    const [geterrorImage, setgetErrorImage] = useState(false);
    const [sendResponseerrorImage, setSendResponseErrorImage] = useState(false);
    const [SuccessImageChange, setSuccessImageChange] = useState(false);
    const [SuccessDataChange, setSuccessDataChange] = useState(false);
    const [sendDataChange, setSendDataChange] = useState(false);
    const [userIcon, setUserIcon] = useState('');
    const {data, api_url} = useSelector((state: RootState) => (state.users))
    const pathname = usePathname()
    const lang = pathname.split('/')[1];


    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: {errors, isValid,},

    } = useForm<AccountEditProfile>({
        defaultValues: {
            email: '',
            fullName: '',
            location: '',
            messages: false,
            bio: ''
        },
    });
    const [characterCount, setCharacterCount] = useState(250);

    const handleBioChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let newBio = e.target.value;
        const maxRows = 6; // максимальное количество строк
        const rows = newBio.split('\n').length;
        if (rows > maxRows) {
            newBio = newBio.split('\n').slice(0, maxRows).join('\n');
        }
        setValue('bio', newBio);
        setCharacterCount(250 - newBio.length);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result;
                if (result !== null && typeof result === 'string') {
                    setUserIcon(result)
                    uploadFile(file); // Вызываем функцию для отправки файла

                }
            };
            reader.readAsDataURL(file);
        }
    };
    const uploadFile = async (file: File) => {
        const formData = new FormData();
        formData.append('image', file);
        console.log(formData)

        try {
            const response = await axios.post(`${api_url}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                console.log('Файл успешно загружен!', response);
                if (data !== null) {

                    const changedata: NewUserImage = {
                        email: data.email,
                        avatarurl: response.data.compressedUrl,

                    }
                    dispatch(fetchChangeProfileImg(changedata))
                        .then((response) => {
                            console.log(response)
                            if (response.meta.requestStatus === 'rejected') {
                                // console.log("Request failed")
                                setSendResponseErrorImage(true)
                            } else if (response.meta.requestStatus === 'fulfilled') {
                                // console.log("Request fulfilled")
                                // router.push(`/${lang}`);
                                setSuccessImageChange(true)
                            }
                            // handle success response
                        })
                        .catch((error) => {
                            console.log(error)

                        })
                }

            } else {
                console.error('Ошибка при отправке файла:', response.status);
                setSendErrorImage(true);
            }
        } catch (error) {
            console.error('Ошибка при загрузке файла:', error);
            setgetErrorImage(true)
        }
    };
    const onSubmit = handleSubmit((values) => {
        console.log(values)
        if(data !== null){

        const dataWith_id = {
            email: values.email,
            fullName: values.fullName,
            location: values.location,
            messages: values.messages,
            bio: values.bio,
            _id: data._id,
        }
        dispatch(fetchChangeProfileData(dataWith_id))
            .then((response) => {
                console.log(response)
                if (response.meta.requestStatus === 'rejected') {
                    setError(true);
                    // console.log("Request failed")
                    // setSendResponseErrorImage(true)
                } else if (response.meta.requestStatus === 'fulfilled') {
                    // console.log("Request fulfilled")
                    setSuccessDataChange(true);
                    // router.push(`/${lang}`);
                    // setSuccessImageChange(true)
                }
                // handle success response
            })
            .catch((error) => {
                console.log(error)
                setSendDataChange(true);
            })
        }
    })
    useEffect(() => {

        if (data !== null) {
            // console.log(2)
            setValue("email", data.email);
            setValue("fullName", data.fullname);
            setValue('location',data.location)
            setValue("bio", data.bio);
            setValue("messages", data.messages);
            // setValue("userIcon",data.avatarurl);
            // setValue("email",data.email);
        }
        // console.log(1)
    }, [])
    let messagesValue = watch("messages")
    // console.log('userIcon', userIcon)
    return (
        <>
            <p className="settings_Title_adaptive">{lang === "en" ? <>Edit Profile</> : <>Изменить профиль</>}</p>
            {
                (data !== null && (lang === "en" || lang === "ru")) ? (
                    <>
                        <div className="flex flex-row w-full">
                            <div className="flex flex-col w-[170px] h-[170px] items-center">

                                <div className="relative rounded-full w-[128px] h-[128px] m-auto overflow-hidden ">
                                    <img
                                        alt="user photo"
                                        sizes="128px"
                                        className="upload-circular__image upload-circular__image--large js-general-uploader-new-upload-target"
                                        // src={`${api_url}/${data.avatarurl}`}
                                        src={`${userIcon ? `${userIcon}` : `${api_url}/${data.avatarurl}`}`}
                                    />
                                    {/*<div className="upload-circular__progress js-general-uploader-progress-target">*/}
                                    {/*</div>*/}
                                </div>
                                {/*<input title="Change profile image" type="file" onChange={handleFileChange}*/}
                                {/*       className="settings_links_diactive text-sm"/>*/}


                                {/*<p*/}
                                {/*    className="cursor-pointer settings_links_diactive text-sm w-[134px]">*/}
                                {/*    <input type="file" onChange={handleFileChange} style={{display: 'none'}}/>*/}
                                {/*    {lang === "en" ? <>Change profile image</> : <>Изменить фото акк</>}*/}

                                {/*</p>*/}
                                <p
                                    className="cursor-pointer settings_links_diactive text-sm w-[134px]"
                                // @ts-ignore
                                    onClick={() => document.getElementById('fileInput').click()} // Имитация клика по input
                                >
                                    <input
                                        type="file"
                                        id="fileInput" // Уникальный ID для input
                                        onChange={handleFileChange}
                                        style={{display: 'none'}} // Скрываем элемент
                                    />
                                    {lang === "en" ? <>Change profile image</> : <>Изменить фото акк</>}
                                </p>


                                {/*<Link href="#" type="file" onChange={handleFileChange}*/}
                                {/*    className=" text-sm"><p>Change profile image</p></Link>*/}
                            </div>
                            <div className="w-full px-8">
                                <form onSubmit={onSubmit} className="flex flex-col text-center h-full mt-2 mb-8">
                                    <label
                                        className="inputStyle_title">{lang === "en" ? <>Email</> : <>Почта</>}</label>
                                    <input type="email" className="inputStyle"
                                           {...register("email", {
                                               required: true,
                                               pattern: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
                                           })} />
                                    {(errors.email?.type === "required" || errors.email?.type === 'pattern') && (
                                        <div
                                            className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-950 dark:text-red-400"
                                            role="alert">
                                            <svg className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
                                                 aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                                 viewBox="0 0 20 20">
                                                <path
                                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                            </svg>
                                            <span className="sr-only">Danger</span>
                                            <div className="flex flex-col items-start">
                            <span className="font-medium">{lang === "en" ? <>Ensure that these requirements are
                                met:</> : <>Убедитесь, что эти требования выполнены:</>}</span>
                                                <ul className="mt-1.5 list-disc list-inside flex flex-col items-start ">
                                                    <li>{lang === "en" ? <>Write email in the field -
                                                        Example:</> : <>Напишите почту в поле
                                                        - Пример:</>} example@example.com
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                    )}
                                    <label className="inputStyle_title">{lang === "en" ? <>Username</> : <>Имя
                                        пользователя</>}</label>

                                    <input type="fullName" className="inputStyle"
                                           {...register("fullName", {
                                               required: true, minLength: 2, maxLength: 8, pattern: /^[a-zA-Zа-яА-Я]+$/
                                           })} />
                                    {(errors.fullName?.type === "required" || errors.fullName?.type === "maxLength" || errors.fullName?.type === "minLength" || errors.fullName?.type === 'pattern') && (
                                        <div
                                            className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-950 dark:text-red-400"
                                            role="alert">
                                            <svg className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
                                                 aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                                 viewBox="0 0 20 20">
                                                <path
                                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                            </svg>
                                            <span className="sr-only">Danger</span>
                                            <div className="flex flex-col items-start">
                            <span className="font-medium">{lang === "en" ? <>Ensure that these requirements are
                                met:</> : <>Убедитесь, что эти требования выполнены:</>}</span>
                                                <ul className="mt-1.5 list-disc list-inside flex flex-col items-start ">
                                                    <li>{lang === "en" ? <>The name must not contain spaces</> : <>Имя
                                                        не должно содержать
                                                        пробелы</>}</li>
                                                    <li>{lang === "en" ? <>The name must not contain numbers</> : <>Имя
                                                        не должно содержать
                                                        числа</>}</li>
                                                    <li>{lang === "en" ? <>The name must not contain special
                                                        symbols</> : <>Имя не должно
                                                        содержаь спец. симовлы</>}</li>
                                                    <li>{lang === "en" ? <>The name maximum length 8
                                                        symbols</> : <>Максимальная длина имени:
                                                        8</>}</li>
                                                    <li>{lang === "en" ? <>The name minimum length 2
                                                        symbols</> : <>Минимальная длина имени:
                                                        2</>}</li>

                                                </ul>

                                            </div>
                                        </div>

                                    )}
                                    <div className="flex justify-between">
                                        <label
                                            className="inputStyle_title">{lang === "en" ? <>Location</> : <>Местонахождение</>}</label>
                                    </div>
                                    <input type="text" className="inputStyle"
                                           {...register("location", {
                                               required: false,
                                               maxLength: 20,
                                               pattern: /^[a-zA-Z\s]+$/
                                           })} />
                                    {(errors.location?.type === "maxLength" || errors.location?.type === 'pattern') && (
                                        <div
                                            className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-950 dark:text-red-400"
                                            role="alert">
                                            <svg className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
                                                 aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                                 viewBox="0 0 20 20">
                                                <path
                                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                            </svg>
                                            <span className="sr-only">Danger</span>
                                            <div className="flex flex-col items-start">
                            <span className="font-medium">{lang === "en" ? <>Ensure that these requirements are
                                met:</> : <>Убедитесь, что эти требования выполнены:</>}</span>
                                                <ul className="mt-1.5 list-disc list-inside flex flex-col items-start ">
                                                    <li>{lang === "en" ? <>Country name maximum length 20
                                                        symbols</> : <>Максимальная длина
                                                        название страны: 20
                                                        символов.</>}</li>
                                                    <li>
                                                        {lang === "en" ? (
                                                            <>Country name must be filled in.</>
                                                        ) : (
                                                            <>Название страны должно быть заполнено.</>
                                                        )}
                                                    </li>
                                                    <li>
                                                        {lang === "en" ? (
                                                            <>The country name must consist of characters.</>
                                                        ) : (
                                                            <>Название страны должно состоять из символов.</>
                                                        )}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex justify-between">
                                        <label
                                            className="inputStyle_title">{lang === "en" ? <>Bio</> : <>О
                                            себе</>}</label>
                                    </div>
                                    <div className="relative mb-8 flex flex-col items-start">



                                            <textarea
                                                className="w-full min-h-10 resize-none h-auto block px-3 py-1.5 border-2 border-D1 dark:border-76 rounded "
                                                rows={4} data-character-count="250"
                                                {...register("bio", {
                                                    required: false,
                                                    maxLength: 250,
                                                    onChange: handleBioChange,
                                                })}>
                                            </textarea>
                                                <div
                                                    className="bottom-7 absolute right-2.5 text-sm text-76 pointer-events-none">{characterCount}</div>

                                            <p className="settings_under_input_text">{lang === "en" ? <>Max avalible rows 6</> : <>Макс. доступные строки 6</>}</p>
                                    </div>

                                    {(errors.bio?.type === "maxLength") && (
                                        <div
                                            className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-950 dark:text-red-400"
                                            role="alert">
                                            <svg className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
                                                 aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                                 viewBox="0 0 20 20">
                                                <path
                                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                            </svg>
                                            <span className="sr-only">Danger</span>
                                            <div className="flex flex-col items-start">
                            <span className="font-medium">{lang === "en" ? <>Ensure that these requirements are
                                met:</> : <>Убедитесь, что эти требования выполнены:</>}</span>
                                                <ul className="mt-1.5 list-disc list-inside flex flex-col items-start ">
                                                    <li>{lang === "en" ? <>Bio maximum length 250
                                                        symbols.</> : <>Максимальная длина о себе: 250
                                                        символов.</>}</li>

                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex justify-between">
                                        <label
                                            className="inputStyle_title">{lang === "en" ? <>Messaging</> : <>Сообщения</>}</label>
                                    </div>
                                    <div className="relative mb-8 flex flex-col items-start ">

                                        <div
                                            className="bg-F5 dark:bg-12 w-full items-center  rounded-[3px] p-3 flex flex-row justify-between ">

                                            <div className="relative block">
                                                <input name="user[allow_messages]" type="hidden" value="0"
                                                       autoComplete="off"/>
                                                <input id="allow-messages-checkbox"
                                                       className="mr-[8px] "
                                                       type="checkbox" value="1"
                                                       {...register('messages')}
                                                       checked={messagesValue}
                                                       onChange={() => {
                                                           setValue('messages', !messagesValue);
                                                       }}
                                                       name="user[allow_messages]"/>
                                                <label className="text-sm  " htmlFor="allow-messages-checkbox">
                                                    {lang === "en" ? <>Display a 'Message' button on your profile</> : <>Показать кнопку 'Сообщение' в вашем профиле</>}

                                                </label>
                                            </div>


                                            <div
                                                className="button_settings_style">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                     viewBox="0 0 24 24" className="fill-76 w-[18px] h-[18px]">
                                                    <path
                                                        d="M20 4H4C2.88 4 2 4.88 2 6V18C2 19.12 2.88 20 4 20H20C21.12 20 22 19.12 22 18V6C22 4.88 21.12 4 20 4ZM20 8L12 12.96L4 8V6L12 10.96L20 6V8Z"></path>
                                                </svg>

                                            </div>

                                        </div>
                                        <p className="settings_under_input_text">{lang === "en" ? <>Messages will be sent to your account</> : <>Сообщения будут отправлены в ваш аккаунт</>}</p>
                                    </div>
                                    {/*<input type="submit" value="Create" disabled={!isValid}/>*/}
                                    <button type="submit"
                                            className="text-white bg-[#171717] hover:bg-[#222222]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium justify-center rounded-lg text-lg px-5 py-3 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 ">
                                        {lang === "en" ? <>Update acccount</> : <>Обновить аккаунт</>}
                                    </button>
                                    {
                                        error && (

                                            <div id="toast-danger"
                                                 className="fixed flex items-center w-full max-w-xs p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12"
                                                 role="alert">
                                                <div
                                                    className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                                                    <svg className="w-5 h-5" aria-hidden="true"
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                                                    </svg>
                                                    <span className="sr-only">Error icon</span>
                                                </div>
                                                <div className="ms-3 text-sm font-normal">{lang === "en" ? <>This email is busy!</> : <>Данная почта занята!</>}</div>
                                                <button type="button"
                                                        onClick={() => setError(false)}
                                                        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 border-0 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-12 dark:hover:bg-1E"
                                                        data-dismiss-target="#toast-danger" aria-label="Close">
                                                    <span className="sr-only">Close</span>
                                                    <svg className="w-3 h-3" aria-hidden="true"
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         fill="none"
                                                         viewBox="0 0 14 14">
                                                        <path stroke="currentColor" stroke-linecap="round"
                                                              stroke-linejoin="round"
                                                              stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        )
                                    }
                                    {
                                        sendDataChange && (

                                            <div id="toast-danger"
                                                 className="fixed flex items-center w-full max-w-xs p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12"
                                                 role="alert">
                                                <div
                                                    className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                                                    <svg className="w-5 h-5" aria-hidden="true"
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                                                    </svg>
                                                    <span className="sr-only">Error icon</span>
                                                </div>
                                                <div className="ms-3 text-sm font-normal">{lang === "en" ? <>Send error!</> : <>Ошибка отправки!</>}</div>
                                                <button type="button"
                                                        onClick={() => setSendDataChange(false)}
                                                        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 border-0 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-12 dark:hover:bg-1E"
                                                        data-dismiss-target="#toast-danger" aria-label="Close">
                                                    <span className="sr-only">Close</span>
                                                    <svg className="w-3 h-3" aria-hidden="true"
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         fill="none"
                                                         viewBox="0 0 14 14">
                                                        <path stroke="currentColor" stroke-linecap="round"
                                                              stroke-linejoin="round"
                                                              stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        )
                                    }

                                    {
                                        geterrorImage && (

                                            <div id="toast-danger"
                                                 className="fixed flex items-center w-full max-w-xs p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12"
                                                 role="alert">
                                                <div
                                                    className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                                                    <svg className="w-5 h-5" aria-hidden="true"
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                                                    </svg>
                                                    <span className="sr-only">Error icon</span>
                                                </div>
                                                <div className="ms-3 text-sm font-normal">{lang === "en" ? <>Error image
                                                    upload!</> : <>Ошибка с загрузкой картинки!</>}</div>
                                                <button type="button"
                                                        onClick={() => setgetErrorImage(false)}
                                                        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 border-0 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-12 dark:hover:bg-1E"
                                                        data-dismiss-target="#toast-danger" aria-label="Close">
                                                    <span className="sr-only">Close</span>
                                                    <svg className="w-3 h-3" aria-hidden="true"
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         fill="none"
                                                         viewBox="0 0 14 14">
                                                        <path stroke="currentColor" stroke-linecap="round"
                                                              stroke-linejoin="round"
                                                              stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        )
                                    }
                                    {
                                        senderrorImage && (

                                            <div id="toast-danger"
                                                 className="fixed flex items-center w-full max-w-xs p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12"
                                                 role="alert">
                                                <div
                                                    className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                                                    <svg className="w-5 h-5" aria-hidden="true"
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                                                    </svg>
                                                    <span className="sr-only">Error icon</span>
                                                </div>
                                                <div className="ms-3 text-sm font-normal">{lang === "en" ? <>Error sending
                                                    image!</> : <>Ошибка с отправкой картинки!</>}</div>
                                                <button type="button"
                                                        onClick={() => setSendErrorImage(false)}
                                                        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 border-0 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-12 dark:hover:bg-1E"
                                                        data-dismiss-target="#toast-danger" aria-label="Close">
                                                    <span className="sr-only">Close</span>
                                                    <svg className="w-3 h-3" aria-hidden="true"
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         fill="none"
                                                         viewBox="0 0 14 14">
                                                        <path stroke="currentColor" stroke-linecap="round"
                                                              stroke-linejoin="round"
                                                              stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        )
                                    }
                                    {
                                        sendResponseerrorImage && (

                                            <div id="toast-danger"
                                                 className="fixed flex items-center w-full max-w-xs p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12"
                                                 role="alert">
                                                <div
                                                    className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                                                    <svg className="w-5 h-5" aria-hidden="true"
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
                                                    </svg>
                                                    <span className="sr-only">Error icon</span>
                                                </div>
                                                <div className="ms-3 text-sm font-normal">{lang === "en" ? <>Server
                                                    error!</> : <>Ошибка сервера!</>}</div>
                                                <button type="button"
                                                        onClick={() => setSendResponseErrorImage(false)}
                                                        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 border-0 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-12 dark:hover:bg-1E"
                                                        data-dismiss-target="#toast-danger" aria-label="Close">
                                                    <span className="sr-only">Close</span>
                                                    <svg className="w-3 h-3" aria-hidden="true"
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         fill="none"
                                                         viewBox="0 0 14 14">
                                                        <path stroke="currentColor" stroke-linecap="round"
                                                              stroke-linejoin="round"
                                                              stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        )
                                    }
                                    {
                                        SuccessImageChange && (

                                            <div id="toast-success"
                                                 className="fixed flex items-center w-full max-w-xs p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12"
                                                 role="alert">
                                                <div
                                                    className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                                                    <svg className="w-5 h-5" aria-hidden="true"
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                                    </svg>
                                                    <span className="sr-only">Check icon</span>
                                                </div>
                                                <div className="ms-3 text-sm font-normal">{lang === "en" ? <>Image
                                                    changed.</> : <>Картинка изменена.</>}</div>
                                                <button type="button"
                                                        onClick={() => setSuccessImageChange(false)}
                                                        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 border-0 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-12 dark:hover:bg-1E"
                                                        data-dismiss-target="#toast-success" aria-label="Close">
                                                    <span className="sr-only">Close</span>
                                                    <svg className="w-3 h-3" aria-hidden="true"
                                                         xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 14 14">
                                                        <path stroke="currentColor" stroke-linecap="round"
                                                              stroke-linejoin="round" stroke-width="2"
                                                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        )
                                    }
                                    {
                                        SuccessDataChange && (

                                            <div id="toast-success"
                                                 className="fixed flex items-center w-full max-w-xs p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12"
                                                 role="alert">
                                                <div
                                                    className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                                                    <svg className="w-5 h-5" aria-hidden="true"
                                                         xmlns="http://www.w3.org/2000/svg"
                                                         fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                                    </svg>
                                                    <span className="sr-only">Check icon</span>
                                                </div>
                                                <div className="ms-3 text-sm font-normal">{lang === "en" ? <>Data changed.</> : <>Данные изменены.</>}</div>
                                                <button type="button"
                                                        onClick={() => setSuccessDataChange(false)}
                                                        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 border-0 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-12 dark:hover:bg-1E"
                                                        data-dismiss-target="#toast-success" aria-label="Close">
                                                    <span className="sr-only">Close</span>
                                                    <svg className="w-3 h-3" aria-hidden="true"
                                                         xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 14 14">
                                                        <path stroke="currentColor" stroke-linecap="round"
                                                              stroke-linejoin="round" stroke-width="2"
                                                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        )
                                    }


                                </form>
                            </div>
                        </div>
                    </>

                ) : (
                    <p>Loading</p>
                )
            }

        </>
    )
}