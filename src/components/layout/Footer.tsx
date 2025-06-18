import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">TechHaven</h3>
            <p className="mb-4">Tu destino único para electrónica premium y accesorios tecnológicos.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Tienda</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/smartphones" className="text-gray-400 hover:text-white transition-colors">Smartphones</Link>
              </li>
              <li>
                <Link to="/category/laptops" className="text-gray-400 hover:text-white transition-colors">Portátiles</Link>
              </li>
              <li>
                <Link to="/category/audio" className="text-gray-400 hover:text-white transition-colors">Audio</Link>
              </li>
              <li>
                <Link to="/category/accessories" className="text-gray-400 hover:text-white transition-colors">Accesorios</Link>
              </li>
              <li>
                <Link to="/category/wearables" className="text-gray-400 hover:text-white transition-colors">Wearables</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Servicio al Cliente</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contáctanos</Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 hover:text-white transition-colors">Información de Envíos</Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 hover:text-white transition-colors">Devoluciones y Cambios</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors">Preguntas Frecuentes</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contáctanos</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 text-gray-400 flex-shrink-0 mt-1" />
                <span>123 Tech Street, San Francisco, CA 94107</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 text-gray-400" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-gray-400" />
                <span>support@techhaven.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© {new Date().getFullYear()} TechHaven. Todos los derechos reservados.</p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-4 text-sm">
                <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Política de Privacidad</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Términos de Servicio</Link></li>
                <li><Link to="/sitemap" className="text-gray-400 hover:text-white transition-colors">Mapa del Sitio</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}