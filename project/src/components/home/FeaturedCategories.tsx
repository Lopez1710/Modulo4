import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Laptop, Headphones, Tablet, Gamepad, Camera, Watch } from 'lucide-react';

const categories = [
  { name: 'Smartphones', icon: Smartphone, path: '/category/smartphones', color: 'bg-blue-500' },
  { name: 'Portátiles', icon: Laptop, path: '/category/laptops', color: 'bg-purple-500' },
  { name: 'Audio', icon: Headphones, path: '/category/audio', color: 'bg-red-500' },
  { name: 'Tablets', icon: Tablet, path: '/category/tablets', color: 'bg-green-500' },
  { name: 'Gaming', icon: Gamepad, path: '/category/gaming', color: 'bg-yellow-500' },
  { name: 'Cámaras', icon: Camera, path: '/category/cameras', color: 'bg-indigo-500' },
  { name: 'Wearables', icon: Watch, path: '/category/wearables', color: 'bg-pink-500' },
];

export function FeaturedCategories() {
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Comprar por Categoría</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className="group flex flex-col items-center"
            >
              <div className={`${category.color} text-white rounded-full p-5 mb-3 transition-transform duration-300 group-hover:scale-110 shadow-md`}>
                <category.icon size={30} />
              </div>
              <span className="text-sm md:text-base font-medium text-gray-900">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}