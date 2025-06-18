"use client";

import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts } from '@/data/products';
import type { Product } from '@/lib/types';
import { useEffect, useState } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFeaturedProducts(getFeaturedProducts());
      setLoading(false);
    }, 500); 
  }, []);

  return (
    <div className="space-y-12">
      <section className="text-center py-12 bg-gradient-to-r from-primary to-accent rounded-lg shadow-lg">
        <h1 className="font-headline text-4xl font-bold text-primary-foreground sm:text-5xl md:text-6xl">
          Welcome to PrimeLite
        </h1>
        <p className="mt-4 text-lg text-primary-foreground/90 sm:text-xl">
          Discover amazing products at unbeatable prices.
        </p>
      </section>

      <section>
        <h2 className="font-headline mb-8 text-3xl font-semibold text-center">Featured Products</h2>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
