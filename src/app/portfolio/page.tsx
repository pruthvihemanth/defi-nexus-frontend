"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
  Wallet,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  EyeOff,
  Download,
  Filter,
  Search
} from "lucide-react"
import { cn } from "@/lib/utils"
import { PortfolioOverview } from "@/components/lending/portfolio-overview"
import { TransactionHistory } from "@/components/portfolio/transaction-history"
import { PortfolioAnalytics } from "@/components/portfolio/portfolio-analytics"
import { AssetAllocation } from "@/components/portfolio/asset-allocation"

// Mock data for portfolio
const mockPortfolioData = {
  totalValue: 125000,
  totalPnl: 12500,
  totalPnlPercent: 11.11,
  dayChange: 2500,
  dayChangePercent: 2.04,
  assets: [
    {
      id: "SOL",
      symbol: "SOL",
      name: "Solana",
      icon: "☀️",
      amount: 1000,
      value: 98450,
      price: 98.45,
      priceChange: 2.34,
      allocation: 78.76,
      pnl: 8500,
      pnlPercent: 9.45,
      type: "Token"
    },
    {
      id: "USDC",
      symbol: "USDC",
      name: "USD Coin",
      icon: "💵",
      amount: 5000,
      value: 5000,
      price: 1.00,
      priceChange: 0.01,
      allocation: 4.00,
      pnl: 0,
      pnlPercent: 0,
      type: "Stablecoin"
    },
    {
      id: "RAY",
      symbol: "RAY",
      name: "Raydium",
      icon: "🌊",
      amount: 5000,
      value: 16050,
      price: 3.21,
      priceChange: 4.90,
      allocation: 12.84,
      pnl: 3000,
      pnlPercent: 22.99,
      type: "Token"
    },
    {
      id: "JUP",
      symbol: "JUP",
      name: "Jupiter",
      icon: "🪐",
      amount: 10000,
      value: 4500,
      price: 0.45,
      priceChange: 5.67,
      allocation: 3.60,
      pnl: 1000,
      pnlPercent: 28.57,
      type: "Token"
    }
  ],
  positions: [
    {
      id: "1",
      asset: "SOL",
      type: "Supply",
      amount: 1000,
      apy: 8.45,
      value: 98450,
      collateral: true,
      healthFactor: 2.5
    },
    {
      id: "2",
      asset: "USDC",
      type: "Borrow",
      amount: 5000,
      apy: 6.78,
      value: 5000,
      collateral: false,
      healthFactor: 2.5
    }
  ],
  transactions: [
    {
      id: "1",
      type: "swap",
      from: "SOL",
      to: "USDC",
      amount: 100,
      value: 9845,
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      status: "completed"
    },
    {
      id: "2",
      type: "supply",
      asset: "SOL",
      amount: 500,
      value: 49225,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      status: "completed"
    },
    {
      id: "3",
      type: "borrow",
      asset: "USDC",
      amount: 2000,
      value: 2000,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      status: "completed"
    }
  ]
}

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isClient, setIsClient] = useState(false)
  const [showValues, setShowValues] = useState(true)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading portfolio...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <BarChart3 className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium">Portfolio Management</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Portfolio
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Track your assets, positions, and performance across all DeFi protocols
            </p>
          </div>

          {/* Portfolio Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Portfolio Value</p>
                    <p className="text-2xl font-bold">
                      {showValues ? `$${mockPortfolioData.totalValue.toLocaleString()}` : "••••••"}
                    </p>
                    <p className={cn(
                      "text-xs flex items-center",
                      mockPortfolioData.dayChange >= 0 ? "text-green-500" : "text-red-500"
                    )}>
                      {mockPortfolioData.dayChange >= 0 ? (
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                      )}
                      {showValues ? `$${Math.abs(mockPortfolioData.dayChange).toLocaleString()}` : "••••"} ({mockPortfolioData.dayChangePercent.toFixed(2)}%) today
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <Wallet className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total P&L</p>
                    <p className={cn(
                      "text-2xl font-bold",
                      mockPortfolioData.totalPnl >= 0 ? "text-green-500" : "text-red-500"
                    )}>
                      {showValues ? `$${mockPortfolioData.totalPnl.toLocaleString()}` : "••••••"}
                    </p>
                    <p className={cn(
                      "text-xs flex items-center",
                      mockPortfolioData.totalPnlPercent >= 0 ? "text-green-500" : "text-red-500"
                    )}>
                      {mockPortfolioData.totalPnlPercent >= 0 ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {mockPortfolioData.totalPnlPercent.toFixed(2)}% all time
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
                    <p className="text-sm font-medium text-muted-foreground">Assets</p>
                    <p className="text-2xl font-bold">{mockPortfolioData.assets.length}</p>
                    <p className="text-xs text-muted-foreground">
                      {mockPortfolioData.assets.filter(a => a.type === "Token").length} tokens, {mockPortfolioData.assets.filter(a => a.type === "Stablecoin").length} stablecoins
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                    <PieChart className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Positions</p>
                    <p className="text-2xl font-bold">{mockPortfolioData.positions.length}</p>
                    <p className="text-xs text-muted-foreground">
                      {mockPortfolioData.positions.filter(p => p.type === "Supply").length} supplied, {mockPortfolioData.positions.filter(p => p.type === "Borrow").length} borrowed
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview" className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="positions" className="flex items-center space-x-2">
                <Target className="h-4 w-4" />
                <span>Positions</span>
              </TabsTrigger>
              <TabsTrigger value="transactions" className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Transactions</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center space-x-2">
                <Activity className="h-4 w-4" />
                <span>Analytics</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Asset Allocation */}
                <div className="xl:col-span-2">
                  <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg">Asset Allocation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <AssetAllocation assets={mockPortfolioData.assets} showValues={showValues} />
                    </CardContent>
                  </Card>
                </div>

                {/* Top Performers */}
                <div>
                  <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg">Top Performers</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockPortfolioData.assets
                          .sort((a, b) => b.pnlPercent - a.pnlPercent)
                          .slice(0, 3)
                          .map((asset) => (
                            <div key={asset.id} className="flex items-center justify-between p-3 rounded-lg border">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                                  {asset.icon}
                                </div>
                                <div>
                                  <div className="font-medium text-sm">{asset.symbol}</div>
                                  <div className="text-xs text-muted-foreground">{asset.name}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className={cn(
                                  "font-medium text-sm",
                                  asset.pnlPercent >= 0 ? "text-green-500" : "text-red-500"
                                )}>
                                  {asset.pnlPercent >= 0 ? "+" : ""}{asset.pnlPercent.toFixed(2)}%
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {showValues ? `$${asset.pnl.toLocaleString()}` : "••••"}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="positions" className="mt-6">
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Your Positions</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <PortfolioOverview positions={mockPortfolioData.positions} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions" className="mt-6">
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Transaction History</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <TransactionHistory transactions={mockPortfolioData.transactions} showValues={showValues} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Portfolio Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <PortfolioAnalytics portfolioData={mockPortfolioData} showValues={showValues} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}



