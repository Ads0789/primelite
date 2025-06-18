"use client";

import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Trash2, MinusCircle, PlusCircle, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartSubtotal, getCartItemCount } = useCart();

  if (getCartItemCount() === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground mb-4" />
        <h1 className="font-headline text-3xl font-semibold mb-2">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild size="lg">
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="font-headline text-4xl font-semibold mb-8 text-center">Your Shopping Cart</h1>
      <div className="space-y-6">
        {cartItems.map(item => (
          <Card key={item.product.id} className="flex flex-col sm:flex-row items-center p-4 shadow-md">
            <div className="w-full sm:w-24 h-24 sm:h-auto flex-shrink-0 mb-4 sm:mb-0 sm:mr-4 rounded-md overflow-hidden">
              <Image
                src={item.product.image}
                alt={item.product.title}
                width={100}
                height={100}
                className="w-full h-full object-cover"
                data-ai-hint={item.product.dataAiHint || 'product cart'}
              />
            </div>
            <div className="flex-grow">
              <h2 className="text-lg font-semibold hover:text-primary">
                <Link href={`/product/${item.product.id}`}>{item.product.title}</Link>
              </h2>
              <p className="text-primary font-medium text-lg">${item.product.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center space-x-3 mt-4 sm:mt-0 sm:ml-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
                aria-label={`Decrease quantity of ${item.product.title}`}
              >
                <MinusCircle className="h-5 w-5" />
              </Button>
              <span className="text-lg w-8 text-center">{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                aria-label={`Increase quantity of ${item.product.title}`}
              >
                <PlusCircle className="h-5 w-5" />
              </Button>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-red-500 hover:text-red-700 mt-4 sm:mt-0 sm:ml-4" 
              onClick={() => removeFromCart(item.product.id)}
              aria-label={`Remove ${item.product.title} from cart`}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </Card>
        ))}
      </div>

      <Card className="mt-10 shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="text-lg">
          <div className="flex justify-between mb-2">
            <span>Subtotal ({getCartItemCount()} items):</span>
            <span className="font-semibold">${getCartSubtotal().toFixed(2)}</span>
          </div>
          <p className="text-sm text-muted-foreground">Shipping and taxes calculated at checkout.</p>
        </CardContent>
        <CardFooter>
          <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-3">
            <Link href="/checkout">Proceed to Checkout</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
