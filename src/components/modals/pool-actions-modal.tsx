"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  X, 
  ArrowUpDown, 
  Zap, 
  TrendingUp, 
  TrendingDown,
  Info,
  AlertCircle,
  CheckCircle,
  DollarSign,
  BarChart3,
  Shield,
  Clock,
  Layers,
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"

interface PoolActionsModalProps {
  isOpen: boolean
  onClose: () => void
  pool: any
}

export function PoolActionsModal({ isOpen, onClose, pool }: PoolActionsModalProps) {
  const [activeTab, setActiveTab] = useState("add")
  const [tokenAAmount, setTokenAAmount] = useState("")
  const [tokenBAmount, setTokenBAmount] = useState("")
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })
  const [slippage, setSlippage] = useState("0.5")

  if (!pool) return null

  const handleAddLiquidity = () => {
    console.log("Adding liquidity:", { tokenAAmount, tokenBAmount, priceRange })
    onClose()
  }

  const handleRemoveLiquidity = () => {
    console.log("Removing liquidity:", { tokenAAmount, tokenBAmount })
    onClose()
  }

  const handleSwap = () => {
    console.log("Swapping tokens")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900 border-0 shadow-2xl">
        <DialogHeader className="space-y-4 text-center">
          <div className="flex items-center justify-between">
            <div className="flex-1 text-center">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                <Layers className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium text-white/90">Pool Management</span>
              </div>
              <div className="flex items-center justify-center space-x-3 mb-2">
                <div className="flex -space-x-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold border-2 border-background shadow-lg">
                    {pool.tokenA.symbol[0]}
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold border-2 border-background shadow-lg">
                    {pool.tokenB.symbol[0]}
                  </div>
                </div>
              </div>
              <DialogTitle className="text-3xl lg:text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {pool.tokenA.symbol}/{pool.tokenB.symbol}
                </span>
              </DialogTitle>
              <p className="text-lg text-muted-foreground">
                {pool.tokenA.name} / {pool.tokenB.name}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="add">Add Liquidity</TabsTrigger>
            <TabsTrigger value="remove">Remove</TabsTrigger>
            <TabsTrigger value="swap">Swap</TabsTrigger>
          </TabsList>

          {/* Add Liquidity Tab */}
          <TabsContent value="add" className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Token A Amount */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Amount of {pool.tokenA.symbol}</label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="0.0"
                      value={tokenAAmount}
                      onChange={(e) => setTokenAAmount(e.target.value)}
                      className="text-lg pr-20"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Max</span>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                        {pool.tokenA.balance}
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Balance: {pool.tokenA.balance}</span>
                    <span>≈ ${(parseFloat(tokenAAmount || "0") * parseFloat(pool.tokenA.price.replace("$", ""))).toFixed(2)}</span>
                  </div>
                </div>

                {/* Token B Amount */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Amount of {pool.tokenB.symbol}</label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="0.0"
                      value={tokenBAmount}
                      onChange={(e) => setTokenBAmount(e.target.value)}
                      className="text-lg pr-20"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">Max</span>
                      <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                        {pool.tokenB.balance}
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Balance: {pool.tokenB.balance}</span>
                    <span>≈ ${(parseFloat(tokenBAmount || "0") * parseFloat(pool.tokenB.price.replace("$", ""))).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Price Range</label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Input
                      type="number"
                      placeholder="Min Price"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Input
                      type="number"
                      placeholder="Max Price"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Current: {pool.priceRange}
                </p>
              </div>

              {/* Slippage */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Slippage Tolerance</label>
                <div className="flex space-x-2">
                  {["0.1%", "0.5%", "1%", "Custom"].map((option) => (
                    <Button
                      key={option}
                      variant={slippage === option ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSlippage(option)}
                      className="text-xs"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Pool Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pool Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Pool Type:</span>
                    <div className="font-medium">{pool.poolType}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Fee Tier:</span>
                    <div className="font-medium">{pool.feeTier}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Current APY:</span>
                    <div className="font-medium text-green-500">{pool.apy}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">TVL:</span>
                    <div className="font-medium">{pool.tvl}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleAddLiquidity}
              className="w-full h-12 text-lg font-medium"
              variant="gradient"
            >
              <Zap className="mr-2 h-5 w-5" />
              Add Liquidity
            </Button>
          </TabsContent>

          {/* Remove Liquidity Tab */}
          <TabsContent value="remove" className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="flex items-center space-x-2 mb-2">
                  <Info className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">Your Liquidity Position</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">LP Tokens:</span>
                    <div className="font-medium">0.0 LP</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Value:</span>
                    <div className="font-medium">$0.00</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Fees Earned:</span>
                    <div className="font-medium text-green-500">$0.00</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">APY:</span>
                    <div className="font-medium">{pool.apy}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Amount to Remove</label>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={tokenAAmount}
                    onChange={(e) => setTokenAAmount(e.target.value)}
                    className="text-lg pr-20"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <span className="text-sm text-muted-foreground">LP</span>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Available: 0.0 LP</span>
                  <span>≈ $0.00</span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleRemoveLiquidity}
              className="w-full h-12 text-lg font-medium"
              variant="destructive"
            >
              Remove Liquidity
            </Button>
          </TabsContent>

          {/* Swap Tab */}
          <TabsContent value="swap" className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* From Token */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">From</label>
                  <div className="flex items-center space-x-3 p-4 rounded-xl border bg-muted/50">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                      {pool.tokenA.symbol[0]}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{pool.tokenA.symbol}</div>
                      <div className="text-sm text-muted-foreground">{pool.tokenA.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Balance: {pool.tokenA.balance}</div>
                    </div>
                  </div>
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={tokenAAmount}
                    onChange={(e) => setTokenAAmount(e.target.value)}
                    className="text-lg"
                  />
                </div>

                {/* Swap Button */}
                <div className="flex justify-center items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-12 w-12"
                  >
                    <ArrowUpDown className="h-5 w-5" />
                  </Button>
                </div>

                {/* To Token */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">To</label>
                  <div className="flex items-center space-x-3 p-4 rounded-xl border bg-muted/50">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold">
                      {pool.tokenB.symbol[0]}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{pool.tokenB.symbol}</div>
                      <div className="text-sm text-muted-foreground">{pool.tokenB.name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Balance: {pool.tokenB.balance}</div>
                    </div>
                  </div>
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={tokenBAmount}
                    onChange={(e) => setTokenBAmount(e.target.value)}
                    className="text-lg"
                  />
                </div>
              </div>

              {/* Swap Details */}
              <div className="space-y-2 p-4 rounded-xl bg-muted/30">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rate</span>
                  <span>1 {pool.tokenA.symbol} = 0.98 {pool.tokenB.symbol}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Price Impact</span>
                  <span className="text-green-500">0.01%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Minimum Received</span>
                  <span>0.97 {pool.tokenB.symbol}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Network Fee</span>
                  <span>0.000005 SOL</span>
                </div>
              </div>
            </div>

            <Button
              onClick={handleSwap}
              className="w-full h-12 text-lg font-medium"
              variant="gradient"
            >
              <Zap className="mr-2 h-5 w-5" />
              Swap Tokens
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}



