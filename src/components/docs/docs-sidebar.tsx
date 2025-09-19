"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  BookOpen, 
  Zap, 
  TrendingUp, 
  DollarSign, 
  BarChart3, 
  Shield, 
  Settings,
  Code,
  FileText,
  ChevronRight
} from "lucide-react"

const docsNavigation = [
  {
    title: "Getting Started",
    icon: BookOpen,
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Quick Start Guide", href: "/docs/quick-start" },
      { title: "Connecting Your Wallet", href: "/docs/wallet-setup" },
      { title: "First Steps", href: "/docs/first-steps" }
    ]
  },
  {
    title: "Trading",
    icon: TrendingUp,
    items: [
      { title: "How to Swap Tokens", href: "/docs/trading/swap" },
      { title: "Perpetuals Trading", href: "/docs/trading/perpetuals" },
      { title: "Understanding Charts", href: "/docs/trading/charts" },
      { title: "Managing Positions", href: "/docs/trading/positions" },
      { title: "Order Types", href: "/docs/trading/orders" }
    ]
  },
  {
    title: "Liquidity & Pools",
    icon: BarChart3,
    items: [
      { title: "What are Liquidity Pools?", href: "/docs/pools/overview" },
      { title: "How to Add Liquidity", href: "/docs/pools/add-liquidity" },
      { title: "Removing Liquidity", href: "/docs/pools/remove-liquidity" },
      { title: "Understanding Fees", href: "/docs/pools/fees" },
      { title: "Pool Analytics", href: "/docs/pools/analytics" }
    ]
  },
  {
    title: "Lending",
    icon: DollarSign,
    items: [
      { title: "How to Lend Assets", href: "/docs/lending/lend" },
      { title: "How to Borrow Assets", href: "/docs/lending/borrow" },
      { title: "Understanding Interest Rates", href: "/docs/lending/interest-rates" },
      { title: "Collateral Management", href: "/docs/lending/collateral" },
      { title: "Lending Markets", href: "/docs/lending/markets" }
    ]
  },
  {
    title: "Staking",
    icon: Shield,
    items: [
      { title: "How to Stake Tokens", href: "/docs/staking/stake" },
      { title: "Choosing Validators", href: "/docs/staking/validators" },
      { title: "Understanding Rewards", href: "/docs/staking/rewards" },
      { title: "How to Unstake", href: "/docs/staking/unstake" },
      { title: "Staking History", href: "/docs/staking/history" }
    ]
  },
  {
    title: "Advanced Features",
    icon: Settings,
    items: [
      { title: "Looper Strategies", href: "/docs/advanced/looper" },
      { title: "Portfolio Management", href: "/docs/advanced/portfolio" },
      { title: "Risk Management", href: "/docs/advanced/risk" },
      { title: "Automated Trading", href: "/docs/advanced/automation" }
    ]
  },
  {
    title: "Help & Support",
    icon: FileText,
    items: [
      { title: "Frequently Asked Questions", href: "/docs/resources/faq" },
      { title: "Troubleshooting", href: "/docs/resources/troubleshooting" },
      { title: "Security Best Practices", href: "/docs/resources/security" },
      { title: "Contact Support", href: "/docs/resources/support" }
    ]
  }
]

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <div className="p-6">
      {/* Logo */}
      <div className="flex items-center space-x-3 mb-8">
        <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-xl">D</span>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent leading-tight">
            DeFi Nexus
          </span>
          <p className="text-xs text-muted-foreground leading-tight">Documentation</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-6">
        {docsNavigation.map((section) => (
          <div key={section.title}>
            <div className="flex items-center space-x-2 mb-3">
              <section.icon className="h-4 w-4 text-muted-foreground" />
              <h3 className="text-sm font-semibold text-foreground">
                {section.title}
              </h3>
            </div>
            <ul className="space-y-1 ml-6">
              {section.items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center space-x-2 text-sm py-2 px-3 rounded-md transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      <ChevronRight className="h-3 w-3" />
                      <span>{item.title}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-12 pt-6 border-t">
        <div className="text-xs text-muted-foreground space-y-2">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          <p>Version: 1.0.0</p>
        </div>
      </div>
    </div>
  )
}
