"use client"

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { fetchSearchResults } from '@/lib/api'
import type { MediaType } from '@/types/MediaType';
import { SearchResult } from '@/types/SearchResult';

export type { SearchResult } from '@/types/SearchResult';

export function useSearch() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    if (searchQuery.trim() === "") {
      setSearchResults([])
      return
    }

    searchTimeoutRef.current = setTimeout(() => {
      fetchResults(searchQuery)
    }, 300)

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [searchQuery])

  const fetchResults = async (query: string) => {
    if (query.trim() === "") return

    setLoading(true)
    setError(null)

    try {
      const data = await fetchSearchResults(query)
      
      if (data.success) {
        setSearchResults(data.data.slice(0, 5))
      } else {
        setError('Search failed')
        setSearchResults([])
      }
    } catch (err) {
      setError('Failed to fetch search results')
      setSearchResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen)
    if (!isSearchOpen) {
      setSearchQuery("")
      setSearchResults([])
    }
  }

  const handleMoreInfo = (id: number, type: MediaType) => {
    const event = new CustomEvent('openTitleDetails', { detail: { id, type } })
    window.dispatchEvent(event)
  }

  return {
    isSearchOpen,
    searchQuery,
    searchResults,
    loading,
    error,
    setSearchQuery,
    handleSearchSubmit,
    toggleSearch,
    handleMoreInfo,
    fetchResults,
    searchTimeoutRef
  }
}