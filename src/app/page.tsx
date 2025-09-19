"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  TrendingUp, 
  Users, 
  Globe, 
  Star,
  CheckCircle,
  Play,
  BarChart3,
  DollarSign,
  Lock,
  Bot,
  Layers,
  Target,
  Award,
  Sparkles,
  Rocket,
  Coins,
  Activity,
  ArrowUpRight,
  ChevronRight,
  ExternalLink
} from "lucide-react"
import { cn } from "@/lib/utils"

const features = [
  {
    icon: Zap,
    title: "Instant Swaps",
    description: "Trade tokens instantly with the best rates across multiple DEXs on Solana",
    href: "/swap",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: TrendingUp,
    title: "Perpetual Trading",
    description: "Trade perpetual futures with up to 50x leverage and advanced order types",
    href: "/perpetuals",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Layers,
    title: "Liquidity Pools",
    description: "Provide liquidity and earn fees from trading volume across multiple pools",
    href: "/pools",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: DollarSign,
    title: "Lending & Borrowing",
    description: "Lend your assets to earn interest or borrow against your collateral",
    href: "/lend",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Lock,
    title: "Staking",
    description: "Stake your tokens and earn rewards with our secure validator network",
    href: "/stake",
    color: "from-indigo-500 to-purple-500"
  },
  {
    icon: Bot,
    title: "Looper Strategies",
    description: "Automated trading strategies that work 24/7 to maximize your returns",
    href: "/looper",
    color: "from-teal-500 to-blue-500"
  }
]

const stats = [
  { label: "Total Volume", value: "$2.4B+", icon: BarChart3 },
  { label: "Active Users", value: "50K+", icon: Users },
  { label: "Supported Tokens", value: "200+", icon: Coins },
  { label: "APY Range", value: "5-50%", icon: TrendingUp }
]

const benefits = [
  {
    icon: Shield,
    title: "Secure & Audited",
    description: "Smart contracts audited by leading security firms with insurance coverage"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Built on Solana for sub-second transaction speeds and minimal fees"
  },
  {
    icon: Globe,
    title: "Cross-Chain",
    description: "Access to multiple blockchains through our bridge infrastructure"
  },
  {
    icon: Award,
    title: "Best Rates",
    description: "Aggregated liquidity from top DEXs ensures you get the best prices"
  }
]

export default function HomePage() {
  const [isClient, setIsClient] = useState(false)

  useState(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20" />
        <div className="container mx-auto px-4 py-20 lg:py-32 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium">The Ultimate DeFi Platform on Solana</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                DeFi Nexus
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Trade, earn, and manage your crypto assets with ease and security. 
              Experience the future of decentralized finance on Solana.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="text-lg px-8 py-6" variant="gradient">
                <Rocket className="h-5 w-5 mr-2" />
                Get Started
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                <Play className="h-5 w-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm mb-3">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Everything You Need for
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"> DeFi Success</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From simple swaps to advanced trading strategies, DeFi Nexus provides all the tools you need to maximize your crypto returns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link key={index} href={feature.href}>
                <Card className="group h-full border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 ease-out hover:scale-105 cursor-pointer">
                  <CardHeader className="pb-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl bg-gradient-to-r flex items-center justify-center mb-4",
                      feature.color
                    )}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors duration-500 ease-out">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <div className="flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform duration-500 ease-out">
                      <span>Explore</span>
                      <ArrowUpRight className="h-4 w-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-32 bg-white/50 dark:bg-slate-800/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Why Choose <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">DeFi Nexus?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built for the next generation of DeFi users with cutting-edge technology and user-first design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 mb-6 group-hover:scale-110 transition-transform duration-500 ease-out">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 lg:p-16 text-white">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Ready to Start Your DeFi Journey?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of users who are already maximizing their crypto returns with DeFi Nexus.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
                  <Target className="h-5 w-5 mr-2" />
                  View Portfolio
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white bg-white/10 hover:bg-white hover:text-primary transition-all duration-200">
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 border-t bg-white/30 dark:bg-slate-800/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Start Trading Today</h3>
              <p className="text-muted-foreground">Connect your wallet and begin your DeFi journey</p>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Button variant="gradient" size="lg">
                <Zap className="h-5 w-5 mr-2" />
                Connect Wallet
              </Button>
              <Button variant="outline" size="lg">
                <Activity className="h-5 w-5 mr-2" />
                View Markets
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}