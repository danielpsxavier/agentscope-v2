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

interface ProcessesToolsSectionProps {
  form: UseFormReturn<OpportunityMappingData>
}

export const ProcessesToolsSection = ({ form }: ProcessesToolsSectionProps) => {
  const unstructuredDataRelevant = form.watch('unstructuredData.relevant')

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
      <FormField
        control={form.control}
        name="hasOpenAPIs"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Possui APIs abertas?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Sim">Sim</SelectItem>
                <SelectItem value="Não">Não</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="usesAITools"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Usa ferramentas de IA atualmente?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Sim">Sim</SelectItem>
                <SelectItem value="Não">Não</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="unstructuredData.relevant"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Dados não estruturados relevantes?</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma opção" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Sim">Sim</SelectItem>
                <SelectItem value="Não">Não</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      {unstructuredDataRelevant === 'Sim' && (
        <FormField
          control={form.control}
          name="unstructuredData.details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quais dados não estruturados?</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ex: E-mails, PDFs, áudios, imagens..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      <FormField
        control={form.control}
        name="securityRestrictions"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Restrições de segurança/compliance</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Ex: LGPD, dados sensíveis, políticas internas..."
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
