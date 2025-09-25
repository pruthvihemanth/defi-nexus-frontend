"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Vote,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  TrendingUp,
  TrendingDown,
  Shield,
  Wallet,
  DollarSign,
  Percent,
  BarChart3,
  Activity,
  Eye,
  EyeOff,
  Copy,
  ExternalLink,
  AlertTriangle,
  Info,
  Zap,
  Crown,
  Star,
  Flame,
  Award,
  Calendar,
  Timer,
  Target,
  PieChart,
  LineChart,
  TrendingUp as TrendingUpIcon,
  ChevronDown,
  ChevronUp,
  Lock,
  Unlock,
  Settings,
  Globe,
  MessageSquare,
  FileText,
  Hash,
  Tag,
  Flag,
  Bookmark,
  Share2,
  Heart,
  ThumbsUp,
  ThumbsDown,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Plus,
  RefreshCw,
  CheckCircle2,
  X,
  AlertCircle
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Proposal {
  id: number
  title: string
  description: string
  category: string
  status: string
  author: string
  createdAt: string
  endDate: string
  votesFor: number
  votesAgainst: number
  totalVotes: number
  quorum: number
  quorumReached: boolean
  type: string
  priority: string
  tags: string[]
  discussionCount: number
  views: number
  isBookmarked: boolean
  votingPower: number
}

interface VotingModalProps {
  proposal: Proposal | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function VotingModal({ proposal, open, onOpenChange }: VotingModalProps) {
  const [selectedVote, setSelectedVote] = useState<"for" | "against" | null>(null)
  const [votingPower, setVotingPower] = useState("")
  const [isVoting, setIsVoting] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [delegationEnabled, setDelegationEnabled] = useState(false)

  if (!proposal) return null

  const getVotePercentage = (votes: number, total: number) => {
    if (total === 0) return 0
    return (votes / total) * 100
  }

  const getVotingProgress = () => {
    const totalPossibleVotes = proposal.quorum
    const progress = (proposal.totalVotes / totalPossibleVotes) * 100
    return Math.min(progress, 100)
  }

  const getTimeRemaining = () => {
    const now = new Date()
    const end = new Date(proposal.endDate)
    const diff = end.getTime() - now.getTime()
    
    if (diff <= 0) return "Voting ended"
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  const handleVote = async () => {
    if (!selectedVote || !votingPower) return

    setIsVoting(true)
    try {
      // Simulate voting process
      await new Promise(resolve => setTimeout(resolve, 3000))
      console.log("Vote cast:", { proposal: proposal.id, vote: selectedVote, power: votingPower })
      onOpenChange(false)
    } catch (error) {
      console.error("Voting failed:", error)
    } finally {
      setIsVoting(false)
    }
  }

  const mockVotingHistory = [
    {
      voter: "0x1234...5678",
      vote: "For",
      power: "125,000",
      timestamp: "2 hours ago",
      verified: true
    },
    {
      voter: "0xabcd...efgh",
      vote: "Against",
      power: "89,000",
      timestamp: "3 hours ago",
      verified: true
    },
    {
      voter: "0x9876...5432",
      vote: "For",
      power: "156,000",
      timestamp: "4 hours ago",
      verified: false
    }
  ]

  const mockDelegations = [
    {
      delegator: "0x5678...9abc",
      delegatee: "0x1234...5678",
      amount: "250,000",
      timestamp: "1 day ago"
    },
    {
      delegator: "0xefgh...ijkl",
      delegatee: "0xabcd...efgh",
      amount: "180,000",
      timestamp: "2 days ago"
    }
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <Vote className="h-6 w-6 mr-2 text-blue-500" />
            Vote on Proposal
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Proposal Info */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-500 text-white">{proposal.status}</Badge>
                    <Badge variant="outline">{proposal.priority}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 inline mr-1" />
                    {getTimeRemaining()}
                  </div>
                </div>
                <h3 className="text-xl font-bold">{proposal.title}</h3>
                <p className="text-muted-foreground text-sm">by {proposal.author}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{proposal.description}</p>
                <div className="flex flex-wrap gap-1">
                  {proposal.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Voting Results */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Current Results
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">For</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{proposal.votesFor.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">
                        {getVotePercentage(proposal.votesFor, proposal.totalVotes).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  <Progress 
                    value={getVotePercentage(proposal.votesFor, proposal.totalVotes)} 
                    className="h-2"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium">Against</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{proposal.votesAgainst.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">
                        {getVotePercentage(proposal.votesAgainst, proposal.totalVotes).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  <Progress 
                    value={getVotePercentage(proposal.votesAgainst, proposal.totalVotes)} 
                    className="h-2"
                  />
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Quorum Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {proposal.totalVotes.toLocaleString()} / {proposal.quorum.toLocaleString()}
                    </span>
                  </div>
                  <Progress 
                    value={getVotingProgress()} 
                    className="h-2 mt-2"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {proposal.quorumReached ? "Quorum reached" : "Quorum not reached"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Votes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Users className="h-5 w-5 mr-2" />
                  Recent Votes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockVotingHistory.map((vote, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center",
                          vote.vote === "For" ? "bg-green-100" : "bg-red-100"
                        )}>
                          {vote.vote === "For" ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{vote.vote}</p>
                          <p className="text-xs text-muted-foreground">{vote.power} tokens</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          {vote.verified && <Shield className="h-3 w-3 text-blue-500" />}
                          <p className="text-xs font-mono">{vote.voter}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">{vote.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Voting Interface */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Vote className="h-5 w-5 mr-2 text-blue-500" />
                  Cast Your Vote
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Vote Options */}
                <div className="space-y-3">
                  <div 
                    className={cn(
                      "p-4 border-2 rounded-lg cursor-pointer transition-all",
                      selectedVote === "for" 
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20" 
                        : "border-gray-200 hover:border-green-300"
                    )}
                    onClick={() => setSelectedVote("for")}
                  >
                    <div className="flex items-center space-x-3">
                      <CheckCircle className={cn(
                        "h-6 w-6",
                        selectedVote === "for" ? "text-green-600" : "text-gray-400"
                      )} />
                      <div>
                        <p className="font-semibold text-green-700 dark:text-green-300">Vote For</p>
                        <p className="text-sm text-muted-foreground">Support this proposal</p>
                      </div>
                    </div>
                  </div>

                  <div 
                    className={cn(
                      "p-4 border-2 rounded-lg cursor-pointer transition-all",
                      selectedVote === "against" 
                        ? "border-red-500 bg-red-50 dark:bg-red-900/20" 
                        : "border-gray-200 hover:border-red-300"
                    )}
                    onClick={() => setSelectedVote("against")}
                  >
                    <div className="flex items-center space-x-3">
                      <XCircle className={cn(
                        "h-6 w-6",
                        selectedVote === "against" ? "text-red-600" : "text-gray-400"
                      )} />
                      <div>
                        <p className="font-semibold text-red-700 dark:text-red-300">Vote Against</p>
                        <p className="text-sm text-muted-foreground">Oppose this proposal</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Voting Power */}
                <div>
                  <label className="block text-sm font-medium mb-2">Voting Power (tokens)</label>
                  <input
                    type="number"
                    placeholder="Enter your voting power"
                    value={votingPower}
                    onChange={(e) => setVotingPower(e.target.value)}
                    className="w-full p-3 border border-input rounded-md bg-background"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Available: 1,250,000 tokens
                  </p>
                </div>

                {/* Advanced Options */}
                <div>
                  <Button
                    variant="ghost"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="w-full justify-between"
                  >
                    <span>Advanced Options</span>
                    {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                  
                  {showAdvanced && (
                    <div className="mt-4 space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="delegation"
                          checked={delegationEnabled}
                          onChange={(e) => setDelegationEnabled(e.target.checked)}
                          className="rounded"
                        />
                        <label htmlFor="delegation" className="text-sm">
                          Enable vote delegation
                        </label>
                      </div>
                      
                      {delegationEnabled && (
                        <div>
                          <label className="block text-sm font-medium mb-2">Delegate To</label>
                          <input
                            type="text"
                            placeholder="Enter delegate address"
                            className="w-full p-2 border border-input rounded-md bg-background text-sm"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Vote Button */}
                <Button
                  onClick={handleVote}
                  disabled={!selectedVote || !votingPower || isVoting}
                  className={cn(
                    "w-full",
                    selectedVote === "for" 
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                      : "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700"
                  )}
                >
                  {isVoting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Casting Vote...
                    </>
                  ) : (
                    <>
                      <Vote className="h-4 w-4 mr-2" />
                      Vote {selectedVote === "for" ? "For" : "Against"}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Voting Power Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Wallet className="h-5 w-5 mr-2" />
                  Your Voting Power
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Owned Tokens</p>
                      <p className="text-lg font-semibold">1,250,000</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Delegated To You</p>
                      <p className="text-lg font-semibold">180,000</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Voting Power</span>
                      <span className="text-lg font-bold">1,430,000</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delegations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Users className="h-5 w-5 mr-2" />
                  Recent Delegations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockDelegations.map((delegation, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="text-sm font-medium">{delegation.amount} tokens</p>
                        <p className="text-xs text-muted-foreground">{delegation.timestamp}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-mono">{delegation.delegator}</p>
                        <p className="text-xs text-muted-foreground">→ {delegation.delegatee}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Risk Warning */}
            <Card className="border-orange-200 bg-orange-50 dark:bg-orange-900/20">
              <CardContent className="p-4">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-orange-900 dark:text-orange-100">Important Notice</h4>
                    <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                      Votes are final and cannot be changed once cast. Make sure you understand the proposal before voting.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}















