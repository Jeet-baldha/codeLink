import React, { useEffect } from 'react'
import AceEditor from "react-ace";


import "ace-builds/src-noconflict/mode-jsx";

const languages = [
    "javascript",
    "java",
    "python",
    "xml",
    "ruby",
    "sass",
    "markdown",
    "mysql",
    "json",
    "html",
    "handlebars",
    "golang",
    "csharp",
    "elixir",
    "typescript",
    "css"
]

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

function CodeEditor() {

    return (
        <div className=' w-full h-svh'>
            <AceEditor  
                mode="javascript"
                placeholder=" write your code here..."
                theme="monokai"
                wrapEnabled={true}
                defaultValue=''
                fontSize={18}
                enableLiveAutocompletion={true}
                onChange={(v) => console.log(v)}
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
        </div>
    )
}

export default CodeEditor