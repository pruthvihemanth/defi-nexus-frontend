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
  Lock,
  Unlock,
  Award,
  Users,
  Coins,
  Wallet,
  Eye,
  EyeOff,
  Download,
  Filter,
  Search,
  ChevronDown,
  CheckCircle,
  XCircle
} from "lucide-react"
import { cn } from "@/lib/utils"
import { StakeForm } from "@/components/staking/stake-form"
import { UnstakeForm } from "@/components/staking/unstake-form"
import { StakingPools } from "@/components/staking/staking-pools"
import { ValidatorList } from "@/components/staking/validator-list"
import { RewardsOverview } from "@/components/staking/rewards-overview"
import { StakingHistory } from "@/components/staking/staking-history"
import { ClientOnly } from "@/components/ui/client-only"

// Mock data for staking
const mockStakingPools = [
  {
    id: "DNX",
    symbol: "DNX",
    name: "DeFi Nexus Token",
    icon: "🔷",
    apy: 12.5,
    totalStaked: 2500000,
    totalRewards: 312500,
    minStake: 100,
    maxStake: 1000000,
    lockPeriod: 0, // 0 = no lock period
    validatorFee: 0,
    isNative: true,
    stakingType: "native",
    description: "Stake DNX tokens to earn rewards and participate in governance",
    features: ["Governance Rights", "Fee Sharing", "Early Access", "Bonus Rewards"]
  },
  {
    id: "SOL",
    symbol: "SOL",
    name: "Solana",
    icon: "☀️",
    apy: 7.2,
    totalStaked: 15000000,
    totalRewards: 1080000,
    minStake: 0.1,
    maxStake: 100000,
    lockPeriod: 0,
    validatorFee: 5,
    isNative: false,
    stakingType: "delegated",
    description: "Delegate SOL to validators to earn staking rewards",
    features: ["Validator Rewards", "Network Security", "Liquid Staking"]
  }
]

const mockValidators = [
  {
    id: "1",
    name: "DeFi Nexus Validator",
    commission: 0,
    apy: 12.5,
    totalStake: 500000,
    uptime: 99.9,
    score: 100,
    isActive: true,
    isVerified: true,
    description: "Official DeFi Nexus validator with zero commission"
  },
  {
    id: "2",
    name: "Marinade Finance",
    commission: 2,
    apy: 7.1,
    totalStake: 2000000,
    uptime: 99.8,
    score: 98,
    isActive: true,
    isVerified: true,
    description: "Leading liquid staking protocol on Solana"
  },
  {
    id: "3",
    name: "Lido",
    commission: 3,
    apy: 7.0,
    totalStake: 1500000,
    uptime: 99.7,
    score: 97,
    isActive: true,
    isVerified: true,
    description: "Decentralized staking protocol"
  },
  {
    id: "4",
    name: "Jupiter Validator",
    commission: 4,
    apy: 6.9,
    totalStake: 800000,
    uptime: 99.5,
    score: 95,
    isActive: true,
    isVerified: false,
    description: "Community validator with competitive rates"
  }
]

const mockUserStakes = [
  {
    id: "1",
    pool: "DNX",
    amount: 5000,
    stakedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 30 days ago
    apy: 12.5,
    rewards: 156.25,
    validator: "DeFi Nexus Validator",
    status: "active"
  },
  {
    id: "2",
    pool: "SOL",
    amount: 100,
    stakedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15), // 15 days ago
    apy: 7.2,
    rewards: 2.96,
    validator: "Marinade Finance",
    status: "active"
  }
]

export default function StakePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedPool, setSelectedPool] = useState(mockStakingPools[0])
  const [actionType, setActionType] = useState<"stake" | "unstake">("stake")
  const [showValues, setShowValues] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Lock className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium">Secure Staking</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Staking
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stake DNX and SOL tokens to earn rewards and secure the network
            </p>
          </div>

          {/* Staking Stats */}
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
                      <p className="text-sm font-medium text-muted-foreground">Total Staked</p>
                      <p className="text-2xl font-bold">
                        {showValues ? `$${mockUserStakes.reduce((sum, stake) => sum + stake.amount, 0).toLocaleString()}` : "••••••"}
                      </p>
                      <p className="text-xs text-green-500 flex items-center">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +{mockUserStakes.reduce((sum, stake) => sum + (stake.amount * stake.apy / 100), 0).toFixed(2)}% APY
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <Lock className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Rewards</p>
                      <p className="text-2xl font-bold text-green-500">
                        {showValues ? `$${mockUserStakes.reduce((sum, stake) => sum + stake.rewards, 0).toLocaleString()}` : "••••••"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Available to claim
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Stakes</p>
                    <p className="text-2xl font-bold">{mockUserStakes.length}</p>
                    <p className="text-xs text-muted-foreground">
                      {mockUserStakes.filter(s => s.status === "active").length} active
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Network APY</p>
                      <p className="text-2xl font-bold text-blue-500">
                        {(mockStakingPools.reduce((sum, pool) => sum + pool.apy, 0) / mockStakingPools.length).toFixed(1)}%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Average across all pools
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

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Staking Pools */}
            <div className="xl:col-span-1">
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Staking Pools</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-1">
                    {mockStakingPools.map((pool) => (
                      <div
                        key={pool.id}
                        className={cn(
                          "flex items-center justify-between p-3 cursor-pointer transition-colors hover:bg-muted/50",
                          selectedPool.id === pool.id ? "bg-primary/10 border-r-2 border-primary" : ""
                        )}
                        onClick={() => setSelectedPool(pool)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                            {pool.icon}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{pool.symbol}</div>
                            <div className="text-xs text-muted-foreground">{pool.name}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-sm text-green-500">{pool.apy.toFixed(1)}% APY</div>
                          <div className="text-xs text-muted-foreground">
                            {showValues ? `$${pool.totalStaked.toLocaleString()}` : "••••••"} staked
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Staking Area */}
            <div className="xl:col-span-3">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Stake/Unstake Forms */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Action Tabs */}
                  <Tabs value={actionType} onValueChange={(value) => setActionType(value as "stake" | "unstake")} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="stake" className="flex items-center space-x-2">
                        <Lock className="h-4 w-4" />
                        <span>Stake</span>
                      </TabsTrigger>
                      <TabsTrigger value="unstake" className="flex items-center space-x-2">
                        <Unlock className="h-4 w-4" />
                        <span>Unstake</span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="stake" className="mt-6">
                      <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="text-lg">Stake {selectedPool.symbol}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <StakeForm pool={selectedPool} showValues={showValues} />
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="unstake" className="mt-6">
                      <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="text-lg">Unstake {selectedPool.symbol}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <UnstakeForm pool={selectedPool} showValues={showValues} />
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>

                  {/* Staking Pools */}
                  <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg">All Staking Pools</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <StakingPools pools={mockStakingPools} showValues={showValues} />
                    </CardContent>
                  </Card>
                </div>

                {/* Side Panel */}
                <div className="space-y-6">
                  {/* Pool Info */}
                  <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg">Pool Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">APY:</span>
                          <div className="font-medium text-green-500">{selectedPool.apy.toFixed(2)}%</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Total Staked:</span>
                          <div className="font-medium">
                            {showValues ? `$${selectedPool.totalStaked.toLocaleString()}` : "••••••"}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Total Rewards:</span>
                          <div className="font-medium">
                            {showValues ? `$${selectedPool.totalRewards.toLocaleString()}` : "••••••"}
                          </div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Min Stake:</span>
                          <div className="font-medium">{selectedPool.minStake} {selectedPool.symbol}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Max Stake:</span>
                          <div className="font-medium">{selectedPool.maxStake.toLocaleString()} {selectedPool.symbol}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Lock Period:</span>
                          <div className="font-medium">
                            {selectedPool.lockPeriod === 0 ? "No lock" : `${selectedPool.lockPeriod} days`}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Rewards Overview */}
                  <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-lg">Your Rewards</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <RewardsOverview stakes={mockUserStakes} showValues={showValues} />
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Main Content Tabs */}
              <div className="mt-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="validators">Validators</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="mt-6">
                    <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-lg">Your Staking Overview</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <StakingPools pools={mockStakingPools} showValues={showValues} />
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="validators" className="mt-6">
                    <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-lg">Validators</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <ValidatorList validators={mockValidators} showValues={showValues} />
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="history" className="mt-6">
                    <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-lg">Staking History</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <StakingHistory stakes={mockUserStakes} showValues={showValues} />
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="analytics" className="mt-6">
                    <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-lg">Staking Analytics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-8 text-muted-foreground">
                          Analytics coming soon...
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



