import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/Sidebar'

export default function Layout() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-neutral-pageBackground">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="flex items-center h-[88px] px-lg border-b bg-white sticky top-0 z-10">
          {/* Header content can be added here if needed */}
        </header>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
