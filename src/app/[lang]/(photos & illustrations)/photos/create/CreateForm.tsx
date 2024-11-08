"use client"
import {useForm} from "react-hook-form";
import {usePathname, useRouter} from "next/navigation";
import React, {ChangeEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/globalRedux/store";
import {Select, SelectItem, Switch} from "@nextui-org/react";
import axios from "@/app/axois";
import {fetchCreatePost} from "@/app/globalRedux/posts/asyncActions";

export type FormData = {
    _id: string;
    title: string
    text: string
    tags: string
    imageurl: string
    category: string
    cameracompany: string,
    model: string,
    shutterspeed: string,
    aperture: string,
    focallength: string,
    dimensions: string,
    isocam: string,
    posttype: string
    posttype_boolean: boolean
    license: string
    license_boolean: boolean
    orientation: string
    user_id: string
}
const orientation = [
    {
        id: "landscape",
        label: {en: "Landscape", ru: "Горизонтальная"},

    },
    {
        id: "portrait",
        label: {en: "Portrait", ru: "Вертикальная"},
    }
]
const categories = [
    {
        id: 'wallpapers',
        label: {en: 'Wallpapers', ru: 'Обои'},

    },
    {
        id: 'nature',
        label: {en: 'Nature', ru: 'Природа'},

    },
    {
        id: '3d_renders',
        label: {en: '3D Renders', ru: '3D Рендеры'},

    },
    {
        id: 'cars',
        label: {en: 'Cars', ru: 'Машины'},

    },
    {
        id: 'minimalism',
        label: {en: 'Minimalism', ru: 'Минимализм'},

    },
    {
        id: 'monochromatic',
        label: {en: 'Monochromatic', ru: 'Монохромные'},

    },
    {
        id: 'street_photography',
        label: {en: 'Street Photography', ru: 'Уличная фотография'},

    },
    {
        id: 'textures_and_patterns',
        label: {en: 'Textures & Patterns', ru: 'Текстуры & Паттерны'},

    },
    {
        id: 'animals',
        label: { en: 'Animals', ru: 'Животные' },

    },
    {
        id: 'food',
        label: { en: 'Food', ru: 'Еда' },

    },
    {
        id: 'tech',
        label: { en: 'Tech', ru: 'Технологии' },

    },
    {
        id: 'shoes',
        label: { en: 'Shoes', ru: 'Обувь' },

    },
    {
        id: 'people',
        label: { en: 'People', ru: 'Люди' },
    }
];
export default function CreateForm({ pageModalStatus }: { pageModalStatus: boolean }) {

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    const {api_url, data} = useSelector((state: RootState) => (state.users))
    const pathname = usePathname();
    const lang = pathname.split('/')[1];

    const [senderrorImage, setSendErrorImage] = useState(false);
    const [geterrorImage, setgetErrorImage] = useState(false);
    const [SuccessDataChange, setSuccessDataChange] = useState(false);
    const [sendDataChange, setSendDataChange] = useState(false);
    const [error, setError] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result;
                if (result !== null && typeof result === 'string') {
                    setPreview(result)
                    // setValue("imageurl",result)
                    // console.log("result", result)
                    // console.log(watch('imageurl'))
                    uploadFile(file); // Вызываем функцию для отправки файла

                }
            };
            reader.readAsDataURL(file);
        }
    };
    const uploadFile = async (file: File) => {
        const formData = new FormData();
        formData.append('image', file);
        // console.log(formData)

        try {
            const response = await axios.post(`${api_url}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                // console.log('Файл успешно загружен!', response);
                setValue('imageurl', response.data.compressedUrl)

            } else {
                console.error('Ошибка при отправке файла:', response.status);
                setSendErrorImage(true);
            }
        } catch (error) {
            console.error('Ошибка при загрузке файла:', error);
            setgetErrorImage(true)
        }
    };


    const {
        register,
        setValue,
        handleSubmit,
        watch,
        formState: {errors, isValid},
    } = useForm<FormData>({
        defaultValues: {
            posttype_boolean: true,
            imageurl: '',
        }
    })
    const onSubmit = handleSubmit((values) => {

        if (data !== null) {

            values.user_id = data._id;
            if (values.posttype_boolean) {
                //     создание фото
                values.posttype = 'Photos'
            } else {
                //     создание иллюстрации
                values.posttype = 'Illustrations'

            }
            if (values.license_boolean) {
                //     создание фото
                values.license = 'Unsplash+'
            } else {
                //     создание иллюстрации
                values.license = 'Free'

            }

            values.tags = values.tags.trim().replace(/\s*,\s*/g, ',').replace(/^\,|\,$/g, '').replace(/,+/g, ',');
            // console.log(values.tags)

            // @ts-ignore
            values.tags = values.tags.trim().split(/\s*,\s*/).filter(Boolean);

            console.log(values)
            dispatch(fetchCreatePost(values))
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
        } else {
            console.log("data null!")
            router.push(`/${lang}/login`);

        }
    })


    return (

        <form onSubmit={onSubmit}>


            {/*<input type="file" onChange={handleFileChange}/>*/}

            <div className="pb-5 py-2.5 sm:px-4 flex items-center justify-center w-full flex-col ">
                {preview !== '' && (
                    <div className="w-fit sm:px-28">

                        <img className="max-w-full h-auto" src={preview} alt="Выбранная фотография"/>
                        {/*src={`${userIcon ? `${userIcon}` : `${api_url}/${data.avatarurl}`}`}*/}

                    </div>
                )}
                {(watch('imageurl') === '') && (
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
                                <li>{lang === "en" ? <>Select a photo to create a post.</> : <>Выберите фотографию, для
                                    создания записи.</>}
                                </li>
                            </ul>
                        </div>
                    </div>

                )}
                <label
                    className="cursor-pointer settings_links_diactive text-sm mt-2">
                    <input type="file" onChange={handleFileChange} style={{display: 'none'}}/>
                    {lang === "en" ? <>Select a photo</> : <>Выбрать фотографию</>}
                </label>
            </div>

            <div className="flex flex-col items-start  justify-center w-full sm:px-4">

                <label
                    className="inputStyle_title">{lang === "en" ? <>Title</> : <>Название</>}</label>
                <input type="text" className="inputStyle" placeholder="Grey Porsche"
                       {...register("title", {
                           required: true, minLength: 2,
                           pattern: /^.*[a-zA-Zа-яА-Я]+.*$/
                       })} />
                {(errors.title?.type === "required" || errors.title?.type === 'minLength' || errors.title?.type === 'pattern') && (
                    <div
                        className="flex p-4 mb-4 w-full text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-950 dark:text-red-400"
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
                                <li>{lang === "en" ? <>You can only enter letters.</> : <>Можно вписывать только
                                    буквы.</>}</li>
                                <li>{lang === "en" ? <>Minimum length 2 characters.</> : <>Минимальная длина 2
                                    символа.</>}</li>
                            </ul>
                        </div>
                    </div>

                )}


                <label
                    className="inputStyle_title">{lang === "en" ? <>Text</> : <>Текст</>}</label>
                <input type="text" className="inputStyle" placeholder="Porsche"
                       {...register("text", {
                           required: true, minLength: 2,
                           pattern: /^.*[a-zA-Zа-яА-Я]+.*$/
                       })} />
                {(errors.text?.type === "required" || errors.text?.type === 'minLength' || errors.text?.type === 'pattern') && (
                    <div
                        className="flex p-4 mb-4 w-full text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-950 dark:text-red-400"
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
                                <li>{lang === "en" ? <>You can only enter letters.</> : <>Можно вписывать только
                                    буквы.</>}</li>
                                <li>{lang === "en" ? <>Minimum length 2 characters.</> : <>Минимальная длина 2
                                    символа.</>}</li>

                            </ul>
                        </div>
                    </div>

                )}


                <label
                    className="inputStyle_title">{lang === "en" ? <>Tags</> : <>Теги</>}</label>
                <input type="text" className="inputStyle" placeholder={lang === "en" ? "tag1, tag2" : "тег1, тег2"}
                       {...register("tags", {
                           required: true, minLength: 2,
                           // pattern: /^(?!\s*$)\S+(?:,\s*\S+)*$/
                           pattern: /^(?!\s*$)([^,]+(?:,\s*[^,]+)*)$/
                       })} />
                {(errors.tags?.type === "required" || errors.tags?.type === 'minLength' || errors.tags?.type === 'pattern') && (
                    <div
                        className="flex p-4 mb-4 w-full text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-950 dark:text-red-400"
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
                                <li>{lang === "en" ? <>You can only enter letters.</> : <>Можно вписывать только
                                    буквы.</>}</li>
                                <li>{lang === "en" ? <>Minimum length 2 characters.</> : <>Минимальная длина 2
                                    символа.</>}</li>
                                <li>{lang === "en" ? <>Check the space after the word.</> : <>Проверьте пробел после
                                    слова.</>}</li>

                            </ul>
                        </div>
                    </div>

                )}


                <Select
                    isRequired
                    size="sm"
                    label={lang === "en" ? "Category" : "Категория"}
                    placeholder={lang === "en" ? "Select category" : "Выберите категорию"}
                    className="max-w-xs"
                    {...register('category')}
                >
                    {categories.map((category) => (
                        <SelectItem key={category.label.en}>
                            {/*onSelect={() =>{
                            setValue("category",category.label.en)
                        }}*/}
                            {lang === "en" ? category.label.en : category.label.ru}
                        </SelectItem>
                    ))}
                </Select>
                <Select
                    isRequired
                    size="sm"
                    label={lang === "en" ? "Orientation" : "Ориентация"}
                    placeholder={lang === "en" ? "Select orientation" : "Выберите ориентацию"}
                    className="max-w-xs mt-4"
                    {...register('orientation')}
                >
                    {orientation.map((category) => (
                        <SelectItem key={category.label.en}>
                            {/*onSelect={() =>{
                            setValue("category",category.label.en)
                        }}*/}
                            {lang === "en" ? category.label.en : category.label.ru}
                        </SelectItem>
                    ))}
                </Select>

                <div className="flex flex-col gap-2 mt-4">
                    <Switch
                        defaultSelected
                        onValueChange={(value) => setValue('license_boolean', value)} // Update the posttype field when the switch is toggled
                        {...register('license_boolean')}
                    >
                        Unsplash+
                    </Switch>
                    <p className="text-small text-default-500">{lang === "en" ? <>The photo will be available for
                        download only for paid users.</> : <>Фотография для скачивания будет доступна только платным
                        пользователям.</>}</p>
                </div>

                <div className="flex flex-col gap-2 mt-4">
                    <Switch
                        defaultSelected
                        onValueChange={(value) => setValue('posttype_boolean', value)} // Update the posttype field when the switch is toggled
                        {...register('posttype_boolean')}
                    >
                        Photo fields
                    </Switch>
                    <p className="text-small text-default-500">{lang === "en" ? <>The off switch disables the photo
                        fields to create an illustration.</> : <>Выключенный переключатель отключает поля для
                        фотографии, чтобы создать иллюстрацию.</>}</p>
                </div>


                <div className="w-full" style={{opacity: watch('posttype_boolean') ? 1 : 0.5}}>
                    <label
                        className="inputStyle_title">{lang === "en" ? <>Camera company</> : <>Бренд камеры</>}</label>
                    <input disabled={!watch('posttype_boolean')} type="text" className="inputStyle" placeholder="Fuji"
                           {...register("cameracompany", {
                               required: watch('posttype_boolean'), minLength: 2,
                               pattern: /^.*[a-zA-Zа-яА-Я]+.*$/
                           })} />
                    {(errors.cameracompany?.type === "required" || errors.cameracompany?.type === 'minLength' || errors.cameracompany?.type === 'pattern') && (
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
                                    <li>{lang === "en" ? <>You can only enter letters.</> : <>Можно вписывать только
                                        буквы.</>}</li>
                                    <li>{lang === "en" ? <>Minimum length 2 characters.</> : <>Минимальная длина 2
                                        символа.</>}</li>
                                </ul>
                            </div>
                        </div>

                    )}

                    <label
                        className="inputStyle_title">{lang === "en" ? <>Model</> : <>Модель</>}</label>
                    <input disabled={!watch('posttype_boolean')} type="text" className="inputStyle"
                           placeholder="Fuji X100V"
                           {...register("model", {
                               required: watch('posttype_boolean'), minLength: 2,
                               pattern: /^(?=.*[a-zA-Zа-яА-Я])(?=.*\d)?[a-zA-Zа-яА-Я\d\s]+$/
                           })} />
                    {(errors.model?.type === "required" || errors.model?.type === 'minLength' || errors.model?.type === 'pattern') && (
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
                                    <li>{lang === "en" ? <>You can only enter letters.</> : <>Можно вписывать только
                                        буквы.</>}</li>
                                    <li>{lang === "en" ? <>Minimum length 2 characters.</> : <>Минимальная длина 2
                                        символа.</>}</li>
                                    <li>{lang === "en" ? <>Spaces are allowed.</> : <>Можно пробелы.</>}</li>
                                    <li>{lang === "en" ? <>Numbers are allowed.</> : <>Можно числа.</>}</li>
                                </ul>
                            </div>
                        </div>

                    )}

                    <label
                        className="inputStyle_title">{lang === "en" ? <>Shutter Speed</> : <>Скорость
                        затвора</>}</label>
                    <input disabled={!watch('posttype_boolean')} type="text" className="inputStyle" placeholder='1/300'
                           {...register("shutterspeed", {
                               required: watch('posttype_boolean'), minLength: 2,
                               pattern: /^\d+\/\d+$/
                           })} />
                    {(errors.shutterspeed?.type === "required" || errors.shutterspeed?.type === 'minLength' || errors.shutterspeed?.type === 'pattern') && (
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


                                    <li>{lang === "en" ? <>You can enter text as in the placeholder:</> : <>Можно
                                        вводить текст как в подсказке:</>} 1/300</li>

                                </ul>
                            </div>
                        </div>

                    )}


                    <label
                        className="inputStyle_title">{lang === "en" ? <>Aperture</> : <>Диафрагма</>}</label>
                    <input disabled={!watch('posttype_boolean')} type="text" className="inputStyle" placeholder='f/4.0'
                           {...register("aperture", {
                               required: watch('posttype_boolean'), minLength: 2,
                               pattern: /^f\/\d+(\.\d+)?$/
                           })} />
                    {(errors.aperture?.type === "required" || errors.aperture?.type === 'minLength' || errors.aperture?.type === 'pattern') && (
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
                                    <li>{lang === "en" ? <>You can enter text as in the placeholder:</> : <>Можно
                                        вводить текст как в подсказке:</>} f/4.0
                                    </li>

                                </ul>
                            </div>
                        </div>

                    )}
                    <label
                        className="inputStyle_title">{lang === "en" ? <>Focal Length</> : <>Фокусное
                        расстояние</>}</label>
                    <input disabled={!watch('posttype_boolean')} type="text" className="inputStyle" placeholder='50mm'
                           {...register("focallength", {
                               required: watch('posttype_boolean'), minLength: 2,
                               pattern: /^(\d{2}|\d{3})\s*mm$/
                           })} />
                    {(errors.focallength?.type === "required" || errors.focallength?.type === 'minLength' || errors.focallength?.type === 'pattern') && (
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
                                    <li>{lang === "en" ? <>You can enter text as in the placeholder:</> : <>Можно
                                        вводить текст как в подсказке:</>} 50mm
                                    </li>
                                </ul>
                            </div>
                        </div>

                    )}

                    <label
                        className="inputStyle_title">ISO</label>
                    <input disabled={!watch('posttype_boolean')} type="text" className="inputStyle" placeholder='300'
                           {...register("isocam", {
                               required: watch('posttype_boolean'), minLength: 2,
                               pattern: /^\d+$/
                           })} />
                    {(errors.isocam?.type === "required" || errors.isocam?.type === 'minLength' || errors.isocam?.type === 'pattern') && (
                        <div
                            className="flex p-4 mb-4  text-sm text-red-800 rounded-lg bg-red-50 dark:bg-red-950 dark:text-red-400"
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
                                    <li>{lang === "en" ? <>You can enter text as in the placeholder:</> : <>Можно
                                        вводить текст как в подсказке:</>} 300
                                    </li>
                                </ul>
                            </div>
                        </div>

                    )}

                    <label
                        className="inputStyle_title">{lang === "en" ? <>Dimensions</> : <>Разрешение</>}</label>
                    <input disabled={!watch('posttype_boolean')} type="text" className="inputStyle"
                           placeholder='2560x1440'
                           {...register("dimensions", {
                               required: watch('posttype_boolean'), minLength: 2,
                               pattern: /^\d+\s*x\s*\d+$/
                           })} />
                    {(errors.dimensions?.type === "required" || errors.dimensions?.type === 'minLength' || errors.dimensions?.type === 'pattern') && (
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
                                    <li>{lang === "en" ? <>You can enter text as in the placeholder:</> : <>Можно
                                        вводить текст как в подсказке:</>} 2560x1440
                                    </li>
                                </ul>
                            </div>
                        </div>

                    )}


                </div>

                <button type="submit"
                        className="w-full mb-4 text-white bg-[#171717] hover:bg-[#222222]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium justify-center rounded-lg text-lg px-5 py-3 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 ">
                    {lang === "en" ? <>Create post</> : <>Создать запись</>}
                </button>
                {
                    error && (

                        <div id="toast-danger"
                             className={pageModalStatus ? " flex items-center w-full mb-4  p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12" : "fixed flex items-center w-full max-w-xs p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12"}

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
                            <div className="ms-3 text-sm font-normal">{lang === "en" ? <>Error creating post!</> : <>Ошибка
                                с созданием поста!</>}</div>
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
                    SuccessDataChange && (

                        <div id="toast-success"

                             className={pageModalStatus ? " flex items-center w-full mb-4  p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12" : "fixed flex items-center w-full max-w-xs p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12"}
                             // className="fixed flex items-center w-full max-w-xs p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12"
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
                            <div className="ms-3 text-sm font-normal">{lang === "en" ? <>Post created.</> : <>Запись
                                создана.</>}</div>
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
                {
                    sendDataChange && (

                        <div id="toast-danger"
                             className={pageModalStatus ? " flex items-center w-full mb-4  p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12" : "fixed flex items-center w-full max-w-xs p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12"}

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
                            <div className="ms-3 text-sm font-normal">{lang === "en" ? <>Send error!</> : <>Ошибка
                                отправки!</>}</div>
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
                             className={pageModalStatus ? " flex items-center w-full mb-4  p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12" : "fixed flex items-center w-full max-w-xs p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12"}

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
                             className={pageModalStatus ? " flex items-center w-full mb-4  p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12" : "fixed flex items-center w-full max-w-xs p-4  text-gray-500 bg-white  rtl:divide-x-reverse divide-gray-200 rounded-lg shadow bottom-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-12"}

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
            </div>
        </form>
    )
}