import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import AceEditor from "react-ace";
import Sidebar from '../Components/Sidebar'
import debounce from 'lodash.debounce'
import { useParams } from 'react-router-dom';
import ace from 'ace-builds';


// Set the base path for Ace editor
ace.config.set('basePath', '');

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import ShareLink from '../Components/ShareLink';

const ENDPOINT = 'http://localhost:3000';

function Editor() {

    const [code, setCode] = useState("");
    const socket = io(ENDPOINT, {
    });

    const roomId = useParams().id;
    useEffect(() => {

        socket.on('codeChange', (newCode) => {
            setCode(newCode); // Update the code state
        });


        socket.on('connect', () => {
            // console.log('Connected to server');
            socket.emit('room', roomId);
        });
        // Cleanup function
        return () => {
            // Remove event listeners when component unmounts
            socket.off('codeChange');
            socket.off('connect');
        };
    }, [socket]);

    const handleChange = debounce(newCode => {
        socket.emit('codeChange', newCode,roomId);
    }, 1000)




    // const handleChange = (newCode) => {
    //     setCode(newCode);
    //     // Emit a codeChange event to the server when the code changes
    //     console.log(newCode);
    // };



    return (
        <div className=' w-full h-full flex'>
            <AceEditor
                mode="javascript"
                placeholder=" write your code here..."
                theme="monokai"
                wrapEnabled={true}
                defaultValue=''
                value={code}
                fontSize={18}
                enableLiveAutocompletion={true}
                onChange={handleChange}
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
            <div>
                <ShareLink />
            </div>
        </div>
    )
}

export default Editor