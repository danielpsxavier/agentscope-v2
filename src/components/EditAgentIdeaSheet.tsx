import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { agentIdeaSchema, AgentIdeaData } from '@/schemas/agentIdeaSchema'
import { AgentIdea } from '@/types'
import { updateAgentIdea } from '@/services/analysis'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
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
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

interface EditAgentIdeaSheetProps {
  idea: AgentIdea
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdateSuccess: () => void
}

const parseJsonString = (jsonString: string | null): string[] => {
  if (!jsonString) return []
  try {
    const parsed = JSON.parse(jsonString)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    return []
  }
}

export const EditAgentIdeaSheet = ({
  idea,
  open,
  onOpenChange,
  onUpdateSuccess,
}: EditAgentIdeaSheetProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<AgentIdeaData>({
    resolver: zodResolver(agentIdeaSchema),
  })

  useEffect(() => {
    if (idea) {
      form.reset({
        id: idea.id,
        agent_name: idea.agent_name,
        description: idea.description || '',
        complexity: idea.complexity || 'Media',
        status: idea.status,
        key_features: parseJsonString(idea.key_features).join('\n'),
        expected_benefits: parseJsonString(idea.expected_benefits).join('\n'),
      })
    }
  }, [idea, form])

  const onSubmit = async (data: AgentIdeaData) => {
    setIsSubmitting(true)
    const { error } = await updateAgentIdea(data)
    if (error) {
      toast.error('Erro ao atualizar', {
        description: 'Não foi possível salvar as alterações. Tente novamente.',
      })
    } else {
      onUpdateSuccess()
    }
    setIsSubmitting(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>Editar Ideia de Agente</SheetTitle>
          <SheetDescription>
            Ajuste os detalhes e o status da ideia de agente.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col h-full"
          >
            <ScrollArea className="flex-1 pr-6 -mr-6 py-6">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="agent_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Agente</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea rows={4} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="complexity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Complexidade</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Baixa">Baixa</SelectItem>
                            <SelectItem value="Media">Média</SelectItem>
                            <SelectItem value="Alta">Alta</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Rascunho">Rascunho</SelectItem>
                            <SelectItem value="Aprovado">Aprovado</SelectItem>
                            <SelectItem value="Rejeitado">Rejeitado</SelectItem>
                            <SelectItem value="Implementado">
                              Implementado
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="key_features"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Funcionalidades Chave</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="Uma funcionalidade por linha..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="expected_benefits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Benefícios Esperados</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={4}
                          placeholder="Um benefício por linha..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </ScrollArea>
            <SheetFooter className="pt-6">
              <Button
                type="button"
                variant="secondary"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="primary-btn"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Salvar
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
