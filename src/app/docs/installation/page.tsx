import { 
  Download, 
  Terminal, 
  CheckCircle, 
  AlertCircle,
  Copy,
  ExternalLink
} from "lucide-react"

const installationSteps = [
  {
    title: "Prerequisites",
    description: "Make sure you have the required tools installed",
    items: [
      "Node.js 18.0 or higher",
      "pnpm package manager (recommended) or npm",
      "Git for version control",
      "A code editor like VS Code"
    ],
    code: `# Check Node.js version
node --version

# Check pnpm version
pnpm --version

# If pnpm is not installed
npm install -g pnpm`
  },
  {
    title: "Clone the Repository",
    description: "Get the DeFi Nexus source code",
    items: [
      "Clone the repository from GitHub",
      "Navigate to the project directory",
      "Install dependencies"
    ],
    code: `# Clone the repository
git clone https://github.com/definexus/defi-nexus-frontend.git

# Navigate to the project
cd defi-nexus-frontend

# Install dependencies
pnpm install`
  },
  {
    title: "Environment Setup",
    description: "Configure your environment variables",
    items: [
      "Copy the example environment file",
      "Configure your RPC endpoints",
      "Set up API keys if needed"
    ],
    code: `# Copy environment file
cp .env.example .env.local

# Edit the environment file
# Add your Solana RPC endpoint
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com

# Add other configuration as needed`
  },
  {
    title: "Run the Development Server",
    description: "Start the local development server",
    items: [
      "Start the development server",
      "Open your browser to localhost:3000",
      "Connect your wallet to test the application"
    ],
    code: `# Start development server
pnpm dev

# The application will be available at
# http://localhost:3000`
  }
]

const requirements = [
  {
    name: "Node.js",
    version: "18.0+",
    description: "JavaScript runtime environment",
    link: "https://nodejs.org/"
  },
  {
    name: "pnpm",
    version: "8.0+",
    description: "Fast, disk space efficient package manager",
    link: "https://pnpm.io/"
  },
  {
    name: "Git",
    version: "2.0+",
    description: "Version control system",
    link: "https://git-scm.com/"
  }
]

export default function InstallationPage() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Download className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Installation Guide</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Get DeFi Nexus up and running on your local machine. Follow these steps to set up 
          the development environment and start building.
        </p>
      </div>

      {/* Requirements */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">System Requirements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {requirements.map((req, index) => (
            <div key={index} className="p-6 rounded-lg border bg-card">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">{req.name}</h3>
                <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                  {req.version}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{req.description}</p>
              <a
                href={req.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Download
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Installation Steps */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Installation Steps</h2>
        <div className="space-y-8">
          {installationSteps.map((step, index) => (
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
                        What you'll do:
                      </h4>
                      <ul className="space-y-2">
                        {step.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-sm text-muted-foreground flex items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-3 flex items-center">
                        <Terminal className="h-4 w-4 mr-2 text-blue-500" />
                        Commands:
                      </h4>
                      <div className="bg-muted rounded-md p-4 relative">
                        <button className="absolute top-2 right-2 p-1 hover:bg-muted-foreground/10 rounded">
                          <Copy className="h-4 w-4 text-muted-foreground" />
                        </button>
                        <pre className="text-sm text-muted-foreground overflow-x-auto">
                          <code>{step.code}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verification */}
      <div className="mb-12 p-6 rounded-lg border bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
          Verify Installation
        </h3>
        <p className="text-muted-foreground text-sm mb-4">
          Once you've completed the installation, verify everything is working correctly:
        </p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• The development server should start without errors</li>
          <li>• You should see the DeFi Nexus homepage at localhost:3000</li>
          <li>• You should be able to connect your wallet</li>
          <li>• All navigation links should work properly</li>
        </ul>
      </div>

      {/* Troubleshooting */}
      <div className="mb-12 p-6 rounded-lg border bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 text-yellow-500" />
          Common Issues
        </h3>
        <div className="space-y-4 text-sm">
          <div>
            <h4 className="font-medium text-foreground">Port 3000 is already in use</h4>
            <p className="text-muted-foreground">
              Use a different port: <code className="bg-muted px-1 rounded">pnpm dev --port 3001</code>
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground">Dependencies installation fails</h4>
            <p className="text-muted-foreground">
              Try clearing the cache: <code className="bg-muted px-1 rounded">pnpm store prune</code>
            </p>
          </div>
          <div>
            <h4 className="font-medium text-foreground">Build errors</h4>
            <p className="text-muted-foreground">
              Make sure you're using the correct Node.js version and all dependencies are installed.
            </p>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="p-6 rounded-lg border bg-card">
        <h3 className="text-lg font-semibold mb-2">What's Next?</h3>
        <p className="text-muted-foreground text-sm mb-4">
          Now that you have DeFi Nexus installed, you can start exploring the platform and building your own features.
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
            href="/docs/configuration"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-md hover:bg-primary/20 transition-colors"
          >
            <Terminal className="h-4 w-4 mr-2" />
            Configuration
          </a>
          <a
            href="/docs/components/ui"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-md hover:bg-primary/20 transition-colors"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            UI Components
          </a>
        </div>
      </div>
    </div>
  )
}
















