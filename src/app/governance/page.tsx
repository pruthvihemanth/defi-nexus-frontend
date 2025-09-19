"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  Plus,
  TrendingUp,
  Shield,
  DollarSign,
  Star,
  Vote,
  Activity,
  ChevronRight,
  Users,
  Award,
  Flame,
  Info,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  BarChart3,
  TrendingDown,
  Eye,
  Calendar,
  Target,
  Zap,
  Crown,
  Sparkles,
  FileText,
  Wallet,
  Settings,
  Globe,
  Lock,
  Unlock,
  ArrowUpRight,
  ExternalLink,
  Copy,
  Share2,
  Bookmark,
  Flag,
  AlertTriangle,
  CheckCircle2,
  Timer,
  Percent,
  Coins,
  PieChart,
  LineChart,
  TrendingUp as TrendingUpIcon
} from "lucide-react"
import { cn } from "@/lib/utils"
import { CreateProposalModal } from "@/components/governance/create-proposal-modal"
import { ProposalDetailsModal } from "@/components/governance/proposal-details-modal"
import { VotingModal } from "@/components/governance/voting-modal"
import { TreasuryModal } from "@/components/governance/treasury-modal"

// Mock governance data
const mockProposals = [
  {
    id: 1,
    title: "Increase Liquidity Mining Rewards for SOL/USDC Pool",
    description: "Proposal to increase the liquidity mining rewards for the SOL/USDC pool from 2% to 3.5% APY to attract more liquidity providers and improve trading depth.",
    category: "Treasury",
    status: "Active",
    author: "0x1234...5678",
    createdAt: "2024-01-15",
    endDate: "2024-01-22",
    votesFor: 1250000,
    votesAgainst: 450000,
    totalVotes: 1700000,
    quorum: 2000000,
    quorumReached: false,
    type: "Standard",
    priority: "High",
    tags: ["Liquidity", "Rewards", "SOL", "USDC"],
    discussionCount: 47,
    views: 1234,
    isBookmarked: false,
    votingPower: 0.85
  },
  {
    id: 2,
    title: "Implement Cross-Chain Bridge Integration",
    description: "Add support for cross-chain asset transfers between Solana and Ethereum, Polygon, and BSC networks to expand DeFi Nexus accessibility.",
    category: "Technical",
    status: "Passed",
    author: "0xabcd...efgh",
    createdAt: "2024-01-10",
    endDate: "2024-01-17",
    votesFor: 2100000,
    votesAgainst: 320000,
    totalVotes: 2420000,
    quorum: 2000000,
    quorumReached: true,
    type: "Standard",
    priority: "Medium",
    tags: ["Cross-Chain", "Bridge", "Integration", "Multi-Chain"],
    discussionCount: 89,
    views: 2156,
    isBookmarked: true,
    votingPower: 0.92
  },
  {
    id: 3,
    title: "DAO Treasury Diversification Strategy",
    description: "Proposal to diversify the DAO treasury by allocating 30% of funds to stablecoins, 40% to blue-chip tokens, and 30% to DeFi yield strategies.",
    category: "Treasury",
    status: "Draft",
    author: "0x9876...5432",
    createdAt: "2024-01-18",
    endDate: "2024-01-25",
    votesFor: 0,
    votesAgainst: 0,
    totalVotes: 0,
    quorum: 2000000,
    quorumReached: false,
    type: "Standard",
    priority: "High",
    tags: ["Treasury", "Diversification", "Strategy", "Risk Management"],
    discussionCount: 23,
    views: 567,
    isBookmarked: false,
    votingPower: 0.78
  },
  {
    id: 4,
    title: "Community Grant Program Launch",
    description: "Establish a $500,000 community grant program to fund innovative projects that contribute to the DeFi Nexus ecosystem development.",
    category: "Community",
    status: "Active",
    author: "0x5678...9abc",
    createdAt: "2024-01-12",
    endDate: "2024-01-19",
    votesFor: 890000,
    votesAgainst: 210000,
    totalVotes: 1100000,
    quorum: 2000000,
    quorumReached: false,
    type: "Standard",
    priority: "Medium",
    tags: ["Grants", "Community", "Development", "Funding"],
    discussionCount: 156,
    views: 3456,
    isBookmarked: true,
    votingPower: 0.67
  },
  {
    id: 5,
    title: "Security Audit Partnership with CertiK",
    description: "Proposal to engage CertiK for comprehensive security audits of all DeFi Nexus smart contracts and protocols.",
    category: "Security",
    status: "Failed",
    author: "0xefgh...ijkl",
    createdAt: "2024-01-05",
    endDate: "2024-01-12",
    votesFor: 650000,
    votesAgainst: 1200000,
    totalVotes: 1850000,
    quorum: 2000000,
    quorumReached: false,
    type: "Standard",
    priority: "High",
    tags: ["Security", "Audit", "CertiK", "Smart Contracts"],
    discussionCount: 78,
    views: 1890,
    isBookmarked: false,
    votingPower: 0.45
  },
  {
    id: 6,
    title: "NFT Marketplace Fee Reduction",
    description: "Reduce NFT marketplace fees from 2.5% to 1.5% to increase trading volume and attract more creators to the platform.",
    category: "Product",
    status: "Active",
    author: "0xijkl...mnop",
    createdAt: "2024-01-16",
    endDate: "2024-01-23",
    votesFor: 1450000,
    votesAgainst: 380000,
    totalVotes: 1830000,
    quorum: 2000000,
    quorumReached: false,
    type: "Standard",
    priority: "Medium",
    tags: ["NFT", "Fees", "Marketplace", "Trading"],
    discussionCount: 92,
    views: 2789,
    isBookmarked: false,
    votingPower: 0.73
  }
]

const categories = ["All", "Treasury", "Technical", "Community", "Security", "Product", "Governance"]
const statuses = ["All", "Active", "Draft", "Passed", "Failed", "Executed"]
const priorities = ["All", "High", "Medium", "Low"]

export default function GovernancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedPriority, setSelectedPriority] = useState("All")
  const [sortBy, setSortBy] = useState("Newest")
  const [activeTab, setActiveTab] = useState("proposals")
  const [showCreateProposal, setShowCreateProposal] = useState(false)
  const [selectedProposal, setSelectedProposal] = useState<typeof mockProposals[0] | null>(null)
  const [showVoting, setShowVoting] = useState(false)
  const [showTreasury, setShowTreasury] = useState(false)

  const filteredProposals = useMemo(() => {
    return mockProposals.filter(proposal => {
      const matchesSearch = proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           proposal.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           proposal.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesCategory = selectedCategory === "All" || proposal.category === selectedCategory
      const matchesStatus = selectedStatus === "All" || proposal.status === selectedStatus
      const matchesPriority = selectedPriority === "All" || proposal.priority === selectedPriority

      return matchesSearch && matchesCategory && matchesStatus && matchesPriority
    })
  }, [searchTerm, selectedCategory, selectedStatus, selectedPriority])

  const sortedProposals = useMemo(() => {
    const sorted = [...filteredProposals]
    switch (sortBy) {
      case "Newest":
        return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      case "Oldest":
        return sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      case "Most Votes":
        return sorted.sort((a, b) => b.totalVotes - a.totalVotes)
      case "Ending Soon":
        return sorted.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
      case "Most Discussed":
        return sorted.sort((a, b) => b.discussionCount - a.discussionCount)
      default:
        return sorted
    }
  }, [filteredProposals, sortBy])

  const handleProposalClick = (proposal: typeof mockProposals[0]) => {
    setSelectedProposal(proposal)
  }

  const handleVoteClick = (proposal: typeof mockProposals[0]) => {
    setSelectedProposal(proposal)
    setShowVoting(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-500"
      case "Draft": return "bg-yellow-500"
      case "Passed": return "bg-blue-500"
      case "Failed": return "bg-red-500"
      case "Executed": return "bg-purple-500"
      default: return "bg-gray-500"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-500"
      case "Medium": return "bg-yellow-500"
      case "Low": return "bg-green-500"
      default: return "bg-gray-500"
    }
  }

  const getVotingProgress = (proposal: typeof mockProposals[0]) => {
    const totalPossibleVotes = proposal.quorum
    const progress = (proposal.totalVotes / totalPossibleVotes) * 100
    return Math.min(progress, 100)
  }

  const getVotePercentage = (votes: number, total: number) => {
    if (total === 0) return 0
    return (votes / total) * 100
  }

  const activeProposals = mockProposals.filter(p => p.status === "Active").length
  const totalProposals = mockProposals.length
  const totalVotes = mockProposals.reduce((sum, p) => sum + p.totalVotes, 0)
  const participationRate = 78.5

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Vote className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium">DAO Governance</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Governance
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Shape the future of DeFi Nexus through decentralized governance and community-driven decisions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => setShowCreateProposal(true)}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Proposal
              </Button>
              <Button variant="outline" onClick={() => setShowTreasury(true)}>
                <DollarSign className="h-5 w-5 mr-2" />
                View Treasury
              </Button>
            </div>
          </div>

          {/* Stats Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Proposals</p>
                    <p className="text-2xl font-bold">{activeProposals}</p>
                    <p className="text-xs text-green-500 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +2 this week
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                    <Vote className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Proposals</p>
                    <p className="text-2xl font-bold">{totalProposals}</p>
                    <p className="text-xs text-blue-500 flex items-center">
                      <FileText className="h-3 w-3 mr-1" />
                      {Math.round((totalProposals / 30) * 100)}% success rate
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Votes Cast</p>
                    <p className="text-2xl font-bold">{(totalVotes / 1000000).toFixed(1)}M</p>
                    <p className="text-xs text-green-500 flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      {participationRate}% participation
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Treasury Value</p>
                    <p className="text-2xl font-bold">$12.4M</p>
                    <p className="text-xs text-green-500 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +8.2% this month
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
              <TabsTrigger value="proposals">Proposals</TabsTrigger>
              <TabsTrigger value="treasury">Treasury</TabsTrigger>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="space-y-6">
                {/* Search and Filters */}
                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search proposals by title, description, or tags..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                          <Button
                            key={category}
                            variant={selectedCategory === category ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedCategory(category)}
                            className="text-xs"
                          >
                            {category}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-4 mt-4">
                      <div className="flex items-center space-x-2">
                        <Filter className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Status:</span>
                        <div className="flex gap-1">
                          {statuses.map((status) => (
                            <Button
                              key={status}
                              variant={selectedStatus === status ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedStatus(status)}
                              className="text-xs h-8"
                            >
                              {status}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Priority:</span>
                        <div className="flex gap-1">
                          {priorities.map((priority) => (
                            <Button
                              key={priority}
                              variant={selectedPriority === priority ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedPriority(priority)}
                              className="text-xs h-8"
                            >
                              {priority}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Sort by:</span>
                        <select 
                          value={sortBy} 
                          onChange={(e) => setSortBy(e.target.value)}
                          className="bg-transparent border border-input rounded-md px-3 py-1 text-sm"
                        >
                          <option value="Newest">Newest</option>
                          <option value="Oldest">Oldest</option>
                          <option value="Most Votes">Most Votes</option>
                          <option value="Ending Soon">Ending Soon</option>
                          <option value="Most Discussed">Most Discussed</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Proposals Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {sortedProposals.map((proposal) => (
                    <Card key={proposal.id} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <Badge className={cn("text-white", getStatusColor(proposal.status))}>
                              {proposal.status}
                            </Badge>
                            <Badge variant="outline" className={cn("text-xs", getPriorityColor(proposal.priority))}>
                              {proposal.priority}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Bookmark className={cn("h-4 w-4", proposal.isBookmarked ? "fill-blue-500 text-blue-500" : "")} />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Share2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <h3 className="font-bold text-lg line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                          {proposal.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                          {proposal.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {proposal.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {proposal.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{proposal.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Voting Progress */}
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">Voting Progress</span>
                              <span className="text-sm text-muted-foreground">
                                {proposal.totalVotes.toLocaleString()} / {proposal.quorum.toLocaleString()}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={cn(
                                  "h-2 rounded-full transition-all duration-300",
                                  proposal.quorumReached ? "bg-green-500" : "bg-blue-500"
                                )}
                                style={{ width: `${getVotingProgress(proposal)}%` }}
                              />
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                              <span>For: {getVotePercentage(proposal.votesFor, proposal.totalVotes).toFixed(1)}%</span>
                              <span>Against: {getVotePercentage(proposal.votesAgainst, proposal.totalVotes).toFixed(1)}%</span>
                            </div>
                          </div>

                          {/* Proposal Stats */}
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Author</p>
                              <p className="font-mono text-xs">{proposal.author}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Ends</p>
                              <p className="font-medium">{new Date(proposal.endDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Discussions</p>
                              <p className="font-medium">{proposal.discussionCount}</p>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex space-x-2 pt-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleProposalClick(proposal)}
                              className="flex-1"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                            {proposal.status === "Active" && (
                              <Button 
                                size="sm"
                                onClick={() => handleVoteClick(proposal)}
                                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                              >
                                <Vote className="h-4 w-4 mr-2" />
                                Vote
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="treasury" className="mt-6">
              <div className="space-y-6">
                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl">
                      <DollarSign className="h-6 w-6 mr-2 text-green-500" />
                      Treasury Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <p className="text-4xl font-bold text-green-600">$12.4M</p>
                        <p className="text-muted-foreground">Total Value</p>
                      </div>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-blue-600">$2.1M</p>
                        <p className="text-muted-foreground">Available</p>
                      </div>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-purple-600">$10.3M</p>
                        <p className="text-muted-foreground">Allocated</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="discussions" className="mt-6">
              <div className="space-y-6">
                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl">
                      <MessageSquare className="h-6 w-6 mr-2 text-blue-500" />
                      Community Discussions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Discussion forum coming soon...</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <div className="space-y-6">
                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl">
                      <Clock className="h-6 w-6 mr-2 text-purple-500" />
                      Governance History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Historical records coming soon...</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Modals */}
      <CreateProposalModal 
        open={showCreateProposal} 
        onOpenChange={setShowCreateProposal} 
      />
      <ProposalDetailsModal 
        proposal={selectedProposal} 
        open={!!selectedProposal} 
        onOpenChange={() => setSelectedProposal(null)} 
      />
      <VotingModal 
        proposal={selectedProposal} 
        open={showVoting} 
        onOpenChange={setShowVoting} 
      />
      <TreasuryModal 
        open={showTreasury} 
        onOpenChange={setShowTreasury} 
      />
    </div>
  )
}

