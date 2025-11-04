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
import { FinalObservationsSection } from './OpportunityMappingForm/FinalObservationsSection'
import { toast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'
import { createOpportunityMappingWithClientCheck } from '@/services/opportunityMappings'

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
  emailSpreadsheetActivities: '',
  bottlenecks: '',
  criticalSystems: '',
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
      const { error } = await createOpportunityMappingWithClientCheck(data)

      if (error) {
        throw error
      }

      toast({
        title: 'Formulário Salvo!',
        description:
          'O novo mapeamento de oportunidade foi criado com sucesso.',
      })
      handleClose(false)
    } catch (error) {
      console.error('Failed to save form:', error)
      toast({
        variant: 'destructive',
        title: 'Erro ao Salvar',
        description:
          'Ocorreu um erro ao salvar o formulário. Verifique os dados e tente novamente.',
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
