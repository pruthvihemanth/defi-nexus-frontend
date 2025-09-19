import Link from "next/link"
import { 
  BookOpen, 
  Zap, 
  TrendingUp, 
  DollarSign, 
  BarChart3, 
  Shield, 
  Settings,
  ArrowRight,
  Code,
  FileText
} from "lucide-react"

const quickStartCards = [
  {
    title: "Start Trading",
    description: "Learn how to swap tokens and trade perpetuals on DeFi Nexus",
    icon: TrendingUp,
    href: "/docs/trading/swap",
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Earn with Pools",
    description: "Provide liquidity to pools and earn trading fees automatically",
    icon: BarChart3,
    href: "/docs/pools/overview",
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "Lend & Borrow",
    description: "Lend your assets to earn interest or borrow against your holdings",
    icon: DollarSign,
    href: "/docs/lending/lend",
    color: "from-purple-500 to-violet-500"
  },
  {
    title: "Stake & Earn",
    description: "Stake your tokens with validators and earn passive rewards",
    icon: Shield,
    href: "/docs/staking/stake",
    color: "from-orange-500 to-red-500"
  }
]

const docSections = [
  {
    title: "Getting Started",
    description: "Everything you need to know to get started with DeFi Nexus",
    icon: BookOpen,
    href: "/docs/quick-start",
    items: ["Quick Start Guide", "Connecting Your Wallet", "First Steps", "Basic Navigation"]
  },
  {
    title: "Trading Guide",
    description: "Learn how to trade tokens, manage positions, and use advanced trading features",
    icon: TrendingUp,
    href: "/docs/trading/swap",
    items: ["Token Swapping", "Perpetuals Trading", "Understanding Charts", "Position Management"]
  },
  {
    title: "Earning Opportunities",
    description: "Discover ways to earn passive income through liquidity, lending, and staking",
    icon: DollarSign,
    href: "/docs/pools/overview",
    items: ["Liquidity Pools", "Lending Markets", "Staking Rewards", "Yield Farming"]
  },
  {
    title: "Help & Support",
    description: "Get help when you need it with our comprehensive support resources",
    icon: FileText,
    href: "/docs/resources/faq",
    items: ["FAQ", "Troubleshooting", "Security Tips", "Contact Support"]
  }
]

export default function DocsHomePage() {
  return (
    <div className="max-w-4xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center space-x-2 mb-4">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl">D</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              DeFi Nexus Documentation
            </h1>
            <p className="text-muted-foreground">Your complete guide to DeFi on Solana</p>
          </div>
        </div>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Welcome to the DeFi Nexus user guide. Here you'll find step-by-step tutorials, 
          helpful tips, and comprehensive guides to help you make the most of DeFi Nexus 
          and maximize your crypto earnings on Solana.
        </p>
      </div>

      {/* Quick Start Cards */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <Zap className="h-6 w-6 mr-2 text-primary" />
          Quick Start
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickStartCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group p-6 rounded-lg border bg-card hover:bg-accent/50 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${card.color}`}>
                  <card.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {card.description}
                  </p>
                  <div className="flex items-center text-sm text-primary group-hover:translate-x-1 transition-transform">
                    <span>Get started</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Documentation Sections */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Documentation Sections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {docSections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group p-6 rounded-lg border bg-card hover:bg-accent/50 transition-all duration-200"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                  <section.icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {section.description}
                  </p>
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item} className="text-xs text-muted-foreground">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Getting Help */}
      <div className="p-6 rounded-lg border bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Can't find what you're looking for? We're here to help!
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/docs/resources/faq"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-md hover:bg-primary/20 transition-colors"
          >
            <FileText className="h-4 w-4 mr-2" />
            FAQ
          </Link>
          <Link
            href="/docs/resources/troubleshooting"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-md hover:bg-primary/20 transition-colors"
          >
            <Settings className="h-4 w-4 mr-2" />
            Troubleshooting
          </Link>
          <a
            href="https://discord.gg/definexus"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-md hover:bg-primary/20 transition-colors"
          >
            <Shield className="h-4 w-4 mr-2" />
            Discord Support
          </a>
        </div>
      </div>
    </div>
  )
}
