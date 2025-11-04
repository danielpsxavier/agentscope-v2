import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { AgentIdeasSummary as AgentIdeasSummaryType } from '@/types'
import { Bot, FileText, CheckCircle, XCircle, Rocket } from 'lucide-react'

interface AgentIdeasSummaryProps {
  summary: AgentIdeasSummaryType | null
  loading: boolean
}

const SummaryItem = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: number | string
}) => (
  <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-muted/50">
    <div className="flex items-center gap-3">
      <Icon className="w-4 h-4 text-neutral-textSecondary" />
      <span className="text-sm text-neutral-textPrimary">{label}</span>
    </div>
    <span className="text-sm font-semibold text-neutral-textPrimary">
      {value}
    </span>
  </div>
)

export const AgentIdeasSummary = ({
  summary,
  loading,
}: AgentIdeasSummaryProps) => {
  if (loading) {
    return <AgentIdeasSummarySkeleton />
  }

  return (
    <Card className="shadow-soft border-neutral-border">
      <CardHeader>
        <CardTitle className="text-h3 flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          Resumo de Ideias de Agentes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <SummaryItem
          icon={Bot}
          label="Total de Ideias"
          value={summary?.total ?? 0}
        />
        <SummaryItem
          icon={FileText}
          label="Ideias em Rascunho"
          value={summary?.draft ?? 0}
        />
        <SummaryItem
          icon={CheckCircle}
          label="Ideias Aprovadas"
          value={summary?.approved ?? 0}
        />
        <SummaryItem
          icon={XCircle}
          label="Ideias Rejeitadas"
          value={summary?.rejected ?? 0}
        />
        <SummaryItem
          icon={Rocket}
          label="Ideias Implementadas"
          value={summary?.implemented ?? 0}
        />
      </CardContent>
    </Card>
  )
}

const AgentIdeasSummarySkeleton = () => (
  <Card>
    <CardHeader>
      <CardTitle className="text-h3 flex items-center gap-2">
        <Skeleton className="w-5 h-5 rounded-full" />
        <Skeleton className="h-6 w-64" />
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center justify-between p-3">
          <div className="flex items-center gap-3">
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-4 w-8" />
        </div>
      ))}
    </CardContent>
  </Card>
)
