"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Activity,
  DollarSign,
  Percent,
  Target,
  Shield,
  Zap,
  Clock
} from "lucide-react"
import { cn } from "@/lib/utils"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

interface PortfolioAnalyticsProps {
  portfolioData: any
  showValues: boolean
}

export function PortfolioAnalytics({ portfolioData, showValues }: PortfolioAnalyticsProps) {
  const [isClient, setIsClient] = useState(false)
  const [timeframe, setTimeframe] = useState("7d")

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Mock historical data
  const historicalData = isClient ? [
    { date: "2024-01-01", value: 100000, pnl: 0 },
    { date: "2024-01-02", value: 102500, pnl: 2500 },
    { date: "2024-01-03", value: 101000, pnl: 1000 },
    { date: "2024-01-04", value: 103500, pnl: 3500 },
    { date: "2024-01-05", value: 105000, pnl: 5000 },
    { date: "2024-01-06", value: 107500, pnl: 7500 },
    { date: "2024-01-07", value: 110000, pnl: 10000 },
    { date: "2024-01-08", value: 112000, pnl: 12000 },
    { date: "2024-01-09", value: 115000, pnl: 15000 },
    { date: "2024-01-10", value: 120000, pnl: 20000 },
    { date: "2024-01-11", value: 118000, pnl: 18000 },
    { date: "2024-01-12", value: 122000, pnl: 22000 },
    { date: "2024-01-13", value: 125000, pnl: 25000 },
    { date: "2024-01-14", value: 123000, pnl: 23000 },
    { date: "2024-01-15", value: 125000, pnl: 25000 }
  ] : []

  const timeframes = ["1d", "7d", "30d", "90d", "1y"]

  const analytics = {
    totalReturn: 25.0,
    annualizedReturn: 18.5,
    sharpeRatio: 1.8,
    maxDrawdown: -8.2,
    volatility: 12.3,
    winRate: 68.5,
    avgWin: 1250,
    avgLoss: -450,
    profitFactor: 2.1,
    totalTrades: 156,
    winningTrades: 107,
    losingTrades: 49
  }

  const riskMetrics = {
    var95: -2.5,
    var99: -4.1,
    expectedShortfall: -3.2,
    beta: 1.2,
    alpha: 0.8,
    informationRatio: 1.5
  }

  if (!isClient) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Loading analytics...
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Performance Chart */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Portfolio Performance</h3>
          <div className="flex space-x-1">
            {timeframes.map((tf) => (
              <Button
                key={tf}
                variant={timeframe === tf ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeframe(tf)}
                className="text-xs h-7 px-3"
              >
                {tf}
              </Button>
            ))}
          </div>
        </div>
        
        <Card>
          <CardContent className="p-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString()}
                    className="text-xs"
                  />
                  <YAxis 
                    tickFormatter={(value) => showValues ? `$${(value / 1000).toFixed(0)}k` : "••••"}
                    className="text-xs"
                  />
                  <Tooltip
                    formatter={(value: any, name: string) => [
                      showValues ? `$${value.toLocaleString()}` : "••••••",
                      name === "value" ? "Portfolio Value" : "P&L"
                    ]}
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3B82F6"
                    fill="url(#colorGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-sm font-medium">Total Return</div>
                <div className="text-2xl font-bold text-green-500">
                  +{analytics.totalReturn.toFixed(1)}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-sm font-medium">Sharpe Ratio</div>
                <div className="text-2xl font-bold text-blue-500">
                  {analytics.sharpeRatio.toFixed(2)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingDown className="h-5 w-5 text-red-500" />
              <div>
                <div className="text-sm font-medium">Max Drawdown</div>
                <div className="text-2xl font-bold text-red-500">
                  {analytics.maxDrawdown.toFixed(1)}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-purple-500" />
              <div>
                <div className="text-sm font-medium">Volatility</div>
                <div className="text-2xl font-bold text-purple-500">
                  {analytics.volatility.toFixed(1)}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trading Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Trading Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Total Trades</div>
                <div className="text-xl font-bold">{analytics.totalTrades}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Win Rate</div>
                <div className="text-xl font-bold text-green-500">
                  {analytics.winRate.toFixed(1)}%
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Winning Trades</div>
                <div className="text-xl font-bold text-green-500">
                  {analytics.winningTrades}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Losing Trades</div>
                <div className="text-xl font-bold text-red-500">
                  {analytics.losingTrades}
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Average Win:</span>
                <span className="font-medium">
                  {showValues ? `$${analytics.avgWin.toLocaleString()}` : "••••••"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Average Loss:</span>
                <span className="font-medium text-red-500">
                  {showValues ? `$${Math.abs(analytics.avgLoss).toLocaleString()}` : "••••••"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Profit Factor:</span>
                <span className="font-medium text-green-500">
                  {analytics.profitFactor.toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Risk Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">VaR (95%):</span>
                <span className="font-medium text-red-500">
                  {riskMetrics.var95.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">VaR (99%):</span>
                <span className="font-medium text-red-500">
                  {riskMetrics.var99.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Expected Shortfall:</span>
                <span className="font-medium text-red-500">
                  {riskMetrics.expectedShortfall.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Beta:</span>
                <span className="font-medium">
                  {riskMetrics.beta.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Alpha:</span>
                <span className="font-medium text-green-500">
                  {riskMetrics.alpha.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Information Ratio:</span>
                <span className="font-medium text-blue-500">
                  {riskMetrics.informationRatio.toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Asset Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Asset Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {portfolioData.assets.map((asset: any) => (
              <div key={asset.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                    {asset.icon}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{asset.symbol}</div>
                    <div className="text-xs text-muted-foreground">{asset.name}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-right">
                    <div className="font-medium">
                      {showValues ? `$${asset.value.toLocaleString()}` : "••••••"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {asset.allocation.toFixed(1)}% of portfolio
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={cn(
                      "font-medium flex items-center",
                      asset.pnlPercent >= 0 ? "text-green-500" : "text-red-500"
                    )}>
                      {asset.pnlPercent >= 0 ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {asset.pnlPercent >= 0 ? "+" : ""}{asset.pnlPercent.toFixed(2)}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {showValues ? `$${asset.pnl.toLocaleString()}` : "••••••"} P&L
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
