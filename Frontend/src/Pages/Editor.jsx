import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import AceEditor from "react-ace";
import Sidebar from '../Components/Sidebar/Sidebar.jsx';
import debounce from 'lodash.debounce';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserDetails } from '../Store/UserSlice.js';
import themes from '../Data/Themes.js';
import languages from '../Data/Language.js';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';



const ENDPOINT = 'http://localhost:3000';

async function importThemes() {
    try {
        await Promise.all(themes.map(theme =>
            import(`ace-builds/src-noconflict/theme-${theme.value}`)
        ));
        console.log('All themes have been imported successfully');
    } catch (error) {
        console.error('Error importing themes:', error);
    }
}

async function importLanguages() {
    try {
        await Promise.all(languages.map(language =>
            Promise.all([
                import(`ace-builds/src-noconflict/mode-${language.value}`),
                import(`ace-builds/src-noconflict/snippets/${language.value}`)
            ])
        ));
        console.log('All languages have been imported successfully');
    } catch (error) {
        console.error('Error importing languages:', error);
    }
}

// Import themes and languages

importThemes();
importLanguages();

function Editor() {
    const theme = useSelector((state) => state.user.theme);
    const language = useSelector((state) => state.user.language);
    const fontSize = useSelector((state) => state.user.fontSize);
    const roomId = useParams().id;
    const [validRoom, setValidRoom] = useState(false);
    const [font, setFont] = useState(fontSize);
    const [code, setCode] = useState("");
    const socket = io(ENDPOINT);

    const navigate = useNavigate();

    // useEffect(() => {
    //     const checkUrl = async () => {
    //         const url = { url: roomId };
    //         try {
    //             const result = await axios.post('http://localhost:3000/checkUrl', url);
    //             setValidRoom(result.data);
    //             if (!result.data) {
    //                 alert('Invalid URL');
    //                 navigate('/');
    //             }
    //         } catch (error) {
    //             alert(error.message);
    //         }
    //     };

    //     checkUrl();
    // }, [roomId, navigate]);

    useEffect(() => {
        const handleCodeChange = (newCode) => setCode(newCode);

        socket.on('codeChange', handleCodeChange);

        socket.on('connect', () => {
            console.log('Connected to server');
            socket.emit('room', roomId);
        });

        return () => {
            socket.off('codeChange', handleCodeChange);
            socket.off('connect');
        };
    }, [roomId]);

    const handleChange = debounce((newCode) => {
        socket.emit('codeChange', newCode, roomId);
    }, 1000);


    useEffect(() => {
        console.log(fontSize);
    }, [fontSize])

    return (
        <>
        <div className='w-full h-full flex overflow-auto'>
            <AceEditor
                mode={language}
                placeholder="Write your code here..."
                theme={theme}
                wrapEnabled={true}
                value={code}
                fontSize={fontSize}
                enableLiveAutocompletion={true}
                onChange={handleChange}
                name="UNIQUE_ID_OF_DIV"
                width='100%'
                height='100%'
                // editorProps={{ $blockScrolling: true }}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 2,
                }}
            />
            <div>
        </div>
                <Sidebar textData={code} />
            </div>
        </>
    );
}


export default Editor;
