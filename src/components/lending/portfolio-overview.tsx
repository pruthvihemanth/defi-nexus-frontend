"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Percent,
  Shield,
  AlertTriangle,
  MoreHorizontal,
  Target,
  RefreshCw,
  Settings
} from "lucide-react"
import { cn } from "@/lib/utils"

interface PortfolioOverviewProps {
  positions: any[]
}

export function PortfolioOverview({ positions }: PortfolioOverviewProps) {
  const [sortBy, setSortBy] = useState("value")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const totalValue = positions.reduce((sum, pos) => sum + pos.value, 0)
  const totalSupplied = positions.filter(p => p.type === "Supply").reduce((sum, p) => sum + p.value, 0)
  const totalBorrowed = positions.filter(p => p.type === "Borrow").reduce((sum, p) => sum + p.value, 0)
  const netValue = totalSupplied - totalBorrowed

  const handleRepay = (position: any) => {
    console.log("Repay", position.asset)
  }

  const handleWithdraw = (position: any) => {
    console.log("Withdraw", position.asset)
  }

  const handleClosePosition = (position: any) => {
    console.log("Close", position.asset)
  }

  if (positions.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <DollarSign className="h-8 w-8" />
          </div>
          <p className="text-lg font-medium">No Positions</p>
          <p className="text-sm">Start lending or borrowing to see your positions here</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header Actions */}
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <div className="flex items-center space-x-2">
          <h3 className="font-medium">Your Positions ({positions.length})</h3>
          <Badge variant="outline" className="text-xs">
            Live
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
          >
            <Target className="h-3 w-3 mr-1" />
            Close All
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="px-4 py-3 bg-muted/30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Total Value:</span>
            <div className="font-medium">${totalValue.toLocaleString()}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Supplied:</span>
            <div className="font-medium text-green-500">${totalSupplied.toLocaleString()}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Borrowed:</span>
            <div className="font-medium text-red-500">${totalBorrowed.toLocaleString()}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Net Value:</span>
            <div className={cn(
              "font-medium",
              netValue >= 0 ? "text-green-500" : "text-red-500"
            )}>
              ${netValue.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Positions Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3 font-medium text-muted-foreground text-sm">Asset</th>
              <th className="text-left p-3 font-medium text-muted-foreground text-sm">Type</th>
              <th className="text-right p-3 font-medium text-muted-foreground text-sm">Amount</th>
              <th className="text-right p-3 font-medium text-muted-foreground text-sm">Value</th>
              <th className="text-right p-3 font-medium text-muted-foreground text-sm">APY</th>
              <th className="text-center p-3 font-medium text-muted-foreground text-sm">Collateral</th>
              <th className="text-center p-3 font-medium text-muted-foreground text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position) => (
              <tr key={position.id} className="border-b hover:bg-muted/50 transition-colors">
                {/* Asset */}
                <td className="p-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                      {position.asset[0]}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{position.asset}</div>
                    </div>
                  </div>
                </td>

                {/* Type */}
                <td className="p-3">
                  <Badge 
                    variant={position.type === "Supply" ? "default" : "destructive"}
                    className={cn(
                      "text-xs",
                      position.type === "Supply" 
                        ? "bg-green-500 hover:bg-green-600" 
                        : "bg-red-500 hover:bg-red-600"
                    )}
                  >
                    {position.type === "Supply" ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {position.type}
                  </Badge>
                </td>

                {/* Amount */}
                <td className="p-3 text-right">
                  <div className="font-medium text-sm">{position.amount.toLocaleString()}</div>
                </td>

                {/* Value */}
                <td className="p-3 text-right">
                  <div className="font-medium text-sm">${position.value.toLocaleString()}</div>
                </td>

                {/* APY */}
                <td className="p-3 text-right">
                  <div className={cn(
                    "font-medium text-sm",
                    position.type === "Supply" ? "text-green-500" : "text-red-500"
                  )}>
                    {position.apy.toFixed(2)}%
                  </div>
                </td>

                {/* Collateral */}
                <td className="p-3 text-center">
                  {position.collateral ? (
                    <div className="flex items-center justify-center">
                      <Shield className="h-4 w-4 text-blue-500" />
                    </div>
                  ) : (
                    <div className="text-muted-foreground">-</div>
                  )}
                </td>

                {/* Actions */}
                <td className="p-3 text-center">
                  <div className="flex items-center justify-center space-x-1">
                    {position.type === "Supply" ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleWithdraw(position)}
                        className="text-xs h-7 px-2"
                      >
                        Withdraw
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRepay(position)}
                        className="text-xs h-7 px-2"
                      >
                        Repay
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleClosePosition(position)}
                      className="text-xs h-7 px-2"
                    >
                      Close
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Risk Warning */}
      <div className="px-4 py-3 border-t bg-yellow-50 dark:bg-yellow-900/20">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
          <div className="text-xs">
            <p className="font-medium text-yellow-800 dark:text-yellow-200">
              Portfolio Risk Management
            </p>
            <p className="text-yellow-700 dark:text-yellow-300 mt-1">
              Monitor your health factor regularly. If it drops below 1.0, your collateral 
              may be liquidated. Consider adding more collateral or repaying debt to maintain a safe position.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


























