import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/Sidebar'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-neutral-pageBackground">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center h-[88px] px-lg border-b bg-white sticky top-0 z-10">
          <div className="lg:hidden">
            <SidebarTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SidebarTrigger>
          </div>
        </header>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
