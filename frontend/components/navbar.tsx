"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { Search, Menu, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useScroll } from "@/hooks/useScroll"
import { useSearch } from "@/hooks/useSearch"
import { NavLinks } from "@/components/NavLinks"
import { SearchResults } from "@/components/SearchResults"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const isScrolled = useScroll()
  const search = useSearch()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-30 bg-black/60 backdrop-blur-sm transition-all",
      isScrolled && "shadow-lg"
    )}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side: Logo and Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo - Hidden on mobile when search is open */}
            <Link href="/" className={cn(
              "flex-shrink-0",
              "md:block", // Always visible on desktop
              search.isSearchOpen ? "hidden" : "block" // Toggle visibility on mobile
            )}>
              <span className="text-white text-2xl font-bold">PYLEX</span>
              <span className="text-white text-2xl font-light">WATCH</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <NavLinks />
            </div>
          </div>

          {/* Right side: Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <form onSubmit={search.handleSearchSubmit} className="flex items-center">
                <div className={cn(
                  "flex items-center transition-all duration-300",
                  search.isSearchOpen ? "w-[calc(100vw-120px)] md:w-64 border-b border-white" : "w-8"
                )}>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-8 w-8 p-0 rounded-2xl backdrop-blur-sm opacity-75 transition-all duration-300",
                      search.isSearchOpen && "mr-2"
                    )}
                    onClick={search.toggleSearch}
                  >
                    <Search className="h-5 w-5 text-white" />
                  </Button>
                  {search.isSearchOpen && (
                    <Input
                      ref={searchInputRef}
                      type="search"
                      placeholder="Search titles..."
                      className="bg-transparent text-white border-none focus:ring-0 p-0 h-8 placeholder-gray-400"
                      value={search.searchQuery}
                      onChange={(e) => search.setSearchQuery(e.target.value)}
                    />
                  )}
                </div>
              </form>

              {/* Search Results Dropdown */}
              {search.isSearchOpen && search.searchQuery.trim() !== "" && (
                <div className="absolute top-full right-0 w-full mt-2 bg-white/80 backdrop-blur-sm rounded-md shadow-lg overflow-hidden dark:bg-neutral-950/80 max-w-xl">
                  <SearchResults 
                    results={search.searchResults}
                    loading={search.loading}
                  />
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu} 
              className="md:hidden text-white focus:outline-none"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "md:hidden transition-all duration-300 overflow-hidden",
          isMobileMenuOpen ? "max-h-64" : "max-h-0"
        )}>
          <div className="py-4 space-y-4">
            <NavLinks mobile />
          </div>
        </div>
      </div>
    </nav>
  )
}