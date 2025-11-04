import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { newUserSchema, NewUserData } from '@/schemas/userSchema'
import { createUser } from '@/services/users'
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
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

interface NewUserSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUserCreated: () => void
}

export const NewUserSheet = ({
  open,
  onOpenChange,
  onUserCreated,
}: NewUserSheetProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<NewUserData>({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      email: '',
      password: '',
      full_name: '',
    },
  })

  const onSubmit = async (data: NewUserData) => {
    setIsSubmitting(true)
    try {
      const { error } = await createUser(data)

      if (error) {
        throw new Error(error.message || 'Falha ao criar usuário.')
      }

      toast.success('Usuário criado com sucesso!')
      onUserCreated()
      form.reset()
    } catch (error: any) {
      toast.error('Erro ao criar usuário', {
        description: error.message,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Criar Novo Usuário</SheetTitle>
          <SheetDescription>
            Preencha os dados para registrar um novo usuário no sistema.
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
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Maria Silva" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="maria.silva@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
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
                Criar Usuário
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
