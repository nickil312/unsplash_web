import {usePathname} from "next/navigation";
import Link from "next/link";
import Nav from "@/app/components/account/Nav";
import {useSelector} from "react-redux";
import {RootState} from "@/app/globalRedux/store";
import EditProf_Form from "@/app/[lang]/(account)/account/EditProf_Form";

export default function AccountPage() {

    return (

        <EditProf_Form />


    )
}