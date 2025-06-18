import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '../../types';
import { formatPrice, cn } from '../../lib/utils';
import { Button } from '../ui/Button';
import { useCartStore } from '../../store/cart';
import { useWishlistStore } from '../../store/wishlist';
import { Card } from '../ui/Card';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Card className={cn(
        "h-full overflow-hidden transition-all duration-300 hover:shadow-md group",
        featured && "border-blue-100"
      )}>
        <div className="relative pt-[100%] overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />

          {product.discount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
              {product.discount}% DTO
            </div>
          )}

          {featured && (
            <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 text-xs font-bold rounded">
              Destacado
            </div>
          )}

          <button
            onClick={handleWishlistToggle}
            className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
            aria-label={inWishlist ? "Eliminar de favoritos" : "Añadir a favoritos"}
          >
            <Heart
              className={cn(
                "h-5 w-5 transition-colors",
                inWishlist ? "fill-red-500 text-red-500" : "text-gray-600"
              )}
            />
          </button>
        </div>

        <div className="p-4">
          <div className="mb-1 flex items-center">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(product.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                    }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1 text-xs text-gray-600">{product.rating}</span>
            </div>
            <span className="ml-auto text-xs text-gray-500">
              {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
            </span>
          </div>

          <h3 className="text-sm font-medium text-gray-900 mb-1">{product.name}</h3>

          <p className="text-sm text-gray-500 line-clamp-2 mb-3">{product.description}</p>

          <div className="flex items-end justify-between mt-auto">
            <div className="flex flex-col">
              {product.discount ? (
                <>
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(product.price * (1 - product.discount / 100))}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            <Button
              onClick={handleAddToCart}
              size="sm"
              variant="primary"
            >
              Añadir al carrito
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
}