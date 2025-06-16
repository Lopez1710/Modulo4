import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(white, rgba(255, 255, 255, 0.3) 2px, transparent 0)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-4 py-24">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              El Futuro de la <br />
              <span className="text-blue-300">Tecnología</span> está Aquí
            </h1>
            <p className="mt-6 text-lg text-blue-100 max-w-lg mx-auto lg:mx-0">
              Descubre lo último y mejor en tecnología. Dispositivos premium, calidad excepcional, precios imbatibles.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                as={Link}
                to="/category/smartphones"
                variant="primary"
                size="lg"
                className="bg-white text-blue-900 hover:bg-blue-50"
              >
                Comprar Ahora
              </Button>
              <Button
                as={Link}
                to="/featured"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Explorar Destacados <ArrowRight size={18} className="ml-2" />
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl transform transition-transform duration-500 hover:scale-105">
              <img
                src="https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Últimos dispositivos tecnológicos"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6">
                  <span className="px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">NUEVA LLEGADA</span>
                  <h3 className="mt-2 text-xl font-bold text-white">Electrónicos Premium de Última Generación</h3>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-orange-500 rounded-full opacity-30 blur-2xl"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-400 rounded-full opacity-30 blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}