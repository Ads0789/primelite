"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent link navigation if card itself is a link
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Card className="flex h-full transform flex-col overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={`/product/${product.id}`} className="block h-full">
        <CardHeader className="p-0">
          <div className="aspect-[4/3] w-full overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              width={600}
              height={400}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={product.dataAiHint || 'product image'}
            />
          </div>
        </CardHeader>
        <CardContent className="flex flex-grow flex-col p-4">
          <CardTitle className="font-headline mb-2 text-lg leading-tight hover:text-primary">
            {product.title}
          </CardTitle>
          {product.rating && (
            <div className="mb-2 flex items-center text-sm text-muted-foreground">
              <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{product.rating.rate.toFixed(1)} ({product.rating.count} reviews)</span>
            </div>
          )}
          <CardDescription className="mb-3 flex-grow text-sm text-muted-foreground line-clamp-3">
            {product.description}
          </CardDescription>
          <p className="font-body mb-3 text-xl font-semibold text-primary">
            ${product.price.toFixed(2)}
          </p>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart} 
          className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
          aria-label={`Add ${product.title} to cart`}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
