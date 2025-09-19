"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DollarSign,
  TrendingUp,
  Clock,
  Shield,
  Wallet,
  CreditCard,
  Coins,
  Percent,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Info,
  Zap,
  Crown,
  Star,
  Eye,
  EyeOff,
  Copy,
  ExternalLink,
  BarChart3,
  Users,
  Award,
  Flame,
  Heart
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

interface PurchaseModalProps {
  nft: NFT | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PurchaseModal({ nft, open, onOpenChange }: PurchaseModalProps) {
  const [activeTab, setActiveTab] = useState("buy")
  const [offerAmount, setOfferAmount] = useState("")
  const [offerDuration, setOfferDuration] = useState("7")
  const [paymentMethod, setPaymentMethod] = useState("wallet")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)

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

  const handleBuyNow = async () => {
    setIsProcessing(true)
    try {
      // Simulate purchase process
      await new Promise(resolve => setTimeout(resolve, 3000))
      console.log("Purchase completed:", nft)
      onOpenChange(false)
    } catch (error) {
      console.error("Purchase failed:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleMakeOffer = async () => {
    setIsProcessing(true)
    try {
      // Simulate offer process
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log("Offer made:", { nft, amount: offerAmount, duration: offerDuration })
      onOpenChange(false)
    } catch (error) {
      console.error("Offer failed:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const mockFees = {
    itemPrice: nft.price,
    platformFee: nft.price * 0.025,
    creatorFee: nft.price * 0.025,
    total: nft.price * 1.05
  }

  const mockOffers = [
    { amount: "2.2 SOL", bidder: "0x9876...5432", date: "3 hours ago", verified: true },
    { amount: "2.0 SOL", bidder: "0xabcd...efgh", date: "5 hours ago", verified: false },
    { amount: "1.8 SOL", bidder: "0x5678...9abc", date: "1 day ago", verified: true }
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <DollarSign className="h-6 w-6 mr-2 text-green-500" />
            Purchase {nft.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - NFT Info */}
          <div className="space-y-6">
            <Card>
              <div className="relative">
                <div className="text-6xl text-center p-8 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900">
                  {nft.image}
                </div>
                <Badge className={cn("absolute top-4 left-4 text-white", getRarityColor(nft.rarity))}>
                  {nft.rarity}
                </Badge>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{nft.name}</h3>
                    <p className="text-muted-foreground">{nft.collection}</p>
                  </div>
                  <Badge variant="secondary">{nft.category}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{nft.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Price</p>
                    <p className="text-2xl font-bold">{nft.price} {nft.currency}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Floor Price</p>
                    <p className="text-lg font-semibold">{nft.floorPrice} {nft.currency}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Heart className="h-4 w-4" />
                  <span>{nft.likes.toLocaleString()} likes</span>
                  <Eye className="h-4 w-4 ml-4" />
                  <span>{nft.views.toLocaleString()} views</span>
                </div>
              </CardContent>
            </Card>

            {/* Collection Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Collection Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
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
                    <p className="text-sm text-muted-foreground">Floor Price</p>
                    <p className="font-semibold">{nft.floorPrice} {nft.currency}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Purchase Options */}
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="buy">Buy Now</TabsTrigger>
                <TabsTrigger value="offer">Make Offer</TabsTrigger>
              </TabsList>

              <TabsContent value="buy" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                      Instant Purchase
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Item Price</span>
                        <span className="font-medium">{mockFees.itemPrice} {nft.currency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Platform Fee (2.5%)</span>
                        <span className="font-medium">{mockFees.platformFee.toFixed(3)} {nft.currency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Creator Fee (2.5%)</span>
                        <span className="font-medium">{mockFees.creatorFee.toFixed(3)} {nft.currency}</span>
                      </div>
                      <div className="border-t pt-3">
                        <div className="flex justify-between">
                          <span className="font-semibold">Total</span>
                          <span className="text-xl font-bold">{mockFees.total.toFixed(3)} {nft.currency}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-medium">Payment Method</label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="wallet"
                            name="payment"
                            value="wallet"
                            checked={paymentMethod === "wallet"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          />
                          <label htmlFor="wallet" className="flex items-center space-x-2">
                            <Wallet className="h-4 w-4" />
                            <span>Wallet Balance</span>
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="card"
                            name="payment"
                            value="card"
                            checked={paymentMethod === "card"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                          />
                          <label htmlFor="card" className="flex items-center space-x-2">
                            <CreditCard className="h-4 w-4" />
                            <span>Credit Card</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleBuyNow}
                      disabled={isProcessing}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <DollarSign className="h-4 w-4 mr-2" />
                          Buy Now for {mockFees.total.toFixed(3)} {nft.currency}
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Shield className="h-5 w-5 mr-2 text-blue-500" />
                      Security & Guarantees
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Verified Collection</p>
                          <p className="text-xs text-muted-foreground">This NFT is from a verified collection</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Instant Transfer</p>
                          <p className="text-xs text-muted-foreground">NFT will be transferred immediately after payment</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">Secure Payment</p>
                          <p className="text-xs text-muted-foreground">All transactions are secured by blockchain</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="offer" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
                      Make an Offer
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Offer Amount ({nft.currency})</label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Enter your offer"
                        value={offerAmount}
                        onChange={(e) => setOfferAmount(e.target.value)}
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Current price: {nft.price} {nft.currency}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Offer Duration (days)</label>
                      <select
                        value={offerDuration}
                        onChange={(e) => setOfferDuration(e.target.value)}
                        className="w-full p-2 border border-input rounded-md bg-background"
                      >
                        <option value="1">1 day</option>
                        <option value="3">3 days</option>
                        <option value="7">7 days</option>
                        <option value="14">14 days</option>
                        <option value="30">30 days</option>
                      </select>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Info className="h-4 w-4 text-blue-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-900 dark:text-blue-100">How Offers Work</p>
                          <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                            Your offer will be visible to the owner. If accepted, the NFT will be automatically transferred to you.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleMakeOffer}
                      disabled={isProcessing || !offerAmount}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Submitting Offer...
                        </>
                      ) : (
                        <>
                          <TrendingUp className="h-4 w-4 mr-2" />
                          Make Offer
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                      <Users className="h-5 w-5 mr-2 text-purple-500" />
                      Recent Offers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockOffers.map((offer, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
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

            {/* Risk Warning */}
            <Card className="border-orange-200 bg-orange-50 dark:bg-orange-900/20">
              <CardContent className="p-4">
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-orange-900 dark:text-orange-100">Important Notice</h4>
                    <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                      NFT purchases are final and non-refundable. Please ensure you understand the value and authenticity of the NFT before purchasing.
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
