        
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import AceEditor from "react-ace";
import Sidebar from '../Components/Sidebar/Sidebar.jsx';
import debounce from 'lodash.debounce';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import themes from '../Data/Themes.js';
import languages from '../Data/Language.js';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Code2 } from 'lucide-react';



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
    // const [font, setFont] = useState(fontSize);
    const [code, setCode] = useState("");
    const socket = io(ENDPOINT);

    const navigate = useNavigate();

    useEffect(() => {
        const checkUrl = async () => {
            const url = { url: roomId };
            try {
                const result = await axios.post('http://localhost:3000/checkUrl', url);
                setValidRoom(result.data);
                if (!result.data) {
                    alert('Invalid URL');
                    navigate('/');
                }
            } catch (error) {
                navigate('/');
                alert("invalid URL");
            }
        }; 

        checkUrl();
    }, [roomId, navigate]);

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
            {/* Header */}
            <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                            <Code2 className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            CodeLink
                        </span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="px-4 py-2 bg-muted rounded-lg">
                            <span className="text-sm text-muted-foreground">Room ID:</span>
                            <span className="ml-2 font-mono text-sm text-foreground">{roomId}</span>
                        </div>
                        <div className="px-4 py-2 bg-muted rounded-lg">
                            <span className="text-sm text-muted-foreground">Language:</span>
                            <span className="ml-2 text-sm text-foreground capitalize">{language}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Editor Content */}
            <div className='w-full h-[calc(100vh-80px)] flex overflow-hidden'>
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

                    editorProps={{
                        $blockScrolling: true,
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                    }}

                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        showLineNumbers: true,
                        tabSize: 2,
                    }}
                />
                <Sidebar textData={code} />
            </div>
        </>
    );
}


export default Editor;
