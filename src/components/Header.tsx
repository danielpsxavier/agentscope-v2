import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

type HeaderProps = {
  title: string
  subtitle: string
  buttonText: string
  onButtonClick?: () => void
}

export const Header = ({
  title,
  subtitle,
  buttonText,
  onButtonClick,
}: HeaderProps) => {
  return (
    <header className="flex items-center justify-between h-[88px]">
      <div>
        <h1 className="text-[28px] font-bold text-neutral-textPrimary">
          {title}
        </h1>
        <p className="text-sm text-neutral-textSecondary">{subtitle}</p>
      </div>
      <Button
        className="primary-btn flex items-center gap-2.5"
        onClick={onButtonClick}
      >
        <Plus className="w-4 h-4" />
        <span>{buttonText}</span>
      </Button>
    </header>
  )
}
