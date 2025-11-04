import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Filter, X } from 'lucide-react'
import { Constants } from '@/lib/supabase/types'

interface AgentStatusFilterProps {
  selectedStatuses: string[]
  onStatusChange: (statuses: string[]) => void
}

const allStatuses = Constants.public.Enums.agent_idea_status_type

export const AgentStatusFilter = ({
  selectedStatuses,
  onStatusChange,
}: AgentStatusFilterProps) => {
  const handleSelect = (status: string) => {
    const newSelection = selectedStatuses.includes(status)
      ? selectedStatuses.filter((s) => s !== status)
      : [...selectedStatuses, status]
    onStatusChange(newSelection)
  }

  const clearFilters = () => {
    onStatusChange([])
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span>Filtrar Status</span>
          {selectedStatuses.length > 0 && (
            <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
              {selectedStatuses.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filtrar por Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {allStatuses.map((status) => (
          <DropdownMenuCheckboxItem
            key={status}
            checked={selectedStatuses.includes(status)}
            onCheckedChange={() => handleSelect(status)}
            onSelect={(e) => e.preventDefault()}
          >
            {status}
          </DropdownMenuCheckboxItem>
        ))}
        {selectedStatuses.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <Button
              variant="ghost"
              className="w-full h-auto py-1.5 px-2 justify-start text-sm text-destructive hover:text-destructive"
              onClick={clearFilters}
            >
              <X className="mr-2 h-4 w-4" />
              Limpar Filtros
            </Button>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
