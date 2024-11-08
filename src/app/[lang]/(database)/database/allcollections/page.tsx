'use client'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/globalRedux/store";
import React, {useCallback, useEffect, useState} from "react";
import {Collections, ViewsLikes} from "@/app/globalRedux/posts/types";
import {fetchAllCollectionsDatabase, fetchLikesViewsDatabase} from "@/app/globalRedux/posts/asyncActions";
import {usePathname} from "next/navigation";
import {Chip, ChipProps, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import {CSVLink} from "react-csv";

const statusColorMap: Record<string, ChipProps["color"]> = {
    active: "success",
    paused: "danger",
    vacation: "warning",
    secondary: "secondary",
    primary: "primary",
    default: "default"
};
export default function AllCollections() {
    const {items, status} = useSelector((state: RootState) => (state.posts.DatabaseAllCollections))
    const [CollectionsData, setCollectionsData] = useState<Collections[]>([]);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchAllCollectionsDatabase())
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
                        user_id: item.user_id,
                        createdat: item.createdat,
                        name: item.name,
                        description: item.description,
                        private: item.private,
                        deleted: item.deleted,
                    }));

                    console.log("dataprod:", dataprod);
                    console.log("items:", items);

                    setCollectionsData(dataprod);
                    console.log("done");
                }
            })
            .catch((error) => {
                console.log(error)
                // alert('Ошибка произошла.')

            })
    }, [])
    const pathname = usePathname();
    const lang = pathname.split('/')[1];
    const columns = [
        {
            key: "_id",
            label: lang === "ru" ? "_id" : "_id",
        },
        {
            key: "user_id",
            label: lang === "ru" ? "id владельца" : "Post id",
        },
        {
            key: "name",
            label: lang === "ru" ? "Название коллекции" : "Collection name",
        },
        {
            key: "description",
            label: lang === "ru" ? "Описание коллекции" : "Collection desc",
        },
        {
            key: "private",
            label: lang === "ru" ? "Приватная" : "Private",
        },
        {
            key: "deleted",
            label: lang === "ru" ? "Удалена" : "Deleted",
        },
        {
            key: "createdat",
            label: lang === "ru" ? "Дата создания" : "Creation Date",
        },
    ];

    const renderCell = useCallback((user: Collections, columnKey: React.Key) => {
        const cellValue = user[columnKey as keyof Collections];

        switch (columnKey) {
            case "private":
                let bannedStatus = user.private ? "paused" : "active";
                return (
                    <Chip className="capitalize" color={statusColorMap[bannedStatus]} size="sm" variant="flat">
                        {lang === "en" ? (user.private ? "Private" : "Not private") : (cellValue ? "Приватная" : "Не приватная")}
                    </Chip>
                );
            case "deleted":
                let DeletedStatus = user.deleted ? "paused" : "active";
                return (
                    <Chip className="capitalize" color={statusColorMap[DeletedStatus]} size="sm" variant="flat">
                        {lang === "en" ? (user.deleted ? "Deleted" : "Not deleted") : (cellValue ? "Удалена" : "Не удалена")}
                    </Chip>
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

            default:
                return cellValue;
        }
    }, []);


    return (
        <>
            <CSVLink className="text-76 text-xl" data={CollectionsData}>Скачать сsv файл </CSVLink>

            <Table
                isHeaderSticky
                aria-label="Example table with dynamic content">
                <TableHeader columns={columns}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody items={items}>
                    {(item) => (
                        <TableRow key={item._id}>
                            {/*// @ts-ignore*/}
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}