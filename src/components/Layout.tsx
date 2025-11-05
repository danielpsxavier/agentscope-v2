import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/Sidebar'
import {
  SidebarProvider,
  useSidebar,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { PanelLeft } from 'lucide-react'

const LayoutContent = () => {
  const { state, isMobile } = useSidebar()

  return (
    <div className="flex min-h-screen bg-neutral-pageBackground">
      <Sidebar />
      <main
        className={cn('flex-1 transition-all duration-300 ease-in-out', {
          'lg:ml-[280px]': state === 'expanded' && !isMobile,
          'lg:ml-[72px]': state === 'collapsed' && !isMobile,
        })}
      >
        <header className="lg:hidden flex items-center h-16 px-4 border-b bg-white sticky top-0 z-10">
          <SidebarTrigger>
            <PanelLeft className="h-6 w-6 text-neutral-textPrimary" />
          </SidebarTrigger>
        </header>
        <Outlet />
      </main>
    </div>
  )
}

export default function Layout() {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  )
}
