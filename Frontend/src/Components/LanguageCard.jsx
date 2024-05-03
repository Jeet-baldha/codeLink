import React from 'react'
import { FaReact } from "react-icons/fa";
import { TbBrandCpp } from "react-icons/tb";
import c from '../Images/LanguageLogo/c-sharp.png'

function LanguageCard() {
    return (
        <div className=' text-blue-500 rounded-md bg-gray-800    font-extrabold flex-col flex justify-center items-center text-5xl p-2 shadow-lg'>
            <img src={c} />
            <h1 className=' text-2xl font-bold p-2 text-light-gray'>C#</h1>
        </div>
    )
}

export default LanguageCard