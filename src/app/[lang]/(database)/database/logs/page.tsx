'use client'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/globalRedux/store";
import React, {useCallback, useEffect} from "react";
import {fetchAllCollectionsDatabase, fetchLogsDatabase} from "@/app/globalRedux/posts/asyncActions";
import {usePathname} from "next/navigation";
import {Collections} from "@/app/globalRedux/posts/types";
import {Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import {Logs} from "@/app/globalRedux/posts/types";

export default function Logs(){
    const {items, status} = useSelector((state: RootState) => (state.posts.DatabaseLogs))

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchLogsDatabase())
    },[])
    const pathname = usePathname();
    const lang = pathname.split('/')[1];
    const columns = [
        {
            key: "user_id",
            label: lang === "ru" ? "id пользователя" : "User id",
        },

        {
            key: "action",
            label: lang === "ru" ? "Действие" : "Action",
        },

        {
            key: "created_at",
            label: lang === "ru" ? "Дата создания" : "Creation Date",
        },
    ];
    const renderCell = useCallback((user: Logs, columnKey: React.Key) => {
        const cellValue = user[columnKey as keyof Logs];

        switch (columnKey) {
            case "action":
                let actionText;

                switch (user.action) {
                    case "user_change_password":
                        actionText = lang === "en" ? "Password changed" : "Пароль изменён";
                        break;
                    case "user_update_post":
                        actionText = lang === "en" ? "Post updated" : "Пост обновлён";
                        break;
                    case "user_change_hire":
                        actionText = lang === "en" ? "Hire changed" : "Нанятие изменено";
                        break;
                    case "user_add_post_to_collection":
                        actionText = lang === "en" ? "Post added to collection" : "Пост добавлен в коллекцию";
                        break;
                    case "user_remove_post_from_collection":
                        actionText = lang === "en" ? "Post removed from collection" : "Пост удалён из коллекции";
                        break;
                    case "user_change_collection_detail":
                        actionText = lang === "en" ? "Collection details changed" : "Детали коллекции изменены";
                        break;
                        case "user_change_profile_data":
                        actionText = lang === "en" ? "Change profile data" : "Данные профиля изменены";
                        break;
                    default:
                        actionText = "Error"
                }
                return (
                    <Chip className="capitalize" size="sm" variant="flat">
                        {actionText}
                    </Chip>
                );


            case "created_at":
                return (
                    <Chip className="capitalize" size="sm" variant="flat">
                        {new Intl.DateTimeFormat(`${lang}`, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute:"numeric"
                        }).format(new Date(user.created_at))}
                    </Chip>
                );

            default:
                return cellValue;
        }
    }, []);

    return(
        <Table
            isHeaderSticky
            aria-label="Example table with dynamic content">
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={items}>
                {(item) => (
                    <TableRow key={item.created_at}>
                        {/*// @ts-ignore*/}
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}