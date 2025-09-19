"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Upload,
  Image as ImageIcon,
  Palette,
  DollarSign,
  Users,
  Shield,
  Globe,
  Twitter,
  MessageCircle,
  FileText,
  Target,
  Clock,
  Percent,
  Coins,
  TrendingUp,
  BarChart3,
  Wallet,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  Crown,
  Zap
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CreateCollectionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface FormData {
  // Basic Info
  name: string
  symbol: string
  description: string
  website: string
  twitter: string
  discord: string
  telegram: string
  
  // Collection Details
  category: string
  totalSupply: string
  mintPrice: string
  maxMintPerWallet: string
  mintDate: string
  revealDate: string
  
  // Royalties & Fees
  royaltyPercentage: string
  creatorFee: string
  platformFee: string
  
  // Advanced Settings
  isRevealed: boolean
  isWhitelistOnly: boolean
  isPublicMint: boolean
  isAuction: boolean
  auctionDuration: string
  reservePrice: string
  
  // Metadata
  image: File | null
  bannerImage: File | null
  traits: Array<{ trait: string; value: string; rarity: string }>
}

const initialFormData: FormData = {
  name: "",
  symbol: "",
  description: "",
  website: "",
  twitter: "",
  discord: "",
  telegram: "",
  category: "Art",
  totalSupply: "",
  mintPrice: "",
  maxMintPerWallet: "",
  mintDate: "",
  revealDate: "",
  royaltyPercentage: "5",
  creatorFee: "2.5",
  platformFee: "2.5",
  isRevealed: false,
  isWhitelistOnly: false,
  isPublicMint: true,
  isAuction: false,
  auctionDuration: "24",
  reservePrice: "",
  image: null,
  bannerImage: null,
  traits: []
}

const categories = ["Art", "Gaming", "Fashion", "Music", "Virtual Land", "Sports", "Collectibles", "Photography", "Memes"]
const rarities = ["Common", "Rare", "Epic", "Legendary", "Mythic"]

export function CreateCollectionModal({ open, onOpenChange }: CreateCollectionModalProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const handleTraitChange = (index: number, field: string, value: string) => {
    const newTraits = [...formData.traits]
    newTraits[index] = { ...newTraits[index], [field]: value }
    setFormData(prev => ({ ...prev, traits: newTraits }))
  }

  const addTrait = () => {
    setFormData(prev => ({
      ...prev,
      traits: [...prev.traits, { trait: "", value: "", rarity: "Common" }]
    }))
  }

  const removeTrait = (index: number) => {
    setFormData(prev => ({
      ...prev,
      traits: prev.traits.filter((_, i) => i !== index)
    }))
  }

  const handleFileUpload = (field: 'image' | 'bannerImage', file: File) => {
    setFormData(prev => ({ ...prev, [field]: file }))
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.name.trim()) newErrors.name = "Collection name is required"
        if (!formData.symbol.trim()) newErrors.symbol = "Symbol is required"
        if (!formData.description.trim()) newErrors.description = "Description is required"
        if (!formData.image) newErrors.image = "Collection image is required"
        break
      case 2:
        if (!formData.totalSupply) newErrors.totalSupply = "Total supply is required"
        if (!formData.mintPrice) newErrors.mintPrice = "Mint price is required"
        if (!formData.mintDate) newErrors.mintDate = "Mint date is required"
        break
      case 3:
        if (!formData.royaltyPercentage) newErrors.royaltyPercentage = "Royalty percentage is required"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4))
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return

    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log("Creating collection:", formData)
      onOpenChange(false)
      setFormData(initialFormData)
      setCurrentStep(1)
    } catch (error) {
      console.error("Error creating collection:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return "Basic Information"
      case 2: return "Collection Settings"
      case 3: return "Royalties & Fees"
      case 4: return "Advanced Options"
      default: return ""
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <Sparkles className="h-6 w-6 mr-2 text-purple-500" />
            Create NFT Collection
          </DialogTitle>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                currentStep >= step
                  ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white"
                  : "bg-gray-200 text-gray-500"
              )}>
                {currentStep > step ? <CheckCircle className="h-4 w-4" /> : step}
              </div>
              {step < 4 && (
                <div className={cn(
                  "w-16 h-1 mx-2",
                  currentStep > step ? "bg-gradient-to-r from-purple-500 to-pink-600" : "bg-gray-200"
                )} />
              )}
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">{getStepTitle(currentStep)}</h3>
          <p className="text-sm text-muted-foreground">
            Step {currentStep} of 4 - {getStepTitle(currentStep)}
          </p>
        </div>

        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Collection Name *</label>
                  <Input
                    placeholder="Enter collection name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Symbol *</label>
                  <Input
                    placeholder="e.g., COSMIC"
                    value={formData.symbol}
                    onChange={(e) => handleInputChange("symbol", e.target.value)}
                    className={errors.symbol ? "border-red-500" : ""}
                  />
                  {errors.symbol && <p className="text-red-500 text-xs mt-1">{errors.symbol}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    className="w-full p-2 border border-input rounded-md bg-background"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Collection Image *</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <ImageIcon className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload collection image</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload("image", e.target.files[0])}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload">
                      <Button type="button" variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                    </label>
                    {formData.image && (
                      <p className="text-xs text-green-600 mt-2">{formData.image.name}</p>
                    )}
                  </div>
                  {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description *</label>
              <textarea
                placeholder="Describe your collection..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={4}
                className="w-full p-3 border border-input rounded-md bg-background resize-none"
              />
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
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
                  placeholder="@yourusername"
                  value={formData.twitter}
                  onChange={(e) => handleInputChange("twitter", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Discord</label>
                <Input
                  placeholder="Discord invite link"
                  value={formData.discord}
                  onChange={(e) => handleInputChange("discord", e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Collection Settings */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Total Supply *</label>
                  <Input
                    type="number"
                    placeholder="10000"
                    value={formData.totalSupply}
                    onChange={(e) => handleInputChange("totalSupply", e.target.value)}
                    className={errors.totalSupply ? "border-red-500" : ""}
                  />
                  {errors.totalSupply && <p className="text-red-500 text-xs mt-1">{errors.totalSupply}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Mint Price (SOL) *</label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.1"
                    value={formData.mintPrice}
                    onChange={(e) => handleInputChange("mintPrice", e.target.value)}
                    className={errors.mintPrice ? "border-red-500" : ""}
                  />
                  {errors.mintPrice && <p className="text-red-500 text-xs mt-1">{errors.mintPrice}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Max Mint Per Wallet</label>
                  <Input
                    type="number"
                    placeholder="5"
                    value={formData.maxMintPerWallet}
                    onChange={(e) => handleInputChange("maxMintPerWallet", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Mint Date *</label>
                  <Input
                    type="datetime-local"
                    value={formData.mintDate}
                    onChange={(e) => handleInputChange("mintDate", e.target.value)}
                    className={errors.mintDate ? "border-red-500" : ""}
                  />
                  {errors.mintDate && <p className="text-red-500 text-xs mt-1">{errors.mintDate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Reveal Date</label>
                  <Input
                    type="datetime-local"
                    value={formData.revealDate}
                    onChange={(e) => handleInputChange("revealDate", e.target.value)}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isRevealed"
                      checked={formData.isRevealed}
                      onChange={(e) => handleInputChange("isRevealed", e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="isRevealed" className="text-sm">Revealed on mint</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isWhitelistOnly"
                      checked={formData.isWhitelistOnly}
                      onChange={(e) => handleInputChange("isWhitelistOnly", e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="isWhitelistOnly" className="text-sm">Whitelist only</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Royalties & Fees */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Percent className="h-5 w-5 mr-2 text-blue-500" />
                    Royalties
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <label className="block text-sm font-medium mb-2">Royalty Percentage *</label>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="5.0"
                      value={formData.royaltyPercentage}
                      onChange={(e) => handleInputChange("royaltyPercentage", e.target.value)}
                      className={errors.royaltyPercentage ? "border-red-500" : ""}
                    />
                    {errors.royaltyPercentage && <p className="text-red-500 text-xs mt-1">{errors.royaltyPercentage}</p>}
                    <p className="text-xs text-muted-foreground mt-1">
                      Percentage you earn from secondary sales
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Coins className="h-5 w-5 mr-2 text-green-500" />
                    Creator Fee
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <label className="block text-sm font-medium mb-2">Creator Fee (%)</label>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="2.5"
                      value={formData.creatorFee}
                      onChange={(e) => handleInputChange("creatorFee", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Your fee from primary sales
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <BarChart3 className="h-5 w-5 mr-2 text-purple-500" />
                    Platform Fee
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <label className="block text-sm font-medium mb-2">Platform Fee (%)</label>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="2.5"
                      value={formData.platformFee}
                      onChange={(e) => handleInputChange("platformFee", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      DeFi Nexus platform fee
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 dark:text-blue-100">Fee Structure</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    Total fees will be calculated as: Creator Fee + Platform Fee. 
                    Royalties are separate and apply to secondary sales only.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Advanced Options */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                    Mint Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isPublicMint"
                      checked={formData.isPublicMint}
                      onChange={(e) => handleInputChange("isPublicMint", e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="isPublicMint" className="text-sm">Public mint enabled</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isAuction"
                      checked={formData.isAuction}
                      onChange={(e) => handleInputChange("isAuction", e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="isAuction" className="text-sm">Enable auction mode</label>
                  </div>
                  {formData.isAuction && (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-2">Auction Duration (hours)</label>
                        <Input
                          type="number"
                          placeholder="24"
                          value={formData.auctionDuration}
                          onChange={(e) => handleInputChange("auctionDuration", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Reserve Price (SOL)</label>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="1.0"
                          value={formData.reservePrice}
                          onChange={(e) => handleInputChange("reservePrice", e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Palette className="h-5 w-5 mr-2 text-pink-500" />
                    Traits & Properties
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {formData.traits.map((trait, index) => (
                      <div key={index} className="flex space-x-2">
                        <Input
                          placeholder="Trait name"
                          value={trait.trait}
                          onChange={(e) => handleTraitChange(index, "trait", e.target.value)}
                          className="flex-1"
                        />
                        <Input
                          placeholder="Value"
                          value={trait.value}
                          onChange={(e) => handleTraitChange(index, "value", e.target.value)}
                          className="flex-1"
                        />
                        <select
                          value={trait.rarity}
                          onChange={(e) => handleTraitChange(index, "rarity", e.target.value)}
                          className="px-3 py-2 border border-input rounded-md bg-background"
                        >
                          {rarities.map(rarity => (
                            <option key={rarity} value={rarity}>{rarity}</option>
                          ))}
                        </select>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeTrait(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addTrait}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Trait
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            {currentStep < 4 ? (
              <Button onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Crown className="h-4 w-4 mr-2" />
                    Create Collection
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}





