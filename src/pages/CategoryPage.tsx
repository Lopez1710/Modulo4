import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductGrid } from '../components/products/ProductGrid';
import { getProductsByCategory } from '../data/products';
import { Product, SortOption } from '../types';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';

export function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    brand: '',
    inStock: false,
    onSale: false,
    rating: 0,
    color: '',
    memory: '',
    storage: '',
  });
  
  const categoryName = category?.charAt(0).toUpperCase() + category?.slice(1);

  const brands = ['Apple', 'Samsung', 'Sony', 'Dell', 'Logitech', 'Google'];
  const colors = ['Negro', 'Blanco', 'Azul', 'Plata', 'Oro'];
  const memoryOptions = ['4GB', '8GB', '16GB', '32GB'];
  const storageOptions = ['128GB', '256GB', '512GB', '1TB'];

  useEffect(() => {
    if (category) {
      let categoryProducts = getProductsByCategory(category);
      
      // Apply filters
      categoryProducts = categoryProducts.filter(product => {
        if (filters.brand && product.brand !== filters.brand) return false;
        if (filters.inStock && product.stock === 0) return false;
        if (filters.onSale && !product.discount) return false;
        if (filters.rating > 0 && product.rating < filters.rating) return false;
        if (filters.color && product.color !== filters.color) return false;
        if (filters.memory && product.specifications?.memory !== filters.memory) return false;
        if (filters.storage && product.specifications?.storage !== filters.storage) return false;
        return product.price >= priceRange[0] && product.price <= priceRange[1];
      });
      
      // Sort products
      switch (sortOption) {
        case 'featured':
          categoryProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
          break;
        case 'price-low-high':
          categoryProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-high-low':
          categoryProducts.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          categoryProducts.sort((a, b) => b.rating - a.rating);
          break;
        default:
          break;
      }
      
      setProducts(categoryProducts);
    }
  }, [category, sortOption, priceRange, filters]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{categoryName}</h1>
        <p className="text-gray-600 mt-2">Explora nuestra selección de {categoryName.toLowerCase()}</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-semibold text-lg mb-4">Filtros</h3>
            
            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Rango de Precio</h4>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="5000"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="5000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Brand Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Marca</h4>
              <select
                value={filters.brand}
                onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                className="w-full border rounded-md p-2"
              >
                <option value="">Todas las marcas</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            {/* Color Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Color</h4>
              <select
                value={filters.color}
                onChange={(e) => setFilters({ ...filters, color: e.target.value })}
                className="w-full border rounded-md p-2"
              >
                <option value="">Todos los colores</option>
                {colors.map(color => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>

            {/* Memory Filter */}
            {category === 'laptops' && (
              <div className="mb-6">
                <h4 className="font-medium mb-3">Memoria RAM</h4>
                <select
                  value={filters.memory}
                  onChange={(e) => setFilters({ ...filters, memory: e.target.value })}
                  className="w-full border rounded-md p-2"
                >
                  <option value="">Toda la memoria</option>
                  {memoryOptions.map(memory => (
                    <option key={memory} value={memory}>{memory}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Storage Filter */}
            {(category === 'laptops' || category === 'smartphones') && (
              <div className="mb-6">
                <h4 className="font-medium mb-3">Almacenamiento</h4>
                <select
                  value={filters.storage}
                  onChange={(e) => setFilters({ ...filters, storage: e.target.value })}
                  className="w-full border rounded-md p-2"
                >
                  <option value="">Todo el almacenamiento</option>
                  {storageOptions.map(storage => (
                    <option key={storage} value={storage}>{storage}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Rating Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Calificación Mínima</h4>
              <select
                value={filters.rating}
                onChange={(e) => setFilters({ ...filters, rating: Number(e.target.value) })}
                className="w-full border rounded-md p-2"
              >
                <option value="0">Todas las calificaciones</option>
                <option value="4">4+ estrellas</option>
                <option value="3">3+ estrellas</option>
                <option value="2">2+ estrellas</option>
              </select>
            </div>

            {/* Availability Filters */}
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.inStock}
                  onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2">En Stock</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.onSale}
                  onChange={(e) => setFilters({ ...filters, onSale: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2">En Oferta</span>
              </label>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="lg:col-span-3">
          {/* Mobile Filters Toggle & Sort */}
          <div className="flex flex-wrap gap-4 mb-6">
            <button 
              className="lg:hidden flex items-center px-4 py-2 border rounded-md"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal size={18} className="mr-2" />
              Filtros
            </button>
            
            <div className="flex-grow lg:flex-grow-0">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="w-full lg:w-auto px-4 py-2 border rounded-md bg-white"
              >
                <option value="featured">Destacados</option>
                <option value="price-low-high">Precio: Menor a Mayor</option>
                <option value="price-high-low">Precio: Mayor a Menor</option>
                <option value="rating">Mejor Calificados</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}