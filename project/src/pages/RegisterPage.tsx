import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Monitor } from 'lucide-react';
import toast from 'react-hot-toast';

export function RegisterPage() {
  const navigate = useNavigate();
  const { register, isLoading } = useAuthStore();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    
    if (!formData.email) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    const success = await register(formData.name, formData.email, formData.password);
    
    if (success) {
      toast.success('¡Cuenta creada exitosamente!');
      navigate('/');
    } else {
      toast.error('Ya existe una cuenta con este correo electrónico');
      setErrors({
        email: 'Ya existe una cuenta con este correo electrónico',
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
          <h1 className="text-3xl font-bold text-gray-900">Crear Cuenta</h1>
          <p className="mt-2 text-gray-600">
            Únete a Pixelyte para comprar la última tecnología
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Nombre"
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              fullWidth
            />
            
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
            
            <Input
              label="Confirmar Contraseña"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              fullWidth
            />
            
            <Button 
              type="submit" 
              variant="primary" 
              loading={isLoading}
              disabled={isLoading}
              fullWidth
            >
              Crear Cuenta
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/auth/login" className="text-blue-600 hover:text-blue-800 font-medium">
                Iniciar Sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}