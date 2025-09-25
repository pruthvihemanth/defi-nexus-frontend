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
  AlertTriangle,
  Lock,
  Unlock,
  Award,
  Users,
  Coins
} from "lucide-react"
import { cn } from "@/lib/utils"

interface StakingPoolsProps {
  pools: any[]
  showValues: boolean
}

export function StakingPools({ pools, showValues }: StakingPoolsProps) {
  const [sortBy, setSortBy] = useState("apy")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [filter, setFilter] = useState("all")

  const filteredPools = pools.filter(pool => {
    if (filter === "native") return pool.stakingType === "native"
    if (filter === "delegated") return pool.stakingType === "delegated"
    if (filter === "high-apy") return pool.apy > 10
    return true
  })

  const sortedPools = filteredPools.sort((a, b) => {
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

  const handleStake = (pool: any) => {
    console.log("Stake", pool.symbol)
  }

  const handleUnstake = (pool: any) => {
    console.log("Unstake", pool.symbol)
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Staking Pools ({sortedPools.length})</span>
          <Badge variant="outline" className="text-xs">
            Live
          </Badge>
        </div>
        <div className="flex space-x-1">
          {[
            { value: "all", label: "All" },
            { value: "native", label: "Native" },
            { value: "delegated", label: "Delegated" },
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
              <th className="text-left p-3 font-medium text-muted-foreground text-sm">Pool</th>
              <th className="text-right p-3 font-medium text-muted-foreground text-sm cursor-pointer" onClick={() => handleSort("apy")}>
                APY
                {sortBy === "apy" && (sortOrder === "desc" ? " ↓" : " ↑")}
              </th>
              <th className="text-right p-3 font-medium text-muted-foreground text-sm cursor-pointer" onClick={() => handleSort("totalStaked")}>
                Total Staked
                {sortBy === "totalStaked" && (sortOrder === "desc" ? " ↓" : " ↑")}
              </th>
              <th className="text-right p-3 font-medium text-muted-foreground text-sm">Rewards</th>
              <th className="text-center p-3 font-medium text-muted-foreground text-sm">Type</th>
              <th className="text-center p-3 font-medium text-muted-foreground text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedPools.map((pool) => (
              <tr key={pool.id} className="border-b hover:bg-muted/50 transition-colors">
                {/* Pool */}
                <td className="p-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                      {pool.icon}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{pool.symbol}</div>
                      <div className="text-xs text-muted-foreground">{pool.name}</div>
                    </div>
                    {pool.isNative && (
                      <Badge variant="outline" className="text-xs bg-blue-500 text-white">
                        Native
                      </Badge>
                    )}
                  </div>
                </td>

                {/* APY */}
                <td className="p-3 text-right">
                  <div className="font-medium text-green-500 text-sm">{pool.apy.toFixed(2)}%</div>
                  <div className="text-xs text-muted-foreground">Annual</div>
                </td>

                {/* Total Staked */}
                <td className="p-3 text-right">
                  <div className="font-medium text-sm">
                    {showValues ? `$${pool.totalStaked.toLocaleString()}` : "••••••"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {pool.totalStaked.toLocaleString()} {pool.symbol}
                  </div>
                </td>

                {/* Rewards */}
                <td className="p-3 text-right">
                  <div className="font-medium text-sm">
                    {showValues ? `$${pool.totalRewards.toLocaleString()}` : "••••••"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Total distributed
                  </div>
                </td>

                {/* Type */}
                <td className="p-3 text-center">
                  <Badge 
                    variant={pool.stakingType === "native" ? "default" : "outline"}
                    className={cn(
                      "text-xs",
                      pool.stakingType === "native" ? "bg-green-500 hover:bg-green-600" : ""
                    )}
                  >
                    {pool.stakingType === "native" ? (
                      <Shield className="h-3 w-3 mr-1" />
                    ) : (
                      <Users className="h-3 w-3 mr-1" />
                    )}
                    {pool.stakingType === "native" ? "Native" : "Delegated"}
                  </Badge>
                  {pool.validatorFee > 0 && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {pool.validatorFee}% fee
                    </div>
                  )}
                </td>

                {/* Actions */}
                <td className="p-3 text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStake(pool)}
                      className="text-xs h-7 px-2"
                    >
                      <Lock className="h-3 w-3 mr-1" />
                      Stake
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUnstake(pool)}
                      className="text-xs h-7 px-2"
                    >
                      <Unlock className="h-3 w-3 mr-1" />
                      Unstake
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

      {/* Pool Features */}
      <div className="px-4 py-3 border-t bg-muted/30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-blue-500" />
            <div>
              <div className="font-medium">Native Staking</div>
              <div className="text-xs text-muted-foreground">Direct staking with governance rights</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-green-500" />
            <div>
              <div className="font-medium">Delegated Staking</div>
              <div className="text-xs text-muted-foreground">Delegate to validators for rewards</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="h-4 w-4 text-purple-500" />
            <div>
              <div className="font-medium">Rewards</div>
              <div className="text-xs text-muted-foreground">Earn rewards for securing the network</div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="px-4 py-3 border-t bg-muted/30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Total Pools:</span>
            <div className="font-medium">{pools.length}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Native Pools:</span>
            <div className="font-medium text-blue-500">
              {pools.filter(p => p.stakingType === "native").length}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Avg APY:</span>
            <div className="font-medium text-green-500">
              {(pools.reduce((sum, p) => sum + p.apy, 0) / pools.length).toFixed(2)}%
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Total Staked:</span>
            <div className="font-medium">
              {showValues ? `$${pools.reduce((sum, p) => sum + p.totalStaked, 0).toLocaleString()}` : "••••••"}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}




















