'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Home, Database, Zap, Building2, RotateCcw } from 'lucide-react'

export function Navigation() {
  const pathname = usePathname()
  
  const navItems = [
    {
      href: '/',
      label: 'Home',
      icon: Home,
      description: 'Pagination Testing Dashboard'
    },
    {
      href: '/companies/simple-paginated',
      label: 'Simple Paginated',
      icon: Database,
      description: 'Custom Hook'
    },
    {
      href: '/companies/native',
      label: 'Native',
      icon: Zap,
      description: 'Built-in Hook'
    },
    {
      href: '/companies/stable-native',
      label: 'Stable + Native',
      icon: Zap,
      description: 'Anti-Flicker'
    },
    {
      href: '/companies/manual-pagination',
      label: 'Manual',
      icon: Building2,
      description: 'Direct Control'
    },
    {
      href: '/companies/nextprev-pagination',
      label: 'Next/Prev',
      icon: RotateCcw,
      description: 'State Machine'
    }
  ]

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Title */}
          <Link href="/" className="flex items-center space-x-2">
            <Database className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl text-gray-900 dark:text-white">
              Convex Pagination
            </span>
            <Badge variant="outline" className="text-xs">
              Testing
            </Badge>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || 
                (item.href === '/' && pathname === '/companies') ||
                (item.href !== '/' && pathname.startsWith(item.href))
              
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={`flex items-center gap-2 ${
                      isActive 
                        ? item.href === '/companies/stable-native' 
                          ? 'bg-emerald-600 hover:bg-emerald-700' 
                          : ''
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden lg:inline">{item.label}</span>
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button - Simple dropdown for mobile */}
          <div className="md:hidden">
            <select 
              className="border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-950 text-sm"
              value={pathname}
              onChange={(e) => {
                window.location.href = e.target.value
              }}
            >
              {navItems.map((item) => (
                <option key={item.href} value={item.href}>
                  {item.label} - {item.description}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  )
} 