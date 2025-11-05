import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { NewOpportunitySheet } from '@/components/NewOpportunitySheet'
import { getOpportunities } from '@/services/opportunities'
import { Opportunity } from '@/types'
import { OpportunityCard } from '@/components/OpportunityCard'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { FileX, AlertTriangle, Link as LinkIcon, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

const OpportunitiesPage = () => {
  const [isNewSheetOpen, setIsNewSheetOpen] = useState(false)
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true)
      setError(null)
      try {
        const { data, error: fetchError } = await getOpportunities()
        if (fetchError) {
          throw new Error(fetchError.message)
        }
        setOpportunities(data || [])
      } catch (err: any) {
        setError(
          'Falha ao carregar as oportunidades. Tente novamente mais tarde.',
        )
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchOpportunities()
  }, [])

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col space-y-3 p-4 border rounded-lg bg-white"
            >
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
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

    if (opportunities.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center py-16 border-2 border-dashed border-neutral-border rounded-lg">
          <FileX className="w-12 h-12 text-neutral-textSecondary mb-4" />
          <h3 className="text-h3 text-neutral-textPrimary">
            Nenhuma Oportunidade Encontrada
          </h3>
          <p className="text-neutral-textSecondary mt-2">
            Ainda não há mapeamentos de oportunidade. Clique em "Nova
            Oportunidade" para criar a primeira.
          </p>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
        {opportunities.map((opportunity) => (
          <OpportunityCard key={opportunity.id} opportunity={opportunity} />
        ))}
      </div>
    )
  }

  return (
    <div className="flex-1">
      <div className="container mx-auto max-w-[1200px]">
        <header className="flex items-center justify-between h-[88px]">
          <div>
            <h1 className="text-[28px] font-bold text-neutral-textPrimary">
              Oportunidades
            </h1>
            <p className="text-sm text-neutral-textSecondary">
              Visualize os mapeamentos de oportunidade e seu status de
              processamento
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/oportunidades/cadastro-externo')}
            >
              <LinkIcon className="mr-2 h-4 w-4" />
              Cadastrar Oportunidade Externa
            </Button>
            <Button
              className="primary-btn flex items-center gap-2.5"
              onClick={() => setIsNewSheetOpen(true)}
            >
              <Plus className="w-4 h-4" />
              <span>Nova Oportunidade</span>
            </Button>
          </div>
        </header>
        <section className="mt-6">{renderContent()}</section>
      </div>
      <NewOpportunitySheet
        open={isNewSheetOpen}
        onOpenChange={setIsNewSheetOpen}
      />
    </div>
  )
}

export default OpportunitiesPage
