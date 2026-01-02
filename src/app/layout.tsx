import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ShopHeader from "@/src/components/shop-header"
import { Toaster } from "@/src/components/ui/sonner"
import { CartProvider } from "@/src/features/cart/context/cart-context"
import { AuthProvider } from "@/src/features/auth/context/auth-context"

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
        <AuthProvider>
          <CartProvider>
            <ShopHeader />
            {children}
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
