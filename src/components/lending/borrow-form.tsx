"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingDown, 
  DollarSign, 
  Percent, 
  Info,
  AlertTriangle,
  Zap,
  Shield,
  Clock,
  Target
} from "lucide-react"
import { cn } from "@/lib/utils"

interface BorrowFormProps {
  asset: any
}

export function BorrowForm({ asset }: BorrowFormProps) {
  const [amount, setAmount] = useState("")
  const [slippage, setSlippage] = useState("0.5")

  const handleBorrow = () => {
    console.log("Borrowing:", { asset: asset.symbol, amount })
  }

  const handleQuickAmount = (percentage: number) => {
    const maxBorrow = 5000 // Mock available borrow limit
    setAmount((maxBorrow * percentage / 100).toString())
  }

  const estimatedInterest = parseFloat(amount || "0") * (asset.borrowApy / 100)
  const estimatedDaily = estimatedInterest / 365
  const healthFactorAfter = 1.5 // Mock calculation
  const liquidationPrice = 85.50 // Mock calculation

  return (
    <div className="space-y-6">
      {/* Asset Info */}
      <div className="flex items-center space-x-3 p-4 rounded-xl border bg-muted/50">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-orange-600 flex items-center justify-center text-white font-bold">
          {asset.icon}
        </div>
        <div className="flex-1">
          <div className="font-medium">{asset.symbol}</div>
          <div className="text-sm text-muted-foreground">{asset.name}</div>
        </div>
        <div className="text-right">
          <div className="font-medium">${asset.price.toFixed(2)}</div>
          <div className="text-sm text-red-500">{asset.borrowApy.toFixed(2)}% APY</div>
        </div>
      </div>

      {/* Amount Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Amount to Borrow</label>
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
              onClick={() => setAmount("5000")}
              className="h-6 px-2 text-xs"
            >
              5000
            </Button>
          </div>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Available: 5,000 {asset.symbol}</span>
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

      {/* Health Factor Warning */}
      <div className={cn(
        "p-3 rounded-lg border",
        healthFactorAfter > 2 ? "border-green-200 bg-green-50 dark:bg-green-900/20" :
        healthFactorAfter > 1.5 ? "border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20" :
        "border-red-200 bg-red-50 dark:bg-red-900/20"
      )}>
        <div className="flex items-start space-x-2">
          <Shield className={cn(
            "h-4 w-4 mt-0.5",
            healthFactorAfter > 2 ? "text-green-600" :
            healthFactorAfter > 1.5 ? "text-yellow-600" :
            "text-red-600"
          )} />
          <div className="text-xs">
            <p className={cn(
              "font-medium",
              healthFactorAfter > 2 ? "text-green-800 dark:text-green-200" :
              healthFactorAfter > 1.5 ? "text-yellow-800 dark:text-yellow-200" :
              "text-red-800 dark:text-red-200"
            )}>
              Health Factor After Borrow: {healthFactorAfter.toFixed(2)}
            </p>
            <p className={cn(
              "mt-1",
              healthFactorAfter > 2 ? "text-green-700 dark:text-green-300" :
              healthFactorAfter > 1.5 ? "text-yellow-700 dark:text-yellow-300" :
              "text-red-700 dark:text-red-300"
            )}>
              {healthFactorAfter > 2 ? "Safe - Your position is well collateralized" :
               healthFactorAfter > 1.5 ? "Caution - Consider adding more collateral" :
               "Danger - Risk of liquidation"}
            </p>
          </div>
        </div>
      </div>

      {/* Borrow Details */}
      <div className="space-y-2 p-4 rounded-lg bg-muted/30">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Borrow APY:</span>
          <span className="font-medium text-red-500">{asset.borrowApy.toFixed(2)}%</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Estimated Annual Interest:</span>
          <span className="font-medium">${estimatedInterest.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Estimated Daily Interest:</span>
          <span className="font-medium">${estimatedDaily.toFixed(4)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Liquidation Price:</span>
          <span className="font-medium text-red-500">${liquidationPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Liquidation Penalty:</span>
          <span className="font-medium">{asset.liquidationPenalty.toFixed(1)}%</span>
        </div>
      </div>

      {/* Risk Warning */}
      <div className="p-3 rounded-lg border border-red-200 bg-red-50 dark:bg-red-900/20">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
          <div className="text-xs">
            <p className="font-medium text-red-800 dark:text-red-200">
              Borrowing Risk Warning
            </p>
            <p className="text-red-700 dark:text-red-300 mt-1">
              Borrowing involves liquidation risk. If your health factor drops below 1.0, 
              your collateral may be liquidated. Monitor your position regularly.
            </p>
          </div>
        </div>
      </div>

      {/* Borrow Button */}
      <Button
        onClick={handleBorrow}
        className="w-full h-12 text-lg font-medium"
        variant="destructive"
      >
        <Zap className="mr-2 h-5 w-5" />
        Borrow {asset.symbol}
      </Button>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" size="sm" className="text-xs">
          <Target className="h-3 w-3 mr-1" />
          Repay
        </Button>
        <Button variant="outline" size="sm" className="text-xs">
          <Info className="h-3 w-3 mr-1" />
          Learn More
        </Button>
      </div>
    </div>
  )
}






















