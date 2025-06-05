import type { ReactNode } from 'react'

interface SuperAdminPageProps {
  children: ReactNode
}

export function SuperAdminPage({ children }: SuperAdminPageProps) {
  return <div className="min-h-screen bg-gray-50 dark:bg-gray-900">{children}</div>
} 