import { Header } from '@/components/Header'
import { ClientCard } from '@/components/ClientCard'
import { Client } from '@/types'

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

const ClientsPage = () => {
  return (
    <div className="p-lg">
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
            <span className="text-sm text-neutral-textSecondary">
              {clients.length} clientes
            </span>
          </div>
          <div className="flex flex-wrap gap-md">
            {clients.map((client) => (
              <ClientCard key={client.id} client={client} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default ClientsPage
