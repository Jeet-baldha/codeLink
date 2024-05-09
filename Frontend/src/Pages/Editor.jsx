import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import AceEditor from "react-ace";
import Sidebar from '../Components/Sidebar'
import debounce from 'lodash.debounce'
import { useNavigate, useParams } from 'react-router-dom';
import ace from 'ace-builds';
import { useDispatch } from 'react-redux';
import { updateUserDetails } from '../Store/UserSlice.js';
import { useSelector } from 'react-redux';
import themes from '../Data/Themes.js';
import languages from '../Data/Language.js';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';



const importThemes = async () => {
    try {
        // Import all themes dynamically
        for (const theme of themes) {
            // @vite-ignore
            const themeName = theme.value;
            await import(`ace-builds/src-noconflict/theme-${themeName}`);
        }
        console.log('All themes have been imported successfully');
    } catch (error) {
        console.error('Error importing themes:', error);
    }
};

const importLanguages = async () => {
    try {
        // Import all languages dynamically
        for (const language of languages) {
            // @vite-ignore
            const languageName = language.value;
            await import(`ace-builds/src-noconflict/mode-${languageName}`);
            await import(`ace-builds/src-noconflict/snippets/${languageName}`)
        }
        console.log('All languages have been imported successfully');
    } catch (error) {
        console.error('Error importing languages:');
    }
};

// Call the functions to import themes and languages
importThemes();
importLanguages();


import "ace-builds/src-noconflict/ext-language_tools";
import axios from 'axios';


const ENDPOINT = 'http://localhost:3000';



function Editor() {

    const theme = useSelector((state) => state.user.theme);
    const language = useSelector((state) => state.user.language);
    const fontSize = useSelector((state) => state.user.fontSize);
    const roomId = useParams().id;
    const [validRoom, setValidRoom] = useState(false);
    const navigate = useNavigate();

    const [font, setFont] = useState(14);

    useEffect(() => {
        setFont(fontSize);
    }, [fontSize])

    const [code, setCode] = useState("");
    const socket = io(ENDPOINT);

    const checkUrl = async () => {

        const url = {
            url: roomId
        }

        try {
            const result = await axios.post('http://localhost:3000/checkUrl', url);
    
            if (result.data === true) {
                setValidRoom(true)
            }
            else {
                setValidRoom(false)
                navigate('/');
                alert('Invalid URL')
            }
        } catch (error) {
            alert(error.message);
        }

    }

    useEffect(() => {
        if(roomId){ 
            checkUrl();
        }
    }, [roomId])

    useEffect(() => {

        socket.on('codeChange', (newCode) => {
            setCode(newCode);
        });

        if(validRoom == true){
            socket.on('connect', () => {
                // console.log('Connected to server');
                socket.emit('room', roomId);
            });
        }
        // Cleanup function
        return () => {
            // Remove event listeners when component unmounts
            socket.off('codeChange');
            socket.off('connect');
        };

    }, [socket,roomId,validRoom]);

    const handleChange = debounce(newCode => {
        socket.emit('codeChange', newCode, roomId);
    }, 1000)


    const handleEditorChange = debounce((newCode, editor) => {
        // Check if the change event is triggered by autocomplete
        console.log(editor)
        console.log(editor.lines.join('\n'));
    },);


    // const handleChange = (newCode) => {
    //     setCode(newCode);
    //     // Emit a codeChange event to the server when the code changes
    //     console.log(newCode);
    // };



    return (
        <div className=' w-full h-full flex overflow-hidden'>
            <AceEditor
                mode={language}
                placeholder=" write your code here..."
                theme={theme}
                wrapEnabled={true}
                defaultValue=''
                value={code}
                fontSize={font}
                enableLiveAutocompletion={true}
                onChange={handleChange}
                name="UNIQUE_ID_OF_DIV"
                width='100%'
                height='100%'
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                }}
            />
            <div>
                <Sidebar textData={code} />
            </div>
        </div>
    )
}

export default Editor