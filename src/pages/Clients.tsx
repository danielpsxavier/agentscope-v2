import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { ClientCard } from '@/components/ClientCard'
import { Client } from '@/types'
import { getClients } from '@/services/clients'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Users, AlertTriangle } from 'lucide-react'

const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true)
      setError(null)
      try {
        const { data, error: fetchError } = await getClients()
        if (fetchError) {
          throw new Error('Failed to fetch clients from the database.')
        }
        setClients(data || [])
      } catch (err: any) {
        setError('Falha ao carregar os clientes. Tente novamente mais tarde.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchClients()
  }, [])

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex gap-md overflow-x-auto pb-4">
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

    if (clients.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center py-16 border-2 border-dashed border-neutral-border rounded-lg">
          <Users className="w-12 h-12 text-neutral-textSecondary mb-4" />
          <h3 className="text-h3 text-neutral-textPrimary">
            Nenhum Cliente Encontrado
          </h3>
          <p className="text-neutral-textSecondary mt-2">
            Ainda não há clientes cadastrados. Clique em "Novo Cliente" para
            adicionar o primeiro.
          </p>
        </div>
      )
    }

    return (
      <div className="flex gap-md overflow-x-auto pb-4">
        {clients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    )
  }

  return (
    <div className="flex-1">
      <div className="container mx-auto max-w-[1200px]">
        <Header
          title="Clientes"
          subtitle="Gerencie seus clientes e oportunidades"
          buttonText="Novo Cliente"
        />
        <section className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-h3 text-neutral-textPrimary">
              Todos os Clientes
            </h3>
            {!loading && !error && (
              <span className="text-sm text-neutral-textSecondary">
                {clients.length} clientes
              </span>
            )}
          </div>
          {renderContent()}
        </section>
      </div>
    </div>
  )
}

const CardSkeleton = () => (
  <div className="w-full max-w-[360px] min-w-[300px] p-4 border rounded-lg space-y-3 bg-white flex-shrink-0">
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

export default ClientsPage
