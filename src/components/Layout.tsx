import { Outlet, useLocation } from 'react-router-dom'
import { Sidebar } from '@/components/Sidebar'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Layout() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <div className="flex min-h-screen bg-neutral-pageBackground">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <main className={cn('flex-1', { flex: !isHomePage })}>
          <div className="lg:hidden fixed top-4 left-4 z-50">
            <SidebarTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="bg-background/80 backdrop-blur-sm rounded-full shadow-lg"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SidebarTrigger>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
