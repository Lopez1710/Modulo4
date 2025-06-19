import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  Search,
  Menu,
  X,
  User,
  Monitor,
  ChevronDown,
  Smartphone,
  Laptop,
  Tablet,
  Headphones,
  Cable,
  Gamepad,
  Camera,
  Watch,
} from "lucide-react";
import { useCartStore } from "../../store/cart";
import { useAuthStore } from "../../store/auth";
import { useWishlistStore } from "../../store/wishlist";

const categories = [
  { label: "Smartphones", value: "smartphones", icon: Smartphone },
  { label: "Portátiles", value: "laptops", icon: Laptop },
  { label: "Tablets", value: "tablets", icon: Tablet },
  { label: "Audio", value: "audio", icon: Headphones },
  { label: "Accesorios", value: "accessories", icon: Cable },
  { label: "Gaming", value: "gaming", icon: Gamepad },
  { label: "Cámaras", value: "cameras", icon: Camera },
  { label: "Wearables", value: "wearables", icon: Watch },
];

export function Navbar() {
  const { getTotalItems } = useCartStore();
  const { isAuthenticated, logout } = useAuthStore();
  const { items: wishlistItems } = useWishlistStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const accountMenuRef = React.useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const isCategoryActive = (categoryValue: string) => {
    return location.pathname === `/category/${categoryValue}`;
  };

  useEffect(() => {
    if (!isAccountMenuOpen) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target as Node)
      ) {
        setIsAccountMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isAccountMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-white shadow-sm"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Monitor className="h-8 w-8 text-blue-600 transition-transform duration-300 group-hover:rotate-12" />
            <span className="text-2xl font-bold text-blue-600 transition-colors duration-300 group-hover:text-blue-700">
              Pixelyte
            </span>
          </Link>

          {/* Search - Desktop */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex relative w-full max-w-md mx-4"
          >
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-3 top-2 h-5 w-5 text-gray-500 hover:text-blue-600 transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
            <div className="absolute left-3 top-2.5 h-5 w-5 text-gray-400">
              <Search className="h-5 w-5" />
            </div>
          </form>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/wishlist" className="relative group">
              <Heart className="h-6 w-6 text-gray-700 group-hover:text-blue-600 transition-colors duration-200" />
              {wishlistItems.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white transition-transform duration-200 group-hover:scale-110">
                  {wishlistItems.length}
                </span>
              )}
              <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap bg-gray-800 text-white px-2 py-1 rounded hidden md:block">
                Lista de deseos
              </span>
            </Link>

            <Link to="/cart" className="relative group">
              <ShoppingCart className="h-6 w-6 text-gray-700 group-hover:text-blue-600 transition-colors duration-200" />
              {getTotalItems() > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white transition-transform duration-200 group-hover:scale-110">
                  {getTotalItems()}
                </span>
              )}
              <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap bg-gray-800 text-white px-2 py-1 rounded hidden md:block">
                Carrito
              </span>
            </Link>

            {isAuthenticated ? (
              <div className="relative" ref={accountMenuRef}>
                <button
                  className="flex items-center space-x-1 rounded-full px-3 py-1.5 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsAccountMenuOpen((v) => !v)}
                >
                  <User className="h-5 w-5 text-gray-700" />
                  <span className="text-sm font-medium">Cuenta</span>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isAccountMenuOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>
                {isAccountMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg overflow-hidden z-50 border border-gray-200 animate-fade-in">
                    <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                      <p className="text-sm font-medium text-gray-800">
                        Mi Cuenta
                      </p>
                    </div>
                    <Link
                      to="/account"
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    >
                      <User className="mr-3 h-4 w-4" />
                      <span>Perfil</span>
                    </Link>
                    <Link
                      to="/orders"
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    >
                      <svg
                        className="mr-3 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                      <span>Pedidos</span>
                    </Link>
                    <Link
                      to="/admin/products/new"
                      className="flex items-center px-4 py-2.5 text-sm text-blue-600 hover:bg-blue-50 transition-colors"
                    >
                      <svg
                        className="mr-3 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      <span>Agregar Producto</span>
                    </Link>
                    <div className="border-t border-gray-200 pt-1">
                      <button
                        onClick={logout}
                        className="flex w-full items-center px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <svg
                          className="mr-3 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        <span>Cerrar Sesión</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth/login"
                className="px-4 py-2 rounded-full bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors"
              >
                Iniciar Sesión
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
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
          <div className="flex items-center justify-between py-1 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {categories.map((category) => (
              <Link
                key={category.value}
                to={`/category/${category.value}`}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${isCategoryActive(category.value)
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}
              >
                <category.icon className="mr-2 h-4 w-4" />
                {category.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-0 bg-gray-800 bg-opacity-50 z-40 transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsMenuOpen(false)}
      ></div>
      <div
        className={`md:hidden fixed top-16 bottom-0 right-0 w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${isMenuOpen ? "translate-x-0 shadow-xl" : "translate-x-full"
          }`}
      >
        <div className="px-4 py-5 border-b border-gray-200">
          <form onSubmit={handleSearchSubmit} className="relative mb-4">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full rounded-full border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-3 top-2 h-5 w-5 text-gray-500 hover:text-blue-600"
            >
              <Search className="h-5 w-5" />
            </button>
            <div className="absolute left-3 top-2.5 h-5 w-5 text-gray-400">
              <Search className="h-5 w-5" />
            </div>
          </form>

          <div className="space-y-1">
            <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">
              Categorías
            </h3>
            {categories.map((category) => (
              <Link
                key={category.value}
                to={`/category/${category.value}`}
                className={`flex items-center px-3 py-2 rounded-md w-full ${isCategoryActive(category.value)
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
                  }`}
                onClick={(e) => {
                  e.stopPropagation(); // Prevenir que el clic cierre el menú demasiado pronto
                  setTimeout(() => setIsMenuOpen(false), 150);
                }}
              >
                <category.icon className="mr-3 h-5 w-5" />
                <span>{category.label}</span>
              </Link>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
            <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500 mb-2">
              Mi Cuenta
            </h3>

            <Link
              to="/wishlist"
              className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
              onClick={(e) => {
                e.stopPropagation();
                setTimeout(() => setIsMenuOpen(false), 150);
              }}
            >
              <Heart className="mr-3 h-5 w-5" />
              <span>Lista de Deseos</span>
              {wishlistItems.length > 0 && (
                <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
              onClick={(e) => {
                e.stopPropagation();
                setTimeout(() => setIsMenuOpen(false), 150);
              }}
            >
              <ShoppingCart className="mr-3 h-5 w-5" />
              <span>Carrito</span>
              {getTotalItems() > 0 && (
                <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/account"
                  className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTimeout(() => setIsMenuOpen(false), 150);
                  }}
                >
                  <User className="mr-3 h-5 w-5" />
                  <span>Mi Perfil</span>
                </Link>
                <Link
                  to="/orders"
                  className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTimeout(() => setIsMenuOpen(false), 150);
                  }}
                >
                  <svg
                    className="mr-3 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <span>Mis Pedidos</span>
                </Link>
                <Link
                  to="/admin/products/new"
                  className="flex items-center px-3 py-2 rounded-md text-blue-600 hover:bg-blue-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTimeout(() => setIsMenuOpen(false), 150);
                  }}
                >
                  <svg
                    className="mr-3 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span>Agregar Producto</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center w-full px-3 py-2 rounded-md text-red-600 hover:bg-red-50"
                >
                  <svg
                    className="mr-3 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Cerrar Sesión</span>
                </button>
              </>
            ) : (
              <Link
                to="/auth/login"
                className="flex items-center px-3 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                onClick={(e) => {
                  e.stopPropagation();
                  setTimeout(() => setIsMenuOpen(false), 150);
                }}
              >
                <User className="mr-3 h-5 w-5" />
                <span>Iniciar Sesión</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
