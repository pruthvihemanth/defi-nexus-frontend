"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Activity,
  DollarSign,
  Percent,
  Clock,
  Info,
  Shield,
  AlertTriangle
} from "lucide-react"
import { cn } from "@/lib/utils"

interface MarketDataProps {
  asset: any
}

export function MarketData({ asset }: MarketDataProps) {
  const [isClient, setIsClient] = useState(false)
  const [timeframe, setTimeframe] = useState("24h")

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Mock historical data
  const historicalData = isClient ? [
    { time: "1h", supplyApy: asset.supplyApy + (Math.random() - 0.5) * 2, borrowApy: asset.borrowApy + (Math.random() - 0.5) * 2 },
    { time: "6h", supplyApy: asset.supplyApy + (Math.random() - 0.5) * 1.5, borrowApy: asset.borrowApy + (Math.random() - 0.5) * 1.5 },
    { time: "24h", supplyApy: asset.supplyApy, borrowApy: asset.borrowApy },
    { time: "7d", supplyApy: asset.supplyApy + (Math.random() - 0.5) * 3, borrowApy: asset.borrowApy + (Math.random() - 0.5) * 3 },
  ] : []

  const timeframes = ["1h", "6h", "24h", "7d"]

  if (!isClient) {
    return (
      <div className="space-y-4">
        <div className="text-center py-4 text-muted-foreground">
          Loading market data...
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Price and Change */}
      <div className="text-center p-4 rounded-lg bg-muted/50">
        <div className="text-2xl font-bold">${asset.price.toFixed(2)}</div>
        <div className={cn(
          "text-sm flex items-center justify-center",
          asset.priceChange >= 0 ? "text-green-500" : "text-red-500"
        )}>
          {asset.priceChange >= 0 ? (
            <TrendingUp className="h-4 w-4 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 mr-1" />
          )}
          {asset.priceChange >= 0 ? "+" : ""}{asset.priceChange.toFixed(2)}%
        </div>
        <div className="text-xs text-muted-foreground mt-1">24h change</div>
      </div>

      {/* APY Trends */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">APY Trends</span>
          <div className="flex space-x-1">
            {timeframes.map((tf) => (
              <Button
                key={tf}
                variant={timeframe === tf ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeframe(tf)}
                className="text-xs h-6 px-2"
              >
                {tf}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {historicalData.map((data, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{data.time}</span>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">{data.supplyApy.toFixed(2)}%</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingDown className="h-3 w-3 text-red-500" />
                  <span className="text-red-500">{data.borrowApy.toFixed(2)}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market Stats */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <BarChart3 className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-medium">Market Statistics</span>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Supply:</span>
            <span className="font-medium">${asset.totalSupply.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Borrowed:</span>
            <span className="font-medium">${asset.totalBorrowed.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Utilization:</span>
            <span className="font-medium">{asset.utilizationRate.toFixed(1)}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Reserve Factor:</span>
            <span className="font-medium">{(asset.reserveFactor * 100).toFixed(1)}%</span>
          </div>
        </div>
      </div>

      {/* Collateral Info */}
      {asset.isCollateral && (
        <div className="space-y-3 p-3 rounded-lg border border-blue-200 bg-blue-50 dark:bg-blue-900/20">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Collateral Information</span>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-blue-700 dark:text-blue-300">Collateral Factor:</span>
              <span className="font-medium text-blue-800 dark:text-blue-200">
                {asset.collateralFactor * 100}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700 dark:text-blue-300">Liquidation Threshold:</span>
              <span className="font-medium text-blue-800 dark:text-blue-200">
                {asset.liquidationThreshold * 100}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700 dark:text-blue-300">Max LTV:</span>
              <span className="font-medium text-blue-800 dark:text-blue-200">
                {asset.maxLtv}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700 dark:text-blue-300">Liquidation Penalty:</span>
              <span className="font-medium text-blue-800 dark:text-blue-200">
                {asset.liquidationPenalty.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Risk Indicators */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
          <span className="text-sm font-medium">Risk Indicators</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Utilization Risk:</span>
            <Badge 
              variant={asset.utilizationRate > 80 ? "destructive" : asset.utilizationRate > 60 ? "secondary" : "default"}
              className="text-xs"
            >
              {asset.utilizationRate > 80 ? "High" : asset.utilizationRate > 60 ? "Medium" : "Low"}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Liquidity Risk:</span>
            <Badge 
              variant={asset.totalSupply < 1000000 ? "destructive" : "default"}
              className="text-xs"
            >
              {asset.totalSupply < 1000000 ? "High" : "Low"}
            </Badge>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" size="sm" className="text-xs">
          <Info className="h-3 w-3 mr-1" />
          Learn More
        </Button>
        <Button variant="outline" size="sm" className="text-xs">
          <Activity className="h-3 w-3 mr-1" />
          View Details
        </Button>
      </div>
    </div>
  )
}
