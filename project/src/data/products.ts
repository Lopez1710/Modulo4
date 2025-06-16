import { Product } from '../types';

export const products: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro",
    description: "The latest iPhone with A17 Pro chip, titanium design, and advanced camera system",
    price: 999,
    image: "https://images.pexels.com/photos/5741606/pexels-photo-5741606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "smartphones",
    rating: 4.8,
    stock: 50,
    featured: true,
    specifications: {
      processor: "A17 Pro chip",
      display: "6.1-inch Super Retina XDR",
      camera: "48MP main camera",
      battery: "All-day battery life",
      storage: "128GB, 256GB, 512GB, 1TB",
    },
  },
  {
    id: "2",
    name: "MacBook Air M2",
    description: "Thin and powerful with the M2 chip. Supercharged by M2.",
    price: 1199,
    image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "laptops",
    rating: 4.9,
    stock: 30,
    featured: true,
    specifications: {
      processor: "Apple M2 chip",
      display: "13.6-inch Liquid Retina",
      memory: "8GB unified memory",
      storage: "256GB SSD",
      battery: "Up to 18 hours",
    },
  },
  {
    id: "3",
    name: "Sony WH-1000XM5",
    description: "Industry-leading noise cancellation and premium sound quality",
    price: 399,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "audio",
    rating: 4.7,
    stock: 45,
    specifications: {
      batteryLife: "30 hours",
      connectivity: "Bluetooth 5.2",
      noiseCancellation: "Industry-leading",
      charging: "USB-C fast charging",
      weight: "250g",
    },
  },
  {
    id: "4",
    name: "Samsung Galaxy Tab S9",
    description: "Premium tablet with stunning AMOLED display and S Pen included",
    price: 799,
    image: "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "tablets",
    rating: 4.6,
    stock: 25,
    specifications: {
      display: "11-inch Dynamic AMOLED 2X",
      processor: "Snapdragon 8 Gen 2",
      memory: "8GB RAM",
      storage: "128GB",
      battery: "8400mAh",
    },
  },
  {
    id: "5",
    name: "PlayStation 5",
    description: "Next-gen gaming console with ultra-high-speed SSD and 3D Audio",
    price: 499,
    image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "gaming",
    rating: 4.9,
    stock: 10,
    featured: true,
    specifications: {
      processor: "Custom AMD Zen 2",
      gpu: "10.28 TFLOPS, 36 CUs",
      memory: "16GB GDDR6",
      storage: "825GB SSD",
      resolution: "4K/8K support",
    },
  },
  {
    id: "6",
    name: "Apple AirPods Pro 2",
    description: "Active Noise Cancellation and Transparency mode with Spatial Audio",
    price: 249,
    image: "https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "audio",
    rating: 4.8,
    stock: 60,
    specifications: {
      batteryLife: "6 hours (up to 30 with case)",
      connectivity: "Bluetooth 5.3",
      features: "Active Noise Cancellation, Transparency mode",
      charging: "MagSafe, Wireless, Lightning",
      waterResistance: "IPX4",
    },
  },
  {
    id: "7",
    name: "Dell XPS 15",
    description: "Premium laptop with InfinityEdge display and powerful performance",
    price: 1499,
    image: "https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "laptops",
    rating: 4.6,
    stock: 20,
    specifications: {
      processor: "12th Gen Intel Core i7",
      display: "15.6-inch 4K UHD+",
      memory: "16GB DDR5",
      storage: "512GB SSD",
      graphics: "NVIDIA RTX 3050 Ti",
    },
  },
  {
    id: "8",
    name: "Apple Watch Series 9",
    description: "Advanced health monitoring and smartphone connectivity",
    price: 399,
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "wearables",
    rating: 4.7,
    stock: 40,
    specifications: {
      display: "Always-On Retina LTPO OLED",
      processor: "S9 SiP",
      storage: "32GB",
      battery: "Up to 18 hours",
      waterResistance: "50 meters",
    },
  },
  {
    id: "9",
    name: "Canon EOS R6 Mark II",
    description: "Full-frame mirrorless camera with advanced subject tracking",
    price: 2499,
    image: "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "cameras",
    rating: 4.8,
    stock: 15,
    specifications: {
      sensor: "24.2MP Full-Frame CMOS",
      processor: "DIGIC X",
      iso: "100-102400",
      video: "4K60p, Full HD 180p",
      stabilization: "5-axis In-Body IS",
    },
  },
  {
    id: "10",
    name: "Samsung 55\" OLED 4K TV",
    description: "Stunning 4K OLED display with smart TV features",
    price: 1799,
    image: "https://images.pexels.com/photos/6886231/pexels-photo-6886231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "accessories",
    rating: 4.7,
    stock: 18,
    featured: true,
    specifications: {
      display: "55-inch 4K OLED",
      hdr: "HDR10+, HLG",
      refresh: "120Hz",
      connectivity: "HDMI 2.1, Wi-Fi 6",
      sound: "40W 2.2.2ch",
    },
    discount: 10,
  },
  {
    id: "11",
    name: "Google Pixel 8 Pro",
    description: "Flagship smartphone with advanced AI capabilities and exceptional camera",
    price: 899,
    image: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "smartphones",
    rating: 4.7,
    stock: 35,
    specifications: {
      processor: "Google Tensor G3",
      display: "6.7-inch LTPO OLED",
      camera: "50MP main + 48MP ultrawide + 48MP telephoto",
      battery: "5,000mAh",
      storage: "128GB, 256GB, 512GB",
    },
  },
  {
    id: "12",
    name: "Logitech MX Master 3S",
    description: "Advanced wireless mouse with ultra-fast scrolling and precision tracking",
    price: 99.99,
    image: "https://images.pexels.com/photos/3944377/pexels-photo-3944377.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "accessories",
    rating: 4.8,
    stock: 70,
    specifications: {
      sensor: "8,000 DPI Darkfield",
      buttons: "7 programmable",
      batteryLife: "70 days",
      connectivity: "Bluetooth, USB receiver",
      compatibility: "Windows, macOS, Linux",
    },
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) || 
    product.description.toLowerCase().includes(lowercaseQuery)
  );
};