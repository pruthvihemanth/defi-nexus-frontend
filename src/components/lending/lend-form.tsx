"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  DollarSign, 
  Percent, 
  Info,
  AlertTriangle,
  Zap,
  Shield,
  Clock
} from "lucide-react"
import { cn } from "@/lib/utils"

interface LendFormProps {
  asset: any
}

export function LendForm({ asset }: LendFormProps) {
  const [amount, setAmount] = useState("")
  const [enableCollateral, setEnableCollateral] = useState(true)
  const [slippage, setSlippage] = useState("0.5")

  const handleSupply = () => {
    console.log("Supplying:", { asset: asset.symbol, amount, enableCollateral })
  }

  const handleQuickAmount = (percentage: number) => {
    const maxAmount = 1000 // Mock available balance
    setAmount((maxAmount * percentage / 100).toString())
  }

  const estimatedApy = parseFloat(amount || "0") * (asset.supplyApy / 100)
  const estimatedDaily = estimatedApy / 365

  return (
    <div className="space-y-6">
      {/* Asset Info */}
      <div className="flex items-center space-x-3 p-4 rounded-xl border bg-muted/50">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
          {asset.icon}
        </div>
        <div className="flex-1">
          <div className="font-medium">{asset.symbol}</div>
          <div className="text-sm text-muted-foreground">{asset.name}</div>
        </div>
        <div className="text-right">
          <div className="font-medium">${asset.price.toFixed(2)}</div>
          <div className="text-sm text-green-500">{asset.supplyApy.toFixed(2)}% APY</div>
        </div>
      </div>

      {/* Amount Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Amount to Supply</label>
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
              onClick={() => setAmount("1000")}
              className="h-6 px-2 text-xs"
            >
              1000
            </Button>
          </div>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Balance: 1,000 {asset.symbol}</span>
          <span>≈ ${(parseFloat(amount || "0") * asset.price).toFixed(2)}</span>
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

      {/* Collateral Toggle */}
      <div className="flex items-center justify-between p-3 rounded-lg border">
        <div className="flex items-center space-x-2">
          <Shield className="h-4 w-4 text-blue-500" />
          <div>
            <div className="font-medium text-sm">Use as Collateral</div>
            <div className="text-xs text-muted-foreground">
              Enable to use this asset as collateral for borrowing
            </div>
          </div>
        </div>
        <Button
          variant={enableCollateral ? "default" : "outline"}
          size="sm"
          onClick={() => setEnableCollateral(!enableCollateral)}
          className="h-8"
        >
          {enableCollateral ? "Enabled" : "Disabled"}
        </Button>
      </div>

      {/* Supply Details */}
      <div className="space-y-2 p-4 rounded-lg bg-muted/30">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Supply APY:</span>
          <span className="font-medium text-green-500">{asset.supplyApy.toFixed(2)}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Estimated Annual:</span>
          <span className="font-medium">${estimatedApy.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Estimated Daily:</span>
          <span className="font-medium">${estimatedDaily.toFixed(4)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Collateral Factor:</span>
          <span className="font-medium">{asset.collateralFactor * 100}%</span>
        </div>
      </div>

      {/* Risk Warning */}
      <div className="p-3 rounded-lg border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
          <div className="text-xs">
            <p className="font-medium text-yellow-800 dark:text-yellow-200">
              Supply Risk Warning
            </p>
            <p className="text-yellow-700 dark:text-yellow-300 mt-1">
              Supplying assets involves smart contract risk. In case of protocol insolvency, 
              you may lose your supplied assets. Please understand the risks before proceeding.
            </p>
          </div>
        </div>
      </div>

      {/* Supply Button */}
      <Button
        onClick={handleSupply}
        className="w-full h-12 text-lg font-medium"
        variant="gradient"
      >
        <Zap className="mr-2 h-5 w-5" />
        Supply {asset.symbol}
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












