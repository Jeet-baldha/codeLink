import React, { useEffect, useState } from 'react'
import axios from 'axios';
import GetProblemLink from './GetProblemLink';
import Loder from '../../Loder/Loder';
import ProblemContent from './ProblemContent';
import { IoIosCloseCircle } from "react-icons/io";


function LeetCodeProblem({ width, setWidth }) {

    
    const [getProblem,setGetProblem]  = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [problemData,setProblemData] = useState({})

    const getProblemContent = async (slug) => {

        try {
            if(slug !== ""){
                setIsLoading(true)
                const result = await axios.get(`http://localhost:3000/problem/${slug}`);
                console.log(result.data.success);
                if(result.data.success == true){
                    setProblemData(result.data.problem);
                    setGetProblem(false);
                }
                setIsLoading(false);
            }
            else{
                alert("Problem not found! please recheck your problem link!");
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            alert(error.message);
        }

    }


    return (
        <div className={`  text-white bg-dark-blue-black h-full flex overflow-hidden`} style={{ width: `${width}px` }}>
            { getProblem ? <GetProblemLink isLoading={isLoading} getProblemContent={getProblemContent}  /> : <ProblemContent width={width} setWidth={setWidth} problem={problemData} setGetProblem={setGetProblem}  />}
        </div>
    )
}

export default LeetCodeProblem