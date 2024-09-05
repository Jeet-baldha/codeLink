import React, { useEffect, useState } from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import Select from 'react-select'
import { updateUserDetails } from '../../Store/UserSlice.js'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import languages from '../../Data/Language.js';
import debounce from 'lodash.debounce';
import themes from '../../Data/Themes.js';

function Setting({ width, setWidth }) {

    const [fontSize, setFontSize] = useState(14);
    const language = useSelector((state) => state.user.language)
    const theme = useSelector((state) => state.user.theme)

    const dispatch = useDispatch();
    const [selectedTheme, setSelectedTheme] = useState( themes.find( item => item.value == theme));
    const [selectedLanguage, setSelectedLanguage] = useState( { "value": "plaintext", "label": "Plain Text" });


    useEffect(() => {
       console.log(selectedTheme); 
    },[])

    const handleLanguageChange = (selectedValue) => {
        dispatch(updateUserDetails({ language: selectedValue.value }))
        setSelectedLanguage(selectedValue);
    }

    const handleThemeChange = (selectedValue) => {
        setSelectedTheme(selectedValue);
        dispatch(updateUserDetails({ theme: selectedValue.value }))
    }

    const updateFontState = debounce( fontSize => {
        dispatch(updateUserDetails({ fontSize: Number(fontSize)}))
    },1000)

    const handleFontSize = (e) => {
        setFontSize(Number(e.target.value));
        updateFontState(e.target.value);
    }



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
                <Select options={languages} onChange={handleLanguageChange} value={selectedLanguage} defaultValue={ { "value": "plaintext", "label": "Plain Text" }} placeholder="Select an option" className=' bg-white text-black rounded-sm' />
            </div>
            <div className=' px-5'>
                <h1 className=' text-xl py-2'>Select Your Theme: </h1>
                <Select options={themes} onChange={handleThemeChange} value={selectedTheme} placeholder="Select an option" className=' bg-white text-black rounded-sm' />
            </div>
            <div className=' px-5 flex gap-10 py-5 items-center'>
                <h1 className=' text-xl py-2'>Select Font Size: </h1>
                <input type='number' value={fontSize} onChange={handleFontSize} step={2} min={14} max={40} className=' w-16 p-2 text-black h-6 rounded-sm'/>
            </div>
        </div>
    )
}

export default Setting