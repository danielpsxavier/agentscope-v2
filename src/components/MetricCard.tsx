import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

type MetricCardProps = {
  title: string
  value: string
  trend: string
  trendColor?: string
  icon: ReactNode
}

export const MetricCard = ({
  title,
  value,
  trend,
  trendColor = 'text-primary-500',
  icon,
}: MetricCardProps) => {
  return (
    <Card
      className="min-h-[96px] shadow-card border-neutral-border"
      style={{
        background:
          'linear-gradient(180deg, rgba(139,92,246,0.04) 0%, rgba(243,244,246,0.5) 100%)',
      }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-[18px]">
        <CardTitle className="text-[13px] font-normal text-neutral-textSecondary">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="p-[18px] pt-0">
        <div className="text-[28px] font-bold text-neutral-textPrimary">
          {value}
        </div>
        <p className={cn('text-xs text-muted-foreground', trendColor)}>
          {trend}
        </p>
      </CardContent>
    </Card>
  )
}
