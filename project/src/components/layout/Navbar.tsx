import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Search, Menu, X, User, Monitor } from 'lucide-react';
import { useCartStore } from '../../store/cart';
import { useAuthStore } from '../../store/auth';

const categories = [
  { label: 'Smartphones', value: 'smartphones' },
  { label: 'Portátiles', value: 'laptops' },
  { label: 'Tablets', value: 'tablets' },
  { label: 'Audio', value: 'audio' },
  { label: 'Accesorios', value: 'accessories' },
  { label: 'Gaming', value: 'gaming' },
  { label: 'Cámaras', value: 'cameras' },
  { label: 'Wearables', value: 'wearables' },
];

export function Navbar() {
  const { getTotalItems } = useCartStore();
  const { isAuthenticated, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between bg-gray-50">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Monitor className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-blue-600">Pixelyte</span>
          </Link>

          {/* Search - Desktop */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex relative w-full max-w-md mx-4"
          >
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </form>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/wishlist" className="relative">
              <Heart className="h-6 w-6 text-gray-700 hover:text-blue-600 transition-colors" />
            </Link>

            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-blue-600 transition-colors" />
              {getTotalItems() > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-1">
                  <User className="h-6 w-6 text-gray-700" />
                  <span className="text-sm font-medium">Cuenta</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-50 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">
                  <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mi Cuenta</Link>
                  <Link to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Pedidos</Link>
                  <Link to="/admin/products/new" className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100">Agregar Producto</Link>
                  <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Cerrar Sesión</button>
                </div>
              </div>
            ) : (
              <Link to="/auth/login" className="text-sm font-medium hover:text-blue-600 transition-colors">Iniciar Sesión</Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Categories - Desktop */}
        <div className="hidden md:block border-t border-gray-200">
          <div className="flex items-center space-x-8 py-3">
            {categories.map((category) => (
              <Link
                key={category.value}
                to={`/category/${category.value}`}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                {category.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-4 py-3 border-t border-gray-200">
            <form onSubmit={handleSearchSubmit} className="relative mb-4">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </form>

            <div className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.value}
                  to={`/category/${category.value}`}
                  className="block py-2 text-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.label}
                </Link>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
              <Link
                to="/wishlist"
                className="flex items-center py-2 text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart className="mr-3 h-5 w-5" />
                <span>Lista de Deseos</span>
              </Link>

              <Link
                to="/cart"
                className="flex items-center py-2 text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="mr-3 h-5 w-5" />
                <span>Carrito ({getTotalItems()})</span>
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/account"
                    className="flex items-center py-2 text-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="mr-3 h-5 w-5" />
                    <span>Mi Cuenta</span>
                  </Link>
                  <Link
                    to="/orders"
                    className="block py-2 text-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Pedidos
                  </Link>
                  <Link
                    to="/admin/products/new"
                    className="block py-2 text-blue-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Agregar Producto
                  </Link>
                  <Link
                    to="/auth/login"
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left py-2 text-gray-700"
                  >
                    Cerrar Sesión
                  </Link>
                </>
              ) : (
                <Link
                  to="/auth/login"
                  className="block py-2 text-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Iniciar Sesión
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}