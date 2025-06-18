"use client";

import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { calculateSalesTax, type CalculateSalesTaxInput } from '@/ai/flows/calculate-sales-tax';
import { useToast } from '@/hooks/use-toast';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function CheckoutPage() {
  const { cartItems, getCartSubtotal, clearCart, getCartItemCount } = useCart();
  const router = useRouter();
  const { toast } = useToast();

  const [taxRate, setTaxRate] = useState(0.08); // Default 8% tax rate
  const [salesTax, setSalesTax] = useState<number | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [isLoadingTax, setIsLoadingTax] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = getCartSubtotal();

  useEffect(() => {
    if (cartItems.length === 0 && !orderPlaced) {
      toast({
        title: "Empty Cart",
        description: "Your cart is empty. Redirecting to homepage...",
      });
      router.push('/');
    }
  }, [cartItems, orderPlaced, router, toast]);

  const handleCalculateTax = async () => {
    setIsLoadingTax(true);
    setSalesTax(null);
    setTotal(null);
    try {
      const input: CalculateSalesTaxInput = { subtotal, taxRate };
      const result = await calculateSalesTax(input);
      setSalesTax(result.salesTax);
      setTotal(result.total);
    } catch (error) {
      console.error("Error calculating sales tax:", error);
      toast({
        title: "Tax Calculation Failed",
        description: "Could not calculate taxes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingTax(false);
    }
  };
  
  useEffect(() => {
    // Automatically calculate tax when subtotal or taxRate changes
    if (subtotal > 0) {
      handleCalculateTax();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subtotal, taxRate]);


  const handlePlaceOrder = async () => {
    if (total === null) {
      toast({
        title: "Calculate Total First",
        description: "Please calculate the total amount before placing an order.",
        variant: "destructive",
      });
      return;
    }
    setIsPlacingOrder(true);
    // Simulate order placement
    await new Promise(resolve => setTimeout(resolve, 1500));
    clearCart();
    setOrderPlaced(true);
    setIsPlacingOrder(false);
    toast({
      title: "Order Placed!",
      description: "Thank you for your purchase. Your order has been placed successfully.",
    });
  };

  if (orderPlaced) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <CheckCircle2 className="mx-auto h-24 w-24 text-green-500 mb-6" />
        <h1 className="font-headline text-3xl font-semibold mb-3">Order Confirmed!</h1>
        <p className="text-muted-foreground mb-8">
          Your order has been placed successfully. Thank you for shopping with PrimeLite!
        </p>
        <Button asChild size="lg">
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }
  
  if (getCartItemCount() === 0) {
     return <LoadingSpinner />; // Or a message indicating redirection
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="font-headline text-4xl font-semibold mb-8 text-center">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {cartItems.map(item => (
              <div key={item.product.id} className="flex justify-between items-center text-sm border-b pb-2">
                <div>
                  <p className="font-medium">{item.product.title}</p>
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p>${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="pt-3 font-medium text-base">
              <div className="flex justify-between">
                <p>Subtotal:</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="taxRate">Tax Rate (%)</Label>
              <Input
                id="taxRate"
                type="number"
                value={taxRate * 100}
                onChange={e => setTaxRate(parseFloat(e.target.value) / 100)}
                min="0"
                step="0.1"
                className="mt-1"
              />
               <p className="text-xs text-muted-foreground mt-1">Enter tax rate as a percentage (e.g., 8 for 8%).</p>
            </div>
            
            {isLoadingTax && <LoadingSpinner size="sm" />}

            {salesTax !== null && total !== null && !isLoadingTax && (
              <div className="space-y-2 pt-2 border-t">
                <div className="flex justify-between text-md">
                  <p>Sales Tax:</p>
                  <p>${salesTax.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-xl font-bold text-primary">
                  <p>Grand Total:</p>
                  <p>${total.toFixed(2)}</p>
                </div>
              </div>
            )}

            {total === null && !isLoadingTax && subtotal > 0 && (
               <Alert variant="default" className="mt-4">
                 <AlertCircle className="h-4 w-4" />
                 <AlertTitle>Tax Calculation</AlertTitle>
                 <AlertDescription>
                   Tax and total will be calculated. You can adjust the tax rate above.
                 </AlertDescription>
               </Alert>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              size="lg" 
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-3" 
              onClick={handlePlaceOrder}
              disabled={isPlacingOrder || total === null || isLoadingTax}
            >
              {isPlacingOrder ? <LoadingSpinner size="sm" /> : 'Place Order'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
