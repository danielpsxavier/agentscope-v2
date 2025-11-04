import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  opportunityMappingSchema,
  OpportunityMappingData,
} from '@/schemas/opportunityMappingSchema'
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
import { GeneralDataSection } from './OpportunityMappingForm/GeneralDataSection'
import { ContextChallengeSection } from './OpportunityMappingForm/ContextChallengeSection'
import { ProcessesToolsSection } from './OpportunityMappingForm/ProcessesToolsSection'
import { InteractionsUsersSection } from './OpportunityMappingForm/InteractionsUsersSection'
import { ExpectedValueSection } from './OpportunityMappingForm/ExpectedValueSection'
import { FinalObservationsSection } from './OpportunityMappingForm/FinalObservationsSection'
import { toast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'
import { createOpportunityMapping } from '@/services/opportunityMappings'
import { TablesInsert } from '@/lib/supabase/types'

interface NewFormSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const defaultFormValues: OpportunityMappingData = {
  clientName: '',
  department: '',
  areaManager: '',
  operationSize: 'Pequena',
  digitalMaturity: 'Baixo',
  mainSystems: '',
  businessObjective: '',
  repetitiveTasks: '',
  experienceBasedDecisions: '',
  emailSpreadsheetActivities: '',
  bottlenecks: '',
  multipleDataSources: '',
  criticalSystems: '',
  hasOpenAPIs: 'Não',
  unstructuredData: {
    relevant: 'Não',
    details: '',
  },
  securityRestrictions: '',
  usesAITools: 'Não',
  mainUser: '',
  interactionChannels: [],
  agentRole: 'Apenas Responder',
  requestTypes: '',
  agentPersona: '',
  expectedBenefit: '',
  timeSpentToday: undefined,
  expectedImpact: undefined,
  hasBudget: 'Não',
  deadline: undefined,
  additionalNotes: '',
  initialAgentIdeas: '',
  clientInterestLevel: 'Médio',
}

export const NewFormSheet = ({ open, onOpenChange }: NewFormSheetProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<OpportunityMappingData>({
    resolver: zodResolver(opportunityMappingSchema),
    defaultValues: defaultFormValues,
  })

  const onSubmit = async (data: OpportunityMappingData) => {
    setIsSubmitting(true)
    try {
      const mappingPayload: TablesInsert<'opportunity_mappings'> = {
        client_id: 1, // Mocked as per requirement
        client_name_on_mapping: data.clientName,
        department_on_mapping: data.department,
        responsible_on_mapping: data.areaManager,
        operation_size_on_mapping: data.operationSize,
        digital_maturity_on_mapping: data.digitalMaturity,
        main_systems_on_mapping: data.mainSystems,
        business_objective: data.businessObjective,
        repetitive_tasks: data.repetitiveTasks,
        experience_based_decisions: data.experienceBasedDecisions,
        email_spreadsheet_activities: data.emailSpreadsheetActivities,
        bottlenecks: data.bottlenecks,
        multiple_data_sources:
          data.multipleDataSources?.toLowerCase().includes('sim') ?? null,
        critical_systems: data.criticalSystems,
        open_apis: data.hasOpenAPIs === 'Sim',
        ai_usage: data.usesAITools === 'Sim',
        unstructured_data: data.unstructuredData.relevant === 'Sim',
        unstructured_data_details: data.unstructuredData.details,
        security_restrictions: data.securityRestrictions,
        main_user: data.mainUser,
        agent_role:
          data.agentRole === 'Executar Ações' ? 'executar' : 'responder',
        interaction_channels: JSON.stringify(data.interactionChannels),
        request_types: data.requestTypes,
        agent_persona: data.agentPersona,
        expected_benefit: data.expectedBenefit,
        budget: data.hasBudget === 'Sim' ? 1 : 0,
        time_spent_today: data.timeSpentToday?.toString(),
        expected_impact_percentage: data.expectedImpact,
        deadline_goal: data.deadline ? data.deadline.toISOString() : null,
        additional_notes: data.additionalNotes,
        initial_agent_ideas: data.initialAgentIdeas,
        client_interest_level: (() => {
          switch (data.clientInterestLevel) {
            case 'Muito Alto':
            case 'Alto':
              return 'Alto'
            case 'Médio':
              return 'Medio'
            case 'Baixo':
              return 'Baixo'
          }
        })(),
      }

      const { error } = await createOpportunityMapping(mappingPayload)

      if (error) {
        throw error
      }

      toast({
        title: 'Formulário Salvo!',
        description: 'O novo formulário de mapeamento foi criado com sucesso.',
      })
      handleClose(false)
    } catch (error) {
      console.error('Failed to save form:', error)
      toast({
        variant: 'destructive',
        title: 'Erro ao Salvar',
        description: 'Ocorreu um erro ao salvar o formulário. Tente novamente.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      form.reset(defaultFormValues)
    }
    onOpenChange(isOpen)
  }

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent className="w-full sm:max-w-3xl">
        <SheetHeader>
          <SheetTitle>Novo Formulário de Mapeamento</SheetTitle>
          <SheetDescription>
            Preencha as informações abaixo para criar um novo mapeamento de
            oportunidade.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-150px)] pr-6">
          <div className="py-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <GeneralDataSection form={form} />
                <ContextChallengeSection form={form} />
                <ProcessesToolsSection form={form} />
                <InteractionsUsersSection form={form} />
                <ExpectedValueSection form={form} />
                <FinalObservationsSection form={form} />
              </form>
            </Form>
          </div>
        </ScrollArea>
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
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
