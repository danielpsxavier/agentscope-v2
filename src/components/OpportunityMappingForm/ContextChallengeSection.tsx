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
import { Input } from '../ui/input'

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
          <FormItem className="col-span-2">
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
        name="mainUser"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Usuário Principal</FormLabel>
            <FormControl>
              <Input placeholder="Quem mais usaria a solução?" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="timeSpentToday"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tempo Gasto Hoje</FormLabel>
            <FormControl>
              <Input placeholder="Ex: 4 horas/dia" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="expectedBenefit"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Benefício Esperado</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Qual o principal ganho esperado com a automação?"
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
