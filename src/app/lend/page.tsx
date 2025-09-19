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
  Zap,
  BarChart3,
  Clock,
  Percent,
  ArrowUpDown,
  RefreshCw,
  Settings,
  Star,
  Activity,
  Target,
  Info
} from "lucide-react"
import { cn } from "@/lib/utils"
import { LendForm } from "@/components/lending/lend-form"
import { BorrowForm } from "@/components/lending/borrow-form"
import { LendingPools } from "@/components/lending/lending-pools"
import { MarketData } from "@/components/lending/market-data"

// Mock data for lending markets
const mockLendingMarkets = [
  {
    id: "SOL",
    symbol: "SOL",
    name: "Solana",
    icon: "☀️",
    supplyApy: 8.45,
    borrowApy: 12.34,
    totalSupply: 12500000,
    totalBorrowed: 8750000,
    utilizationRate: 70.0,
    collateralFactor: 0.75,
    liquidationThreshold: 0.80,
    price: 98.45,
    priceChange: 2.34,
    isCollateral: true,
    maxLtv: 75,
    liquidationPenalty: 8.0,
    reserveFactor: 0.20
  },
  {
    id: "USDC",
    symbol: "USDC",
    name: "USD Coin",
    icon: "💵",
    supplyApy: 4.23,
    borrowApy: 6.78,
    totalSupply: 25000000,
    totalBorrowed: 12000000,
    utilizationRate: 48.0,
    collateralFactor: 0.90,
    liquidationThreshold: 0.95,
    price: 1.00,
    priceChange: 0.01,
    isCollateral: true,
    maxLtv: 90,
    liquidationPenalty: 5.0,
    reserveFactor: 0.15
  },
  {
    id: "USDT",
    symbol: "USDT",
    name: "Tether",
    icon: "🔗",
    supplyApy: 3.89,
    borrowApy: 5.45,
    totalSupply: 18000000,
    totalBorrowed: 8500000,
    utilizationRate: 47.2,
    collateralFactor: 0.90,
    liquidationThreshold: 0.95,
    price: 1.00,
    priceChange: -0.01,
    isCollateral: true,
    maxLtv: 90,
    liquidationPenalty: 5.0,
    reserveFactor: 0.15
  },
  {
    id: "RAY",
    symbol: "RAY",
    name: "Raydium",
    icon: "🌊",
    supplyApy: 15.67,
    borrowApy: 22.45,
    totalSupply: 2500000,
    totalBorrowed: 1800000,
    utilizationRate: 72.0,
    collateralFactor: 0.60,
    liquidationThreshold: 0.70,
    price: 3.21,
    priceChange: 4.90,
    isCollateral: true,
    maxLtv: 60,
    liquidationPenalty: 10.0,
    reserveFactor: 0.25
  },
  {
    id: "JUP",
    symbol: "JUP",
    name: "Jupiter",
    icon: "🪐",
    supplyApy: 18.23,
    borrowApy: 25.67,
    totalSupply: 1200000,
    totalBorrowed: 950000,
    utilizationRate: 79.2,
    collateralFactor: 0.50,
    liquidationThreshold: 0.60,
    price: 0.45,
    priceChange: 5.67,
    isCollateral: false,
    maxLtv: 0,
    liquidationPenalty: 12.0,
    reserveFactor: 0.30
  }
]

const mockUserPositions = [
  {
    id: "1",
    asset: "SOL",
    type: "Supply",
    amount: 1000,
    apy: 8.45,
    value: 98450,
    collateral: true
  },
  {
    id: "2",
    asset: "USDC",
    type: "Borrow",
    amount: 5000,
    apy: 6.78,
    value: 5000,
    collateral: false
  }
]

export default function LendPage() {
  const [selectedAsset, setSelectedAsset] = useState(mockLendingMarkets[0])
  const [actionType, setActionType] = useState<"supply" | "borrow">("supply")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const totalSupplied = isClient ? mockUserPositions
    .filter(p => p.type === "Supply")
    .reduce((sum, p) => sum + p.value, 0) : 0

  const totalBorrowed = isClient ? mockUserPositions
    .filter(p => p.type === "Borrow")
    .reduce((sum, p) => sum + p.value, 0) : 0

  const totalCollateral = isClient ? mockUserPositions
    .filter(p => p.collateral)
    .reduce((sum, p) => sum + p.value, 0) : 0

  const healthFactor = totalCollateral > 0 ? (totalCollateral * 0.75) / totalBorrowed : 0
  const borrowLimit = totalCollateral * 0.75
  const borrowLimitUsed = (totalBorrowed / borrowLimit) * 100

  const totalApy = isClient ? mockUserPositions
    .filter(p => p.type === "Supply")
    .reduce((sum, p) => sum + (p.value * p.apy / 100), 0) : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <DollarSign className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium">Lending & Borrowing</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Lend & Borrow
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Supply assets to earn interest or borrow against your collateral with competitive rates
            </p>
          </div>

          {/* Portfolio Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Supplied</p>
                    <p className="text-2xl font-bold">${totalSupplied.toLocaleString()}</p>
                    <p className="text-xs text-green-500 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +{totalApy.toFixed(2)}% APY
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
                    <p className="text-sm font-medium text-muted-foreground">Total Borrowed</p>
                    <p className="text-2xl font-bold">${totalBorrowed.toLocaleString()}</p>
                    <p className="text-xs text-red-500 flex items-center">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      {borrowLimitUsed.toFixed(1)}% of limit
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-red-500 to-orange-600 flex items-center justify-center">
                    <TrendingDown className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Health Factor</p>
                    <p className={cn(
                      "text-2xl font-bold",
                      healthFactor > 2 ? "text-green-500" : healthFactor > 1.5 ? "text-yellow-500" : "text-red-500"
                    )}>
                      {healthFactor.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {healthFactor > 2 ? "Safe" : healthFactor > 1.5 ? "Caution" : "At Risk"}
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Borrow Limit</p>
                    <p className="text-2xl font-bold">${borrowLimit.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">
                      ${(borrowLimit - totalBorrowed).toLocaleString()} available
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Markets List */}
            <div className="xl:col-span-1">
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Lending Markets</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {mockLendingMarkets.map((market) => (
                      <div
                        key={market.id}
                        className={cn(
                          "flex items-center justify-between p-3 cursor-pointer transition-colors hover:bg-muted/50",
                          selectedAsset.id === market.id ? "bg-primary/10 border-r-2 border-primary" : ""
                        )}
                        onClick={() => setSelectedAsset(market)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                            {market.icon}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{market.symbol}</div>
                            <div className="text-xs text-muted-foreground">{market.name}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-sm">${market.price.toFixed(2)}</div>
                          <div className="text-xs text-muted-foreground">
                            {market.supplyApy.toFixed(2)}% APY
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Trading Area */}
            <div className="xl:col-span-3">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Lend/Borrow Forms */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Action Tabs */}
                  <Tabs value={actionType} onValueChange={(value) => setActionType(value as "supply" | "borrow")} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="supply" className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4" />
                        <span>Supply</span>
                      </TabsTrigger>
                      <TabsTrigger value="borrow" className="flex items-center space-x-2">
                        <TrendingDown className="h-4 w-4" />
                        <span>Borrow</span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="supply" className="mt-6">
                      <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="text-lg">Supply {selectedAsset.symbol}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <LendForm asset={selectedAsset} />
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="borrow" className="mt-6">
                      <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="text-lg">Borrow {selectedAsset.symbol}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <BorrowForm asset={selectedAsset} />
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>

                  {/* Lending Pools */}
                  <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg">Lending Pools</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <LendingPools markets={mockLendingMarkets} />
                    </CardContent>
                  </Card>
                </div>

                {/* Side Panel */}
                <div className="space-y-6">
                  {/* Market Info */}
                  <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg">Market Info</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Supply APY:</span>
                          <div className="font-medium text-green-500">{selectedAsset.supplyApy.toFixed(2)}%</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Borrow APY:</span>
                          <div className="font-medium text-red-500">{selectedAsset.borrowApy.toFixed(2)}%</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Total Supply:</span>
                          <div className="font-medium">${selectedAsset.totalSupply.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Total Borrowed:</span>
                          <div className="font-medium">${selectedAsset.totalBorrowed.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Utilization:</span>
                          <div className="font-medium">{selectedAsset.utilizationRate.toFixed(1)}%</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Collateral Factor:</span>
                          <div className="font-medium">{selectedAsset.collateralFactor * 100}%</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Market Data */}
                  <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg">Market Data</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <MarketData asset={selectedAsset} />
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* All Markets */}
              <div className="mt-6">
                <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg">All Markets</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <LendingPools markets={mockLendingMarkets} />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
