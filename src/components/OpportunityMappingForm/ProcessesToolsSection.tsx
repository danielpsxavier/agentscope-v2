import { UseFormReturn } from 'react-hook-form'
import { OpportunityMappingData } from '@/schemas/opportunityMappingSchema'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { FormSection } from './FormSection'

interface ProcessesToolsSectionProps {
  form: UseFormReturn<OpportunityMappingData>
}

export const ProcessesToolsSection = ({ form }: ProcessesToolsSectionProps) => {
  return (
    <FormSection
      title="3️⃣ Processos e Ferramentas"
      description="Detalhes sobre a infraestrutura tecnológica e de dados."
    >
      <FormField
        control={form.control}
        name="criticalSystems"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Sistemas críticos</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Quais sistemas são essenciais para a operação da área?"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </FormSection>
  )
}
