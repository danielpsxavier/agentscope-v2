import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/hooks/use-auth'
import { getProfileById, updateProfile, Profile } from '@/services/profiles'
import { profileSchema, ProfileData } from '@/schemas/profileSchema'
import { Header } from '@/components/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
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

const ProfilePage = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: '',
    },
  })

  const { isSubmitting } = form.formState

  const fetchProfile = async (showLoader = true) => {
    if (user) {
      if (showLoader) setLoading(true)
      const { data, error } = await getProfileById(user.id)
      if (error) {
        console.error('Error fetching profile:', error)
        toast.error('Erro ao carregar perfil.')
      } else {
        setProfile(data)
        form.reset({ full_name: data?.full_name || '' })
      }
      if (showLoader) setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [user])

  const getInitials = (name: string | null | undefined) => {
    if (!name || name.trim() === '')
      return user?.email?.charAt(0).toUpperCase() ?? 'U'
    const parts = name.trim().split(' ').filter(Boolean)
    if (parts.length > 1) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
    }
    return parts[0].substring(0, 2).toUpperCase()
  }

  const onSubmit = async (data: ProfileData) => {
    if (!user) return

    const { error } = await updateProfile(user.id, {
      full_name: data.full_name,
    })

    if (error) {
      toast.error('Erro ao atualizar perfil', {
        description: 'Não foi possível salvar as alterações. Tente novamente.',
      })
    } else {
      toast.success('Perfil atualizado com sucesso!')
      await fetchProfile(false)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    form.reset({ full_name: profile?.full_name || '' })
  }

  return (
    <div className="flex-1">
      <div className="container mx-auto max-w-[1200px]">
        <Header
          title={isEditing ? 'Editar Perfil' : 'Meu Perfil'}
          subtitle="Gerencie suas informações pessoais e de conta"
          buttonText={!isEditing ? 'Editar Perfil' : undefined}
          onButtonClick={() => setIsEditing(true)}
        />

        <section className="mt-6">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Informações do Perfil</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <ProfileSkeleton />
              ) : (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex items-start space-x-6"
                  >
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={profile?.avatar_url ?? undefined} />
                      <AvatarFallback className="text-3xl">
                        {getInitials(profile?.full_name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-4">
                      <FormField
                        control={form.control}
                        name="full_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome Completo</FormLabel>
                            {isEditing ? (
                              <FormControl>
                                <Input
                                  placeholder="Seu nome completo"
                                  {...field}
                                />
                              </FormControl>
                            ) : (
                              <p className="text-lg font-medium text-neutral-textPrimary pt-2">
                                {field.value || 'Nome não definido'}
                              </p>
                            )}
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <p className="text-neutral-textSecondary pt-2">
                          {user?.email}
                        </p>
                      </FormItem>

                      <FormItem>
                        <FormLabel>Membro desde</FormLabel>
                        <p className="text-sm text-neutral-textSecondary pt-2">
                          {user?.created_at
                            ? new Date(user.created_at).toLocaleDateString(
                                'pt-BR',
                              )
                            : 'N/A'}
                        </p>
                      </FormItem>

                      {isEditing && (
                        <div className="flex justify-end gap-2 pt-4">
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={handleCancel}
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
                        </div>
                      )}
                    </div>
                  </form>
                </Form>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}

const ProfileSkeleton = () => (
  <div className="flex items-start space-x-6">
    <Skeleton className="h-24 w-24 rounded-full" />
    <div className="space-y-4 flex-1">
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-6 w-48" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-5 w-64" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-40" />
      </div>
    </div>
  </div>
)

export default ProfilePage
