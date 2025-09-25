"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Lock, 
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

interface StakeFormProps {
  pool: any
  showValues: boolean
}

export function StakeForm({ pool, showValues }: StakeFormProps) {
  const [amount, setAmount] = useState("")
  const [selectedValidator, setSelectedValidator] = useState("")
  const [autoCompound, setAutoCompound] = useState(true)

  const handleStake = () => {
    console.log("Staking:", { pool: pool.symbol, amount, validator: selectedValidator })
  }

  const handleQuickAmount = (percentage: number) => {
    const maxAmount = pool.symbol === "DNX" ? 10000 : 100 // Mock available balance
    setAmount((maxAmount * percentage / 100).toString())
  }

  const estimatedRewards = parseFloat(amount || "0") * (pool.apy / 100)
  const estimatedDaily = estimatedRewards / 365
  const estimatedMonthly = estimatedRewards / 12

  const validators = [
    { id: "1", name: "DeFi Nexus Validator", commission: 0, apy: pool.apy },
    { id: "2", name: "Marinade Finance", commission: 2, apy: pool.apy * 0.98 },
    { id: "3", name: "Lido", commission: 3, apy: pool.apy * 0.97 },
    { id: "4", name: "Jupiter Validator", commission: 4, apy: pool.apy * 0.96 }
  ]

  return (
    <div className="space-y-6">
      {/* Pool Info */}
      <div className="flex items-center space-x-3 p-4 rounded-xl border bg-muted/50">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
          {pool.icon}
        </div>
        <div className="flex-1">
          <div className="font-medium">{pool.symbol}</div>
          <div className="text-sm text-muted-foreground">{pool.name}</div>
        </div>
        <div className="text-right">
          <div className="font-medium text-green-500">{pool.apy.toFixed(2)}% APY</div>
          <div className="text-sm text-muted-foreground">
            {pool.stakingType === "native" ? "Native Staking" : "Delegated Staking"}
          </div>
        </div>
      </div>

      {/* Amount Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Amount to Stake</label>
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
              onClick={() => setAmount(pool.symbol === "DNX" ? "10000" : "100")}
              className="h-6 px-2 text-xs"
            >
              {pool.symbol === "DNX" ? "10000" : "100"}
            </Button>
          </div>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Balance: {pool.symbol === "DNX" ? "10,000" : "100"} {pool.symbol}</span>
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

      {/* Validator Selection (for SOL staking) */}
      {pool.symbol === "SOL" && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Validator</label>
          <div className="relative">
            <select
              value={selectedValidator}
              onChange={(e) => setSelectedValidator(e.target.value)}
              className="w-full px-3 py-2 border rounded-md bg-background text-sm"
            >
              <option value="">Choose a validator...</option>
              {validators.map((validator) => (
                <option key={validator.id} value={validator.id}>
                  {validator.name} - {validator.commission}% commission - {validator.apy.toFixed(2)}% APY
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      )}

      {/* Auto Compound Toggle */}
      <div className="flex items-center justify-between p-3 rounded-lg border">
        <div className="flex items-center space-x-2">
          <Zap className="h-4 w-4 text-blue-500" />
          <div>
            <div className="font-medium text-sm">Auto Compound</div>
            <div className="text-xs text-muted-foreground">
              Automatically reinvest rewards to maximize returns
            </div>
          </div>
        </div>
        <Button
          variant={autoCompound ? "default" : "outline"}
          size="sm"
          onClick={() => setAutoCompound(!autoCompound)}
          className="h-8"
        >
          {autoCompound ? "Enabled" : "Disabled"}
        </Button>
      </div>

      {/* Staking Details */}
      <div className="space-y-2 p-4 rounded-lg bg-muted/30">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Staking APY:</span>
          <span className="font-medium text-green-500">{pool.apy.toFixed(2)}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Estimated Annual Rewards:</span>
          <span className="font-medium">
            {showValues ? `$${estimatedRewards.toFixed(2)}` : "••••••"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Estimated Monthly:</span>
          <span className="font-medium">
            {showValues ? `$${estimatedMonthly.toFixed(2)}` : "••••••"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Estimated Daily:</span>
          <span className="font-medium">
            {showValues ? `$${estimatedDaily.toFixed(4)}` : "••••••"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Lock Period:</span>
          <span className="font-medium">
            {pool.lockPeriod === 0 ? "No lock period" : `${pool.lockPeriod} days`}
          </span>
        </div>
        {pool.validatorFee > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Validator Fee:</span>
            <span className="font-medium">{pool.validatorFee}%</span>
          </div>
        )}
      </div>

      {/* Pool Features */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Pool Features</h4>
        <div className="flex flex-wrap gap-2">
          {pool.features.map((feature: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs">
              {feature}
            </Badge>
          ))}
        </div>
      </div>

      {/* Risk Warning */}
      <div className="p-3 rounded-lg border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
          <div className="text-xs">
            <p className="font-medium text-yellow-800 dark:text-yellow-200">
              Staking Risk Warning
            </p>
            <p className="text-yellow-700 dark:text-yellow-300 mt-1">
              Staking involves smart contract risk and potential slashing. In case of validator misbehavior, 
              you may lose a portion of your staked tokens. Please understand the risks before proceeding.
            </p>
          </div>
        </div>
      </div>

      {/* Stake Button */}
      <Button
        onClick={handleStake}
        className="w-full h-12 text-lg font-medium"
        variant="gradient"
        disabled={!amount || (pool.symbol === "SOL" && !selectedValidator)}
      >
        <Lock className="mr-2 h-5 w-5" />
        Stake {pool.symbol}
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

























