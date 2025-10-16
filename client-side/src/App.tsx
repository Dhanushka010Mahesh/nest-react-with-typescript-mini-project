import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { ProductService, type ProductPayload } from './service/ProductService';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface ProductForm {
  name: string;
  price: string;
}

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductForm>({ name: '', price: '' });
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products
const fetchProducts = async () => {
  try {
    setLoading(true);
    const data = await ProductService.getAllProducts();
    setProducts(data);
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  // Create / update product
const handleSubmit = async () => {
  const payload: ProductPayload = {
    name: formData.name,
    price: parseFloat(formData.price),
  };

  try {
    setLoading(true);
    if (editingProduct) {
      await ProductService.updateProduct(editingProduct.id, payload);
    } else {
      await ProductService.createProduct(payload);
    }
    await fetchProducts();
    closeModal();
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  // Delete product
const handleDelete = async (id: number) => {
  if (!window.confirm("Are you sure?")) return;
  try {
    setLoading(true);
    await ProductService.deleteProduct(id);
    await fetchProducts();
  } catch (err: any) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  const openModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({ name: product.name, price: product.price.toString() });
    } else {
      setEditingProduct(null);
      setFormData({ name: '', price: '' });
    }
    setShowModal(true);
    setError('');
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({ name: '', price: '' });
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">Product Management</h1>
            <button
              onClick={() => openModal()}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors shadow-lg"
            >
              <Plus size={20} />
              Add Product
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {loading && !showModal ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-xl">No products found. Create your first product!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">ID</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Name</th>
                    <th className="text-left py-4 px-6 text-gray-700 font-semibold">Price</th>
                    <th className="text-right py-4 px-6 text-gray-700 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 text-gray-600">{product.id}</td>
                      <td className="py-4 px-6 text-gray-800 font-medium">{product.name}</td>
                      <td className="py-4 px-6 text-gray-800">${product.price}</td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => openModal(product)}
                          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 mr-4 transition-colors"
                        >
                          <Edit2 size={18} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 transition-colors"
                        >
                          <Trash2 size={18} />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        // <div className="fixed inset-0 bg-amber-300 bg-opacity-50 flex items-center justify-center p-4 z-50">
         <div className="fixed inset-0 bg-black-500/5 backdrop-blur-md flex items-center justify-center p-4 z-50">
  <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>

            <div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter product name"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter price"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? 'Saving...' : editingProduct ? 'Update' : 'Create'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;