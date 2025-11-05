import { Plus, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

type HeaderProps = {
  title: string
  subtitle: string
  buttonText?: string
  onButtonClick?: () => void
  isButtonLoading?: boolean
  buttonIcon?: React.ElementType
}

export const Header = ({
  title,
  subtitle,
  buttonText,
  onButtonClick,
  isButtonLoading = false,
  buttonIcon: ButtonIcon = Plus,
}: HeaderProps) => {
  return (
    <header className="flex items-center justify-between h-[88px]">
      <div>
        <h1 className="text-[28px] font-bold text-neutral-textPrimary">
          {title}
        </h1>
        <p className="text-sm text-neutral-textSecondary">{subtitle}</p>
      </div>
      {buttonText && (
        <Button
          className="primary-btn flex items-center gap-2.5"
          onClick={onButtonClick}
          disabled={isButtonLoading}
        >
          {isButtonLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ButtonIcon className="w-4 h-4" />
          )}
          <span>{buttonText}</span>
        </Button>
      )}
    </header>
  )
}
