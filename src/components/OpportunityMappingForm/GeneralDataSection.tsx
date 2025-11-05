import { UseFormReturn } from 'react-hook-form'
import { OpportunityMappingData } from '@/schemas/opportunityMappingSchema'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { FormSection } from './FormSection'

interface GeneralDataSectionProps {
  form: UseFormReturn<OpportunityMappingData>
}

export const GeneralDataSection = ({ form }: GeneralDataSectionProps) => {
  return (
    <FormSection
      title="1️⃣ Dados Gerais do Cliente"
      description="Informações básicas sobre o cliente e a área em foco."
    >
      <FormField
        control={form.control}
        name="clientName"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Nome do Cliente</FormLabel>
            <FormControl>
              <Input placeholder="Ex: TechCorp Brasil" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="department"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Área / Departamento Avaliado</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma área" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Operações">Operações</SelectItem>
                <SelectItem value="Vendas">Vendas</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="RH">RH</SelectItem>
                <SelectItem value="Financeiro">Financeiro</SelectItem>
                <SelectItem value="Supply Chain">Supply Chain</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="areaManager"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Responsável da Área</FormLabel>
            <FormControl>
              <Input placeholder="Ex: João da Silva" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="operationSize"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tamanho da Operação</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tamanho" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Pequena">Pequena</SelectItem>
                <SelectItem value="Média">Média</SelectItem>
                <SelectItem value="Grande">Grande</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="digitalMaturity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nível de Maturidade Digital</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o nível" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Baixo">Baixo</SelectItem>
                <SelectItem value="Médio">Média</SelectItem>
                <SelectItem value="Alto">Alto</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="mainSystems"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <FormLabel>Sistemas Principais Utilizados</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Descreva os sistemas, ERPs, CRMs, etc."
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
