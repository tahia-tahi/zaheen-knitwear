import React from 'react';
import { useCart } from '../Provider/CartProvider';
import { Trash2, ShoppingBasket, ArrowLeft, ImageOff } from 'lucide-react';
import { useNavigate } from 'react-router';

const CartPage = () => {
    const { cart, removeFromCart } = useCart();
    const navigate = useNavigate();

    const totalPrice = cart.reduce((sum, item) => {
        const itemPrice = parseFloat(item.price) || 0; 
        const itemQty = parseInt(item.quantity) || 1;  
        return sum + (itemPrice * itemQty);
    }, 0);

    return (
        <div className="p-4 md:p-10 max-w-6xl mx-auto min-h-screen bg-white">
            <div className="flex items-center justify-between mb-10 border-b pb-5">
                <div className="flex items-center gap-3">
                    <ShoppingBasket className="text-primary" size={32} />
                    <h2 className="text-3xl font-bold text-gray-800">Shopping Cart</h2>
                </div>
                <span className="text-gray-500 font-medium">{cart.length} Items Selected</span>
            </div>

            {cart.length === 0 ? (
                <div className="text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                    <div className="flex justify-center mb-6">
                        <ShoppingBasket size={80} className="text-gray-200" />
                    </div>
                    <p className="text-gray-400 text-xl mb-8">Your cart is feeling light! Add some products.</p>
                    <button 
                        onClick={() => navigate('/')}
                        className="bg-primary text-white px-10 py-4 rounded-xl font-bold hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
                    >
                        <ArrowLeft size={20} />
                        Back to Shop
                    </button>
                </div>
            ) : (
                <div className="flex flex-col lg:flex-row gap-10">
                 
                    <div className="lg:w-2/3 space-y-6">
                        {cart.map((item) => (
                            <div key={item._id} className="flex flex-col sm:flex-row items-center gap-6 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all">
                             
                                <div className="w-full sm:w-32 h-32 flex-shrink-0">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover rounded-xl"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-xl">
                                            <ImageOff size={32} className="text-gray-300" />
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 text-center sm:text-left">
                                    <h3 className="font-bold text-xl text-gray-800 mb-1">{item.name || "Unnamed Product"}</h3>
                                    <p className="text-primary font-bold text-lg">
                                        ${parseFloat(item.price || 0).toFixed(2)}
                                    </p>
                                    <div className="flex items-center justify-center sm:justify-start gap-5 mt-3">
                                        <span className="text-sm text-gray-500">Qty: <strong>{item.quantity || 1}</strong></span>
                                        <span className="text-sm text-gray-500">Subtotal: <strong>${(parseFloat(item.price || 0) * (item.quantity || 1)).toFixed(2)}</strong></span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item._id)}
                                    className="p-3 text-red-400 hover:text-white hover:bg-red-500 rounded-xl transition-all border border-red-50"
                                >
                                    <Trash2 size={22} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="lg:w-1/3">
                        <div className="bg-gray-50 p-8 rounded-3xl sticky top-28 border border-gray-100">
                            <h3 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h3>
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 border-b pb-4">
                                    <span>Shipping Cost</span>
                                    <span className="text-green-600 font-bold  uppercase text-sm">Free</span>
                                </div>
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-lg font-bold">Total Payable</span>
                                    <span className="text-3xl font-black text-primary">
                                        ${totalPrice.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                            <button onClick={()=>navigate('/checkout')} className="w-full bg-primary text-white py-5 rounded-2xl font-black text-xl shadow-lg hover:shadow-primary/30 transition-all active:scale-95">
                                Checkout Now
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;