"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Vote,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  TrendingUp,
  TrendingDown,
  Shield,
  Eye,
  Copy,
  ExternalLink,
  MessageSquare,
  FileText,
  Calendar,
  Target,
  BarChart3,
  Activity,
  Award,
  Star,
  Flame,
  Crown,
  Zap,
  Globe,
  Lock,
  Unlock,
  Settings,
  Download,
  Upload,
  Send,
  Receive,
  History,
  DollarSign,
  Percent,
  Coins,
  PieChart,
  LineChart,
  TrendingUp as TrendingUpIcon,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Maximize,
  Minimize,
  X,
  Check,
  AlertCircle,
  CheckCircle2,
  Timer,
  Hash,
  Tag,
  Flag,
  Bookmark,
  Share2,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Info,
  AlertTriangle,
  Plus,
  Minus,
  RefreshCw
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

interface ProposalDetailsModalProps {
  proposal: Proposal | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProposalDetailsModal({ proposal, open, onOpenChange }: ProposalDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isBookmarked, setIsBookmarked] = useState(false)

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
    }
  ]

  const mockComments = [
    {
      author: "0x9876...5432",
      content: "This proposal looks great! I think increasing liquidity rewards will definitely help attract more users.",
      timestamp: "1 hour ago",
      likes: 12,
      verified: true
    },
    {
      author: "0x5678...9abc",
      content: "I have some concerns about the sustainability of higher rewards. We should consider the long-term impact on treasury.",
      timestamp: "2 hours ago",
      likes: 8,
      verified: false
    }
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <FileText className="h-6 w-6 mr-2 text-blue-500" />
            {proposal.title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="voting">Voting</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Badge className="bg-green-500 text-white">{proposal.status}</Badge>
                        <Badge variant="outline">{proposal.priority}</Badge>
                        <Badge variant="outline">{proposal.category}</Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost" onClick={() => setIsBookmarked(!isBookmarked)}>
                          <Bookmark className={cn("h-4 w-4", isBookmarked ? "fill-blue-500 text-blue-500" : "")} />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold">{proposal.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>by {proposal.author}</span>
                      <span>•</span>
                      <span>{new Date(proposal.createdAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{proposal.views} views</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <p className="text-muted-foreground leading-relaxed">{proposal.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-6">
                      {proposal.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="voting" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      Voting Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <CheckCircle className="h-6 w-6 text-green-500" />
                          <span className="text-2xl font-bold">{proposal.votesFor.toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Votes For</p>
                        <p className="text-lg font-semibold text-green-600">
                          {getVotePercentage(proposal.votesFor, proposal.totalVotes).toFixed(1)}%
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <XCircle className="h-6 w-6 text-red-500" />
                          <span className="text-2xl font-bold">{proposal.votesAgainst.toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Votes Against</p>
                        <p className="text-lg font-semibold text-red-600">
                          {getVotePercentage(proposal.votesAgainst, proposal.totalVotes).toFixed(1)}%
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Quorum Progress</span>
                          <span className="text-sm text-muted-foreground">
                            {proposal.totalVotes.toLocaleString()} / {proposal.quorum.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={cn(
                              "h-3 rounded-full transition-all duration-300",
                              proposal.quorumReached ? "bg-green-500" : "bg-blue-500"
                            )}
                            style={{ width: `${getVotingProgress()}%` }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {proposal.quorumReached ? "Quorum reached" : "Quorum not reached"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

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
              </TabsContent>

              <TabsContent value="discussion" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <MessageSquare className="h-5 w-5 mr-2" />
                      Community Discussion
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockComments.map((comment, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                              <span className="text-white text-xs font-bold">
                                {comment.author.slice(2, 4).toUpperCase()}
                              </span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <p className="font-medium text-sm">{comment.author}</p>
                                {comment.verified && <Shield className="h-3 w-3 text-blue-500" />}
                                <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">{comment.content}</p>
                              <div className="flex items-center space-x-4">
                                <Button size="sm" variant="ghost" className="h-8">
                                  <ThumbsUp className="h-3 w-3 mr-1" />
                                  {comment.likes}
                                </Button>
                                <Button size="sm" variant="ghost" className="h-8">
                                  <MessageSquare className="h-3 w-3 mr-1" />
                                  Reply
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Clock className="h-5 w-5 mr-2" />
                  Voting Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{getTimeRemaining()}</p>
                  <p className="text-sm text-muted-foreground">Time Remaining</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Total Votes</span>
                    <span className="font-medium">{proposal.totalVotes.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Quorum</span>
                    <span className="font-medium">{proposal.quorum.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Voting Power</span>
                    <span className="font-medium">{(proposal.votingPower * 100).toFixed(1)}%</span>
                  </div>
                </div>
                {proposal.status === "Active" && (
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                    <Vote className="h-4 w-4 mr-2" />
                    Cast Vote
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Info className="h-5 w-5 mr-2" />
                  Proposal Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium">{proposal.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium">{proposal.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Priority</span>
                  <span className="font-medium">{proposal.priority}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Created</span>
                  <span className="font-medium">{new Date(proposal.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ends</span>
                  <span className="font-medium">{new Date(proposal.endDate).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Activity className="h-5 w-5 mr-2" />
                  Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Views</span>
                  <span className="font-medium">{proposal.views.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Comments</span>
                  <span className="font-medium">{proposal.discussionCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Bookmarks</span>
                  <span className="font-medium">42</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shares</span>
                  <span className="font-medium">18</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}





