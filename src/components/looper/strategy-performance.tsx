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
  Clock,
  Award,
  Bot
} from "lucide-react"
import { cn } from "@/lib/utils"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"

interface StrategyPerformanceProps {
  strategies: any[]
  showValues: boolean
}

export function StrategyPerformance({ strategies, showValues }: StrategyPerformanceProps) {
  const [isClient, setIsClient] = useState(false)
  const [timeframe, setTimeframe] = useState("7d")

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Mock historical data
  const historicalData = isClient ? [
    { date: "2024-01-01", value: 10000, pnl: 0 },
    { date: "2024-01-02", value: 10250, pnl: 250 },
    { date: "2024-01-03", value: 10100, pnl: 100 },
    { date: "2024-01-04", value: 10350, pnl: 350 },
    { date: "2024-01-05", value: 10500, pnl: 500 },
    { date: "2024-01-06", value: 10750, pnl: 750 },
    { date: "2024-01-07", value: 11000, pnl: 1000 },
    { date: "2024-01-08", value: 11200, pnl: 1200 },
    { date: "2024-01-09", value: 11500, pnl: 1500 },
    { date: "2024-01-10", value: 12000, pnl: 2000 },
    { date: "2024-01-11", value: 11800, pnl: 1800 },
    { date: "2024-01-12", value: 12200, pnl: 2200 },
    { date: "2024-01-13", value: 12500, pnl: 2500 },
    { date: "2024-01-14", value: 12300, pnl: 2300 },
    { date: "2024-01-15", value: 12500, pnl: 2500 }
  ] : []

  const timeframes = ["1d", "7d", "30d", "90d", "1y"]

  const totalValue = strategies.reduce((sum, s) => sum + s.amount, 0)
  const totalPnl = strategies.reduce((sum, s) => sum + s.pnl, 0)
  const totalPnlPercent = (totalPnl / totalValue) * 100
  const avgApy = strategies.reduce((sum, s) => sum + s.apy, 0) / strategies.length

  const performanceMetrics = {
    totalReturn: totalPnlPercent,
    sharpeRatio: 2.1,
    maxDrawdown: -8.2,
    volatility: 12.3,
    winRate: 78.5,
    profitFactor: 2.8,
    totalTrades: 156,
    avgTradeSize: 1250
  }

  if (!isClient) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Loading performance data...
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
                  +{performanceMetrics.totalReturn.toFixed(1)}%
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
                  {performanceMetrics.sharpeRatio.toFixed(2)}
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
                  {performanceMetrics.maxDrawdown.toFixed(1)}%
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
                <div className="text-sm font-medium">Win Rate</div>
                <div className="text-2xl font-bold text-purple-500">
                  {performanceMetrics.winRate.toFixed(1)}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Strategy Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Strategy Performance Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {strategies.map((strategy) => (
              <div key={strategy.id} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{strategy.strategy}</div>
                    <div className="text-xs text-muted-foreground">
                      {strategy.apy.toFixed(1)}% APY
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-right">
                    <div className="font-medium">
                      {showValues ? `$${strategy.amount.toLocaleString()}` : "••••••"}
                    </div>
                    <div className="text-xs text-muted-foreground">Invested</div>
                  </div>
                  
                  <div className="text-right">
                    <div className={cn(
                      "font-medium flex items-center",
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

                  <div className="text-right">
                    <div className="font-medium text-green-500">
                      {strategy.apy.toFixed(1)}%
                    </div>
                    <div className="text-xs text-muted-foreground">APY</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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
                <div className="text-xl font-bold">{performanceMetrics.totalTrades}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Avg Trade Size</div>
                <div className="text-xl font-bold">
                  {showValues ? `$${performanceMetrics.avgTradeSize.toLocaleString()}` : "••••••"}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Profit Factor</div>
                <div className="text-xl font-bold text-green-500">
                  {performanceMetrics.profitFactor.toFixed(2)}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Volatility</div>
                <div className="text-xl font-bold text-yellow-500">
                  {performanceMetrics.volatility.toFixed(1)}%
                </div>
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
                <span className="font-medium text-red-500">-2.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Expected Shortfall:</span>
                <span className="font-medium text-red-500">-3.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Beta:</span>
                <span className="font-medium">1.2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Alpha:</span>
                <span className="font-medium text-green-500">0.8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Information Ratio:</span>
                <span className="font-medium text-blue-500">1.5</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}



