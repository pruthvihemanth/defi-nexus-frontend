"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Filter, 
  Plus, 
  TrendingUp, 
  TrendingDown, 
  MoreHorizontal,
  ArrowUpDown,
  Zap,
  Shield,
  Clock,
  DollarSign,
  BarChart3,
  Star,
  RefreshCw,
  Layers
} from "lucide-react"
import { cn } from "@/lib/utils"
import { CreatePoolModal } from "@/components/modals/create-pool-modal"
import { PoolActionsModal } from "@/components/modals/pool-actions-modal"

// Mock data for pools
const mockPools = [
  {
    id: "1",
    tokenA: { symbol: "SOL", name: "Solana", icon: "☀️", price: "$98.45" },
    tokenB: { symbol: "USDC", name: "USD Coin", icon: "💵", price: "$1.00" },
    tvl: "$2,456,789",
    volume24h: "$1,234,567",
    volume7d: "$8,765,432",
    apy: "12.45%",
    apyChange: "+2.34%",
    fees24h: "$1,234",
    fees7d: "$8,765",
    apr: "8.23%",
    aprChange: "+1.45%",
    liquidity: "$2,456,789",
    priceRange: "0.95 - 1.05",
    concentration: "Medium",
    category: "Stable",
    isVerified: true,
    isFavorite: false,
    poolType: "Concentrated",
    feeTier: "0.01%",
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    tokenA: { symbol: "RAY", name: "Raydium", icon: "🌊", price: "$3.21" },
    tokenB: { symbol: "SOL", name: "Solana", icon: "☀️", price: "$98.45" },
    tvl: "$1,234,567",
    volume24h: "$567,890",
    volume7d: "$3,456,789",
    apy: "18.76%",
    apyChange: "-1.23%",
    fees24h: "$567",
    fees7d: "$3,456",
    apr: "15.23%",
    aprChange: "-0.89%",
    liquidity: "$1,234,567",
    priceRange: "0.85 - 1.15",
    concentration: "High",
    category: "Volatile",
    isVerified: true,
    isFavorite: true,
    poolType: "Concentrated",
    feeTier: "0.05%",
    createdAt: "2024-01-10"
  },
  {
    id: "3",
    tokenA: { symbol: "JUP", name: "Jupiter", icon: "🪐", price: "$0.45" },
    tokenB: { symbol: "USDC", name: "USD Coin", icon: "💵", price: "$1.00" },
    tvl: "$890,123",
    volume24h: "$345,678",
    volume7d: "$2,345,678",
    apy: "24.56%",
    apyChange: "+5.67%",
    fees24h: "$345",
    fees7d: "$2,345",
    apr: "20.12%",
    aprChange: "+3.45%",
    liquidity: "$890,123",
    priceRange: "0.90 - 1.10",
    concentration: "Medium",
    category: "Volatile",
    isVerified: false,
    isFavorite: false,
    poolType: "Standard",
    feeTier: "0.30%",
    createdAt: "2024-01-20"
  },
  {
    id: "4",
    tokenA: { symbol: "ORCA", name: "Orca", icon: "🐋", price: "$2.34" },
    tokenB: { symbol: "SOL", name: "Solana", icon: "☀️", price: "$98.45" },
    tvl: "$3,456,789",
    volume24h: "$1,567,890",
    volume7d: "$9,876,543",
    apy: "15.67%",
    apyChange: "+3.21%",
    fees24h: "$1,567",
    fees7d: "$9,876",
    apr: "12.34%",
    aprChange: "+2.10%",
    liquidity: "$3,456,789",
    priceRange: "0.88 - 1.12",
    concentration: "High",
    category: "Volatile",
    isVerified: true,
    isFavorite: true,
    poolType: "Concentrated",
    feeTier: "0.01%",
    createdAt: "2024-01-05"
  },
  {
    id: "5",
    tokenA: { symbol: "USDT", name: "Tether", icon: "🔗", price: "$1.00" },
    tokenB: { symbol: "USDC", name: "USD Coin", icon: "💵", price: "$1.00" },
    tvl: "$5,678,901",
    volume24h: "$2,345,678",
    volume7d: "$15,678,901",
    apy: "3.45%",
    apyChange: "+0.12%",
    fees24h: "$2,345",
    fees7d: "$15,678",
    apr: "2.89%",
    aprChange: "+0.05%",
    liquidity: "$5,678,901",
    priceRange: "0.99 - 1.01",
    concentration: "Low",
    category: "Stable",
    isVerified: true,
    isFavorite: false,
    poolType: "Standard",
    feeTier: "0.01%",
    createdAt: "2024-01-01"
  }
]

const categories = ["All", "Stable", "Volatile", "Verified", "Favorites"]
const poolTypes = ["All", "Standard", "Concentrated"]
const feeTiers = ["All", "0.01%", "0.05%", "0.30%", "1.00%"]

export default function PoolsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedPoolType, setSelectedPoolType] = useState("All")
  const [selectedFeeTier, setSelectedFeeTier] = useState("All")
  const [sortBy, setSortBy] = useState("tvl")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [isCreatePoolOpen, setIsCreatePoolOpen] = useState(false)
  const [isPoolActionsOpen, setIsPoolActionsOpen] = useState(false)
  const [selectedPool, setSelectedPool] = useState<any>(null)

  const filteredPools = useMemo(() => {
    return mockPools.filter(pool => {
      const matchesSearch = searchTerm === "" || 
        pool.tokenA.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pool.tokenB.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pool.tokenA.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pool.tokenB.name.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === "All" || 
        (selectedCategory === "Verified" && pool.isVerified) ||
        (selectedCategory === "Favorites" && pool.isFavorite) ||
        pool.category === selectedCategory
      
      const matchesPoolType = selectedPoolType === "All" || pool.poolType === selectedPoolType
      const matchesFeeTier = selectedFeeTier === "All" || pool.feeTier === selectedFeeTier
      
      return matchesSearch && matchesCategory && matchesPoolType && matchesFeeTier
    }).sort((a, b) => {
      const aValue = parseFloat(a[sortBy as keyof typeof a]?.toString().replace(/[$,%]/g, '') || '0')
      const bValue = parseFloat(b[sortBy as keyof typeof b]?.toString().replace(/[$,%]/g, '') || '0')
      
      if (sortOrder === "asc") {
        return aValue - bValue
      } else {
        return bValue - aValue
      }
    })
  }, [searchTerm, selectedCategory, selectedPoolType, selectedFeeTier, sortBy, sortOrder])

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("desc")
    }
  }

  const handlePoolAction = (pool: any, action: string) => {
    setSelectedPool({ ...pool, action })
    setIsPoolActionsOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Layers className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium">Liquidity Provision</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Liquidity Pools
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Provide liquidity and earn fees from trading activity across multiple pools
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total TVL</p>
                    <p className="text-2xl font-bold">$13.8M</p>
                    <p className="text-xs text-green-500 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +12.5%
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
                    <p className="text-sm font-medium text-muted-foreground">24h Volume</p>
                    <p className="text-2xl font-bold">$6.2M</p>
                    <p className="text-xs text-green-500 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +8.3%
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Pools</p>
                    <p className="text-2xl font-bold">127</p>
                    <p className="text-xs text-blue-500 flex items-center">
                      <Shield className="h-3 w-3 mr-1" />
                      +5 new
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Avg. APY</p>
                    <p className="text-2xl font-bold">14.8%</p>
                    <p className="text-xs text-green-500 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +2.1%
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search pools by token name or symbol..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="text-xs"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 mt-4">
                {/* Pool Type Filter */}
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Type:</span>
                  <div className="flex gap-1">
                    {poolTypes.map((type) => (
                      <Button
                        key={type}
                        variant={selectedPoolType === type ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedPoolType(type)}
                        className="text-xs h-8"
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Fee Tier Filter */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Fee:</span>
                  <div className="flex gap-1">
                    {feeTiers.map((tier) => (
                      <Button
                        key={tier}
                        variant={selectedFeeTier === tier ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedFeeTier(tier)}
                        className="text-xs h-8"
                      >
                        {tier}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pools Table */}
          <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Pools ({filteredPools.length})</span>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span>Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent border-none outline-none"
                  >
                    <option value="tvl">TVL</option>
                    <option value="volume24h">24h Volume</option>
                    <option value="apy">APY</option>
                    <option value="fees24h">24h Fees</option>
                  </select>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  >
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium text-muted-foreground">Pool</th>
                      <th className="text-right p-4 font-medium text-muted-foreground">TVL</th>
                      <th className="text-right p-4 font-medium text-muted-foreground">24h Volume</th>
                      <th className="text-right p-4 font-medium text-muted-foreground">APY</th>
                      <th className="text-right p-4 font-medium text-muted-foreground">24h Fees</th>
                      <th className="text-center p-4 font-medium text-muted-foreground">Type</th>
                      <th className="text-center p-4 font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPools.map((pool) => (
                      <tr key={pool.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className="flex -space-x-2">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold border-2 border-background">
                                {pool.tokenA.symbol[0]}
                              </div>
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white text-sm font-bold border-2 border-background">
                                {pool.tokenB.symbol[0]}
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-medium">
                                  {pool.tokenA.symbol}/{pool.tokenB.symbol}
                                </span>
                                {pool.isVerified && (
                                  <Shield className="h-4 w-4 text-blue-500" />
                                )}
                                {pool.isFavorite && (
                                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                )}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {pool.tokenA.name} / {pool.tokenB.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="font-medium">{pool.tvl}</div>
                          <div className="text-sm text-muted-foreground">{pool.liquidity}</div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="font-medium">{pool.volume24h}</div>
                          <div className="text-sm text-muted-foreground">{pool.volume7d} (7d)</div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="font-medium text-green-500">{pool.apy}</div>
                          <div className={cn(
                            "text-sm flex items-center justify-end",
                            pool.apyChange.startsWith("+") ? "text-green-500" : "text-red-500"
                          )}>
                            {pool.apyChange.startsWith("+") ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            )}
                            {pool.apyChange}
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="font-medium">{pool.fees24h}</div>
                          <div className="text-sm text-muted-foreground">{pool.fees7d} (7d)</div>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex flex-col items-center space-y-1">
                            <Badge variant="outline" className="text-xs">
                              {pool.poolType}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              {pool.feeTier}
                            </Badge>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePoolAction(pool, "add")}
                              className="text-xs"
                            >
                              Add Liquidity
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handlePoolAction(pool, "remove")}
                              className="text-xs"
                            >
                              Remove
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handlePoolAction(pool, "details")}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <CreatePoolModal
        isOpen={isCreatePoolOpen}
        onClose={() => setIsCreatePoolOpen(false)}
      />
      <PoolActionsModal
        isOpen={isPoolActionsOpen}
        onClose={() => setIsPoolActionsOpen(false)}
        pool={selectedPool}
      />
    </div>
  )
}



