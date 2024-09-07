import React, { useEffect, useState } from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import { TbMinusVertical } from "react-icons/tb";
import { LeetCode } from "leetcode-query";
import axios from 'axios';
import GetProblemLink from './GetProblemLink';
import Loder from '../Loder/Loder';


function LeetCodeProblem({ width, setWidth }) {

    const [isResizing, setIsResizing] = useState(false);
    const [startX, setStartX] = useState(0); // Initial mouse X position
    const [startWidth, setStartWidth] = useState(0); // Initial box width
    const [getProblem,setGetProblem]  = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handleMouseDown = (event) => {
        setIsResizing(true);
        setStartX(event.clientX); // Capture starting X position
        setStartWidth(width); // Capture initial width
    };

    const handleMouseMove = (event) => {
        if (isResizing) {
            const deltaX = startX - event.clientX; // Invert the delta (right-to-left increases width)
            const newWidth = startWidth + deltaX; // Add the inverted delta to the initial width
            if (newWidth > 400 && newWidth < 1200) {
                setWidth(newWidth);
            }
        }
    };

    const handleMouseUp = () => {
        setIsResizing(false);
    };

    // Manage mouse events for resizing
    useEffect(() => {
        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'col-resize';
            setResizeHandleStyle({'background-color': 'white','color':'#222831'});
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'auto'; // Reset cursor after resizing
            setResizeHandleStyle({});
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'auto'; // Reset cursor if component unmounts
        };
    }, [isResizing]);

    const [resizeHandleStyle,setResizeHandleStyle] = useState({})


    const getProblemContent = async (slug) => {

        try {
            if(slug !== ""){
                setIsLoading(true)
                const result = await axios.get(`http://localhost:3000/problem/${slug}`);
                console.log(result.data.problem);
                setIsLoading(false);
                setGetProblem(false);
            }
            else{
                alert("Problem not found");
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            alert(error.message);
        }

    }


    return (
        <div className={`overflow-auto  text-white bg-dark-blue-black h-full  flex`} style={{ width: `${width}px` }}>
        { getProblem ? <GetProblemLink isLoading={isLoading} getProblemContent={getProblemContent} /> :
            <div className='h-0'>
                <div className='w-2  hover:bg-white hover:text-dark-blue-black h-full flex items-center text-2xl flex-col justify-center cursor-ew-resize'
                    onMouseDown={handleMouseDown} style={resizeHandleStyle}>
                        <TbMinusVertical className=' text-4xl'/>
                    </div>
                <div className=' py-10' onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}>
                    <div className=' flex px-5 justify-between items-center'>
                        <h1 className=' text-2xl'>Leetcode Problem</h1>
                        <button className=' border-2 border-white px-2 py-1'>Change problem</button>
                        <IoIosCloseCircle className=' hover:cursor-pointer text-2xl' onClick={() => setWidth(0)} />
                    </div>
                    <div className=' p-5'>
                        <h1 className=' text-2xl font-bold'>2028. Find Missing Observations</h1>
                        <div className=' py-3'>
                            <p>You have observations of n + m 6-sided dice rolls with each face numbered from 1 to 6. n of the observations went missing, and you only have the observations of m rolls. Fortunately, you have also calculated the average value of the n + m rolls.<br></br><br></br>
                                You are given an integer array rolls of length m where rolls[i] is the value of the ith observation. You are also given the two integers mean and n.<br></br><br></br>
                                Return an array of length n containing the missing observations such that the average value of the n + m rolls is exactly mean. If there are multiple valid answers, return any of them. If no such array exists, return an empty array.<br></br><br></br>
                                The average value of a set of k numbers is the sum of the numbers divided by k.<br></br><br></br>
                                Note that mean is an integer, so the sum of the n + m rolls should be divisible by n + m.</p>
                        </div>
                        <div className='py-3 bg-dark-grayish-blue px-2 rounded-sm text-white my-2'>
                            <h1 className=' font-bold text-xl'>Example 1:</h1>
                            <div className=' flex gap-2'>
                                <h3 className=' font-bold'>Input:</h3>
                                <p> rolls = [3,2,4,3], mean = 4, n = 2</p>
                            </div>
                            <div className=' flex gap-2'>
                                <h3 className=' font-bold'>Output:</h3>
                                <p> [6,6]</p>
                            </div>
                            <div className=' flex gap-2'>
                                <h3 className=' font-bold'>Explanation:</h3>
                                <p> The mean of all n + m rolls is (3 + 2 + 4 + 3 + 6 + 6) / 6 = 4.</p>
                            </div>
                        </div>
                        <div className='py-3 bg-dark-grayish-blue px-2 rounded-sm text-white my-2'>
                            <h1 className=' font-bold text-xl'>Example 2:</h1>
                            <div className=' flex gap-2'>
                                <h3 className=' font-bold'>Input:</h3>
                                <p> rolls = [3,2,4,3], mean = 4, n = 2</p>
                            </div>
                            <div className=' flex gap-2'>
                                <h3 className=' font-bold'>Output:</h3>
                                <p> [6,6]</p>
                            </div>
                            <div className=' flex gap-2'>
                                <h3 className=' font-bold'>Explanation:</h3>
                                <p> The mean of all n + m rolls is (3 + 2 + 4 + 3 + 6 + 6) / 6 = 4.</p>
                            </div>
                        </div>
                        <div className=' my-5'>
                            <h3 className=' text-xl font-bold'>Constraints:</h3>
                            <ul className=' list-disc px-5'>
                                <li>m == rolls.length</li>
                                <li>{'1 < n, m < 105'}</li>
                                <li>{'1 < rolls[i], mean < 65'}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default LeetCodeProblem