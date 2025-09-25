import { ReactNode } from "react"
import { DocsSidebar } from "@/components/docs/docs-sidebar"

export default function DocsLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-80 border-r bg-card/50 sticky top-0 h-screen overflow-y-auto">
          <DocsSidebar />
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="max-w-4xl mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}





















