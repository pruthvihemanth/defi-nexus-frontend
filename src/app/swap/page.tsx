"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUpDown, Settings, Zap, TrendingUp, Shield, Clock, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"
import { SwapSettingsModal } from "@/components/modals/swap-settings-modal"
import { MoonPayBuyModal } from "@/components/modals/moonpay-buy-modal"

const mockTokens = [
  { symbol: "SOL", name: "Solana", balance: "1,234.56", price: "$98.45", change: "+2.34%" },
  { symbol: "USDC", name: "USD Coin", balance: "5,678.90", price: "$1.00", change: "0.00%" },
  { symbol: "RAY", name: "Raydium", balance: "0.00", price: "$3.21", change: "+5.67%" },
  { symbol: "JUP", name: "Jupiter", balance: "0.00", price: "$0.45", change: "-1.23%" },
]

interface SwapSettings {
  slippageTolerance: string
  transactionDeadline: string
  expertMode: boolean
  multiHop: boolean
  autoRouter: boolean
  showRoute: boolean
}

export default function SwapPage() {
  const [fromToken, setFromToken] = useState(mockTokens[0])
  const [toToken, setToToken] = useState(mockTokens[1])
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [slippage, setSlippage] = useState("0.5")
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false)
  const [settings, setSettings] = useState<SwapSettings>({
    slippageTolerance: "0.5",
    transactionDeadline: "20",
    expertMode: false,
    multiHop: true,
    autoRouter: true,
    showRoute: true
  })

  const handleSwapTokens = () => {
    const temp = fromToken
    setFromToken(toToken)
    setToToken(temp)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  const handleSettingsChange = (newSettings: SwapSettings) => {
    setSettings(newSettings)
    setSlippage(newSettings.slippageTolerance)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Zap className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium">Instant Token Trading</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Swap Tokens
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Execute seamless token swaps with optimal pricing across Solana's leading decentralized exchanges
            </p>
          </div>

          {/* Buy Crypto Section */}
          <div className="mb-8">
            <Card className="border-0 shadow-xl bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 backdrop-blur-sm border-green-500/20">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                      <CreditCard className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-green-700 dark:text-green-300">Need Crypto to Get Started?</h3>
                      <p className="text-sm text-green-600/80 dark:text-green-400/80">Buy SOL, ETH, BTC and more with your credit card</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => setIsBuyModalOpen(true)}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 px-8 py-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <CreditCard className="mr-2 h-5 w-5" />
                    Buy Crypto Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Swap Interface */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">Swap</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setIsSettingsOpen(true)}
                      className="hover:bg-accent/50"
                    >
                      <Settings className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* From Token */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">From</label>
                    <div className="flex items-center space-x-3 p-4 rounded-xl border bg-muted/50">
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                          {fromToken.symbol[0]}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{fromToken.symbol}</div>
                          <div className="text-sm text-muted-foreground">{fromToken.name}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Balance: {fromToken.balance}</div>
                        <div className="text-xs text-muted-foreground">{fromToken.price}</div>
                      </div>
                    </div>
                    <Input
                      type="number"
                      placeholder="0.0"
                      value={fromAmount}
                      onChange={(e) => setFromAmount(e.target.value)}
                      className="text-2xl font-medium border-0 bg-transparent focus-visible:ring-0 p-0"
                    />
                  </div>

                  {/* Swap Button */}
                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleSwapTokens}
                      className="rounded-full h-12 w-12 border-2 hover:bg-accent"
                    >
                      <ArrowUpDown className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* To Token */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">To</label>
                    <div className="flex items-center space-x-3 p-4 rounded-xl border bg-muted/50">
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold">
                          {toToken.symbol[0]}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{toToken.symbol}</div>
                          <div className="text-sm text-muted-foreground">{toToken.name}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Balance: {toToken.balance}</div>
                        <div className="text-xs text-muted-foreground">{toToken.price}</div>
                      </div>
                    </div>
                    <Input
                      type="number"
                      placeholder="0.0"
                      value={toAmount}
                      onChange={(e) => setToAmount(e.target.value)}
                      className="text-2xl font-medium border-0 bg-transparent focus-visible:ring-0 p-0"
                    />
                  </div>

                  {/* Swap Details */}
                  <div className="space-y-2 p-4 rounded-xl bg-muted/30">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Rate</span>
                      <span>1 {fromToken.symbol} = 0.98 {toToken.symbol}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Price Impact</span>
                      <span className="text-green-500">0.01%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Minimum Received</span>
                      <span>0.97 {toToken.symbol}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Slippage Tolerance</span>
                      <span className="flex items-center space-x-1">
                        <span>{settings.slippageTolerance}%</span>
                        {settings.expertMode && (
                          <span className="text-xs bg-orange-500/20 text-orange-600 dark:text-orange-400 px-1.5 py-0.5 rounded-full">
                            Expert
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Network Fee</span>
                      <span>0.000005 SOL</span>
                    </div>
                    {settings.showRoute && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Route</span>
                        <span className="text-blue-500">Multi-hop via Raydium</span>
                      </div>
                    )}
                  </div>

                  {/* Swap Button */}
                  <Button className="w-full h-12 text-lg font-medium" variant="gradient">
                    <Zap className="mr-2 h-5 w-5" />
                    Swap Now
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Market Info & Stats */}
            <div className="space-y-6">
              {/* Market Stats */}
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Market Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm">24h Volume</span>
                    </div>
                    <span className="font-medium">$2.4M</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-blue-500" />
                      <span className="text-sm">TVL</span>
                    </div>
                    <span className="font-medium">$45.2M</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-purple-500" />
                      <span className="text-sm">Avg. Time</span>
                    </div>
                    <span className="font-medium">2.3s</span>
                  </div>
                </CardContent>
              </Card>

              {/* Top Tokens */}
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Top Tokens</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockTokens.map((token, index) => (
                      <div
                        key={token.symbol}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors",
                          fromToken.symbol === token.symbol || toToken.symbol === token.symbol
                            ? "bg-primary/10 border border-primary/20"
                            : "hover:bg-muted/50"
                        )}
                        onClick={() => {
                          if (fromToken.symbol !== token.symbol && toToken.symbol !== token.symbol) {
                            setFromToken(token)
                          }
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                            {token.symbol[0]}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{token.symbol}</div>
                            <div className="text-xs text-muted-foreground">{token.name}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-sm">{token.price}</div>
                          <div className={cn(
                            "text-xs",
                            token.change.startsWith("+") ? "text-green-500" : "text-red-500"
                          )}>
                            {token.change}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Swap Settings Modal */}
      <SwapSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSettingsChange={handleSettingsChange}
      />

      {/* MoonPay Buy Modal */}
      <MoonPayBuyModal
        isOpen={isBuyModalOpen}
        onClose={() => setIsBuyModalOpen(false)}
      />
    </div>
  )
}



