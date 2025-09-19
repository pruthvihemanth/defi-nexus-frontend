"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  X, 
  Upload, 
  Info, 
  AlertTriangle, 
  CheckCircle, 
  DollarSign, 
  Users, 
  Calendar, 
  Lock, 
  Globe, 
  Twitter, 
  MessageCircle,
  FileText,
  Settings,
  Zap,
  Shield,
  Target,
  Clock,
  Percent,
  Coins,
  TrendingUp,
  BarChart3,
  Wallet,
  Eye,
  EyeOff
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CreateTokenModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateTokenModal({ isOpen, onClose }: CreateTokenModalProps) {
  const [activeTab, setActiveTab] = useState("basic")
  const [formData, setFormData] = useState({
    // Basic Information
    name: "",
    symbol: "",
    description: "",
    logo: "",
    website: "",
    twitter: "",
    telegram: "",
    
    // Token Economics
    totalSupply: "",
    tokensForSale: "",
    price: "",
    minInvestment: "",
    maxInvestment: "",
    softCap: "",
    hardCap: "",
    
    // Launch Settings
    startDate: "",
    endDate: "",
    vestingPeriod: "",
    liquidityPercent: "",
    
    // Allocations
    teamAllocation: "",
    marketingAllocation: "",
    communityAllocation: "",
    liquidityAllocation: "",
    
    // Advanced Settings
    kycRequired: false,
    auditRequired: false,
    whitelistRequired: false,
    autoListing: false,
    
    // Categories and Tags
    category: "",
    tags: [] as string[],
    
    // Legal
    whitepaper: "",
    termsAccepted: false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = ["Meme", "Utility", "DeFi", "Gaming", "NFT", "Social", "Infrastructure"]
  const vestingOptions = ["No Vesting", "1 month", "3 months", "6 months", "12 months", "24 months"]
  const tagOptions = ["Community", "Governance", "Staking", "Yield Farming", "Cross-chain", "Privacy", "AI", "Metaverse", "P2E", "DAO"]

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleTagToggle = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Basic validation
    if (!formData.name.trim()) newErrors.name = "Token name is required"
    if (!formData.symbol.trim()) newErrors.symbol = "Token symbol is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.totalSupply) newErrors.totalSupply = "Total supply is required"
    if (!formData.tokensForSale) newErrors.tokensForSale = "Tokens for sale is required"
    if (!formData.price) newErrors.price = "Token price is required"
    if (!formData.softCap) newErrors.softCap = "Soft cap is required"
    if (!formData.hardCap) newErrors.hardCap = "Hard cap is required"
    if (!formData.startDate) newErrors.startDate = "Start date is required"
    if (!formData.endDate) newErrors.endDate = "End date is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept the terms"

    // Advanced validation
    if (parseFloat(formData.tokensForSale) > parseFloat(formData.totalSupply)) {
      newErrors.tokensForSale = "Tokens for sale cannot exceed total supply"
    }
    if (parseFloat(formData.softCap) >= parseFloat(formData.hardCap)) {
      newErrors.softCap = "Soft cap must be less than hard cap"
    }
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      newErrors.endDate = "End date must be after start date"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log("Token creation data:", formData)
      onClose()
    } catch (error) {
      console.error("Error creating token:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const calculateProgress = () => {
    const requiredFields = [
      'name', 'symbol', 'description', 'totalSupply', 'tokensForSale', 
      'price', 'softCap', 'hardCap', 'startDate', 'endDate', 'category'
    ]
    const filledFields = requiredFields.filter(field => formData[field as keyof typeof formData])
    return Math.round((filledFields.length / requiredFields.length) * 100)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Zap className="h-6 w-6 text-orange-500" />
            <span>Create New Token</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Form Completion</span>
              <span>{calculateProgress()}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-orange-500 to-red-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${calculateProgress()}%` }}
              />
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="economics">Economics</TabsTrigger>
              <TabsTrigger value="launch">Launch</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Info className="h-5 w-5" />
                    <span>Basic Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Token Name *</label>
                      <Input
                        placeholder="e.g., DogeCoin 2.0"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className={cn(errors.name && "border-red-500")}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Token Symbol *</label>
                      <Input
                        placeholder="e.g., DOGE2"
                        value={formData.symbol}
                        onChange={(e) => handleInputChange("symbol", e.target.value.toUpperCase())}
                        className={cn(errors.symbol && "border-red-500")}
                      />
                      {errors.symbol && <p className="text-red-500 text-xs mt-1">{errors.symbol}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description *</label>
                    <textarea
                      placeholder="Describe your token, its purpose, and what makes it unique..."
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className={cn(
                        "w-full p-3 border border-input rounded-md resize-none h-24",
                        errors.description && "border-red-500"
                      )}
                    />
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Category *</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          variant={formData.category === category ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleInputChange("category", category)}
                          className="text-xs"
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                    {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Tags</label>
                    <div className="flex flex-wrap gap-2">
                      {tagOptions.map((tag) => (
                        <Badge
                          key={tag}
                          variant={formData.tags.includes(tag) ? "default" : "outline"}
                          className={cn(
                            "cursor-pointer transition-colors",
                            formData.tags.includes(tag) && "bg-orange-500 hover:bg-orange-600"
                          )}
                          onClick={() => handleTagToggle(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Website</label>
                      <Input
                        placeholder="https://yourwebsite.com"
                        value={formData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Twitter</label>
                      <Input
                        placeholder="https://twitter.com/yourhandle"
                        value={formData.twitter}
                        onChange={(e) => handleInputChange("twitter", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Telegram</label>
                      <Input
                        placeholder="https://t.me/yourgroup"
                        value={formData.telegram}
                        onChange={(e) => handleInputChange("telegram", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="economics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5" />
                    <span>Token Economics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Total Supply *</label>
                      <Input
                        type="number"
                        placeholder="1000000000"
                        value={formData.totalSupply}
                        onChange={(e) => handleInputChange("totalSupply", e.target.value)}
                        className={cn(errors.totalSupply && "border-red-500")}
                      />
                      {errors.totalSupply && <p className="text-red-500 text-xs mt-1">{errors.totalSupply}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Tokens for Sale *</label>
                      <Input
                        type="number"
                        placeholder="400000000"
                        value={formData.tokensForSale}
                        onChange={(e) => handleInputChange("tokensForSale", e.target.value)}
                        className={cn(errors.tokensForSale && "border-red-500")}
                      />
                      {errors.tokensForSale && <p className="text-red-500 text-xs mt-1">{errors.tokensForSale}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Token Price (USD) *</label>
                      <Input
                        type="number"
                        step="0.000001"
                        placeholder="0.001"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        className={cn(errors.price && "border-red-500")}
                      />
                      {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Liquidity Percentage</label>
                      <Input
                        type="number"
                        placeholder="30"
                        value={formData.liquidityPercent}
                        onChange={(e) => handleInputChange("liquidityPercent", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Soft Cap (USD) *</label>
                      <Input
                        type="number"
                        placeholder="100000"
                        value={formData.softCap}
                        onChange={(e) => handleInputChange("softCap", e.target.value)}
                        className={cn(errors.softCap && "border-red-500")}
                      />
                      {errors.softCap && <p className="text-red-500 text-xs mt-1">{errors.softCap}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Hard Cap (USD) *</label>
                      <Input
                        type="number"
                        placeholder="5000000"
                        value={formData.hardCap}
                        onChange={(e) => handleInputChange("hardCap", e.target.value)}
                        className={cn(errors.hardCap && "border-red-500")}
                      />
                      {errors.hardCap && <p className="text-red-500 text-xs mt-1">{errors.hardCap}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Min Investment (USD)</label>
                      <Input
                        type="number"
                        placeholder="10"
                        value={formData.minInvestment}
                        onChange={(e) => handleInputChange("minInvestment", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Max Investment (USD)</label>
                      <Input
                        type="number"
                        placeholder="10000"
                        value={formData.maxInvestment}
                        onChange={(e) => handleInputChange("maxInvestment", e.target.value)}
                      />
                    </div>
                  </div>

                  <Card className="bg-blue-50 dark:bg-blue-900/20">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-2">
                        <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-blue-900 dark:text-blue-100">Token Allocation Guidelines</p>
                          <p className="text-blue-700 dark:text-blue-300 mt-1">
                            Recommended allocation: 40% for sale, 20% for team (vested), 30% for liquidity, 10% for marketing.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="launch" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Launch Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Start Date *</label>
                      <Input
                        type="datetime-local"
                        value={formData.startDate}
                        onChange={(e) => handleInputChange("startDate", e.target.value)}
                        className={cn(errors.startDate && "border-red-500")}
                      />
                      {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">End Date *</label>
                      <Input
                        type="datetime-local"
                        value={formData.endDate}
                        onChange={(e) => handleInputChange("endDate", e.target.value)}
                        className={cn(errors.endDate && "border-red-500")}
                      />
                      {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Vesting Period</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {vestingOptions.map((option) => (
                        <Button
                          key={option}
                          variant={formData.vestingPeriod === option ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleInputChange("vestingPeriod", option)}
                          className="text-xs"
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Team Allocation (%)</label>
                      <Input
                        type="number"
                        placeholder="20"
                        value={formData.teamAllocation}
                        onChange={(e) => handleInputChange("teamAllocation", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Marketing Allocation (%)</label>
                      <Input
                        type="number"
                        placeholder="10"
                        value={formData.marketingAllocation}
                        onChange={(e) => handleInputChange("marketingAllocation", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Community Allocation (%)</label>
                      <Input
                        type="number"
                        placeholder="40"
                        value={formData.communityAllocation}
                        onChange={(e) => handleInputChange("communityAllocation", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Liquidity Allocation (%)</label>
                      <Input
                        type="number"
                        placeholder="30"
                        value={formData.liquidityAllocation}
                        onChange={(e) => handleInputChange("liquidityAllocation", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>Advanced Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Shield className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="font-medium">KYC Required</p>
                          <p className="text-sm text-muted-foreground">Require KYC verification for investors</p>
                        </div>
                      </div>
                      <Button
                        variant={formData.kycRequired ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleInputChange("kycRequired", !formData.kycRequired)}
                      >
                        {formData.kycRequired ? "Enabled" : "Disabled"}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <div>
                          <p className="font-medium">Audit Required</p>
                          <p className="text-sm text-muted-foreground">Require smart contract audit before launch</p>
                        </div>
                      </div>
                      <Button
                        variant={formData.auditRequired ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleInputChange("auditRequired", !formData.auditRequired)}
                      >
                        {formData.auditRequired ? "Enabled" : "Disabled"}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Users className="h-5 w-5 text-purple-500" />
                        <div>
                          <p className="font-medium">Whitelist Required</p>
                          <p className="text-sm text-muted-foreground">Only whitelisted addresses can invest</p>
                        </div>
                      </div>
                      <Button
                        variant={formData.whitelistRequired ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleInputChange("whitelistRequired", !formData.whitelistRequired)}
                      >
                        {formData.whitelistRequired ? "Enabled" : "Disabled"}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Zap className="h-5 w-5 text-orange-500" />
                        <div>
                          <p className="font-medium">Auto Listing</p>
                          <p className="text-sm text-muted-foreground">Automatically list on DEX after successful launch</p>
                        </div>
                      </div>
                      <Button
                        variant={formData.autoListing ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleInputChange("autoListing", !formData.autoListing)}
                      >
                        {formData.autoListing ? "Enabled" : "Disabled"}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Whitepaper URL</label>
                    <Input
                      placeholder="https://yourwebsite.com/whitepaper.pdf"
                      value={formData.whitepaper}
                      onChange={(e) => handleInputChange("whitepaper", e.target.value)}
                    />
                  </div>

                  <Card className="bg-yellow-50 dark:bg-yellow-900/20">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-yellow-900 dark:text-yellow-100">Important Notice</p>
                          <p className="text-yellow-700 dark:text-yellow-300 mt-1">
                            Creating a token involves smart contract deployment and gas fees. Make sure all information is accurate before proceeding.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={formData.termsAccepted}
                      onChange={(e) => handleInputChange("termsAccepted", e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <a href="#" className="text-blue-500 hover:underline">Terms of Service</a>{" "}
                      and{" "}
                      <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
                    </label>
                  </div>
                  {errors.termsAccepted && <p className="text-red-500 text-xs">{errors.termsAccepted}</p>}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setActiveTab("basic")}>
                Save Draft
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={isSubmitting || calculateProgress() < 100}
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Create Token
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
