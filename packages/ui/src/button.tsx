"use client"
import { ReactNode } from "react"

interface Button {
  onClick : ()=>void,
  children : ReactNode,
  classname : string
}


export const Button = ({onClick,children,classname}:Button)=>{
  return (


      <button onClick = {onClick} type="button" className={`w-full ${classname} hover:bg-[#4A484D] focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-[#4A484D] dark:hover:bg-[#4A484D] dark:focus:ring-blue-800`}>
        {children}
      </button>


  )
}