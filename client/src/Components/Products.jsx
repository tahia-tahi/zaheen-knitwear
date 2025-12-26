import { ShoppingBasket } from 'lucide-react';
import React, { useEffect, useState, useContext } from 'react'; 
import { typography } from '../style/typoghraphy';
import Loading from './Loading';
import { useCart } from '../Provider/CartProvider';
import { useNavigate, useLocation } from 'react-router';
import { AuthContext } from '../Provider/AuthContext';
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Fetch products from backend
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}}/products`)
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

  const handleAction = (action, product) => {
    if (user) {
      if (action === 'addToCart') {
        addToCart(product);
      } else if (action === 'buyNow') {
        addToCart(product);
        navigate('/checkout');
      }
    } else {
      navigate('/auth/log-in', { state: { from: location } });
    }
  };

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

              {/* Buttons with Logic */}
              <div className="flex justify-between items-center gap-2 mt-4">
                <button
                  onClick={() => handleAction('addToCart', product)}
                  className={`${typography.button4} flex items-center w-full justify-center`}
                >
                  <ShoppingBasket size={18} />
                  Add to Cart
                </button>
                <button
                  onClick={() => handleAction('buyNow', product)}
                  className={`${typography.button5} w-full`}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;