import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedCategories } from '../components/home/FeaturedCategories';
import { PromoSection } from '../components/home/PromoSection';
import { ProductGrid } from '../components/products/ProductGrid';
import { getFeaturedProducts } from '../data/products';

export function HomePage() {
  // Get featured products from our data source
  const featuredProducts = getFeaturedProducts();

  return (
    <div>
      <HeroSection />
      <FeaturedCategories />

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <ProductGrid
            title="Productos Destacados"
            products={featuredProducts}
            featured={true}
          />
        </div>
      </section>

      <PromoSection />

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Envío Gratuito en Pedidos Superiores a $50</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Compra con confianza con nuestras devoluciones sin complicaciones y servicio al cliente experto.l cliente experto.
          </p>
        </div>
      </section>
    </div>
  );
}