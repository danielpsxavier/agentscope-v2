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

interface NewFormSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const NewFormSheet = ({ open, onOpenChange }: NewFormSheetProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<OpportunityMappingData>({
    resolver: zodResolver(opportunityMappingSchema),
    defaultValues: {
      interactionChannels: [],
      unstructuredData: {
        relevant: 'Não',
        details: '',
      },
    },
  })

  const onSubmit = async (data: OpportunityMappingData) => {
    setIsSubmitting(true)
    console.log('New Form Data Submitted:', data)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: 'Formulário Salvo!',
      description: 'O novo formulário de mapeamento foi criado com sucesso.',
    })
    setIsSubmitting(false)
    handleClose(false) // Close sheet on success
  }

  const handleClose = (isOpen: boolean) => {
    if (!isOpen) {
      form.reset({
        interactionChannels: [],
        unstructuredData: {
          relevant: 'Não',
          details: '',
        },
      })
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
