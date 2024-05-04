import React, { useEffect, useState } from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import Select from 'react-select'

function Setting({width,setWidth}) {

    const [fontSize,setFontSize] = useState(0);

    const languages = [
        { value: 'javascript', label: 'javascript' },
        { value: 'java', label: 'java' },
        { value: 'python', label: 'python' },
        { value: 'mysql', label: 'mysql' },
        { value: 'ruby', label: 'ruby' },
        { value: 'html', label: 'html' },
        { value: 'golang', label: 'golang' },
        { value: 'csharp', label: 'csharp' },
        { value: 'typescript', label: 'typescript' },
        { value: 'css', label: 'css' },
    ]


    const style = {
        width:width+'px',
    }

    return (
        <div style={style} className={`overflow-hidden  text-white bg-dark-blue-black h-full py-10 duration-200 `}>
            <div className='flex text-xl py-2 items-center justify-between px-5'>
                <h1 className=' text-2xl font-bold text-light-bluish-green ' >Seeting</h1>
                <IoIosCloseCircle className=' hover:cursor-pointer text-2xl'  onClick={ () => setWidth(0)}/>
            </div>
            <div className=' px-5'>
                <h1 className=' text-xl py-2'>Select Your Language: </h1>
                <Select options={languages}  defaultValue="Javascript" placeholder="Select an option" className=' bg-white text-black'/>
            </div>
            <div className=' px-5'>
                <h1 className=' text-xl py-2'>Select Your Theme: </h1>
                <Select options={languages}  defaultValue="Javascript" placeholder="Select an option" className=' bg-white text-black'/>
            </div>
            <div className=' px-5 flex gap-10 py-5 items-center'>
                <h1 className=' text-xl py-2'>Select Font Size: </h1>
                <input type='number' value={fontSize} onChange={ (e) => setFontSize(e.target.value)} min={0} max={40}  className=' w-16 p-2 text-black h-6'/>
            </div>
        </div>
    )
}

export default Setting