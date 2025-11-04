import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Client, AgentIdea } from '@/types'
import { OpportunityMappingForm } from '@/components/OpportunityMappingForm'
import { Building, Users, BarChart, Rocket, Lightbulb, Bot } from 'lucide-react'
import { getClientById } from '@/services/clients'
import { getAgentIdeasByClientId } from '@/services/analysis'
import { Skeleton } from '@/components/ui/skeleton'
import { AgentIdeaCard } from '@/components/AgentIdeaCard'
import { EditAgentIdeaSheet } from '@/components/EditAgentIdeaSheet'
import { toast } from 'sonner'

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
      if (showLoader) {
        setLoading(false)
      }
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

  const renderIdeasSection = () => {
    if (ideasLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <IdeaCardSkeleton />
          <IdeaCardSkeleton />
        </div>
      )
    }

    if (ideas.length === 0) {
      return (
        <Card>
          <CardContent className="p-6 text-center text-neutral-textSecondary flex flex-col items-center justify-center h-48">
            <Bot className="mx-auto h-8 w-8 mb-2" />
            Nenhuma ideia encontrada para este cliente.
          </CardContent>
        </Card>
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ideas.map((idea) => (
          <AgentIdeaCard key={idea.id} idea={idea} onEdit={handleEdit} />
        ))}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="p-lg">
        <div className="container mx-auto max-w-[1200px]">
          <div className="flex items-center justify-between h-[88px]">
            <div>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-80" />
            </div>
            <Skeleton className="h-11 w-44 rounded-card" />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-6 w-32 mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <IdeaCardSkeleton />
                <IdeaCardSkeleton />
              </div>
            </div>
            <div className="space-y-6">
              <Skeleton className="h-64 w-full rounded-lg" />
              <Skeleton className="h-11 w-full rounded-card" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !client) {
    return (
      <div className="p-lg text-center">
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
    <div className="p-lg">
      <div className="container mx-auto max-w-[1200px]">
        <Header
          title={client.name}
          subtitle={`Detalhes e oportunidades para ${client.department}`}
          buttonText="Mapear Oportunidade"
          onButtonClick={() => setIsFormOpen(true)}
        />

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <section>
              <h2 className="text-h3 font-semibold text-neutral-textPrimary mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Ideias
              </h2>
              {renderIdeasSection()}
            </section>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Cliente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <Building className="h-4 w-4 text-neutral-textSecondary" />
                  <span className="text-neutral-textPrimary">
                    {client.name}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-neutral-textSecondary" />
                  <span className="text-neutral-textPrimary">
                    {client.department}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <BarChart className="h-4 w-4 text-neutral-textSecondary" />
                  <span className="text-neutral-textPrimary">
                    {client.leads} leads de projeto existentes
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Rocket className="h-4 w-4 text-neutral-textSecondary" />
                  <span className="text-neutral-textPrimary">
                    Potencial de tendência:{' '}
                    {client.trend_status === 'Media'
                      ? 'Média'
                      : client.trend_status}
                  </span>
                </div>
              </CardContent>
            </Card>
            <Button
              className="w-full primary-btn"
              onClick={() => setIsFormOpen(true)}
            >
              Mapear Nova Oportunidade
            </Button>
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

const IdeaCardSkeleton = () => (
  <div className="flex flex-col space-y-3 p-4 border rounded-lg bg-white">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-11 w-11 rounded-lg" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-3 w-[120px]" />
        </div>
      </div>
      <Skeleton className="h-6 w-16 rounded-pill" />
    </div>
    <Skeleton className="h-10 w-full" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
    </div>
    <div className="pt-3 border-t flex justify-between items-center">
      <Skeleton className="h-6 w-28 rounded-md" />
      <Skeleton className="h-8 w-8 rounded-md" />
    </div>
  </div>
)

export default ClientDetailPage
