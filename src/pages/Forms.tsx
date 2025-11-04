import { Header } from '@/components/Header'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'

const forms = [
  {
    id: '1',
    title: 'Mapeamento de Oportunidade de Agent AI',
    description:
      'Formulário detalhado para mapear processos, dores e oportunidades de automação com agentes de IA em clientes.',
    version: '1.0',
    link: '/clientes', // Link to a relevant page to use the form
  },
  {
    id: '2',
    title: 'Qualificação de Lead',
    description:
      'Formulário rápido para qualificar novos leads e identificar o potencial de projeto com Agent AI.',
    version: '1.0',
    link: '#',
  },
]

const FormsPage = () => {
  return (
    <div className="p-lg">
      <div className="container mx-auto max-w-[1200px]">
        <Header
          title="Formulários"
          subtitle="Crie e gerencie seus formulários de mapeamento"
          buttonText="Novo Formulário"
        />
        <section className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
            {forms.map((form) => (
              <Card
                key={form.id}
                className="shadow-soft border-neutral-border hover:shadow-card transition-shadow duration-200 flex flex-col"
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-base bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-primary-start" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{form.title}</CardTitle>
                      <CardDescription className="text-xs mt-1">
                        Versão {form.version}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-neutral-textSecondary">
                    {form.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={form.link}>
                      <Eye className="w-4 h-4 mr-2" />
                      Visualizar e Utilizar
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default FormsPage
