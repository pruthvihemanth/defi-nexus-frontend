"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  X, 
  ExternalLink, 
  Twitter, 
  MessageCircle, 
  Globe, 
  FileText, 
  Users, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Target, 
  BarChart3, 
  Calendar, 
  Lock, 
  Unlock, 
  Star, 
  Heart, 
  Share2, 
  Copy, 
  Eye,
  Zap,
  Award,
  Activity,
  Coins,
  Percent,
  ArrowUpRight,
  Flame,
  Info
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Project {
  id: string
  name: string
  symbol: string
  description: string
  logo: string
  category: string
  status: string
  raised: string
  target: string
  participants: number
  price: string
  marketCap: string
  liquidity: string
  volume24h: string
  change24h: string
  contractAddress?: string
  socials: {
    twitter: string
    telegram: string
    website: string
  }
  isVerified: boolean
  isTrending: boolean
  isFeatured: boolean
  isFavorite: boolean
  launchDate: string
  endDate: string
  vestingPeriod: string
  minInvestment: string
  maxInvestment: string
  totalSupply: string
  tokensForSale: string
  teamAllocation: string
  liquidityAllocation: string
  marketingAllocation: string
  communityAllocation: string
  kycRequired: boolean
  auditStatus: string
  riskLevel: string
  tags: string[]
  whitepaper: string
  roadmap: Array<{
    phase: string
    description: string
    status: string
  }>
}

interface ProjectDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  project: Project | null
}

export function ProjectDetailsModal({ isOpen, onClose, project }: ProjectDetailsModalProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isFavorite, setIsFavorite] = useState(project?.isFavorite || false)

  if (!project) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live": return "bg-green-500"
      case "Upcoming": return "bg-blue-500"
      case "Ended": return "bg-gray-500"
      default: return "bg-gray-500"
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Low": return "text-green-500"
      case "Medium": return "text-yellow-500"
      case "High": return "text-red-500"
      default: return "text-gray-500"
    }
  }

  const progressPercentage = (parseFloat(project.raised.replace(/[$,]/g, '')) / parseFloat(project.target.replace(/[$,]/g, ''))) * 100

  const handleInvest = () => {
    // This would trigger the invest modal
    console.log("Invest in project:", project.id)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: project.name,
        text: project.description,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(project.contractAddress || "0x...")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-3">
              <div className="text-3xl">{project.logo}</div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-2xl font-bold">{project.name}</h2>
                  {project.isVerified && <Shield className="h-5 w-5 text-blue-500" />}
                  {project.isTrending && <Flame className="h-5 w-5 text-orange-500" />}
                </div>
                <p className="text-lg text-muted-foreground">${project.symbol}</p>
              </div>
            </DialogTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={cn("h-4 w-4", isFavorite && "fill-red-500 text-red-500")} />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Progress */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge className={cn("text-white", getStatusColor(project.status))}>
                {project.status}
              </Badge>
              <Badge variant="outline" className={cn("text-xs", getRiskColor(project.riskLevel))}>
                Risk: {project.riskLevel}
              </Badge>
              {project.auditStatus === "Completed" && (
                <Badge variant="outline" className="text-green-500 border-green-500">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Audited
                </Badge>
              )}
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Progress</p>
              <p className="text-lg font-bold">{progressPercentage.toFixed(1)}%</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-orange-500 to-red-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <DollarSign className="h-6 w-6 mx-auto mb-2 text-green-500" />
                <p className="text-sm text-muted-foreground">Raised</p>
                <p className="text-lg font-bold">{project.raised}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Target className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                <p className="text-sm text-muted-foreground">Target</p>
                <p className="text-lg font-bold">{project.target}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-purple-500" />
                <p className="text-sm text-muted-foreground">Participants</p>
                <p className="text-lg font-bold">{project.participants.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Coins className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="text-lg font-bold">{project.price}</p>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {project.status === "Live" && (
              <Button 
                size="lg" 
                className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                onClick={handleInvest}
              >
                <DollarSign className="h-5 w-5 mr-2" />
                Invest Now
              </Button>
            )}
            {project.status === "Upcoming" && (
              <Button size="lg" variant="outline" className="flex-1">
                <Clock className="h-5 w-5 mr-2" />
                Notify Me
              </Button>
            )}
            <Button variant="outline" size="lg" className="flex-1">
              <BarChart3 className="h-5 w-5 mr-2" />
              View Chart
            </Button>
            <Button variant="outline" size="lg" className="flex-1">
              <FileText className="h-5 w-5 mr-2" />
              Whitepaper
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium">Social Links:</span>
            {project.socials.website && (
              <Button variant="ghost" size="sm" asChild>
                <a href={project.socials.website} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-4 w-4 mr-1" />
                  Website
                </a>
              </Button>
            )}
            {project.socials.twitter && (
              <Button variant="ghost" size="sm" asChild>
                <a href={project.socials.twitter} target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4 mr-1" />
                  Twitter
                </a>
              </Button>
            )}
            {project.socials.telegram && (
              <Button variant="ghost" size="sm" asChild>
                <a href={project.socials.telegram} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Telegram
                </a>
              </Button>
            )}
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tokenomics">Tokenomics</TabsTrigger>
              <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{project.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Key Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Category</p>
                      <p className="font-medium">{project.category}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Launch Date</p>
                      <p className="font-medium">{project.launchDate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">End Date</p>
                      <p className="font-medium">{project.endDate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Vesting Period</p>
                      <p className="font-medium">{project.vestingPeriod}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Min Investment</p>
                      <p className="font-medium">{project.minInvestment}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Max Investment</p>
                      <p className="font-medium">{project.maxInvestment}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tokenomics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Token Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Total Supply</span>
                      <span className="font-medium">{project.totalSupply}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Tokens for Sale</span>
                      <span className="font-medium">{project.tokensForSale}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Team Allocation</span>
                      <span className="font-medium">{project.teamAllocation}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Liquidity Allocation</span>
                      <span className="font-medium">{project.liquidityAllocation}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Marketing Allocation</span>
                      <span className="font-medium">{project.marketingAllocation}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Community Allocation</span>
                      <span className="font-medium">{project.communityAllocation}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Market Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Current Price</p>
                      <p className="text-xl font-bold">{project.price}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Market Cap</p>
                      <p className="text-xl font-bold">{project.marketCap}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">24h Volume</p>
                      <p className="text-xl font-bold">{project.volume24h}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">24h Change</p>
                      <p className={cn(
                        "text-xl font-bold flex items-center",
                        project.change24h.startsWith("+") ? "text-green-500" : "text-red-500"
                      )}>
                        {project.change24h.startsWith("+") ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        {project.change24h}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="roadmap" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Roadmap</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.roadmap.map((phase, index: number) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold",
                          phase.status === "Completed" ? "bg-green-500" :
                          phase.status === "In Progress" ? "bg-blue-500" : "bg-gray-300"
                        )}>
                          {phase.status === "Completed" ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : phase.status === "In Progress" ? (
                            <Activity className="h-4 w-4" />
                          ) : (
                            index + 1
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{phase.phase}</h4>
                          <p className="text-sm text-muted-foreground">{phase.description}</p>
                          <Badge 
                            variant="outline" 
                            className={cn(
                              "mt-2 text-xs",
                              phase.status === "Completed" ? "text-green-500 border-green-500" :
                              phase.status === "In Progress" ? "text-blue-500 border-blue-500" : "text-gray-500 border-gray-500"
                            )}
                          >
                            {phase.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <DollarSign className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">New Investment</p>
                        <p className="text-sm text-muted-foreground">$1,250 invested by 0x1234...5678</p>
                        <p className="text-xs text-muted-foreground">2 minutes ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">New Participant</p>
                        <p className="text-sm text-muted-foreground">Project reached 1,000 participants</p>
                        <p className="text-xs text-muted-foreground">1 hour ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Price Update</p>
                        <p className="text-sm text-muted-foreground">Token price increased by 5.2%</p>
                        <p className="text-xs text-muted-foreground">3 hours ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
