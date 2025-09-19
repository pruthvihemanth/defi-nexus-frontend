"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Award, 
  TrendingUp, 
  Clock,
  DollarSign,
  Percent,
  Zap,
  RefreshCw,
  Download,
  Info
} from "lucide-react"
import { cn } from "@/lib/utils"

interface RewardsOverviewProps {
  stakes: any[]
  showValues: boolean
}

export function RewardsOverview({ stakes, showValues }: RewardsOverviewProps) {
  const [isClaiming, setIsClaiming] = useState(false)

  const totalRewards = stakes.reduce((sum, stake) => sum + stake.rewards, 0)
  const totalStaked = stakes.reduce((sum, stake) => sum + stake.amount, 0)
  const avgApy = stakes.reduce((sum, stake) => sum + stake.apy, 0) / stakes.length

  const handleClaimAll = async () => {
    setIsClaiming(true)
    console.log("Claiming all rewards...")
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsClaiming(false)
  }

  const handleClaim = (stakeId: string) => {
    console.log("Claiming rewards for stake:", stakeId)
  }

  if (stakes.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <Award className="h-8 w-8" />
          </div>
          <p className="text-lg font-medium">No Rewards</p>
          <p className="text-sm">Start staking to earn rewards</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Total Rewards */}
      <div className="text-center p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Award className="h-5 w-5 text-green-600" />
          <span className="text-lg font-medium text-green-800 dark:text-green-200">Total Rewards</span>
        </div>
        <div className="text-3xl font-bold text-green-600 mb-1">
          {showValues ? `$${totalRewards.toFixed(2)}` : "••••••"}
        </div>
        <div className="text-sm text-green-700 dark:text-green-300">
          Available to claim
        </div>
      </div>

      {/* Claim Actions */}
      <div className="space-y-2">
        <Button
          onClick={handleClaimAll}
          disabled={isClaiming || totalRewards === 0}
          className="w-full"
          variant="gradient"
        >
          {isClaiming ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Zap className="h-4 w-4 mr-2" />
          )}
          {isClaiming ? "Claiming..." : "Claim All Rewards"}
        </Button>
        
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
          >
            <Download className="h-3 w-3 mr-1" />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Individual Rewards */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Rewards by Stake</h4>
        <div className="space-y-2">
          {stakes.map((stake) => (
            <div key={stake.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  {stake.pool[0]}
                </div>
                <div>
                  <div className="font-medium text-sm">{stake.pool}</div>
                  <div className="text-xs text-muted-foreground">{stake.validator}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="font-medium text-sm">
                    {showValues ? `$${stake.rewards.toFixed(2)}` : "••••••"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stake.apy.toFixed(2)}% APY
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleClaim(stake.id)}
                  className="text-xs h-7 px-2"
                >
                  Claim
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rewards Stats */}
      <div className="grid grid-cols-2 gap-4 p-3 rounded-lg bg-muted/30">
        <div className="text-center">
          <div className="text-lg font-bold text-blue-500">
            {stakes.length}
          </div>
          <div className="text-xs text-muted-foreground">Active Stakes</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-green-500">
            {avgApy.toFixed(1)}%
          </div>
          <div className="text-xs text-muted-foreground">Avg APY</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-purple-500">
            {showValues ? `$${totalStaked.toLocaleString()}` : "••••••"}
          </div>
          <div className="text-xs text-muted-foreground">Total Staked</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-orange-500">
            {showValues ? `$${(totalRewards / totalStaked * 100).toFixed(2)}` : "••••••"}
          </div>
          <div className="text-xs text-muted-foreground">ROI %</div>
        </div>
      </div>

      {/* Rewards Info */}
      <div className="p-3 rounded-lg border border-blue-200 bg-blue-50 dark:bg-blue-900/20">
        <div className="flex items-start space-x-2">
          <Info className="h-4 w-4 text-blue-600 mt-0.5" />
          <div className="text-xs">
            <p className="font-medium text-blue-800 dark:text-blue-200">
              Rewards Information
            </p>
            <p className="text-blue-700 dark:text-blue-300 mt-1">
              Rewards are calculated daily and can be claimed at any time. 
              Claiming rewards does not affect your staked amount or APY.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
