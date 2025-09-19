"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
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
  Rocket,
  Activity,
  ChevronRight,
  Users,
  Award,
  Flame,
  Info
} from "lucide-react"
import { cn } from "@/lib/utils"
import { CreateTokenModal } from "@/components/launchpad/create-token-modal"
import { ProjectDetailsModal } from "@/components/launchpad/project-details-modal"
import { InvestModal } from "@/components/launchpad/invest-modal"

// Mock data for projects
const mockProjects = [
  {
    id: "1",
    name: "DogeCoin 2.0",
    symbol: "DOGE2",
    description: "The next generation of meme coins with utility and community governance",
    logo: "🐕",
    category: "Meme",
    status: "Live",
    raised: "$2,456,789",
    target: "$5,000,000",
    participants: 1247,
    price: "$0.001",
    marketCap: "$2.4M",
    liquidity: "$1.2M",
    volume24h: "$456,789",
    change24h: "+23.45%",
    socials: {
      twitter: "https://twitter.com/dogecoin2",
      telegram: "https://t.me/dogecoin2",
      website: "https://dogecoin2.com"
    },
    isVerified: true,
    isTrending: true,
    isFeatured: true,
    isFavorite: false,
    launchDate: "2024-01-15",
    endDate: "2024-02-15",
    vestingPeriod: "6 months",
    minInvestment: "$10",
    maxInvestment: "$10,000",
    totalSupply: "1,000,000,000",
    tokensForSale: "400,000,000",
    teamAllocation: "20%",
    liquidityAllocation: "30%",
    marketingAllocation: "10%",
    communityAllocation: "40%",
    kycRequired: false,
    auditStatus: "Completed",
    riskLevel: "Medium",
    tags: ["Meme", "Community", "Governance", "Utility"],
    whitepaper: "https://dogecoin2.com/whitepaper.pdf",
    roadmap: [
      { phase: "Phase 1", description: "Token Launch & Initial Marketing", status: "Completed" },
      { phase: "Phase 2", description: "DEX Listing & Liquidity", status: "In Progress" },
      { phase: "Phase 3", description: "Community Features & Governance", status: "Planned" },
      { phase: "Phase 4", description: "Utility Development & Partnerships", status: "Planned" }
    ]
  },
  {
    id: "2",
    name: "CatCoin",
    symbol: "CAT",
    description: "The purr-fect meme coin for cat lovers worldwide",
    logo: "🐱",
    category: "Meme",
    status: "Upcoming",
    raised: "$0",
    target: "$1,000,000",
    participants: 0,
    price: "$0.0005",
    marketCap: "$0",
    liquidity: "$0",
    volume24h: "$0",
    change24h: "0%",
    socials: {
      twitter: "https://twitter.com/catcoin",
      telegram: "https://t.me/catcoin",
      website: "https://catcoin.com"
    },
    isVerified: false,
    isTrending: false,
    isFeatured: false,
    isFavorite: true,
    launchDate: "2024-02-01",
    endDate: "2024-03-01",
    vestingPeriod: "3 months",
    minInvestment: "$5",
    maxInvestment: "$5,000",
    totalSupply: "500,000,000",
    tokensForSale: "200,000,000",
    teamAllocation: "15%",
    liquidityAllocation: "25%",
    marketingAllocation: "15%",
    communityAllocation: "45%",
    kycRequired: true,
    auditStatus: "Pending",
    riskLevel: "High",
    tags: ["Meme", "Community", "Fun"],
    whitepaper: "https://catcoin.com/whitepaper.pdf",
    roadmap: [
      { phase: "Phase 1", description: "Community Building", status: "In Progress" },
      { phase: "Phase 2", description: "Token Launch", status: "Planned" },
      { phase: "Phase 3", description: "Exchange Listings", status: "Planned" }
    ]
  },
  {
    id: "3",
    name: "MoonToken",
    symbol: "MOON",
    description: "To the moon and beyond! A community-driven token with real utility",
    logo: "🌙",
    category: "Utility",
    status: "Ended",
    raised: "$3,000,000",
    target: "$3,000,000",
    participants: 2156,
    price: "$0.01",
    marketCap: "$3.0M",
    liquidity: "$1.5M",
    volume24h: "$234,567",
    change24h: "-5.23%",
    socials: {
      twitter: "https://twitter.com/moontoken",
      telegram: "https://t.me/moontoken",
      website: "https://moontoken.com"
    },
    isVerified: true,
    isTrending: false,
    isFeatured: false,
    isFavorite: false,
    launchDate: "2024-01-01",
    endDate: "2024-01-31",
    vestingPeriod: "12 months",
    minInvestment: "$50",
    maxInvestment: "$50,000",
    totalSupply: "100,000,000",
    tokensForSale: "30,000,000",
    teamAllocation: "10%",
    liquidityAllocation: "40%",
    marketingAllocation: "20%",
    communityAllocation: "30%",
    kycRequired: true,
    auditStatus: "Completed",
    riskLevel: "Low",
    tags: ["Utility", "DeFi", "Governance", "Staking"],
    whitepaper: "https://moontoken.com/whitepaper.pdf",
    roadmap: [
      { phase: "Phase 1", description: "Token Launch", status: "Completed" },
      { phase: "Phase 2", description: "DEX Listing", status: "Completed" },
      { phase: "Phase 3", description: "Staking Platform", status: "In Progress" },
      { phase: "Phase 4", description: "Governance Launch", status: "Planned" }
    ]
  },
  {
    id: "4",
    name: "DiamondHands",
    symbol: "DIAMOND",
    description: "For the diamond hands who never sell. Community token with diamond utility",
    logo: "💎",
    category: "Meme",
    status: "Live",
    raised: "$1,234,567",
    target: "$2,000,000",
    participants: 892,
    price: "$0.002",
    marketCap: "$1.2M",
    liquidity: "$600,000",
    volume24h: "$123,456",
    change24h: "+12.34%",
    socials: {
      twitter: "https://twitter.com/diamondhands",
      telegram: "https://t.me/diamondhands",
      website: "https://diamondhands.com"
    },
    isVerified: true,
    isTrending: true,
    isFeatured: false,
    isFavorite: true,
    launchDate: "2024-01-20",
    endDate: "2024-02-20",
    vestingPeriod: "9 months",
    minInvestment: "$25",
    maxInvestment: "$25,000",
    totalSupply: "1,000,000,000",
    tokensForSale: "500,000,000",
    teamAllocation: "5%",
    liquidityAllocation: "35%",
    marketingAllocation: "10%",
    communityAllocation: "50%",
    kycRequired: false,
    auditStatus: "In Progress",
    riskLevel: "Medium",
    tags: ["Meme", "Community", "Diamond Hands", "HODL"],
    whitepaper: "https://diamondhands.com/whitepaper.pdf",
    roadmap: [
      { phase: "Phase 1", description: "Community Building", status: "Completed" },
      { phase: "Phase 2", description: "Token Launch", status: "In Progress" },
      { phase: "Phase 3", description: "DEX Listings", status: "Planned" },
      { phase: "Phase 4", description: "Utility Development", status: "Planned" }
    ]
  }
]

const categories = ["All", "Meme", "Utility", "DeFi", "Gaming", "NFT"]
const statuses = ["All", "Live", "Upcoming", "Ended"]
const sortOptions = ["Trending", "Newest", "Ending Soon", "Most Raised", "Most Participants"]

export default function LaunchpadPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [sortBy, setSortBy] = useState("Trending")
  const [isCreateTokenOpen, setIsCreateTokenOpen] = useState(false)
  const [isProjectDetailsOpen, setIsProjectDetailsOpen] = useState(false)
  const [isInvestOpen, setIsInvestOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<typeof mockProjects[0] | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  const filteredProjects = useMemo(() => {
    return mockProjects.filter(project => {
      const matchesSearch = searchTerm === "" || 
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === "All" || project.category === selectedCategory
      const matchesStatus = selectedStatus === "All" || project.status === selectedStatus
      
      return matchesSearch && matchesCategory && matchesStatus
    }).sort((a, b) => {
      switch (sortBy) {
        case "Trending":
          return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0)
        case "Newest":
          return new Date(b.launchDate).getTime() - new Date(a.launchDate).getTime()
        case "Ending Soon":
          return new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
        case "Most Raised":
          return parseFloat(b.raised.replace(/[$,]/g, '')) - parseFloat(a.raised.replace(/[$,]/g, ''))
        case "Most Participants":
          return b.participants - a.participants
        default:
          return 0
      }
    })
  }, [searchTerm, selectedCategory, selectedStatus, sortBy])

  const featuredProjects = mockProjects.filter(p => p.isFeatured)
  const liveProjects = mockProjects.filter(p => p.status === "Live")
  const upcomingProjects = mockProjects.filter(p => p.status === "Upcoming")

  const handleProjectClick = (project: typeof mockProjects[0]) => {
    setSelectedProject(project)
    setIsProjectDetailsOpen(true)
  }

  const handleInvestClick = (project: typeof mockProjects[0]) => {
    setSelectedProject(project)
    setIsInvestOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live": return "bg-green-500"
      case "Upcoming": return "bg-blue-500"
      case "Ended": return "bg-gray-500"
      default: return "bg-gray-500"
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50 dark:from-slate-900 dark:via-orange-900 dark:to-red-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Rocket className="h-4 w-4 text-orange-400" />
              <span className="text-sm font-medium">Token Launchpad</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
                Launchpad
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover and invest in the next generation of meme coins and innovative projects
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                onClick={() => setIsCreateTokenOpen(true)}
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Token
              </Button>
              <Button variant="outline" size="lg">
                <Info className="h-5 w-5 mr-2" />
                How It Works
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Raised</p>
                    <p className="text-2xl font-bold">$6.7M</p>
                    <p className="text-xs text-green-500 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +15.2%
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
                    <p className="text-2xl font-bold">24</p>
                    <p className="text-xs text-blue-500 flex items-center">
                      <Rocket className="h-3 w-3 mr-1" />
                      +3 new
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Participants</p>
                    <p className="text-2xl font-bold">4,295</p>
                    <p className="text-xs text-green-500 flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      +8.7%
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                    <p className="text-2xl font-bold">87%</p>
                    <p className="text-xs text-green-500 flex items-center">
                      <Award className="h-3 w-3 mr-1" />
                      +2.1%
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Featured Projects */}
          {featuredProjects.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center">
                  <Star className="h-6 w-6 mr-2 text-yellow-500" />
                  Featured Projects
                </h2>
                <Button variant="outline" size="sm">
                  View All
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProjects.map((project) => (
                  <Card key={project.id} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 cursor-pointer group" onClick={() => handleProjectClick(project)}>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-3xl">{project.logo}</div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-bold text-lg">{project.name}</h3>
                              {project.isVerified && <Shield className="h-4 w-4 text-blue-500" />}
                            </div>
                            <p className="text-sm text-muted-foreground">${project.symbol}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={cn("text-white", getStatusColor(project.status))}>
                            {project.status}
                          </Badge>
                          {project.isTrending && <Flame className="h-4 w-4 text-orange-500" />}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm text-muted-foreground">
                            {project.raised} / {project.target}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-orange-500 to-red-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(parseFloat(project.raised.replace(/[$,]/g, '')) / parseFloat(project.target.replace(/[$,]/g, ''))) * 100}%` }}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Price</p>
                            <p className="font-medium">{project.price}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Participants</p>
                            <p className="font-medium">{project.participants.toLocaleString()}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex space-x-1">
                            {project.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <Button 
                            size="sm" 
                            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleInvestClick(project)
                            }}
                          >
                            Invest
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
              <TabsTrigger value="all">All Projects</TabsTrigger>
              <TabsTrigger value="live">Live</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="ended">Ended</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="space-y-6">
                {/* Filters and Search */}
                <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-4">
                      {/* Search */}
                      <div className="flex-1">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Search projects by name, symbol, or description..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      </div>

                      {/* Category Filter */}
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
                      {/* Status Filter */}
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

                      {/* Sort Options */}
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Sort by:</span>
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="bg-transparent border border-input rounded-md px-3 py-1 text-sm"
                        >
                          {sortOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
                    <Card key={project.id} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 cursor-pointer group" onClick={() => handleProjectClick(project)}>
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="text-3xl">{project.logo}</div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h3 className="font-bold text-lg">{project.name}</h3>
                                {project.isVerified && <Shield className="h-4 w-4 text-blue-500" />}
                              </div>
                              <p className="text-sm text-muted-foreground">${project.symbol}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={cn("text-white", getStatusColor(project.status))}>
                              {project.status}
                            </Badge>
                            {project.isTrending && <Flame className="h-4 w-4 text-orange-500" />}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm text-muted-foreground">
                              {project.raised} / {project.target}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-orange-500 to-red-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${(parseFloat(project.raised.replace(/[$,]/g, '')) / parseFloat(project.target.replace(/[$,]/g, ''))) * 100}%` }}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Price</p>
                              <p className="font-medium">{project.price}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Participants</p>
                              <p className="font-medium">{project.participants.toLocaleString()}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex space-x-1">
                              {project.tags.slice(0, 2).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <Button 
                              size="sm" 
                              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleInvestClick(project)
                              }}
                            >
                              Invest
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="live" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveProjects.map((project) => (
                  <Card key={project.id} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 cursor-pointer group" onClick={() => handleProjectClick(project)}>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-3xl">{project.logo}</div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-bold text-lg">{project.name}</h3>
                              {project.isVerified && <Shield className="h-4 w-4 text-blue-500" />}
                            </div>
                            <p className="text-sm text-muted-foreground">${project.symbol}</p>
                          </div>
                        </div>
                        <Badge className="bg-green-500 text-white">Live</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm text-muted-foreground">
                            {project.raised} / {project.target}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-orange-500 to-red-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(parseFloat(project.raised.replace(/[$,]/g, '')) / parseFloat(project.target.replace(/[$,]/g, ''))) * 100}%` }}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Price</p>
                            <p className="font-medium">{project.price}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Participants</p>
                            <p className="font-medium">{project.participants.toLocaleString()}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex space-x-1">
                            {project.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <Button 
                            size="sm" 
                            className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleInvestClick(project)
                            }}
                          >
                            Invest
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="upcoming" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingProjects.map((project) => (
                  <Card key={project.id} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 cursor-pointer group" onClick={() => handleProjectClick(project)}>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-3xl">{project.logo}</div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-bold text-lg">{project.name}</h3>
                              {project.isVerified && <Shield className="h-4 w-4 text-blue-500" />}
                            </div>
                            <p className="text-sm text-muted-foreground">${project.symbol}</p>
                          </div>
                        </div>
                        <Badge className="bg-blue-500 text-white">Upcoming</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Launch Date</span>
                          <span className="text-sm text-muted-foreground">{project.launchDate}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Target</p>
                            <p className="font-medium">{project.target}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Price</p>
                            <p className="font-medium">{project.price}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex space-x-1">
                            {project.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleProjectClick(project)
                            }}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ended" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockProjects.filter(p => p.status === "Ended").map((project) => (
                  <Card key={project.id} className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 cursor-pointer group" onClick={() => handleProjectClick(project)}>
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-3xl">{project.logo}</div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-bold text-lg">{project.name}</h3>
                              {project.isVerified && <Shield className="h-4 w-4 text-blue-500" />}
                            </div>
                            <p className="text-sm text-muted-foreground">${project.symbol}</p>
                          </div>
                        </div>
                        <Badge className="bg-gray-500 text-white">Ended</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Final Raised</span>
                          <span className="text-sm text-muted-foreground">{project.raised}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Current Price</p>
                            <p className="font-medium">{project.price}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Participants</p>
                            <p className="font-medium">{project.participants.toLocaleString()}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex space-x-1">
                            {project.tags.slice(0, 2).map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleProjectClick(project)
                            }}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Modals */}
      <CreateTokenModal
        isOpen={isCreateTokenOpen}
        onClose={() => setIsCreateTokenOpen(false)}
      />
      <ProjectDetailsModal
        isOpen={isProjectDetailsOpen}
        onClose={() => setIsProjectDetailsOpen(false)}
        project={selectedProject}
      />
      <InvestModal
        isOpen={isInvestOpen}
        onClose={() => setIsInvestOpen(false)}
        project={selectedProject}
      />
    </div>
  )
}
