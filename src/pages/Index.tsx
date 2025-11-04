import { useState, useEffect } from 'react'
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
import { getClients } from '@/services/clients'
import { Skeleton } from '@/components/ui/skeleton'

const Index = () => {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true)
      const { data } = await getClients()
      setClients(data || [])
      setLoading(false)
    }
    fetchClients()
  }, [])

  const highPotentialPercentage =
    clients.length > 0
      ? Math.round(
          (clients.filter((c) => c.potential_status === 'Alto').length /
            clients.length) *
            100,
        )
      : 0

  return (
    <div className="p-lg">
      <div className="container mx-auto max-w-[1200px]">
        <Header
          title="Dashboard"
          subtitle="Visão geral das oportunidades de Agent AI"
          buttonText="Novo Cliente"
        />

        <div className="grid gap-md grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-6">
          <MetricCard
            title="Clientes Mapeados"
            value={loading ? '...' : clients.length.toString()}
            trend="+2 este mês"
            icon={<Briefcase className="h-4 w-4 text-neutral-textSecondary" />}
          />
          <MetricCard
            title="Leads de Projeto"
            value={
              loading
                ? '...'
                : clients.reduce((acc, c) => acc + c.leads, 0).toString()
            }
            trend="+5 esta semana"
            icon={<Zap className="h-4 w-4 text-neutral-textSecondary" />}
          />
          <MetricCard
            title="Potencial Alto"
            value={loading ? '...' : `${highPotentialPercentage}%`}
            trend="Estável"
            trendColor="text-neutral-textSecondary"
            icon={<Rocket className="h-4 w-4 text-neutral-textSecondary" />}
          />
          <MetricCard
            title="Projetos Ativos"
            value="0"
            trend="Nenhum projeto iniciado"
            trendColor="text-neutral-textSecondary"
            icon={<BarChart className="h-4 w-4 text-neutral-textSecondary" />}
          />
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
            {!loading && (
              <span className="text-sm text-neutral-textSecondary">
                {clients.length} clientes
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-md">
            {loading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <CardSkeleton key={index} />
                ))
              : clients
                  .slice(0, 3)
                  .map((client) => (
                    <ClientCard key={client.id} client={client} />
                  ))}
          </div>
        </section>
      </div>
    </div>
  )
}

const CardSkeleton = () => (
  <div className="w-full max-w-[360px] min-w-[300px] p-4 border rounded-lg space-y-3 bg-white">
    <div className="flex items-start gap-4">
      <Skeleton className="w-11 h-11 rounded-base" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="h-6 w-20 rounded-pill" />
    </div>
    <Skeleton className="h-4 w-1/2" />
    <div className="pt-3 border-t flex justify-between items-center">
      <Skeleton className="h-6 w-28 rounded-md" />
      <Skeleton className="h-4 w-24" />
    </div>
  </div>
)

export default Index
