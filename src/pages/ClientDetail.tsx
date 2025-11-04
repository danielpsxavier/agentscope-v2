import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Client } from '@/types'
import { OpportunityMappingForm } from '@/components/OpportunityMappingForm'
import { Building, Users, BarChart, Rocket } from 'lucide-react'
import { getClientById } from '@/services/clients'
import { Skeleton } from '@/components/ui/skeleton'

const ClientDetailPage = () => {
  const { clientId } = useParams<{ clientId: string }>()
  const [client, setClient] = useState<Client | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  useEffect(() => {
    if (!clientId) return

    const fetchClient = async () => {
      setLoading(true)
      setError(null)
      try {
        const { data, error: fetchError } = await getClientById(
          parseInt(clientId, 10),
        )
        if (fetchError) {
          throw new Error('Failed to fetch client details.')
        }
        if (!data) {
          throw new Error('Client not found.')
        }
        setClient(data)
      } catch (err: any) {
        setError(
          'Cliente não encontrado ou ocorreu um erro ao buscar os dados.',
        )
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchClient()
  }, [clientId])

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
            <div className="lg:col-span-2">
              <Skeleton className="h-48 w-full rounded-lg" />
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
            <Card>
              <CardHeader>
                <CardTitle>Leads de Projeto</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-textSecondary">
                  Nenhum lead de projeto gerado ainda. Preencha o formulário de
                  mapeamento para começar.
                </p>
              </CardContent>
            </Card>
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
    </div>
  )
}

export default ClientDetailPage
