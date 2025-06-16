import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { formatPrice } from '../lib/utils';
import { ShoppingBag, ChevronRight, PackageOpen } from 'lucide-react';

// Mock order data - in a real app this would come from an API
const mockOrders = [
  {
    id: 'ORD-12345',
    date: '2023-04-15',
    total: 1299.99,
    status: 'delivered',
    items: [
      {
        id: '1',
        name: 'iPhone 15 Pro',
        price: 999.99,
        quantity: 1,
        image: 'https://images.pexels.com/photos/5741606/pexels-photo-5741606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: '12',
        name: 'Logitech MX Master 3S',
        price: 99.99,
        quantity: 3,
        image: 'https://images.pexels.com/photos/3944377/pexels-photo-3944377.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
    ],
  },
  {
    id: 'ORD-23456',
    date: '2023-03-28',
    total: 399,
    status: 'processing',
    items: [
      {
        id: '3',
        name: 'Sony WH-1000XM5',
        price: 399,
        quantity: 1,
        image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
    ],
  },
];

export function OrdersPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  
  // Redirect if not logged in
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (mockOrders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-lg mx-auto">
          <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Orders Yet</h1>
          <p className="text-gray-600 mb-8">
            You haven't placed any orders yet. Start shopping to see your orders here.
          </p>
          <Button as={Link} to="/" variant="primary">
            Start Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Orders</h1>
      
      <div className="space-y-6">
        {mockOrders.map((order) => (
          <Card key={order.id} className="overflow-hidden">
            {/* Order Header */}
            <div className="bg-gray-50 p-6 border-b">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium">Order #{order.id}</h3>
                    <span className={`ml-4 px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusBadgeColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Placed on {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">Total</p>
                  <p className="text-lg font-bold">{formatPrice(order.total)}</p>
                </div>
              </div>
            </div>
            
            {/* Order Items */}
            <div className="p-6">
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <Link to={`/product/${item.id}`} className="flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </Link>
                    <div className="flex-grow">
                      <Link 
                        to={`/product/${item.id}`} 
                        className="font-medium text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatPrice(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Order Footer */}
            <div className="p-6 bg-gray-50 border-t flex justify-between items-center">
              <div>
                {order.status === 'processing' && (
                  <div className="flex items-center text-blue-600">
                    <PackageOpen size={18} className="mr-2" />
                    <span className="text-sm">Your order is being prepared</span>
                  </div>
                )}
                {order.status === 'shipped' && (
                  <div className="flex items-center text-blue-600">
                    <PackageOpen size={18} className="mr-2" />
                    <span className="text-sm">Your order is on its way</span>
                  </div>
                )}
              </div>
              <Button
                variant="outline" 
                size="sm"
                className="flex items-center"
                as={Link}
                to="#"
              >
                Order Details
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}