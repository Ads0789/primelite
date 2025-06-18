"use client";

import Link from 'next/link';
import { ShoppingCart, Shield, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';

export default function Header() {
  const { getCartItemCount } = useCart();
  const [itemCount, setItemCount] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      setItemCount(getCartItemCount());
    }
  }, [isClient, getCartItemCount, useCart().cartItems]); // Re-run when cartItems change

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="PrimeLite Homepage">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-primary">
            <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26ZM12.0006 15.968L16.2473 18.3451L15.2988 13.5718L18.8692 10.2918L14.0252 9.69006L12.0006 5.2718L9.97596 9.69006L5.13197 10.2918L8.70241 13.5718L7.7539 18.3451L12.0006 15.968Z"></path>
          </svg>
          <span className="font-headline text-2xl font-bold text-primary">PrimeLite</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/" aria-label="Home">
              <Home className="h-5 w-5" />
              <span className="ml-2 hidden sm:inline">Home</span>
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/cart" className="relative" aria-label={`Shopping Cart, ${itemCount} items`}>
              <ShoppingCart className="h-5 w-5" />
              {isClient && itemCount > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 items-center justify-center rounded-full p-0 text-xs">
                  {itemCount}
                </Badge>
              )}
              <span className="ml-2 hidden sm:inline">Cart</span>
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/admin" aria-label="Admin Panel">
              <Shield className="h-5 w-5" />
              <span className="ml-2 hidden sm:inline">Admin</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
