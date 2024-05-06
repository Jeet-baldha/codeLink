import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import AceEditor from "react-ace";
import Sidebar from '../Components/Sidebar'
import debounce from 'lodash.debounce'
import { useParams } from 'react-router-dom';
import ace from 'ace-builds';
import { useDispatch } from 'react-redux';
import { updateUserDetails } from '../Store/UserSlice.js';
import { useSelector } from 'react-redux';
import themes from '../Data/Themes.js';
import languages from '../Data/Language.js';


// Set the base path for Ace editor
// import "ace-builds/src-noconflict/theme-monocai"
ace.config.set('basePath', '');
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


const ENDPOINT = 'http://localhost:3000';



function Editor() {

    const dispactch = useDispatch();
    const theme = useSelector((state) => state.user.theme);
    const language = useSelector((state) => state.user.language);
    const fontSize = useSelector((state) => state.user.fontSize);

    const [font,setFont] = useState(14);

    useEffect(() => {
        console.log(theme);
        console.log(language);
        console.log(fontSize);
        setFont(fontSize);
    }, [theme,language,fontSize])

    const [code, setCode] = useState("");
    const socket = io(ENDPOINT, {
    });

    useEffect(() => {
        console.log(font)
    },[font])


    const roomId = useParams().id;
    useEffect(() => {

        socket.on('connect', () => {
            // console.log('Connected to server');
            socket.emit('room', roomId);
        });

        socket.on('codeChange', (newCode) => {
            setCode(newCode); // Update the code state
        });

        // Cleanup function
        return () => {
            // Remove event listeners when component unmounts
            socket.off('codeChange');
            socket.off('connect');
        };

    }, [socket, roomId]);

    const handleChange = debounce(newCode => {
        socket.emit('codeChange', newCode, roomId);
    }, 1000)




    // const handleChange = (newCode) => {
    //     setCode(newCode);
    //     // Emit a codeChange event to the server when the code changes
    //     console.log(newCode);
    // };



    return (
        <div className=' w-full h-full flex'>
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
                    enableSnippets: true
                }}
            />
            <div>
                <Sidebar textData={code} />
            </div>
        </div>
    )
}

export default Editor