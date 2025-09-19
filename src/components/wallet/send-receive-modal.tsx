"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Send, 
  Download, 
  QrCode, 
  Copy, 
  Check,
  ArrowUpRight,
  ArrowDownLeft,
  Zap,
  Clock,
  Shield,
  AlertTriangle,
  Sparkles,
  Coins,
  ExternalLink,
  Scan,
  Wallet
} from "lucide-react"

interface SendReceiveModalProps {
  isOpen: boolean
  onClose: () => void
  type: "send" | "receive"
  onTransactionComplete: (txData: any) => void
}

export function SendReceiveModal({ isOpen, onClose, type, onTransactionComplete }: SendReceiveModalProps) {
  const [activeTab, setActiveTab] = useState(type)
  const [step, setStep] = useState(1)
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [selectedToken, setSelectedToken] = useState("SOL")
  const [memo, setMemo] = useState("")
  const [copied, setCopied] = useState(false)
  const [showQR, setShowQR] = useState(false)

  // Mock wallet address for receive
  const walletAddress = "DNX...8k2m9x7q1w3e5r6t8y9u0i1o2p3a4s5d6f7g8h9j0k1l2z3x4c5v6b7n8m9"

  // Mock token balances
  const tokenBalances = [
    { symbol: "SOL", name: "Solana", balance: 25.67, balanceUSD: 2567.89, icon: "☀️" },
    { symbol: "DNX", name: "DeFi Nexus", balance: 1000, balanceUSD: 10000, icon: "💎" },
    { symbol: "USDC", name: "USD Coin", balance: 500, balanceUSD: 500, icon: "💵" },
    { symbol: "RAY", name: "Raydium", balance: 50.5, balanceUSD: 505.5, icon: "🌊" }
  ]

  const selectedTokenData = tokenBalances.find(token => token.symbol === selectedToken)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSend = () => {
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      // Simulate transaction
      onTransactionComplete({
        type: "send",
        amount: parseFloat(amount),
        token: selectedToken,
        to: recipient,
        memo,
        status: "confirmed"
      })
      onClose()
    }
  }

  const resetModal = () => {
    setStep(1)
    setRecipient("")
    setAmount("")
    setSelectedToken("SOL")
    setMemo("")
    setCopied(false)
    setShowQR(false)
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
                {activeTab === "send" ? (
                  <Send className="h-4 w-4 text-red-400" />
                ) : (
                  <Download className="h-4 w-4 text-green-400" />
                )}
                <span className="text-sm font-medium text-white/90">
                  {activeTab === "send" ? "Send Transaction" : "Receive Funds"}
                </span>
              </div>
              <DialogTitle className="text-3xl lg:text-4xl font-bold mb-2">
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {activeTab === "send" ? "Send Tokens" : "Receive Tokens"}
                </span>
              </DialogTitle>
              <p className="text-lg text-muted-foreground">
                {activeTab === "send" 
                  ? "Transfer tokens to another wallet address" 
                  : "Share your wallet address to receive tokens"
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
          {/* Tab Selection */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-0 shadow-lg">
              <TabsTrigger 
                value="send" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-600 data-[state=active]:text-white"
                onClick={() => resetModal()}
              >
                <Send className="h-4 w-4 mr-2" />
                Send
              </TabsTrigger>
              <TabsTrigger 
                value="receive" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white"
                onClick={() => resetModal()}
              >
                <Download className="h-4 w-4 mr-2" />
                Receive
              </TabsTrigger>
            </TabsList>

            {/* Send Tab */}
            <TabsContent value="send" className="space-y-6">
              {step === 1 && (
                <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <ArrowUpRight className="h-5 w-5 text-red-500" />
                      <span>Send Tokens</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Token Selection */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Select Token</label>
                      <div className="grid grid-cols-2 gap-2">
                        {tokenBalances.map((token) => (
                          <div
                            key={token.symbol}
                            className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                              selectedToken === token.symbol
                                ? 'border-blue-500 bg-blue-500/10'
                                : 'border-muted-foreground/20 hover:border-blue-500/50'
                            }`}
                            onClick={() => setSelectedToken(token.symbol)}
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{token.icon}</span>
                              <div className="flex-1">
                                <p className="font-semibold">{token.symbol}</p>
                                <p className="text-sm text-muted-foreground">
                                  Balance: {token.balance} {token.symbol}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recipient Address */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Recipient Address</label>
                      <Input
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        placeholder="Enter wallet address or scan QR code"
                        className="h-12"
                      />
                      <div className="flex items-center space-x-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-0 bg-white/50 hover:bg-white/70"
                        >
                          <Scan className="h-4 w-4 mr-2" />
                          Scan QR
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-0 bg-white/50 hover:bg-white/70"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Contacts
                        </Button>
                      </div>
                    </div>

                    {/* Amount */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Amount</label>
                      <div className="flex space-x-2">
                        <Input
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0.00"
                          className="h-12 flex-1"
                          type="number"
                        />
                        <Button
                          variant="outline"
                          onClick={() => setAmount(selectedTokenData?.balance.toString() || "0")}
                          className="border-0 bg-white/50 hover:bg-white/70"
                        >
                          Max
                        </Button>
                      </div>
                      {amount && selectedTokenData && (
                        <p className="text-sm text-muted-foreground mt-1">
                          ≈ ${(parseFloat(amount) * (selectedTokenData.balanceUSD / selectedTokenData.balance)).toFixed(2)} USD
                        </p>
                      )}
                    </div>

                    {/* Memo (Optional) */}
                    <div>
                      <label className="text-sm font-medium mb-2 block">Memo (Optional)</label>
                      <Input
                        value={memo}
                        onChange={(e) => setMemo(e.target.value)}
                        placeholder="Add a note for this transaction"
                        className="h-12"
                      />
                    </div>

                    <Button
                      onClick={handleSend}
                      disabled={!recipient || !amount || parseFloat(amount) <= 0}
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0"
                    >
                      Continue
                    </Button>
                  </CardContent>
                </Card>
              )}

              {step === 2 && (
                <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      <span>Confirm Transaction</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">Transaction Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Token:</span>
                          <span className="font-medium">{selectedToken}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Amount:</span>
                          <span className="font-medium">{amount} {selectedToken}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">To:</span>
                          <span className="font-mono text-xs">{recipient}</span>
                        </div>
                        {memo && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Memo:</span>
                            <span className="font-medium">{memo}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Network Fee:</span>
                          <span className="font-medium">0.000005 SOL</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-yellow-700 dark:text-yellow-300">Final Check</h4>
                          <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                            Please verify all details are correct. This transaction cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="flex-1 border-0 bg-white/50 hover:bg-white/70"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={handleSend}
                        className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0"
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        Send Transaction
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Receive Tab */}
            <TabsContent value="receive" className="space-y-6">
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ArrowDownLeft className="h-5 w-5 text-green-500" />
                    <span>Receive Tokens</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* QR Code Section */}
                  <div className="text-center">
                    <div className="inline-block p-4 bg-white rounded-lg shadow-lg">
                      <div className="w-48 h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                        <QrCode className="h-24 w-24 text-muted-foreground" />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">Scan QR code to send tokens</p>
                  </div>

                  {/* Wallet Address */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Your Wallet Address</label>
                    <div className="flex space-x-2">
                      <Input
                        value={walletAddress}
                        readOnly
                        className="h-12 font-mono text-sm"
                      />
                      <Button
                        variant="outline"
                        onClick={() => copyToClipboard(walletAddress)}
                        className="border-0 bg-white/50 hover:bg-white/70"
                      >
                        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  {/* Supported Tokens */}
                  <div>
                    <h4 className="font-semibold mb-3">Supported Tokens</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {tokenBalances.map((token) => (
                        <div key={token.symbol} className="flex items-center space-x-3 p-3 bg-white/50 dark:bg-slate-700/50 rounded-lg">
                          <span className="text-2xl">{token.icon}</span>
                          <div>
                            <p className="font-semibold">{token.symbol}</p>
                            <p className="text-sm text-muted-foreground">{token.name}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Shield className="h-5 w-5 text-green-500 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-green-700 dark:text-green-300">Security Tips</h4>
                        <ul className="text-sm text-green-600 dark:text-green-400 mt-1 space-y-1">
                          <li>• Only send tokens to this address</li>
                          <li>• Double-check the address before sending</li>
                          <li>• This address works for all Solana tokens</li>
                        </ul>
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







