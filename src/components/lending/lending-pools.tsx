"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  TrendingDown, 
  Shield, 
  DollarSign,
  Percent,
  BarChart3,
  MoreHorizontal,
  Star,
  AlertTriangle
} from "lucide-react"
import { cn } from "@/lib/utils"

interface LendingPoolsProps {
  markets: any[]
}

export function LendingPools({ markets }: LendingPoolsProps) {
  const [sortBy, setSortBy] = useState("supplyApy")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [filter, setFilter] = useState("all")

  const filteredMarkets = markets.filter(market => {
    if (filter === "collateral") return market.isCollateral
    if (filter === "high-apy") return market.supplyApy > 10
    return true
  })

  const sortedMarkets = filteredMarkets.sort((a, b) => {
    const aValue = a[sortBy as keyof typeof a]
    const bValue = b[sortBy as keyof typeof b]
    
    if (sortOrder === "asc") {
      return aValue - bValue
    } else {
      return bValue - aValue
    }
  })

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("desc")
    }
  }

  const handleSupply = (market: any) => {
    console.log("Supply", market.symbol)
  }

  const handleBorrow = (market: any) => {
    console.log("Borrow", market.symbol)
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Markets ({sortedMarkets.length})</span>
          <Badge variant="outline" className="text-xs">
            Live
          </Badge>
        </div>
        <div className="flex space-x-1">
          {[
            { value: "all", label: "All" },
            { value: "collateral", label: "Collateral" },
            { value: "high-apy", label: "High APY" }
          ].map((filterOption) => (
            <Button
              key={filterOption.value}
              variant={filter === filterOption.value ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(filterOption.value)}
              className="text-xs h-7"
            >
              {filterOption.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3 font-medium text-muted-foreground text-sm">Asset</th>
              <th className="text-right p-3 font-medium text-muted-foreground text-sm cursor-pointer" onClick={() => handleSort("supplyApy")}>
                Supply APY
                {sortBy === "supplyApy" && (sortOrder === "desc" ? " ↓" : " ↑")}
              </th>
              <th className="text-right p-3 font-medium text-muted-foreground text-sm cursor-pointer" onClick={() => handleSort("borrowApy")}>
                Borrow APY
                {sortBy === "borrowApy" && (sortOrder === "desc" ? " ↓" : " ↑")}
              </th>
              <th className="text-right p-3 font-medium text-muted-foreground text-sm cursor-pointer" onClick={() => handleSort("totalSupply")}>
                Total Supply
                {sortBy === "totalSupply" && (sortOrder === "desc" ? " ↓" : " ↑")}
              </th>
              <th className="text-right p-3 font-medium text-muted-foreground text-sm">Utilization</th>
              <th className="text-center p-3 font-medium text-muted-foreground text-sm">Collateral</th>
              <th className="text-center p-3 font-medium text-muted-foreground text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedMarkets.map((market) => (
              <tr key={market.id} className="border-b hover:bg-muted/50 transition-colors">
                {/* Asset */}
                <td className="p-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                      {market.icon}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{market.symbol}</div>
                      <div className="text-xs text-muted-foreground">{market.name}</div>
                    </div>
                    {market.isCollateral && (
                      <Shield className="h-4 w-4 text-blue-500" />
                    )}
                  </div>
                </td>

                {/* Supply APY */}
                <td className="p-3 text-right">
                  <div className="font-medium text-green-500 text-sm">{market.supplyApy.toFixed(2)}%</div>
                  <div className="text-xs text-muted-foreground">Supply</div>
                </td>

                {/* Borrow APY */}
                <td className="p-3 text-right">
                  <div className="font-medium text-red-500 text-sm">{market.borrowApy.toFixed(2)}%</div>
                  <div className="text-xs text-muted-foreground">Borrow</div>
                </td>

                {/* Total Supply */}
                <td className="p-3 text-right">
                  <div className="font-medium text-sm">${market.totalSupply.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">
                    ${market.totalBorrowed.toLocaleString()} borrowed
                  </div>
                </td>

                {/* Utilization */}
                <td className="p-3 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div 
                        className={cn(
                          "h-2 rounded-full",
                          market.utilizationRate > 80 ? "bg-red-500" :
                          market.utilizationRate > 60 ? "bg-yellow-500" : "bg-green-500"
                        )}
                        style={{ width: `${market.utilizationRate}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{market.utilizationRate.toFixed(1)}%</span>
                  </div>
                </td>

                {/* Collateral */}
                <td className="p-3 text-center">
                  <Badge 
                    variant={market.isCollateral ? "default" : "outline"}
                    className={cn(
                      "text-xs",
                      market.isCollateral ? "bg-green-500 hover:bg-green-600" : ""
                    )}
                  >
                    {market.isCollateral ? "Yes" : "No"}
                  </Badge>
                  {market.isCollateral && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {market.collateralFactor * 100}% factor
                    </div>
                  )}
                </td>

                {/* Actions */}
                <td className="p-3 text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSupply(market)}
                      className="text-xs h-7 px-2"
                    >
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Supply
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleBorrow(market)}
                      className="text-xs h-7 px-2"
                    >
                      <TrendingDown className="h-3 w-3 mr-1" />
                      Borrow
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

      {/* Summary Stats */}
      <div className="px-4 py-3 border-t bg-muted/30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Total Markets:</span>
            <div className="font-medium">{markets.length}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Collateral Markets:</span>
            <div className="font-medium text-green-500">
              {markets.filter(m => m.isCollateral).length}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Avg Supply APY:</span>
            <div className="font-medium text-green-500">
              {(markets.reduce((sum, m) => sum + m.supplyApy, 0) / markets.length).toFixed(2)}%
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Avg Borrow APY:</span>
            <div className="font-medium text-red-500">
              {(markets.reduce((sum, m) => sum + m.borrowApy, 0) / markets.length).toFixed(2)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}






















