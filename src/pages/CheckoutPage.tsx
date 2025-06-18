import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cart';
import { useAuthStore } from '../store/auth';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { formatPrice } from '../lib/utils';
import { CreditCard, LockIcon } from 'lucide-react';
import toast from 'react-hot-toast';

type CheckoutStep = 'shipping' | 'payment' | 'confirmation';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Estados Unidos',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  // If cart is empty, redirect to cart page
  React.useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }

    // If not logged in, redirect to login
    if (!isAuthenticated) {
      toast.error('Por favor inicie sesión para continuar con la compra');
      navigate('/login', { state: { returnUrl: '/checkout' } });
    }
  }, [items.length, navigate, isAuthenticated]);

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setCurrentStep('confirmation');
  };

  const handleCompleteOrder = () => {
    toast.success('¡Pedido realizado con éxito!');
    clearCart();
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Checkout Steps */}
        <div className="mb-10">
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${currentStep === 'shipping' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
                }`}>
                1
              </div>
              <span className="mt-2 text-sm font-medium">Envío</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${currentStep === 'shipping' ? 'bg-gray-200' : 'bg-blue-600'
              }`} />
            <div className="flex flex-col items-center">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${currentStep === 'payment' ? 'bg-blue-600 text-white' :
                  currentStep === 'confirmation' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                }`}>
                2
              </div>
              <span className="mt-2 text-sm font-medium">Pago</span>
            </div>
            <div className={`flex-1 h-1 mx-4 ${currentStep === 'confirmation' ? 'bg-blue-600' : 'bg-gray-200'
              }`} />
            <div className="flex flex-col items-center">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${currentStep === 'confirmation' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'
                }`}>
                3
              </div>
              <span className="mt-2 text-sm font-medium">Confirmación</span>
            </div>
          </div>
        </div>

        {/* Content based on current step */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          {currentStep === 'shipping' && (
            <form onSubmit={handleShippingSubmit}>
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold mb-4">Información de Envío</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Nombre Completo"
                    type="text"
                    value={shippingInfo.fullName}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                    required
                    fullWidth
                  />
                  <Input
                    label="Correo Electrónico"
                    type="email"
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                    required
                    fullWidth
                  />
                  <Input
                    label="Dirección"
                    type="text"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                    required
                    fullWidth
                    className="md:col-span-2"
                  />
                  <Input
                    label="Ciudad"
                    type="text"
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    required
                    fullWidth
                  />
                  <Input
                    label="Estado/Provincia"
                    type="text"
                    value={shippingInfo.state}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                    required
                    fullWidth
                  />
                  <Input
                    label="Código Postal"
                    type="text"
                    value={shippingInfo.zipCode}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                    required
                    fullWidth
                  />
                  <div className="w-full">
                    <label className="text-sm font-medium mb-1 block">País</label>
                    <select
                      value={shippingInfo.country}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                      className="w-full rounded-md border border-gray-300 py-2 px-3"
                      required
                    >
                      <option value="Estados Unidos">Estados Unidos</option>
                      <option value="Canadá">Canadá</option>
                      <option value="México">México</option>
                      <option value="Reino Unido">Reino Unido</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-gray-50 flex justify-end">
                <Button type="submit" variant="primary">
                  Continuar al Pago
                </Button>
              </div>
            </form>
          )}

          {currentStep === 'payment' && (
            <form onSubmit={handlePaymentSubmit}>
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold mb-6">Información de Pago</h2>

                <div className="mb-8">
                  <div className="flex items-center justify-center border border-gray-300 rounded-md p-4 bg-gray-50">
                    <div className="flex items-center space-x-2">
                      <LockIcon className="h-5 w-5 text-gray-500" />
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Pago Seguro:</span> Su información de pago está encriptada y segura.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex justify-center space-x-4 mb-6">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-8" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-8" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="American Express" className="h-8" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/88/Discover_Card_logo.svg" alt="Discover" className="h-8" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <Input
                      label="Número de Tarjeta"
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                      required
                      fullWidth
                    />
                  </div>
                  <Input
                    label="Nombre en la Tarjeta"
                    type="text"
                    value={paymentInfo.cardName}
                    onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                    required
                    fullWidth
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Fecha de Expiración (MM/AA)"
                      type="text"
                      placeholder="MM/AA"
                      value={paymentInfo.expiryDate}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                      required
                    />
                    <Input
                      label="CVV"
                      type="text"
                      placeholder="123"
                      value={paymentInfo.cvv}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="p-6 bg-gray-50 flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep('shipping')}
                >
                  Atrás
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  loading={isProcessing}
                  disabled={isProcessing}
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  {isProcessing ? 'Procesando...' : 'Pagar Ahora'}
                </Button>
              </div>
            </form>
          )}

          {currentStep === 'confirmation' && (
            <div>
              <div className="p-8 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-green-100 p-3">
                    <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Pedido Confirmado!</h2>
                <p className="text-gray-600 mb-6">
                  Gracias por su compra. Su pedido ha sido recibido y está siendo procesado.
                </p>

                <div className="mb-8 p-4 bg-gray-50 rounded-lg inline-block">
                  <p className="text-sm text-gray-600 mb-1">Número de Pedido:</p>
                  <p className="text-lg font-medium">#ORD-{Math.floor(10000 + Math.random() * 90000)}</p>
                </div>

                <div className="border-t border-gray-200 pt-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">Resumen del Pedido</h3>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex justify-between">
                        <span className="text-gray-600">
                          {item.product.name} × {item.quantity}
                        </span>
                        <span className="font-medium">
                          {formatPrice(
                            (item.product.discount
                              ? item.product.price * (1 - item.product.discount / 100)
                              : item.product.price) * item.quantity
                          )}
                        </span>
                      </div>
                    ))}
                    <div className="pt-3 border-t border-gray-200 flex justify-between">
                      <span className="font-bold">Total</span>
                      <span className="font-bold">{formatPrice(getTotalPrice())}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    variant="primary"
                    onClick={handleCompleteOrder}
                    size="lg"
                  >
                    Continuar Comprando
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        {(currentStep === 'shipping' || currentStep === 'payment') && (
          <div className="mt-8 bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="text-lg font-bold mb-4">Resumen del Pedido</h3>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="ml-3">
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-gray-500">Cant: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-medium">
                      {formatPrice(
                        (item.product.discount
                          ? item.product.price * (1 - item.product.discount / 100)
                          : item.product.price) * item.quantity
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 bg-gray-50">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío</span>
                  <span>Gratis</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Impuestos</span>
                  <span>{formatPrice(getTotalPrice() * 0.0825)}</span>
                </div>
                <div className="pt-2 border-t border-gray-200 flex justify-between">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold">
                    {formatPrice(getTotalPrice() + (getTotalPrice() * 0.0825))}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}