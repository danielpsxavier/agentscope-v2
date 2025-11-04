import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { NewFormSheet } from '@/components/NewFormSheet'
import { getOpportunityMappings } from '@/services/opportunityMappings'
import { Tables } from '@/lib/supabase/types'
import { OpportunityMappingCard } from '@/components/OpportunityMappingCard'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { FileX, AlertTriangle } from 'lucide-react'

const FormsPage = () => {
  const [isNewFormOpen, setIsNewFormOpen] = useState(false)
  const [mappings, setMappings] = useState<Tables<'opportunity_mappings'>[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMappings = async () => {
      setLoading(true)
      setError(null)
      try {
        const { data, error: fetchError } = await getOpportunityMappings()
        if (fetchError) {
          throw new Error(fetchError.message)
        }
        setMappings(data || [])
      } catch (err: any) {
        setError(
          'Falha ao carregar os formulários. Tente novamente mais tarde.',
        )
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMappings()
  }, [])

  const renderContent = () => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col space-y-3 p-4 border rounded-lg"
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

    if (mappings.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center py-16 border-2 border-dashed border-neutral-border rounded-lg">
          <FileX className="w-12 h-12 text-neutral-textSecondary mb-4" />
          <h3 className="text-h3 text-neutral-textPrimary">
            Nenhum Formulário Encontrado
          </h3>
          <p className="text-neutral-textSecondary mt-2">
            Ainda não há mapeamentos de oportunidade. Clique em "Novo
            Formulário" para criar o primeiro.
          </p>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
        {mappings.map((mapping) => (
          <OpportunityMappingCard key={mapping.id} mapping={mapping} />
        ))}
      </div>
    )
  }

  return (
    <div className="p-lg">
      <div className="container mx-auto max-w-[1200px]">
        <Header
          title="Formulários"
          subtitle="Visualize os mapeamentos de oportunidade preenchidos"
          buttonText="Novo Formulário"
          onButtonClick={() => setIsNewFormOpen(true)}
        />
        <section className="mt-6">{renderContent()}</section>
      </div>
      <NewFormSheet open={isNewFormOpen} onOpenChange={setIsNewFormOpen} />
    </div>
  )
}

export default FormsPage
