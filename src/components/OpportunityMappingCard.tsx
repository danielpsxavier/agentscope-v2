import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Building, BrainCircuit, Calendar } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Tables } from '@/lib/supabase/types'

interface OpportunityMappingCardProps {
  mapping: Tables<'opportunity_mappings'>
}

export const OpportunityMappingCard = ({
  mapping,
}: OpportunityMappingCardProps) => {
  const creationDate = new Date(mapping.created_at)

  return (
    <Card className="shadow-soft border-neutral-border hover:shadow-card transition-shadow duration-200 flex flex-col">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-base bg-primary-500/10 flex items-center justify-center flex-shrink-0">
            <Building className="w-5 h-5 text-primary-start" />
          </div>
          <div>
            <CardTitle className="text-base">
              {mapping.client_name_on_mapping}
            </CardTitle>
            <CardDescription className="text-xs mt-1">
              {mapping.department_on_mapping}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-3">
        <div>
          <h4 className="text-xs font-semibold text-neutral-textSecondary mb-1">
            Objetivo de Negócio
          </h4>
          <p className="text-sm text-neutral-textPrimary line-clamp-2">
            {mapping.business_objective}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-4 h-4 text-neutral-textSecondary" />
          <span className="text-sm text-neutral-textSecondary">
            Maturidade:
          </span>
          <Badge variant="secondary">
            {mapping.digital_maturity_on_mapping}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-neutral-textSecondary flex items-center gap-2 pt-4 border-t border-neutral-border">
        <Calendar className="w-3.5 h-3.5" />
        <span>
          Criado{' '}
          {formatDistanceToNow(creationDate, { addSuffix: true, locale: ptBR })}
        </span>
      </CardFooter>
    </Card>
  )
}
