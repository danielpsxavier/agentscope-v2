import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Bot, CheckCircle, Tag, BarChart, Briefcase, Edit } from 'lucide-react'
import { AgentIdea } from '@/types'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'

interface AgentIdeaCardProps {
  idea: AgentIdea
  onEdit: (idea: AgentIdea) => void
}

const complexityStyles = {
  Baixa: 'bg-green-100 text-green-800 border-green-200',
  Media: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Alta: 'bg-red-100 text-red-800 border-red-200',
}

const statusStyles = {
  Rascunho: 'bg-gray-100 text-gray-800 border-gray-200',
  Aprovado: 'bg-blue-100 text-blue-800 border-blue-200',
  Rejeitado: 'bg-orange-100 text-orange-800 border-orange-200',
  Implementado: 'bg-purple-100 text-purple-800 border-purple-200',
}

const parseJsonString = (jsonString: string | null): string[] => {
  if (!jsonString) return []
  try {
    const parsed = JSON.parse(jsonString)
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    console.error('Failed to parse JSON string:', error)
    return []
  }
}

export const AgentIdeaCard = ({ idea, onEdit }: AgentIdeaCardProps) => {
  const clientName =
    idea.ai_analyses?.opportunity_mappings?.client_name_on_mapping
  const department =
    idea.ai_analyses?.opportunity_mappings?.department_on_mapping
  const keyFeatures = parseJsonString(idea.key_features)
  const expectedBenefits = parseJsonString(idea.expected_benefits)

  return (
    <Card className="shadow-soft border-neutral-border flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-base bg-primary-500/10 flex items-center justify-center flex-shrink-0">
              <Bot className="w-5 h-5 text-primary-start" />
            </div>
            <div>
              <CardTitle className="text-base">{idea.agent_name}</CardTitle>
              {clientName && (
                <CardDescription className="text-xs mt-1 flex items-center gap-1.5">
                  <Briefcase className="w-3 h-3" />
                  {clientName} - {department}
                </CardDescription>
              )}
            </div>
          </div>
          <Badge
            className={cn(
              'text-xs font-medium rounded-pill px-2.5 py-1 border',
              complexityStyles[idea.complexity || 'Media'],
            )}
          >
            {idea.complexity}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <p className="text-sm text-neutral-textSecondary">{idea.description}</p>
        {keyFeatures.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-neutral-textSecondary mb-2 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-green-600" />
              Funcionalidades Chave
            </h4>
            <ul className="list-disc list-inside text-sm text-neutral-textSecondary space-y-1 pl-2">
              {keyFeatures.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
        )}
        {expectedBenefits.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold text-neutral-textSecondary mb-2 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-blue-600" />
              Benefícios Esperados
            </h4>
            <ul className="list-disc list-inside text-sm text-neutral-textSecondary space-y-1 pl-2">
              {expectedBenefits.map((benefit, i) => (
                <li key={i}>{benefit}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-neutral-textSecondary flex items-center justify-between gap-2 pt-4 border-t border-neutral-border">
        <div className="flex items-center gap-2">
          <BarChart className="w-3.5 h-3.5" />
          <span>Status:</span>
          <Badge
            className={cn(
              'text-xs font-medium rounded-md px-2 py-0.5 border',
              statusStyles[idea.status],
            )}
          >
            {idea.status}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onEdit(idea)}
        >
          <Edit className="w-4 h-4" />
          <span className="sr-only">Editar Ideia</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
