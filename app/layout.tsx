import type React from "react"
import type { Metadata } from "next"
import { Press_Start_2P, Inter } from "next/font/google" // Import Press Start 2P for retro font
import "./globals.css"
import "./theme-utilities.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "sonner"
import { Providers } from './providers' // Import the new provider


// Configure fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const pressStart2P = Press_Start_2P({
  weight: ["400"], // Press Start 2P only has 400 weight
  subsets: ["latin"],
  variable: "--font-retro", // New variable for retro font
  display: "swap",
})

export const metadata: Metadata = {
  title: "ZeroLag Dashboard",
  description: "Discipline-as-a-Service for Students, Freelancers, and Productivity Enthusiasts",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${pressStart2P.variable}`}>
      <body className="bg-background font-body text-text min-h-screen">
        {/* If you want to keep theme switching, keep ThemeProvider. Otherwise, remove it for static light theme. */}
        <Providers>
          {/* If you want to keep theme switching, keep ThemeProvider. */}
          {/* You can wrap it inside or outside Providers, it's fine. */}
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}

