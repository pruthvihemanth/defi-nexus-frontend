"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CustomSelect } from "@/components/ui/select"
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Zap,
  Shield,
  Clock,
  DollarSign,
  Activity,
  Target,
  ChevronDown,
  Settings,
  RefreshCw,
  Star,
  MoreHorizontal,
  Minus,
  Plus,
  Eye,
  EyeOff
} from "lucide-react"
import { cn } from "@/lib/utils"
import { TradingChart } from "@/components/trading/trading-chart"
import { OrderBook } from "@/components/trading/order-book"

// Mock data for perpetuals
const mockMarkets = [
  {
    id: "SOL-PERP",
    symbol: "SOL",
    name: "Solana",
    price: 98.45,
    change24h: 2.34,
    changePercent: 2.44,
    volume24h: 1256789,
    openInterest: 4567890,
    fundingRate: 0.0001,
    indexPrice: 98.42,
    markPrice: 98.45,
    isFavorite: true,
    category: "Crypto"
  },
  {
    id: "BTC-PERP",
    symbol: "BTC",
    name: "Bitcoin",
    price: 43250.67,
    change24h: -1234.56,
    changePercent: -2.78,
    volume24h: 2345678,
    openInterest: 12345678,
    fundingRate: -0.0002,
    indexPrice: 43245.12,
    markPrice: 43250.67,
    isFavorite: false,
    category: "Crypto"
  },
  {
    id: "ETH-PERP",
    symbol: "ETH",
    name: "Ethereum",
    price: 2650.34,
    change24h: 45.67,
    changePercent: 1.75,
    volume24h: 3456789,
    openInterest: 8765432,
    fundingRate: 0.0003,
    indexPrice: 2648.90,
    markPrice: 2650.34,
    isFavorite: true,
    category: "Crypto"
  },
  {
    id: "RAY-PERP",
    symbol: "RAY",
    name: "Raydium",
    price: 3.21,
    change24h: 0.15,
    changePercent: 4.90,
    volume24h: 456789,
    openInterest: 1234567,
    fundingRate: 0.0005,
    indexPrice: 3.19,
    markPrice: 3.21,
    isFavorite: false,
    category: "Crypto"
  }
]

export default function PerpetualsPage() {
  const [selectedMarket, setSelectedMarket] = useState(mockMarkets[0])
  const [showMarketList, setShowMarketList] = useState(false)
  const [showOrderBook, setShowOrderBook] = useState(true)
  const [timeframe, setTimeframe] = useState("1H")
  const [orderType, setOrderType] = useState("Market")
  const [side, setSide] = useState("Long")
  const [leverage, setLeverage] = useState(10)
  const [size, setSize] = useState("")
  const [price, setPrice] = useState("")

  const timeframes = ["1m", "5m", "15m", "1H", "4H", "1D", "1W"]
  const orderTypes = ["Market", "Limit", "Stop", "Stop Limit"]
  const leverageOptions = [1, 2, 5, 10, 20, 50]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Zap className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium">Advanced Trading</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Perpetuals
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Trade perpetual futures with up to 50x leverage and advanced order types
            </p>
          </div>

          {/* Main Trading Interface */}
          <div className="grid grid-cols-12 gap-4 min-h-[calc(100vh-300px)]">
            
            {/* Left Column - Markets List */}
            <div className="col-span-3 space-y-4">
            {/* Markets List */}
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Markets</CardTitle>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {mockMarkets.map((market) => (
                      <div
                        key={market.id}
                        className={cn(
                          "flex items-center justify-between p-3 cursor-pointer transition-colors hover:bg-muted/50",
                          selectedMarket.id === market.id ? "bg-primary/10 border-r-2 border-primary" : ""
                        )}
                        onClick={() => setSelectedMarket(market)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                            {market.symbol[0]}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{market.symbol}</div>
                            <div className="text-xs text-muted-foreground">{market.name}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-sm">${market.price.toFixed(2)}</div>
                          <div className={cn(
                            "text-xs flex items-center justify-end",
                            market.changePercent >= 0 ? "text-green-500" : "text-red-500"
                          )}>
                            {market.changePercent >= 0 ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            )}
                            {market.changePercent.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Account Summary */}
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Account</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total PnL</span>
                    <span className="font-medium text-green-500">$0.00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Open Positions</span>
                    <span className="font-medium">0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Margin Used</span>
                    <span className="font-medium">$0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Available</span>
                    <span className="font-medium text-green-500">$5,000</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Center Column - Chart and Order Book */}
            <div className="col-span-6 space-y-4 flex flex-col">
                  {/* Chart */}
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm flex-1">
                <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex space-x-1">
                            {timeframes.map((tf) => (
                              <Button
                                key={tf}
                                variant={timeframe === tf ? "default" : "outline"}
                                size="sm"
                                onClick={() => setTimeframe(tf)}
                            className="text-xs h-7 px-2"
                              >
                                {tf}
                              </Button>
                            ))}
                          </div>
                        </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                      </div>
                    </CardHeader>
                <CardContent className="p-0 h-[350px] overflow-hidden">
                      <TradingChart 
                        symbol={selectedMarket.symbol}
                        timeframe={timeframe}
                    data={[]}
                      />
                    </CardContent>
                  </Card>

                  {/* Order Book */}
              {showOrderBook && (
                <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm flex-shrink-0">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium">Order Book</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setShowOrderBook(false)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <EyeOff className="h-4 w-4" />
                      </Button>
                    </div>
                    </CardHeader>
                  <CardContent className="p-0 h-[250px] overflow-y-auto">
                      <OrderBook market={selectedMarket} />
                    </CardContent>
                  </Card>
              )}
                </div>

            {/* Right Column - Trading Panel */}
            <div className="col-span-3 space-y-4">
                  {/* Trading Form */}
                  <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Trade</CardTitle>
                    <div className="flex space-x-1">
                      <Button
                        variant={side === "Long" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSide("Long")}
                        className={cn(
                          "text-xs h-6 px-2",
                          side === "Long" 
                            ? "bg-green-500 text-white" 
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        Long
                      </Button>
                      <Button
                        variant={side === "Short" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSide("Short")}
                        className={cn(
                          "text-xs h-6 px-2",
                          side === "Short" 
                            ? "bg-red-500 text-white" 
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        Short
                      </Button>
                    </div>
                  </div>
                    </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Type */}
                  <div>
                    <label className="text-xs text-muted-foreground mb-2 block">Order Type</label>
                    <CustomSelect
                      value={orderType}
                      onValueChange={setOrderType}
                      placeholder="Select order type"
                      options={orderTypes.map(type => ({ value: type, label: type }))}
                    />
                  </div>

                  {/* Size */}
                  <div>
                    <label className="text-xs text-muted-foreground mb-2 block">Size</label>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="0.00"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        className="pr-12"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">
                        {selectedMarket.symbol}
                      </div>
                    </div>
                  </div>

                  {/* Price (for Limit orders) */}
                  {orderType === "Limit" && (
                    <div>
                      <label className="text-xs text-muted-foreground mb-2 block">Price</label>
                      <div className="relative">
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          className="pr-8"
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground">
                          USDC
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Leverage */}
                  <div>
                    <label className="text-xs text-muted-foreground mb-2 block">Leverage</label>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setLeverage(Math.max(1, leverage - 1))}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <div className="flex-1 text-center">
                        <span className="text-sm font-medium">{leverage}x</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setLeverage(Math.min(50, leverage + 1))}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex space-x-1 mt-2">
                      {leverageOptions.map((lev) => (
                        <Button
                          key={lev}
                          variant={leverage === lev ? "default" : "outline"}
                          size="sm"
                          onClick={() => setLeverage(lev)}
                          className="text-xs h-6 px-2"
                        >
                          {lev}x
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Trade Button */}
                  <Button 
                    className={cn(
                      "w-full h-10 font-medium",
                      side === "Long" 
                        ? "bg-green-500 hover:bg-green-600 text-white" 
                        : "bg-red-500 hover:bg-red-600 text-white"
                    )}
                  >
                    {side} {selectedMarket.symbol}
                  </Button>
                    </CardContent>
                  </Card>

                  {/* Market Info */}
                  <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Market Info</CardTitle>
                    </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">24h Volume</span>
                    <span className="text-sm font-medium">${(selectedMarket.volume24h / 1000000).toFixed(1)}M</span>
                        </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Open Interest</span>
                    <span className="text-sm font-medium">${(selectedMarket.openInterest / 1000000).toFixed(1)}M</span>
                        </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Funding Rate</span>
                    <span className={cn(
                      "text-sm font-medium",
                            selectedMarket.fundingRate >= 0 ? "text-green-500" : "text-red-500"
                          )}>
                            {(selectedMarket.fundingRate * 100).toFixed(4)}%
                    </span>
                          </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Index Price</span>
                    <span className="text-sm font-medium">${selectedMarket.indexPrice.toFixed(2)}</span>
                        </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Mark Price</span>
                    <span className="text-sm font-medium">${selectedMarket.markPrice.toFixed(2)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

        </div>
      </div>
    </div>
  )
}
