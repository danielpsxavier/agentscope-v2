import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import {
  externalOpportunitySchema,
  ExternalOpportunityData,
} from '@/schemas/externalOpportunitySchema'
import { submitExternalOpportunity } from '@/services/opportunityMappings'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2, Bot } from 'lucide-react'
import { toast } from 'sonner'

const FormSection = ({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold border-b pb-2 text-neutral-textPrimary">
      {title}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">{children}</div>
  </div>
)

const ExternalOpportunityFormPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const form = useForm<ExternalOpportunityData>({
    resolver: zodResolver(externalOpportunitySchema),
    defaultValues: {},
  })

  const onSubmit = async (data: ExternalOpportunityData) => {
    setIsSubmitting(true)
    const { error } = await submitExternalOpportunity(data)

    if (error) {
      toast.error('Falha no Envio', {
        description:
          'Não foi possível cadastrar a oportunidade. Verifique os dados e tente novamente.',
      })
      console.error(error)
    } else {
      navigate('/obrigado')
    }
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-neutral-pageBackground py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="w-11 h-11 rounded-base bg-primary-start flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span className="text-neutral-textPrimary font-semibold text-2xl">
              AgentScope
            </span>
          </div>
          <h1 className="text-3xl font-bold text-neutral-textPrimary">
            Cadastro de Oportunidade
          </h1>
          <p className="text-neutral-textSecondary mt-2">
            Preencha o formulário abaixo para mapear uma nova oportunidade de
            Agent AI.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormSection title="Informações do Cliente">
                  <FormField
                    control={form.control}
                    name="client_name_on_mapping"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Nome do Cliente (Obrigatório)</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Empresa S.A." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="department_on_mapping"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Área / Departamento</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Vendas" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="responsible_on_mapping"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Responsável na Área</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: João da Silva" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormSection>

                <FormSection title="Contexto da Operação">
                  <FormField
                    control={form.control}
                    name="operation_size_on_mapping"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tamanho da Operação</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: 10 pessoas" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="digital_maturity_on_mapping"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maturidade Digital</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: Baixa, Média, Alta"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="main_systems_on_mapping"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Sistemas Principais</FormLabel>
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
                  <FormField
                    control={form.control}
                    name="critical_systems"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Sistemas Críticos</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Quais sistemas são essenciais para a operação?"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormSection>

                <FormSection title="Desafios e Oportunidades">
                  <FormField
                    control={form.control}
                    name="business_objective"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Objetivo de Negócio</FormLabel>
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
                    name="repetitive_tasks"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tarefas Repetitivas</FormLabel>
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
                    name="email_spreadsheet_activities"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Uso de E-mails/Planilhas</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Processos que dependem muito desses meios."
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
                      <FormItem className="md:col-span-2">
                        <FormLabel>Gargalos e Retrabalhos</FormLabel>
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
                </FormSection>

                <FormSection title="Detalhes Adicionais">
                  <FormField
                    control={form.control}
                    name="main_user"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Usuário Principal</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Quem mais usaria a solução?"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="time_spent_today"
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
                    name="expected_benefit"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
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
                  <FormField
                    control={form.control}
                    name="expected_impact_percentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Impacto Esperado (%)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Ex: 30"
                            {...field}
                          />
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
                          <Input
                            type="number"
                            placeholder="Ex: 50000"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="deadline_goal"
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
                    name="client_interest_level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nível de Interesse</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o nível" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Alto">Alto</SelectItem>
                            <SelectItem value="Medio">Médio</SelectItem>
                            <SelectItem value="Baixo">Baixo</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormSection>

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    className="primary-btn w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isSubmitting ? 'Enviando...' : 'Enviar Oportunidade'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ExternalOpportunityFormPage
