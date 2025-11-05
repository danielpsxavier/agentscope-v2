import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Client, AgentIdea } from '@/types'
import { OpportunityMappingForm } from '@/components/OpportunityMappingForm'
import {
  Building,
  Users,
  BarChart,
  Rocket,
  Lightbulb,
  Bot,
  Edit,
  User,
  HardDrive,
  Gauge,
  Briefcase,
} from 'lucide-react'
import { getClientById } from '@/services/clients'
import { getAgentIdeasByClientId } from '@/services/analysis'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { EditAgentIdeaSheet } from '@/components/EditAgentIdeaSheet'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const complexityStyles = {
  Baixa: 'bg-green-100 text-green-800 border-green-200',
  Media: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Alta: 'bg-red-100 text-red-800 border-red-200',
}

const statusStyles = {
  Rascunho: 'bg-gray-100 text-gray-800 border-gray-200',
  Aprovado: 'bg-green-100 text-green-800 border-green-200',
  Rejeitado: 'bg-red-100 text-red-800 border-red-200',
  Implementado: 'bg-purple-100 text-purple-800 border-purple-200',
}

const ClientDetailPage = () => {
  const { clientId } = useParams<{ clientId: string }>()
  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const [ideas, setIdeas] = useState<AgentIdea[]>([])
  const [ideasLoading, setIdeasLoading] = useState(true)
  const [editingIdea, setEditingIdea] = useState<AgentIdea | null>(null)
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false)

  const fetchClientAndIdeas = async (showLoader = true) => {
    if (!clientId) return

    if (showLoader) {
      setLoading(true)
      setIdeasLoading(true)
    }
    setError(null)

    try {
      const clientIdNum = parseInt(clientId, 10)
      const [clientResult, ideasResult] = await Promise.all([
        getClientById(clientIdNum),
        getAgentIdeasByClientId(clientIdNum),
      ])

      if (clientResult.error) throw new Error('Failed to fetch client details.')
      if (!clientResult.data) throw new Error('Client not found.')
      setClient(clientResult.data)

      if (ideasResult.error) {
        console.error('Failed to fetch agent ideas:', ideasResult.error)
        toast.error('Erro ao carregar ideias de agentes.')
      }
      setIdeas(ideasResult.data || [])
    } catch (err: any) {
      setError(
        err.message ||
          'Cliente não encontrado ou ocorreu um erro ao buscar os dados.',
      )
      console.error(err)
    } finally {
      if (showLoader) setLoading(false)
      setIdeasLoading(false)
    }
  }

  useEffect(() => {
    fetchClientAndIdeas()
  }, [clientId])

  const handleEdit = (idea: AgentIdea) => {
    setEditingIdea(idea)
    setIsEditSheetOpen(true)
  }

  const handleUpdateSuccess = () => {
    setIsEditSheetOpen(false)
    fetchClientAndIdeas(false)
    toast.success('Ideia de agente atualizada com sucesso!')
  }

  if (loading) {
    return <PageSkeleton />
  }

  if (error || !client) {
    return (
      <div className="flex-1 text-center p-4">
        <h2 className="text-h2">Cliente não encontrado</h2>
        <p className="text-neutral-textSecondary">
          {error ||
            'O cliente que você está procurando não existe ou foi movido.'}
        </p>
        <Button asChild className="mt-4">
          <Link to="/clientes">Voltar para Clientes</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex-1">
      <div className="container mx-auto max-w-[1200px]">
        <Header
          title={client.name}
          subtitle={`Detalhes e oportunidades para ${client.department}`}
          buttonText="Mapear Oportunidade"
          onButtonClick={() => setIsFormOpen(true)}
        />

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Cliente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <InfoItem icon={Building} label="Cliente" value={client.name} />
                <InfoItem
                  icon={Briefcase}
                  label="Departamento"
                  value={client.department}
                />
                <InfoItem
                  icon={User}
                  label="Responsável"
                  value={client.responsible}
                />
                <InfoItem
                  icon={Gauge}
                  label="Maturidade Digital"
                  value={client.digital_maturity}
                />
                <InfoItem
                  icon={Users}
                  label="Tamanho da Operação"
                  value={client.operation_size}
                />
                <InfoItem
                  icon={HardDrive}
                  label="Sistemas Principais"
                  value={client.main_systems}
                />
                <InfoItem
                  icon={BarChart}
                  label="Status Potencial"
                  value={client.potential_status}
                />
                <InfoItem
                  icon={Rocket}
                  label="Tendência"
                  value={client.trend_status}
                />
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <section>
              <h2 className="text-h3 font-semibold text-neutral-textPrimary mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Ideias de Agentes
              </h2>
              <Card>
                <CardContent className="p-0">
                  {ideasLoading ? (
                    <TableSkeleton />
                  ) : ideas.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Agente</TableHead>
                          <TableHead>Complexidade</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {ideas.map((idea) => (
                          <TableRow key={idea.id}>
                            <TableCell>
                              <div className="font-medium">
                                {idea.agent_name}
                              </div>
                              <div className="text-xs text-muted-foreground line-clamp-2">
                                {idea.description}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={cn(
                                  'text-xs font-medium border',
                                  complexityStyles[idea.complexity || 'Media'],
                                )}
                              >
                                {idea.complexity}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={cn(
                                  'text-xs font-medium border',
                                  statusStyles[idea.status],
                                )}
                              >
                                {idea.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEdit(idea)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="p-6 text-center text-neutral-textSecondary flex flex-col items-center justify-center h-48">
                      <Bot className="mx-auto h-8 w-8 mb-2" />
                      Nenhuma ideia encontrada para este cliente.
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
      <OpportunityMappingForm
        client={client}
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
      />
      {editingIdea && (
        <EditAgentIdeaSheet
          idea={editingIdea}
          open={isEditSheetOpen}
          onOpenChange={setIsEditSheetOpen}
          onUpdateSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  )
}

const InfoItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string | null
}) => (
  <div className="flex items-start gap-3">
    <Icon className="h-4 w-4 text-neutral-textSecondary mt-0.5 flex-shrink-0" />
    <div>
      <p className="text-xs text-neutral-textSecondary">{label}</p>
      <p className="text-neutral-textPrimary font-medium">{value || 'N/A'}</p>
    </div>
  </div>
)

const TableSkeleton = () => (
  <div className="p-4 space-y-2">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="flex items-center space-x-4 h-12">
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-full" />
        </div>
        <Skeleton className="h-6 w-20 rounded-md" />
        <Skeleton className="h-6 w-24 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    ))}
  </div>
)

const PageSkeleton = () => (
  <div className="flex-1">
    <div className="container mx-auto max-w-[1200px]">
      <div className="flex items-center justify-between h-[88px]">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-80" />
        </div>
        <Skeleton className="h-11 w-44 rounded-card" />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-6">
          <Skeleton className="h-80 w-full rounded-lg" />
        </div>
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-6 w-48 mb-4" />
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </div>
    </div>
  </div>
)

export default ClientDetailPage
