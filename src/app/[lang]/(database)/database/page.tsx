"use client"
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/globalRedux/store";
import {fetchUsersStatistics} from "@/app/globalRedux/users/asyncActions";
import {
    Chip,
    ChipProps,
    ScrollShadow,
    Table, TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip
} from "@nextui-org/react";
import {usePathname} from "next/navigation";
import {Status, Users, UsersForTable} from "@/app/globalRedux/users/types";
import {CSVLink} from "react-csv";


const statusColorMap: Record<string, ChipProps["color"]> = {
    active: "success",
    paused: "danger",
    vacation: "warning",
    secondary: "secondary",
    primary: "primary",
    default: "default"
};
export default function DatabaseMainPage() {
    const {data, api_url} = useSelector((state: RootState) => (state.users))
    const {items, status} = useSelector((state: RootState) => (state.users.userStatistics))
    const pathname = usePathname();
    const lang = pathname.split('/')[1];
    const [UsersData, setUsersData] = useState<UsersForTable[]>([]);

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchUsersStatistics())
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
                    const dataprod = items.users.map((item) => ({
                        _id: item._id,
                        fullname: item.fullname,
                        email: item.email,
                        passwordhash: item.passwordhash,
                        avatarurl: item.avatarurl,
                        createdat: item.createdat,
                        updatedat: item.updatedat,
                        user_role_id: item.user_role_id,
                        banned: item.banned,
                        location: item.location,
                        bio: item.bio,
                        messages: item.messages,
                        cities: item.cities,
                        work: item.work,
                        hirevalue: item.hirevalue,
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

    const columns = [
        {
            key: "_id",
            label: lang === "ru" ? "_id" : "_id",
        },
        {
            key: "fullname",
            label: lang === "ru" ? "Имя" : "Name",
        },
        {
            key: "email",
            label: lang === "ru" ? "Почта" : "Email",
        },
        {
            key: "avatarurl",
            label: lang === "ru" ? "Аватарка" : "Avatar",
        },
        {
            key: "user_role",
            label: lang === "ru" ? "Название роли" : "Role",
        },
        {
            key: "messages",
            label: lang === "ru" ? "Доступ сообщений" : "Messages",
        },
        {
            key: "bio",
            label: lang === "ru" ? "Инфо польз." : "Bio",
        },
        {
            key: "location",
            label: lang === "ru" ? "Местоположение пользователя" : "User location",
        },
        {
            key: "cities",
            label: lang === "ru" ? "Города для работы" : "Cities for work",
        },
        {
            key: "work",
            label: lang === "ru" ? "Виды работ" : "Work Types",
        },
        {
            key: "banned",
            label: lang === "ru" ? "Заблокирован" : "Banned",
        },
        {
            key: "hirevalue",
            label: lang === "ru" ? "Доступ найма" : "Hiring Access",
        },
        {
            key: "createdat",
            label: lang === "ru" ? "Дата создания аккаунта" : "Account Creation Date",
        },
    ];


    const renderCell = useCallback((user: UsersForTable, columnKey: React.Key) => {
        const cellValue = user[columnKey as keyof UsersForTable];

        switch (columnKey) {
            case "user_role":
                let doneStatus = user.user_role === "Admin" ? "paused" : user.user_role === "User" ? "vacation" : user.user_role === "QA" ? "active" : "";
                return (
                    <Chip className="capitalize" color={statusColorMap[doneStatus]} size="sm" variant="flat">
                        {lang === "en" ? (user.user_role === "Admin" ? "Admin" : user.user_role === "User" ? "User" : user.user_role === "QA" ? "QA" : "") : cellValue}
                    </Chip>
                );
            case "avatarurl":
                return (
                    // <Chip   >
                        <img className="rounded-full w-8 h-8" src={`${api_url}/${user.avatarurl}`} alt="user photo"/>
                    // </Chip>
                );
            case "banned":
                let deletedStatus = user.banned ? "paused" : "active";
                return (
                    <Chip className="capitalize" color={statusColorMap[deletedStatus]} size="sm" variant="flat">
                        {lang === "en" ? (user.banned ? "Banned" : "Not Banned") : (cellValue ? "Заблокирован" : "Не заблокирован")}
                    </Chip>
                );
            case "messages":
                let messagesStatus = user.messages ? "active" : "paused";
                return (
                    <Chip className="capitalize" color={statusColorMap[messagesStatus]} size="sm" variant="flat">
                        {lang === "en" ? (user.messages ? "Available" : "Not Available") : (cellValue ? "Доступны" : "Не доступны")}
                    </Chip>
                );
            case "hirevalue":
                let hirevalueStatus = user.hirevalue ? "active" : "paused";
                return (
                    <Chip className="capitalize" color={statusColorMap[hirevalueStatus]} size="sm" variant="flat">
                        {lang === "en" ? (user.hirevalue ? "Available" : "Not Available") : (cellValue ? "Доступен" : "Не доступен")}
                    </Chip>
                );
            case "bio":
                if (user.bio !== null) {
                    return (
                        <>
                        {/*// <Chip className="capitalize" size="sm" variant="flat">*/}
                            {user.bio}
                        {/*// </Chip>*/}
                        </>
                    );
                } else {
                    return (
                        <Chip className="capitalize" size="sm" variant="flat">
                            {lang === "en" ? "Data not filled in" : "Данные не заполнены"}
                        </Chip>
                    );
                }
            case "location":
                if (user.location !== null) {
                    return (
                        <Chip className="capitalize" size="sm" variant="flat">
                            {user.location}
                        </Chip>
                    );
                } else {
                    return (
                        <Chip className="capitalize" size="sm" variant="flat">
                            {lang === "en" ? "Data not filled in" : "Данные не заполнены"}
                        </Chip>
                    );
                }
            case "cities":
                if (user.cities !== null) {
                    return (
                        <>
                        {/*<Chip className="capitalize" size="sm" variant="flat">*/}
                            {user.cities.join(', ')}
                        {/*</Chip>*/}
                        </>
                    );
                } else {
                    return (
                        <Chip className="capitalize" size="sm" variant="flat">
                            {lang === "en" ? "No cities selected" : "Города не выбраны"}
                        </Chip>
                    );
                }
            case "work":
                if (user.work !== null) {
                    return (
                        <>
                        {/*<Chip className="capitalize" size="sm" variant="flat">*/}
                            {user.work.join(', ')}
                        {/*</Chip>*/}
                        </>
                    );
                } else {
                    return (
                        <Chip className="capitalize" size="sm" variant="flat">
                            {lang === "en" ? "Types of work not selected" : "Виды работ не выбраны"}
                        </Chip>
                    );
                }

            case "createdat":
                return (
                    <Chip className="capitalize" size="sm" variant="flat">
                        {new Intl.DateTimeFormat(`${lang}`, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }).format(new Date(user.createdat))}
                    </Chip>
                );

            default:
                return cellValue;
        }
    }, []);


    return (
        <div className="">
            <p className="text-xl ">{lang === "en" ? <>User registration schedule</> : <>График регистрации
                пользователей</>}</p>
            <p className="text-sm text-76 mb-2">{lang === "en" ? <>Hover over the green column to see detailed
                information</> : <>Hаведите курсор на зеленый столбец чтобы посмотреть детальную информацию</>}</p>
            {
                status === Status.LOADING ? (
                    <div className="animate-pulse flex flex-row gap-2 items-end">
                        <div className="flex items-center  w-8 h-[20px] rounded bg-[#F3F4F6] dark:bg-[#EEEEEE]"></div>
                        <div className="flex items-center  w-8 h-[50px] rounded bg-[#F3F4F6] dark:bg-[#EEEEEE]"></div>
                        <div className="flex items-center  w-8 h-[30px] rounded bg-[#F3F4F6] dark:bg-[#EEEEEE]"></div>
                        <div className="flex items-center  w-8 h-[40px] rounded bg-[#F3F4F6] dark:bg-[#EEEEEE]"></div>
                        <div className="flex items-center  w-8 h-[20px] rounded bg-[#F3F4F6] dark:bg-[#EEEEEE]"></div>
                        <div className="flex items-center  w-8 h-[50px] rounded bg-[#F3F4F6] dark:bg-[#EEEEEE]"></div>
                        <div className="flex items-center  w-8 h-[30px] rounded bg-[#F3F4F6] dark:bg-[#EEEEEE]"></div>
                        <div className="flex items-center  w-8 h-[40px] rounded bg-[#F3F4F6] dark:bg-[#EEEEEE]"></div>
                        <div className="flex items-center  w-8 h-[50px] rounded bg-[#F3F4F6] dark:bg-[#EEEEEE]"></div>
                    </div>
                ) : (


                    items.usersStats.length > 0 ? (
                        <ScrollShadow
                            hideScrollBar
                            offset={100}
                            orientation="horizontal"
                            className="max-w-full  p-0 flex flex-row gap-2 items-end "
                        >
                            {
                                items.usersStats.map((item) => (
                                    <div className="w-8">
                                        <Tooltip
                                            content={
                                                <div className="px-1 py-2">
                                                    <p>{item.usercount} - {lang === "en" ? <>users</> : <>пользователей</>}</p>

                                                    <p>{new Intl.DateTimeFormat(`${lang}`, {
                                                        year: 'numeric',
                                                        month: 'numeric',
                                                        day: 'numeric'
                                                    }).format(new Date(item.createdat))}</p>
                                                </div>
                                            }
                                            color="default">
                                            <div key={item.createdat} className="bg-green-300 w-8 rounded"
                                                 style={{height: `${parseInt(item.usercount) * 20}px`}}>
                                            </div>
                                        </Tooltip>
                                    </div>

                                ))
                            }
                        </ScrollShadow>
                    ) : (
                        <p>{lang === "en" ? <>There is no data on registration</> : <>Данных по регистрации нет</>}</p>
                    )
                )
            }
            <p className="text-xl my-2">{lang === "en" ? <>Users table</> : <>Таблица пользователей</>}</p>
            <CSVLink className="text-76 text-xl" data={UsersData}>Скачать сsv файл </CSVLink>

            <Table aria-label="Example table with dynamic content">
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={items.users}>
                    {(item) => (
                        <TableRow key={item._id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}