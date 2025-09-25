"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  MoreHorizontal, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  Target,
  RefreshCw,
  Settings
} from "lucide-react"
import { cn } from "@/lib/utils"

interface PositionsTableProps {
  positions: any[]
}

export function PositionsTable({ positions }: PositionsTableProps) {
  const [sortBy, setSortBy] = useState("pnl")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const handleClosePosition = (positionId: string) => {
    console.log("Closing position:", positionId)
  }

  const handleCloseAll = () => {
    console.log("Closing all positions")
  }

  const handleReducePosition = (positionId: string) => {
    console.log("Reducing position:", positionId)
  }

  if (positions.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <TrendingUp className="h-8 w-8" />
          </div>
          <p className="text-lg font-medium">No Open Positions</p>
          <p className="text-sm">Start trading to see your positions here</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header Actions */}
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <div className="flex items-center space-x-2">
          <h3 className="font-medium">Open Positions ({positions.length})</h3>
          <Badge variant="outline" className="text-xs">
            Live
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCloseAll}
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3 font-medium text-muted-foreground text-sm">Market</th>
              <th className="text-left p-3 font-medium text-muted-foreground text-sm">Side</th>
              <th className="text-right p-3 font-medium text-muted-foreground text-sm">Size</th>
              <th className="text-right p-3 font-medium text-muted-foreground text-sm">Entry Price</th>
              <th className="text-right p-3 font-medium text-muted-foreground text-sm">Mark Price</th>
              <th className="text-right p-3 font-medium text-muted-foreground text-sm">PnL</th>
              <th className="text-right p-3 font-medium text-muted-foreground text-sm">Margin</th>
              <th className="text-right p-3 font-medium text-muted-foreground text-sm">Leverage</th>
              <th className="text-right p-3 font-medium text-muted-foreground text-sm">Liq. Price</th>
              <th className="text-center p-3 font-medium text-muted-foreground text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position) => (
              <tr key={position.id} className="border-b hover:bg-muted/50 transition-colors">
                {/* Market */}
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                      {position.market[0]}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{position.market}</div>
                    </div>
                  </div>
                </td>

                {/* Side */}
                <td className="p-3">
                  <Badge 
                    variant={position.side === "Long" ? "default" : "destructive"}
                    className={cn(
                      "text-xs",
                      position.side === "Long" 
                        ? "bg-green-500 hover:bg-green-600" 
                        : "bg-red-500 hover:bg-red-600"
                    )}
                  >
                    {position.side === "Long" ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {position.side}
                  </Badge>
                </td>

                {/* Size */}
                <td className="p-3 text-right">
                  <div className="font-medium text-sm">{position.size}</div>
                </td>

                {/* Entry Price */}
                <td className="p-3 text-right">
                  <div className="font-medium text-sm">${position.entryPrice.toFixed(2)}</div>
                </td>

                {/* Mark Price */}
                <td className="p-3 text-right">
                  <div className="font-medium text-sm">${position.markPrice.toFixed(2)}</div>
                </td>

                {/* PnL */}
                <td className="p-3 text-right">
                  <div className={cn(
                    "font-medium text-sm",
                    position.pnl >= 0 ? "text-green-500" : "text-red-500"
                  )}>
                    ${position.pnl.toFixed(2)}
                  </div>
                  <div className={cn(
                    "text-xs",
                    position.pnlPercent >= 0 ? "text-green-500" : "text-red-500"
                  )}>
                    {position.pnlPercent >= 0 ? "+" : ""}{position.pnlPercent.toFixed(2)}%
                  </div>
                </td>

                {/* Margin */}
                <td className="p-3 text-right">
                  <div className="font-medium text-sm">${position.margin.toFixed(2)}</div>
                </td>

                {/* Leverage */}
                <td className="p-3 text-right">
                  <div className="font-medium text-sm">{position.leverage}x</div>
                </td>

                {/* Liquidation Price */}
                <td className="p-3 text-right">
                  <div className="font-medium text-sm text-red-500">
                    ${position.liquidationPrice.toFixed(2)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {((position.markPrice - position.liquidationPrice) / position.markPrice * 100).toFixed(1)}% away
                  </div>
                </td>

                {/* Actions */}
                <td className="p-3 text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleClosePosition(position.id)}
                      className="text-xs h-7 px-2"
                    >
                      Close
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleReducePosition(position.id)}
                      className="text-xs h-7 px-2"
                    >
                      Reduce
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

      {/* Summary */}
      <div className="px-4 py-3 border-t bg-muted/30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Total PnL:</span>
            <div className={cn(
              "font-medium",
              positions.reduce((sum, p) => sum + p.pnl, 0) >= 0 ? "text-green-500" : "text-red-500"
            )}>
              ${positions.reduce((sum, p) => sum + p.pnl, 0).toFixed(2)}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Total Margin:</span>
            <div className="font-medium">
              ${positions.reduce((sum, p) => sum + p.margin, 0).toFixed(2)}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Long Positions:</span>
            <div className="font-medium text-green-500">
              {positions.filter(p => p.side === "Long").length}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Short Positions:</span>
            <div className="font-medium text-red-500">
              {positions.filter(p => p.side === "Short").length}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}






















