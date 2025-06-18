"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { getProductById } from '@/data/products';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShoppingCart, Star, ArrowLeft } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import Link from 'next/link';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const id = typeof params.id === 'string' ? params.id : undefined;

  useEffect(() => {
    if (id) {
      // Simulate API call
      setTimeout(() => {
        const foundProduct = getProductById(id);
        setProduct(foundProduct || null);
        setLoading(false);
      }, 300);
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-semibold">Product not found</h1>
        <p className="text-muted-foreground">The product you are looking for does not exist.</p>
        <Button asChild className="mt-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go back to Home
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="outline" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
      <Card className="overflow-hidden shadow-xl">
        <div className="grid md:grid-cols-2">
          <CardHeader className="p-0">
            <div className="aspect-square w-full">
              <Image
                src={product.image}
                alt={product.title}
                width={600}
                height={600}
                className="object-cover w-full h-full"
                data-ai-hint={product.dataAiHint || 'product detail'}
              />
            </div>
          </CardHeader>
          <CardContent className="p-6 flex flex-col justify-between">
            <div>
              <CardTitle className="font-headline text-3xl mb-2">{product.title}</CardTitle>
              {product.category && (
                <p className="text-sm text-accent font-medium mb-2">{product.category}</p>
              )}
              {product.rating && (
                <div className="flex items-center mb-4 text-muted-foreground">
                  <Star className="mr-1 h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span>{product.rating.rate.toFixed(1)} ({product.rating.count} reviews)</span>
                </div>
              )}
              <CardDescription className="text-base mb-6 leading-relaxed">
                {product.description}
              </CardDescription>
            </div>
            <div>
              <p className="font-body text-4xl font-bold text-primary mb-6">
                ${product.price.toFixed(2)}
              </p>
              <Button 
                size="lg" 
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-3"
                onClick={() => addToCart(product)}
                aria-label={`Add ${product.title} to cart`}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
