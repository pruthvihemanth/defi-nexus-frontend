"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Settings, 
  AlertTriangle, 
  Clock, 
  Zap, 
  Shield, 
  Info,
  ChevronDown,
  ChevronUp,
  Check,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SwapSettings {
  slippageTolerance: string
  transactionDeadline: string
  expertMode: boolean
  multiHop: boolean
  autoRouter: boolean
  showRoute: boolean
}

interface SwapSettingsModalProps {
  isOpen: boolean
  onClose: () => void
  settings: SwapSettings
  onSettingsChange: (settings: SwapSettings) => void
}

const slippagePresets = ["0.1", "0.5", "1.0", "3.0"]

export function SwapSettingsModal({ isOpen, onClose, settings, onSettingsChange }: SwapSettingsModalProps) {
  const [localSettings, setLocalSettings] = useState<SwapSettings>(settings)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleSave = () => {
    onSettingsChange(localSettings)
    onClose()
  }

  const handleReset = () => {
    const defaultSettings: SwapSettings = {
      slippageTolerance: "0.5",
      transactionDeadline: "20",
      expertMode: false,
      multiHop: true,
      autoRouter: true,
      showRoute: true
    }
    setLocalSettings(defaultSettings)
  }

  const updateSetting = <K extends keyof SwapSettings>(key: K, value: SwapSettings[K]) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }))
  }

  const getSlippageWarning = (slippage: string) => {
    const num = parseFloat(slippage)
    if (num < 0.1) return { type: "warning", message: "Your transaction may fail" }
    if (num > 5) return { type: "danger", message: "Your transaction may be frontrun" }
    if (num > 1) return { type: "info", message: "High slippage tolerance" }
    return null
  }

  const slippageWarning = getSlippageWarning(localSettings.slippageTolerance)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900 border-0 shadow-2xl">
        <DialogHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20">
              <Settings className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">Swap Settings</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Customize your trading preferences
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Slippage Tolerance */}
          <Card className="border-0 shadow-sm bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-blue-500" />
                  <CardTitle className="text-base">Slippage Tolerance</CardTitle>
                </div>
                <Badge variant="outline" className="text-xs">
                  {localSettings.slippageTolerance}%
                </Badge>
              </div>
              <CardDescription className="text-xs">
                Your transaction will revert if the price changes unfavorably by more than this percentage.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Preset Buttons */}
              <div className="grid grid-cols-4 gap-2">
                {slippagePresets.map((preset) => (
                  <Button
                    key={preset}
                    variant={localSettings.slippageTolerance === preset ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateSetting("slippageTolerance", preset)}
                    className={cn(
                      "text-xs",
                      localSettings.slippageTolerance === preset && "bg-gradient-to-r from-blue-500 to-purple-600"
                    )}
                  >
                    {preset}%
                  </Button>
                ))}
              </div>

              {/* Custom Input */}
              <div className="relative">
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="50"
                  placeholder="Custom"
                  value={localSettings.slippageTolerance}
                  onChange={(e) => updateSetting("slippageTolerance", e.target.value)}
                  className="pr-8"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                  %
                </span>
              </div>

              {/* Warning */}
              {slippageWarning && (
                <div className={cn(
                  "flex items-center space-x-2 p-3 rounded-lg text-sm",
                  slippageWarning.type === "danger" && "bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400",
                  slippageWarning.type === "warning" && "bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-400",
                  slippageWarning.type === "info" && "bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400"
                )}>
                  <AlertTriangle className="h-4 w-4" />
                  <span>{slippageWarning.message}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Transaction Deadline */}
          <Card className="border-0 shadow-sm bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-purple-500" />
                <CardTitle className="text-base">Transaction Deadline</CardTitle>
              </div>
              <CardDescription className="text-xs">
                Your transaction will revert if it is pending for more than this long.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Input
                  type="number"
                  min="1"
                  max="4320"
                  placeholder="20"
                  value={localSettings.transactionDeadline}
                  onChange={(e) => updateSetting("transactionDeadline", e.target.value)}
                  className="pr-16"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-muted-foreground">
                  minutes
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Advanced Settings Toggle */}
          <Button
            variant="ghost"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full justify-between p-4 h-auto"
          >
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-orange-500" />
              <span className="font-medium">Advanced Settings</span>
            </div>
            {showAdvanced ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>

          {/* Advanced Settings */}
          {showAdvanced && (
            <div className="space-y-4 pl-4 border-l-2 border-muted">
              {/* Expert Mode */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/30 dark:bg-slate-800/30">
                <div className="flex items-center space-x-3">
                  <div className="p-1 rounded bg-orange-500/20">
                    <AlertTriangle className="h-3 w-3 text-orange-500" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Expert Mode</div>
                    <div className="text-xs text-muted-foreground">
                      Allow high price impact trades
                    </div>
                  </div>
                </div>
                <Button
                  variant={localSettings.expertMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateSetting("expertMode", !localSettings.expertMode)}
                  className={cn(
                    "w-12 h-6 p-0 rounded-full",
                    localSettings.expertMode && "bg-gradient-to-r from-orange-500 to-red-500"
                  )}
                >
                  <div className={cn(
                    "w-4 h-4 rounded-full bg-white transition-transform",
                    localSettings.expertMode ? "translate-x-3" : "translate-x-0"
                  )} />
                </Button>
              </div>

              {/* Multi-hop */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/30 dark:bg-slate-800/30">
                <div className="flex items-center space-x-3">
                  <div className="p-1 rounded bg-blue-500/20">
                    <Zap className="h-3 w-3 text-blue-500" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Multi-hop</div>
                    <div className="text-xs text-muted-foreground">
                      Use multiple hops for better prices
                    </div>
                  </div>
                </div>
                <Button
                  variant={localSettings.multiHop ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateSetting("multiHop", !localSettings.multiHop)}
                  className={cn(
                    "w-12 h-6 p-0 rounded-full",
                    localSettings.multiHop && "bg-gradient-to-r from-blue-500 to-purple-500"
                  )}
                >
                  <div className={cn(
                    "w-4 h-4 rounded-full bg-white transition-transform",
                    localSettings.multiHop ? "translate-x-3" : "translate-x-0"
                  )} />
                </Button>
              </div>

              {/* Auto Router */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/30 dark:bg-slate-800/30">
                <div className="flex items-center space-x-3">
                  <div className="p-1 rounded bg-green-500/20">
                    <Shield className="h-3 w-3 text-green-500" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Auto Router</div>
                    <div className="text-xs text-muted-foreground">
                      Automatically find the best route
                    </div>
                  </div>
                </div>
                <Button
                  variant={localSettings.autoRouter ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateSetting("autoRouter", !localSettings.autoRouter)}
                  className={cn(
                    "w-12 h-6 p-0 rounded-full",
                    localSettings.autoRouter && "bg-gradient-to-r from-green-500 to-emerald-500"
                  )}
                >
                  <div className={cn(
                    "w-4 h-4 rounded-full bg-white transition-transform",
                    localSettings.autoRouter ? "translate-x-3" : "translate-x-0"
                  )} />
                </Button>
              </div>

              {/* Show Route */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/30 dark:bg-slate-800/30">
                <div className="flex items-center space-x-3">
                  <div className="p-1 rounded bg-purple-500/20">
                    <Info className="h-3 w-3 text-purple-500" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Show Route</div>
                    <div className="text-xs text-muted-foreground">
                      Display the trading route details
                    </div>
                  </div>
                </div>
                <Button
                  variant={localSettings.showRoute ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateSetting("showRoute", !localSettings.showRoute)}
                  className={cn(
                    "w-12 h-6 p-0 rounded-full",
                    localSettings.showRoute && "bg-gradient-to-r from-purple-500 to-pink-500"
                  )}
                >
                  <div className={cn(
                    "w-4 h-4 rounded-full bg-white transition-transform",
                    localSettings.showRoute ? "translate-x-3" : "translate-x-0"
                  )} />
                </Button>
              </div>
            </div>
          )}

          {/* Expert Mode Warning */}
          {localSettings.expertMode && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                <div>
                  <div className="font-medium text-red-600 dark:text-red-400 text-sm">
                    Expert Mode Enabled
                  </div>
                  <div className="text-xs text-red-500 dark:text-red-400 mt-1">
                    You are allowing trades with high price impact. This can result in significant losses.
                    Only use this mode if you understand the risks.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex-1"
            >
              <X className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Check className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}




