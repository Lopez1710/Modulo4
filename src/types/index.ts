export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  rating: number;
  stock: number;
  featured?: boolean;
  specifications?: Record<string, string>;
  discount?: number;
}

export type Category = 
  | "smartphones" 
  | "laptops" 
  | "tablets" 
  | "audio" 
  | "accessories" 
  | "gaming" 
  | "cameras" 
  | "wearables";

export interface User {
  id: string;
  email: string;
  name: string;
  isAuthenticated: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type SortOption = "featured" | "price-low-high" | "price-high-low" | "rating" | "newest";

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: "processing" | "shipped" | "delivered";
  shippingAddress: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}