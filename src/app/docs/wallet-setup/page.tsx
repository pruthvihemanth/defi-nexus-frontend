import { 
  Wallet, 
  Shield, 
  Download, 
  CheckCircle, 
  AlertTriangle,
  ExternalLink,
  ArrowRight
} from "lucide-react"

const walletOptions = [
  {
    name: "Phantom",
    description: "The most popular Solana wallet with a user-friendly interface",
    features: ["Easy to use", "Built-in DEX", "NFT support", "Mobile app available"],
    downloadUrl: "https://phantom.app/",
    recommended: true
  },
  {
    name: "Solflare",
    description: "A secure and feature-rich wallet for Solana",
    features: ["Hardware wallet support", "Advanced features", "Staking interface", "Cross-platform"],
    downloadUrl: "https://solflare.com/",
    recommended: true
  },
  {
    name: "Backpack",
    description: "A modern wallet with integrated trading features",
    features: ["Built-in trading", "Social features", "Developer tools", "Fast transactions"],
    downloadUrl: "https://backpack.app/",
    recommended: false
  },
  {
    name: "Glow",
    description: "A lightweight and fast Solana wallet",
    features: ["Lightweight", "Fast setup", "Simple interface", "Secure"],
    downloadUrl: "https://glow.app/",
    recommended: false
  }
]

const setupSteps = [
  {
    step: 1,
    title: "Download and Install",
    description: "Choose and install your preferred Solana wallet",
    details: [
      "Visit the official website of your chosen wallet",
      "Download the browser extension or mobile app",
      "Follow the installation instructions",
      "Make sure you're downloading from the official source"
    ],
    tips: [
      "Always download from official websites to avoid scams",
      "Bookmark the official website for future reference",
      "Check reviews and ratings before installing"
    ]
  },
  {
    step: 2,
    title: "Create Your Wallet",
    description: "Set up your new wallet with proper security",
    details: [
      "Open the wallet application",
      "Choose 'Create New Wallet' or 'Get Started'",
      "Write down your seed phrase on paper (never digitally)",
      "Store your seed phrase in a safe, secure location",
      "Set a strong password for your wallet"
    ],
    tips: [
      "Never share your seed phrase with anyone",
      "Store your seed phrase in multiple secure locations",
      "Consider using a hardware wallet for large amounts"
    ]
  },
  {
    step: 3,
    title: "Secure Your Wallet",
    description: "Add extra security layers to protect your funds",
    details: [
      "Enable biometric authentication if available",
      "Set up transaction confirmations",
      "Review and understand the security settings",
      "Consider using a hardware wallet for additional security"
    ],
    tips: [
      "Enable all available security features",
      "Regularly update your wallet software",
      "Be cautious of phishing attempts"
    ]
  },
  {
    step: 4,
    title: "Connect to DeFi Nexus",
    description: "Link your wallet to start using DeFi Nexus",
    details: [
      "Visit DeFi Nexus in your browser",
      "Click the 'Connect Wallet' button",
      "Select your wallet from the list",
      "Approve the connection in your wallet",
      "Verify your wallet address is displayed correctly"
    ],
    tips: [
      "You can disconnect and reconnect anytime",
      "Only connect to trusted websites",
      "Check the connection permissions before approving"
    ]
  }
]

const securityTips = [
  {
    title: "Protect Your Seed Phrase",
    description: "Your seed phrase is the master key to your wallet",
    tips: [
      "Write it down on paper, never store digitally",
      "Store in multiple secure locations",
      "Never share with anyone, even support staff",
      "Consider using a metal backup for fire/water protection"
    ]
  },
  {
    title: "Verify Website URLs",
    description: "Always ensure you're on the correct website",
    tips: [
      "Bookmark official websites",
      "Check the URL carefully before entering information",
      "Look for HTTPS and security certificates",
      "Be wary of similar-looking domain names"
    ]
  },
  {
    title: "Use Hardware Wallets",
    description: "For large amounts, consider a hardware wallet",
    tips: [
      "Hardware wallets keep private keys offline",
      "Popular options: Ledger, Trezor",
      "More secure for long-term storage",
      "Still convenient for regular transactions"
    ]
  },
  {
    title: "Stay Updated",
    description: "Keep your wallet and browser updated",
    tips: [
      "Enable automatic updates when possible",
      "Check for updates regularly",
      "Update your browser and extensions",
      "Follow official announcements for security updates"
    ]
  }
]

export default function WalletSetupPage() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Wallet className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Connecting Your Wallet</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Learn how to set up and connect your Solana wallet to DeFi Nexus. We'll guide you through 
          choosing the right wallet, setting it up securely, and connecting it to our platform.
        </p>
      </div>

      {/* Wallet Options */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Recommended Wallets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {walletOptions.map((wallet, index) => (
            <div key={index} className={`border rounded-lg p-6 bg-card ${wallet.recommended ? 'ring-2 ring-primary/20' : ''}`}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{wallet.name}</h3>
                  {wallet.recommended && (
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md mb-2">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Recommended
                    </span>
                  )}
                </div>
              </div>
              <p className="text-muted-foreground text-sm mb-4">{wallet.description}</p>
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Key Features:</h4>
                <ul className="space-y-1">
                  {wallet.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-xs text-muted-foreground flex items-center">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={wallet.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-md hover:bg-primary/20 transition-colors"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
                <ExternalLink className="h-3 w-3 ml-2" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Setup Steps */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Setup Guide</h2>
        <div className="space-y-8">
          {setupSteps.map((step, index) => (
            <div key={index} className="border rounded-lg p-6 bg-card">
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
                        <Shield className="h-4 w-4 mr-2 text-blue-500" />
                        Security Tips:
                      </h4>
                      <ul className="space-y-2">
                        {step.tips.map((tip, tipIndex) => (
                          <li key={tipIndex} className="text-sm text-muted-foreground flex items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 mr-3 flex-shrink-0"></span>
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

      {/* Security Best Practices */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Security Best Practices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {securityTips.map((tip, index) => (
            <div key={index} className="border rounded-lg p-6 bg-card">
              <h3 className="text-lg font-semibold mb-2">{tip.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{tip.description}</p>
              <ul className="space-y-2">
                {tip.tips.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm text-muted-foreground flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Important Warnings */}
      <div className="mb-12 p-6 rounded-lg border bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2 text-red-500" />
          Important Security Warnings
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Never share your seed phrase with anyone - not even DeFi Nexus support</li>
          <li>• Always verify you're on the correct website before connecting your wallet</li>
          <li>• Be cautious of phishing attempts and fake websites</li>
          <li>• Only connect your wallet to trusted applications</li>
          <li>• Keep your wallet software updated to the latest version</li>
          <li>• Consider using a hardware wallet for large amounts of crypto</li>
        </ul>
      </div>

      {/* Next Steps */}
      <div className="p-6 rounded-lg border bg-card">
        <h3 className="text-lg font-semibold mb-2">Ready to Get Started?</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Now that you have your wallet set up, you're ready to start using DeFi Nexus!
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="/docs/quick-start"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-md hover:bg-primary/20 transition-colors"
          >
            <ArrowRight className="h-4 w-4 mr-2" />
            Quick Start Guide
          </a>
          <a
            href="/docs/trading/swap"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-md hover:bg-primary/20 transition-colors"
          >
            <ArrowRight className="h-4 w-4 mr-2" />
            Learn to Trade
          </a>
          <a
            href="/docs/resources/security"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-md hover:bg-primary/20 transition-colors"
          >
            <Shield className="h-4 w-4 mr-2" />
            Security Guide
          </a>
        </div>
      </div>
    </div>
  )
}





















