"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  X, 
  DollarSign, 
  Coins, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Wallet, 
  Zap, 
  Lock, 
  Unlock, 
  Calculator, 
  BarChart3, 
  Users, 
  Target, 
  Calendar, 
  Percent,
  ArrowUpRight,
  ExternalLink,
  Copy,
  Eye,
  EyeOff
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Project {
  id: string
  name: string
  symbol: string
  description: string
  logo: string
  category: string
  status: string
  raised: string
  target: string
  participants: number
  price: string
  marketCap: string
  liquidity: string
  volume24h: string
  change24h: string
  socials: {
    twitter: string
    telegram: string
    website: string
  }
  isVerified: boolean
  isTrending: boolean
  isFeatured: boolean
  isFavorite: boolean
  launchDate: string
  endDate: string
  vestingPeriod: string
  minInvestment: string
  maxInvestment: string
  totalSupply: string
  tokensForSale: string
  teamAllocation: string
  liquidityAllocation: string
  marketingAllocation: string
  communityAllocation: string
  kycRequired: boolean
  auditStatus: string
  riskLevel: string
  tags: string[]
  whitepaper: string
  roadmap: Array<{
    phase: string
    description: string
    status: string
  }>
}

interface InvestModalProps {
  isOpen: boolean
  onClose: () => void
  project: Project | null
}

export function InvestModal({ isOpen, onClose, project }: InvestModalProps) {
  const [activeTab, setActiveTab] = useState("invest")
  const [investmentAmount, setInvestmentAmount] = useState("")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("SOL")
  const [isConfirming, setIsConfirming] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)

  if (!project) return null

  const paymentMethods = [
    { symbol: "SOL", name: "Solana", balance: "12.45", icon: "☀️" },
    { symbol: "USDC", name: "USD Coin", balance: "1,250.00", icon: "💵" },
    { symbol: "USDT", name: "Tether", balance: "850.00", icon: "🔗" }
  ]

  const calculateTokens = () => {
    if (!investmentAmount || !project.price) return "0"
    const amount = parseFloat(investmentAmount)
    const price = parseFloat(project.price.replace("$", ""))
    return (amount / price).toLocaleString()
  }

  const calculateBonus = () => {
    if (!investmentAmount) return "0"
    const amount = parseFloat(investmentAmount)
    // Example bonus calculation based on investment amount
    if (amount >= 10000) return "15%"
    if (amount >= 5000) return "10%"
    if (amount >= 1000) return "5%"
    return "0%"
  }

  const calculateBonusTokens = () => {
    const tokens = parseFloat(calculateTokens().replace(/,/g, ""))
    const bonusPercent = parseFloat(calculateBonus().replace("%", ""))
    return (tokens * bonusPercent / 100).toLocaleString()
  }

  const calculateTotalTokens = () => {
    const baseTokens = parseFloat(calculateTokens().replace(/,/g, ""))
    const bonusTokens = parseFloat(calculateBonusTokens().replace(/,/g, ""))
    return (baseTokens + bonusTokens).toLocaleString()
  }

  const handleInvest = async () => {
    setIsConfirming(true)
    try {
      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 3000))
      console.log("Investment completed:", {
        project: project.id,
        amount: investmentAmount,
        paymentMethod: selectedPaymentMethod,
        tokens: calculateTotalTokens()
      })
      onClose()
    } catch (error) {
      console.error("Investment failed:", error)
    } finally {
      setIsConfirming(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live": return "bg-green-500"
      case "Upcoming": return "bg-blue-500"
      case "Ended": return "bg-gray-500"
      default: return "bg-gray-500"
    }
  }

  const progressPercentage = (parseFloat(project.raised.replace(/[$,]/g, '')) / parseFloat(project.target.replace(/[$,]/g, ''))) * 100

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-3">
              <div className="text-2xl">{project.logo}</div>
              <div>
                <h2 className="text-xl font-bold">{project.name}</h2>
                <p className="text-sm text-muted-foreground">${project.symbol}</p>
              </div>
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge className={cn("text-white", getStatusColor(project.status))}>
                {project.status}
              </Badge>
              <Badge variant="outline">Price: {project.price}</Badge>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Progress</p>
              <p className="text-lg font-bold">{progressPercentage.toFixed(1)}%</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-500 to-red-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="h-5 w-5 mx-auto mb-1 text-green-500" />
                <p className="text-xs text-muted-foreground">Raised</p>
                <p className="text-sm font-bold">{project.raised}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Target className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                <p className="text-xs text-muted-foreground">Target</p>
                <p className="text-sm font-bold">{project.target}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-5 w-5 mx-auto mb-1 text-purple-500" />
                <p className="text-xs text-muted-foreground">Participants</p>
                <p className="text-sm font-bold">{project.participants.toLocaleString()}</p>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="invest">Invest</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>

            <TabsContent value="invest" className="space-y-6">
              {/* Investment Amount */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5" />
                    <span>Investment Amount</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Amount (USD)</label>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                      className="text-lg"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Min: {project.minInvestment}</span>
                      <span>Max: {project.maxInvestment}</span>
                    </div>
                  </div>

                  {/* Quick Amount Buttons */}
                  <div className="grid grid-cols-4 gap-2">
                    {[100, 500, 1000, 5000].map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        size="sm"
                        onClick={() => setInvestmentAmount(amount.toString())}
                        className="text-xs"
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Wallet className="h-5 w-5" />
                    <span>Payment Method</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.symbol}
                      className={cn(
                        "flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors",
                        selectedPaymentMethod === method.symbol
                          ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                          : "border-gray-200 hover:border-gray-300"
                      )}
                      onClick={() => setSelectedPaymentMethod(method.symbol)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-xl">{method.icon}</div>
                        <div>
                          <p className="font-medium">{method.symbol}</p>
                          <p className="text-sm text-muted-foreground">{method.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{method.balance}</p>
                        <p className="text-xs text-muted-foreground">Available</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Investment Summary */}
              {investmentAmount && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calculator className="h-5 w-5" />
                      <span>Investment Summary</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Investment Amount</span>
                        <span className="font-medium">${investmentAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Token Price</span>
                        <span className="font-medium">{project.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tokens to Receive</span>
                        <span className="font-medium">{calculateTokens()} {project.symbol}</span>
                      </div>
                      {calculateBonus() !== "0%" && (
                        <>
                          <div className="flex justify-between text-green-600">
                            <span>Early Bird Bonus ({calculateBonus()})</span>
                            <span className="font-medium">+{calculateBonusTokens()} {project.symbol}</span>
                          </div>
                          <div className="flex justify-between border-t pt-2">
                            <span className="font-medium">Total Tokens</span>
                            <span className="font-bold text-lg">{calculateTotalTokens()} {project.symbol}</span>
                          </div>
                        </>
                      )}
                    </div>

                    {calculateBonus() !== "0%" && (
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-medium text-green-700 dark:text-green-300">
                            You qualify for {calculateBonus()} early bird bonus!
                          </span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Vesting Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Vesting Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Vesting Period</span>
                      <span className="font-medium">{project.vestingPeriod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">First Unlock</span>
                      <span className="font-medium">At TGE</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Remaining</span>
                      <span className="font-medium">Linear vesting</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-blue-700 dark:text-blue-300">Vesting Schedule</p>
                        <p className="text-blue-600 dark:text-blue-400 mt-1">
                          {project.vestingPeriod === "No Vesting" 
                            ? "Tokens will be immediately available after purchase."
                            : `Tokens will be released linearly over ${project.vestingPeriod} starting from token generation event (TGE).`
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Risk Warning */}
              <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-yellow-700 dark:text-yellow-300">Risk Warning</p>
                      <p className="text-yellow-600 dark:text-yellow-400 mt-1">
                        Investing in tokens involves significant risk. Only invest what you can afford to lose. 
                        Past performance does not guarantee future results.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                  onClick={handleInvest}
                  disabled={!investmentAmount || isConfirming || parseFloat(investmentAmount) < parseFloat(project.minInvestment.replace("$", ""))}
                >
                  {isConfirming ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Invest Now
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Category</p>
                      <p className="font-medium">{project.category}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Launch Date</p>
                      <p className="font-medium">{project.launchDate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">End Date</p>
                      <p className="font-medium">{project.endDate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Risk Level</p>
                      <p className="font-medium">{project.riskLevel}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Token Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Supply</span>
                      <span className="font-medium">{project.totalSupply}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tokens for Sale</span>
                      <span className="font-medium">{project.tokensForSale}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Current Price</span>
                      <span className="font-medium">{project.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Market Cap</span>
                      <span className="font-medium">{project.marketCap}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Allocation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Team</span>
                      <span className="font-medium">{project.teamAllocation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Liquidity</span>
                      <span className="font-medium">{project.liquidityAllocation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Marketing</span>
                      <span className="font-medium">{project.marketingAllocation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Community</span>
                      <span className="font-medium">{project.communityAllocation}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Audit Status</span>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          project.auditStatus === "Completed" ? "text-green-500 border-green-500" :
                          project.auditStatus === "In Progress" ? "text-yellow-500 border-yellow-500" :
                          "text-red-500 border-red-500"
                        )}
                      >
                        {project.auditStatus}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">KYC Required</span>
                      <Badge variant="outline">
                        {project.kycRequired ? "Yes" : "No"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Verification</span>
                      <div className="flex items-center space-x-1">
                        {project.isVerified && <Shield className="h-4 w-4 text-blue-500" />}
                        <span className="text-sm">{project.isVerified ? "Verified" : "Unverified"}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
