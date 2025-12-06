"use client"

import Link from "next/link"
import { User, ShoppingCart } from "lucide-react"
import { Button } from "./ui/button"

export default function ShopHeader() {
  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-2 max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
          ShopHub
        </Link>

        <div className="flex items-center gap-2">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Shopping cart">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="User account">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
