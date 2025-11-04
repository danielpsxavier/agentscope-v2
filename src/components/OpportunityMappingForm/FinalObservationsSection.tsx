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
import { Textarea } from '@/components/ui/textarea'
import { FormSection } from './FormSection'

interface FinalObservationsSectionProps {
  form: UseFormReturn<OpportunityMappingData>
}

export const FinalObservationsSection = ({
  form,
}: FinalObservationsSectionProps) => {
  return (
    <FormSection
      title="6️⃣ Observações Finais"
      description="Notas e percepções finais sobre a oportunidade."
    >
      <FormField
        control={form.control}
        name="additionalNotes"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Notas adicionais da imersão</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Qualquer outra informação relevante coletada..."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="initialAgentIdeas"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Ideias iniciais de agentes</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Brainstorm inicial de possíveis agentes ou soluções."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
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
