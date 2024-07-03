"use client"
import { ReactNode } from "react"
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
    icon : ReactNode,
    label : string,
    href : string
}

export const Sidebaritems = ({icon,label,href}:SidebarItemProps) => {
    const router = useRouter()
    const pathname = usePathname()
    const selected = pathname == href
    return (
        <div className={`flex  items-center  ${selected ? "text-[#6a51a6]" : "text-slate-500"} cursor-pointer  p-2 pl-8`} onClick={()=>router.push(href)}>
            <div className="pr-2">{icon}</div>
            <div className={`font-bold flex ${selected ? "text-[#6a51a6]" : "text-slate-500"} cursor-pointer  p-2 pl-8`}>{label}</div>
        </div>
    ) 
}