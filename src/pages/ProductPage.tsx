import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById, getProductsByCategory } from '../data/products';
import { useCartStore } from '../store/cart';
import { useWishlistStore } from '../store/wishlist';
import { ProductGrid } from '../components/products/ProductGrid';
import { Button } from '../components/ui/Button';
import { Star, ShoppingCart, Heart, Check, Truck, Shield, RotateCcw } from 'lucide-react';
import { formatPrice } from '../lib/utils';
import toast from 'react-hot-toast';

export function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // Get product data
  const product = id ? getProductById(id) : undefined;

  // Cart and wishlist functionality
  const { addItem } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
        <p className="mb-6">El producto que buscas no existe o ha sido eliminado.</p>
        <Button onClick={() => navigate('/')}>Volver al inicio</Button>
      </div>
    );
  }

  // Check if product is in wishlist
  const inWishlist = isInWishlist(product.id);

  // Related products based on category
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  // Handle adding to cart with selected quantity
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast.success(`${product.name} added to cart!`);
  };

  // Handle wishlist toggle
  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.success(`${product.name} removed from wishlist!`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist!`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="rounded-lg overflow-hidden bg-white shadow-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

          <div className="flex items-center mt-3">
            <div className="flex mr-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-300 text-gray-300"
                    }`}
                />
              ))}
            </div>
            <span className="text-gray-600">{product.rating} de 5</span>
          </div>

          <div className="mt-6">
            {product.discount ? (
              <div className="flex items-center">
                <span className="text-3xl font-bold text-gray-900 mr-3">
                  {formatPrice(product.price * (1 - product.discount / 100))}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="ml-3 px-2 py-1 bg-red-100 text-red-800 text-sm font-semibold rounded">
                  Ahorra {product.discount}%
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <div className="mt-6">
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="mt-6">
            <div className="flex items-center mb-6">
              <span className="text-gray-700 mr-3">Cantidad:</span>
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  className="px-3 py-1 border-r border-gray-300 text-gray-500 hover:bg-gray-100"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  className="w-12 text-center py-1 border-none focus:outline-none"
                  value={quantity}
                  min="1"
                  max={product.stock}
                  readOnly
                />
                <button
                  className="px-3 py-1 border-l border-gray-300 text-gray-500 hover:bg-gray-100"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                >
                  +
                </button>
              </div>
              <span className="ml-4 text-sm text-gray-500">
                {product.stock} disponibles
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleAddToCart}
                variant="primary"
                size="lg"
                className="flex-grow"
                disabled={product.stock === 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.stock === 0 ? 'Agotado' : 'Agregar al carrito'}
              </Button>
              <Button
                onClick={handleWishlistToggle}
                variant="outline"
                size="lg"
              >
                <Heart
                  className={`mr-2 h-5 w-5 ${inWishlist ? "fill-red-500 text-red-500" : ""
                    }`}
                />
                {inWishlist ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              </Button>
            </div>
          </div>

          {/* Key Features */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Características clave</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(product.specifications || {}).map(([key, value]) => (
                <li key={key} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>
                    <span className="font-medium">{key}:</span> {value}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Delivery & Returns */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center">
                <Truck className="h-5 w-5 text-gray-500 mr-3" />
                <span>Envío gratis en pedidos superiores a $50</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-gray-500 mr-3" />
                <span>2 años de garantía extendida</span>
              </div>
              <div className="flex items-center">
                <RotateCcw className="h-5 w-5 text-gray-500 mr-3" />
                <span>Garantía de devolución de dinero por 30 días</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-16 border-t border-gray-200 pt-10">
        <div className="border-b border-gray-200">
          <div className="flex -mb-px">
            <button
              className={`mr-8 py-4 text-sm font-medium border-b-2 ${activeTab === 'description'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              onClick={() => setActiveTab('description')}
            >
              Descripción
            </button>
            <button
              className={`mr-8 py-4 text-sm font-medium border-b-2 ${activeTab === 'specifications'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              onClick={() => setActiveTab('specifications')}
            >
              Especificaciones
            </button>
            <button
              className={`mr-8 py-4 text-sm font-medium border-b-2 ${activeTab === 'reviews'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reseñas
            </button>
          </div>
        </div>
        <div className="py-6">
          {activeTab === 'description' && (
            <div>
              <p className="text-base text-gray-600 leading-relaxed">
                {product.description}
                <br /><br />
                Experimenta la tecnología de vanguardia con el {product.name}. Diseñado para ofrecer rendimiento y estilo, este dispositivo premium brinda una experiencia excepcional gracias a sus funciones avanzadas y su diseño elegante.
                <br /><br />
                Ya seas un entusiasta de la tecnología, un profesional o un usuario casual, el {product.name} está hecho para superar tus expectativas y ofrecer un valor sobresaliente.
              </p>
            </div>
          )}
          {activeTab === 'specifications' && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Especificaciones técnicas</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(product.specifications || {}).map(([key, value], index) => (
                      <tr key={key} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <th className="px-4 py-3 text-left font-medium text-gray-700 w-1/3">{key}</th>
                        <td className="px-4 py-3 text-gray-600">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="text-center py-8">
              <p className="text-gray-600">¡Las reseñas estarán disponibles pronto!</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <ProductGrid
            title="También te puede interesar"
            products={relatedProducts}
          />
        </div>
      )}
    </div>
  );
}