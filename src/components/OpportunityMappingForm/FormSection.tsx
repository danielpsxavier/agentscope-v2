import { ReactNode } from 'react'

type FormSectionProps = {
  title: string
  description: string
  children: ReactNode
}

export const FormSection = ({
  title,
  description,
  children,
}: FormSectionProps) => (
  <div className="space-y-6 rounded-lg border border-neutral-border bg-neutral-cardBackground p-6 shadow-soft">
    <div>
      <h3 className="text-lg font-semibold text-neutral-textPrimary">
        {title}
      </h3>
      <p className="mt-1 text-sm text-neutral-textSecondary">{description}</p>
    </div>
    <div className="grid grid-cols-2 gap-6">{children}</div>
  </div>
)
