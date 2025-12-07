import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ShopHeader from "@/src/components/shop-header"
import { Toaster } from "@/src/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "E-Commerce website",
  description: "Ecommerce website",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ShopHeader />
        {children}
        <Toaster />
      </body>
    </html>
  )
}
