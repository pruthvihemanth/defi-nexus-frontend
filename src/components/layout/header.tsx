"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { NAVIGATION_ITEMS } from "@/constants/navigation"
import { AuthModal } from "@/components/modals/auth-modal"
import { MoreDropdown } from "@/components/layout/more-dropdown"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative h-9 w-9 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <img 
                    src="/dnx-logo-64.svg" 
                    alt="DNX Logo" 
                    className="w-full h-full rounded-xl"
                  />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-slate-900 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-700 transition-all duration-300">
                  DeFi Nexus
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground group",
                    pathname === item.href
                      ? "text-primary bg-accent"
                      : "text-muted-foreground"
                  )}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ease-out group-hover:w-full" />
                </Link>
              ))}
              <MoreDropdown />
            </nav>

            {/* Desktop Auth Button */}
            <div className="hidden md:flex items-center">
              <Button
                variant="gradient"
                onClick={() => setIsAuthModalOpen(true)}
                className="text-sm"
              >
                Connect Wallet
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 border-t">
                {NAVIGATION_ITEMS.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                      pathname === item.href
                        ? "text-primary bg-accent"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="px-3 py-2">
                  <MoreDropdown />
                </div>
                <div className="pt-4">
                  <Button
                    variant="gradient"
                    className="w-full"
                    onClick={() => {
                      setIsAuthModalOpen(true)
                      setIsMenuOpen(false)
                    }}
                  >
                    Connect Wallet
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  )
}





