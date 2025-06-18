import React from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../store/cart";
import { Button } from "../components/ui/Button";
import { Trash2, ShoppingBag, ChevronLeft, Plus, Minus } from "lucide-react";
import { formatPrice } from "../lib/utils";

export function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } =
    useCartStore();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-lg mx-auto">
          <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Tu Carrito está Vacío
          </h1>
          <p className="text-gray-600 mb-8">
            Parece que aún no has añadido nada a tu carrito. ¡Navega por
            nuestros productos y encuentra algo que te encante!
          </p>{" "}
          <Link to="/">
            <Button variant="primary">Continuar Comprando</Button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Tu Carrito</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Artículos del Carrito */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="hidden sm:grid sm:grid-cols-12 px-6 py-4 bg-gray-50 border-b">
              <div className="sm:col-span-7">
                <h3 className="font-medium">Producto</h3>
              </div>
              <div className="sm:col-span-2 text-center">
                <h3 className="font-medium">Cantidad</h3>
              </div>
              <div className="sm:col-span-2 text-right">
                <h3 className="font-medium">Precio</h3>
              </div>
              <div className="sm:col-span-1"></div>
            </div>
            {items.map((item) => {
              const discountedPrice = item.product.discount
                ? item.product.price * (1 - item.product.discount / 100)
                : item.product.price;

              return (
                <div
                  key={item.product.id}
                  className="border-b last:border-b-0 px-6 py-4 grid grid-cols-1 sm:grid-cols-12 items-center gap-4"
                >
                  {" "}
                  {/* Producto */}
                  <div className="sm:col-span-7 flex items-center">
                    <Link
                      to={`/product/${item.product.id}`}
                      className="flex-shrink-0"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </Link>
                    <div className="ml-4">
                      <Link
                        to={`/product/${item.product.id}`}
                        className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.product.category}
                      </p>
                    </div>
                  </div>{" "}
                  {/* Cantidad */}
                  <div className="sm:col-span-2">
                    <div className="flex items-center justify-center border rounded-md">
                      <button
                        className="px-3 py-1 text-gray-500 hover:bg-gray-100"
                        onClick={() =>
                          handleQuantityChange(
                            item.product.id,
                            item.quantity - 1
                          )
                        }
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <input
                        type="text"
                        className="w-12 text-center py-1 border-none focus:ring-0"
                        value={item.quantity}
                        readOnly
                      />
                      <button
                        className="px-3 py-1 text-gray-500 hover:bg-gray-100"
                        onClick={() =>
                          handleQuantityChange(
                            item.product.id,
                            item.quantity + 1
                          )
                        }
                        disabled={item.quantity >= item.product.stock}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  {/* Precio */}
                  <div className="sm:col-span-2 text-right">
                    <p className="font-medium">
                      {formatPrice(discountedPrice * item.quantity)}
                    </p>
                    {item.product.discount && (
                      <p className="text-sm text-gray-500 line-through">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    )}
                  </div>{" "}
                  {/* Eliminar */}
                  <div className="sm:col-span-1 text-right">
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              );
            })}{" "}
            <div className="px-6 py-4 bg-gray-50 flex flex-wrap justify-between items-center">
              <Link
                to="/"
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors text-sm"
              >
                <ChevronLeft size={16} className="mr-1" />
                Continuar Comprando
              </Link>
              <button
                onClick={() => clearCart()}
                className="text-sm text-gray-600 hover:text-red-600 transition-colors"
              >
                Vaciar Carrito
              </button>
            </div>
          </div>
        </div>

        {/* Resumen del Pedido */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Resumen del Pedido
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  {formatPrice(getTotalPrice())}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Envío</span>
                <span>Calculado al finalizar compra</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Impuestos</span>
                <span>Calculados al finalizar compra</span>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold">
                  {formatPrice(getTotalPrice())}
                </span>
              </div>
            </div>
            <Link to="/checkout" className="w-full">
              <Button variant="primary" size="lg" fullWidth>
                Proceder al Pago
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
