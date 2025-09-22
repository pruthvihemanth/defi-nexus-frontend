"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Target,
  Clock,
  DollarSign,
  Users,
  Shield,
  Globe,
  Twitter,
  MessageCircle,
  Calendar,
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
  Zap,
  Vote,
  Settings,
  Info,
  Plus,
  X,
  Upload,
  Link,
  Hash,
  Tag,
  Flag,
  Lock,
  Unlock,
  ArrowUpRight,
  ExternalLink,
  Copy,
  Share2,
  Bookmark,
  Timer,
  Award,
  Star,
  Flame,
  Activity,
  PieChart,
  LineChart,
  TrendingUp as TrendingUpIcon,
  TrendingDown,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CreateProposalModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface FormData {
  // Basic Info
  title: string
  description: string
  category: string
  priority: string
  tags: string[]
  
  // Voting Settings
  votingDuration: string
  quorum: string
  supportThreshold: string
  minVotingPower: string
  
  // Execution
  executionDelay: string
  requiresExecution: boolean
  executionInstructions: string
  
  // Advanced
  isEmergency: boolean
  requiresSuperMajority: boolean
  allowDelegation: boolean
  votingType: string
  
  // Metadata
  externalLinks: Array<{ type: string; url: string }>
  attachments: File[]
  discussionForum: string
}

const initialFormData: FormData = {
  title: "",
  description: "",
  category: "Treasury",
  priority: "Medium",
  tags: [],
  votingDuration: "7",
  quorum: "2000000",
  supportThreshold: "50",
  minVotingPower: "1000",
  executionDelay: "24",
  requiresExecution: false,
  executionInstructions: "",
  isEmergency: false,
  requiresSuperMajority: false,
  allowDelegation: true,
  votingType: "Standard",
  externalLinks: [],
  attachments: [],
  discussionForum: ""
}

const categories = ["Treasury", "Technical", "Community", "Security", "Product", "Governance"]
const priorities = ["High", "Medium", "Low"]
const votingTypes = ["Standard", "Weighted", "Quadratic", "Snapshot"]
const linkTypes = ["Website", "Documentation", "GitHub", "Twitter", "Discord", "Other"]

export function CreateProposalModal({ open, onOpenChange }: CreateProposalModalProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [currentStep, setCurrentStep] = useState(1)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newTag, setNewTag] = useState("")
  const [newLink, setNewLink] = useState({ type: "Website", url: "" })

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const addLink = () => {
    if (newLink.url.trim()) {
      setFormData(prev => ({
        ...prev,
        externalLinks: [...prev.externalLinks, { ...newLink }]
      }))
      setNewLink({ type: "Website", url: "" })
    }
  }

  const removeLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      externalLinks: prev.externalLinks.filter((_, i) => i !== index)
    }))
  }

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files)
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...newFiles]
      }))
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.title.trim()) newErrors.title = "Proposal title is required"
        if (!formData.description.trim()) newErrors.description = "Proposal description is required"
        if (formData.description.length < 100) newErrors.description = "Description must be at least 100 characters"
        break
      case 2:
        if (!formData.votingDuration) newErrors.votingDuration = "Voting duration is required"
        if (!formData.quorum) newErrors.quorum = "Quorum is required"
        if (!formData.supportThreshold) newErrors.supportThreshold = "Support threshold is required"
        break
      case 3:
        if (formData.requiresExecution && !formData.executionInstructions.trim()) {
          newErrors.executionInstructions = "Execution instructions are required when execution is enabled"
        }
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
      await new Promise(resolve => setTimeout(resolve, 3000))
      console.log("Creating proposal:", formData)
      onOpenChange(false)
      setFormData(initialFormData)
      setCurrentStep(1)
    } catch (error) {
      console.error("Error creating proposal:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return "Proposal Details"
      case 2: return "Voting Configuration"
      case 3: return "Execution Settings"
      case 4: return "Review & Submit"
      default: return ""
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <Vote className="h-6 w-6 mr-2 text-blue-500" />
            Create Governance Proposal
          </DialogTitle>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-6">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                currentStep >= step
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                  : "bg-gray-200 text-gray-500"
              )}>
                {currentStep > step ? <CheckCircle className="h-4 w-4" /> : step}
              </div>
              {step < 4 && (
                <div className={cn(
                  "w-16 h-1 mx-2",
                  currentStep > step ? "bg-gradient-to-r from-blue-500 to-indigo-600" : "bg-gray-200"
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

        {/* Step 1: Proposal Details */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Proposal Title *</label>
                  <Input
                    placeholder="Enter a clear, descriptive title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className={errors.title ? "border-red-500" : ""}
                  />
                  {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
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

                <div>
                  <label className="block text-sm font-medium mb-2">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => handleInputChange("priority", e.target.value)}
                    className="w-full p-2 border border-input rounded-md bg-background"
                  >
                    {priorities.map(priority => (
                      <option key={priority} value={priority}>{priority}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Tags</label>
                  <div className="flex space-x-2 mb-2">
                    <Input
                      placeholder="Add a tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    />
                    <Button type="button" onClick={addTag} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                        <span>{tag}</span>
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => removeTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">External Links</label>
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <select
                        value={newLink.type}
                        onChange={(e) => setNewLink(prev => ({ ...prev, type: e.target.value }))}
                        className="p-2 border border-input rounded-md bg-background"
                      >
                        {linkTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      <Input
                        placeholder="URL"
                        value={newLink.url}
                        onChange={(e) => setNewLink(prev => ({ ...prev, url: e.target.value }))}
                        className="flex-1"
                      />
                      <Button type="button" onClick={addLink} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {formData.externalLinks.map((link, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        <span className="text-sm font-medium">{link.type}:</span>
                        <span className="text-sm text-blue-600 flex-1 truncate">{link.url}</span>
                        <X 
                          className="h-4 w-4 cursor-pointer text-red-500" 
                          onClick={() => removeLink(index)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description *</label>
              <textarea
                placeholder="Provide a detailed description of your proposal. Include background, rationale, implementation details, and expected outcomes..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={8}
                className="w-full p-3 border border-input rounded-md bg-background resize-none"
              />
              <div className="flex justify-between items-center mt-2">
                {errors.description && <p className="text-red-500 text-xs">{errors.description}</p>}
                <p className="text-xs text-muted-foreground ml-auto">
                  {formData.description.length}/5000 characters
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Voting Configuration */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Clock className="h-5 w-5 mr-2 text-blue-500" />
                    Voting Period
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Duration (days) *</label>
                    <Input
                      type="number"
                      placeholder="7"
                      value={formData.votingDuration}
                      onChange={(e) => handleInputChange("votingDuration", e.target.value)}
                      className={errors.votingDuration ? "border-red-500" : ""}
                    />
                    {errors.votingDuration && <p className="text-red-500 text-xs mt-1">{errors.votingDuration}</p>}
                    <p className="text-xs text-muted-foreground mt-1">
                      Recommended: 3-14 days
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Voting Type</label>
                    <select
                      value={formData.votingType}
                      onChange={(e) => handleInputChange("votingType", e.target.value)}
                      className="w-full p-2 border border-input rounded-md bg-background"
                    >
                      {votingTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Target className="h-5 w-5 mr-2 text-green-500" />
                    Voting Thresholds
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Quorum (tokens) *</label>
                    <Input
                      type="number"
                      placeholder="2000000"
                      value={formData.quorum}
                      onChange={(e) => handleInputChange("quorum", e.target.value)}
                      className={errors.quorum ? "border-red-500" : ""}
                    />
                    {errors.quorum && <p className="text-red-500 text-xs mt-1">{errors.quorum}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Support Threshold (%) *</label>
                    <Input
                      type="number"
                      placeholder="50"
                      value={formData.supportThreshold}
                      onChange={(e) => handleInputChange("supportThreshold", e.target.value)}
                      className={errors.supportThreshold ? "border-red-500" : ""}
                    />
                    {errors.supportThreshold && <p className="text-red-500 text-xs mt-1">{errors.supportThreshold}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Min Voting Power</label>
                    <Input
                      type="number"
                      placeholder="1000"
                      value={formData.minVotingPower}
                      onChange={(e) => handleInputChange("minVotingPower", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Settings className="h-5 w-5 mr-2 text-purple-500" />
                  Advanced Options
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isEmergency"
                      checked={formData.isEmergency}
                      onChange={(e) => handleInputChange("isEmergency", e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="isEmergency" className="text-sm">Emergency Proposal</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="requiresSuperMajority"
                      checked={formData.requiresSuperMajority}
                      onChange={(e) => handleInputChange("requiresSuperMajority", e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="requiresSuperMajority" className="text-sm">Super Majority</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="allowDelegation"
                      checked={formData.allowDelegation}
                      onChange={(e) => handleInputChange("allowDelegation", e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="allowDelegation" className="text-sm">Allow Delegation</label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Execution Settings */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                  Execution Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="requiresExecution"
                    checked={formData.requiresExecution}
                    onChange={(e) => handleInputChange("requiresExecution", e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="requiresExecution" className="text-sm font-medium">
                    This proposal requires manual execution
                  </label>
                </div>

                {formData.requiresExecution && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Execution Delay (hours)</label>
                    <Input
                      type="number"
                      placeholder="24"
                      value={formData.executionDelay}
                      onChange={(e) => handleInputChange("executionDelay", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Time delay before execution can be triggered
                    </p>
                  </div>
                )}

                {formData.requiresExecution && (
                  <div>
                    <label className="block text-sm font-medium mb-2">Execution Instructions *</label>
                    <textarea
                      placeholder="Provide detailed instructions for executing this proposal if it passes..."
                      value={formData.executionInstructions}
                      onChange={(e) => handleInputChange("executionInstructions", e.target.value)}
                      rows={4}
                      className="w-full p-3 border border-input rounded-md bg-background resize-none"
                    />
                    {errors.executionInstructions && <p className="text-red-500 text-xs mt-1">{errors.executionInstructions}</p>}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <FileText className="h-5 w-5 mr-2 text-indigo-500" />
                  Attachments & Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Attachments</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload supporting documents</p>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => handleFileUpload(e.target.files)}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button type="button" variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Files
                      </Button>
                    </label>
                    {formData.attachments.length > 0 && (
                      <div className="mt-4 space-y-2">
                        {formData.attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-sm">{file.name}</span>
                            <X 
                              className="h-4 w-4 cursor-pointer text-red-500" 
                              onClick={() => setFormData(prev => ({
                                ...prev,
                                attachments: prev.attachments.filter((_, i) => i !== index)
                              }))}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Discussion Forum</label>
                  <Input
                    placeholder="Link to discussion thread (optional)"
                    value={formData.discussionForum}
                    onChange={(e) => handleInputChange("discussionForum", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 4: Review & Submit */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Eye className="h-5 w-5 mr-2 text-blue-500" />
                  Proposal Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-lg">{formData.title}</h4>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="outline">{formData.category}</Badge>
                    <Badge variant="outline">{formData.priority}</Badge>
                    {formData.isEmergency && <Badge className="bg-red-500">Emergency</Badge>}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{formData.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Voting Duration</p>
                    <p className="text-muted-foreground">{formData.votingDuration} days</p>
                  </div>
                  <div>
                    <p className="font-medium">Quorum</p>
                    <p className="text-muted-foreground">{Number(formData.quorum).toLocaleString()} tokens</p>
                  </div>
                  <div>
                    <p className="font-medium">Support Threshold</p>
                    <p className="text-muted-foreground">{formData.supportThreshold}%</p>
                  </div>
                  <div>
                    <p className="font-medium">Voting Type</p>
                    <p className="text-muted-foreground">{formData.votingType}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="flex items-start space-x-2">
                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 dark:text-blue-100">Important Notice</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    Once submitted, your proposal will be reviewed by the community and go through the voting process. 
                    Make sure all information is accurate and complete.
                  </p>
                </div>
              </div>
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
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Vote className="h-4 w-4 mr-2" />
                    Submit Proposal
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












