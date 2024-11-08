'use client'
import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/globalRedux/store";
import {fetchRolesDatabase} from "@/app/globalRedux/users/asyncActions";
import {
    Chip,
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
import {fetchPostsDatabase} from "@/app/globalRedux/posts/asyncActions";
import {UsersForTable} from "@/app/globalRedux/users/types";
import {Posts, ViewsLikes} from "@/app/globalRedux/posts/types";
import {CSVLink} from "react-csv";

const statusColorMap: Record<string, ChipProps["color"]> = {
    active: "success",
    paused: "danger",
    vacation: "warning",
    secondary: "secondary",
    primary: "primary",
    default: "default"
};
export default function DatabaseRoles() {
    const {items, status} = useSelector((state: RootState) => (state.posts.DatabasePosts))
    const {api_url} = useSelector((state: RootState) => (state.users))
    const [UsersData, setUsersData] = useState<Posts[]>([]);

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchPostsDatabase())
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
                        _id: item._id,
                        title: item.title,
                        text: item.text,
                        tags: item.tags,
                        imageurl: item.imageurl,
                        user_id: item.user_id,
                        createdat: item.createdat,
                        updatedat: item.updatedat,
                        category: item.category,
                        cameracompany: item.cameracompany,
                        model: item.model,
                        shutterspeed: item.shutterspeed,
                        aperture: item.aperture,
                        focallength: item.focallength,
                        dimensions: item.dimensions,
                        isocam: item.isocam,
                        banned: item.banned,
                        admin_id: item.admin_id,
                        reasonofban: item.reasonofban,
                        posttype: item.posttype,
                        license: item.license,
                        orientation: item.orientation,
                        deleted: item.deleted
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

    const columns = [
        {
            key: "_id",
            label: lang === "ru" ? "_id" : "_id",
        },
        {
            key: "title",
            label: lang === "ru" ? "Название" : "Title",
        },
        {
            key: "text",
            label: lang === "ru" ? "Текст" : "Text",
        },
        {
            key: "imageurl",
            label: lang === "ru" ? "Картинка" : "Image",
        },
        {
            key: "tags",
            label: lang === "ru" ? "Теги" : "Tags",
        },
        {
            key: "user_id",
            label: lang === "ru" ? "id пользователя" : "User id",
        },
        {
            key: "category",
            label: lang === "ru" ? "Категория" : "Category",
        },
        {
            key: "cameracompany",
            label: lang === "ru" ? "Компания камеры" : "Camera company",
        },
        {
            key: "model",
            label: lang === "ru" ? "Модель" : "Model",
        },
        {
            key: "shutterspeed",
            label: lang === "ru" ? "Скорость затвора" : "Shutter speed",
        },
        {
            key: "aperture",
            label: lang === "ru" ? "Диафрагма" : "Aperture",
        },
        {
            key: "focallength",
            label: lang === "ru" ? "Фокусное расстояние" : "Focal length",
        },
        {
            key: "dimensions",
            label: lang === "ru" ? "Разрешение" : "Dimensions",
        },
        {
            key: "isocam",
            label: lang === "ru" ? "ISO" : "ISO",
        },
        {
            key: "banned",
            label: lang === "ru" ? "Заблокирован" : "Banned",
        },
        {
            key: "deleted",
            label: lang === "ru" ? "Удален" : "Deleted",
        },
        {
            key: "orientation",
            label: lang === "ru" ? "Ориентация записи" : "Orientation",
        },
        {
            key: "posttype",
            label: lang === "ru" ? "Тип записи" : "Post type",
        },
        {
            key: "license",
            label: lang === "ru" ? "Лицензия" : "License",
        },

        {
            key: "createdat",
            label: lang === "ru" ? "Дата создания" : "Creation date",
        },
        {
            key: "updatedat",
            label: lang === "ru" ? "Дата изменения" : "Update date",
        },
    ];
    const renderCell = useCallback((user: Posts, columnKey: React.Key) => {
        const cellValue = user[columnKey as keyof Posts];

        switch (columnKey) {
            case "imageurl":
                return (
                    // <Chip   >
                    <img className="rounded object-cover w-12 h-12" src={`${api_url}/${user.imageurl}`}
                         alt="user photo"/>
                    // </Chip>
                );
            case "banned":
                let bannedStatus = user.banned ? "paused" : "active";
                return (
                    <Chip className="capitalize" color={statusColorMap[bannedStatus]} size="sm" variant="flat">
                        {lang === "en" ? (user.banned ? "Banned" : "Not Banned") : (cellValue ? "Заблокирован" : "Не заблокирован")}
                    </Chip>
                );
            case "deleted":
                let deletedStatus = user.deleted ? "paused" : "active";
                return (
                    <Chip className="capitalize" color={statusColorMap[deletedStatus]} size="sm" variant="flat">
                        {lang === "en" ? (user.deleted ? "Deleted" : "Not deleted") : (cellValue ? "Удален" : "Не удален")}
                    </Chip>
                );

            case "tags":
                return (
                    <>
                        {/*<Chip className="capitalize" size="sm" variant="flat">*/}
                        {user.tags.join(', ')}
                        {/*</Chip>*/}
                    </>
                );

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
            case "updatedat":
                return (
                    <Chip className="capitalize" size="sm" variant="flat">
                        {new Intl.DateTimeFormat(`${lang}`, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }).format(new Date(user.updatedat))}
                    </Chip>
                );

            default:
                return cellValue;
        }
    }, []);


    return (
        <>
            <CSVLink className="text-76 text-xl" data={UsersData}>Скачать сsv файл </CSVLink>

            <Table aria-label="Example table with dynamic content">
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={items}>
                    {(item) => (
                        <TableRow key={item._id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}