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
        name="clientInterestLevel"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
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
