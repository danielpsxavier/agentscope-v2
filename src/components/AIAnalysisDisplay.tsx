import { AIAnalysis } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Lightbulb, CheckCircle, BarChart, Zap, Tag } from 'lucide-react'

interface AIAnalysisDisplayProps {
  analysis: AIAnalysis
}

const complexityStyles = {
  Baixa: 'bg-green-100 text-green-800',
  Média: 'bg-yellow-100 text-yellow-800',
  Alta: 'bg-red-100 text-red-800',
}

export const AIAnalysisDisplay = ({ analysis }: AIAnalysisDisplayProps) => {
  return (
    <div className="space-y-6">
      <Card className="bg-neutral-muted border-neutral-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-h3">
            <BarChart className="h-5 w-5 text-primary" />
            Análise Geral
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            <h4 className="font-semibold text-neutral-textPrimary">
              Nível de Maturidade
            </h4>
            <p className="text-neutral-textSecondary">
              {analysis.analise_geral.nivel_maturidade}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-textPrimary">
              Principais Dores
            </h4>
            <ul className="list-disc list-inside text-neutral-textSecondary">
              {analysis.analise_geral.principais_dores.map((pain, index) => (
                <li key={index}>{pain}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-neutral-textPrimary">
              Potencial de Impacto
            </h4>
            <p className="text-neutral-textSecondary">
              {analysis.analise_geral.potencial_impacto}
            </p>
          </div>
        </CardContent>
      </Card>

      <div>
        <h3 className="text-h3 font-semibold text-neutral-textPrimary mb-4 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          Ideias de Agentes (Leads de Projeto)
        </h3>
        <Accordion type="single" collapsible className="w-full space-y-3">
          {analysis.ideias_de_agents.map((idea, index) => (
            <AccordionItem
              value={`item-${index}`}
              key={index}
              className="border border-neutral-border rounded-lg bg-white"
            >
              <AccordionTrigger className="px-4 py-3 text-base font-semibold hover:no-underline">
                <div className="flex items-center gap-4 w-full">
                  <div className="p-2 bg-primary-500/10 rounded-md">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <span className="flex-1 text-left">{idea.nome_agente}</span>
                  <Badge
                    className={complexityStyles[idea.complexidade_estimada]}
                  >
                    {idea.complexidade_estimada}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 space-y-4">
                <p className="text-sm text-neutral-textSecondary">
                  {idea.descricao}
                </p>
                <div>
                  <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Funcionalidades Chave
                  </h5>
                  <ul className="list-disc list-inside text-sm text-neutral-textSecondary space-y-1">
                    {idea.funcionalidades_chave.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Tag className="h-4 w-4 text-blue-600" />
                    Benefícios Esperados
                  </h5>
                  <ul className="list-disc list-inside text-sm text-neutral-textSecondary space-y-1">
                    {idea.beneficios_esperados.map((benefit, i) => (
                      <li key={i}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
