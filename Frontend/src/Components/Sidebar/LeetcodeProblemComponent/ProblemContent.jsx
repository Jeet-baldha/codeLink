/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { TbMinusVertical } from "react-icons/tb";
import { IoIosCloseCircle } from "react-icons/io";
import './ProblemContent.css'


function ProblemContent({ width, setWidth, problem, setGetProblem }) {

    const [isResizing, setIsResizing] = useState(false);
    const [startX, setStartX] = useState(0); // Initial mouse X position
    const [startWidth, setStartWidth] = useState(0); // Initial box width
    const handleMouseDown = (event) => {
        setIsResizing(true);
        setStartX(event.clientX); // Capture starting X position
        setStartWidth(width); // Capture initial width
    };

    const handleMouseMove = (event) => {
        if (isResizing) {
            const deltaX = startX - event.clientX; // Invert the delta (right-to-left increases width)
            const newWidth = startWidth + deltaX; // Add the inverted delta to the initial width
            if (newWidth > 480 && newWidth < 1200) {
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
            setResizeHandleStyle({ 'backgroundColor': 'white', 'color': '#222831' });
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

    const [resizeHandleStyle, setResizeHandleStyle] = useState({})

    return (
        <>
            <div className='w-2  hover:bg-white hover:text-dark-blue-black h-auto flex items-center text-2xl flex-col justify-center cursor-ew-resize overflow-hidden' 
                onMouseDown={handleMouseDown} style={resizeHandleStyle}>
                <TbMinusVertical className=' text-4xl' />
            </div>
            <div className=' py-10 overflow-y-auto overflow-x-hidden w-full' onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}>
                <div className=' flex px-5 justify-between items-center'>
                    <h1 className=' text-2xl'>Leetcode Problem</h1>
                    <div className=''>
                        <button className=' border-2 border-white px-2 py-1 inline-block hover:bg-white hover:text-dark-blue-black font-bold rounded-sm' onClick={() => setGetProblem(true)}>Change problem</button>
                        <IoIosCloseCircle className=' hover:cursor-pointer text-2xl inline-block ml-10' onClick={() => setWidth(0)} />
                    </div>
                </div>
                <div className=' p-5 pb-0'>
                {problem && 
                    <>
                    <h1 className=' text-xl font-semibold mb-5' >{problem.id}. {problem.title}</h1>
                    <p  dangerouslySetInnerHTML={{ __html: problem.content }} />
                    
                    </>
                    }
                </div>
            </div>

        </>
    )
}

export default ProblemContent