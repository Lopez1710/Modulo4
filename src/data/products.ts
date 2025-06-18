import { Product } from '../types';

export const products: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro",
    description: "El último iPhone con chip A17 Pro, diseño de titanio y sistema de cámara avanzado",
    price: 999,
    image: "https://images.pexels.com/photos/5741606/pexels-photo-5741606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "smartphones",
    rating: 4.8,
    stock: 50,
    featured: true,
    specifications: {
      processor: "Chip A17 Pro",
      display: "Pantalla Super Retina XDR de 6.1 pulgadas",
      camera: "Cámara principal de 48MP",
      battery: "Batería para todo el día",
      storage: "128GB, 256GB, 512GB, 1TB",
    },
  },
  {
    id: "2",
    name: "MacBook Air M2",
    description: "Delgada y potente con el chip M2. Potenciada por M2.",
    price: 1199,
    image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "laptops",
    rating: 4.9,
    stock: 30,
    featured: true,
    specifications: {
      processor: "Chip Apple M2",
      display: "Pantalla Liquid Retina de 13.6 pulgadas",
      memory: "8GB memoria unificada",
      storage: "256GB SSD",
      battery: "Hasta 18 horas",
    },
  },
  {
    id: "3",
    name: "Sony WH-1000XM5",
    description: "Cancelación de ruido líder en la industria y sonido de alta calidad",
    price: 399,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "audio",
    rating: 4.7,
    stock: 45,
    specifications: {
      batteryLife: "30 horas",
      connectivity: "Bluetooth 5.2",
      noiseCancellation: "Cancelación de ruido líder",
      charging: "Carga rápida USB-C",
      weight: "250g",
    },
  },
  {
    id: "4",
    name: "Samsung Galaxy Tab S9",
    description: "Tableta premium con pantalla AMOLED impresionante y S Pen incluido",
    price: 799,
    image: "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "tablets",
    rating: 4.6,
    stock: 25,
    specifications: {
      display: "Pantalla Dynamic AMOLED 2X de 11 pulgadas",
      processor: "Snapdragon 8 Gen 2",
      memory: "8GB RAM",
      storage: "128GB",
      battery: "8400mAh",
    },
  },
  {
    id: "5",
    name: "PlayStation 5",
    description: "Consola de videojuegos de nueva generación con SSD ultrarrápido y audio 3D",
    price: 499,
    image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "gaming",
    rating: 4.9,
    stock: 10,
    featured: true,
    specifications: {
      processor: "AMD Zen 2 personalizado",
      gpu: "10.28 TFLOPS, 36 CUs",
      memory: "16GB GDDR6",
      storage: "825GB SSD",
      resolution: "Soporte 4K/8K",
    },
  },
  {
    id: "6",
    name: "Apple AirPods Pro 2",
    description: "Cancelación activa de ruido y modo transparencia con Audio Espacial",
    price: 249,
    image: "https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "audio",
    rating: 4.8,
    stock: 60,
    specifications: {
      batteryLife: "6 horas (hasta 30 con estuche)",
      connectivity: "Bluetooth 5.3",
      features: "Cancelación activa de ruido, modo transparencia",
      charging: "MagSafe, inalámbrico, Lightning",
      waterResistance: "IPX4",
    },
  },
  {
    id: "7",
    name: "Dell XPS 15",
    description: "Portátil premium con pantalla InfinityEdge y alto rendimiento",
    price: 1499,
    image: "https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "laptops",
    rating: 4.6,
    stock: 20,
    specifications: {
      processor: "Intel Core i7 12ª Gen",
      display: "Pantalla 4K UHD+ de 15.6 pulgadas",
      memory: "16GB DDR5",
      storage: "512GB SSD",
      graphics: "NVIDIA RTX 3050 Ti",
    },
  },
  {
    id: "8",
    name: "Apple Watch Series 9",
    description: "Monitoreo avanzado de salud y conectividad con smartphone",
    price: 399,
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "wearables",
    rating: 4.7,
    stock: 40,
    specifications: {
      display: "Pantalla Retina LTPO OLED siempre activa",
      processor: "S9 SiP",
      storage: "32GB",
      battery: "Hasta 18 horas",
      waterResistance: "50 metros",
    },
  },
  {
    id: "9",
    name: "Canon EOS R6 Mark II",
    description: "Cámara mirrorless de formato completo con seguimiento avanzado de sujetos",
    price: 2499,
    image: "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "cameras",
    rating: 4.8,
    stock: 15,
    specifications: {
      sensor: "CMOS Full-Frame de 24.2MP",
      processor: "DIGIC X",
      iso: "100-102400",
      video: "4K60p, Full HD 180p",
      stabilization: "Estabilización en el cuerpo de 5 ejes",
    },
  },
  {
    id: "10",
    name: "Samsung TV OLED 4K 55\"",
    description: "Impresionante pantalla OLED 4K con funciones smart TV",
    price: 1799,
    image: "https://images.pexels.com/photos/6886231/pexels-photo-6886231.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "accessories",
    rating: 4.7,
    stock: 18,
    featured: true,
    specifications: {
      display: "Pantalla OLED 4K de 55 pulgadas",
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
    description: "Smartphone insignia con IA avanzada y cámara excepcional",
    price: 899,
    image: "https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "smartphones",
    rating: 4.7,
    stock: 35,
    specifications: {
      processor: "Google Tensor G3",
      display: "Pantalla LTPO OLED de 6.7 pulgadas",
      camera: "Principal 50MP + Ultra gran angular 48MP + Telefoto 48MP",
      battery: "5,000mAh",
      storage: "128GB, 256GB, 512GB",
    },
  },
  {
    id: "12",
    name: "Logitech MX Master 3S",
    description: "Ratón inalámbrico avanzado con desplazamiento ultrarrápido y seguimiento de precisión",
    price: 99.99,
    image: "https://images.pexels.com/photos/3944377/pexels-photo-3944377.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "accessories",
    rating: 4.8,
    stock: 70,
    specifications: {
      sensor: "8,000 DPI Darkfield",
      buttons: "7 programables",
      batteryLife: "70 días",
      connectivity: "Bluetooth, receptor USB",
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