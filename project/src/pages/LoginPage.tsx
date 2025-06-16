import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Monitor } from 'lucide-react';
import toast from 'react-hot-toast';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useAuthStore();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const returnUrl = location.state?.returnUrl || '/';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    const success = await login(formData.email, formData.password);
    
    if (success) {
      toast.success('Sesión iniciada correctamente');
      navigate(returnUrl);
    } else {
      toast.error('Correo electrónico o contraseña inválidos');
      setErrors({
        password: 'Correo electrónico o contraseña inválidos',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Monitor className="h-12 w-12 text-blue-600" />
            <span className="text-3xl font-bold text-blue-600">Pixelyte</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Iniciar Sesión</h1>
          <p className="mt-2 text-gray-600">
            Inicia sesión en tu cuenta para continuar
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Correo Electrónico"
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              fullWidth
            />
            
            <div>
              <Input
                label="Contraseña"
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                fullWidth
              />
              <div className="flex justify-end mt-1">
                <Link to="/auth/recuperar-password" className="text-sm text-blue-600 hover:text-blue-800">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>
            
            <Button 
              type="submit" 
              variant="primary" 
              loading={isLoading}
              disabled={isLoading}
              fullWidth
            >
              Iniciar Sesión
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta?{' '}
              <Link to="/auth/register" className="text-blue-600 hover:text-blue-800 font-medium">
                Regístrate
              </Link>
            </p>
          </div>
        </div>
        
        <div className="text-center text-sm text-gray-500">
          <p>
            Cuenta de prueba: user@example.com / password123
          </p>
        </div>
      </div>
    </div>
  );
}