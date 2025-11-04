import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart2,
  Settings,
  Bot,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const menuItems = [
  {
    name: 'Dashboard',
    path: '/',
    icon: LayoutDashboard,
  },
  {
    name: 'Clientes',
    path: '/clientes',
    icon: Users,
  },
  {
    name: 'Formulários',
    path: '/formularios',
    icon: FileText,
  },
  {
    name: 'Análises',
    path: '/analises',
    icon: BarChart2,
  },
]

export const Sidebar = () => {
  return (
    <aside className="w-[280px] bg-neutral-sidebar text-neutral-textInverse flex flex-col fixed h-full">
      <div className="px-5 pt-5 pb-4 flex items-center gap-3 h-[88px]">
        <div className="w-11 h-11 rounded-base bg-primary-start flex items-center justify-center">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <span className="text-white font-semibold text-lg">AgentScope</span>
      </div>
      <nav className="mt-6 flex-1 px-3">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'h-12 flex items-center gap-3 px-5 rounded-base text-sm text-[#CBD5E1] hover:bg-white/5 transition-colors',
                    { 'text-white bg-white/5 font-semibold': isActive },
                  )
                }
              >
                <item.icon className="w-[18px] h-[18px]" />
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 text-[#94A3B8]">
        <button className="h-12 w-full flex items-center gap-3 px-5 rounded-base text-sm hover:bg-white/5 transition-colors">
          <Settings className="w-4 h-4" />
          <span>Configurações</span>
        </button>
      </div>
    </aside>
  )
}
