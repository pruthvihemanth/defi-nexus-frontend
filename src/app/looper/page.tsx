"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Shield, 
  AlertTriangle,
  BarChart3,
  Clock,
  Percent,
  RefreshCw,
  Settings,
  Star,
  Activity,
  Target,
  Info,
  Zap,
  Play,
  Pause,
  Stop,
  Plus,
  Eye,
  EyeOff,
  Download,
  Filter,
  Search,
  ChevronDown,
  CheckCircle,
  XCircle,
  Bot,
  Cpu,
  Layers,
  Repeat,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon
} from "lucide-react"
import { cn } from "@/lib/utils"
import { StrategyCard } from "@/components/looper/strategy-card"
import { CreateStrategyModal } from "@/components/looper/create-strategy-modal"
import { ActiveStrategies } from "@/components/looper/active-strategies"
import { StrategyPerformance } from "@/components/looper/strategy-performance"
import { RiskManagement } from "@/components/looper/risk-management"
import { ClientOnly } from "@/components/ui/client-only"

// Mock data for strategies
const mockStrategies = [
  {
    id: "1",
    name: "DCA SOL Strategy",
    description: "Dollar Cost Average into SOL with automated rebalancing",
    type: "DCA",
    apy: 24.5,
    tvl: 2500000,
    risk: "Medium",
    minDeposit: 100,
    maxDeposit: 100000,
    duration: "Flexible",
    status: "active",
    creator: "DeFi Nexus",
    isVerified: true,
    features: ["Auto Rebalancing", "Stop Loss", "Take Profit", "Gas Optimization"],
    performance: {
      totalReturn: 18.7,
      sharpeRatio: 1.8,
      maxDrawdown: -5.2,
      winRate: 78.5,
      totalTrades: 156
    },
    tokens: ["SOL", "USDC"],
    color: "blue"
  },
  {
    id: "2",
    name: "Yield Farming Loop",
    description: "Automated yield farming across multiple protocols",
    type: "Yield Farming",
    apy: 35.2,
    tvl: 1800000,
    risk: "High",
    minDeposit: 500,
    maxDeposit: 500000,
    duration: "30 days",
    status: "active",
    creator: "Yield Master",
    isVerified: true,
    features: ["Multi-Protocol", "Auto Compound", "Risk Management", "Gas Optimization"],
    performance: {
      totalReturn: 28.3,
      sharpeRatio: 2.1,
      maxDrawdown: -8.7,
      winRate: 82.1,
      totalTrades: 89
    },
    tokens: ["SOL", "RAY", "JUP", "USDC"],
    color: "green"
  },
  {
    id: "3",
    name: "Arbitrage Bot",
    description: "Cross-DEX arbitrage opportunities with MEV protection",
    type: "Arbitrage",
    apy: 45.8,
    tvl: 1200000,
    risk: "High",
    minDeposit: 1000,
    maxDeposit: 1000000,
    duration: "Flexible",
    status: "active",
    creator: "Arbitrage Pro",
    isVerified: false,
    features: ["MEV Protection", "Multi-DEX", "Real-time", "Gas Optimization"],
    performance: {
      totalReturn: 42.1,
      sharpeRatio: 2.8,
      maxDrawdown: -3.2,
      winRate: 91.3,
      totalTrades: 234
    },
    tokens: ["SOL", "USDC", "USDT"],
    color: "purple"
  },
  {
    id: "4",
    name: "Liquidation Hunter",
    description: "Automated liquidation opportunities in lending protocols",
    type: "Liquidation",
    apy: 28.7,
    tvl: 800000,
    risk: "Medium",
    minDeposit: 200,
    maxDeposit: 200000,
    duration: "Flexible",
    status: "paused",
    creator: "Liquidator Bot",
    isVerified: true,
    features: ["Health Monitoring", "Auto Execution", "Risk Assessment", "Gas Optimization"],
    performance: {
      totalReturn: 22.4,
      sharpeRatio: 1.9,
      maxDrawdown: -6.8,
      winRate: 85.7,
      totalTrades: 67
    },
    tokens: ["SOL", "USDC", "RAY"],
    color: "orange"
  },
  {
    id: "5",
    name: "Stablecoin Optimizer",
    description: "Optimize stablecoin yields across lending protocols",
    type: "Stablecoin",
    apy: 12.3,
    tvl: 3200000,
    risk: "Low",
    minDeposit: 50,
    maxDeposit: 1000000,
    duration: "Flexible",
    status: "active",
    creator: "Stable Master",
    isVerified: true,
    features: ["Low Risk", "Stable Returns", "Auto Rebalancing", "Gas Optimization"],
    performance: {
      totalReturn: 11.8,
      sharpeRatio: 3.2,
      maxDrawdown: -1.2,
      winRate: 95.2,
      totalTrades: 45
    },
    tokens: ["USDC", "USDT", "DAI"],
    color: "cyan"
  }
]

const mockUserStrategies = [
  {
    id: "1",
    strategy: "DCA SOL Strategy",
    amount: 5000,
    apy: 24.5,
    pnl: 1250,
    pnlPercent: 25.0,
    status: "running",
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
    nextExecution: new Date(Date.now() + 1000 * 60 * 60 * 2)
  },
  {
    id: "2",
    strategy: "Yield Farming Loop",
    amount: 10000,
    apy: 35.2,
    pnl: 2800,
    pnlPercent: 28.0,
    status: "running",
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
    nextExecution: new Date(Date.now() + 1000 * 60 * 60 * 6)
  }
]

export default function LooperPage() {
  const [activeTab, setActiveTab] = useState("strategies")
  const [selectedStrategy, setSelectedStrategy] = useState(mockStrategies[0])
  const [showValues, setShowValues] = useState(true)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("apy")

  const filteredStrategies = mockStrategies.filter(strategy => {
    if (filter === "all") return true
    if (filter === "active") return strategy.status === "active"
    if (filter === "verified") return strategy.isVerified
    if (filter === "low-risk") return strategy.risk === "Low"
    if (filter === "high-apy") return strategy.apy > 30
    return true
  })

  const sortedStrategies = filteredStrategies.sort((a, b) => {
    if (sortBy === "apy") return b.apy - a.apy
    if (sortBy === "tvl") return b.tvl - a.tvl
    if (sortBy === "name") return a.name.localeCompare(b.name)
    return 0
  })


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Bot className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium">Automated Trading</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Looper
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Automated trading strategies for maximum DeFi yields
            </p>
          </div>

          {/* Portfolio Stats */}
          <ClientOnly fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="animate-pulse">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-8 bg-muted rounded w-1/2 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-2/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          }>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Invested</p>
                      <p className="text-2xl font-bold">
                        {showValues ? `$${mockUserStrategies.reduce((sum, strategy) => sum + strategy.amount, 0).toLocaleString()}` : "••••••"}
                      </p>
                      <p className="text-xs text-green-500 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +{((mockUserStrategies.reduce((sum, strategy) => sum + strategy.pnl, 0) / mockUserStrategies.reduce((sum, strategy) => sum + strategy.amount, 0)) * 100).toFixed(2)}% ROI
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total P&L</p>
                      <p className="text-2xl font-bold text-green-500">
                        {showValues ? `$${mockUserStrategies.reduce((sum, strategy) => sum + strategy.pnl, 0).toLocaleString()}` : "••••••"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {showValues ? `$${mockUserStrategies.reduce((sum, strategy) => sum + strategy.pnl, 0).toLocaleString()}` : "••••••"} profit
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Strategies</p>
                      <p className="text-2xl font-bold">{mockUserStrategies.filter(s => s.status === "running").length}</p>
                      <p className="text-xs text-muted-foreground">
                        {mockUserStrategies.length} total strategies
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                      <Bot className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Avg APY</p>
                      <p className="text-2xl font-bold text-blue-500">
                        {(mockUserStrategies.reduce((sum, s) => sum + s.apy, 0) / mockUserStrategies.length).toFixed(1)}%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Weighted average
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center">
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ClientOnly>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="strategies" className="flex items-center space-x-2">
                <Layers className="h-4 w-4" />
                <span>Strategies</span>
              </TabsTrigger>
              <TabsTrigger value="active" className="flex items-center space-x-2">
                <Play className="h-4 w-4" />
                <span>Active</span>
              </TabsTrigger>
              <TabsTrigger value="performance" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Performance</span>
              </TabsTrigger>
              <TabsTrigger value="risk" className="flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Risk</span>
              </TabsTrigger>
              <TabsTrigger value="create" className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Create</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="strategies" className="mt-6">
              <div className="space-y-6">
                {/* Filters and Search */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search strategies..."
                      className="pl-10"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="px-3 py-2 text-sm border rounded-md bg-background"
                    >
                      <option value="all">All Strategies</option>
                      <option value="active">Active</option>
                      <option value="verified">Verified</option>
                      <option value="low-risk">Low Risk</option>
                      <option value="high-apy">High APY</option>
                    </select>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-2 text-sm border rounded-md bg-background"
                    >
                      <option value="apy">Sort by APY</option>
                      <option value="tvl">Sort by TVL</option>
                      <option value="name">Sort by Name</option>
                    </select>
                  </div>
                </div>

                {/* Strategy Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedStrategies.map((strategy) => (
                    <StrategyCard
                      key={strategy.id}
                      strategy={strategy}
                      showValues={showValues}
                      onSelect={() => setSelectedStrategy(strategy)}
                    />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="active" className="mt-6">
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Your Active Strategies</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ActiveStrategies strategies={mockUserStrategies} showValues={showValues} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="mt-6">
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Strategy Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <StrategyPerformance strategies={mockUserStrategies} showValues={showValues} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="risk" className="mt-6">
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Risk Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <RiskManagement strategies={mockUserStrategies} showValues={showValues} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="create" className="mt-6">
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Create New Strategy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white mx-auto mb-4">
                      <Plus className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Create Your Strategy</h3>
                    <p className="text-muted-foreground mb-6">
                      Build custom automated trading strategies with our easy-to-use interface
                    </p>
                    <Button
                      onClick={() => setShowCreateModal(true)}
                      className="flex items-center space-x-2"
                      variant="gradient"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Start Creating</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Create Strategy Modal */}
      {showCreateModal && (
        <CreateStrategyModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
        />
      )}
    </div>
  )
}



