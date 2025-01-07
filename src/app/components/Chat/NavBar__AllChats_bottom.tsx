import {Modal, ModalBody, ModalContent, useDisclosure} from "@nextui-org/modal";
import {router} from "next/client";
import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/app/globalRedux/store";
import ChatGroupCreateModal from "@/app/components/Chat/modal/ChatGroupCreateModal";

export default function NavBarAllChats_bottom({lang}:{lang:string}) {
    const {data} = useSelector((state: RootState) => state.users);
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return(
        <>

            <Modal size="xl" placement="center" onOpenChange={onOpenChange} isOpen={isOpen}
                   classNames={{
                       body: "p-4 rounded-sm dark:bg-black"
                   }}>
                <ModalContent>


                    <ModalBody>
                        <ChatGroupCreateModal lang={lang}/>
                    </ModalBody>


                </ModalContent>
            </Modal>

            <div className="flex items-center justify-start w-full"
                 onClick={() => (data !== null ? onOpen() : router.push(`/${lang}/`))}

            >
                <p>Создать групповой чат</p>
            </div>
        </>
    )
}