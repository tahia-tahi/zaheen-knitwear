import { ShoppingBasket } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { typography } from '../style/typoghraphy';
import Loading from './Loading';
import { useCart } from '../Provider/CartProvider';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const {addToCart} = useCart()

  // Fetch products from backend
  useEffect(() => {
    fetch('http://localhost:3000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Products fetch error:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="py-20 flex justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold mb-10">Our Apparels</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div key={product._id} className="bg-white rounded-xl overflow-hidden shadow-2xl">
            <img
              src={product.image || 'https://via.placeholder.com/300x300'}
              alt={product.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-700 mt-1">${product.price}</p>

              {/* Buttons */}
              <div className="flex justify-between items-center gap-2 mt-4">
                <button onClick={()=>addToCart(product)} className={`${typography.button4} flex items-center gap-2`}>
                  <ShoppingBasket />
                  Add to Cart
                </button>
                <button className={`${typography.button5}`}>Buy Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
