import { useState, useEffect } from 'react';
import axios from 'axios';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
// Product Load
    const fetchProducts = () => {
        axios.get('http://localhost:3000/api/products')
            .then(res => setProducts(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Add
    const handleAddProduct = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const price = form.price.value;
        const image = form.image.value;
        const category = form.category.value;

        const newProduct = { name, price: parseFloat(price), image, category };

        axios.post('http://localhost:3000/api/products', newProduct)
            .then(res => {
                if (res.data.success) {
                    alert('Product Added!');
                    form.reset();
                    fetchProducts(); 
                }
            })
            .catch(err => console.error(err));
    };

    // Delete
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            axios.delete(`http://localhost:3000/api/products/${id}`)
                .then(res => {
                    if (res.data.success || res.data.deletedCount > 0) {
                        alert('Deleted!');
                        fetchProducts();
                    }
                })
                .catch(err => console.error(err));
        }
    };

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold mb-5">Manage Products</h2>

            {/* Product Add Form */}
            <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 p-6 rounded-lg mb-10 shadow-sm">
                <input type="text" name="name" placeholder="Product Name" className="p-2 border rounded outline-none" required />
                <input type="number" name="price" placeholder="Price" className="p-2 border rounded outline-none" required />
                <input type="text" name="category" placeholder="Category (e.g. Suit)" className="p-2 border rounded outline-none" required />
                <input type="text" name="image" placeholder="ImgBB Image URL" className="p-2 border rounded outline-none" required />
                <button type="submit" className="md:col-span-4 bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700">Add Product</button>
            </form>

            {/* Products Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-3 border">Image</th>
                            <th className="p-3 border">Name</th>
                            <th className="p-3 border">Category</th>
                            <th className="p-3 border">Price</th>
                            <th className="p-3 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id} className="hover:bg-gray-50">
                                <td className="p-3 border">
                                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                                </td>
                                <td className="p-3 border">{product.name}</td>
                                <td className="p-3 border">{product.category}</td>
                                <td className="p-3 border">${product.price}</td>
                                <td className="p-3 border text-center">
                                    <button 
                                        onClick={() => handleDelete(product._id)} 
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProducts;