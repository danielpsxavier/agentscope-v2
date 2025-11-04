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

interface ContextChallengeSectionProps {
  form: UseFormReturn<OpportunityMappingData>
}

export const ContextChallengeSection = ({
  form,
}: ContextChallengeSectionProps) => {
  return (
    <FormSection
      title="2️⃣ Contexto e Desafio"
      description="Entenda os objetivos, dores e gargalos atuais da operação."
    >
      <FormField
        control={form.control}
        name="businessObjective"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Objetivo de negócio da área</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Qual o principal objetivo que a área busca alcançar?"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="repetitiveTasks"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tarefas repetitivas ou manuais</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Ex: copiar e colar dados, preencher relatórios..."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="experienceBasedDecisions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Decisões que dependem de experiência</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Ex: análise de crédito, aprovação de propostas..."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="emailSpreadsheetActivities"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Atividades com muita troca de e-mails/planilhas
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Descreva os processos que dependem muito desses meios."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="bottlenecks"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Gargalos ou retrabalhos frequentes</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Onde o processo costuma parar ou precisar de refação?"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="multipleDataSources"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Processos que dependem de múltiplas fontes</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Descreva processos que exigem consulta a vários sistemas, documentos ou pessoas."
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
