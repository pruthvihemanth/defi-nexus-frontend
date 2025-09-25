"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Unlock, 
  DollarSign, 
  Percent, 
  Info,
  AlertTriangle,
  Zap,
  Shield,
  Clock,
  Award,
  ChevronDown
} from "lucide-react"
import { cn } from "@/lib/utils"

interface UnstakeFormProps {
  pool: any
  showValues: boolean
}

export function UnstakeForm({ pool, showValues }: UnstakeFormProps) {
  const [amount, setAmount] = useState("")
  const [unstakeType, setUnstakeType] = useState<"immediate" | "delayed">("immediate")

  const handleUnstake = () => {
    console.log("Unstaking:", { pool: pool.symbol, amount, type: unstakeType })
  }

  const handleQuickAmount = (percentage: number) => {
    const maxAmount = pool.symbol === "DNX" ? 5000 : 100 // Mock staked amount
    setAmount((maxAmount * percentage / 100).toString())
  }

  const estimatedRewards = parseFloat(amount || "0") * (pool.apy / 100)
  const estimatedDaily = estimatedRewards / 365

  const mockUserStakes = [
    { id: "1", amount: 5000, apy: 12.5, rewards: 156.25, validator: "DeFi Nexus Validator" },
    { id: "2", amount: 100, apy: 7.2, rewards: 2.96, validator: "Marinade Finance" }
  ]

  const userStake = mockUserStakes.find(s => s.validator.includes(pool.symbol === "DNX" ? "DeFi Nexus" : "Marinade"))

  return (
    <div className="space-y-6">
      {/* Pool Info */}
      <div className="flex items-center space-x-3 p-4 rounded-xl border bg-muted/50">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-orange-600 flex items-center justify-center text-white font-bold">
          {pool.icon}
        </div>
        <div className="flex-1">
          <div className="font-medium">{pool.symbol}</div>
          <div className="text-sm text-muted-foreground">{pool.name}</div>
        </div>
        <div className="text-right">
          <div className="font-medium text-red-500">Unstake</div>
          <div className="text-sm text-muted-foreground">
            {userStake ? `${userStake.amount.toLocaleString()} ${pool.symbol} staked` : "No stake found"}
          </div>
        </div>
      </div>

      {/* Current Stake Info */}
      {userStake && (
        <div className="p-4 rounded-lg border border-blue-200 bg-blue-50 dark:bg-blue-900/20">
          <div className="flex items-center space-x-2 mb-3">
            <Shield className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Current Stake</span>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-blue-700 dark:text-blue-300">Staked Amount:</span>
              <div className="font-medium text-blue-800 dark:text-blue-200">
                {userStake.amount.toLocaleString()} {pool.symbol}
              </div>
            </div>
            <div>
              <span className="text-blue-700 dark:text-blue-300">Current APY:</span>
              <div className="font-medium text-blue-800 dark:text-blue-200">
                {userStake.apy.toFixed(2)}%
              </div>
            </div>
            <div>
              <span className="text-blue-700 dark:text-blue-300">Pending Rewards:</span>
              <div className="font-medium text-blue-800 dark:text-blue-200">
                {showValues ? `$${userStake.rewards.toFixed(2)}` : "••••••"}
              </div>
            </div>
            <div>
              <span className="text-blue-700 dark:text-blue-300">Validator:</span>
              <div className="font-medium text-blue-800 dark:text-blue-200">
                {userStake.validator}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Amount Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Amount to Unstake</label>
        <div className="relative">
          <Input
            type="number"
            placeholder="0.0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="text-lg pr-20"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            <span className="text-sm text-muted-foreground">Max</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setAmount(userStake?.amount.toString() || "0")}
              className="h-6 px-2 text-xs"
            >
              {userStake?.amount || 0}
            </Button>
          </div>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Staked: {userStake?.amount.toLocaleString() || 0} {pool.symbol}</span>
          <span>≈ {showValues ? `$${(parseFloat(amount || "0") * (pool.symbol === "DNX" ? 0.5 : 98.45)).toFixed(2)}` : "••••••"}</span>
        </div>
        <div className="flex space-x-1">
          {[25, 50, 75, 100].map((percentage) => (
            <Button
              key={percentage}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleQuickAmount(percentage)}
              className="text-xs h-6 px-2"
            >
              {percentage}%
            </Button>
          ))}
        </div>
      </div>

      {/* Unstake Type Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Unstake Type</label>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={unstakeType === "immediate" ? "default" : "outline"}
            onClick={() => setUnstakeType("immediate")}
            className="h-12 flex flex-col items-center space-y-1"
          >
            <Zap className="h-4 w-4" />
            <span className="text-xs">Immediate</span>
            <span className="text-xs text-muted-foreground">Instant unstake</span>
          </Button>
          <Button
            variant={unstakeType === "delayed" ? "default" : "outline"}
            onClick={() => setUnstakeType("delayed")}
            className="h-12 flex flex-col items-center space-y-1"
          >
            <Clock className="h-4 w-4" />
            <span className="text-xs">Delayed</span>
            <span className="text-xs text-muted-foreground">2-3 days</span>
          </Button>
        </div>
        <div className="text-xs text-muted-foreground">
          {unstakeType === "immediate" 
            ? "Instant unstake with 2% fee, available immediately"
            : "Delayed unstake with no fee, available in 2-3 days"
          }
        </div>
      </div>

      {/* Unstaking Details */}
      <div className="space-y-2 p-4 rounded-lg bg-muted/30">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Unstaking Type:</span>
          <span className="font-medium capitalize">{unstakeType}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Processing Time:</span>
          <span className="font-medium">
            {unstakeType === "immediate" ? "Instant" : "2-3 days"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Fee:</span>
          <span className="font-medium">
            {unstakeType === "immediate" ? "2%" : "0%"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Amount After Fee:</span>
          <span className="font-medium">
            {showValues ? `$${((parseFloat(amount || "0") * (pool.symbol === "DNX" ? 0.5 : 98.45)) * (unstakeType === "immediate" ? 0.98 : 1)).toFixed(2)}` : "••••••"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Lost Rewards:</span>
          <span className="font-medium text-red-500">
            {showValues ? `$${estimatedDaily.toFixed(4)}/day` : "••••••"}
          </span>
        </div>
      </div>

      {/* Rewards Claim */}
      <div className="p-3 rounded-lg border border-green-200 bg-green-50 dark:bg-green-900/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award className="h-4 w-4 text-green-600" />
            <div>
              <div className="font-medium text-sm text-green-800 dark:text-green-200">
                Claim Rewards
              </div>
              <div className="text-xs text-green-700 dark:text-green-300">
                {showValues ? `$${userStake?.rewards.toFixed(2) || 0}` : "••••••"} available
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="text-green-600 border-green-600 hover:bg-green-50"
          >
            Claim
          </Button>
        </div>
      </div>

      {/* Risk Warning */}
      <div className="p-3 rounded-lg border border-red-200 bg-red-50 dark:bg-red-900/20">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
          <div className="text-xs">
            <p className="font-medium text-red-800 dark:text-red-200">
              Unstaking Warning
            </p>
            <p className="text-red-700 dark:text-red-300 mt-1">
              Unstaking will stop earning rewards immediately. You will lose the opportunity 
              to earn staking rewards on the unstaked amount. Consider the opportunity cost.
            </p>
          </div>
        </div>
      </div>

      {/* Unstake Button */}
      <Button
        onClick={handleUnstake}
        className="w-full h-12 text-lg font-medium"
        variant="destructive"
        disabled={!amount || !userStake}
      >
        <Unlock className="mr-2 h-5 w-5" />
        Unstake {pool.symbol}
      </Button>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" size="sm" className="text-xs">
          <Info className="h-3 w-3 mr-1" />
          Learn More
        </Button>
        <Button variant="outline" size="sm" className="text-xs">
          <Clock className="h-3 w-3 mr-1" />
          View History
        </Button>
      </div>
    </div>
  )
}




















