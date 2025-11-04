import { Header } from '@/components/Header'
import { MetricCard } from '@/components/MetricCard'
import { ClientCard } from '@/components/ClientCard'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, Briefcase, Zap, BarChart, Rocket } from 'lucide-react'
import { Client } from '@/types'

const metrics = [
  {
    title: 'Clientes Mapeados',
    value: '3',
    trend: '+2 este mês',
    icon: <Briefcase className="h-4 w-4 text-neutral-textSecondary" />,
  },
  {
    title: 'Leads de Projeto',
    value: '10',
    trend: '+5 esta semana',
    icon: <Zap className="h-4 w-4 text-neutral-textSecondary" />,
  },
  {
    title: 'Potencial Alto',
    value: '33%',
    trend: 'Estável',
    trendColor: 'text-neutral-textSecondary',
    icon: <Rocket className="h-4 w-4 text-neutral-textSecondary" />,
  },
  {
    title: 'Projetos Ativos',
    value: '0',
    trend: 'Nenhum projeto iniciado',
    trendColor: 'text-neutral-textSecondary',
    icon: <BarChart className="h-4 w-4 text-neutral-textSecondary" />,
  },
]

const clients: Client[] = [
  {
    id: '1',
    name: 'TechCorp Brasil',
    department: 'Operações',
    leads: 5,
    status: 'Alto',
    trend: 'Alta',
  },
  {
    id: '2',
    name: 'Indústria XYZ',
    department: 'Vendas',
    leads: 3,
    status: 'Médio',
    trend: 'Média',
  },
  {
    id: '3',
    name: 'Logística ABC',
    department: 'Supply Chain',
    leads: 2,
    status: 'Baixo',
    trend: 'Baixa',
  },
]

const Index = () => {
  return (
    <div className="p-lg">
      <div className="container mx-auto max-w-[1200px]">
        <Header
          title="Dashboard"
          subtitle="Visão geral das oportunidades de Agent AI"
          buttonText="Novo Cliente"
        />

        <div className="grid gap-md grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-6">
          {metrics.map((metric) => (
            <MetricCard key={metric.title} {...metric} />
          ))}
        </div>

        <div className="flex gap-4 items-center mt-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Buscar clientes..."
              className="h-14 pl-12 rounded-card border-neutral-border bg-neutral-cardBackground"
            />
          </div>
          <Select defaultValue="todos">
            <SelectTrigger className="w-40 h-14 rounded-card border-neutral-border bg-neutral-cardBackground">
              <SelectValue placeholder="Filtrar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="alto">Potencial Alto</SelectItem>
              <SelectItem value="medio">Potencial Médio</SelectItem>
              <SelectItem value="baixo">Potencial Baixo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <section className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-h3 text-neutral-textPrimary">Clientes</h3>
            <span className="text-sm text-neutral-textSecondary">
              3 clientes
            </span>
          </div>
          <div className="flex flex-wrap gap-md">
            {clients.map((client) => (
              <ClientCard key={client.name} client={client} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Index
