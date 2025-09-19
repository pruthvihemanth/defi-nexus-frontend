"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Wallet, 
  Send, 
  Download, 
  Eye, 
  EyeOff, 
  Plus, 
  TrendingUp, 
  TrendingDown,
  Copy,
  ExternalLink,
  Settings,
  Shield,
  QrCode,
  History,
  Star,
  Zap,
  Lock,
  Unlock,
  RefreshCw,
  ChevronRight,
  ArrowUpRight,
  ArrowDownLeft,
  Coins,
  Image as ImageIcon,
  BarChart3,
  Activity
} from "lucide-react"
import { ClientOnly } from "@/components/ui/client-only"
import { WalletSetupModal } from "@/components/wallet/wallet-setup-modal"
import { SendReceiveModal } from "@/components/wallet/send-receive-modal"
import { WalletSettings } from "@/components/wallet/wallet-settings"

// Mock data for demonstration
const mockWalletData = {
  address: "DNX...8k2m9x7q1w3e5r6t8y9u0i1o2p3a4s5d6f7g8h9j0k1l2z3x4c5v6b7n8m9",
  balance: 125.67,
  balanceUSD: 12567.89,
  tokens: [
    { symbol: "SOL", name: "Solana", balance: 25.67, balanceUSD: 2567.89, change: 5.2, icon: "☀️" },
    { symbol: "DNX", name: "DeFi Nexus", balance: 1000, balanceUSD: 10000, change: 12.5, icon: "💎" },
    { symbol: "USDC", name: "USD Coin", balance: 500, balanceUSD: 500, change: 0.1, icon: "💵" },
    { symbol: "RAY", name: "Raydium", balance: 50.5, balanceUSD: 505.5, change: -2.3, icon: "🌊" }
  ],
  nfts: [
    { name: "DeFi Nexus Genesis", collection: "DNX Genesis", image: "/api/placeholder/200/200", floor: 0.5 },
    { name: "Solana Monkey", collection: "SMB", image: "/api/placeholder/200/200", floor: 2.1 },
    { name: "Famous Fox", collection: "Famous Fox Federation", image: "/api/placeholder/200/200", floor: 1.8 }
  ],
  recentTransactions: [
    { type: "send", amount: -5.2, token: "SOL", to: "ABC...xyz", time: "2 min ago", status: "confirmed" },
    { type: "receive", amount: 100, token: "DNX", from: "DEF...uvw", time: "1 hour ago", status: "confirmed" },
    { type: "swap", amount: 50, token: "USDC", to: "RAY", time: "3 hours ago", status: "confirmed" },
    { type: "stake", amount: 25, token: "SOL", to: "Staking Pool", time: "1 day ago", status: "confirmed" }
  ]
}

export default function WalletPage() {
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [showWalletSetup, setShowWalletSetup] = useState(false)
  const [showSendReceive, setShowSendReceive] = useState(false)
  const [sendReceiveType, setSendReceiveType] = useState<"send" | "receive">("send")
  const [walletExists, setWalletExists] = useState(true) // Mock: assume wallet exists

  const copyAddress = () => {
    navigator.clipboard.writeText(mockWalletData.address)
    // You could add a toast notification here
  }

  const handleSendClick = () => {
    setSendReceiveType("send")
    setShowSendReceive(true)
  }

  const handleReceiveClick = () => {
    setSendReceiveType("receive")
    setShowSendReceive(true)
  }

  const handleTransactionComplete = (txData: any) => {
    // Handle transaction completion
    console.log("Transaction completed:", txData)
  }

  const handleWalletCreated = (walletData: any) => {
    setWalletExists(true)
    console.log("Wallet created:", walletData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900">
      {/* Header */}
      <div className="text-center mb-8 pt-8">
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
          <Wallet className="h-4 w-4 text-yellow-400" />
          <span className="text-sm font-medium">Secure Wallet</span>
        </div>
        <h1 className="text-5xl lg:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            DeFi Nexus Wallet
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your gateway to the Solana ecosystem with enterprise-grade security
        </p>
      </div>

      <div className="container mx-auto px-4 pb-16">
        {/* Wallet Address Card */}
        <Card className="mb-8 border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <Wallet className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Main Wallet</h3>
                  <p className="text-sm text-muted-foreground">Solana Network</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setBalanceVisible(!balanceVisible)}
                  className="border-0 bg-white/50 hover:bg-white/70"
                >
                  {balanceVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyAddress}
                  className="border-0 bg-white/50 hover:bg-white/70"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-0 bg-white/50 hover:bg-white/70"
                >
                  <QrCode className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4 mb-4">
              <p className="text-sm text-muted-foreground mb-1">Wallet Address</p>
              <p className="font-mono text-sm break-all">{mockWalletData.address}</p>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Total Portfolio Value</p>
              {balanceVisible ? (
                <div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                    ${mockWalletData.balanceUSD.toLocaleString()}
                  </p>
                  <p className="text-lg text-muted-foreground">
                    {mockWalletData.balance} SOL
                  </p>
                </div>
              ) : (
                <div className="text-3xl font-bold">••••••</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Button 
            onClick={handleSendClick}
            className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            <Send className="h-6 w-6" />
            <span className="text-sm font-medium">Send</span>
          </Button>
          <Button 
            onClick={handleReceiveClick}
            className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            <Download className="h-6 w-6" />
            <span className="text-sm font-medium">Receive</span>
          </Button>
          <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
            <Zap className="h-6 w-6" />
            <span className="text-sm font-medium">Swap</span>
          </Button>
          <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
            <BarChart3 className="h-6 w-6" />
            <span className="text-sm font-medium">Stake</span>
          </Button>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-0 shadow-lg">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <Activity className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="tokens" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <Coins className="h-4 w-4 mr-2" />
              Tokens
            </TabsTrigger>
            <TabsTrigger value="nfts" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <ImageIcon className="h-4 w-4 mr-2" />
              NFTs
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <History className="h-4 w-4 mr-2" />
              History
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Portfolio Chart Placeholder */}
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    <span>Portfolio Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Portfolio chart will be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <History className="h-5 w-5 text-blue-500" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockWalletData.recentTransactions.slice(0, 4).map((tx, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/50 dark:bg-slate-700/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            tx.type === 'send' ? 'bg-red-500/20 text-red-500' :
                            tx.type === 'receive' ? 'bg-green-500/20 text-green-500' :
                            tx.type === 'swap' ? 'bg-blue-500/20 text-blue-500' :
                            'bg-purple-500/20 text-purple-500'
                          }`}>
                            {tx.type === 'send' ? <ArrowUpRight className="h-4 w-4" /> :
                             tx.type === 'receive' ? <ArrowDownLeft className="h-4 w-4" /> :
                             tx.type === 'swap' ? <RefreshCw className="h-4 w-4" /> :
                             <Lock className="h-4 w-4" />}
                          </div>
                          <div>
                            <p className="font-medium capitalize">{tx.type}</p>
                            <p className="text-sm text-muted-foreground">{tx.time}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-medium ${tx.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {tx.amount > 0 ? '+' : ''}{tx.amount} {tx.token}
                          </p>
                          <Badge variant="secondary" className="text-xs">
                            {tx.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tokens Tab */}
          <TabsContent value="tokens" className="mt-6">
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Coins className="h-5 w-5 text-yellow-500" />
                    <span>Token Holdings</span>
                  </CardTitle>
                  <Button variant="outline" size="sm" className="border-0 bg-white/50 hover:bg-white/70">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Token
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockWalletData.tokens.map((token, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/50 dark:bg-slate-700/50 rounded-lg hover:bg-white/70 dark:hover:bg-slate-600/50 transition-all duration-200">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center text-2xl">
                          {token.icon}
                        </div>
                        <div>
                          <p className="font-semibold">{token.symbol}</p>
                          <p className="text-sm text-muted-foreground">{token.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{token.balance.toLocaleString()} {token.symbol}</p>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm text-muted-foreground">${token.balanceUSD.toLocaleString()}</p>
                          <div className={`flex items-center space-x-1 ${token.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {token.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            <span className="text-xs">{Math.abs(token.change)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* NFTs Tab */}
          <TabsContent value="nfts" className="mt-6">
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ImageIcon className="h-5 w-5 text-purple-500" />
                  <span>NFT Collection</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockWalletData.nfts.map((nft, index) => (
                    <div key={index} className="bg-white/50 dark:bg-slate-700/50 rounded-lg overflow-hidden hover:bg-white/70 dark:hover:bg-slate-600/50 transition-all duration-200 hover:scale-105">
                      <div className="aspect-square bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                        <ImageIcon className="h-16 w-16 text-muted-foreground" />
                      </div>
                      <div className="p-4">
                        <p className="font-semibold truncate">{nft.name}</p>
                        <p className="text-sm text-muted-foreground">{nft.collection}</p>
                        <p className="text-sm font-medium text-green-500">Floor: {nft.floor} SOL</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="mt-6">
            <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <History className="h-5 w-5 text-blue-500" />
                  <span>Transaction History</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockWalletData.recentTransactions.map((tx, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/50 dark:bg-slate-700/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          tx.type === 'send' ? 'bg-red-500/20 text-red-500' :
                          tx.type === 'receive' ? 'bg-green-500/20 text-green-500' :
                          tx.type === 'swap' ? 'bg-blue-500/20 text-blue-500' :
                          'bg-purple-500/20 text-purple-500'
                        }`}>
                          {tx.type === 'send' ? <ArrowUpRight className="h-5 w-5" /> :
                           tx.type === 'receive' ? <ArrowDownLeft className="h-5 w-5" /> :
                           tx.type === 'swap' ? <RefreshCw className="h-5 w-5" /> :
                           <Lock className="h-5 w-5" />}
                        </div>
                        <div>
                          <p className="font-semibold capitalize">{tx.type}</p>
                          <p className="text-sm text-muted-foreground">
                            {tx.type === 'send' ? `To: ${tx.to}` :
                             tx.type === 'receive' ? `From: ${tx.from}` :
                             tx.type === 'swap' ? `${tx.amount} ${tx.token} → ${tx.to}` :
                             `Staked to ${tx.to}`}
                          </p>
                          <p className="text-xs text-muted-foreground">{tx.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${tx.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {tx.amount > 0 ? '+' : ''}{tx.amount} {tx.token}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {tx.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="mt-6">
            <WalletSettings />
          </TabsContent>
        </Tabs>
      </div>

      {/* Modals */}
      <WalletSetupModal
        isOpen={showWalletSetup}
        onClose={() => setShowWalletSetup(false)}
        onWalletCreated={handleWalletCreated}
      />
      
      <SendReceiveModal
        isOpen={showSendReceive}
        onClose={() => setShowSendReceive(false)}
        type={sendReceiveType}
        onTransactionComplete={handleTransactionComplete}
      />
    </div>
  )
}
