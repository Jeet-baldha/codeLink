import AgoraRTC, { AgoraRTCProvider, useRTCClient } from "agora-rtc-react"
import Editor from './Pages/Editor.jsx'

function App2() {
  const agoraClient = useRTCClient(AgoraRTC.createClient({ codec: "vp8", mode: "rtc" }))
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AgoraRTCProvider client={agoraClient}>
        <Editor />
      </AgoraRTCProvider>
    </div>
  )
}

export default App2