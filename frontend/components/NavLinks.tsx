"use client"

import Link from "next/link"

const links = [
  { href: "/", label: "Home" },
  { href: "/wishlist", label: "Wishlist" }
]

export function NavLinks({ mobile = false }: { mobile?: boolean }) {
  const baseClasses = mobile
    ? "block text-white hover:text-gray-300 transition-colors px-2 py-1"
    : "text-sm font-medium text-white hover:text-gray-300 transition-colors"

  return links.map(link => (
    <Link 
      key={link.href} 
      href={link.href} 
      className={baseClasses}
    >
      {link.label}
    </Link>
  ))
}