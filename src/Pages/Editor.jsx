import React, { useEffect, useState } from 'react'
import AceEditor from "react-ace";
import Sidebar from '../Components/Sidebar'

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

function Editor() {

    const [code,setCode] = useState("");

    return (
        <div className=' w-full h-dvh flex'>
            <AceEditor  
                mode="javascript"
                placeholder=" write your code here..."
                theme="monokai"
                wrapEnabled={true}
                defaultValue=''
                fontSize={18}
                enableLiveAutocompletion={true}
                onChange={(v) => setCode(v)}
                name="UNIQUE_ID_OF_DIV"
                width='100%'
                height='100%'
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true
                }}
            />
            <Sidebar />
        </div>
    )
}

export default Editor