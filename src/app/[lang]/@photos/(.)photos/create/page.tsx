'use client'
import CreateForm from "@/app/[lang]/(photos & illustrations)/photos/create/CreateForm";
import {Modal, ModalBody, ModalContent, ModalFooter} from "@nextui-org/modal";
import {Button} from "@nextui-org/button";
import React from "react";
import {useRouter} from "next/navigation";

export default function CreatePostModal() {
    const router = useRouter();

    return (
        <Modal
            size="5xl"
            backdrop="opaque"
            isOpen={true}
            scrollBehavior='outside'
            placement="center"
            onClose={() => router.back()}
            isDismissable={true}
            isKeyboardDismissDisabled={false}
            classNames={{}}
        >
            <ModalContent>
                {/*<ModalHeader className="flex flex-col gap-1">*/}
                {/*    Modal Title*/}
                {/*</ModalHeader>*/}
                <ModalBody>
                    <main>
                        <p className="flex justify-center items-center">Создание поста</p>
                        {/*<h2 className="text-primary text-center">Add a new Post</h2>*/}
                        <CreateForm pageModalStatus={true}/>
                    </main>
                </ModalBody>


            </ModalContent>
        </Modal>
    )
}