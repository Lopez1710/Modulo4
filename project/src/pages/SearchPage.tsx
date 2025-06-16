import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchProducts } from '../data/products';
import { ProductGrid } from '../components/products/ProductGrid';
import { Product } from '../types';
import { Search as SearchIcon } from 'lucide-react';

export function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      setLoading(true);
      // In a real app, this would be an API call
      setTimeout(() => {
        const results = searchProducts(query);
        setProducts(results);
        setLoading(false);
      }, 500); // Simulate network delay
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Search Results</h1>
        {query && (
          <p className="text-gray-600 mt-2">
            Showing results for "{query}"
          </p>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="text-center py-16">
              <SearchIcon className="h-16 w-16 mx-auto text-gray-400 mb-6" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">No results found</h2>
              <p className="text-gray-600 max-w-lg mx-auto">
                We couldn't find any products matching "{query}". Try checking your spelling or using more general terms.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}