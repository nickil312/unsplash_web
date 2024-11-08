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
import {fetchPostsDatabase, fetchReportsDatabase} from "@/app/globalRedux/posts/asyncActions";
import {UsersForTable} from "@/app/globalRedux/users/types";
import {Posts, ReportsDatabase} from "@/app/globalRedux/posts/types";
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
    const {items, status} = useSelector((state: RootState) => (state.posts.DatabaseReports))
    const {api_url} = useSelector((state: RootState) => (state.users))
    const [UsersData, setUsersData] = useState<ReportsDatabase[]>([]);

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchReportsDatabase())
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
                        reason: item.reason,
                        post_id: item.post_id
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
            key: "user_id",
            label: lang === "ru" ? "id пользователя" : "User id",
        },
        {
            key: "reason",
            label: lang === "ru" ? "Причина жалобы" : "reason",
        },
        {
            key: "post_id",
            label: lang === "ru" ? "Id поста" : "post id",
        },

    ];


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
                            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}