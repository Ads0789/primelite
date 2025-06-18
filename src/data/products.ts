import type { Product } from '@/lib/types';

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Classic T-Shirt',
    price: 19.99,
    description: 'A comfortable and stylish classic t-shirt, perfect for everyday wear. Made from 100% premium cotton for a soft feel and lasting durability. Available in various sizes and colors to suit your preference.',
    image: 'https://placehold.co/600x400.png',
    category: 'Apparel',
    featured: true,
    rating: { rate: 4.5, count: 120 },
    dataAiHint: 'tshirt apparel',
  },
  {
    id: '2',
    title: 'Wireless Headphones',
    price: 79.99,
    description: 'Experience immersive sound with these high-quality wireless headphones. Features noise-cancellation, long battery life, and a comfortable over-ear design for extended listening sessions.',
    image: 'https://placehold.co/600x400.png',
    category: 'Electronics',
    featured: true,
    rating: { rate: 4.8, count: 250 },
    dataAiHint: 'headphones electronics',
  },
  {
    id: '3',
    title: 'Modern Coffee Maker',
    price: 49.50,
    description: 'Brew your perfect cup of coffee with this sleek and modern coffee maker. Programmable settings, a large capacity carafe, and a keep-warm function make your mornings easier.',
    image: 'https://placehold.co/600x400.png',
    category: 'Home Goods',
    featured: true,
    rating: { rate: 4.2, count: 90 },
    dataAiHint: 'coffee maker',
  },
  {
    id: '4',
    title: 'Leather Wallet',
    price: 35.00,
    description: 'A stylish and durable leather wallet with multiple card slots and a cash compartment. Crafted from genuine leather for a sophisticated look and feel. Compact design fits comfortably in your pocket.',
    image: 'https://placehold.co/600x400.png',
    category: 'Accessories',
    featured: false,
    rating: { rate: 4.6, count: 150 },
    dataAiHint: 'wallet accessory',
  },
  {
    id: '5',
    title: 'Yoga Mat',
    price: 25.00,
    description: 'High-density, non-slip yoga mat perfect for all types of yoga and fitness exercises. Provides excellent cushioning and support. Lightweight and easy to carry with an included strap.',
    image: 'https://placehold.co/600x400.png',
    category: 'Sports',
    featured: true,
    rating: { rate: 4.3, count: 75 },
    dataAiHint: 'yoga fitness',
  },
  {
    id: '6',
    title: 'Smart Watch',
    price: 199.00,
    description: 'Stay connected and track your fitness goals with this advanced smartwatch. Features heart rate monitoring, GPS, app notifications, and a vibrant touchscreen display. Customizable watch faces.',
    image: 'https://placehold.co/600x400.png',
    category: 'Electronics',
    featured: false,
    rating: { rate: 4.7, count: 300 },
    dataAiHint: 'smartwatch technology',
  },
  {
    id: '7',
    title: 'Desk Lamp',
    price: 30.00,
    description: 'Adjustable LED desk lamp with multiple brightness levels and color temperatures. Ideal for reading, studying, or working. Energy-efficient and eye-caring design.',
    image: 'https://placehold.co/600x400.png',
    category: 'Home Office',
    featured: false,
    rating: { rate: 4.0, count: 60 },
    dataAiHint: 'lamp office',
  },
  {
    id: '8',
    title: 'Running Shoes',
    price: 89.99,
    description: 'Lightweight and breathable running shoes designed for comfort and performance. Provides excellent cushioning and support for your daily runs or workouts. Durable outsole for various terrains.',
    image: 'https://placehold.co/600x400.png',
    category: 'Footwear',
    featured: true,
    rating: { rate: 4.4, count: 180 },
    dataAiHint: 'shoes sport',
  },
];

export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return mockProducts.filter(product => product.featured);
};
