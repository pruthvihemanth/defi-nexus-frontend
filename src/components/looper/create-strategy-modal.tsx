"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Bot,
  DollarSign,
  Percent,
  Clock,
  Shield,
  Target,
  Zap,
  Save,
  X,
  Plus,
  Minus,
  Info,
  AlertTriangle,
  CheckCircle,
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CreateStrategyModalProps {
  isOpen: boolean
  onClose: () => void
}

const strategyTypes = [
  { id: "DCA", name: "Dollar Cost Average", icon: Target, description: "Automated DCA with rebalancing" },
  { id: "Yield Farming", name: "Yield Farming", icon: Zap, description: "Multi-protocol yield optimization" },
  { id: "Arbitrage", name: "Arbitrage", icon: DollarSign, description: "Cross-DEX arbitrage opportunities" },
  { id: "Liquidation", name: "Liquidation", icon: Shield, description: "Liquidation opportunity hunting" },
  { id: "Stablecoin", name: "Stablecoin", icon: DollarSign, description: "Stablecoin yield optimization" }
]

const riskLevels = [
  { id: "Low", name: "Low Risk", color: "bg-green-500", description: "Conservative strategies with stable returns" },
  { id: "Medium", name: "Medium Risk", color: "bg-yellow-500", description: "Balanced risk-reward strategies" },
  { id: "High", name: "High Risk", color: "bg-red-500", description: "Aggressive strategies with high potential" }
]

export function CreateStrategyModal({ isOpen, onClose }: CreateStrategyModalProps) {
  const [step, setStep] = useState(1)
  const [strategyData, setStrategyData] = useState({
    name: "",
    description: "",
    type: "",
    risk: "",
    minDeposit: 0,
    maxDeposit: 0,
    duration: "Flexible",
    tokens: [] as string[],
    features: [] as string[],
    apy: 0,
    stopLoss: 0,
    takeProfit: 0
  })

  const [newToken, setNewToken] = useState("")
  const [newFeature, setNewFeature] = useState("")

  const handleNext = () => {
    if (step < 4) setStep(step + 1)
  }

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSave = () => {
    console.log("Creating strategy:", strategyData)
    onClose()
  }

  const handleAddToken = () => {
    if (newToken && !strategyData.tokens.includes(newToken)) {
      setStrategyData({
        ...strategyData,
        tokens: [...strategyData.tokens, newToken]
      })
      setNewToken("")
    }
  }

  const handleRemoveToken = (token: string) => {
    setStrategyData({
      ...strategyData,
      tokens: strategyData.tokens.filter(t => t !== token)
    })
  }

  const handleAddFeature = () => {
    if (newFeature && !strategyData.features.includes(newFeature)) {
      setStrategyData({
        ...strategyData,
        features: [...strategyData.features, newFeature]
      })
      setNewFeature("")
    }
  }

  const handleRemoveFeature = (feature: string) => {
    setStrategyData({
      ...strategyData,
      features: strategyData.features.filter(f => f !== feature)
    })
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return strategyData.name && strategyData.description && strategyData.type
      case 2:
        return strategyData.risk && strategyData.minDeposit > 0 && strategyData.maxDeposit > 0
      case 3:
        return strategyData.tokens.length > 0 && strategyData.apy > 0
      case 4:
        return true
      default:
        return false
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900 border-0 shadow-2xl">
        <DialogHeader className="space-y-4 text-center">
          <div className="flex items-center justify-between">
            <div className="flex-1 text-center">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                <Bot className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium text-white/90">Strategy Creation</span>
              </div>
              <DialogTitle className="text-3xl lg:text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Create New Strategy
                </span>
              </DialogTitle>
              <p className="text-lg text-muted-foreground">
                Build automated trading strategies for maximum DeFi yields
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Steps */}
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  step >= stepNumber ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  {step > stepNumber ? <CheckCircle className="h-4 w-4" /> : stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div className={cn(
                    "w-8 h-0.5",
                    step > stepNumber ? "bg-primary" : "bg-muted"
                  )} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Basic Information</h3>
              
              <div>
                <label className="text-sm font-medium">Strategy Name</label>
                <Input
                  placeholder="Enter strategy name"
                  value={strategyData.name}
                  onChange={(e) => setStrategyData({ ...strategyData, name: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Description</label>
                <textarea
                  placeholder="Describe your strategy"
                  value={strategyData.description}
                  onChange={(e) => setStrategyData({ ...strategyData, description: e.target.value })}
                  className="w-full mt-1 p-3 border rounded-md resize-none h-20"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Strategy Type</label>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  {strategyTypes.map((type) => {
                    const IconComponent = type.icon
                    return (
                      <div
                        key={type.id}
                        className={cn(
                          "flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors",
                          strategyData.type === type.id ? "border-primary bg-primary/10" : "hover:bg-muted/50"
                        )}
                        onClick={() => setStrategyData({ ...strategyData, type: type.id })}
                      >
                        <IconComponent className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{type.name}</div>
                          <div className="text-sm text-muted-foreground">{type.description}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Risk & Limits */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Risk & Investment Limits</h3>
              
              <div>
                <label className="text-sm font-medium">Risk Level</label>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  {riskLevels.map((risk) => (
                    <div
                      key={risk.id}
                      className={cn(
                        "flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors",
                        strategyData.risk === risk.id ? "border-primary bg-primary/10" : "hover:bg-muted/50"
                      )}
                      onClick={() => setStrategyData({ ...strategyData, risk: risk.id })}
                    >
                      <div className={cn("w-3 h-3 rounded-full", risk.color)} />
                      <div>
                        <div className="font-medium">{risk.name}</div>
                        <div className="text-sm text-muted-foreground">{risk.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Minimum Deposit ($)</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={strategyData.minDeposit}
                    onChange={(e) => setStrategyData({ ...strategyData, minDeposit: parseFloat(e.target.value) || 0 })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Maximum Deposit ($)</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={strategyData.maxDeposit}
                    onChange={(e) => setStrategyData({ ...strategyData, maxDeposit: parseFloat(e.target.value) || 0 })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Duration</label>
                <select
                  value={strategyData.duration}
                  onChange={(e) => setStrategyData({ ...strategyData, duration: e.target.value })}
                  className="w-full mt-1 p-3 border rounded-md"
                >
                  <option value="Flexible">Flexible</option>
                  <option value="7 days">7 days</option>
                  <option value="30 days">30 days</option>
                  <option value="90 days">90 days</option>
                  <option value="1 year">1 year</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 3: Tokens & Features */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Supported Tokens & Features</h3>
              
              <div>
                <label className="text-sm font-medium">Supported Tokens</label>
                <div className="flex space-x-2 mt-2">
                  <Input
                    placeholder="Add token (e.g., SOL)"
                    value={newToken}
                    onChange={(e) => setNewToken(e.target.value.toUpperCase())}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddToken()}
                  />
                  <Button onClick={handleAddToken} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {strategyData.tokens.map((token) => (
                    <Badge key={token} variant="outline" className="flex items-center space-x-1">
                      <span>{token}</span>
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => handleRemoveToken(token)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Strategy Features</label>
                <div className="flex space-x-2 mt-2">
                  <Input
                    placeholder="Add feature (e.g., Auto Rebalancing)"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
                  />
                  <Button onClick={handleAddFeature} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {strategyData.features.map((feature) => (
                    <Badge key={feature} variant="outline" className="flex items-center space-x-1">
                      <span>{feature}</span>
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => handleRemoveFeature(feature)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Expected APY (%)</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={strategyData.apy}
                  onChange={(e) => setStrategyData({ ...strategyData, apy: parseFloat(e.target.value) || 0 })}
                  className="mt-1"
                />
              </div>
            </div>
          )}

          {/* Step 4: Risk Management */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Risk Management</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Stop Loss (%)</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={strategyData.stopLoss}
                    onChange={(e) => setStrategyData({ ...strategyData, stopLoss: parseFloat(e.target.value) || 0 })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Take Profit (%)</label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={strategyData.takeProfit}
                    onChange={(e) => setStrategyData({ ...strategyData, takeProfit: parseFloat(e.target.value) || 0 })}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="p-4 rounded-lg border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-yellow-800 dark:text-yellow-200">
                      Strategy Creation Notice
                    </p>
                    <p className="text-yellow-700 dark:text-yellow-300 mt-1">
                      Your strategy will be reviewed by our team before going live. 
                      This process typically takes 24-48 hours. You'll be notified once approved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <div className="flex justify-between w-full">
            <div>
              {step > 1 && (
                <Button variant="outline" onClick={handlePrevious}>
                  Previous
                </Button>
              )}
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              {step < 4 ? (
                <Button onClick={handleNext} disabled={!isStepValid()}>
                  Next
                </Button>
              ) : (
                <Button onClick={handleSave} disabled={!isStepValid()}>
                  <Save className="h-4 w-4 mr-2" />
                  Create Strategy
                </Button>
              )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}



