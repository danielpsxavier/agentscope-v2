import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { NewUserSheet } from '@/components/NewUserSheet'
import { getUsers } from '@/services/users'
import { UserProfile } from '@/types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle, UserPlus, Users2 } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const UsersPage = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error: fetchError } = await getUsers()
      if (fetchError) throw fetchError
      setUsers(data || [])
    } catch (err: any) {
      setError('Falha ao carregar usuários. Tente novamente mais tarde.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleUserCreated = () => {
    setIsSheetOpen(false)
    fetchUsers()
  }

  const getInitials = (user: UserProfile) => {
    if (user.full_name) {
      const names = user.full_name.split(' ').filter(Boolean)
      if (names.length > 1) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
      }
      if (names.length === 1) {
        return names[0].substring(0, 2).toUpperCase()
      }
    }
    return user.email?.charAt(0).toUpperCase() ?? 'U'
  }

  const renderContent = () => {
    if (loading) {
      return <TableSkeleton />
    }

    if (error) {
      return (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )
    }

    if (users.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center text-center py-16 border-2 border-dashed border-neutral-border rounded-lg">
          <Users2 className="w-12 h-12 text-neutral-textSecondary mb-4" />
          <h3 className="text-h3 text-neutral-textPrimary">
            Nenhum Usuário Encontrado
          </h3>
          <p className="text-neutral-textSecondary mt-2">
            Ainda não há usuários cadastrados. Clique em "Novo Usuário" para
            adicionar o primeiro.
          </p>
        </div>
      )
    }

    return (
      <div className="border rounded-lg bg-white shadow-soft overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]"></TableHead>
              <TableHead>Nome Completo</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Data de Criação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={user.avatar_url || undefined} />
                    <AvatarFallback>{getInitials(user)}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium text-neutral-textPrimary">
                  {user.full_name || 'N/A'}
                </TableCell>
                <TableCell className="text-neutral-textSecondary">
                  {user.email}
                </TableCell>
                <TableCell className="text-neutral-textSecondary">
                  {user.created_at
                    ? format(new Date(user.created_at), 'dd/MM/yyyy', {
                        locale: ptBR,
                      })
                    : 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="flex-1">
      <div className="container mx-auto max-w-[1200px]">
        <Header
          title="Gerenciamento de Usuários"
          subtitle="Adicione e gerencie os usuários do sistema"
          buttonText="Novo Usuário"
          onButtonClick={() => setIsSheetOpen(true)}
          buttonIcon={UserPlus}
        />
        <section className="mt-6">{renderContent()}</section>
      </div>
      <NewUserSheet
        open={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        onUserCreated={handleUserCreated}
      />
    </div>
  )
}

const TableSkeleton = () => (
  <div className="border rounded-lg bg-white p-4 space-y-2">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="flex items-center space-x-4 h-12">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/5" />
      </div>
    ))}
  </div>
)

export default UsersPage
