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
import { AlertTriangle, UserPlus } from 'lucide-react'
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
      setError('Falha ao carregar usuários.')
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

  return (
    <div className="p-lg">
      <div className="container mx-auto max-w-[1200px]">
        <Header
          title="Gerenciamento de Usuários"
          subtitle="Adicione e gerencie os usuários do sistema"
          buttonText="Novo Usuário"
          onButtonClick={() => setIsSheetOpen(true)}
          buttonIcon={UserPlus}
        />
        <section className="mt-6">
          {loading ? (
            <TableSkeleton />
          ) : error ? (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Erro</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
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
                          <AvatarFallback>
                            {user.full_name
                              ? user.full_name
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')
                              : user.email?.charAt(0).toUpperCase()}
                          </AvatarFallback>
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
          )}
        </section>
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
