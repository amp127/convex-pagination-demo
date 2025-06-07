'use client'

import { useNextPrevPaginatedQuery } from '@/components/hooks/usePagePagination'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { debounce } from 'lodash'
import { Building2, Frown, Loader2, X, Database, Trash2, RefreshCw } from 'lucide-react'
import { ChevronDownIcon, ChevronLeft, ChevronRight, ChevronUpIcon, Plus } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import type { Doc, Id } from '../../../../convex/_generated/dataModel'

export default function CompaniesNextPrevPaginationPage() {
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all')
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [isAddingFakeData, setIsAddingFakeData] = useState(false)
  const [isRemovingAll, setIsRemovingAll] = useState(false)

  // Convex queries and mutations
  const createBulkMutation = useMutation(api.companies.createBulk)
  const removeAllMutation = useMutation(api.companies.removeAll)
  const deleteMutation = useMutation(api.companies.remove)
  const industries = useQuery(api.companies.getIndustries)
  const totalCompaniesCount = useQuery(api.companies.getCount)

  // Manual debounce implementation
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 300)
    return () => clearTimeout(timer)
  }, [search])

  // Use the NextPrev Paginated Query hook
  const paginationResult = useNextPrevPaginatedQuery(
    api.companies.listPaginatedWithSearch,
    {
      search: debouncedSearch,
      industry: selectedIndustry,
      order,
    },
    {
      initialNumItems: pageSize,
    }
  )

  // Fake data generator
  const generateFakeCompanies = useCallback((count = 20) => {
    const companyPrefixes = [
      'Tech', 'Data', 'Cloud', 'Quantum', 'Nexus', 'Alpha', 'Stellar', 'Cyber', 'Velocity', 'Prisma',
      'Zenith', 'Blue', 'Innova', 'Sky', 'Meta', 'Titan', 'Epsilon', 'Phoenix', 'Omega', 'Apex',
      'Digital', 'Smart', 'Future', 'Global', 'Prime', 'Elite', 'Advanced', 'Dynamic', 'Rapid', 'Ultra',
    ]

    const companyMiddles = [
      'Flow', 'Stream', 'Vision', 'Leap', 'Point', 'Wave', 'Bridge', 'Force', 'Drive', 'Rise',
      'Core', 'Print', 'Sphere', 'Link', 'Net', 'Hub', 'Lab', 'Works', 'Systems', 'Solutions',
    ]

    const companySuffixes = [
      'Solutions', 'Corp', 'Inc', 'Technologies', 'Systems', 'Dynamics', 'Innovations', 'Labs',
      'Networks', 'Analytics', 'Ventures', 'Co', 'Group', 'Industries', 'Services', 'Enterprises',
    ]

    const generateRandomCompanyName = () => {
      const useMiddle = Math.random() > 0.3
      const prefix = companyPrefixes[Math.floor(Math.random() * companyPrefixes.length)]
      const middle = useMiddle ? companyMiddles[Math.floor(Math.random() * companyMiddles.length)] : ''
      const suffix = companySuffixes[Math.floor(Math.random() * companySuffixes.length)]
      
      return useMiddle ? `${prefix}${middle} ${suffix}` : `${prefix} ${suffix}`
    }

    const industriesData = [
      'Technology', 'Healthcare', 'Finance', 'E-commerce', 'Manufacturing', 
      'Education', 'Real Estate', 'Transportation', 'Energy', 'Media',
    ]

    const subscriptionTiers = ['Free', 'Starter', 'Professional'] as const

    const generateWebsite = (companyName: string) => {
      const cleanName = companyName.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '')
        .substring(0, 15)
      const domains = ['.com', '.io', '.net', '.tech', '.co']
      return `${cleanName}${domains[Math.floor(Math.random() * domains.length)]}`
    }

    return Array.from({ length: count }, () => {
      const companyName = generateRandomCompanyName()
      const website = generateWebsite(companyName)
      
      return {
        companyName,
        industry: industriesData[Math.floor(Math.random() * industriesData.length)],
        subscriptionTier: subscriptionTiers[Math.floor(Math.random() * subscriptionTiers.length)],
        website: `https://${website}`,
        email: `contact@${website}`,
        phone: `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        address: `${Math.floor(Math.random() * 9999) + 1} Main St, City, ST ${Math.floor(Math.random() * 90000) + 10000}`,
        description: 'Leading provider of innovative technology solutions for modern businesses.'
      }
    })
  }, [])

  // Handle adding fake companies
  const handleAddFakeCompanies = useCallback(async () => {
    setIsAddingFakeData(true)
    try {
      const fakeCompanies = generateFakeCompanies(20)
      await createBulkMutation({ companies: fakeCompanies })
      toast.success('Successfully added 20 fake companies!')
    } catch (error) {
      console.error('Error adding fake companies:', error)
      toast.error('Failed to add fake companies. Please try again.')
    } finally {
      setIsAddingFakeData(false)
    }
  }, [createBulkMutation, generateFakeCompanies])

  // Handle adding single fake company
  const handleAddSingleFakeCompany = useCallback(async () => {
    setIsAddingFakeData(true)
    try {
      const fakeCompany = generateFakeCompanies(1)
      await createBulkMutation({ companies: fakeCompany })
      toast.success('Successfully added 1 fake company!')
    } catch (error) {
      console.error('Error adding fake company:', error)
      toast.error('Failed to add fake company. Please try again.')
    } finally {
      setIsAddingFakeData(false)
    }
  }, [createBulkMutation, generateFakeCompanies])

  // Handle removing all companies
  const handleRemoveAllCompanies = useCallback(async () => {
    if (!window.confirm('Are you sure you want to remove ALL companies? This action cannot be undone.')) {
      return
    }
    
    setIsRemovingAll(true)
    try {
      const result = await removeAllMutation({})
      toast.success(`Successfully removed ${result.deleted} companies!`)
    } catch (error) {
      console.error('Error removing all companies:', error)
      toast.error('Failed to remove companies. Please try again.')
    } finally {
      setIsRemovingAll(false)
    }
  }, [removeAllMutation])

  // Handle deleting a single company
  const handleDeleteCompany = useCallback(async (companyId: Id<'companies'>) => {
    try {
      await deleteMutation({ id: companyId })
      toast.success('Company deleted successfully!')
    } catch (error) {
      console.error('Error deleting company:', error)
      toast.error('Failed to delete company. Please try again.')
    }
  }, [deleteMutation])

  // Handle sorting
  const toggleSortOrder = useCallback(() => {
    setOrder(order === 'asc' ? 'desc' : 'asc')
  }, [order])

  // Handle industry filter change
  const handleIndustryChange = (value: string) => {
    setSelectedIndustry(value)
  }

  // Handle page size change
  const handlePageSizeChange = (value: string) => {
    setPageSize(Number.parseInt(value))
  }

  // Handle search change
  const handleSearchChange = (value: string) => {
    setSearch(value)
  }

  // Handle reset filters
  const handleResetFilters = () => {
    setSearch('')
    setSelectedIndustry('all')
    setOrder('asc')
  }

  // Create columns
  const columns: ColumnDef<Doc<'companies'>>[] = useMemo(
    () => [
      {
        accessorKey: 'companyName',
        header: () => (
          <Button
            variant="ghost"
            onClick={toggleSortOrder}
            className="flex items-center gap-1 px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
          >
            <span>Company Name</span>
            {order === 'asc' ? (
              <ChevronUpIcon className="h-4 w-4" />
            ) : (
              <ChevronDownIcon className="h-4 w-4" />
            )}
          </Button>
        ),
        cell: ({ row }) => {
          return (
            <div>
              <Button
                variant="outline"
                className="flex items-center gap-2 pl-0 pr-4 py-1"
              >
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center text-gray-500 dark:text-gray-400">
                  <Building2 className="w-7 h-7 text-blue-500" />
                </div>
                <span className="pl-1">{row.original.companyName}</span>
              </Button>
            </div>
          )
        },
      },
      {
        accessorKey: 'industry',
        header: 'Industry',
      },
      {
        accessorKey: 'subscriptionTier',
        header: 'Subscription',
        cell: ({ row }) => {
          const tier = row.original.subscriptionTier
          return (
            <Badge
              variant={tier === 'Free' ? 'outline' : tier === 'Starter' ? 'default' : 'secondary'}
              className={`${tier === 'Professional' ? 'bg-purple-600 hover:bg-purple-700' : ''}`}
            >
              {tier}
            </Badge>
          )
        },
      },
      {
        accessorKey: '_creationTime',
        header: 'Created',
        cell: ({ row }) => {
          return new Date(row.getValue('_creationTime')).toLocaleString()
        },
      },
      {
        id: 'actions',
        header() {
          return <div className="text-right">Actions</div>
        },
        cell: ({ row }) => {
          return (
            <div className="flex items-center justify-end gap-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteCompany(row.original._id as Id<'companies'>)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          )
        },
      },
    ],
    [order, handleDeleteCompany, toggleSortOrder]
  )

  // Get table data based on pagination result state
  const tableData = paginationResult._tag === 'Loaded' ? paginationResult.page : []

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
  })

  // Render state-specific loading indicators
  const renderStateIndicator = () => {
    switch (paginationResult._tag) {
      case 'LoadingInitialResults':
        return (
          <div className="flex items-center gap-2 text-blue-600">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Loading initial results...</span>
          </div>
        )
      case 'LoadingNextResults':
        return (
          <div className="flex items-center gap-2 text-blue-600">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Loading next page...</span>
          </div>
        )
      case 'LoadingPrevResults':
        return (
          <div className="flex items-center gap-2 text-blue-600">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Loading previous page...</span>
          </div>
        )
      case 'Loaded':
        return (
          <div className="flex items-center gap-2 text-green-600">
            <span>Page {paginationResult.pageNum} loaded ({paginationResult.page.length} companies)</span>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8" style={{ pointerEvents: 'auto' }}>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <Link
            href="/companies"
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors cursor-pointer group"
          >
            <ChevronLeft
              className="w-4 h-4 mr-1 group-hover:transform group-hover:-translate-x-1 transition-transform"
              aria-hidden="true"
              aria-label="Previous page"
            />
            Back to Companies
          </Link>
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white cursor-default">
              Companies (Next/Prev Pagination)
            </h1>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="secondary" className="text-sm">
                Total Companies: {totalCompaniesCount ?? 0}
              </Badge>
              <Badge variant="outline" className="text-sm">
                Using useNextPrevPaginatedQuery
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            onClick={handleAddSingleFakeCompany}
            disabled={isAddingFakeData}
            variant="outline"
            className="flex items-center gap-2"
          >
            {isAddingFakeData ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            {isAddingFakeData ? 'Adding...' : 'Add 1 Company'}
          </Button>
          <Button 
            onClick={handleAddFakeCompanies}
            disabled={isAddingFakeData}
            variant="outline"
            className="flex items-center gap-2"
          >
            {isAddingFakeData ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Database className="h-4 w-4" />
            )}
            {isAddingFakeData ? 'Adding...' : 'Add 20 Fake Companies'}
          </Button>
          <Button 
            onClick={handleRemoveAllCompanies}
            disabled={isRemovingAll}
            variant="destructive"
            className="flex items-center gap-2"
          >
            {isRemovingAll ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <X className="h-4 w-4" />
            )}
            {isRemovingAll ? 'Removing...' : 'Remove All Companies'}
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* State Indicator */}
        <div className="px-5 py-3 border-b border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-blue-900/20">
          {renderStateIndicator()}
        </div>

        {/* Controls */}
        <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Input
                placeholder="Search companies..."
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full sm:w-64"
              />
              
              <Select value={selectedIndustry} onValueChange={handleIndustryChange}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Filter by industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  {industries?.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={pageSize.toString()} onValueChange={handlePageSizeChange}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 per page</SelectItem>
                  <SelectItem value="10">10 per page</SelectItem>
                  <SelectItem value="20">20 per page</SelectItem>
                  <SelectItem value="50">50 per page</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(search || selectedIndustry !== 'all' || order !== 'asc') && (
              <Button
                variant="outline"
                onClick={handleResetFilters}
                size="sm"
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                <X className="w-4 h-4 mr-2" />
                Reset All Filters
              </Button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="p-0">
          {paginationResult._tag === 'LoadingInitialResults' ? (
            <div className="flex justify-center items-center h-64 text-gray-500">
              <div className="flex flex-col items-center">
                <Loader2 className="animate-spin h-8 w-8 text-blue-600 mb-2" />
                <span>Loading initial results...</span>
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                      className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className={`py-4 px-4 ${cell.column.id === 'actions' ? 'text-right' : ''}`}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-32 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <Frown className="w-12 h-12 text-gray-400" />
                        <div>
                          {debouncedSearch.trim()
                            ? 'No companies found matching your search.'
                            : 'No companies found. Create your first company!'}
                        </div>
                        {debouncedSearch.trim() && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleResetFilters}
                            className="text-blue-600 border-blue-600 hover:bg-blue-50"
                          >
                            Reset Search
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>

        {/* Enhanced Pagination with state awareness */}
        <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-5 py-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {paginationResult._tag === 'Loaded' && (
              <span>
                Page {paginationResult.pageNum} ({paginationResult.page.length} companies)
              </span>
            )}
            {(paginationResult._tag === 'LoadingNextResults' || paginationResult._tag === 'LoadingPrevResults') && (
              <span>Loading...</span>
            )}
          </div>
          
          <div className="flex gap-2">
            {paginationResult._tag === 'Loaded' && (
              <>
                <Button
                  variant="outline"
                  onClick={paginationResult.loadPrev || undefined}
                  disabled={!paginationResult.loadPrev}
                  size="sm"
                  className="flex items-center"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={paginationResult.loadNext || undefined}
                  disabled={!paginationResult.loadNext}
                  size="sm"
                  className="flex items-center"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </>
            )}
            
            {paginationResult._tag === 'LoadingNextResults' && (
              <Button disabled variant="outline" size="sm" className="flex items-center">
                <Loader2 className="w-4 h-4 animate-spin mr-1" />
                Loading Next...
              </Button>
            )}
            
            {paginationResult._tag === 'LoadingPrevResults' && (
              <Button disabled variant="outline" size="sm" className="flex items-center">
                <Loader2 className="w-4 h-4 animate-spin mr-1" />
                Loading Previous...
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 