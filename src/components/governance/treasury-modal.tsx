"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  PieChart,
  BarChart3,
  Wallet,
  Coins,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  EyeOff,
  Copy,
  ExternalLink,
  Calendar,
  Clock,
  Target,
  Shield,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  Plus,
  Minus,
  RefreshCw,
  Settings,
  Download,
  Upload,
  Send,
  ArrowDown,
  History,
  Activity,
  Award,
  Star,
  Flame,
  Crown,
  Zap,
  Globe,
  Lock,
  Unlock,
  Users,
  FileText,
  MessageSquare,
  Hash,
  Tag,
  Flag,
  Bookmark,
  Share2,
  Heart,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  Maximize,
  Minimize,
  X,
  Check,
  AlertCircle,
  CheckCircle2,
  Timer,
  Percent,
  TrendingUp as TrendingUpIcon
} from "lucide-react"
import { cn } from "@/lib/utils"

interface TreasuryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TreasuryModal({ open, onOpenChange }: TreasuryModalProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [showPrivate, setShowPrivate] = useState(false)

  const mockTreasuryData = {
    totalValue: 12400000,
    available: 2100000,
    allocated: 10300000,
    monthlyChange: 8.2,
    assets: [
      { symbol: "SOL", amount: 50000, value: 5000000, change: 12.5 },
      { symbol: "USDC", amount: 3000000, value: 3000000, change: 0.1 },
      { symbol: "USDT", amount: 2000000, value: 2000000, change: 0.2 },
      { symbol: "ETH", amount: 1000, value: 2400000, change: 15.8 }
    ],
    allocations: [
      { category: "Liquidity Pools", amount: 5000000, percentage: 40.3 },
      { category: "Staking Rewards", amount: 3000000, percentage: 24.2 },
      { category: "Development Fund", amount: 2000000, percentage: 16.1 },
      { category: "Marketing", amount: 1500000, percentage: 12.1 },
      { category: "Emergency Reserve", amount: 900000, percentage: 7.3 }
    ],
    transactions: [
      {
        type: "Deposit",
        amount: 500000,
        asset: "USDC",
        timestamp: "2024-01-15T10:30:00Z",
        description: "Revenue from trading fees"
      },
      {
        type: "Withdrawal",
        amount: 100000,
        asset: "SOL",
        timestamp: "2024-01-14T15:45:00Z",
        description: "Development team payment"
      },
      {
        type: "Swap",
        amount: 250000,
        asset: "ETH",
        timestamp: "2024-01-13T09:20:00Z",
        description: "Asset rebalancing"
      }
    ]
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <DollarSign className="h-6 w-6 mr-2 text-green-500" />
            Treasury Management
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
            <TabsTrigger value="allocations">Allocations</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Treasury Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                      <p className="text-3xl font-bold">{formatCurrency(mockTreasuryData.totalValue)}</p>
                      <p className="text-xs text-green-500 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +{mockTreasuryData.monthlyChange}% this month
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Available</p>
                      <p className="text-3xl font-bold">{formatCurrency(mockTreasuryData.available)}</p>
                      <p className="text-xs text-blue-500 flex items-center">
                        <Wallet className="h-3 w-3 mr-1" />
                        Ready for allocation
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                      <Wallet className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Allocated</p>
                      <p className="text-3xl font-bold">{formatCurrency(mockTreasuryData.allocated)}</p>
                      <p className="text-xs text-purple-500 flex items-center">
                        <Target className="h-3 w-3 mr-1" />
                        In active use
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                      <Target className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Asset Distribution Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <PieChart className="h-5 w-5 mr-2" />
                  Asset Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {mockTreasuryData.assets.map((asset, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{asset.symbol[0]}</span>
                          </div>
                          <div>
                            <p className="font-semibold">{asset.symbol}</p>
                            <p className="text-sm text-muted-foreground">{formatNumber(asset.amount)} tokens</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(asset.value)}</p>
                          <p className={cn(
                            "text-xs flex items-center",
                            asset.change >= 0 ? "text-green-500" : "text-red-500"
                          )}>
                            {asset.change >= 0 ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            )}
                            {asset.change >= 0 ? "+" : ""}{asset.change}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                      <div className="w-40 h-40 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center">
                        <PieChart className="h-16 w-16 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Coins className="h-5 w-5 mr-2" />
                  Asset Holdings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTreasuryData.assets.map((asset, index) => (
                    <div key={index} className="flex items-center justify-between p-6 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                          <span className="text-white font-bold">{asset.symbol[0]}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{asset.symbol}</h3>
                          <p className="text-sm text-muted-foreground">{formatNumber(asset.amount)} tokens</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold">{formatCurrency(asset.value)}</p>
                        <p className={cn(
                          "text-sm flex items-center justify-end",
                          asset.change >= 0 ? "text-green-500" : "text-red-500"
                        )}>
                          {asset.change >= 0 ? (
                            <TrendingUp className="h-4 w-4 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 mr-1" />
                          )}
                          {asset.change >= 0 ? "+" : ""}{asset.change}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="allocations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Fund Allocations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTreasuryData.allocations.map((allocation, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{allocation.category}</span>
                        <span className="text-sm text-muted-foreground">
                          {formatCurrency(allocation.amount)} ({allocation.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${allocation.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <History className="h-5 w-5 mr-2" />
                  Recent Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTreasuryData.transactions.map((tx, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center",
                          tx.type === "Deposit" ? "bg-green-100" : 
                          tx.type === "Withdrawal" ? "bg-red-100" : "bg-blue-100"
                        )}>
                          {tx.type === "Deposit" ? (
                            <ArrowDownRight className="h-5 w-5 text-green-600" />
                          ) : tx.type === "Withdrawal" ? (
                            <ArrowUpRight className="h-5 w-5 text-red-600" />
                          ) : (
                            <RefreshCw className="h-5 w-5 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{tx.type}</p>
                          <p className="text-sm text-muted-foreground">{tx.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {formatCurrency(tx.amount)} {tx.asset}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(tx.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}





