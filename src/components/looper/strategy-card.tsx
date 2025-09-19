"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  Coins
} from "lucide-react"
import { cn } from "@/lib/utils"

interface StrategyCardProps {
  strategy: any
  showValues: boolean
  onSelect: () => void
}

const riskColors = {
  Low: "bg-green-500",
  Medium: "bg-yellow-500", 
  High: "bg-red-500"
}

const statusColors = {
  active: "bg-green-500",
  paused: "bg-yellow-500",
  stopped: "bg-red-500"
}

const typeIcons = {
  DCA: Repeat,
  "Yield Farming": Layers,
  Arbitrage: ArrowUpRight,
  Liquidation: Target,
  Stablecoin: DollarSign
}

export function StrategyCard({ strategy, showValues, onSelect }: StrategyCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const TypeIcon = typeIcons[strategy.type as keyof typeof typeIcons] || Bot

  const handleInvest = () => {
    console.log("Invest in strategy:", strategy.name)
  }

  const handlePause = () => {
    console.log("Pause strategy:", strategy.name)
  }

  const handleStop = () => {
    console.log("Stop strategy:", strategy.name)
  }

  return (
    <Card 
      className={cn(
        "border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm transition-all duration-300 cursor-pointer",
        isHovered ? "shadow-2xl scale-105" : "hover:shadow-2xl hover:scale-102"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center text-white",
              `bg-gradient-to-r from-${strategy.color}-500 to-${strategy.color}-600`
            )}>
              <TypeIcon className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-lg flex items-center space-x-2">
                {strategy.name}
                {strategy.isVerified && (
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                )}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{strategy.type}</p>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={cn(
              "text-xs",
              statusColors[strategy.status as keyof typeof statusColors] || "bg-gray-500"
            )}
          >
            {strategy.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {strategy.description}
        </p>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <div className="text-2xl font-bold text-green-500">
              {strategy.apy.toFixed(1)}%
            </div>
            <div className="text-xs text-muted-foreground">APY</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-muted/50">
            <div className="text-2xl font-bold">
              {showValues ? `$${(strategy.tvl / 1000000).toFixed(1)}M` : "••••"}
            </div>
            <div className="text-xs text-muted-foreground">TVL</div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total Return:</span>
            <span className="font-medium text-green-500">
              +{strategy.performance.totalReturn.toFixed(1)}%
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Sharpe Ratio:</span>
            <span className="font-medium">
              {strategy.performance.sharpeRatio.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Win Rate:</span>
            <span className="font-medium text-green-500">
              {strategy.performance.winRate.toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Risk and Duration */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <Badge 
              variant="outline" 
              className={cn(
                "text-xs",
                riskColors[strategy.risk as keyof typeof riskColors] || "bg-gray-500"
              )}
            >
              {strategy.risk} Risk
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{strategy.duration}</span>
          </div>
        </div>

        {/* Tokens */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">Supported Tokens:</div>
          <div className="flex flex-wrap gap-1">
            {strategy.tokens.map((token: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {token}
              </Badge>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">Features:</div>
          <div className="flex flex-wrap gap-1">
            {strategy.features.slice(0, 3).map((feature: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {feature}
              </Badge>
            ))}
            {strategy.features.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{strategy.features.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Creator */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">by</span>
            <span className="font-medium">{strategy.creator}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Coins className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {strategy.performance.totalTrades} trades
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Button
            onClick={(e) => {
              e.stopPropagation()
              handleInvest()
            }}
            className="flex-1"
            variant="gradient"
          >
            <Zap className="h-4 w-4 mr-2" />
            Invest
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation()
              handlePause()
            }}
            variant="outline"
            size="sm"
          >
            <Pause className="h-4 w-4" />
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation()
              handleStop()
            }}
            variant="outline"
            size="sm"
          >
            <Square className="h-4 w-4" />
          </Button>
        </div>

        {/* Investment Range */}
        <div className="text-center text-xs text-muted-foreground pt-2 border-t">
          Min: {strategy.minDeposit.toLocaleString()} • Max: {strategy.maxDeposit.toLocaleString()}
        </div>
      </CardContent>
    </Card>
  )
}
