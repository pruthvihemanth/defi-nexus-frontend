"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Percent
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AssetAllocationProps {
  assets: any[]
  showValues: boolean
}

const COLORS = [
  "#3B82F6", // Blue
  "#10B981", // Green
  "#F59E0B", // Yellow
  "#EF4444", // Red
  "#8B5CF6", // Purple
  "#06B6D4", // Cyan
  "#F97316", // Orange
  "#EC4899", // Pink
]

export function AssetAllocation({ assets, showValues }: AssetAllocationProps) {
  const chartData = assets.map((asset, index) => ({
    name: asset.symbol,
    value: asset.value,
    allocation: asset.allocation,
    pnl: asset.pnl,
    pnlPercent: asset.pnlPercent,
    color: COLORS[index % COLORS.length]
  }))

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-lg border">
          <div className="flex items-center space-x-2 mb-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: data.color }}
            />
            <span className="font-medium">{data.name}</span>
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Value:</span>
              <span className="font-medium">
                {showValues ? `$${data.value.toLocaleString()}` : "••••••"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Allocation:</span>
              <span className="font-medium">{data.allocation.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">P&L:</span>
              <span className={cn(
                "font-medium",
                data.pnlPercent >= 0 ? "text-green-500" : "text-red-500"
              )}>
                {showValues ? `$${data.pnl.toLocaleString()}` : "••••"} ({data.pnlPercent >= 0 ? "+" : ""}{data.pnlPercent.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Asset List */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm text-muted-foreground">Asset Breakdown</h4>
        <div className="space-y-2">
          {assets.map((asset, index) => (
            <div key={asset.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  {asset.icon}
                </div>
                <div>
                  <div className="font-medium text-sm">{asset.symbol}</div>
                  <div className="text-xs text-muted-foreground">{asset.name}</div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {asset.type}
                </Badge>
              </div>
              
              <div className="flex items-center space-x-6 text-sm">
                <div className="text-right">
                  <div className="font-medium">
                    {showValues ? `$${asset.value.toLocaleString()}` : "••••••"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {asset.allocation.toFixed(1)}%
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="font-medium">
                    {showValues ? `${asset.amount.toLocaleString()}` : "••••••"} {asset.symbol}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {showValues ? `$${asset.price.toFixed(2)}` : "••••"} per token
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
                    {showValues ? `$${asset.pnl.toLocaleString()}` : "••••"} P&L
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-lg bg-muted/30">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-500">
            {assets.length}
          </div>
          <div className="text-xs text-muted-foreground">Total Assets</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-500">
            {assets.filter(a => a.pnlPercent > 0).length}
          </div>
          <div className="text-xs text-muted-foreground">Profitable</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-500">
            {assets.reduce((sum, a) => sum + a.allocation, 0).toFixed(1)}%
          </div>
          <div className="text-xs text-muted-foreground">Total Allocation</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-500">
            {assets.reduce((sum, a) => sum + a.pnl, 0) >= 0 ? "+" : ""}
            {showValues ? `$${assets.reduce((sum, a) => sum + a.pnl, 0).toLocaleString()}` : "••••"}
          </div>
          <div className="text-xs text-muted-foreground">Total P&L</div>
        </div>
      </div>
    </div>
  )
}












