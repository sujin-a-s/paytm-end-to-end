import { Button } from "./button"
import { getServerSession } from "next-auth"


interface AppbarProps {
    user : any ,
    onSignout : ()=>void,
    onSignin : ()=>void,
}
export const Appbar = ({user,onSignin,onSignout}:AppbarProps)=> {
    return (
        <div className="flex justify-between bg-gradient-to-r from-[#F1F0F7] to-blue-100 text-black p-4 text-lg shadow-md border border-gray-300" >
            <div className="text-lg flex flex-col justify-center">Paytm</div>
            <div></div>
            <div className="pt-2 flex flex-col justify-center">
                <Button classname="text-white bg-[#524568]" onClick = {user?onSignout:onSignin}>{user?"Logout":"Login"}</Button>
            </div>
        </div>
    )
}


