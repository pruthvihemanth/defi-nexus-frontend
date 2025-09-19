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
  Palette,
  Activity,
  ChevronRight,
  Users,
  Award,
  Flame,
  Info,
  Heart,
  Eye,
  Clock,
  Zap,
  Crown,
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"
import { CreateCollectionModal } from "@/components/nft/create-collection-modal"
import { NFTDetailsModal } from "@/components/nft/nft-details-modal"
import { PurchaseModal } from "@/components/nft/purchase-modal"

// Mock NFT data
const mockNFTs = [
  {
    id: 1,
    name: "Cosmic Dreams #001",
    collection: "Cosmic Dreams",
    image: "🎨",
    price: 2.5,
    currency: "SOL",
    owner: "0x1234...5678",
    creator: "0xabcd...efgh",
    description: "A mesmerizing digital artwork depicting cosmic dreams and infinite possibilities",
    properties: [
      { trait: "Background", value: "Nebula", rarity: "Common" },
      { trait: "Eyes", value: "Galaxy", rarity: "Rare" },
      { trait: "Aura", value: "Cosmic", rarity: "Epic" }
    ],
    rarity: "Epic",
    likes: 1247,
    views: 8934,
    status: "For Sale",
    category: "Art",
    verified: true,
    floorPrice: 1.8,
    volume: 45.2,
    supply: 10000,
    minted: 3421
  },
  {
    id: 2,
    name: "Pixel Warriors #042",
    collection: "Pixel Warriors",
    image: "⚔️",
    price: 1.2,
    currency: "SOL",
    owner: "0x9876...5432",
    creator: "0xwxyz...1234",
    description: "A legendary pixel warrior ready for battle in the metaverse",
    properties: [
      { trait: "Weapon", value: "Legendary Sword", rarity: "Legendary" },
      { trait: "Armor", value: "Dragon Scale", rarity: "Epic" },
      { trait: "Helmet", value: "Crown of Power", rarity: "Mythic" }
    ],
    rarity: "Legendary",
    likes: 2156,
    views: 15678,
    status: "For Sale",
    category: "Gaming",
    verified: true,
    floorPrice: 0.8,
    volume: 78.9,
    supply: 5000,
    minted: 5000
  },
  {
    id: 3,
    name: "Digital Fashion #128",
    collection: "Meta Couture",
    image: "👗",
    price: 3.7,
    currency: "SOL",
    owner: "0x5678...9abc",
    creator: "0xdef0...5678",
    description: "Exclusive digital fashion piece for the metaverse runway",
    properties: [
      { trait: "Style", value: "Futuristic", rarity: "Rare" },
      { trait: "Color", value: "Holographic", rarity: "Epic" },
      { trait: "Material", value: "Digital Silk", rarity: "Legendary" }
    ],
    rarity: "Epic",
    likes: 892,
    views: 4567,
    status: "For Sale",
    category: "Fashion",
    verified: true,
    floorPrice: 2.1,
    volume: 23.4,
    supply: 2500,
    minted: 1890
  },
  {
    id: 4,
    name: "Music NFT #007",
    collection: "Sonic Waves",
    image: "🎵",
    price: 5.0,
    currency: "SOL",
    owner: "0xabcd...efgh",
    creator: "0x1234...5678",
    description: "Exclusive music track with unique audio-visual experience",
    properties: [
      { trait: "Genre", value: "Electronic", rarity: "Common" },
      { trait: "BPM", value: "128", rarity: "Common" },
      { trait: "Mood", value: "Ethereal", rarity: "Rare" }
    ],
    rarity: "Rare",
    likes: 634,
    views: 2345,
    status: "For Sale",
    category: "Music",
    verified: false,
    floorPrice: 3.2,
    volume: 12.8,
    supply: 100,
    minted: 100
  },
  {
    id: 5,
    name: "Virtual Land #001",
    collection: "Metaverse Estates",
    image: "🏰",
    price: 15.0,
    currency: "SOL",
    owner: "0xefgh...ijkl",
    creator: "0x5678...9abc",
    description: "Prime virtual real estate in the heart of the metaverse",
    properties: [
      { trait: "Location", value: "Central Plaza", rarity: "Legendary" },
      { trait: "Size", value: "100x100", rarity: "Epic" },
      { trait: "Zone", value: "Commercial", rarity: "Rare" }
    ],
    rarity: "Legendary",
    likes: 3456,
    views: 23456,
    status: "For Sale",
    category: "Virtual Land",
    verified: true,
    floorPrice: 12.5,
    volume: 156.7,
    supply: 1000,
    minted: 1000
  },
  {
    id: 6,
    name: "Sports Moment #2024",
    collection: "Championship Moments",
    image: "🏆",
    price: 8.5,
    currency: "SOL",
    owner: "0xijkl...mnop",
    creator: "0x9abc...def0",
    description: "Historic championship moment captured forever on blockchain",
    properties: [
      { trait: "Sport", value: "Basketball", rarity: "Common" },
      { trait: "Moment", value: "Championship", rarity: "Legendary" },
      { trait: "Year", value: "2024", rarity: "Common" }
    ],
    rarity: "Legendary",
    likes: 1789,
    views: 12345,
    status: "For Sale",
    category: "Sports",
    verified: true,
    floorPrice: 6.8,
    volume: 89.3,
    supply: 500,
    minted: 500
  }
]

const categories = ["All", "Art", "Gaming", "Fashion", "Music", "Virtual Land", "Sports", "Collectibles"]
const statuses = ["All", "For Sale", "Auction", "Sold", "Not For Sale"]
const rarities = ["All", "Common", "Rare", "Epic", "Legendary", "Mythic"]

export default function NFTPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [selectedRarity, setSelectedRarity] = useState("All")
  const [sortBy, setSortBy] = useState("Trending")
  const [activeTab, setActiveTab] = useState("all")
  const [showCreateCollection, setShowCreateCollection] = useState(false)
  const [selectedNFT, setSelectedNFT] = useState<typeof mockNFTs[0] | null>(null)
  const [showPurchase, setShowPurchase] = useState(false)

  const filteredNFTs = useMemo(() => {
    return mockNFTs.filter(nft => {
      const matchesSearch = nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           nft.collection.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           nft.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All" || nft.category === selectedCategory
      const matchesStatus = selectedStatus === "All" || nft.status === selectedStatus
      const matchesRarity = selectedRarity === "All" || nft.rarity === selectedRarity

      return matchesSearch && matchesCategory && matchesStatus && matchesRarity
    })
  }, [searchTerm, selectedCategory, selectedStatus, selectedRarity])

  const sortedNFTs = useMemo(() => {
    const sorted = [...filteredNFTs]
    switch (sortBy) {
      case "Price Low":
        return sorted.sort((a, b) => a.price - b.price)
      case "Price High":
        return sorted.sort((a, b) => b.price - a.price)
      case "Newest":
        return sorted.sort((a, b) => b.id - a.id)
      case "Most Liked":
        return sorted.sort((a, b) => b.likes - a.likes)
      case "Most Viewed":
        return sorted.sort((a, b) => b.views - a.views)
      default:
        return sorted
    }
  }, [filteredNFTs, sortBy])

  const handleNFTClick = (nft: typeof mockNFTs[0]) => {
    setSelectedNFT(nft)
  }

  const handlePurchaseClick = (nft: typeof mockNFTs[0]) => {
    setSelectedNFT(nft)
    setShowPurchase(true)
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common": return "bg-gray-500"
      case "Rare": return "bg-blue-500"
      case "Epic": return "bg-purple-500"
      case "Legendary": return "bg-orange-500"
      case "Mythic": return "bg-red-500"
      default: return "bg-gray-500"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "For Sale": return "bg-green-500"
      case "Auction": return "bg-yellow-500"
      case "Sold": return "bg-gray-500"
      case "Not For Sale": return "bg-red-500"
      default: return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-pink-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Palette className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium">NFT Marketplace</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                NFT Marketplace
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover, collect, and trade unique digital assets in the most vibrant NFT marketplace
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => setShowCreateCollection(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Collection
              </Button>
              <Button variant="outline">
                <Info className="h-5 w-5 mr-2" />
                How It Works
              </Button>
            </div>
          </div>

          {/* Stats Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Volume</p>
                    <p className="text-2xl font-bold">$2.4M</p>
                    <p className="text-xs text-green-500 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +24.5%
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active NFTs</p>
                    <p className="text-2xl font-bold">12,847</p>
                    <p className="text-xs text-blue-500 flex items-center">
                      <Palette className="h-3 w-3 mr-1" />
                      +156 new
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Collectors</p>
                    <p className="text-2xl font-bold">8,923</p>
                    <p className="text-xs text-green-500 flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      +12.3%
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
                    <p className="text-sm font-medium text-muted-foreground">Collections</p>
                    <p className="text-2xl font-bold">342</p>
                    <p className="text-xs text-green-500 flex items-center">
                      <Award className="h-3 w-3 mr-1" />
                      +8 new
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center">
                    <Crown className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Featured Collections */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <Star className="h-6 w-6 mr-2 text-yellow-500" />
                Featured Collections
              </h2>
              <Button variant="outline">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockNFTs.slice(0, 3).map((nft) => (
                <Card key={nft.id} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-4xl">{nft.image}</div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-bold text-lg">{nft.name}</h3>
                            {nft.verified && <Shield className="h-4 w-4 text-blue-500" />}
                          </div>
                          <p className="text-sm text-muted-foreground">{nft.collection}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={cn("text-white", getRarityColor(nft.rarity))}>
                          {nft.rarity}
                        </Badge>
                        <Flame className="h-4 w-4 text-orange-500" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{nft.description}</p>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Floor Price</span>
                        <span className="text-sm font-bold">{nft.floorPrice} {nft.currency}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Volume</span>
                        <span className="text-sm text-muted-foreground">{nft.volume} {nft.currency}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Supply</p>
                          <p className="font-medium">{nft.supply.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Minted</p>
                          <p className="font-medium">{nft.minted.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex space-x-1">
                          <Badge variant="secondary" className="text-xs">{nft.category}</Badge>
                        </div>
                        <Button 
                          onClick={() => handleNFTClick(nft)}
                          className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
              <TabsTrigger value="all">All NFTs</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="ending">Ending Soon</TabsTrigger>
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
                            placeholder="Search NFTs by name, collection, or description..."
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
                        <span className="text-sm font-medium">Rarity:</span>
                        <div className="flex gap-1">
                          {rarities.map((rarity) => (
                            <Button
                              key={rarity}
                              variant={selectedRarity === rarity ? "default" : "outline"}
                              size="sm"
                              onClick={() => setSelectedRarity(rarity)}
                              className="text-xs h-8"
                            >
                              {rarity}
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
                          <option value="Trending">Trending</option>
                          <option value="Newest">Newest</option>
                          <option value="Price Low">Price Low</option>
                          <option value="Price High">Price High</option>
                          <option value="Most Liked">Most Liked</option>
                          <option value="Most Viewed">Most Viewed</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* NFT Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {sortedNFTs.map((nft) => (
                    <Card key={nft.id} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group">
                      <CardHeader className="pb-4">
                        <div className="relative">
                          <div className="text-6xl text-center mb-4 group-hover:scale-105 transition-transform duration-300">
                            {nft.image}
                          </div>
                          <div className="absolute top-2 right-2 flex space-x-1">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Heart className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                          <Badge className={cn("absolute top-2 left-2 text-white", getRarityColor(nft.rarity))}>
                            {nft.rarity}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-bold text-lg line-clamp-1">{nft.name}</h3>
                            {nft.verified && <Shield className="h-4 w-4 text-blue-500" />}
                          </div>
                          <Badge className={cn("text-white", getStatusColor(nft.status))}>
                            {nft.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{nft.collection}</p>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{nft.description}</p>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Price</span>
                            <span className="text-lg font-bold">{nft.price} {nft.currency}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Likes</p>
                              <p className="font-medium">{nft.likes.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Views</p>
                              <p className="font-medium">{nft.views.toLocaleString()}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between pt-2">
                            <Badge variant="secondary" className="text-xs">{nft.category}</Badge>
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleNFTClick(nft)}
                              >
                                View
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => handlePurchaseClick(nft)}
                                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                              >
                                Buy
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Modals */}
      <CreateCollectionModal 
        open={showCreateCollection} 
        onOpenChange={setShowCreateCollection} 
      />
      <NFTDetailsModal 
        nft={selectedNFT} 
        open={!!selectedNFT} 
        onOpenChange={() => setSelectedNFT(null)} 
      />
      <PurchaseModal 
        nft={selectedNFT} 
        open={showPurchase} 
        onOpenChange={setShowPurchase} 
      />
    </div>
  )
}

