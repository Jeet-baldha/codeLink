import AgoraRTC from 'agora-rtc-sdk-ng';
import { AGORA_APP_ID } from '../constants/config';

// Create a proper Agora client for agora-rtc-react
export const createAgoraClient = () => {
    const client = AgoraRTC.createClient({ 
        mode: 'rtc', 
        codec: 'vp8' 
    });
    return client;
}; 