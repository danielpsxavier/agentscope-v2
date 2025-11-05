import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/Sidebar'

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-neutral-pageBackground">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  )
}
