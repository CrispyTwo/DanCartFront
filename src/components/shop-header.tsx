"use client"

import Link from "next/link"
import { User, ShoppingCart } from "lucide-react"
import { Button } from "./ui/button"
import { useCartContext } from "../features/cart/context/cart-context"
import { useAuthContext } from "../features/auth/context/auth-context"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

export default function ShopHeader() {
  const { itemCount } = useCartContext()
  const { isAuthenticated, isAdmin, logout } = useAuthContext()

  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-2 max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
          Dan Cart
        </Link>

        <div className="flex items-center gap-2">
          {isAuthenticated && isAdmin && (
            <Button variant="ghost" asChild>
              <Link href="/admin/products">Admin Portal</Link>
            </Button>
          )}
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="rounded-full relative" aria-label="Shopping cart">
              <ShoppingCart className="h-5 w-5" />
              {isAuthenticated && itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
          </Link>
          {!isAuthenticated ? (
            <Link href="/auth">
              <Button variant="ghost" size="icon" className="rounded-full" aria-label="Sign in">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full" aria-label="User account">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/user/profile" className="cursor-pointer w-full">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/user/orders" className="cursor-pointer w-full">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}
