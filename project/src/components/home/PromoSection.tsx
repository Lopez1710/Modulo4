import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function PromoSection() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* First Promo */}
          <div className="relative rounded-lg overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-800/90 to-blue-600/80 z-10"></div>
            <img
              src="https://images.pexels.com/photos/1038628/pexels-photo-1038628.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Últimos Smartphones"
              className="w-full h-96 object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
              <div className="mb-4">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Últimos Smartphones</h3>
                <p className="text-blue-100 mb-4">Descubre tecnología de vanguardia con nuestra nueva colección de smartphones</p>
                <Link
                  to="/category/smartphones"
                  className="inline-flex items-center text-white font-medium group"
                >
                  Comprar Ahora
                  <ArrowRight size={16} className="ml-1 transform transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Second Promo */}
          <div className="relative rounded-lg overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-800/90 to-orange-600/80 z-10"></div>
            <img
              src="https://images.pexels.com/photos/205926/pexels-photo-205926.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Audio Premium"
              className="w-full h-96 object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
              <div className="mb-4">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Audio Premium</h3>
                <p className="text-orange-100 mb-4">Sumérgete en un sonido superior con nuestra colección de audio de alta gama</p>
                <Link
                  to="/category/audio"
                  className="inline-flex items-center text-white font-medium group"
                >
                  Comprar Ahora
                  <ArrowRight size={16} className="ml-1 transform transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}