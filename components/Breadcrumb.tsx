'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const pathname = usePathname()

  // Auto-generate breadcrumbs if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/' }
    ]

    let currentPath = ''
    paths.forEach((path) => {
      currentPath += `/${path}`
      
      // Create human-readable labels
      let label = path
        .replace(/-/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .toLowerCase()
        .replace(/\b\w/g, l => l.toUpperCase())

      // Special cases for known pages
      const labelMap: { [key: string]: string } = {
        'ai-readiness': 'AI Readiness Assessment',
        'ai-axcelerate': 'AI aXcelerate',
        'use-cases': 'Case History',
        'ai-consultant': 'AI Consultant',
        'private-equity': 'Private Equity',
        'partner': 'Partner',
      }

      if (labelMap[path]) {
        label = labelMap[path]
      }

      breadcrumbs.push({
        label,
        href: currentPath
      })
    })

    return breadcrumbs
  }

  const breadcrumbs = items || generateBreadcrumbs()

  // Don't show breadcrumbs on homepage
  if (pathname === '/') return null

  return (
    <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-200">
      <div className="container-width">
        <ol className="flex items-center space-x-2 py-4 text-sm">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1

            return (
              <li key={item.href} className="flex items-center">
                {index > 0 && (
                  <svg
                    className="w-4 h-4 text-gray-400 mx-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
                
                {isLast ? (
                  <span className="text-gray-600 font-medium" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}