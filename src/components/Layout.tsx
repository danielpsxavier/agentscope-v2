import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/Sidebar'
import { SidebarProvider, useSidebar } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

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
