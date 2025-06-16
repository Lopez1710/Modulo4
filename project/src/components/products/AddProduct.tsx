import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Category } from '../../types';
import { Plus, Minus, Upload, DollarSign, Percent, Package, Star, LayoutGrid, Tag, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

type SpecificationsEntry = {
    key: string;
    value: string;
};

export function AddProduct() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '' as Category | '',
        stock: '',
        featured: false,
        discount: '',
        rating: '0',
    });

    // Specifications state as array of key-value pairs for easier manipulation
    const [specifications, setSpecifications] = useState<SpecificationsEntry[]>([
        { key: '', value: '' }
    ]);

    // Add a new specification field
    const addSpecification = () => {
        setSpecifications([...specifications, { key: '', value: '' }]);
    };

    // Remove a specification field
    const removeSpecification = (index: number) => {
        const newSpecifications = [...specifications];
        newSpecifications.splice(index, 1);
        setSpecifications(newSpecifications);
    };

    // Update specification field
    const updateSpecification = (index: number, field: 'key' | 'value', value: string) => {
        const newSpecifications = [...specifications];
        newSpecifications[index][field] = value;
        setSpecifications(newSpecifications);
    };

    // Handle image upload
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.description || !formData.price || !formData.category) {
            toast.error('Por favor completa todos los campos requeridos');
            return;
        }

        // Filter out empty specifications
        const validSpecifications = specifications.filter(
            spec => spec.key.trim() !== '' && spec.value.trim() !== ''
        );

        // Convert specifications array to object
        const specsObject = validSpecifications.reduce((acc, { key, value }) => {
            acc[key] = value;
            return acc;
        }, {} as Record<string, string>);

        try {
            setIsLoading(true);

            // Create product object
            const productData = {
                id: Date.now().toString(), // Temporary ID for demo
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                image: imagePreview || 'https://placehold.co/600x400?text=Product+Image',
                category: formData.category as Category,
                rating: parseFloat(formData.rating),
                stock: parseInt(formData.stock),
                featured: formData.featured,
                specifications: specsObject,
                discount: formData.discount ? parseFloat(formData.discount) : undefined,
            };

            // Here you would typically send the data to an API
            console.log('Product data:', productData);

            // Simulate API call delay
            setTimeout(() => {
                setIsLoading(false);
                toast.success('Producto creado con éxito');
                navigate('/'); // Navigate back to home or products page
            }, 1000);
        } catch (error) {
            setIsLoading(false);
            toast.error('Error al crear el producto');
            console.error('Error creating product:', error);
        }
    };

    const categories: { label: string; value: Category }[] = [
        { label: 'Smartphones', value: 'smartphones' },
        { label: 'Portátiles', value: 'laptops' },
        { label: 'Tablets', value: 'tablets' },
        { label: 'Audio', value: 'audio' },
        { label: 'Accesorios', value: 'accessories' },
        { label: 'Gaming', value: 'gaming' },
        { label: 'Cámaras', value: 'cameras' },
        { label: 'Wearables', value: 'wearables' },
    ];

    return (
        <div className="container mx-auto px-4 py-12 bg-gray-50">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Agregar Nuevo Producto</h1>
                <p className="text-gray-600 mb-8">Complete el formulario para crear un nuevo producto en el catálogo.</p>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Information Section */}
                    <div className="bg-white rounded-xl shadow-sm border p-6 transition-all hover:shadow-md">
                        <div className="flex items-center mb-6">
                            <Tag className="h-6 w-6 text-blue-600 mr-2" />
                            <h2 className="text-xl font-semibold text-gray-800">Información Básica</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Product Name */}
                            <div className="col-span-2">
                                <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    Nombre del Producto* <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                                    placeholder="Ej: iPhone 14 Pro Max"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div className="col-span-2">
                                <label htmlFor="description" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <FileText className="h-4 w-4 text-gray-500 mr-1" />
                                    Descripción <span className="text-red-500 ml-1">*</span>
                                </label>
                                <textarea
                                    id="description"
                                    rows={4}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                                    placeholder="Describe las características principales del producto..."
                                    required
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <label htmlFor="price" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <DollarSign className="h-4 w-4 text-gray-500 mr-1" />
                                    Precio <span className="text-red-500 ml-1">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-3 text-gray-500">$</span>
                                    <input
                                        type="number"
                                        id="price"
                                        min="0"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full pl-8 rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                                        placeholder="0.00"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Discount */}
                            <div>
                                <label htmlFor="discount" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <Percent className="h-4 w-4 text-gray-500 mr-1" />
                                    Descuento (%)
                                </label>
                                <input
                                    type="number"
                                    id="discount"
                                    min="0"
                                    max="100"
                                    value={formData.discount}
                                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                                    className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                                    placeholder="0"
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label htmlFor="category" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <LayoutGrid className="h-4 w-4 text-gray-500 mr-1" />
                                    Categoría <span className="text-red-500 ml-1">*</span>
                                </label>
                                <select
                                    id="category"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value as Category })}
                                    className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500 transition-colors bg-white"
                                    required
                                >
                                    <option value="">Seleccionar categoría</option>
                                    {categories.map((category) => (
                                        <option key={category.value} value={category.value}>
                                            {category.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Stock */}
                            <div>
                                <label htmlFor="stock" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <Package className="h-4 w-4 text-gray-500 mr-1" />
                                    Stock <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="number"
                                    id="stock"
                                    min="0"
                                    value={formData.stock}
                                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                    className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                                    placeholder="0"
                                    required
                                />
                            </div>

                            {/* Rating */}
                            <div>
                                <label htmlFor="rating" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                                    <Star className="h-4 w-4 text-gray-500 mr-1" />
                                    Calificación (0-5)
                                </label>
                                <input
                                    type="number"
                                    id="rating"
                                    min="0"
                                    max="5"
                                    step="0.1"
                                    value={formData.rating}
                                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                                    className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                                    placeholder="0.0"
                                />
                            </div>

                            {/* Featured */}
                            <div>
                                <div className="flex items-center h-full pt-6">
                                    <input
                                        type="checkbox"
                                        id="featured"
                                        checked={formData.featured}
                                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-5 w-5"
                                    />
                                    <label htmlFor="featured" className="ml-2 text-sm font-medium text-gray-700">
                                        Producto Destacado
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image Upload Section */}
                    <div className="bg-white rounded-xl shadow-sm border p-6 transition-all hover:shadow-md">
                        <div className="flex items-center mb-6">
                            <Upload className="h-6 w-6 text-blue-600 mr-2" />
                            <h2 className="text-xl font-semibold text-gray-800">Imagen del Producto</h2>
                        </div>

                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50 transition-all hover:border-blue-400 cursor-pointer">
                            {imagePreview ? (
                                <div className="mb-4 w-full">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="mx-auto max-h-64 object-contain rounded-md shadow-sm"
                                    />
                                </div>
                            ) : (
                                <div className="text-center mb-4">
                                    <Upload className="mx-auto h-16 w-16 text-gray-400" />
                                    <p className="mt-2 text-sm text-gray-600">
                                        Arrastra y suelta una imagen, o haz click para seleccionar
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        PNG, JPG, GIF hasta 10MB
                                    </p>
                                </div>
                            )}

                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <Button
                                type="button"
                                variant="outline"
                                as="label"
                                htmlFor="image"
                                className="mt-4"
                            >
                                {imagePreview ? 'Cambiar Imagen' : 'Seleccionar Imagen'}
                            </Button>

                            {imagePreview && (
                                <button
                                    type="button"
                                    className="mt-2 text-sm text-red-600 hover:text-red-800"
                                    onClick={() => setImagePreview(null)}
                                >
                                    Eliminar imagen
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Specifications Section */}
                    <div className="bg-white rounded-xl shadow-sm border p-6 transition-all hover:shadow-md">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center">
                                <LayoutGrid className="h-6 w-6 text-blue-600 mr-2" />
                                <h2 className="text-xl font-semibold text-gray-800">Especificaciones</h2>
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addSpecification}
                                className="bg-white hover:bg-gray-50"
                            >
                                <Plus size={16} className="mr-1 text-blue-600" /> Agregar Campo
                            </Button>
                        </div>

                        <div className="space-y-4">
                            {specifications.map((spec, index) => (
                                <div
                                    key={index}
                                    className="flex gap-4 p-3 border border-gray-100 rounded-lg bg-gray-50 hover:border-gray-200 transition-all"
                                >
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            placeholder="Característica (ej: Procesador)"
                                            value={spec.key}
                                            onChange={(e) => updateSpecification(index, 'key', e.target.value)}
                                            className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500 bg-white"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            placeholder="Valor (ej: Intel Core i7)"
                                            value={spec.value}
                                            onChange={(e) => updateSpecification(index, 'value', e.target.value)}
                                            className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500 bg-white"
                                        />
                                    </div>
                                    {specifications.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="text-gray-400 hover:text-red-500 hover:bg-red-50"
                                            onClick={() => removeSpecification(index)}
                                        >
                                            <Minus size={18} />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit Section */}
                    <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate(-1)}
                            className="px-6"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            loading={isLoading}
                            disabled={isLoading}
                            className="px-8"
                        >
                            {isLoading ? 'Creando...' : 'Crear Producto'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}