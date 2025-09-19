"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Shield, 
  AlertTriangle,
  BarChart3,
  Clock,
  Percent,
  Star,
  Activity,
  Target,
  Info,
  Zap,
  Play,
  Pause,
  Square,
  Bot,
  Cpu,
  Layers,
  Repeat,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  XCircle,
  Users,
  Coins,
  MoreHorizontal,
  Settings
} from "lucide-react"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"

interface ActiveStrategiesProps {
  strategies: any[]
  showValues: boolean
}

const statusConfigs = {
  running: { label: "Running", icon: Play, color: "text-green-500" },
  paused: { label: "Paused", icon: Pause, color: "text-yellow-500" },
  stopped: { label: "Stopped", icon: Square, color: "text-red-500" }
}

export function ActiveStrategies({ strategies, showValues }: ActiveStrategiesProps) {
  const [sortBy, setSortBy] = useState("pnl")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const sortedStrategies = strategies.sort((a, b) => {
    const aValue = a[sortBy as keyof typeof a]
    const bValue = b[sortBy as keyof typeof b]
    
    if (sortOrder === "asc") {
      return aValue - bValue
    } else {
      return bValue - aValue
    }
  })

  const handlePause = (strategyId: string) => {
    console.log("Pause strategy:", strategyId)
  }

  const handleStop = (strategyId: string) => {
    console.log("Stop strategy:", strategyId)
  }

  const handleSettings = (strategyId: string) => {
    console.log("Open settings for strategy:", strategyId)
  }

  if (strategies.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <Bot className="h-8 w-8" />
          </div>
          <p className="text-lg font-medium">No Active Strategies</p>
          <p className="text-sm">Start investing in strategies to see them here</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header with Sort Options */}
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <div className="flex items-center space-x-2">
          <h3 className="font-medium">Active Strategies ({strategies.length})</h3>
          <Badge variant="outline" className="text-xs">
            Live
          </Badge>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 text-sm border rounded-md bg-background"
          >
            <option value="pnl">Sort by P&L</option>
            <option value="apy">Sort by APY</option>
            <option value="amount">Sort by Amount</option>
            <option value="startDate">Sort by Start Date</option>
          </select>
        </div>
      </div>

      {/* Strategies List */}
      <div className="space-y-2">
        {sortedStrategies.map((strategy) => {
          const statusConfig = statusConfigs[strategy.status as keyof typeof statusConfigs]
          const StatusIcon = statusConfig?.icon || Play

          return (
            <div key={strategy.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-4">
                {/* Strategy Icon */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
                  <Bot className="h-5 w-5" />
                </div>

                {/* Strategy Details */}
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">{strategy.strategy}</span>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs",
                        statusConfig?.color || "text-gray-500"
                      )}
                    >
                      {StatusIcon && <StatusIcon className="h-3 w-3 mr-1" />}
                      {statusConfig?.label || strategy.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                    <span>Started {formatDistanceToNow(strategy.startDate, { addSuffix: true })}</span>
                    <span>•</span>
                    <span>Next: {formatDistanceToNow(strategy.nextExecution, { addSuffix: true })}</span>
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <div className="font-medium text-sm">
                    {showValues ? `$${strategy.amount.toLocaleString()}` : "••••••"}
                  </div>
                  <div className="text-xs text-muted-foreground">Invested</div>
                </div>

                <div className="text-right">
                  <div className="font-medium text-sm text-green-500">
                    {strategy.apy.toFixed(1)}%
                  </div>
                  <div className="text-xs text-muted-foreground">APY</div>
                </div>

                <div className="text-right">
                  <div className={cn(
                    "font-medium text-sm flex items-center",
                    strategy.pnl >= 0 ? "text-green-500" : "text-red-500"
                  )}>
                    {strategy.pnl >= 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {showValues ? `$${strategy.pnl.toLocaleString()}` : "••••••"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {strategy.pnlPercent >= 0 ? "+" : ""}{strategy.pnlPercent.toFixed(1)}% P&L
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-1">
                  {strategy.status === "running" ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePause(strategy.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Pause className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePause(strategy.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleStop(strategy.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Square className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSettings(strategy.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>

                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Summary Stats */}
      <div className="px-4 py-3 border-t bg-muted/30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Total Invested:</span>
            <div className="font-medium">
              {showValues ? `$${strategies.reduce((sum, s) => sum + s.amount, 0).toLocaleString()}` : "••••••"}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Total P&L:</span>
            <div className="font-medium text-green-500">
              {showValues ? `$${strategies.reduce((sum, s) => sum + s.pnl, 0).toLocaleString()}` : "••••••"}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Avg APY:</span>
            <div className="font-medium text-blue-500">
              {(strategies.reduce((sum, s) => sum + s.apy, 0) / strategies.length).toFixed(1)}%
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Running:</span>
            <div className="font-medium text-green-500">
              {strategies.filter(s => s.status === "running").length}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
