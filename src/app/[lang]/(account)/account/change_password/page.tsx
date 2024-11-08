import ChangePassForm from "@/app/[lang]/(account)/account/change_password/ChangePassForm";


export default function ChangePassword() {
    return (
        <>

            <p className="settings_Title_adaptive">Change password</p>
            {/*<div className="w-full">*/}

                <ChangePassForm/>
            {/*</div>*/}
        </>
    )
}