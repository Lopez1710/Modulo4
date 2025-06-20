import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { AlertCircle } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <AlertCircle className="h-20 w-20 mx-auto text-blue-600 mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Página no encontrada</h2>
        <p className="text-gray-600 mb-8">
          La página que buscas no existe o ha sido movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            as={Link}
            to="/"
            variant="primary"
          >
            Volver al inicio
          </Button>
          <Button
            as={Link}
            to="/contact"
            variant="outline"
          >
            Contactar soporte
          </Button>
        </div>
      </div>
    </div>
  );
}