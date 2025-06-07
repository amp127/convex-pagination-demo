'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, Database, Zap, ChevronLeft, ChevronRight, ArrowRight, RotateCcw } from 'lucide-react'
import Link from 'next/link'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'

export default function CompaniesIndexPage() {
  const totalCompaniesCount = useQuery(api.companies.getCount)

  return (
    <div className="container mx-auto px-4 py-8" style={{ pointerEvents: 'auto' }}>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard"
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors cursor-pointer group"
          >
            <ChevronLeft
              className="w-4 h-4 mr-1 group-hover:transform group-hover:-translate-x-1 transition-transform"
              aria-hidden="true"
              aria-label="Previous page"
            />
            Back to Dashboard
          </Link>
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white cursor-default">
              Pagination Testing
            </h1>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="secondary" className="text-sm">
                Total Companies: {totalCompaniesCount ?? 0}
              </Badge>
              <Badge variant="outline" className="text-sm">
                Pagination Testing
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-8xl mx-auto">
        {/* Custom Pagination Card */}
        <Card className="hover:shadow-lg transition-shadow duration-200 border-2 hover:border-blue-200 dark:hover:border-blue-800">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-blue-100 dark:bg-blue-900 rounded-full w-fit">
              <Database className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-xl">Simple Paginated Query</CardTitle>
            <CardDescription className="text-center">
              Advanced pagination with custom useSimplePaginatedQuery hook by @Hmza
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">Features:</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Previous/Next navigation</li>
                <li>• Dynamic page size selection</li>
                <li>• Advanced state management</li>
                <li>• Custom cursor handling</li>
                <li>• Complex refresh logic</li>
              </ul>
            </div>
            <div className="pt-2">
              <Link href="/companies/simple-paginated" className="block">
                <Button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700">
                  View Simple Pagination
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Native Pagination Card */}
        <Card className="hover:shadow-lg transition-shadow duration-200 border-2 hover:border-green-200 dark:hover:border-green-800">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-green-100 dark:bg-green-900 rounded-full w-fit">
              <Zap className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-xl">Native Pagination</CardTitle>
            <CardDescription className="text-center">
              Simple pagination using Convex&apos;s built-in usePaginatedQuery by Convex
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">Features:</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Load More button pattern</li>
                <li>• Built-in loading states</li>
                <li>• Automatic query management</li>
                <li>• Simplified API</li>
                <li>• Clean state handling</li>
              </ul>
            </div>
            <div className="pt-2">
              <Link href="/companies/native" className="block">
                <Button className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700">
                  View Native Pagination
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Stable + Native Pagination Card */}
        <Card className="hover:shadow-lg transition-shadow duration-200 border-2 hover:border-emerald-200 dark:hover:border-emerald-800">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-emerald-100 dark:bg-emerald-900 rounded-full w-fit">
              <Zap className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
            </div>
            <CardTitle className="text-xl">Stable + Native Pagination</CardTitle>
            <CardDescription className="text-center">
              Anti-flicker pagination using custom useStablePaginatedQuery wrapper
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">Features:</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Prevents table flicker</li>
                <li>• Stable data during reloads</li>
                <li>• Load More button pattern</li>
                <li>• Smooth user experience</li>
                <li>• Built-in optimization</li>
              </ul>
            </div>
            <div className="pt-2">
              <Link href="/companies/stable-native" className="block">
                <Button className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700">
                  View Stable Pagination
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Manual Pagination Card */}
        <Card className="hover:shadow-lg transition-shadow duration-200 border-2 hover:border-purple-200 dark:hover:border-purple-800">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-purple-100 dark:bg-purple-900 rounded-full w-fit">
              <Building2 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <CardTitle className="text-xl">Manual Pagination</CardTitle>
            <CardDescription className="text-center">
              Manual cursor management using useQuery with conditional queries by chef.convex.dev
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">Features:</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Manual cursor state management</li>
                <li>• Conditional query execution</li>
                <li>• Previous/Next navigation</li>
                <li>• Manual filter reset logic</li>
                <li>• Direct useQuery control</li>
              </ul>
            </div>
            <div className="pt-2">
              <Link href="/companies/manual-pagination" className="block">
                <Button className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700">
                  View Manual Pagination
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Next/Prev Pagination Card */}
        <Card className="hover:shadow-lg transition-shadow duration-200 border-2 hover:border-orange-200 dark:hover:border-orange-800">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 p-3 bg-orange-100 dark:bg-orange-900 rounded-full w-fit">
              <RotateCcw className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <CardTitle className="text-xl">Next/Prev Pagination</CardTitle>
            <CardDescription className="text-center">
              Advanced state management with useNextPrevPaginatedQuery by @RJ
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm text-gray-700 dark:text-gray-300">Features:</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Discriminated union states</li>
                <li>• Reducer-based state management</li>
                <li>• Bidirectional navigation</li>
                <li>• Page number tracking</li>
                <li>• Advanced loading states</li>
              </ul>
            </div>
            <div className="pt-2">
              <Link href="/companies/nextprev-pagination" className="block">
                <Button className="w-full flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700">
                  View Next/Prev Pagination
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Comparison Section */}
      <div className="mt-12 max-w-4xl mx-auto">
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Pagination Comparison
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            <div>
              <h3 className="font-medium text-blue-700 dark:text-blue-400 mb-2">Custom Hook Benefits</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Full control over pagination UI</li>
                <li>• Bidirectional navigation</li>
                <li>• Page size customization</li>
                <li>• Advanced error handling</li>
                <li>• Complex state synchronization</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-green-700 dark:text-green-400 mb-2">Native Hook Benefits</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Less code to maintain</li>
                <li>• Optimal performance</li>
                <li>• Built-in best practices</li>
                <li>• Automatic optimization</li>
                <li>• Simpler debugging</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-emerald-700 dark:text-emerald-400 mb-2">Stable + Native Benefits</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Prevents UI flicker</li>
                <li>• Maintains stable data</li>
                <li>• Smoother user experience</li>
                <li>• Optimized rerendering</li>
                <li>• Best of both worlds</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-purple-700 dark:text-purple-400 mb-2">Manual Pagination Benefits</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Direct query control</li>
                <li>• Conditional query execution</li>
                <li>• Explicit state management</li>
                <li>• Custom debounce logic</li>
                <li>• Fine-grained performance tuning</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-orange-700 dark:text-orange-400 mb-2">Next/Prev Hook Benefits</h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Robust state management</li>
                <li>• Predictable state transitions</li>
                <li>• Page number tracking</li>
                <li>• Comprehensive loading states</li>
                <li>• Type-safe discriminated unions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 