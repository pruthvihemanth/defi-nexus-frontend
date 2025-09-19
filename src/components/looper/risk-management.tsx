"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Shield, 
  AlertTriangle,
  Target,
  DollarSign,
  Percent,
  Clock,
  Settings,
  Save,
  Trash2,
  Plus,
  Minus,
  Info,
  TrendingDown
} from "lucide-react"
import { cn } from "@/lib/utils"

interface RiskManagementProps {
  strategies: any[]
  showValues: boolean
}

export function RiskManagement({ strategies, showValues }: RiskManagementProps) {
  const [riskSettings, setRiskSettings] = useState({
    maxDrawdown: 10,
    stopLoss: 5,
    takeProfit: 20,
    maxPositionSize: 10000,
    dailyLossLimit: 1000,
    maxConcurrentStrategies: 5,
    emergencyStop: false
  })

  const [alerts, setAlerts] = useState([
    {
      id: "1",
      type: "drawdown",
      threshold: 5,
      enabled: true,
      message: "Portfolio drawdown exceeds 5%"
    },
    {
      id: "2",
      type: "loss",
      threshold: 500,
      enabled: true,
      message: "Daily loss exceeds $500"
    },
    {
      id: "3",
      type: "volatility",
      threshold: 15,
      enabled: false,
      message: "Portfolio volatility exceeds 15%"
    }
  ])

  const handleSaveSettings = () => {
    console.log("Saving risk settings:", riskSettings)
  }

  const handleAddAlert = () => {
    const newAlert = {
      id: Date.now().toString(),
      type: "custom",
      threshold: 0,
      enabled: true,
      message: "Custom alert"
    }
    setAlerts([...alerts, newAlert])
  }

  const handleDeleteAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId))
  }

  const handleToggleAlert = (alertId: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, enabled: !alert.enabled } : alert
    ))
  }

  const totalValue = strategies.reduce((sum, s) => sum + s.amount, 0)
  const totalPnl = strategies.reduce((sum, s) => sum + s.pnl, 0)
  const currentDrawdown = Math.min(0, (totalPnl / totalValue) * 100)
  const riskScore = Math.min(100, Math.max(0, 50 + (currentDrawdown * 5)))

  return (
    <div className="space-y-6">
      {/* Risk Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-sm font-medium">Risk Score</div>
                <div className={cn(
                  "text-2xl font-bold",
                  riskScore > 70 ? "text-red-500" : 
                  riskScore > 40 ? "text-yellow-500" : "text-green-500"
                )}>
                  {riskScore.toFixed(0)}/100
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
                <div className="text-sm font-medium">Current Drawdown</div>
                <div className="text-2xl font-bold text-red-500">
                  {currentDrawdown.toFixed(2)}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-sm font-medium">Max Drawdown</div>
                <div className="text-2xl font-bold text-green-500">
                  {riskSettings.maxDrawdown}%
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Risk Management Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Max Drawdown (%)</label>
                <Input
                  type="number"
                  value={riskSettings.maxDrawdown}
                  onChange={(e) => setRiskSettings({
                    ...riskSettings,
                    maxDrawdown: parseFloat(e.target.value) || 0
                  })}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Stop all strategies if drawdown exceeds this percentage
                </p>
              </div>

              <div>
                <label className="text-sm font-medium">Stop Loss (%)</label>
                <Input
                  type="number"
                  value={riskSettings.stopLoss}
                  onChange={(e) => setRiskSettings({
                    ...riskSettings,
                    stopLoss: parseFloat(e.target.value) || 0
                  })}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Individual strategy stop loss threshold
                </p>
              </div>

              <div>
                <label className="text-sm font-medium">Take Profit (%)</label>
                <Input
                  type="number"
                  value={riskSettings.takeProfit}
                  onChange={(e) => setRiskSettings({
                    ...riskSettings,
                    takeProfit: parseFloat(e.target.value) || 0
                  })}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Take profit threshold for strategies
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Max Position Size ($)</label>
                <Input
                  type="number"
                  value={riskSettings.maxPositionSize}
                  onChange={(e) => setRiskSettings({
                    ...riskSettings,
                    maxPositionSize: parseFloat(e.target.value) || 0
                  })}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Maximum amount per strategy
                </p>
              </div>

              <div>
                <label className="text-sm font-medium">Daily Loss Limit ($)</label>
                <Input
                  type="number"
                  value={riskSettings.dailyLossLimit}
                  onChange={(e) => setRiskSettings({
                    ...riskSettings,
                    dailyLossLimit: parseFloat(e.target.value) || 0
                  })}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Stop trading if daily loss exceeds this amount
                </p>
              </div>

              <div>
                <label className="text-sm font-medium">Max Concurrent Strategies</label>
                <Input
                  type="number"
                  value={riskSettings.maxConcurrentStrategies}
                  onChange={(e) => setRiskSettings({
                    ...riskSettings,
                    maxConcurrentStrategies: parseInt(e.target.value) || 0
                  })}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Maximum number of active strategies
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-red-200 bg-red-50 dark:bg-red-900/20">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <div className="font-medium text-red-800 dark:text-red-200">
                  Emergency Stop
                </div>
                <div className="text-sm text-red-700 dark:text-red-300">
                  Immediately stop all strategies and liquidate positions
                </div>
              </div>
            </div>
            <Button
              variant="destructive"
              onClick={() => setRiskSettings({
                ...riskSettings,
                emergencyStop: !riskSettings.emergencyStop
              })}
            >
              {riskSettings.emergencyStop ? "Disable" : "Enable"}
            </Button>
          </div>

          <Button onClick={handleSaveSettings} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            Save Risk Settings
          </Button>
        </CardContent>
      </Card>

      {/* Alerts Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Alert Configuration</CardTitle>
            <Button onClick={handleAddAlert} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Alert
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={alert.enabled}
                      onChange={() => handleToggleAlert(alert.id)}
                      className="rounded"
                    />
                    <span className="text-sm font-medium">{alert.message}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {alert.type}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    value={alert.threshold}
                    onChange={(e) => setAlerts(alerts.map(a => 
                      a.id === alert.id ? { ...a, threshold: parseFloat(e.target.value) || 0 } : a
                    ))}
                    className="w-20 h-8 text-sm"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteAlert(alert.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Strategy Risk Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Strategy Risk Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {strategies.map((strategy) => {
              const strategyRisk = Math.min(100, Math.max(0, 50 + (strategy.pnlPercent * 2)))
              return (
                <div key={strategy.id} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
                      <Target className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{strategy.strategy}</div>
                      <div className="text-xs text-muted-foreground">
                        {strategy.apy.toFixed(1)}% APY • {strategy.pnlPercent >= 0 ? "+" : ""}{strategy.pnlPercent.toFixed(1)}% P&L
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {showValues ? `$${strategy.amount.toLocaleString()}` : "••••••"}
                      </div>
                      <div className="text-xs text-muted-foreground">Invested</div>
                    </div>
                    
                    <div className="text-right">
                      <div className={cn(
                        "text-sm font-medium",
                        strategyRisk > 70 ? "text-red-500" : 
                        strategyRisk > 40 ? "text-yellow-500" : "text-green-500"
                      )}>
                        Risk: {strategyRisk.toFixed(0)}/100
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {strategyRisk > 70 ? "High" : strategyRisk > 40 ? "Medium" : "Low"}
                      </div>
                    </div>

                    <div className="flex space-x-1">
                      <Button variant="outline" size="sm" className="h-8">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="h-8">
                        <Info className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}



