import Link from "next/link"
import { 
  Code, 
  Copy, 
  Eye,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Info
} from "lucide-react"

const components = [
  {
    name: "Button",
    description: "A versatile button component with multiple variants and sizes",
    usage: "Use for primary actions, secondary actions, and destructive actions",
    variants: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    sizes: ["default", "sm", "lg", "icon"],
    example: `<Button variant="default" size="default">
  Click me
</Button>`,
    props: [
      { name: "variant", type: "string", default: "default", description: "Visual style variant" },
      { name: "size", type: "string", default: "default", description: "Size of the button" },
      { name: "disabled", type: "boolean", default: "false", description: "Whether the button is disabled" },
      { name: "onClick", type: "function", default: "undefined", description: "Click handler function" }
    ]
  },
  {
    name: "Card",
    description: "A flexible container component for grouping related content",
    usage: "Use to group related information and create visual separation",
    variants: ["default", "outlined", "elevated"],
    sizes: ["default", "sm", "lg"],
    example: `<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>`,
    props: [
      { name: "variant", type: "string", default: "default", description: "Visual style variant" },
      { name: "className", type: "string", default: "undefined", description: "Additional CSS classes" }
    ]
  },
  {
    name: "Input",
    description: "A form input component with built-in styling and validation states",
    usage: "Use for text input, number input, and other form fields",
    variants: ["default", "error", "success", "disabled"],
    sizes: ["default", "sm", "lg"],
    example: `<Input 
  type="text" 
  placeholder="Enter your text"
  value={value}
  onChange={handleChange}
/>`,
    props: [
      { name: "type", type: "string", default: "text", description: "Input type (text, email, password, etc.)" },
      { name: "placeholder", type: "string", default: "undefined", description: "Placeholder text" },
      { name: "value", type: "string", default: "undefined", description: "Input value" },
      { name: "onChange", type: "function", default: "undefined", description: "Change handler function" },
      { name: "disabled", type: "boolean", default: "false", description: "Whether the input is disabled" }
    ]
  },
  {
    name: "Badge",
    description: "A small status indicator component for labels and notifications",
    usage: "Use to display status, categories, or short labels",
    variants: ["default", "secondary", "destructive", "outline"],
    sizes: ["default", "sm", "lg"],
    example: `<Badge variant="default">Active</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Pending</Badge>`,
    props: [
      { name: "variant", type: "string", default: "default", description: "Visual style variant" },
      { name: "size", type: "string", default: "default", description: "Size of the badge" }
    ]
  },
  {
    name: "Dialog",
    description: "A modal dialog component for overlays and popups",
    usage: "Use for confirmations, forms, and content that needs focus",
    variants: ["default", "fullscreen", "centered"],
    sizes: ["default", "sm", "md", "lg", "xl"],
    example: `<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    <p>Dialog content goes here</p>
  </DialogContent>
</Dialog>`,
    props: [
      { name: "open", type: "boolean", default: "false", description: "Whether the dialog is open" },
      { name: "onOpenChange", type: "function", default: "undefined", description: "Open state change handler" }
    ]
  },
  {
    name: "Tabs",
    description: "A tabbed interface component for organizing content",
    usage: "Use to organize related content into separate panels",
    variants: ["default", "pills", "underline"],
    sizes: ["default", "sm", "lg"],
    example: `<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>`,
    props: [
      { name: "defaultValue", type: "string", default: "undefined", description: "Default active tab" },
      { name: "value", type: "string", default: "undefined", description: "Controlled active tab" },
      { name: "onValueChange", type: "function", default: "undefined", description: "Tab change handler" }
    ]
  }
]

export default function UIComponentsPage() {
  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Code className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">UI Components</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          A comprehensive collection of reusable UI components built with React and Tailwind CSS. 
          These components follow our design system and are optimized for DeFi applications.
        </p>
      </div>

      {/* Installation */}
      <div className="mb-8 p-6 rounded-lg border bg-card">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
          Installation
        </h2>
        <p className="text-muted-foreground mb-4">
          All UI components are already included in the DeFi Nexus project. Simply import them from the components directory:
        </p>
        <div className="bg-muted rounded-md p-4 relative">
          <button className="absolute top-2 right-2 p-1 hover:bg-muted-foreground/10 rounded">
            <Copy className="h-4 w-4 text-muted-foreground" />
          </button>
          <pre className="text-sm text-muted-foreground overflow-x-auto">
            <code>{`import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"`}</code>
          </pre>
        </div>
      </div>

      {/* Components */}
      <div className="space-y-12">
        {components.map((component, index) => (
          <div key={index} className="border rounded-lg p-6 bg-card">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">{component.name}</h2>
              <p className="text-muted-foreground mb-4">{component.description}</p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-blue-500" />
                  <span className="text-muted-foreground">Usage:</span>
                  <span>{component.usage}</span>
                </div>
              </div>
            </div>

            {/* Variants and Sizes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-medium mb-3">Variants</h3>
                <div className="flex flex-wrap gap-2">
                  {component.variants.map((variant) => (
                    <span key={variant} className="px-2 py-1 text-xs bg-muted rounded-md">
                      {variant}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-3">Sizes</h3>
                <div className="flex flex-wrap gap-2">
                  {component.sizes.map((size) => (
                    <span key={size} className="px-2 py-1 text-xs bg-muted rounded-md">
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Example */}
            <div className="mb-6">
              <h3 className="font-medium mb-3 flex items-center">
                <Code className="h-4 w-4 mr-2 text-blue-500" />
                Example
              </h3>
              <div className="bg-muted rounded-md p-4 relative">
                <button className="absolute top-2 right-2 p-1 hover:bg-muted-foreground/10 rounded">
                  <Copy className="h-4 w-4 text-muted-foreground" />
                </button>
                <pre className="text-sm text-muted-foreground overflow-x-auto">
                  <code>{component.example}</code>
                </pre>
              </div>
            </div>

            {/* Props */}
            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <Info className="h-4 w-4 mr-2 text-blue-500" />
                Props
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3">Name</th>
                      <th className="text-left py-2 px-3">Type</th>
                      <th className="text-left py-2 px-3">Default</th>
                      <th className="text-left py-2 px-3">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {component.props.map((prop, propIndex) => (
                      <tr key={propIndex} className="border-b">
                        <td className="py-2 px-3 font-mono text-primary">{prop.name}</td>
                        <td className="py-2 px-3 text-muted-foreground">{prop.type}</td>
                        <td className="py-2 px-3 text-muted-foreground">{prop.default}</td>
                        <td className="py-2 px-3 text-muted-foreground">{prop.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Best Practices */}
      <div className="mt-12 p-6 rounded-lg border bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <h3 className="text-lg font-semibold mb-2 flex items-center">
          <AlertCircle className="h-5 w-5 mr-2 text-blue-500" />
          Best Practices
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Always use semantic HTML elements when possible</li>
          <li>• Provide proper accessibility attributes (aria-labels, roles)</li>
          <li>• Use consistent spacing and sizing throughout your application</li>
          <li>• Test components in both light and dark modes</li>
          <li>• Keep component props minimal and focused</li>
          <li>• Use TypeScript for better type safety and developer experience</li>
        </ul>
      </div>

      {/* Next Steps */}
      <div className="mt-8">
        <div className="flex items-center justify-between p-6 rounded-lg border bg-card">
          <div>
            <h3 className="font-semibold text-lg mb-2">Ready to build?</h3>
            <p className="text-muted-foreground text-sm">
              Explore more components and learn how to create custom layouts.
            </p>
          </div>
          <Link
            href="/docs/components/layout"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-md hover:bg-primary/20 transition-colors"
          >
            Layout Components
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  )
}








