import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { User, ShoppingBag, CreditCard, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

export function AccountPage() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuthStore();

  // Redirect if not logged in
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    toast.success('Sesión cerrada exitosamente');
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Mi Cuenta</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>Menú de Cuenta</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  <a href="#profile" className="flex items-center p-2 rounded-md bg-gray-100 text-gray-900 font-medium">
                    <User className="h-5 w-5 mr-3 text-gray-600" />
                    Perfil
                  </a>
                  <a href="/orders" className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-50">
                    <ShoppingBag className="h-5 w-5 mr-3 text-gray-600" />
                    Pedidos
                  </a>
                  <a href="#payment" className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-50">
                    <CreditCard className="h-5 w-5 mr-3 text-gray-600" />
                    Métodos de Pago
                  </a>
                  <button
                    onClick={handleLogout}
                    className="flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-50 w-full text-left"
                  >
                    <LogOut className="h-5 w-5 mr-3 text-gray-600" />
                    Cerrar Sesión
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div className="w-full md:w-2/3">
            {/* Profile Section */}
            <Card id="profile" className="mb-8">
              <CardHeader>
                <CardTitle>Información del Perfil</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="flex items-center mb-6">
                    <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <User size={32} className="text-blue-700" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">{user.name}</h3>
                      <p className="text-gray-600">{user.email}</p>
                    </div>
                  </div>

                  <Input
                    label="Nombre Completo"
                    type="text"
                    value={user.name}
                    fullWidth
                    disabled
                  />

                  <Input
                    label="Correo Electrónico"
                    type="email"
                    value={user.email}
                    fullWidth
                    disabled
                  />

                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-4">Cambiar Contraseña</h4>
                    <div className="space-y-4">
                      <Input
                        label="Contraseña Actual"
                        type="password"
                        fullWidth
                      />

                      <Input
                        label="Nueva Contraseña"
                        type="password"
                        fullWidth
                      />

                      <Input
                        label="Confirmar Nueva Contraseña"
                        type="password"
                        fullWidth
                      />
                    </div>
                  </div>

                  <Button variant="primary">
                    Guardar Cambios
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card id="payment">
              <CardHeader>
                <CardTitle>Métodos de Pago</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">No has agregado ningún método de pago todavía.</p>
                  <Button variant="outline">
                    <CreditCard className="mr-2 h-5 w-5" />
                    Agregar Método de Pago
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}