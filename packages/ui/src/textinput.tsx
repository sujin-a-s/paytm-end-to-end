"use client"

import { useState } from "react"

interface textinputProps {
    label : string,
    onInputChange : (value : string )=>void,
    numeric ?: boolean
}


const TextInput = ({label,onInputChange,numeric=false}:textinputProps)=> {

    return(
        <div className="mt-3 w-full">
            <div className="mb-2  font-medium text-gray-900">{label}</div>
            <input type={numeric ? "number" : "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" onChange={(e)=>onInputChange(e.target.value)}></input>
        </div>
    )
}

export default TextInput