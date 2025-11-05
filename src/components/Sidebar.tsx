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
import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar'

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
    <SidebarContainer className="bg-neutral-sidebar text-neutral-textInverse border-r-0 h-screen sticky top-0 w-[280px] flex-shrink-0">
      <SidebarHeader className="h-[88px] flex items-center px-5">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-11 h-11 rounded-base bg-primary-start flex items-center justify-center flex-shrink-0">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <span className="text-white font-semibold text-lg whitespace-nowrap">
            AgentScope
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent as="nav" className="flex-1 px-3">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.name}>
              <NavLink
                to={item.path}
                end={item.path === '/'}
                className="w-full"
              >
                {({ isActive }) => (
                  <SidebarMenuButton
                    className="h-12 text-sm text-[#CBD5E1] hover:bg-white/5 justify-start w-full data-[active=true]:bg-white/5 data-[active=true]:text-white data-[active=true]:font-semibold"
                    isActive={isActive}
                  >
                    <item.icon className="w-[18px] h-[18px] flex-shrink-0" />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                )}
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-3 border-t border-white/10">
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
      </SidebarFooter>
    </SidebarContainer>
  )
}
