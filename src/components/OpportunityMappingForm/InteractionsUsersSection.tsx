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
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormSection } from './FormSection'

const interactionOptions = [
  { id: 'chat', label: 'Chat em sistema interno' },
  { id: 'email', label: 'E-mail' },
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'slack', label: 'Slack / Teams' },
]

interface InteractionsUsersSectionProps {
  form: UseFormReturn<OpportunityMappingData>
}

export const InteractionsUsersSection = ({
  form,
}: InteractionsUsersSectionProps) => {
  return (
    <FormSection
      title="4️⃣ Interações e Usuários"
      description="Como os usuários interagiriam com o agente e o que esperam dele."
    >
      <FormField
        control={form.control}
        name="mainUser"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Principal usuário</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o perfil" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Equipe Interna">Equipe Interna</SelectItem>
                <SelectItem value="Gestores">Gestores</SelectItem>
                <SelectItem value="Clientes Finais">Clientes Finais</SelectItem>
                <SelectItem value="Fornecedores">Fornecedores</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="agentRole"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              O agente deve apenas responder ou executar ações?
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o papel" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Apenas Responder">
                  Apenas Responder
                </SelectItem>
                <SelectItem value="Executar Ações">Executar Ações</SelectItem>
                <SelectItem value="Ambos">Ambos</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="interactionChannels"
        render={() => (
          <FormItem className="md:col-span-2">
            <FormLabel>Como o agente interagiria?</FormLabel>
            <div className="grid grid-cols-2 gap-4 pt-2">
              {interactionOptions.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="interactionChannels"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([
                                  ...(field.value || []),
                                  item.id,
                                ])
                              : field.onChange(
                                  field.value?.filter(
                                    (value) => value !== item.id,
                                  ),
                                )
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="requestTypes"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>
              Tipos de solicitações que o agente deve entender
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Ex: 'Qual o status do pedido X?', 'Gere um relatório de vendas', 'Abra um ticket de suporte'"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="agentPersona"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Persona / tom de voz esperado</FormLabel>
            <FormControl>
              <Input
                placeholder="Ex: Formal, prestativo, direto ao ponto"
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
