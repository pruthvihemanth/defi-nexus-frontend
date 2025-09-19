"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Mail, Lock, Eye, EyeOff, Wallet, Sparkles, Shield, Zap, ArrowRight, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [currentStep, setCurrentStep] = useState<'auth' | 'forgot-password'>('auth')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate passwords match for signup
    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }
    
    // Handle authentication logic here
    console.log("Auth submitted:", { email, password, isLogin })
  }

  const handleForgotPassword = () => {
    if (!email) {
      alert("Please enter your email address first")
      return
    }
    // Simple forgot password - just show a message for now
    alert(`Password reset instructions have been sent to ${email}`)
    console.log("Forgot password requested for:", email)
  }

  const handleWalletConnect = (wallet: string) => {
    if (wallet === "DNX Wallet") {
      // Redirect to DNX wallet page
      window.location.href = "/wallet"
    } else {
      // Handle external wallet connection logic here
      console.log("Connecting to:", wallet)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[95vh] overflow-y-auto bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900 border-0 shadow-2xl p-0">
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="text-center space-y-4">
            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm rounded-full px-4 py-2 border border-yellow-400/30">
                <Shield className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Secure Access</span>
              </div>
            </div>
            <DialogTitle className="text-3xl lg:text-4xl font-bold">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                {isLogin ? "Welcome Back" : "Join DeFi Nexus"}
              </span>
            </DialogTitle>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isLogin 
                ? "Sign in to access your DeFi portfolio and continue trading" 
                : "Create your account and start your DeFi journey today"
              }
            </p>
          </div>
        </div>

        {/* Main Content - Horizontal Layout */}
        {currentStep === 'auth' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[500px] px-6 pb-8">
          {/* Left Side - Traditional Login & Social */}
          <div className="space-y-6">
            <div className="text-center lg:text-left">
              <h3 className="text-xl font-semibold mb-2">Traditional Login</h3>
              <p className="text-sm text-muted-foreground">Sign in with your email and password</p>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Confirm Password - Only show for signup */}
              {!isLogin && (
                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 pr-10 h-12"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full h-12" variant="gradient">
                {isLogin ? "Sign In" : "Create Account"}
              </Button>
            </form>

            {/* Forgot Password Link - Only show for login */}
            {isLogin && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full h-12 justify-start">
                <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </Button>
              <Button variant="outline" className="w-full h-12 justify-start">
                <svg className="mr-3 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Continue with Facebook
              </Button>
            </div>

            {/* Toggle between login/signup */}
            <div className="text-center lg:text-left pt-4">
              <p className="text-sm text-muted-foreground">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <Button
                  variant="link"
                  className="p-0 h-auto font-medium"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </Button>
              </p>
            </div>
          </div>

          {/* Right Side - Wallet Connection */}
          <div className="space-y-6 border-l border-white/20 pl-8 pr-4">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm rounded-full px-4 py-2 border border-yellow-400/30">
                  <Wallet className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">Solana Wallets</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Connect Wallet
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Connect your Solana wallet to access DeFi features instantly
              </p>
            </div>

            <div className="space-y-3">
              {/* DNX Wallet - Featured */}
              <div className="relative">
                <div className="absolute -top-2 -right-2 z-10">
                  <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                    RECOMMENDED
                  </span>
                </div>
              </div>
              {[
                { name: "DNX Wallet", icon: "💎", color: "bg-gradient-to-r from-blue-500 to-purple-600", desc: "Built-in Wallet", users: "New", isDnx: true },
                { name: "Phantom", icon: "👻", color: "bg-gradient-to-r from-purple-500 to-purple-600", desc: "Most Popular", users: "2M+" },
                { name: "Backpack", icon: "🎒", color: "bg-gradient-to-r from-orange-500 to-orange-600", desc: "Trading Focused", users: "500K+" },
                { name: "Solflare", icon: "☀️", color: "bg-gradient-to-r from-yellow-500 to-yellow-600", desc: "Secure & Fast", users: "1M+" },
                { name: "Glow", icon: "✨", color: "bg-gradient-to-r from-pink-500 to-pink-600", desc: "User Friendly", users: "200K+" }
              ].map((wallet) => (
                <Button
                  key={wallet.name}
                  variant="outline"
                  className={cn(
                    "w-full justify-start h-16 border-0 backdrop-blur-sm hover:scale-[1.02] transition-all duration-200 group",
                    wallet.isDnx 
                      ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-500/30" 
                      : "bg-white/80 dark:bg-slate-800/80 hover:bg-white/90 dark:hover:bg-slate-700/80"
                  )}
                  onClick={() => handleWalletConnect(wallet.name)}
                >
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl mr-4 shadow-lg group-hover:scale-110 transition-transform duration-200", wallet.color)}>
                    {wallet.icon}
                  </div>
                  <div className="flex flex-col items-start flex-1">
                    <div className="flex items-center justify-between w-full">
                      <span className="font-semibold text-base">{wallet.name}</span>
                      <span className={cn(
                        "text-xs px-2 py-1 rounded-full",
                        wallet.isDnx 
                          ? "text-blue-600 dark:text-blue-400 bg-blue-500/20 border border-blue-500/30" 
                          : "text-muted-foreground bg-muted/50"
                      )}>
                        {wallet.users}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">{wallet.desc}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                </Button>
              ))}
            </div>

            {/* Wallet Benefits */}
            <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <h4 className="font-semibold text-sm mb-3 flex items-center">
                <Sparkles className="h-4 w-4 mr-2 text-yellow-400" />
                Why Connect a Wallet?
              </h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-center">
                  <Zap className="h-3 w-3 mr-2 text-green-400" />
                  Instant access to DeFi features
                </li>
                <li className="flex items-center">
                  <Shield className="h-3 w-3 mr-2 text-blue-400" />
                  Your keys, your crypto
                </li>
                <li className="flex items-center">
                  <TrendingUp className="h-3 w-3 mr-2 text-purple-400" />
                  Trade and earn without limits
                </li>
              </ul>
            </div>
          </div>
        </div>
        )}

      </DialogContent>
    </Dialog>
  )
}



