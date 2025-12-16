import { cn } from '@/lib/utils/helpers'
import type { ReactNode } from 'react'

interface EditorPanelContainerProps {
  children: ReactNode
  className?: string
}

export const EditorPanelContainer = ({ children, className }: EditorPanelContainerProps) => {
  return <div className={cn('flex flex-col', className)}>{children}</div>
}

