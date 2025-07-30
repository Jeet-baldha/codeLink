import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default App