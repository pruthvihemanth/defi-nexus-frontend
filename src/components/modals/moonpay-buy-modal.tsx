"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Shield, Clock, CheckCircle, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface MoonPayBuyModalProps {
  isOpen: boolean
  onClose: () => void
}

const supportedCryptos = [
  { symbol: "SOL", name: "Solana", icon: "🟣", minAmount: "$20", maxAmount: "$10,000" },
  { symbol: "ETH", name: "Ethereum", icon: "🔷", minAmount: "$20", maxAmount: "$10,000" },
  { symbol: "BTC", name: "Bitcoin", icon: "🟠", minAmount: "$20", maxAmount: "$10,000" },
  { symbol: "USDC", name: "USD Coin", icon: "💙", minAmount: "$20", maxAmount: "$10,000" },
  { symbol: "USDT", name: "Tether", icon: "💚", minAmount: "$20", maxAmount: "$10,000" },
]

const paymentMethods = [
  { name: "Credit/Debit Card", icon: CreditCard, available: true },
  { name: "Bank Transfer", icon: Shield, available: true },
  { name: "Apple Pay", icon: CreditCard, available: true },
  { name: "Google Pay", icon: CreditCard, available: false },
]

export function MoonPayBuyModal({ isOpen, onClose }: MoonPayBuyModalProps) {
  const [selectedCrypto, setSelectedCrypto] = useState(supportedCryptos[0])
  const [amount, setAmount] = useState("")
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0])

  const handleBuyNow = () => {
    // In a real implementation, this would redirect to MoonPay with the selected parameters
    const moonPayUrl = `https://buy.moonpay.com/?apiKey=YOUR_API_KEY&currencyCode=${selectedCrypto.symbol}&baseCurrencyAmount=${amount}&baseCurrencyCode=USD&walletAddress=YOUR_WALLET_ADDRESS`
    window.open(moonPayUrl, '_blank')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Buy Crypto with Fiat
          </DialogTitle>
          <DialogDescription className="text-center">
            Purchase cryptocurrency directly with your credit card or bank account
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Supported Cryptocurrencies */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Select Cryptocurrency</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {supportedCryptos.map((crypto) => (
                <Card
                  key={crypto.symbol}
                  className={cn(
                    "cursor-pointer transition-all duration-200 hover:shadow-md",
                    selectedCrypto.symbol === crypto.symbol
                      ? "ring-2 ring-primary bg-primary/5"
                      : "hover:bg-muted/50"
                  )}
                  onClick={() => setSelectedCrypto(crypto)}
                >
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-2xl mb-2">{crypto.icon}</div>
                      <div className="font-semibold">{crypto.symbol}</div>
                      <div className="text-sm text-muted-foreground">{crypto.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {crypto.minAmount} - {crypto.maxAmount}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Enter Amount</h3>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                $
              </div>
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                min="20"
                max="10000"
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>Min: {selectedCrypto.minAmount}</span>
              <span>Max: {selectedCrypto.maxAmount}</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Payment Method</h3>
            <div className="space-y-2">
              {paymentMethods.map((method) => (
                <div
                  key={method.name}
                  className={cn(
                    "flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors",
                    selectedPayment.name === method.name
                      ? "border-primary bg-primary/5"
                      : method.available
                      ? "hover:bg-muted/50"
                      : "opacity-50 cursor-not-allowed"
                  )}
                  onClick={() => method.available && setSelectedPayment(method)}
                >
                  <div className="flex items-center space-x-3">
                    <method.icon className="h-5 w-5" />
                    <span className="font-medium">{method.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {method.available ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <Badge variant="secondary" className="text-xs">
                        Coming Soon
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Why Choose MoonPay?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="text-sm">Secure & Regulated</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-500" />
                <span className="text-sm">Instant Delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-purple-500" />
                <span className="text-sm">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Estimated Cost */}
          {amount && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">You will receive:</span>
                <span className="text-lg font-bold">
                  ~{(parseFloat(amount) / 100).toFixed(4)} {selectedCrypto.symbol}
                </span>
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                *Estimated amount, final amount may vary based on market conditions
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleBuyNow}
              disabled={!amount || parseFloat(amount) < 20}
              className="flex-1"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Continue to MoonPay
            </Button>
          </div>

          {/* Disclaimer */}
          <div className="text-xs text-muted-foreground text-center">
            By continuing, you will be redirected to MoonPay's secure platform. 
            DeFi Nexus is not responsible for transactions processed through third-party services.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


