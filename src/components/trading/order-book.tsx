"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  TrendingDown, 
  MoreHorizontal,
  RefreshCw,
  Settings
} from "lucide-react"
import { cn } from "@/lib/utils"

interface OrderBookProps {
  market: any
}

// Generate mock order book data
const generateOrderBookData = (marketPrice: number) => {
  const bids = []
  const asks = []
  
  // Generate bids (buy orders)
  for (let i = 0; i < 10; i++) {
    const price = marketPrice * (1 - (i + 1) * 0.001)
    const size = Math.random() * 100 + 10
    const total: number = i === 0 ? size : bids[i - 1].total + size
    
    bids.push({
      price: parseFloat(price.toFixed(2)),
      size: parseFloat(size.toFixed(2)),
      total: parseFloat(total.toFixed(2))
    })
  }
  
  // Generate asks (sell orders)
  for (let i = 0; i < 10; i++) {
    const price = marketPrice * (1 + (i + 1) * 0.001)
    const size = Math.random() * 100 + 10
    const total: number = i === 0 ? size : asks[i - 1].total + size
    
    asks.push({
      price: parseFloat(price.toFixed(2)),
      size: parseFloat(size.toFixed(2)),
      total: parseFloat(total.toFixed(2))
    })
  }
  
  return { bids, asks }
}

export function OrderBook({ market }: OrderBookProps) {
  const [grouping, setGrouping] = useState(0.01)
  const [isLive, setIsLive] = useState(true)
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  const orderBookData = useMemo(() => isClient ? generateOrderBookData(market.price) : { bids: [], asks: [] }, [market.price, isClient])
  const { bids, asks } = orderBookData
  
  if (!isClient) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <h3 className="font-medium">Order Book</h3>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-muted-foreground">Loading order book...</div>
        </div>
      </div>
    )
  }

  const maxTotal = Math.max(
    ...bids.map(b => b.total),
    ...asks.map(a => a.total)
  )
  
  const groupingOptions = [0.01, 0.05, 0.1, 0.5, 1.0]
  
  const OrderRow = ({ 
    price, 
    size, 
    total, 
    isBid, 
    maxTotal 
  }: { 
    price: number
    size: number
    total: number
    isBid: boolean
    maxTotal: number
  }) => {
    const percentage = (total / maxTotal) * 100
    
    return (
      <div className="relative group cursor-pointer hover:bg-muted/50 transition-colors">
        <div className="flex items-center justify-between px-3 py-1 text-sm">
          <div className="flex-1 flex items-center justify-between">
            <span className={cn(
              "font-mono",
              isBid ? "text-green-500" : "text-red-500"
            )}>
              ${price.toFixed(2)}
            </span>
            <span className="text-muted-foreground font-mono">
              {size.toFixed(2)}
            </span>
            <span className="text-muted-foreground font-mono">
              {total.toFixed(2)}
            </span>
          </div>
        </div>
        
        {/* Background bar */}
        <div 
          className={cn(
            "absolute inset-0 opacity-20 -z-10",
            isBid ? "bg-green-500" : "bg-red-500"
          )}
          style={{ width: `${percentage}%` }}
        />
        
        {/* Hover actions */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <MoreHorizontal className="h-3 w-3" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <div className="flex items-center space-x-2">
          <h3 className="font-medium">Order Book</h3>
          <Badge variant="outline" className="text-xs">
            {market.symbol}
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            {groupingOptions.map((option) => (
              <Button
                key={option}
                variant={grouping === option ? "default" : "outline"}
                size="sm"
                onClick={() => setGrouping(option)}
                className="text-xs h-6 px-2"
              >
                {option}
              </Button>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsLive(!isLive)}
            className={cn(
              "h-6 w-6 p-0",
              isLive ? "text-green-500" : "text-muted-foreground"
            )}
          >
            <RefreshCw className={cn("h-3 w-3", isLive && "animate-spin")} />
          </Button>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
            <Settings className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Order Book Content */}
      <div className="space-y-1">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 text-xs font-medium text-muted-foreground border-b">
          <div className="flex-1 flex items-center justify-between">
            <span>Price (USD)</span>
            <span>Size</span>
            <span>Total</span>
          </div>
        </div>

        {/* Asks (Sell Orders) - Reverse order for display */}
        <div className="space-y-0">
          {asks.slice().reverse().map((ask, index) => (
            <OrderRow
              key={`ask-${index}`}
              price={ask.price}
              size={ask.size}
              total={ask.total}
              isBid={false}
              maxTotal={maxTotal}
            />
          ))}
        </div>

        {/* Spread */}
        <div className="flex items-center justify-center py-2 border-y-2 border-primary/20">
          <div className="text-center">
            <div className="text-sm font-medium">
              Spread: ${(asks[0].price - bids[0].price).toFixed(2)}
            </div>
            <div className="text-xs text-muted-foreground">
              {(((asks[0].price - bids[0].price) / bids[0].price) * 100).toFixed(3)}%
            </div>
          </div>
        </div>

        {/* Bids (Buy Orders) */}
        <div className="space-y-0">
          {bids.map((bid, index) => (
            <OrderRow
              key={`bid-${index}`}
              price={bid.price}
              size={bid.size}
              total={bid.total}
              isBid={true}
              maxTotal={maxTotal}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2 border-t text-xs text-muted-foreground">
        <div className="flex items-center space-x-4">
          <span>Last: ${market.price.toFixed(2)}</span>
          <span>24h Vol: {market.volume24h.toLocaleString()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className={cn(
            "flex items-center space-x-1",
            isLive ? "text-green-500" : "text-muted-foreground"
          )}>
            <div className={cn(
              "w-2 h-2 rounded-full",
              isLive ? "bg-green-500" : "bg-muted-foreground"
            )} />
            <span>{isLive ? "Live" : "Paused"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
