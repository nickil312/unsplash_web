'use client'
import React, {ChangeEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/globalRedux/store";
import {fetchRolesDatabase} from "@/app/globalRedux/users/asyncActions";
import {
    ChipProps,
    getKeyValue,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import {usePathname} from "next/navigation";
import {CSVLink} from "react-csv";
import {Posts} from "@/app/globalRedux/posts/types";
import {RolesForTable} from "@/app/globalRedux/users/types";
import axios from "axios";

const statusColorMap: Record<string, ChipProps["color"]> = {
    active: "success",
    paused: "danger",
    vacation: "warning",
    secondary: "secondary",
    primary: "primary",
    default: "default"
};
export default function DatabaseRoles() {
    const {items, status} = useSelector((state: RootState) => (state.users.rolesDatabase))
    const [UsersData, setUsersData] = useState<RolesForTable[]>([]);
    const {api_url} = useSelector((state: RootState) => state.posts);
    const [SuccessDataChange, setSuccessDataChange] = useState(false);
    const [sendDataChange, setSendDataChange] = useState(false);
    const [error, setError] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchRolesDatabase())
            .then((response) => {
                console.log(response)
                if (response.meta.requestStatus === 'rejected') {
                    // alert('Произошла ошибка')


                    console.log("Request failed")
                    console.log(response)

                } else if (response.meta.requestStatus === 'fulfilled') {
                    console.log("Request fulfilled")
                    const items = response.payload; // assuming the API returns an array of items
                    // @ts-ignore
                    const dataprod = items.map((item) => ({
                        role_id: item.role_id,
                        user_role: item.user_role,
                    }));

                    console.log("dataprod:", dataprod);
                    console.log("items:", items);

                    setUsersData(dataprod);
                    console.log("done");
                }
            })
            .catch((error) => {
                console.log(error)
                // alert('Ошибка произошла.')

            })
    }, []);
    const pathname = usePathname();
    const lang = pathname.split('/')[1];








    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result;
                if (result !== null && typeof result === 'string') {
                    // setValue("avatarurl",result)
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
        formData.append('csv', file);
        // console.log(formData.get('csv')); // Should log the appended file
        try {
            const response = await axios.post(`${api_url}/uploadCSVUnsplash/1`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {
                    console.log(response);

                    if ((response.status === 200 && response.data === "CSV data uploaded successfully.") || response === undefined) {
                        // alert("Данные добавлены в бд");
                        setSuccessDataChange(true);
                    } else {
                        console.error('Ошибка при отправке файла:', response.status, response.data);
                        // alert('Произошла ошибка при отправке картинки,попробуйте выбрать файл еще раз ');
                        setError(true);

                    }
                })
                .catch(error => {
                    console.error('Error uploading file:', error);
                    console.error('Error message:', error.message);
                    console.error('Error config:', error.config);
                    setSendDataChange(true)
                });

            // alert("Данные добавлены в бд");
            setSuccessDataChange(true);


            console.log(response);

        } catch (error) {
            console.error('Ошибка при загрузке файла:', error);
            setSendDataChange(true)
            // alert(`Произошла ошибка при загрузки файла,попробуйте выбрать файл еще раз ${error}`,);
        }
    };









    const columns = [
        {
            key: "role_id",
            label: lang === "ru" ? "role_id" : "role_id",
        },
        {
            key: "user_role",
            label: lang === "ru" ? "Название роли" : "Role",
        }

    ];

    return(
        <>
            <CSVLink className="text-76 text-xl" data={UsersData}>Скачать сsv файл </CSVLink>
            <div className="flex flex-nowrap flex-row gap-2">

            <p className="text-xl mt-2">Загрузить данные в таблицу ролей csv файл:</p>
            <input type="file" className="mb-2" onChange={handleFileChange}/>
            </div>

            <Table aria-label="Example table with dynamic content">
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={items}>
                    {(item) => (
                        <TableRow key={item.role_id}>
                            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
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
                        <div className="ms-3 text-sm font-normal">{lang === "en" ? <>The data does not match the database!</> : <>Данные не соответствуют базе данных!</>}</div>
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
                        <div className="ms-3 text-sm font-normal">{lang === "en" ? <>Data added to the database.</> : <>Данные добавлены в базу данных.</>}</div>
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
        </>
    )
}