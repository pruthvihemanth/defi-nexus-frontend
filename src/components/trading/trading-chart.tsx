"use client"

import { useState, useMemo, useEffect } from "react"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  ReferenceLine
} from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  Activity,
  Settings,
  Maximize2
} from "lucide-react"
import { cn } from "@/lib/utils"

interface TradingChartProps {
  symbol: string
  timeframe: string
  data: any[]
}

// Generate mock candlestick data
const generateMockData = (timeframe: string, symbol: string) => {
  const data = []
  const now = new Date()
  const intervals = {
    "1m": 1 * 60 * 1000,
    "5m": 5 * 60 * 1000,
    "15m": 15 * 60 * 1000,
    "1H": 60 * 60 * 1000,
    "4H": 4 * 60 * 60 * 1000,
    "1D": 24 * 60 * 60 * 1000,
    "1W": 7 * 24 * 60 * 60 * 1000
  }
  
  const interval = intervals[timeframe as keyof typeof intervals] || intervals["1H"]
  const points = timeframe === "1W" ? 52 : timeframe === "1D" ? 30 : 100
  
  let basePrice = symbol === "SOL" ? 95 : symbol === "BTC" ? 42000 : symbol === "ETH" ? 2600 : 3.0
  
  for (let i = points; i >= 0; i--) {
    const time = new Date(now.getTime() - (i * interval))
    const volatility = 0.02
    const change = (Math.random() - 0.5) * volatility
    basePrice = basePrice * (1 + change)
    
    const high = basePrice * (1 + Math.random() * 0.01)
    const low = basePrice * (1 - Math.random() * 0.01)
    const open = i === points ? basePrice : data[data.length - 1]?.close || basePrice
    const close = basePrice
    
    data.push({
      time: time.toISOString(),
      timestamp: time.getTime(),
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      volume: Math.random() * 1000000,
      value: close
    })
  }
  
  return data
}

export function TradingChart({ symbol, timeframe, data }: TradingChartProps) {
  const [chartType, setChartType] = useState<"line" | "area" | "candlestick">("area")
  const [indicators, setIndicators] = useState<string[]>([])
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  const mockData = useMemo(() => isClient ? generateMockData(timeframe, symbol) : [], [timeframe, symbol, isClient])
  const chartData = data.length > 0 ? data : mockData
  
  const currentPrice = chartData[chartData.length - 1]?.close || 0
  const previousPrice = chartData[chartData.length - 2]?.close || currentPrice
  const priceChange = currentPrice - previousPrice
  const priceChangePercent = (priceChange / previousPrice) * 100
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background border rounded-lg shadow-lg p-3">
          <p className="text-sm font-medium">{new Date(label).toLocaleString()}</p>
          <div className="space-y-1 mt-2">
            <p className="text-sm">
              <span className="text-muted-foreground">Price: </span>
              <span className="font-medium">${data.close?.toFixed(2) || data.value?.toFixed(2)}</span>
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">Volume: </span>
              <span className="font-medium">{data.volume?.toLocaleString()}</span>
            </p>
            {data.high && (
              <>
                <p className="text-sm">
                  <span className="text-muted-foreground">High: </span>
                  <span className="font-medium">${data.high.toFixed(2)}</span>
                </p>
                <p className="text-sm">
                  <span className="text-muted-foreground">Low: </span>
                  <span className="font-medium">${data.low.toFixed(2)}</span>
                </p>
              </>
            )}
          </div>
        </div>
      )
    }
    return null
  }
  
  if (!isClient) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="text-muted-foreground">Loading chart...</div>
      </div>
    )
  }

  const chartComponent = (
    <div className={cn("w-full", isFullscreen ? "h-screen" : "h-96")}>
      <ResponsiveContainer width="100%" height="100%">
        {chartType === "area" ? (
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
            <XAxis 
              dataKey="timestamp"
              type="number"
              scale="time"
              domain={['dataMin', 'dataMax']}
              tickFormatter={(value) => new Date(value).toLocaleTimeString()}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis 
              domain={['dataMin - dataMin * 0.01', 'dataMax + dataMax * 0.01']}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="close"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#colorGradient)"
            />
            <ReferenceLine 
              y={currentPrice} 
              stroke={priceChange >= 0 ? "#10b981" : "#ef4444"}
              strokeDasharray="5 5"
              label={{ value: `$${currentPrice.toFixed(2)}`, position: "right" }}
            />
          </AreaChart>
        ) : (
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted))" />
            <XAxis 
              dataKey="timestamp"
              type="number"
              scale="time"
              domain={['dataMin', 'dataMax']}
              tickFormatter={(value) => new Date(value).toLocaleTimeString()}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis 
              domain={['dataMin - dataMin * 0.01', 'dataMax + dataMax * 0.01']}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="close"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
            />
            <ReferenceLine 
              y={currentPrice} 
              stroke={priceChange >= 0 ? "#10b981" : "#ef4444"}
              strokeDasharray="5 5"
              label={{ value: `$${currentPrice.toFixed(2)}`, position: "right" }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  )

  return (
    <div className="space-y-4">
      {/* Chart Controls */}
      <div className="flex items-center justify-between px-6 py-3 border-b">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold">${currentPrice.toFixed(2)}</span>
            <span className={cn(
              "text-sm flex items-center",
              priceChange >= 0 ? "text-green-500" : "text-red-500"
            )}>
              {priceChange >= 0 ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {priceChangePercent.toFixed(2)}%
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            {[
              { type: "area", icon: AreaChart, label: "Area" },
              { type: "line", icon: Activity, label: "Line" },
              { type: "candlestick", icon: BarChart3, label: "Candles" }
            ].map(({ type, icon: Icon, label }) => (
              <Button
                key={type}
                variant={chartType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setChartType(type as any)}
                className="text-xs h-8"
              >
                <Icon className="h-3 w-3 mr-1" />
                {label}
              </Button>
            ))}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="h-8 w-8 p-0"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Chart */}
      {chartComponent}
      
      {/* Chart Footer */}
      <div className="flex items-center justify-between px-6 py-3 border-t text-sm text-muted-foreground">
        <div className="flex items-center space-x-4">
          <span>24h High: ${Math.max(...chartData.map(d => d.high || d.close)).toFixed(2)}</span>
          <span>24h Low: ${Math.min(...chartData.map(d => d.low || d.close)).toFixed(2)}</span>
          <span>24h Volume: {chartData.reduce((sum, d) => sum + (d.volume || 0), 0).toLocaleString()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-xs">
            <Settings className="h-3 w-3 mr-1" />
            Indicators
          </Button>
        </div>
      </div>
    </div>
  )
}
