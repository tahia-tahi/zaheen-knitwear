import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Plus, Package, DollarSign, Tag, Image as ImageIcon } from 'lucide-react';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);

    // Product Load
    const fetchProducts = () => {
        axios.get(`${import.meta.envVITE_API_URL}/products`)
            .then(res => setProducts(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Add Product
    const handleAddProduct = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const price = form.price.value;
        const image = form.image.value;
        const category = form.category.value;

        const newProduct = { name, price: parseFloat(price), image, category };

        axios.post(`${import.meta.envVITE_API_URL}/products`, newProduct)
            .then(res => {
                if (res.data.success) {
                    alert('Product Added Successfully!');
                    form.reset();
                    fetchProducts(); 
                }
            })
            .catch(err => console.error(err));
    };

    // Delete Product
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`)
                .then(res => {
                    if (res.data.success || res.data.deletedCount > 0) {
                        fetchProducts();
                    }
                })
                .catch(err => console.error(err));
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-black text-gray-800">Inventory Management</h2>
                    <p className="text-gray-500 text-sm">Add and manage your store's clothing line.</p>
                </div>
                <div className="bg-primary/10 px-4 py-2 rounded-lg text-primary font-bold text-sm">
                    Total: {products.length} Products
                </div>
            </div>

            {/* Product Add Form Card */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                    <Plus className="text-primary" size={20} />
                    <h3 className="font-bold text-gray-700">Add New Product</h3>
                </div>
                
                <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase ml-1">Product Name</label>
                        <div className="relative">
                            <Package className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input type="text" name="name" placeholder="e.g. Slim Fit Blazer" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all" required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase ml-1">Price ($)</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input type="number" name="price" placeholder="99.99" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all" required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase ml-1">Category</label>
                        <div className="relative">
                            <Tag className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input type="text" name="category" placeholder="e.g. Formal" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all" required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase ml-1">Image URL</label>
                        <div className="relative">
                            <ImageIcon className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input type="text" name="image" placeholder="ImgBB Link" className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all" required />
                        </div>
                    </div>

                    <button type="submit" className="lg:col-span-4 bg-primary text-white py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-[0.98]">
                        Confirm & Add Product
                    </button>
                </form>
            </div>

            {/* Products Table Card */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="p-5 text-xs font-bold text-gray-400 uppercase">Product</th>
                                <th className="p-5 text-xs font-bold text-gray-400 uppercase">Category</th>
                                <th className="p-5 text-xs font-bold text-gray-400 uppercase">Price</th>
                                <th className="p-5 text-xs font-bold text-gray-400 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {products.map(product => (
                                <tr key={product._id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="p-5">
                                        <div className="flex items-center gap-4">
                                            <img src={product.image} alt="" className="w-14 h-14 object-cover rounded-2xl border border-gray-100 shadow-sm" />
                                            <span className="font-bold text-gray-700">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-5">
                                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold uppercase">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="p-5 font-black text-gray-800">${product.price}</td>
                                    <td className="p-5 text-right">
                                        <button 
                                            onClick={() => handleDelete(product._id)} 
                                            className="p-3 text-red-400 hover:text-white hover:bg-red-500 rounded-xl transition-all inline-flex items-center gap-2"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageProducts;