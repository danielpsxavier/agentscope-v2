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
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { FormSection } from './FormSection'

interface ExpectedValueSectionProps {
  form: UseFormReturn<OpportunityMappingData>
}

export const ExpectedValueSection = ({ form }: ExpectedValueSectionProps) => {
  return (
    <FormSection
      title="5️⃣ Valor Esperado e Métricas"
      description="Qual o impacto e os benefícios esperados com a automação."
    >
      <FormField
        control={form.control}
        name="expectedBenefit"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Benefício esperado</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o principal benefício" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Redução de Custo">
                  Redução de Custo
                </SelectItem>
                <SelectItem value="Aumento de Eficiência">
                  Aumento de Eficiência
                </SelectItem>
                <SelectItem value="Melhora na Qualidade">
                  Melhora na Qualidade
                </SelectItem>
                <SelectItem value="Aumento de Receita">
                  Aumento de Receita
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="hasBudget"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Orçamento ou patrocínio?</FormLabel>
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
        name="timeSpentToday"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tempo gasto hoje (horas/mês)</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Ex: 160" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="expectedImpact"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Impacto esperado (%)</FormLabel>
            <FormControl>
              <Input type="number" placeholder="Ex: 50" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="deadline"
        render={({ field }) => (
          <FormItem className="flex flex-col pt-2">
            <FormLabel>Meta de prazo</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full pl-3 text-left font-normal',
                      !field.value && 'text-muted-foreground',
                    )}
                  >
                    {field.value ? (
                      format(field.value, 'PPP', { locale: ptBR })
                    ) : (
                      <span>Escolha uma data</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </FormSection>
  )
}
