"use client";

import { useState, useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { Product } from '@/lib/types';
import { mockProducts as initialProducts } from '@/data/products'; // Using mock as initial
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Package, Trash2, Edit3, PlusCircle } from 'lucide-react';
import Image from 'next/image';

const productSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  price: z.coerce.number().min(0.01, "Price must be positive"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().url("Must be a valid URL"),
  category: z.string().optional(),
  featured: z.boolean().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function AdminPage() {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Simulate loading products from a source
    setProducts(initialProducts);
    setIsMounted(true);
  }, []);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: '',
      price: 0,
      description: '',
      image: '',
      category: '',
      featured: false,
    },
  });

  useEffect(() => {
    if (editingProduct) {
      form.reset({
        title: editingProduct.title,
        price: editingProduct.price,
        description: editingProduct.description,
        image: editingProduct.image,
        category: editingProduct.category || '',
        featured: editingProduct.featured || false,
      });
    } else {
      form.reset({
        title: '', price: 0, description: '', image: '', category: '', featured: false,
      });
    }
  }, [editingProduct, form]);


  const onSubmit: SubmitHandler<ProductFormData> = (data) => {
    if (editingProduct) {
      // Update existing product
      setProducts(prevProducts => 
        prevProducts.map(p => 
          p.id === editingProduct.id ? { ...editingProduct, ...data, price: Number(data.price) } : p
        )
      );
      toast({ title: "Product Updated", description: `${data.title} has been updated.` });
      setEditingProduct(null);
    } else {
      // Add new product
      const newProduct: Product = {
        id: String(Date.now()), // Simple ID generation
        ...data,
        price: Number(data.price),
        rating: { rate: 0, count: 0 }, // Default rating for new products
      };
      setProducts(prevProducts => [newProduct, ...prevProducts]);
      toast({ title: "Product Added", description: `${data.title} has been added.` });
    }
    form.reset();
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
    toast({ title: "Product Deleted", description: "Product has been removed.", variant: "destructive" });
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  if (!isMounted) {
    return <div className="flex justify-center items-center h-screen"><Package className="h-12 w-12 animate-pulse text-primary" /></div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <h1 className="font-headline text-4xl font-semibold text-center mb-8">Admin Dashboard</h1>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center">
            {editingProduct ? <Edit3 className="mr-2 h-6 w-6" /> : <PlusCircle className="mr-2 h-6 w-6" />}
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </CardTitle>
          <CardDescription>
            {editingProduct ? `Editing "${editingProduct.title}"` : 'Fill in the details to add a new product to the catalog.'}
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="title">Product Title</FormLabel>
                    <FormControl>
                      <Input id="title" placeholder="e.g., Premium T-Shirt" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="price">Price ($)</FormLabel>
                    <FormControl>
                      <Input id="price" type="number" step="0.01" placeholder="e.g., 29.99" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="description">Description</FormLabel>
                    <FormControl>
                      <Textarea id="description" placeholder="Describe the product..." {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="image">Image URL</FormLabel>
                    <FormControl>
                      <Input id="image" placeholder="https://placehold.co/600x400.png" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="category">Category</FormLabel>
                    <FormControl>
                      <Input id="category" placeholder="e.g., Apparel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                    <FormControl>
                      <Input type="checkbox" checked={field.value} onChange={field.onChange} id="featured" className="h-4 w-4"/>
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel htmlFor="featured">
                        Featured Product
                      </FormLabel>
                      <CardDescription>
                        Display this product on the homepage.
                      </CardDescription>
                    </div>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              {editingProduct && (
                <Button type="button" variant="outline" onClick={() => { setEditingProduct(null); form.reset(); }}>
                  Cancel Edit
                </Button>
              )}
              <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Saving...' : (editingProduct ? 'Update Product' : 'Add Product')}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      <section>
        <h2 className="font-headline text-3xl font-semibold mb-6 flex items-center">
          <Package className="mr-3 h-8 w-8" /> Current Products
        </h2>
        {products.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">No products available. Add some using the form above.</p>
        ) : (
          <div className="space-y-4">
            {products.map(product => (
              <Card key={product.id} className="flex flex-col sm:flex-row items-center p-4 shadow-md">
                <div className="w-20 h-20 flex-shrink-0 mr-4 mb-3 sm:mb-0 rounded-md overflow-hidden">
                   <Image
                    src={product.image || 'https://placehold.co/100x100.png'}
                    alt={product.title}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                    data-ai-hint={product.dataAiHint || 'product admin'}
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                  <p className="text-sm text-muted-foreground">${product.price.toFixed(2)} - {product.category}</p>
                  {product.featured && <span className="text-xs font-semibold text-accent">Featured</span>}
                </div>
                <div className="flex space-x-2 mt-3 sm:mt-0">
                  <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)} aria-label={`Edit ${product.title}`}>
                    <Edit3 className="h-4 w-4 mr-1 sm:mr-0" /> <span className="sm:hidden">Edit</span>
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(product.id)} aria-label={`Delete ${product.title}`}>
                    <Trash2 className="h-4 w-4 mr-1 sm:mr-0" /> <span className="sm:hidden">Delete</span>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
