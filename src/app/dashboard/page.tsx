'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Building2 } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/companies">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-center space-x-4">
                <Building2 className="w-12 h-12 text-blue-500" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Companies
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Manage company information
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
} 