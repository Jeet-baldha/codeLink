import { useEffect } from 'react';
import AceEditor from "react-ace";
import Sidebar from '../../Components/Sidebar/Sidebar.jsx';
import { useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import EditorLayout from '../../shared/layouts/EditorLayout';
import { useEditor } from '../../hooks/useEditor';
import { importThemes, importLanguages, debounce } from '../../utils/editor';
import { DEBOUNCE_DELAY } from '../../constants/config';

// Import themes and languages
importThemes();
importLanguages();

function EditorPage() {
    const theme = useSelector((state) => state.user.theme);
    const language = useSelector((state) => state.user.language);
    const fontSize = useSelector((state) => state.user.fontSize);
    const { code, handleCodeChange } = useEditor();

    const debouncedHandleChange = debounce(handleCodeChange, DEBOUNCE_DELAY);

    useEffect(() => {
        console.log(fontSize);
    }, [fontSize])

    return (
        <EditorLayout>
            <div className='w-full h-full flex overflow-hidden'>
                <AceEditor
                    mode={language}
                    placeholder="Write your code here..."
                    theme={theme}
                    wrapEnabled={true}
                    value={code}
                    fontSize={fontSize}
                    enableLiveAutocompletion={true}
                    onChange={debouncedHandleChange}
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
        </EditorLayout>
    );
}

export default EditorPage; 