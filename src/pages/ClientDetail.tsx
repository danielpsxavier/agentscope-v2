import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Header } from '@/components/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Client } from '@/types'
import { OpportunityMappingForm } from '@/components/OpportunityMappingForm'
import { Building, Users, BarChart, Rocket } from 'lucide-react'

// Mock data - in a real app, this would come from an API
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

const ClientDetailPage = () => {
  const { clientId } = useParams<{ clientId: string }>()
  const [isFormOpen, setIsFormOpen] = useState(false)

  // Find the client based on the ID from the URL
  const client = clients.find((c) => c.id === clientId)

  if (!client) {
    return (
      <div className="p-lg text-center">
        <h2 className="text-h2">Cliente não encontrado</h2>
        <p className="text-neutral-textSecondary">
          O cliente que você está procurando não existe ou foi movido.
        </p>
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
                    Potencial de tendência: {client.trend}
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
