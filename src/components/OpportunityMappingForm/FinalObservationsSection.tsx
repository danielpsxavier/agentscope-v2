import { UseFormReturn } from 'react-hook-form'
import { OpportunityMappingData } from '@/schemas/opportunityMappingSchema'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormSection } from './FormSection'
import { Input } from '../ui/input'

interface FinalObservationsSectionProps {
  form: UseFormReturn<OpportunityMappingData>
}

export const FinalObservationsSection = ({
  form,
}: FinalObservationsSectionProps) => {
  return (
    <FormSection
      title="4️⃣ Observações Finais"
      description="Notas e percepções finais sobre a oportunidade."
    >
      <FormField
        control={form.control}
        name="expectedImpactPercentage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Impacto Esperado (%)</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Ex: 30" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="budget"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Orçamento (Budget)</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Ex: 50000" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="deadlineGoal"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Prazo / Meta</FormLabel>
            <FormControl>
              <Input placeholder="Ex: Q3 2025" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="clientInterestLevel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nível de interesse do cliente</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o nível de interesse" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Baixo">Baixo</SelectItem>
                <SelectItem value="Médio">Médio</SelectItem>
                <SelectItem value="Alto">Alto</SelectItem>
                <SelectItem value="Muito Alto">Muito Alto</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </FormSection>
  )
}
