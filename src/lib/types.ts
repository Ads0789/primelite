
export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  category?: string; // Optional category
  featured?: boolean; // Optional flag for featured products
  rating?: { // Optional rating
    rate: number;
    count: number;
  };
  dataAiHint?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
