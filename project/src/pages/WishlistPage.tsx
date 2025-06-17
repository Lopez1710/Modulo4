import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlistStore } from '../store/wishlist';
import { useCartStore } from '../store/cart';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { formatPrice } from '../lib/utils';
import toast from 'react-hot-toast';

export function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const { addItem } = useCartStore();

  const handleAddToCart = (productId: string) => {
    const product = items.find(item => item.id === productId);
    if (product) {
      addItem(product);
      toast.success(`${product.name} added to cart!`);
    }
  };

  const handleRemoveFromWishlist = (productId: string) => {
    removeItem(productId);
    toast.success('Product removed from wishlist');
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-lg mx-auto">
          <Heart className="h-16 w-16 mx-auto text-gray-400 mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tu lista de deseos está vacía</h1>
          <p className="text-gray-600 mb-8">
            Comienza a guardar tus productos favoritos haciendo clic en el ícono de corazón en cualquier producto.
          </p>
          <Button as={Link} to="/" variant="primary">
            Explorar productos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tu lista de deseos</h1>
        <Button
          variant="outline"
          onClick={() => clearWishlist()}
          className="text-gray-700"
        >
          Vaciar lista
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg overflow-hidden bg-white shadow-sm group hover:shadow-md transition-shadow"
          >
            <Link
              to={`/product/${product.id}`}
              className="block relative pt-[75%] overflow-hidden bg-gray-100"
            >
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            <div className="p-4">
              <Link to={`/product/${product.id}`} className="block">
                <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
              </Link>

              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-lg">
                  {product.discount ? (
                    <span>
                      {formatPrice(product.price * (1 - product.discount / 100))}
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        {formatPrice(product.price)}
                      </span>
                    </span>
                  ) : (
                    formatPrice(product.price)
                  )}
                </span>
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
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleAddToCart(product.id)}
                  variant="primary"
                  className="flex-1"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" /> Agregar al carrito
                </Button>
                <Button
                  onClick={() => handleRemoveFromWishlist(product.id)}
                  variant="outline"
                  className="p-2"
                >
                  <Trash2 className="h-5 w-5 text-gray-600" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}