import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  opportunityMappingSchema,
  OpportunityMappingData,
} from '@/schemas/opportunityMappingSchema'
import { AIAnalysis } from '@/types'
import { Client } from '@/types'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { GeneralDataSection } from './GeneralDataSection'
import { ContextChallengeSection } from './ContextChallengeSection'
import { ProcessesToolsSection } from './ProcessesToolsSection'
import { FinalObservationsSection } from './FinalObservationsSection'
import { AIAnalysisDisplay } from '@/components/AIAnalysisDisplay'
import { toast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'

interface OpportunityMappingFormProps {
  client: Client
  open: boolean
  onOpenChange: (open: boolean) => void
}

const mockApiResponse: AIAnalysis = {
  analise_geral: {
    nivel_maturidade: 'Médio',
    principais_dores: [
      'Excesso de tarefas manuais em Vendas',
      'Dificuldade em consolidar dados de diferentes fontes',
      'Processo de cotação lento e dependente de e-mails',
    ],
    potencial_impacto:
      'Alto. A automação pode reduzir o tempo de ciclo de vendas em até 40% e aumentar a precisão das propostas.',
  },
  ideias_de_agents: [
    {
      nome_agente: 'Agente de Cotação de Vendas',
      descricao:
        'Um agente que automatiza a criação de cotações, buscando informações de produtos em sistemas internos, calculando preços e gerando propostas em PDF.',
      funcionalidades_chave: [
        'Integração com ERP para dados de produtos',
        'Cálculo de impostos e frete',
        'Geração de PDF com template da empresa',
        'Envio automático por e-mail',
      ],
      beneficios_esperados: [
        'Redução de 80% no tempo de criação de propostas',
        'Eliminação de erros manuais',
        'Padronização das cotações',
      ],
      complexidade_estimada: 'Média',
      status: 'Em análise',
    },
    {
      nome_agente: 'Assistente de Relatórios de Vendas',
      descricao:
        'Um agente que responde a perguntas em linguagem natural sobre performance de vendas, consolidando dados do CRM e planilhas.',
      funcionalidades_chave: [
        'Conexão com CRM via API',
        'Processamento de linguagem natural para entender perguntas',
        'Geração de gráficos e tabelas sob demanda',
      ],
      beneficios_esperados: [
        'Acesso instantâneo a dados de vendas',
        'Redução do tempo gasto por gestores na criação de relatórios',
        'Tomada de decisão mais ágil',
      ],
      complexidade_estimada: 'Alta',
      status: 'Em análise',
    },
  ],
}

export const OpportunityMappingForm = ({
  client,
  open,
  onOpenChange,
}: OpportunityMappingFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null)

  const form = useForm<OpportunityMappingData>({
    resolver: zodResolver(opportunityMappingSchema),
    defaultValues: {
      clientName: client.name,
      department: client.department,
    },
  })

  const onSubmit = async (data: OpportunityMappingData) => {
    setIsSubmitting(true)
    console.log('Form Data Submitted:', data)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    setAnalysis(mockApiResponse)
    setIsSubmitting(false)
    toast({
      title: 'Análise de IA Concluída!',
      description: 'As ideias de agentes foram geradas com sucesso.',
    })
  }

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      form.reset({
        clientName: client.name,
        department: client.department,
      })
      setAnalysis(null)
    }
    onOpenChange(isOpen)
  }

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent className="w-full sm:max-w-3xl">
        <SheetHeader>
          <SheetTitle>Mapeamento de Oportunidade - {client.name}</SheetTitle>
          <SheetDescription>
            {analysis
              ? 'Análise e ideias geradas pela IA.'
              : 'Preencha o formulário para gerar uma análise de potencial de Agent AI.'}
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-150px)] pr-6">
          <div className="py-6">
            {analysis ? (
              <AIAnalysisDisplay analysis={analysis} />
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <GeneralDataSection form={form} />
                  <ContextChallengeSection form={form} />
                  <ProcessesToolsSection form={form} />
                  <FinalObservationsSection form={form} />
                </form>
              </Form>
            )}
          </div>
        </ScrollArea>
        {!analysis && (
          <SheetFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => handleClose(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="primary-btn"
              disabled={isSubmitting}
              onClick={form.handleSubmit(onSubmit)}
            >
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isSubmitting ? 'Analisando...' : 'Salvar e Gerar Análise'}
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
