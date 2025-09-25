"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  MoreHorizontal, 
  TrendingUp, 
  TrendingDown, 
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Settings,
  X
} from "lucide-react"
import { cn } from "@/lib/utils"

interface OrdersTableProps {
  orders: any[]
}

export function OrdersTable({ orders }: OrdersTableProps) {
  const [sortBy, setSortBy] = useState("time")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const handleCancelOrder = (orderId: string) => {
    console.log("Canceling order:", orderId)
  }

  const handleCancelAll = () => {
    console.log("Canceling all orders")
  }

  const handleModifyOrder = (orderId: string) => {
    console.log("Modifying order:", orderId)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Open":
        return <Clock className="h-3 w-3 text-blue-500" />
      case "Filled":
        return <CheckCircle className="h-3 w-3 text-green-500" />
      case "Cancelled":
        return <XCircle className="h-3 w-3 text-red-500" />
      default:
        return <Clock className="h-3 w-3 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-blue-500"
      case "Filled":
        return "bg-green-500"
      case "Cancelled":
        return "bg-red-500"
      default:
        return "bg-muted-foreground"
    }
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <Clock className="h-8 w-8" />
          </div>
          <p className="text-lg font-medium">No Open Orders</p>
          <p className="text-sm">Place an order to see it here</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header Actions */}
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <div className="flex items-center space-x-2">
          <h3 className="font-medium">Open Orders ({orders.filter(o => o.status === "Open").length})</h3>
          <Badge variant="outline" className="text-xs">
            Live
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCancelAll}
            className="text-xs"
          >
            <X className="h-3 w-3 mr-1" />
            Cancel All
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3 font-medium text-muted-foreground text-sm">Market</th>
              <th className="text-left p-3 font-medium text-muted-foreground text-sm">Side</th>
              <th className="text-left p-3 font-medium text-muted-foreground text-sm">Type</th>
              <th className="text-right p-3 font-medium text-muted-foreground text-sm">Size</th>
              <th className="text-right p-3 font-medium text-muted-foreground text-sm">Price</th>
              <th className="text-right p-3 font-medium text-muted-foreground text-sm">Filled</th>
              <th className="text-left p-3 font-medium text-muted-foreground text-sm">Status</th>
              <th className="text-left p-3 font-medium text-muted-foreground text-sm">Time</th>
              <th className="text-center p-3 font-medium text-muted-foreground text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-muted/50 transition-colors">
                {/* Market */}
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                      {order.market[0]}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{order.market}</div>
                    </div>
                  </div>
                </td>

                {/* Side */}
                <td className="p-3">
                  <Badge 
                    variant={order.side === "Buy" ? "default" : "destructive"}
                    className={cn(
                      "text-xs",
                      order.side === "Buy" 
                        ? "bg-green-500 hover:bg-green-600" 
                        : "bg-red-500 hover:bg-red-600"
                    )}
                  >
                    {order.side === "Buy" ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {order.side}
                  </Badge>
                </td>

                {/* Type */}
                <td className="p-3">
                  <Badge variant="outline" className="text-xs">
                    {order.type}
                  </Badge>
                </td>

                {/* Size */}
                <td className="p-3 text-right">
                  <div className="font-medium text-sm">{order.size}</div>
                </td>

                {/* Price */}
                <td className="p-3 text-right">
                  <div className="font-medium text-sm">${order.price.toFixed(2)}</div>
                </td>

                {/* Filled */}
                <td className="p-3 text-right">
                  <div className="font-medium text-sm">{order.filled}</div>
                  <div className="text-xs text-muted-foreground">
                    {order.remaining} remaining
                  </div>
                </td>

                {/* Status */}
                <td className="p-3">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(order.status)}
                    <Badge 
                      variant="outline" 
                      className={cn("text-xs", getStatusColor(order.status))}
                    >
                      {order.status}
                    </Badge>
                  </div>
                </td>

                {/* Time */}
                <td className="p-3">
                  <div className="text-sm">{new Date(order.time).toLocaleTimeString()}</div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(order.time).toLocaleDateString()}
                  </div>
                </td>

                {/* Actions */}
                <td className="p-3 text-center">
                  <div className="flex items-center justify-center space-x-1">
                    {order.status === "Open" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCancelOrder(order.id)}
                          className="text-xs h-7 px-2"
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleModifyOrder(order.id)}
                          className="text-xs h-7 px-2"
                        >
                          Modify
                        </Button>
                      </>
                    )}
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="px-4 py-3 border-t bg-muted/30">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Open Orders:</span>
            <div className="font-medium text-blue-500">
              {orders.filter(o => o.status === "Open").length}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Filled Today:</span>
            <div className="font-medium text-green-500">
              {orders.filter(o => o.status === "Filled").length}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Buy Orders:</span>
            <div className="font-medium text-green-500">
              {orders.filter(o => o.side === "Buy").length}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">Sell Orders:</span>
            <div className="font-medium text-red-500">
              {orders.filter(o => o.side === "Sell").length}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}




















