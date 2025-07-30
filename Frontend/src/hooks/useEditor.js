import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { SOCKET_ENDPOINT, API_BASE_URL } from '../constants/config';

export const useEditor = () => {
    const [code, setCode] = useState("");
    const [validRoom, setValidRoom] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const roomId = useParams().id;
    const navigate = useNavigate();
    const socket = io(SOCKET_ENDPOINT);

    useEffect(() => {
        const checkUrl = async () => {
            const url = { url: roomId };
            try {
                const result = await axios.post(`${API_BASE_URL}/checkUrl`, url);
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

        // checkUrl();
    }, [roomId, navigate]);

    useEffect(() => {
        const handleCodeChange = (newCode) => setCode(newCode);
        const handleConnect = () => {
            console.log('Connected to server');
            setIsConnected(true);
            socket.emit('room', roomId);
        };

        socket.on('codeChange', handleCodeChange);
        socket.on('connect', handleConnect);

        return () => {
            socket.off('codeChange', handleCodeChange);
            socket.off('connect', handleConnect);
        };
    }, [roomId, socket]);

    const handleCodeChange = (newCode) => {
        socket.emit('codeChange', newCode, roomId);
    };

    return {
        code,
        setCode,
        validRoom,
        isConnected,
        handleCodeChange,
        socket
    };
}; 