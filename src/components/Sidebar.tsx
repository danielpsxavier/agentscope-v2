import { NavLink, useNavigate, Link } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  BarChart2,
  Settings,
  Bot,
  Lightbulb,
  LogOut,
  User as UserIcon,
  Users2,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/use-auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from './ui/button'

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
    name: 'Oportunidades',
    path: '/oportunidades',
    icon: Lightbulb,
  },
  {
    name: 'Análises',
    path: '/analises',
    icon: BarChart2,
  },
  {
    name: 'Usuários',
    path: '/usuarios',
    icon: Users2,
  },
]

export const Sidebar = () => {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await signOut()
    navigate('/login', { replace: true })
  }

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
                end={item.path === '/'}
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
      <div className="p-3 border-t border-white/10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start text-left h-auto px-3 py-2 hover:bg-white/5"
            >
              <div className="flex items-center gap-3 w-full">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-primary-start text-white">
                    {user?.email?.charAt(0).toUpperCase() ?? 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium text-white truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mb-2" side="top" align="start">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/perfil">
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-500 focus:text-red-500 focus:bg-red-50"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  )
}
