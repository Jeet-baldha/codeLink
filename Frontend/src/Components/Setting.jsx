import React, { useEffect, useState } from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import Select from 'react-select'
import { updateUserDetails } from '../Store/UserSlice.js'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import languages from '../Data/Language.js';
import themes from '../Data/Themes.js';

function Setting({ width, setWidth }) {

    const [fontSize, setFontSize] = useState(14);
    const language = useSelector((state) => state.user.language)
    const theme = useSelector((state) => state.user.theme)
    const dispactch = useDispatch();
    const [selectedTheme, setSelectedTheme] = useState({ "value": "monokai", "label": "Monokai" },);
    const [selectedLanguage, setSelectedLanguage] = useState( { "value": "plaintext", "label": "Plain Text" });



    const handleLanguageChange = (selectedValue) => {
        dispactch(updateUserDetails({ language: selectedValue.value }))
        setSelectedLanguage(selectedValue);
    }

    const handleThemeChange = (selectedValue) => {
        setSelectedTheme(selectedValue);
        dispactch(updateUserDetails({ theme: selectedValue.value }))
    }

    const handleFontSize = (e) => {
        setFontSize(Number(e.target.value));
        dispactch(updateUserDetails({ fontSize: Number(e.target.value)}))
    }

    useEffect(() => {
        console.log(language);
        console.log(theme);
    }, [language,theme])


    const style = {
        width: width + 'px',
    }

    return (
        <div style={style} className={`overflow-hidden  text-white bg-dark-blue-black h-full py-10 duration-200 `}>
            <div className='flex text-xl py-2 items-center justify-between px-5'>
                <h1 className=' text-2xl font-bold text-light-bluish-green ' >Seeting</h1>
                <IoIosCloseCircle className=' hover:cursor-pointer text-2xl' onClick={() => setWidth(0)} />
            </div>
            <div className=' px-5'>
                <h1 className=' text-xl py-2'>Select Your Language: </h1>
                <Select options={languages} onChange={handleLanguageChange} value={selectedLanguage} defaultValue={ { "value": "plaintext", "label": "Plain Text" }} placeholder="Select an option" className=' bg-white text-black' />
            </div>
            <div className=' px-5'>
                <h1 className=' text-xl py-2'>Select Your Theme: </h1>
                <Select options={themes} onChange={handleThemeChange} value={selectedTheme} placeholder="Select an option" className=' bg-white text-black' />
            </div>
            <div className=' px-5 flex gap-10 py-5 items-center'>
                <h1 className=' text-xl py-2'>Select Font Size: </h1>
                <input type='number' value={fontSize} onChange={handleFontSize} min={0} max={40} className=' w-16 p-2 text-black h-6' />
            </div>
        </div>
    )
}

export default Setting