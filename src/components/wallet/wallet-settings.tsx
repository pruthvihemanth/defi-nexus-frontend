"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Settings, 
  Shield, 
  Key, 
  Download, 
  Eye, 
  EyeOff, 
  Copy, 
  Check,
  AlertTriangle,
  Lock,
  Unlock,
  FileText,
  Smartphone,
  Monitor,
  Trash2,
  RefreshCw,
  Bell,
  Globe,
  Moon,
  Sun
} from "lucide-react"

export function WalletSettings() {
  const [showPrivateKey, setShowPrivateKey] = useState(false)
  const [showSeedPhrase, setShowSeedPhrase] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Security Settings */}
      <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-green-500" />
            <span>Security & Backup</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white/50 dark:bg-slate-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">Recovery Phrase</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSeedPhrase(!showSeedPhrase)}
                  className="border-0 bg-white/50 hover:bg-white/70"
                >
                  {showSeedPhrase ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Your 12-word recovery phrase for wallet restoration
              </p>
              {showSeedPhrase && (
                <div className="bg-muted/50 rounded-lg p-3 mb-3">
                  <p className="font-mono text-sm">abandon ability able about above absent absorb abstract absurd abuse access accident</p>
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard("abandon ability able about above absent absorb abstract absurd abuse access accident", "seed")}
                className="w-full border-0 bg-white/50 hover:bg-white/70"
              >
                {copied === "seed" ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied === "seed" ? "Copied!" : "Copy Phrase"}
              </Button>
            </div>

            <div className="p-4 bg-white/50 dark:bg-slate-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold">Private Key</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPrivateKey(!showPrivateKey)}
                  className="border-0 bg-white/50 hover:bg-white/70"
                >
                  {showPrivateKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Your wallet's private key (use with caution)
              </p>
              {showPrivateKey && (
                <div className="bg-muted/50 rounded-lg p-3 mb-3">
                  <p className="font-mono text-xs break-all">5Kb8kLf9zgWQnogidDA76MzPL6TsM...8k2m9x7q1w3e5r6t8y9u0i1o2p3a4s5d6f7g8h9j0k1l2z3x4c5v6b7n8m9</p>
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard("5Kb8kLf9zgWQnogidDA76MzPL6TsM...8k2m9x7q1w3e5r6t8y9u0i1o2p3a4s5d6f7g8h9j0k1l2z3x4c5v6b7n8m9", "private")}
                className="w-full border-0 bg-white/50 hover:bg-white/70"
              >
                {copied === "private" ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied === "private" ? "Copied!" : "Copy Key"}
              </Button>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-700 dark:text-yellow-300">Security Warning</h4>
                <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                  Never share your recovery phrase or private key with anyone. DeFi Nexus will never ask for this information.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Wallet Management */}
      <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-blue-500" />
            <span>Wallet Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="h-16 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
              <Download className="h-6 w-6" />
              <span className="text-sm font-medium">Export Wallet</span>
            </Button>
            
            <Button className="h-16 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
              <RefreshCw className="h-6 w-6" />
              <span className="text-sm font-medium">Sync Wallet</span>
            </Button>
            
            <Button className="h-16 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
              <Key className="h-6 w-6" />
              <span className="text-sm font-medium">Change Password</span>
            </Button>
            
            <Button className="h-16 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
              <Trash2 className="h-6 w-6" />
              <span className="text-sm font-medium">Delete Wallet</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card className="border-0 shadow-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-purple-500" />
            <span>Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-slate-700/50 rounded-lg">
              <div>
                <h4 className="font-semibold">Transaction Notifications</h4>
                <p className="text-sm text-muted-foreground">Get notified about transaction status</p>
              </div>
              <Badge variant="secondary">Enabled</Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-slate-700/50 rounded-lg">
              <div>
                <h4 className="font-semibold">Price Alerts</h4>
                <p className="text-sm text-muted-foreground">Receive alerts for price changes</p>
              </div>
              <Badge variant="secondary">Enabled</Badge>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-white/50 dark:bg-slate-700/50 rounded-lg">
              <div>
                <h4 className="font-semibold">Auto-lock</h4>
                <p className="text-sm text-muted-foreground">Automatically lock wallet after inactivity</p>
              </div>
              <Badge variant="secondary">5 minutes</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}




















