import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { getProfileById } from '@/services/profiles'
import { Profile } from '@/services/profiles'
import { Header } from '@/components/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'

const ProfilePage = () => {
  const { user } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        setLoading(true)
        const { data, error } = await getProfileById(user.id)
        if (error) {
          console.error('Error fetching profile:', error)
        } else {
          setProfile(data)
        }
        setLoading(false)
      }
    }

    fetchProfile()
  }, [user])

  const getInitials = (name: string | null | undefined) => {
    if (!name) return user?.email?.charAt(0).toUpperCase() ?? 'U'
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
  }

  return (
    <div className="p-lg">
      <div className="container mx-auto max-w-[1200px]">
        <Header
          title="Meu Perfil"
          subtitle="Gerencie suas informações pessoais e de conta"
          buttonText="Editar Perfil"
          onButtonClick={() => {
            /* Edit functionality can be implemented here */
          }}
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
                <div className="flex items-center space-x-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile?.avatar_url ?? undefined} />
                    <AvatarFallback className="text-3xl">
                      {getInitials(profile?.full_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-neutral-textPrimary">
                      {profile?.full_name || 'Nome não definido'}
                    </h2>
                    <p className="text-neutral-textSecondary">{user?.email}</p>
                    <p className="text-sm text-neutral-textSecondary pt-2">
                      Membro desde:{' '}
                      {user?.created_at
                        ? new Date(user.created_at).toLocaleDateString('pt-BR')
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}

const ProfileSkeleton = () => (
  <div className="flex items-center space-x-6">
    <Skeleton className="h-24 w-24 rounded-full" />
    <div className="space-y-2">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-5 w-64" />
      <Skeleton className="h-4 w-40" />
    </div>
  </div>
)

export default ProfilePage
