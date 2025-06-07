'use client'

import { useSimplePaginatedQuery } from '@/components/hooks/useSimplePaginatedQuery'
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
import { Building2, CheckCircle, Frown, Loader2, X, Database, Trash2 } from 'lucide-react'
import { ChevronDownIcon, ChevronLeft, ChevronRight, ChevronUpIcon, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import type { Doc, Id } from '../../../../convex/_generated/dataModel'


type ModalState = {
  isOpen: boolean
  mode: 'add' | 'edit' | 'view'
  company?: Doc<'companies'>
  companyId?: Id<'companies'>
}

export default function CompaniesSimplePaginatedPage() {
  const [pageSize, setPageSize] = useState(10)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState<string>('all')
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [recentlyEditedCompanyId, setRecentlyEditedCompanyId] = useState<string | null>(null)
  const [isAddingFakeData, setIsAddingFakeData] = useState(false)
  const [isRemovingAll, setIsRemovingAll] = useState(false)

  // Convex queries and mutations
  const createBulkMutation = useMutation(api.companies.createBulk)
  const removeAllMutation = useMutation(api.companies.removeAll)
  const deleteMutation = useMutation(api.companies.remove)
  const industries = useQuery(api.companies.getIndustries)
  const totalCompaniesCount = useQuery(api.companies.getCount)

  // Single modal state
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    mode: 'add',
  })


  // Fake data generator
  const generateFakeCompanies = useCallback((count = 20) => {
    const companyPrefixes = [
      'Tech', 'Data', 'Cloud', 'Quantum', 'Nexus', 'Alpha', 'Stellar', 'Cyber', 'Velocity', 'Prisma',
      'Zenith', 'Blue', 'Innova', 'Sky', 'Meta', 'Titan', 'Epsilon', 'Phoenix', 'Omega', 'Apex',
      'Digital', 'Smart', 'Future', 'Global', 'Prime', 'Elite', 'Advanced', 'Dynamic', 'Rapid', 'Ultra',
      'Mega', 'Super', 'Hyper', 'Turbo', 'Nano', 'Micro', 'Macro', 'Pro', 'Max', 'Next', 'Swift',
      'Bright', 'Sharp', 'Clear', 'Pure', 'Core', 'Edge', 'Peak', 'Summit', 'Vertex', 'Fusion'
    ]

    const companyMiddles = [
      'Flow', 'Stream', 'Vision', 'Leap', 'Point', 'Wave', 'Bridge', 'Force', 'Drive', 'Rise',
      'Core', 'Print', 'Sphere', 'Link', 'Net', 'Hub', 'Lab', 'Works', 'Systems', 'Solutions',
      'Dynamics', 'Analytics', 'Innovations', 'Ventures', 'Technologies', 'Networks', 'Forge',
      'Mind', 'Spark', 'Bolt', 'Flash', 'Storm', 'Fire', 'Ice', 'Wind', 'Earth', 'Space', 'Time',
      'Logic', 'Code', 'Byte', 'Pixel', 'Matrix', 'Vector', 'Signal', 'Circuit', 'Engine', 'Grid'
    ]

    const companySuffixes = [
      'Solutions', 'Corp', 'Inc', 'Technologies', 'Systems', 'Dynamics', 'Innovations', 'Labs',
      'Networks', 'Analytics', 'Ventures', 'Co', 'Group', 'Industries', 'Services', 'Enterprises',
      'International', 'Global', 'Worldwide', 'Partners', 'Associates', 'Consulting', 'Studio',
      'Agency', 'Collective', 'Alliance', 'Consortium', 'Federation', 'Union', 'League', 'Guild'
    ]

    const generateRandomCompanyName = () => {
      const useMiddle = Math.random() > 0.3 // 70% chance to include middle part
      const prefix = companyPrefixes[Math.floor(Math.random() * companyPrefixes.length)]
      const middle = useMiddle ? companyMiddles[Math.floor(Math.random() * companyMiddles.length)] : ''
      const suffix = companySuffixes[Math.floor(Math.random() * companySuffixes.length)]
      
      return useMiddle ? `${prefix}${middle} ${suffix}` : `${prefix} ${suffix}`
    }

    const industries = [
      'Technology', 'Healthcare', 'Finance', 'E-commerce', 'Manufacturing', 
      'Education', 'Real Estate', 'Transportation', 'Energy', 'Media',
      'Telecommunications', 'Retail', 'Consulting', 'Agriculture', 'Automotive'
    ]

    const subscriptionTiers = ['Free', 'Starter', 'Professional'] as const

    const generateWebsite = (companyName: string) => {
      const cleanName = companyName.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '')
        .substring(0, 15)
      const domains = ['.com', '.io', '.net', '.tech', '.co', '.dev', '.app', '.ai']
      return `${cleanName}${domains[Math.floor(Math.random() * domains.length)]}`
    }

    const descriptions = [
      'Leading provider of innovative technology solutions for modern businesses.',
      'Transforming data into actionable insights through advanced analytics.',
      'Cloud-first solutions designed to accelerate digital transformation.',
      'Pioneering quantum computing applications for enterprise solutions.',
      'Connecting businesses through seamless network infrastructure.',
      'Driving innovation through cutting-edge software development.',
      'Stellar customer experiences powered by emerging technologies.',
      'Cybersecurity solutions built for the digital age.',
      'High-velocity networking solutions for enterprise customers.',
      'Advanced analytics platform for data-driven decision making.',
      'Revolutionizing industry standards through disruptive innovation.',
      'Empowering businesses with next-generation digital platforms.',
      'Building the future of work through intelligent automation.',
      'Creating sustainable solutions for tomorrow\'s challenges.',
      'Delivering world-class services with cutting-edge expertise.'
    ]

    return Array.from({ length: count }, () => {
      const companyName = generateRandomCompanyName()
      const website = generateWebsite(companyName)
      
      return {
        companyName,
        industry: industries[Math.floor(Math.random() * industries.length)],
        subscriptionTier: subscriptionTiers[Math.floor(Math.random() * subscriptionTiers.length)],
        website: `https://${website}`,
        email: `contact@${website}`,
        phone: `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        address: `${Math.floor(Math.random() * 9999) + 1} ${['Main St', 'Oak Ave', 'Pine Rd', 'Tech Blvd', 'Innovation Way'][Math.floor(Math.random() * 5)]}, ${['San Francisco', 'New York', 'Austin', 'Seattle', 'Boston'][Math.floor(Math.random() * 5)]}, ${['CA', 'NY', 'TX', 'WA', 'MA'][Math.floor(Math.random() * 5)]} ${Math.floor(Math.random() * 90000) + 10000}`,
        description: descriptions[Math.floor(Math.random() * descriptions.length)]
      }
    })
  }, [])

  // this is very important
  const fallbackData = useMemo(
    () => [
      {
        companyName: 'Loading',
        industry: 'Loading',
        subscriptionTier: 'Free',
        _creationTime: 1722715191074.58,
        _id: 'j57cvkhfqz7kxzjden4f3khpcn6y41jn',
      },
    ],
    []
  )

  const companies = useSimplePaginatedQuery(
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

  // Handle industry filter change
  const handleIndustryChange = useCallback((value: string) => {
    setSelectedIndustry(value)
    setTimeout(() => {
      if (typeof companies.setPageSize === 'function') {
        companies.setPageSize(companies.pageSize)
        if (companies.args && typeof companies.args === 'object' && companies.args !== 'skip') {
          (companies.args as any).industry = value
        }
      }
    }, 100)
  }, [companies])

  // Handle adding fake companies
  const handleAddFakeCompanies = useCallback(async () => {
    setIsAddingFakeData(true)
    try {
      const fakeCompanies = generateFakeCompanies(20)
      await createBulkMutation({ companies: fakeCompanies })
      toast.success('Successfully added 20 fake companies!')
      
      // Refresh the table
      setTimeout(() => {
        if (typeof companies.setPageSize === 'function') {
          companies.setPageSize(companies.pageSize)
        }
      }, 500)
      
    } catch (error) {
      console.error('Error adding fake companies:', error)
      toast.error('Failed to add fake companies. Please try again.')
    } finally {
      setIsAddingFakeData(false)
    }
  }, [createBulkMutation, companies, generateFakeCompanies])

  // Handle adding single fake company
  const handleAddSingleFakeCompany = useCallback(async () => {
    setIsAddingFakeData(true)
    try {
      const fakeCompany = generateFakeCompanies(1)
      await createBulkMutation({ companies: fakeCompany })
      toast.success('Successfully added 1 fake company!')
      
      // Refresh the table
      setTimeout(() => {
        if (typeof companies.setPageSize === 'function') {
          companies.setPageSize(companies.pageSize)
        }
      }, 500)
      
    } catch (error) {
      console.error('Error adding fake company:', error)
      toast.error('Failed to add fake company. Please try again.')
    } finally {
      setIsAddingFakeData(false)
    }
  }, [createBulkMutation, companies, generateFakeCompanies])

  // Handle removing all companies
  const handleRemoveAllCompanies = useCallback(async () => {
    if (!window.confirm('Are you sure you want to remove ALL companies? This action cannot be undone.')) {
      return
    }
    
    setIsRemovingAll(true)
    try {
      const result = await removeAllMutation({})
      toast.success(`Successfully removed ${result.deleted} companies!`)
      
      // Refresh the table
      setTimeout(() => {
        if (typeof companies.setPageSize === 'function') {
          companies.setPageSize(companies.pageSize)
        }
      }, 333)
      
    } catch (error) {
      console.error('Error removing all companies:', error)
      toast.error('Failed to remove companies. Please try again.')
    } finally {
      setIsRemovingAll(false)
    }
  }, [removeAllMutation, companies])

  // Handle deleting a single company
  const handleDeleteCompany = useCallback(async (companyId: Id<'companies'>) => {
    try {
      await deleteMutation({ id: companyId })
      toast.success('Company deleted successfully!')
      
      // Refresh the table
      setTimeout(() => {
        if (typeof companies.setPageSize === 'function') {
          companies.setPageSize(companies.pageSize)
        }
      }, 333)
      
    } catch (error) {
      console.error('Error deleting company:', error)
      toast.error('Failed to delete company. Please try again.')
    }
  }, [deleteMutation, companies])

  // Update database query when search changes (with debounce)
  const updateDatabaseSearch = useMemo(
    () =>
      debounce((value: string) => {
        // Only reset page size when there's an actual search value
        // This allows companies to load by default without requiring a search
        if (value) {
          companies.setPageSize(companies.pageSize)
        }

        if (companies.args && typeof companies.args === 'object' && companies.args !== 'skip') {
          (companies.args as any).search = value
        }
      }, 250),
    [companies]
  )


  // Trigger database search when search state changes
  useEffect(() => {
    updateDatabaseSearch(search)
  }, [search, updateDatabaseSearch])

  const tableData =
    companies.status === 'loaded' && companies.currentResults
      ? companies.currentResults.page
      : fallbackData

  // Create columns with the refresh function
  const columns: ColumnDef<Doc<'companies'>>[] = useMemo(
    () => [
      {
        accessorKey: 'companyName',
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => {
                try {
                  // Toggle the order
                  const newOrder = order === 'asc' ? 'desc' : 'asc'

                  // Update local state first
                  setOrder(newOrder)

                  // Defer the update to avoid race conditions
                  setTimeout(() => {
                    if (typeof companies.setPageSize === 'function') {
                      companies.setPageSize(companies.pageSize)
                    }
                  }, 100)
                } catch (error) {
                  console.error('Error updating sort order:', error)
                }
              }}
              className="flex items-center gap-1 px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
            >
              <span>Company Name</span>
              {order === 'asc' ? (
                <ChevronUpIcon className="h-4 w-4" />
              ) : (
                <ChevronDownIcon className="h-4 w-4" />
              )}
            </Button>
          )
        },
        cell: ({ row }) => {
          const logoUrl = row.original.logoUrl
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
    [order, companies, handleDeleteCompany]
  )

  const table = useReactTable({
    columns,
    data: tableData as Doc<'companies'>[],
    getCoreRowModel: getCoreRowModel(),
  })

  const isLoading = ['loading', 'loadingNext', 'loadingPrev'].includes(companies.status)

  const isLastPage =
    companies.status === 'loaded' &&
    (companies.currentResults?.page.length < companies.pageSize || !companies.nextCursor)

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
              Companies (Custom Pagination)
            </h1>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="secondary" className="text-sm">
                Total Companies: {totalCompaniesCount ?? 0}
              </Badge>
              <Badge variant="outline" className="text-sm">
                Using useSimplePaginatedQuery
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/companies/native">
            <Button variant="secondary" className="flex items-center gap-2">
              View Native Pagination
            </Button>
          </Link>
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
        {/* Table Controls */}
        <div className="p-5 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
            <div className="flex flex-wrap md:flex-nowrap items-center gap-4 w-full md:w-auto">
              <Input
                type="search"
                placeholder="Search companies..."
                value={search}
                onChange={(e) => {
                  const value = e.target.value
                  setSearch(value) // Update UI immediately
                }}
                onInput={(e) => {
                  const value = (e.target as HTMLInputElement).value
                  if (value === '' && search !== '') {
                    setSearch('') // Clear the search state
                    companies.setPageSize(pageSize)
                  }
                }}
                className="w-full md:w-[300px]"
              />
              
              <Select value={selectedIndustry} onValueChange={handleIndustryChange}>
                <SelectTrigger className="w-full md:w-[200px]">
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
            </div>
            
            {(search || selectedIndustry !== 'all') && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearch('') // Clear the search text
                  setSelectedIndustry('all') // Reset industry filter
                  if (companies.args && typeof companies.args === 'object' && companies.args !== 'skip') {
                    (companies.args as any).search = ''
                  }
                  companies.setPageSize(companies.pageSize)
                }}
              >
                <X className="w-4 h-4 mr-2" aria-hidden="true" aria-label="Clear filters" />
                Reset Filters
              </Button>
            )}

            <div className="flex items-center gap-3 ml-auto">
              <Select
                value={pageSize.toString()}
                onValueChange={(value) => {
                  try {
                    const newSize = Number.parseInt(value, 10)
                    setPageSize(newSize)

                    setTimeout(() => {
                      if (typeof companies.setPageSize === 'function') {
                        companies.setPageSize(newSize)
                      }
                    }, 100)
                  } catch (error) {
                    console.error('Error updating page size:', error)
                  }
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Page size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 results per page</SelectItem>
                  <SelectItem value="10">10 results per page</SelectItem>
                  <SelectItem value="15">15 results per page</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="p-0">
          {isLoading ? (
            <div className="flex justify-center items-center h-164 text-gray-500">
              <div className="flex flex-col items-center">
                <Loader2 className="animate-spin h-8 w-8 text-blue-600 mb-2" />
                <span>Loading companies...</span>
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="bg-gray-50 dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-900"
                  >
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="py-2 px-4 font-semibold text-gray-700 dark:text-gray-300 border-b-2 border-gray-200 dark:border-gray-700"
                      >
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
                    <tr
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                      className={`border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${
                        recentlyEditedCompanyId === row.original._id
                          ? 'bg-blue-50 dark:bg-blue-900/20 animate-out'
                          : ''
                      }`}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className={`py-4 px-4 ${cell.column.id === 'actions' ? 'text-right' : ''} relative`}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          {recentlyEditedCompanyId === row.original._id &&
                            cell.column.id === 'companyName' && (
                              <div className="absolute right-0 top-1/2 -translate-y-1/2 mr-2">
                                <span className="text-blue-600 flex items-center gap-1">
                                  <CheckCircle className="animate-spin h-4 w-4 inline-block" />
                                  <span>Saved...</span>
                                </span>
                              </div>
                            )}
                        </TableCell>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <TableCell
                      colSpan={columns.length}
                      className="h-32 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center justify-center py-8">
                        <Frown
                          className="w-12 h-12 text-gray-400 mb-3"
                          aria-hidden="true"
                          aria-label="No results found"
                        />
                        <p>No companies found.</p>
                        <p className="text-sm mt-1">Try adjusting your search criteria.</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-4"
                          onClick={() => {
                            setSearch('')
                            setSelectedIndustry('all')
                          }}
                        >
                          <X
                            className="w-4 h-4 mr-2"
                            aria-hidden="true"
                            aria-label="Clear search"
                          />
                          Reset Search
                        </Button>
                      </div>
                    </TableCell>
                  </tr>
                )}
              </TableBody>
            </Table>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-5 py-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {table.getRowModel().rows?.length > 0 && (
              <span>
                Showing page {companies.currentPageNum} ({table.getRowModel().rows.length}{' '}
                companies)
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {companies.status === 'loaded' && (
              <Button
                onClick={companies.loadPrev ? companies.loadPrev : undefined}
                disabled={!companies.currentCursor}
                variant="outline"
                size="sm"
                className="flex items-center"
              >
                <ChevronLeft
                  className="w-4 h-4 mr-1"
                  aria-hidden="true"
                  aria-label="Previous page"
                />
                Previous
              </Button>
            )}
            {companies.status === 'loaded' && !isLastPage && (
              <Button
                onClick={companies.loadNext ? companies.loadNext : undefined}
                disabled={!companies.nextCursor}
                variant="outline"
                size="sm"
                className="flex items-center"
              >
                Next
                <ChevronRight
                  className="w-4 h-4 ml-1"
                  aria-hidden="true"
                  aria-label="Next page"
                />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 