"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Wallet, 
  Shield, 
  Key, 
  Download, 
  Eye, 
  EyeOff, 
  Copy, 
  Check,
  AlertTriangle,
  Sparkles,
  Lock,
  Unlock,
  FileText,
  Smartphone,
  Monitor
} from "lucide-react"

interface WalletSetupModalProps {
  isOpen: boolean
  onClose: () => void
  onWalletCreated: (walletData: any) => void
}

export function WalletSetupModal({ isOpen, onClose, onWalletCreated }: WalletSetupModalProps) {
  const [activeTab, setActiveTab] = useState("create")
  const [step, setStep] = useState(1)
  const [seedPhrase, setSeedPhrase] = useState<string[]>([])
  const [confirmSeedPhrase, setConfirmSeedPhrase] = useState<string[]>([])
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showSeedPhrase, setShowSeedPhrase] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  // Mock seed phrase generation
  const generateSeedPhrase = () => {
    const words = [
      "abandon", "ability", "able", "about", "above", "absent", "absorb", "abstract", "absurd", "abuse",
      "access", "accident", "account", "accuse", "achieve", "acid", "acoustic", "acquire", "across", "act",
      "action", "actor", "actress", "actual", "adapt", "add", "addict", "address", "adjust", "admit",
      "adult", "advance", "advice", "aerobic", "affair", "afford", "afraid", "again", "age", "agent"
    ]
    return Array.from({ length: 12 }, () => words[Math.floor(Math.random() * words.length)])
  }

  const handleCreateWallet = () => {
    if (step === 1) {
      const newSeedPhrase = generateSeedPhrase()
      setSeedPhrase(newSeedPhrase)
      setStep(2)
    } else if (step === 2) {
      setStep(3)
    } else if (step === 3) {
      // Verify seed phrase
      if (JSON.stringify(seedPhrase) === JSON.stringify(confirmSeedPhrase)) {
        setStep(4)
      }
    } else if (step === 4) {
      // Create wallet with password
      if (password === confirmPassword && password.length >= 8) {
        onWalletCreated({
          address: "DNX...8k2m9x7q1w3e5r6t8y9u0i1o2p3a4s5d6f7g8h9j0k1l2z3x4c5v6b7n8m9",
          seedPhrase,
          password
        })
        onClose()
      }
    }
  }

  const copyToClipboard = (text: string, index?: number) => {
    navigator.clipboard.writeText(text)
    if (index !== undefined) {
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    }
  }

  const resetModal = () => {
    setStep(1)
    setSeedPhrase([])
    setConfirmSeedPhrase([])
    setPassword("")
    setConfirmPassword("")
    setShowSeedPhrase(false)
    setCopiedIndex(null)
  }

  const handleClose = () => {
    resetModal()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900 border-0 shadow-2xl">
        <DialogHeader className="space-y-4 text-center">
          <div className="flex items-center justify-between">
            <div className="flex-1 text-center">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                <Shield className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium text-white/90">Wallet Setup</span>
              </div>
              <DialogTitle className="text-3xl lg:text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {activeTab === "create" ? "Create New Wallet" : "Import Existing Wallet"}
                </span>
              </DialogTitle>
              <p className="text-lg text-muted-foreground">
                {activeTab === "create" 
                  ? "Set up your secure DeFi Nexus wallet" 
                  : "Restore your wallet using seed phrase or private key"
                }
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-8 w-8 hover:bg-white/10"
            >
              ×
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Steps */}
          {activeTab === "create" && (
            <div className="flex items-center justify-center space-x-4 mb-6">
              {[1, 2, 3, 4].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= stepNumber 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {stepNumber}
                  </div>
                  {stepNumber < 4 && (
                    <div className={`w-8 h-0.5 mx-2 ${
                      step > stepNumber ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Tab Selection */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-0 shadow-lg">
              <TabsTrigger 
                value="create" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                onClick={() => resetModal()}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Create New
              </TabsTrigger>
              <TabsTrigger 
                value="import" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                onClick={() => resetModal()}
              >
                <Download className="h-4 w-4 mr-2" />
                Import Existing
              </TabsTrigger>
            </TabsList>

          {/* Create Wallet Tab */}
          <TabsContent value="create" className="space-y-6">
            {step === 1 && (
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-green-500" />
                    <span>Security Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-700 dark:text-blue-300">Important Security Notice</h4>
                        <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                          Your seed phrase is the only way to recover your wallet. Store it safely and never share it with anyone.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white/50 dark:bg-slate-700/50 rounded-lg">
                      <Lock className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <h4 className="font-semibold">Secure Generation</h4>
                      <p className="text-sm text-muted-foreground">Cryptographically secure random seed phrase</p>
                    </div>
                    <div className="text-center p-4 bg-white/50 dark:bg-slate-700/50 rounded-lg">
                      <FileText className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                      <h4 className="font-semibold">Backup Required</h4>
                      <p className="text-sm text-muted-foreground">Write down your 12-word recovery phrase</p>
                    </div>
                    <div className="text-center p-4 bg-white/50 dark:bg-slate-700/50 rounded-lg">
                      <Shield className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                      <h4 className="font-semibold">Password Protected</h4>
                      <p className="text-sm text-muted-foreground">Additional layer of security</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Key className="h-5 w-5 text-yellow-500" />
                    <span>Your Recovery Phrase</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-yellow-700 dark:text-yellow-300">Write Down These Words</h4>
                        <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                          Write down these 12 words in the exact order shown. This is your only way to recover your wallet.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-muted-foreground">Recovery Phrase (12 words)</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowSeedPhrase(!showSeedPhrase)}
                      className="border-0 bg-white/50 hover:bg-white/70"
                    >
                      {showSeedPhrase ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      {showSeedPhrase ? "Hide" : "Show"}
                    </Button>
                  </div>

                  {showSeedPhrase && (
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                      {seedPhrase.map((word, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 bg-white/50 dark:bg-slate-700/50 rounded-lg">
                          <span className="text-xs text-muted-foreground w-4">{index + 1}</span>
                          <span className="font-mono text-sm flex-1">{word}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard(word, index)}
                            className="h-6 w-6 p-0 hover:bg-white/50"
                          >
                            {copiedIndex === index ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <Button
                      variant="outline"
                      onClick={() => copyToClipboard(seedPhrase.join(' '))}
                      className="border-0 bg-white/50 hover:bg-white/70"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy All Words
                    </Button>
                    <Button
                      onClick={handleCreateWallet}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
                    >
                      I've Written It Down
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>Verify Recovery Phrase</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Please enter your recovery phrase in the correct order to verify you've saved it properly.
                  </p>
                  
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                    {Array.from({ length: 12 }, (_, index) => (
                      <div key={index} className="p-2 bg-white/50 dark:bg-slate-700/50 rounded-lg">
                        <span className="text-xs text-muted-foreground block mb-1">{index + 1}</span>
                        <Input
                          value={confirmSeedPhrase[index] || ""}
                          onChange={(e) => {
                            const newPhrase = [...confirmSeedPhrase]
                            newPhrase[index] = e.target.value
                            setConfirmSeedPhrase(newPhrase)
                          }}
                          placeholder="word"
                          className="text-sm h-8"
                        />
                      </div>
                    ))}
                  </div>

                  <Button
                    onClick={handleCreateWallet}
                    disabled={confirmSeedPhrase.length !== 12 || confirmSeedPhrase.some(word => !word)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
                  >
                    Verify & Continue
                  </Button>
                </CardContent>
              </Card>
            )}

            {step === 4 && (
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lock className="h-5 w-5 text-purple-500" />
                    <span>Set Password</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Create a strong password to protect your wallet. This will be required to access your wallet.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Password</label>
                      <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter a strong password"
                        className="h-12"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-2 block">Confirm Password</label>
                      <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-green-700 dark:text-green-300">Password Requirements</h4>
                        <ul className="text-sm text-green-600 dark:text-green-400 mt-1 space-y-1">
                          <li>• At least 8 characters long</li>
                          <li>• Mix of letters, numbers, and symbols</li>
                          <li>• Not easily guessable</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleCreateWallet}
                    disabled={password !== confirmPassword || password.length < 8}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
                  >
                    Create Wallet
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Import Wallet Tab */}
          <TabsContent value="import" className="space-y-6">
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Download className="h-5 w-5 text-blue-500" />
                  <span>Import Existing Wallet</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white/50 dark:bg-slate-700/50 rounded-lg border-2 border-dashed border-muted-foreground/20 hover:border-blue-500/50 transition-colors cursor-pointer">
                    <div className="text-center">
                      <FileText className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                      <h4 className="font-semibold">Seed Phrase</h4>
                      <p className="text-sm text-muted-foreground">Import using 12 or 24 word recovery phrase</p>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white/50 dark:bg-slate-700/50 rounded-lg border-2 border-dashed border-muted-foreground/20 hover:border-blue-500/50 transition-colors cursor-pointer">
                    <div className="text-center">
                      <Key className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                      <h4 className="font-semibold">Private Key</h4>
                      <p className="text-sm text-muted-foreground">Import using private key</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-700 dark:text-blue-300">Security Notice</h4>
                      <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                        Never share your seed phrase or private key with anyone. DeFi Nexus will never ask for this information.
                      </p>
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

















