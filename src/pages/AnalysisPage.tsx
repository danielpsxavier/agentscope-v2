import { useState, useEffect, useCallback } from 'react'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { AgentIdeaCard } from '@/components/AgentIdeaCard'
import { AgentIdea } from '@/types'
import { getAgentIdeas, invokeAnalysisFunction } from '@/services/analysis'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Bot, AlertTriangle, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { EditAgentIdeaSheet } from '@/components/EditAgentIdeaSheet'
import { AgentStatusFilter } from '@/components/AgentStatusFilter'

const AnalysisPage = () => {
  const [ideas, setIdeas] = useState<AgentIdea[]>([])
  const [loading, setLoading] = useState(true)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editingIdea, setEditingIdea] = useState<AgentIdea | null>(null)
  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false)
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([])

  const fetchIdeas = useCallback(
    async (showLoading = true) => {
      if (showLoading) setLoading(true)
      setError(null)
      try {
        const { data, error: fetchError } =
          await getAgentIdeas(selectedStatuses)
        if (fetchError) throw fetchError
        setIdeas(data || [])
      } catch (err: any) {
        setError('Falha ao carregar as ideias de agentes. Tente novamente.')
        console.error(err)
      } finally {
        if (showLoading) setLoading(false)
      }
    },
    [selectedStatuses],
  )

  useEffect(() => {
    fetchIdeas()
  }, [fetchIdeas])

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    const promise = invokeAnalysisFunction().then((result) => {
      if (result.error) {
        throw new Error(result.error.message || 'Ocorreu um erro na análise.')
      }
      return result.data
    })

    toast.promise(promise, {
      loading: 'Análise em andamento...',
      success: (data) => {
        fetchIdeas(false)
        return data.message || 'Análise concluída com sucesso!'
      },
      error: (err) => err.message || 'Erro na análise. Tente novamente.',
      finally: () => setIsAnalyzing(false),
    })
  }

  const handleEdit = (idea: AgentIdea) => {
    setEditingIdea(idea)
    setIsEditSheetOpen(true)
  }

  const handleUpdateSuccess = () => {
    setIsEditSheetOpen(false)
    fetchIdeas(false)
    toast.success('Ideia de agente atualizada com sucesso!')
  }

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
          {Array.from({ length: 3 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      )
    }

    if (error) {
      return (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )
    }

    if (ideas.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center py-16 border-2 border-dashed border-neutral-border rounded-lg">
          <Bot className="w-12 h-12 text-neutral-textSecondary mb-4" />
          <h3 className="text-h3 text-neutral-textPrimary">
            Nenhuma Ideia de Agente Encontrada
          </h3>
          <p className="text-neutral-textSecondary mt-2">
            {selectedStatuses.length > 0
              ? 'Nenhuma ideia corresponde aos filtros selecionados. Tente limpar os filtros.'
              : 'Clique em "Analisar" para que a IA gere novas ideias a partir dos formulários pendentes.'}
          </p>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
        {ideas.map((idea) => (
          <AgentIdeaCard key={idea.id} idea={idea} onEdit={handleEdit} />
        ))}
      </div>
    )
  }

  return (
    <div className="flex-1">
      <div className="container mx-auto max-w-[1200px]">
        <Header
          title="Análises de IA"
          subtitle="Explore ideias de agentes geradas pela IA para seus clientes"
          buttonText={isAnalyzing ? 'Analisando...' : 'Analisar'}
          onButtonClick={handleAnalyze}
          isButtonLoading={isAnalyzing}
          buttonIcon={Bot}
        />
        <section className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-h3 text-neutral-textPrimary">
              Ideias de Agentes
            </h3>
            <div className="flex items-center gap-2">
              <AgentStatusFilter
                selectedStatuses={selectedStatuses}
                onStatusChange={setSelectedStatuses}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => fetchIdeas()}
                disabled={loading}
              >
                <RefreshCw
                  className={cn('w-4 h-4 mr-2', loading && 'animate-spin')}
                />
                Atualizar
              </Button>
            </div>
          </div>
          {renderContent()}
        </section>
      </div>
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

const CardSkeleton = () => (
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

export default AnalysisPage
