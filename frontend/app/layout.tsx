import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PlexWatch - Free Movies & TV Shows Online",
  description: "Watch movies and TV shows online for free in HD quality. Stream the latest releases, popular series, and classic content without any subscription.",
  keywords: "movies, tv shows, streaming, free movies, watch online, HD movies",
  openGraph: {
    title: "PlexWatch - Free Movies & TV Shows Online",
    description: "Watch movies and TV shows online for free in HD quality. Stream the latest releases, popular series, and classic content without any subscription.",
    type: "website",
    locale: "en_US",
    siteName: "PlexWatch",
  },
  robots: "index, follow",
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  referrer: "origin"
}
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "text-gray-100 min-h-screen")}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

