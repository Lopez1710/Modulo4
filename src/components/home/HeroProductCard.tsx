import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Product } from "../../types";
import { formatPrice } from "../../lib/utils";
import { useWishlistStore } from "../../store/wishlist";

interface HeroProductCardProps {
  product: Product;
}

export function HeroProductCard({ product }: HeroProductCardProps) {
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist,
  } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

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
      <div className="h-full rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg group bg-white/20 backdrop-blur-sm">
        <div className="relative pt-[70%] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />

          {product.discount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
              -{product.discount}%
            </div>
          )}

          <button
            onClick={handleWishlistToggle}
            className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full hover:bg-white transition-all"
          >
            <Heart
              size={18}
              className={
                inWishlist ? "fill-red-500 text-red-500" : "text-gray-600"
              }
            />
          </button>

          {product.featured && (
            <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 text-xs font-bold rounded">
              Destacado
            </div>
          )}
        </div>

        <div className="p-3 text-white">
          <div className="flex items-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`text-xs ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
            <span className="text-xs ml-1">{product.rating.toFixed(1)}</span>
          </div>
          <h3 className="text-sm font-bold truncate">{product.name}</h3>
          <div className="mt-1 font-bold">{formatPrice(product.price)}</div>
        </div>
      </div>
    </Link>
  );
}
