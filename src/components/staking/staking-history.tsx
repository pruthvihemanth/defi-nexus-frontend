"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Lock, 
  Unlock, 
  Award,
  Clock,
  Search,
  Filter,
  Download,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  TrendingUp,
  TrendingDown
} from "lucide-react"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"

interface StakingHistoryProps {
  stakes: any[]
  showValues: boolean
}

const transactionTypes = {
  stake: { label: "Stake", icon: Lock, color: "bg-green-500" },
  unstake: { label: "Unstake", icon: Unlock, color: "bg-red-500" },
  claim: { label: "Claim", icon: Award, color: "bg-blue-500" },
  reward: { label: "Reward", icon: TrendingUp, color: "bg-purple-500" }
}

const statusConfigs = {
  completed: { label: "Completed", icon: CheckCircle, color: "text-green-500" },
  pending: { label: "Pending", icon: ClockIcon, color: "text-yellow-500" },
  failed: { label: "Failed", icon: XCircle, color: "text-red-500" }
}

export function StakingHistory({ stakes, showValues }: StakingHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  // Mock transaction history
  const mockTransactions = [
    {
      id: "1",
      type: "stake",
      pool: "DNX",
      amount: 5000,
      value: 2500,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 30 days ago
      status: "completed",
      validator: "DeFi Nexus Validator",
      apy: 12.5
    },
    {
      id: "2",
      type: "stake",
      pool: "SOL",
      amount: 100,
      value: 9845,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15), // 15 days ago
      status: "completed",
      validator: "Marinade Finance",
      apy: 7.2
    },
    {
      id: "3",
      type: "claim",
      pool: "DNX",
      amount: 156.25,
      value: 78.13,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
      status: "completed",
      validator: "DeFi Nexus Validator",
      apy: 12.5
    },
    {
      id: "4",
      type: "reward",
      pool: "SOL",
      amount: 2.96,
      value: 2.91,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      status: "completed",
      validator: "Marinade Finance",
      apy: 7.2
    },
    {
      id: "5",
      type: "unstake",
      pool: "DNX",
      amount: 1000,
      value: 500,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      status: "pending",
      validator: "DeFi Nexus Validator",
      apy: 12.5
    }
  ]

  const filteredTransactions = mockTransactions.filter(tx => {
    const matchesSearch = tx.pool?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.validator?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || tx.type === filterType
    const matchesStatus = filterStatus === "all" || tx.status === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const handleExport = () => {
    console.log("Exporting staking history...")
  }

  const handleViewOnExplorer = (txId: string) => {
    console.log("Viewing transaction on explorer:", txId)
  }

  return (
    <div className="space-y-4">
      {/* Header with Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border-b">
        <div className="flex items-center space-x-2">
          <h3 className="font-medium">Staking History</h3>
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
            <option value="stake">Stake</option>
            <option value="unstake">Unstake</option>
            <option value="claim">Claim</option>
            <option value="reward">Reward</option>
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
            const IconComponent = typeConfig?.icon || Lock

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
                      <span className="text-muted-foreground text-sm">
                        {tx.pool}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        {tx.validator}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(tx.timestamp, { addSuffix: true })}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {tx.amount.toLocaleString()} {tx.pool}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {tx.apy.toFixed(2)}% APY
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
                      {showValues ? `${tx.amount.toLocaleString()}` : "••••••"} {tx.pool}
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
