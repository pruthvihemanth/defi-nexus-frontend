import { 
  Settings, 
  Code, 
  Copy, 
  AlertCircle,
  CheckCircle,
  Info
} from "lucide-react"

const configSections = [
  {
    title: "Environment Variables",
    description: "Configure your application environment",
    variables: [
      {
        name: "NEXT_PUBLIC_SOLANA_RPC_URL",
        type: "string",
        required: true,
        description: "Solana RPC endpoint URL",
        example: "https://api.mainnet-beta.solana.com",
        note: "Use a reliable RPC provider for better performance"
      },
      {
        name: "NEXT_PUBLIC_SOLANA_NETWORK",
        type: "string",
        required: false,
        description: "Solana network (mainnet-beta, testnet, devnet)",
        example: "mainnet-beta",
        note: "Defaults to mainnet-beta if not specified"
      },
      {
        name: "NEXT_PUBLIC_APP_NAME",
        type: "string",
        required: false,
        description: "Application name for wallet connections",
        example: "DeFi Nexus",
        note: "This appears in wallet connection prompts"
      },
      {
        name: "NEXT_PUBLIC_APP_URL",
        type: "string",
        required: false,
        description: "Application URL for wallet connections",
        example: "https://definexus.com",
        note: "Used for wallet connection metadata"
      }
    ]
  },
  {
    title: "Wallet Configuration",
    description: "Configure wallet providers and settings",
    variables: [
      {
        name: "NEXT_PUBLIC_WALLET_ADAPTER_NETWORK",
        type: "string",
        required: false,
        description: "Network for wallet adapters",
        example: "mainnet-beta",
        note: "Should match your Solana network"
      },
      {
        name: "NEXT_PUBLIC_AUTO_CONNECT",
        type: "boolean",
        required: false,
        description: "Automatically connect wallet on page load",
        example: "false",
        note: "Set to true for better UX, false for privacy"
      }
    ]
  },
  {
    title: "API Configuration",
    description: "Configure external API endpoints",
    variables: [
      {
        name: "NEXT_PUBLIC_COINGECKO_API_URL",
        type: "string",
        required: false,
        description: "CoinGecko API URL for price data",
        example: "https://api.coingecko.com/api/v3",
        note: "Used for token price information"
      },
      {
        name: "NEXT_PUBLIC_DEXSCREENER_API_URL",
        type: "string",
        required: false,
        description: "DexScreener API URL for DEX data",
        example: "https://api.dexscreener.com/latest",
        note: "Used for trading pair information"
      }
    ]
  }
]

const rpcProviders = [
  {
    name: "Solana Labs",
    url: "https://api.mainnet-beta.solana.com",
    description: "Official Solana RPC endpoint",
    pros: ["Free", "Official"],
    cons: ["Rate limited", "Can be slow"]
  },
  {
    name: "QuickNode",
    url: "https://your-endpoint.solana-mainnet.quiknode.pro/",
    description: "Premium RPC provider with high performance",
    pros: ["Fast", "Reliable", "High rate limits"],
    cons: ["Paid service"]
  },
  {
    name: "Alchemy",
    url: "https://solana-mainnet.g.alchemy.com/v2/",
    description: "Enterprise-grade RPC infrastructure",
    pros: ["Fast", "Reliable", "Good documentation"],
    cons: ["Paid service"]
  },
  {
    name: "Helius",
    url: "https://mainnet.helius-rpc.com/",
    description: "Solana-focused RPC provider",
    pros: ["Solana optimized", "Good performance"],
    cons: ["Paid service"]
  }
]

export default function ConfigurationPage() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Settings className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Configuration Guide</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Learn how to configure DeFi Nexus for your specific needs. This guide covers 
          environment variables, wallet settings, and API configurations.
        </p>
      </div>

      {/* Environment Setup */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Environment Setup</h2>
        <div className="p-6 rounded-lg border bg-card mb-6">
          <h3 className="text-lg font-semibold mb-3">Create Environment File</h3>
          <p className="text-muted-foreground mb-4">
            Create a <code className="bg-muted px-1 rounded">.env.local</code> file in your project root:
          </p>
          <div className="bg-muted rounded-md p-4 relative">
            <button className="absolute top-2 right-2 p-1 hover:bg-muted-foreground/10 rounded">
              <Copy className="h-4 w-4 text-muted-foreground" />
            </button>
            <pre className="text-sm text-muted-foreground overflow-x-auto">
              <code>{`# Copy this to .env.local
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
NEXT_PUBLIC_APP_NAME=DeFi Nexus
NEXT_PUBLIC_APP_URL=https://definexus.com`}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Configuration Sections */}
      <div className="space-y-12">
        {configSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="border rounded-lg p-6 bg-card">
            <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
            <p className="text-muted-foreground mb-6">{section.description}</p>
            
            <div className="space-y-6">
              {section.variables.map((variable, variableIndex) => (
                <div key={variableIndex} className="border rounded-lg p-4 bg-muted/30">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <code className="text-primary font-mono text-sm bg-muted px-2 py-1 rounded">
                          {variable.name}
                        </code>
                        <span className={`text-xs px-2 py-1 rounded ${
                          variable.required 
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' 
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'
                        }`}>
                          {variable.required ? 'Required' : 'Optional'}
                        </span>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                          {variable.type}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{variable.description}</p>
                      {variable.note && (
                        <p className="text-xs text-muted-foreground italic">{variable.note}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-muted rounded-md p-3 relative">
                    <button className="absolute top-2 right-2 p-1 hover:bg-muted-foreground/10 rounded">
                      <Copy className="h-3 w-3 text-muted-foreground" />
                    </button>
                    <pre className="text-xs text-muted-foreground overflow-x-auto">
                      <code>{`${variable.name}=${variable.example}`}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* RPC Providers */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">RPC Provider Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rpcProviders.map((provider, index) => (
            <div key={index} className="border rounded-lg p-6 bg-card">
              <h3 className="font-semibold mb-2">{provider.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{provider.description}</p>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">URL:</h4>
                <code className="text-xs bg-muted px-2 py-1 rounded break-all">
                  {provider.url}
                </code>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <h4 className="text-sm font-medium text-green-600 dark:text-green-400 mb-1">Pros:</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {provider.pros.map((pro, proIndex) => (
                      <li key={proIndex}>• {pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">Cons:</h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {provider.cons.map((con, conIndex) => (
                      <li key={conIndex}>• {con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Best Practices */}
      <div className="mb-12 p-6 rounded-lg border bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <Info className="h-5 w-5 mr-2 text-blue-500" />
          Best Practices
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Never commit your <code className="bg-muted px-1 rounded">.env.local</code> file to version control</li>
          <li>• Use different RPC endpoints for development and production</li>
          <li>• Consider using a premium RPC provider for better performance</li>
          <li>• Test your configuration in a development environment first</li>
          <li>• Keep your API keys secure and rotate them regularly</li>
          <li>• Use environment-specific configurations for different deployments</li>
        </ul>
      </div>

      {/* Security Notes */}
      <div className="mb-12 p-6 rounded-lg border bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 text-yellow-500" />
          Security Considerations
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Variables prefixed with <code className="bg-muted px-1 rounded">NEXT_PUBLIC_</code> are exposed to the browser</li>
          <li>• Never put sensitive data in public environment variables</li>
          <li>• Use server-side environment variables for API keys and secrets</li>
          <li>• Validate all environment variables at application startup</li>
          <li>• Use different configurations for different environments</li>
        </ul>
      </div>

      {/* Next Steps */}
      <div className="p-6 rounded-lg border bg-card">
        <h3 className="text-lg font-semibold mb-2">What's Next?</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Now that you've configured your environment, you can start building with DeFi Nexus.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="/docs/quick-start"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-md hover:bg-primary/20 transition-colors"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Quick Start Guide
          </a>
          <a
            href="/docs/components/ui"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-md hover:bg-primary/20 transition-colors"
          >
            <Code className="h-4 w-4 mr-2" />
            UI Components
          </a>
          <a
            href="/docs/trading/swap"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-md hover:bg-primary/20 transition-colors"
          >
            <Settings className="h-4 w-4 mr-2" />
            Trading Guide
          </a>
        </div>
      </div>
    </div>
  )
}






















