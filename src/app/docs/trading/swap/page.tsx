import Link from "next/link"
import { 
  ArrowRight, 
  TrendingUp, 
  Zap,
  Shield,
  Info,
  AlertTriangle,
  CheckCircle,
  Copy
} from "lucide-react"

const features = [
  {
    title: "Instant Swaps",
    description: "Trade tokens instantly with minimal slippage using our optimized routing",
    icon: Zap
  },
  {
    title: "Best Price Discovery",
    description: "Automatically finds the best prices across multiple DEXs and liquidity sources",
    icon: TrendingUp
  },
  {
    title: "Slippage Protection",
    description: "Built-in slippage protection to ensure you get the expected amount",
    icon: Shield
  }
]

const swapSteps = [
  {
    step: 1,
    title: "Select Your Tokens",
    description: "Choose which tokens you want to swap",
    details: [
      "Click on the 'From' dropdown to select the token you want to swap",
      "Click on the 'To' dropdown to select the token you want to receive",
      "You can search for tokens by typing their name",
      "Popular tokens like SOL, USDC, and USDT are shown first",
      "The current exchange rate will be displayed automatically"
    ],
    tips: [
      "Start with small amounts for your first few swaps",
      "Check the token's liquidity before swapping large amounts",
      "Some tokens may have higher slippage due to low liquidity"
    ]
  },
  {
    step: 2,
    title: "Enter the Amount",
    description: "Specify how much you want to swap",
    details: [
      "Type the amount you want to swap in the 'From' field",
      "The 'To' amount will be calculated and shown automatically",
      "Use the percentage buttons (25%, 50%, 75%, 100%) for quick selection",
      "Check the estimated fees and total cost before proceeding"
    ],
    tips: [
      "Always keep some SOL in your wallet for transaction fees",
      "The displayed amount is an estimate - actual amount may vary slightly",
      "Larger amounts may have higher price impact"
    ]
  },
  {
    step: 3,
    title: "Review and Confirm",
    description: "Review the swap details and complete the transaction",
    details: [
      "Double-check the exchange rate and estimated output",
      "Review the slippage tolerance (default: 0.5%)",
      "Click 'Swap' to initiate the transaction",
      "Approve the transaction in your wallet popup",
      "Wait for confirmation (usually 1-2 seconds)"
    ],
    tips: [
      "Never rush through the confirmation step",
      "If the price changes significantly, the transaction may fail",
      "You can increase slippage tolerance for better success rates"
    ]
  }
]

const codeExamples = [
  {
    title: "Basic Swap",
    description: "Simple token swap example",
    code: `import { createSwapTransaction } from '@/lib/swap'

const swapTx = await createSwapTransaction({
  fromToken: 'SOL',
  toToken: 'USDC',
  amount: 1.0,
  slippage: 0.5 // 0.5%
})

await wallet.sendTransaction(swapTx)`
  },
  {
    title: "Advanced Swap with Custom Slippage",
    description: "Swap with custom slippage and deadline",
    code: `const swapTx = await createSwapTransaction({
  fromToken: 'SOL',
  toToken: 'USDC',
  amount: 1.0,
  slippage: 1.0, // 1% slippage
  deadline: Date.now() + 300000, // 5 minutes
  recipient: wallet.publicKey
})`
  },
  {
    title: "Get Quote",
    description: "Get a quote without executing the swap",
    code: `const quote = await getSwapQuote({
  fromToken: 'SOL',
  toToken: 'USDC',
  amount: 1.0
})

console.log('Expected output:', quote.expectedOutput)
console.log('Price impact:', quote.priceImpact)
console.log('Route:', quote.route)`
  }
]

export default function SwapPage() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Token Swapping</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Learn how to swap tokens instantly on DeFi Nexus. Our swap interface provides 
          the best prices, minimal slippage, and seamless user experience.
        </p>
      </div>

      {/* Features */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-lg border bg-card">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How to Swap */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">How to Swap Tokens</h2>
        <div className="space-y-6">
          {swapSteps.map((step) => (
            <div key={step.step} className="border rounded-lg p-6 bg-card">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                    {step.step}
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
      </div>

      {/* Understanding Swap Features */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Understanding Swap Features</h2>
        <div className="space-y-6">
          <div className="border rounded-lg p-6 bg-card">
            <h3 className="text-lg font-semibold mb-2">Slippage Protection</h3>
            <p className="text-muted-foreground mb-4">
              Slippage is the difference between the expected price and the actual execution price. 
              Our default slippage tolerance of 0.5% protects you from significant price movements during transaction confirmation.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Lower slippage = More precise execution, but higher chance of failure</li>
              <li>• Higher slippage = Better success rate, but less predictable output</li>
              <li>• For volatile tokens, consider increasing slippage to 1-2%</li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-6 bg-card">
            <h3 className="text-lg font-semibold mb-2">Price Impact</h3>
            <p className="text-muted-foreground mb-4">
              Large swaps can affect the token price due to limited liquidity. The price impact shows 
              how much your trade will move the market price.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Small trades (under $1,000) typically have minimal impact</li>
              <li>• Large trades may have 1-5% price impact</li>
              <li>• Consider splitting large trades into smaller ones</li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-6 bg-card">
            <h3 className="text-lg font-semibold mb-2">Gas Fees</h3>
            <p className="text-muted-foreground mb-4">
              All transactions on Solana require a small fee paid in SOL. These fees are very low 
              compared to other blockchains, typically less than $0.01.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Gas fees are paid in SOL regardless of what tokens you're swapping</li>
              <li>• Fees are calculated automatically and shown before confirmation</li>
              <li>• Keep at least 0.01 SOL in your wallet for transaction fees</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="mb-12 p-6 rounded-lg border bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
          Important Notes
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Always review the exchange rate before confirming the swap</li>
          <li>• Higher slippage tolerance may result in better execution but less predictable output</li>
          <li>• Gas fees are paid in SOL and vary based on network congestion</li>
          <li>• Large swaps may have price impact - check the estimated impact before confirming</li>
          <li>• Transactions are irreversible once confirmed on-chain</li>
        </ul>
      </div>

      {/* Common Questions */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Common Questions</h2>
        <div className="space-y-4">
          <div className="border rounded-lg p-6 bg-card">
            <h3 className="text-lg font-semibold mb-2">Why did my swap fail?</h3>
            <p className="text-muted-foreground">
              Swaps can fail for several reasons: insufficient SOL for gas fees, slippage tolerance too low, 
              insufficient token balance, or network congestion. Try increasing slippage tolerance or check your balances.
            </p>
          </div>
          
          <div className="border rounded-lg p-6 bg-card">
            <h3 className="text-lg font-semibold mb-2">How long do swaps take?</h3>
            <p className="text-muted-foreground">
              Most swaps on Solana are confirmed within 1-2 seconds. If a transaction takes longer, 
              it may be due to network congestion or the transaction may have failed.
            </p>
          </div>
          
          <div className="border rounded-lg p-6 bg-card">
            <h3 className="text-lg font-semibold mb-2">Can I cancel a swap?</h3>
            <p className="text-muted-foreground">
              Once you've confirmed a swap in your wallet, it cannot be cancelled. However, if the transaction 
              fails due to slippage or other issues, no tokens will be swapped and you'll only lose the gas fee.
            </p>
          </div>
          
          <div className="border rounded-lg p-6 bg-card">
            <h3 className="text-lg font-semibold mb-2">What's the minimum swap amount?</h3>
            <p className="text-muted-foreground">
              There's no minimum swap amount, but you need enough SOL to cover gas fees. For very small amounts, 
              the gas fee might be a significant percentage of your swap value.
            </p>
          </div>
        </div>
      </div>

      {/* Related Topics */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">Related Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            href="/docs/trading/perpetuals"
            className="group p-4 rounded-lg border bg-card hover:bg-accent/50 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  Perpetuals Trading
                </h3>
                <p className="text-sm text-muted-foreground">
                  Learn about perpetual futures trading
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
          <Link
            href="/docs/pools/overview"
            className="group p-4 rounded-lg border bg-card hover:bg-accent/50 transition-all duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  Liquidity Pools
                </h3>
                <p className="text-sm text-muted-foreground">
                  Provide liquidity and earn trading fees
                </p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
