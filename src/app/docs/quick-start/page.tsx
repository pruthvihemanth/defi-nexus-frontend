import Link from "next/link"
import { 
  ArrowRight, 
  CheckCircle, 
  Code, 
  Zap,
  ExternalLink,
  Copy
} from "lucide-react"

const steps = [
  {
    title: "Connect Your Wallet",
    description: "Connect your Solana wallet to start using DeFi Nexus",
    details: [
      "Click the 'Connect Wallet' button in the top-right corner",
      "Select your preferred wallet (Phantom, Solflare, Backpack, etc.)",
      "Approve the connection in your wallet popup",
      "Your wallet address will appear in the header when connected"
    ],
    tips: [
      "Make sure you have the latest version of your wallet installed",
      "Never share your private keys or seed phrase with anyone",
      "You can disconnect and reconnect your wallet anytime"
    ]
  },
  {
    title: "Fund Your Wallet",
    description: "Ensure you have SOL and other tokens for trading",
    details: [
      "You need SOL for transaction fees (keep at least 0.01 SOL)",
      "Buy SOL from exchanges like Coinbase, Binance, or Kraken",
      "Transfer SOL to your wallet address",
      "Consider getting USDC or other tokens for trading"
    ],
    tips: [
      "Start with a small amount to test the platform",
      "Transaction fees are very low on Solana (usually <$0.01)",
      "You can always add more funds later"
    ]
  },
  {
    title: "Make Your First Swap",
    description: "Trade tokens using our swap interface",
    details: [
      "Navigate to the Swap page from the main menu",
      "Select the token you want to swap from (e.g., SOL)",
      "Select the token you want to swap to (e.g., USDC)",
      "Enter the amount you want to swap",
      "Review the exchange rate and fees",
      "Click 'Swap' and confirm the transaction in your wallet"
    ],
    tips: [
      "Check the exchange rate before confirming",
      "Higher slippage tolerance may help with large trades",
      "Your transaction will be confirmed in 1-2 seconds"
    ]
  },
  {
    title: "Explore Earning Opportunities",
    description: "Discover ways to earn passive income",
    details: [
      "Try providing liquidity to pools to earn trading fees",
      "Explore lending markets to earn interest on your assets",
      "Stake tokens with validators to earn rewards",
      "Set up automated trading strategies with Looper"
    ],
    tips: [
      "Start with small amounts to understand the risks",
      "Diversify your investments across different strategies",
      "Monitor your positions regularly"
    ]
  }
]

const features = [
  {
    title: "Instant Swaps",
    description: "Trade tokens instantly with minimal slippage",
    href: "/docs/trading/swap"
  },
  {
    title: "Liquidity Pools",
    description: "Provide liquidity and earn trading fees",
    href: "/docs/pools/overview"
  },
  {
    title: "Lending Markets",
    description: "Lend and borrow assets with competitive rates",
    href: "/docs/lending/lend"
  },
  {
    title: "Staking Rewards",
    description: "Stake tokens and earn passive rewards",
    href: "/docs/staking/stake"
  }
]

export default function QuickStartPage() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Zap className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Quick Start Guide</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Get up and running with DeFi Nexus in just a few minutes. Follow these simple steps 
          to start trading, earning, and managing your crypto assets on Solana.
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-8 mb-12">
        {steps.map((step, index) => (
          <div key={index} className="border rounded-lg p-6 bg-card">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground mb-4">{step.description}</p>
                
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        Step-by-step:
                      </h4>
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="text-sm text-muted-foreground flex items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3 flex items-center">
                        <Zap className="h-4 w-4 mr-2 text-yellow-500" />
                        Pro Tips:
                      </h4>
                      <ul className="space-y-2">
                        {step.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="text-sm text-muted-foreground flex items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2 mr-3 flex-shrink-0"></span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Next Steps */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">What's Next?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="group p-6 rounded-lg border bg-card hover:bg-accent/50 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="p-6 rounded-lg border bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <h3 className="text-lg font-semibold mb-2">Need More Help?</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Check out these additional resources to learn more about DeFi Nexus.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/docs/resources/faq"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-md hover:bg-primary/20 transition-colors"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            FAQ
          </Link>
          <Link
            href="/docs/resources/troubleshooting"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-md hover:bg-primary/20 transition-colors"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Troubleshooting
          </Link>
          <a
            href="https://discord.gg/definexus"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-md hover:bg-primary/20 transition-colors"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Discord Community
          </a>
        </div>
      </div>
    </div>
  )
}
