"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Settings, Rocket, Image as ImageIcon, BarChart3, Globe, Shield, Zap, Star, TrendingUp, Users, FileText, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const MORE_ITEMS = [
  {
    name: "Portfolio",
    href: "/portfolio",
    description: "View your portfolio and positions",
    icon: BarChart3,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10"
  },
  {
    name: "Launchpad",
    href: "/launchpad",
    description: "Discover new projects",
    icon: Rocket,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10"
  },
  {
    name: "NFTs",
    href: "/nft",
    description: "Browse NFT collections",
    icon: ImageIcon,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10"
  },
  {
    name: "Analytics",
    href: "/analytics",
    description: "Market insights",
    icon: TrendingUp,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10"
  },
  {
    name: "Governance",
    href: "/governance",
    description: "Vote on proposals",
    icon: Users,
    color: "text-green-500",
    bgColor: "bg-green-500/10"
  },
  {
    name: "Bridge",
    href: "/bridge",
    description: "Cross-chain transfers",
    icon: Globe,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10"
  },
  {
    name: "Security",
    href: "/security",
    description: "Audit reports",
    icon: Shield,
    color: "text-red-500",
    bgColor: "bg-red-500/10"
  },
  {
    name: "Tools",
    href: "/tools",
    description: "DeFi utilities",
    icon: Zap,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10"
  },
  {
    name: "Rewards",
    href: "/rewards",
    description: "Earn incentives",
    icon: Star,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10"
  }
]

const SUPPORT_ITEMS = [
  {
    name: "Documentation",
    href: "/docs",
    description: "Learn how to use DeFi Nexus",
    icon: FileText,
    color: "text-slate-500",
    bgColor: "bg-slate-500/10"
  },
  {
    name: "Help Center",
    href: "/help",
    description: "Get support",
    icon: HelpCircle,
    color: "text-slate-500",
    bgColor: "bg-slate-500/10"
  },
  {
    name: "Settings",
    href: "/settings",
    description: "Customize your experience",
    icon: Settings,
    color: "text-slate-500",
    bgColor: "bg-slate-500/10"
  }
]

interface MoreDropdownProps {
  className?: string
}

export function MoreDropdown({ className }: MoreDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const isActive = MORE_ITEMS.some(item => pathname === item.href) || 
                   SUPPORT_ITEMS.some(item => pathname === item.href)

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground group",
          isActive
            ? "text-primary bg-accent"
            : "text-muted-foreground"
        )}
      >
        More
        <ChevronDown className={cn("ml-1 h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")} />
        <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ease-out group-hover:w-full" />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border border-white/20 rounded-xl shadow-2xl z-[9999] overflow-hidden">
          {/* Main Features */}
          <div className="p-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              DeFi Features
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {MORE_ITEMS.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 ease-out group"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", item.bgColor)}>
                      <Icon className={cn("h-4 w-4", item.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10" />

          {/* Support & Settings */}
          <div className="p-4">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Support & Settings
            </h3>
            <div className="space-y-1">
              {SUPPORT_ITEMS.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 ease-out group"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", item.bgColor)}>
                      <Icon className={cn("h-4 w-4", item.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-white/10 p-4 bg-gradient-to-r from-blue-500/5 to-purple-500/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-foreground">DeFi Nexus</p>
                <p className="text-xs text-muted-foreground">Your gateway to DeFi</p>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-muted-foreground">Live</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
