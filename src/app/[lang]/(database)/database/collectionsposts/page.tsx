'use client'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/app/globalRedux/store";
import React, {useCallback, useEffect, useState} from "react";
import {CollectionPostsDatabase, Collections, ViewsLikes} from "@/app/globalRedux/posts/types";
import {
    fetchAllCollectionsDatabase,
    fetchCollectionsPostsDatabase,
    fetchLikesViewsDatabase
} from "@/app/globalRedux/posts/asyncActions";
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
    const {items, status} = useSelector((state: RootState) => (state.posts.DatabaseCollectionsPosts))
    const [CollectionsData, setCollectionsData] = useState<Collections[]>([]);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(fetchCollectionsPostsDatabase())
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
                        collection_id: item.collection_id,
                        post_id: item.post_id
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
            key: "collection_id",
            label: lang === "ru" ? "_id коллекции" : "collection _id ",
        },
        {
            key: "post_id",
            label: lang === "ru" ? "id post" : "Post id",
        }
    ];

    const renderCell = useCallback((user: CollectionPostsDatabase, columnKey: React.Key) => {
        const cellValue = user[columnKey as keyof CollectionPostsDatabase];

        switch (columnKey) {
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
                        <TableRow key={item.collection_id}>
                            {/*// @ts-ignore*/}
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </>
    )
}