"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  Share2,
  Copy,
  ExternalLink,
  Shield,
  Users,
  TrendingUp,
  Clock,
  DollarSign,
  Eye,
  Star,
  Crown,
  Zap,
  Palette,
  BarChart3,
  Calendar,
  MapPin,
  MessageCircle,
  Twitter,
  Globe,
  CheckCircle,
  AlertTriangle,
  Info,
  ArrowUpRight,
  History,
  Activity,
  Award,
  Flame
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NFT {
  id: number
  name: string
  collection: string
  image: string
  price: number
  currency: string
  owner: string
  creator: string
  description: string
  properties: Array<{ trait: string; value: string; rarity: string }>
  rarity: string
  likes: number
  views: number
  status: string
  category: string
  verified: boolean
  floorPrice: number
  volume: number
  supply: number
  minted: number
}

interface NFTDetailsModalProps {
  nft: NFT | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NFTDetailsModal({ nft, open, onOpenChange }: NFTDetailsModalProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  if (!nft) return null

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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const mockHistory = [
    {
      event: "Listed",
      price: "2.5 SOL",
      from: "0x1234...5678",
      to: "Marketplace",
      date: "2 hours ago",
      txHash: "0xabcd...efgh"
    },
    {
      event: "Minted",
      price: "0.1 SOL",
      from: "Creator",
      to: "0x1234...5678",
      date: "1 day ago",
      txHash: "0xijkl...mnop"
    }
  ]

  const mockOffers = [
    {
      bidder: "0x9876...5432",
      amount: "2.2 SOL",
      date: "3 hours ago",
      verified: true
    },
    {
      bidder: "0xabcd...efgh",
      amount: "2.0 SOL",
      date: "5 hours ago",
      verified: false
    }
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <Palette className="h-6 w-6 mr-2 text-purple-500" />
            {nft.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - NFT Image and Basic Info */}
          <div className="space-y-6">
            {/* NFT Image */}
            <Card className="overflow-hidden">
              <div className="relative">
                <div className="text-8xl text-center p-12 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900">
                  {nft.image}
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="bg-white/80 hover:bg-white"
                  >
                    <Heart className={cn("h-4 w-4", isFavorite ? "fill-red-500 text-red-500" : "")} />
                  </Button>
                  <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
                <Badge className={cn("absolute top-4 left-4 text-white", getRarityColor(nft.rarity))}>
                  {nft.rarity}
                </Badge>
              </div>
            </Card>

            {/* Basic Info */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xl font-bold">{nft.name}</h3>
                    {nft.verified && <Shield className="h-5 w-5 text-blue-500" />}
                  </div>
                  <Badge className={cn("text-white", getStatusColor(nft.status))}>
                    {nft.status}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{nft.collection}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">{nft.description}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Price</p>
                    <p className="text-2xl font-bold">{nft.price} {nft.currency}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Floor Price</p>
                    <p className="text-lg font-semibold">{nft.floorPrice} {nft.currency}</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Buy Now
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Make Offer
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Globe className="h-5 w-5 mr-2" />
                  Links & Social
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Discord
                  </Button>
                  <Button variant="outline" size="sm">
                    <Globe className="h-4 w-4 mr-2" />
                    Website
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Details Tabs */}
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="properties">Properties</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="offers">Offers</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Info className="h-5 w-5 mr-2" />
                      Collection Info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Supply</p>
                        <p className="font-semibold">{nft.supply.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Minted</p>
                        <p className="font-semibold">{nft.minted.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Volume</p>
                        <p className="font-semibold">{nft.volume} {nft.currency}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Category</p>
                        <Badge variant="secondary">{nft.category}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Users className="h-5 w-5 mr-2" />
                      Ownership
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Owner</p>
                      <div className="flex items-center space-x-2">
                        <p className="font-mono text-sm">{nft.owner}</p>
                        <Button size="sm" variant="ghost" onClick={() => copyToClipboard(nft.owner)}>
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Creator</p>
                      <div className="flex items-center space-x-2">
                        <p className="font-mono text-sm">{nft.creator}</p>
                        <Button size="sm" variant="ghost" onClick={() => copyToClipboard(nft.creator)}>
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <BarChart3 className="h-5 w-5 mr-2" />
                      Statistics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="text-sm">{nft.likes.toLocaleString()} likes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Eye className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">{nft.views.toLocaleString()} views</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="properties" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Palette className="h-5 w-5 mr-2" />
                      Properties
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {nft.properties.map((property, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm font-medium">{property.trait}</p>
                            <Badge variant="outline" className="text-xs">
                              {property.rarity}
                            </Badge>
                          </div>
                          <p className="text-lg font-semibold">{property.value}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <History className="h-5 w-5 mr-2" />
                      Transaction History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockHistory.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                              <Activity className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <p className="font-medium">{item.event}</p>
                              <p className="text-sm text-muted-foreground">{item.price}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-mono">{item.from}</p>
                            <p className="text-xs text-muted-foreground">{item.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="offers" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Current Offers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockOffers.map((offer, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                              <DollarSign className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <p className="font-medium">{offer.amount}</p>
                              <p className="text-sm text-muted-foreground">{offer.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {offer.verified && <Shield className="h-4 w-4 text-blue-500" />}
                            <p className="text-sm font-mono">{offer.bidder}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}



















