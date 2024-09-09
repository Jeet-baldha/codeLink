import React, { useState } from 'react'
import Loder from '../../Loder/Loder';
function GetProblemLink({isLoading, getProblemContent}) {

    const [link,setLink] = useState("");

    const submitForm = (e) => {
        e.preventDefault();
        if(e.link != ""){
            // setLink(e.target.link.value);
            console.log(link);
            getSlugFromURL(link);
        }   

    }

    function getSlugFromURL(url) {
        // Match the part of the URL after /problems/ and before the next /
        const regex = /^https:\/\/leetcode\.com\/problems\/([^\/]+)\/?(description\/?)?$/;
        const match = url.match(regex);
        
        if (match && match[1]) {
            getProblemContent(match[1]);
        } else {
            alert("invalid URL: " + url);
            setLink("");
        }
    }
    
    return (
        <div className=' w-full p-10 overflow-hidden'>

            
            <form className=' flex flex-col gap-2 overflow-hidden' onSubmit={submitForm}>
                <label className=' text-xl font-semibold'>Enter Leetcode Problem Link</label>
                <input className=' bg-dark-grayish-blue px-2 py-2' type='text' value={link} name='link' onChange={ (e) => setLink(e.target.value)} placeholder='https://leetcode.com/problems/two-sum'></input>
                <button className='mt-2 border-2 border-white py-1 text-xl font-bold hover:bg-white hover:text-dark-blue-black' type='submit'>Get Problem</button>
            </form>
            {isLoading && <Loder />}
        </div>
    )
}

export default GetProblemLink