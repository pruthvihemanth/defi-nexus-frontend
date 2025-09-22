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
  Users,
  CheckCircle,
  XCircle,
  Award,
  Clock
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ValidatorListProps {
  validators: any[]
  showValues: boolean
}

export function ValidatorList({ validators, showValues }: ValidatorListProps) {
  const [sortBy, setSortBy] = useState("apy")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [filter, setFilter] = useState("all")

  const filteredValidators = validators.filter(validator => {
    if (filter === "verified") return validator.isVerified
    if (filter === "active") return validator.isActive
    if (filter === "high-apy") return validator.apy > 7
    return true
  })

  const sortedValidators = filteredValidators.sort((a, b) => {
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

  const handleDelegate = (validator: any) => {
    console.log("Delegate to", validator.name)
  }

  const handleUndelegate = (validator: any) => {
    console.log("Undelegate from", validator.name)
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Validators ({sortedValidators.length})</span>
          <Badge variant="outline" className="text-xs">
            Live
          </Badge>
        </div>
        <div className="flex space-x-1">
          {[
            { value: "all", label: "All" },
            { value: "verified", label: "Verified" },
            { value: "active", label: "Active" },
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
              <th className="text-left p-3 font-medium text-muted-foreground text-sm">Validator</th>
              <th className="text-right p-3 font-medium text-muted-foreground text-sm cursor-pointer" onClick={() => handleSort("apy")}>
                APY
                {sortBy === "apy" && (sortOrder === "desc" ? " ↓" : " ↑")}
              </th>
              <th className="text-right p-3 font-medium text-muted-foreground text-sm cursor-pointer" onClick={() => handleSort("commission")}>
                Commission
                {sortBy === "commission" && (sortOrder === "desc" ? " ↓" : " ↑")}
              </th>
              <th className="text-right p-3 font-medium text-muted-foreground text-sm cursor-pointer" onClick={() => handleSort("totalStake")}>
                Total Stake
                {sortBy === "totalStake" && (sortOrder === "desc" ? " ↓" : " ↑")}
              </th>
              <th className="text-right p-3 font-medium text-muted-foreground text-sm">Uptime</th>
              <th className="text-center p-3 font-medium text-muted-foreground text-sm">Status</th>
              <th className="text-center p-3 font-medium text-muted-foreground text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedValidators.map((validator) => (
              <tr key={validator.id} className="border-b hover:bg-muted/50 transition-colors">
                {/* Validator */}
                <td className="p-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                      {validator.name[0]}
                    </div>
                    <div>
                      <div className="font-medium text-sm flex items-center space-x-1">
                        {validator.name}
                        {validator.isVerified && (
                          <CheckCircle className="h-3 w-3 text-blue-500" />
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">{validator.description}</div>
                    </div>
                  </div>
                </td>

                {/* APY */}
                <td className="p-3 text-right">
                  <div className="font-medium text-green-500 text-sm">{validator.apy.toFixed(2)}%</div>
                  <div className="text-xs text-muted-foreground">Annual</div>
                </td>

                {/* Commission */}
                <td className="p-3 text-right">
                  <div className="font-medium text-sm">{validator.commission}%</div>
                  <div className="text-xs text-muted-foreground">Fee</div>
                </td>

                {/* Total Stake */}
                <td className="p-3 text-right">
                  <div className="font-medium text-sm">
                    {showValues ? `$${validator.totalStake.toLocaleString()}` : "••••••"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {validator.totalStake.toLocaleString()} SOL
                  </div>
                </td>

                {/* Uptime */}
                <td className="p-3 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <div className="w-16 bg-muted rounded-full h-2">
                      <div 
                        className={cn(
                          "h-2 rounded-full",
                          validator.uptime > 99.5 ? "bg-green-500" :
                          validator.uptime > 99 ? "bg-yellow-500" : "bg-red-500"
                        )}
                        style={{ width: `${validator.uptime}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{validator.uptime.toFixed(1)}%</span>
                  </div>
                </td>

                {/* Status */}
                <td className="p-3 text-center">
                  <div className="flex flex-col items-center space-y-1">
                    <Badge 
                      variant={validator.isActive ? "default" : "outline"}
                      className={cn(
                        "text-xs",
                        validator.isActive ? "bg-green-500 hover:bg-green-600" : ""
                      )}
                    >
                      {validator.isActive ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <XCircle className="h-3 w-3 mr-1" />
                      )}
                      {validator.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <div className="text-xs text-muted-foreground">
                      Score: {validator.score}
                    </div>
                  </div>
                </td>

                {/* Actions */}
                <td className="p-3 text-center">
                  <div className="flex items-center justify-center space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelegate(validator)}
                      className="text-xs h-7 px-2"
                    >
                      <Users className="h-3 w-3 mr-1" />
                      Delegate
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUndelegate(validator)}
                      className="text-xs h-7 px-2"
                    >
                      <XCircle className="h-3 w-3 mr-1" />
                      Undelegate
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

      {/* Validator Info */}
      <div className="px-4 py-3 border-t bg-muted/30">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-blue-500" />
            <div>
              <div className="font-medium">Network Security</div>
              <div className="text-xs text-muted-foreground">Validators secure the Solana network</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Award className="h-4 w-4 text-green-500" />
            <div>
              <div className="font-medium">Rewards</div>
              <div className="text-xs text-muted-foreground">Earn rewards for delegating to validators</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-purple-500" />
            <div>
              <div className="font-medium">Uptime</div>
              <div className="text-xs text-muted-foreground">Higher uptime = more reliable rewards</div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="px-4 py-3 border-t bg-muted/30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Total Validators:</span>
            <div className="font-medium">{validators.length}</div>
          </div>
          <div>
            <span className="text-muted-foreground">Active:</span>
            <div className="font-medium text-green-500">
              {validators.filter(v => v.isActive).length}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Verified:</span>
            <div className="font-medium text-blue-500">
              {validators.filter(v => v.isVerified).length}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Avg APY:</span>
            <div className="font-medium text-green-500">
              {(validators.reduce((sum, v) => sum + v.apy, 0) / validators.length).toFixed(2)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



















