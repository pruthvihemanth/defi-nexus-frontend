"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  ArrowLeftRight,
  Clock,
  Search,
  Filter,
  Download,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock as ClockIcon
} from "lucide-react"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"

interface TransactionHistoryProps {
  transactions: any[]
  showValues: boolean
}

const transactionTypes = {
  swap: { label: "Swap", icon: ArrowLeftRight, color: "bg-blue-500" },
  supply: { label: "Supply", icon: ArrowDownRight, color: "bg-green-500" },
  borrow: { label: "Borrow", icon: ArrowUpRight, color: "bg-red-500" },
  withdraw: { label: "Withdraw", icon: ArrowUpRight, color: "bg-orange-500" },
  repay: { label: "Repay", icon: ArrowDownRight, color: "bg-purple-500" }
}

const statusConfigs = {
  completed: { label: "Completed", icon: CheckCircle, color: "text-green-500" },
  pending: { label: "Pending", icon: ClockIcon, color: "text-yellow-500" },
  failed: { label: "Failed", icon: XCircle, color: "text-red-500" }
}

export function TransactionHistory({ transactions, showValues }: TransactionHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.asset?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.from?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.to?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || tx.type === filterType
    const matchesStatus = filterStatus === "all" || tx.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const handleExport = () => {
    console.log("Exporting transactions...")
  }

  const handleViewOnExplorer = (txId: string) => {
    console.log("Viewing transaction on explorer:", txId)
  }

  return (
    <div className="space-y-4">
      {/* Header with Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border-b">
        <div className="flex items-center space-x-2">
          <h3 className="font-medium">Transaction History</h3>
          <Badge variant="outline" className="text-xs">
            {filteredTransactions.length} transactions
          </Badge>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="text-xs"
          >
            <Download className="h-3 w-3 mr-1" />
            Export
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 p-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex space-x-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 text-sm border rounded-md bg-background"
          >
            <option value="all">All Types</option>
            <option value="swap">Swap</option>
            <option value="supply">Supply</option>
            <option value="borrow">Borrow</option>
            <option value="withdraw">Withdraw</option>
            <option value="repay">Repay</option>
          </select>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 text-sm border rounded-md bg-background"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-2">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <Clock className="h-8 w-8" />
              </div>
              <p className="text-lg font-medium">No transactions found</p>
              <p className="text-sm">Try adjusting your search or filter criteria</p>
            </div>
          </div>
        ) : (
          filteredTransactions.map((tx) => {
            const typeConfig = transactionTypes[tx.type as keyof typeof transactionTypes]
            const statusConfig = statusConfigs[tx.status as keyof typeof statusConfigs]
            const IconComponent = typeConfig?.icon || ArrowLeftRight

            return (
              <div key={tx.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-4">
                  {/* Transaction Icon */}
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-white",
                    typeConfig?.color || "bg-gray-500"
                  )}>
                    <IconComponent className="h-5 w-5" />
                  </div>

                  {/* Transaction Details */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm">
                        {typeConfig?.label || tx.type}
                      </span>
                      {tx.from && tx.to && (
                        <span className="text-muted-foreground text-sm">
                          {tx.from} → {tx.to}
                        </span>
                      )}
                      {tx.asset && !tx.from && (
                        <span className="text-muted-foreground text-sm">
                          {tx.asset}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(tx.timestamp, { addSuffix: true })}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {tx.amount.toLocaleString()} {tx.asset || tx.from}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Transaction Value and Status */}
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-medium text-sm">
                      {showValues ? `$${tx.value.toLocaleString()}` : "••••••"}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {showValues ? `${tx.amount.toLocaleString()}` : "••••••"} {tx.asset || tx.from}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs",
                        statusConfig?.color || "text-gray-500"
                      )}
                    >
                      {statusConfig?.icon && <statusConfig.icon className="h-3 w-3 mr-1" />}
                      {statusConfig?.label || tx.status}
                    </Badge>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewOnExplorer(tx.id)}
                      className="h-8 w-8 p-0"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Load More */}
      {filteredTransactions.length > 0 && (
        <div className="flex justify-center p-4">
          <Button variant="outline" size="sm">
            Load More Transactions
          </Button>
        </div>
      )}
    </div>
  )
}
