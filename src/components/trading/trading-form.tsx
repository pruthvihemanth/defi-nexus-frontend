"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  Target,
  AlertTriangle,
  Info,
  DollarSign,
  Percent,
  Clock,
  Shield
} from "lucide-react"
import { cn } from "@/lib/utils"

interface TradingFormProps {
  market: any
  orderType: string
  onOrderTypeChange: (type: string) => void
}

export function TradingForm({ market, orderType, onOrderTypeChange }: TradingFormProps) {
  const [side, setSide] = useState<"buy" | "sell">("buy")
  const [size, setSize] = useState("")
  const [price, setPrice] = useState("")
  const [stopPrice, setStopPrice] = useState("")
  const [leverage, setLeverage] = useState("10")
  const [slippage, setSlippage] = useState("0.5")
  const [timeInForce, setTimeInForce] = useState("GTC")
  
  const orderTypes = ["Market", "Limit", "Stop", "Stop Limit"]
  const timeInForceOptions = ["GTC", "IOC", "FOK"]
  const leverageOptions = ["1", "2", "5", "10", "20", "50"]
  
  const estimatedCost = parseFloat(size || "0") * parseFloat(price || market.price.toString())
  const marginRequired = estimatedCost / parseFloat(leverage)
  const maxLeverage = 20
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Submitting order:", {
      side,
      size,
      price,
      stopPrice,
      leverage,
      orderType,
      timeInForce,
      slippage
    })
  }
  
  const handleQuickSize = (percentage: number) => {
    const maxSize = 1000 // Mock available balance
    setSize((maxSize * percentage / 100).toString())
  }

  return (
    <div className="space-y-4">
      {/* Order Type Tabs */}
      <Tabs value={orderType} onValueChange={onOrderTypeChange} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          {orderTypes.map((type) => (
            <TabsTrigger key={type} value={type} className="text-xs">
              {type}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Buy/Sell Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant={side === "buy" ? "default" : "outline"}
          onClick={() => setSide("buy")}
          className={cn(
            "h-12 font-medium",
            side === "buy" 
              ? "bg-green-500 hover:bg-green-600 text-white" 
              : "hover:bg-green-50 hover:text-green-700 hover:border-green-300"
          )}
        >
          <TrendingUp className="h-4 w-4 mr-2" />
          Long / Buy
        </Button>
        <Button
          variant={side === "sell" ? "default" : "outline"}
          onClick={() => setSide("sell")}
          className={cn(
            "h-12 font-medium",
            side === "sell" 
              ? "bg-red-500 hover:bg-red-600 text-white" 
              : "hover:bg-red-50 hover:text-red-700 hover:border-red-300"
          )}
        >
          <TrendingDown className="h-4 w-4 mr-2" />
          Short / Sell
        </Button>
      </div>

      {/* Trading Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Size Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Size ({market.symbol})</label>
          <div className="relative">
            <Input
              type="number"
              placeholder="0.0"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="text-lg pr-20"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
              <span className="text-sm text-muted-foreground">Max</span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setSize("1000")}
                className="h-6 px-2 text-xs"
              >
                1000
              </Button>
            </div>
          </div>
          <div className="flex space-x-1">
            {[25, 50, 75, 100].map((percentage) => (
              <Button
                key={percentage}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleQuickSize(percentage)}
                className="text-xs h-6 px-2"
              >
                {percentage}%
              </Button>
            ))}
          </div>
        </div>

        {/* Price Input (for Limit orders) */}
        {(orderType === "Limit" || orderType === "Stop Limit") && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Price (USD)</label>
            <Input
              type="number"
              placeholder={market.price.toFixed(2)}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="text-lg"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Market: ${market.price.toFixed(2)}</span>
              <span>Index: ${market.indexPrice.toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* Stop Price Input (for Stop orders) */}
        {(orderType === "Stop" || orderType === "Stop Limit") && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Stop Price (USD)</label>
            <Input
              type="number"
              placeholder="0.00"
              value={stopPrice}
              onChange={(e) => setStopPrice(e.target.value)}
              className="text-lg"
            />
          </div>
        )}

        {/* Leverage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Leverage</label>
            <Badge variant="outline" className="text-xs">
              Max {maxLeverage}x
            </Badge>
          </div>
          <div className="flex space-x-1">
            {leverageOptions.map((lev) => (
              <Button
                key={lev}
                type="button"
                variant={leverage === lev ? "default" : "outline"}
                size="sm"
                onClick={() => setLeverage(lev)}
                className="text-xs h-8"
              >
                {lev}x
              </Button>
            ))}
          </div>
        </div>

        {/* Advanced Options */}
        <div className="space-y-3 p-3 rounded-lg bg-muted/50">
          <div className="flex items-center space-x-2">
            <Info className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">Advanced Options</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Time in Force</label>
              <select
                value={timeInForce}
                onChange={(e) => setTimeInForce(e.target.value)}
                className="w-full px-2 py-1 text-sm border rounded bg-background"
              >
                {timeInForceOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-1">
              <label className="text-xs text-muted-foreground">Slippage (%)</label>
              <Input
                type="number"
                placeholder="0.5"
                value={slippage}
                onChange={(e) => setSlippage(e.target.value)}
                className="text-sm h-8"
              />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-2 p-3 rounded-lg border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Estimated Cost:</span>
            <span className="font-medium">${estimatedCost.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Margin Required:</span>
            <span className="font-medium">${marginRequired.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Leverage:</span>
            <span className="font-medium">{leverage}x</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Order Type:</span>
            <span className="font-medium">{orderType}</span>
          </div>
        </div>

        {/* Risk Warning */}
        <div className="p-3 rounded-lg border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
            <div className="text-xs">
              <p className="font-medium text-yellow-800 dark:text-yellow-200">
                High Risk Warning
              </p>
              <p className="text-yellow-700 dark:text-yellow-300 mt-1">
                Trading with leverage involves significant risk. You may lose more than your initial margin.
                Please trade responsibly.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className={cn(
            "w-full h-12 text-lg font-medium",
            side === "buy" 
              ? "bg-green-500 hover:bg-green-600" 
              : "bg-red-500 hover:bg-red-600"
          )}
        >
          <Zap className="mr-2 h-5 w-5" />
          {side === "buy" ? "Long" : "Short"} {market.symbol}
        </Button>
      </form>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" size="sm" className="text-xs">
          <Target className="h-3 w-3 mr-1" />
          Close All
        </Button>
        <Button variant="outline" size="sm" className="text-xs">
          <Shield className="h-3 w-3 mr-1" />
          Risk Check
        </Button>
      </div>
    </div>
  )
}












