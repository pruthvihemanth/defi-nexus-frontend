"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  X, 
  Search, 
  ChevronDown, 
  Info, 
  AlertCircle,
  CheckCircle,
  Zap,
  Shield,
  DollarSign,
  Layers,
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CreatePoolModalProps {
  isOpen: boolean
  onClose: () => void
}

const mockTokens = [
  { symbol: "SOL", name: "Solana", icon: "☀️", price: "$98.45", balance: "1,234.56" },
  { symbol: "USDC", name: "USD Coin", icon: "💵", price: "$1.00", balance: "5,678.90" },
  { symbol: "USDT", name: "Tether", icon: "🔗", price: "$1.00", balance: "2,345.67" },
  { symbol: "RAY", name: "Raydium", icon: "🌊", price: "$3.21", balance: "0.00" },
  { symbol: "JUP", name: "Jupiter", icon: "🪐", price: "$0.45", balance: "0.00" },
  { symbol: "ORCA", name: "Orca", icon: "🐋", price: "$2.34", balance: "0.00" },
  { symbol: "BONK", name: "Bonk", icon: "🐕", price: "$0.000012", balance: "0.00" },
  { symbol: "WIF", name: "Dogwifhat", icon: "🎩", price: "$1.23", balance: "0.00" },
]

const feeTiers = [
  { value: "0.01%", label: "0.01%", description: "Best for stable pairs", recommended: true },
  { value: "0.05%", label: "0.05%", description: "Best for most pairs", recommended: true },
  { value: "0.30%", label: "0.30%", description: "Best for exotic pairs", recommended: false },
  { value: "1.00%", label: "1.00%", description: "Best for very exotic pairs", recommended: false },
]

export function CreatePoolModal({ isOpen, onClose }: CreatePoolModalProps) {
  const [step, setStep] = useState(1)
  const [tokenA, setTokenA] = useState(mockTokens[0])
  const [tokenB, setTokenB] = useState(mockTokens[1])
  const [selectedFeeTier, setSelectedFeeTier] = useState("0.05%")
  const [initialPrice, setInitialPrice] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [isSelectingToken, setIsSelectingToken] = useState<"A" | "B" | null>(null)

  const filteredTokens = mockTokens.filter(token =>
    token.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    token.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleTokenSelect = (token: any) => {
    if (isSelectingToken === "A") {
      setTokenA(token)
    } else if (isSelectingToken === "B") {
      setTokenB(token)
    }
    setIsSelectingToken(null)
    setSearchTerm("")
  }

  const handleCreatePool = () => {
    // Handle pool creation logic here
    console.log("Creating pool:", { tokenA, tokenB, selectedFeeTier, initialPrice })
    onClose()
  }

  const isStepValid = () => {
    if (step === 1) return tokenA && tokenB && tokenA.symbol !== tokenB.symbol
    if (step === 2) return selectedFeeTier
    if (step === 3) return initialPrice && !isNaN(parseFloat(initialPrice))
    return false
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900 border-0 shadow-2xl">
        <DialogHeader className="space-y-4 text-center">
          <div className="flex items-center justify-between">
            <div className="flex-1 text-center">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                <Layers className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium text-white/90">Liquidity Creation</span>
              </div>
              <DialogTitle className="text-3xl lg:text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Create New Pool
                </span>
              </DialogTitle>
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
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  step >= stepNum 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground"
                )}>
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={cn(
                    "w-8 h-0.5 mx-2",
                    step > stepNum ? "bg-primary" : "bg-muted"
                  )} />
                )}
              </div>
            ))}
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Step 1: Token Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Select Token Pair</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Token A */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Token A</label>
                    <Button
                      variant="outline"
                      className="w-full justify-between h-12"
                      onClick={() => setIsSelectingToken("A")}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                          {tokenA.symbol[0]}
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{tokenA.symbol}</div>
                          <div className="text-sm text-muted-foreground">{tokenA.name}</div>
                        </div>
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Token B */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Token B</label>
                    <Button
                      variant="outline"
                      className="w-full justify-between h-12"
                      onClick={() => setIsSelectingToken("B")}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold">
                          {tokenB.symbol[0]}
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{tokenB.symbol}</div>
                          <div className="text-sm text-muted-foreground">{tokenB.name}</div>
                        </div>
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Token Selection Modal */}
                {isSelectingToken && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <Card className="w-full max-w-md mx-4">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle>Select Token {isSelectingToken}</CardTitle>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsSelectingToken(null)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search tokens..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </CardHeader>
                      <CardContent className="max-h-64 overflow-y-auto">
                        <div className="space-y-2">
                          {filteredTokens.map((token) => (
                            <Button
                              key={token.symbol}
                              variant="ghost"
                              className="w-full justify-start h-12"
                              onClick={() => handleTokenSelect(token)}
                              disabled={token.symbol === (isSelectingToken === "A" ? tokenB.symbol : tokenA.symbol)}
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                                  {token.symbol[0]}
                                </div>
                                <div className="text-left">
                                  <div className="font-medium">{token.symbol}</div>
                                  <div className="text-sm text-muted-foreground">{token.name}</div>
                                </div>
                              </div>
                              <div className="ml-auto text-right">
                                <div className="text-sm font-medium">{token.price}</div>
                                <div className="text-xs text-muted-foreground">Balance: {token.balance}</div>
                              </div>
                            </Button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={() => setStep(2)}
                  disabled={!isStepValid()}
                  variant="gradient"
                >
                  Next Step
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Fee Tier Selection */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Select Fee Tier</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {feeTiers.map((tier) => (
                    <Card
                      key={tier.value}
                      className={cn(
                        "cursor-pointer transition-all hover:shadow-md",
                        selectedFeeTier === tier.value
                          ? "ring-2 ring-primary border-primary"
                          : "hover:border-primary/50"
                      )}
                      onClick={() => setSelectedFeeTier(tier.value)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-medium">{tier.label}</div>
                          {tier.recommended && (
                            <Badge variant="success" className="text-xs">
                              Recommended
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{tier.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                >
                  Previous
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!isStepValid()}
                  variant="gradient"
                >
                  Next Step
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Initial Price */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Set Initial Price</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-2 mb-2">
                      <Info className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">Price Range</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Set the initial price for {tokenA.symbol}/{tokenB.symbol}. 
                      This determines the starting exchange rate between the tokens.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Initial Price ({tokenA.symbol} per {tokenB.symbol})
                    </label>
                    <Input
                      type="number"
                      placeholder="Enter initial price"
                      value={initialPrice}
                      onChange={(e) => setInitialPrice(e.target.value)}
                      className="text-lg"
                    />
                    <p className="text-xs text-muted-foreground">
                      Current market price: 1 {tokenA.symbol} = {tokenA.price} {tokenB.symbol}
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20">
                    <div className="flex items-start space-x-2">
                      <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-yellow-800 dark:text-yellow-200">
                          Important: Initial Price
                        </p>
                        <p className="text-yellow-700 dark:text-yellow-300 mt-1">
                          The initial price you set will determine the starting exchange rate. 
                          Make sure this reflects the current market conditions to avoid immediate arbitrage.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                >
                  Previous
                </Button>
                <Button
                  onClick={handleCreatePool}
                  disabled={!isStepValid()}
                  variant="gradient"
                  className="flex items-center space-x-2"
                >
                  <Zap className="h-4 w-4" />
                  <span>Create Pool</span>
                </Button>
              </div>
            </div>
          )}

          {/* Pool Summary */}
          <div className="p-4 rounded-lg bg-muted/50">
            <h4 className="font-medium mb-3">Pool Summary</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Token Pair:</span>
                <div className="font-medium">{tokenA.symbol}/{tokenB.symbol}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Fee Tier:</span>
                <div className="font-medium">{selectedFeeTier}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Initial Price:</span>
                <div className="font-medium">
                  {initialPrice ? `1 ${tokenA.symbol} = ${initialPrice} ${tokenB.symbol}` : "Not set"}
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Pool Type:</span>
                <div className="font-medium">Concentrated Liquidity</div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}



