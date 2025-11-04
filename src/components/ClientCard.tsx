import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Building, Users, Eye, Rocket, Cog, Clover } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

export type Client = {
  name: string
  department: string
  leads: number
  status: 'Alto' | 'Médio' | 'Baixo'
  trend: 'Alta' | 'Média' | 'Baixa'
}

const statusStyles = {
  Alto: { bg: 'bg-[#EEF2FF]', text: 'text-[#3730A3]' },
  Médio: { bg: 'bg-[#EFF6FF]', text: 'text-[#1E40AF]' },
  Baixo: { bg: 'bg-[#ECFDF5]', text: 'text-[#065F46]' },
}

const trendInfo = {
  Alta: {
    icon: Rocket,
    text: 'Potencial Alta',
    style: 'text-status-high bg-blue-100',
  },
  Média: {
    icon: Cog,
    text: 'Potencial Média',
    style: 'text-status-medium bg-blue-50',
  },
  Baixa: {
    icon: Clover,
    text: 'Potencial Baixa',
    style: 'text-status-low bg-green-50',
  },
}

export const ClientCard = ({ client }: { client: Client }) => {
  const { name, department, leads, status, trend } = client
  const statusStyle = statusStyles[status]
  const TrendIcon = trendInfo[trend].icon

  return (
    <Card className="w-full max-w-[360px] min-w-[300px] shadow-soft border-neutral-border hover:shadow-card transition-shadow duration-200 flex flex-col">
      <CardContent className="p-4 flex-1">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-base bg-[#F3E8FF] flex items-center justify-center flex-shrink-0">
            <Building className="w-5 h-5 text-primary-start" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-semibold text-neutral-textPrimary">
                  {name}
                </h3>
                <p className="text-[13px] text-neutral-textSecondary">
                  {department}
                </p>
              </div>
              <Badge
                className={cn(
                  'text-xs font-medium rounded-pill px-2.5 py-1.5 whitespace-nowrap',
                  statusStyle.bg,
                  statusStyle.text,
                )}
              >
                Status {status}
              </Badge>
            </div>
            <div className="mt-3 flex items-center gap-2 text-[13px] text-neutral-textPrimary">
              <Users className="w-4 h-4 text-neutral-textSecondary" />
              <span>{leads} leads de projeto</span>
            </div>
          </div>
        </div>
      </CardContent>
      <div className="mt-auto p-4 pt-3 border-t border-neutral-border flex justify-between items-center">
        <div
          className={cn(
            'flex items-center gap-1.5 text-xs px-2 py-1 rounded-md font-medium',
            trendInfo[trend].style,
          )}
        >
          <TrendIcon className="w-3.5 h-3.5" />
          <span>{trendInfo[trend].text}</span>
        </div>
        <Link
          to="#"
          className="flex items-center gap-2 text-sm text-neutral-textSecondary hover:text-primary-start transition-colors"
        >
          <Eye className="w-4 h-4" />
          Ver detalhes
        </Link>
      </div>
    </Card>
  )
}
