import React, { useState } from 'react';
import { useCart } from '../Provider/CartProvider';
import { useNavigate } from 'react-router';
import { CheckCircle, Truck, MapPin, Phone, User, ArrowLeft, ShoppingCart } from 'lucide-react';

const CheckoutPage = () => {
    const { cart, clearCart } = useCart();
    const navigate = useNavigate();
    const [orderSuccess, setOrderSuccess] = useState(false);

    const totalPrice = cart.reduce((sum, item) => sum + (Number(item.price) * (item.quantity || 1)), 0);

    const handleConfirmOrder = (e) => {
        e.preventDefault();
        setOrderSuccess(true);
        setTimeout(() => {
            clearCart(); 
        }, 2000);
    };

    if (orderSuccess) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-5 text-center bg-white">
                <CheckCircle size={100} className="text-green-500 mb-5 animate-bounce" />
                <h2 className="text-4xl font-black text-gray-800">Order Confirmed!</h2>
                <p className="text-base mt-3 text-lg max-w-md mx-auto">
                    Thank you for your purchase. Your order is being processed and will be with you soon.
                </p>
                <button 
                    onClick={() => navigate('/')} 
                    className="mt-10 bg-primary text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-primary/30 hover:-translate-y-1 transition-all"
                >
                    Return to Home
                </button>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-10 max-w-6xl mx-auto min-h-screen">
            <div className="flex items-center justify-between mb-8">
                <button 
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-sm font-bold text-base hover:text-primary transition-colors group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Shop
                </button>
                <button 
                    onClick={() => navigate('/cart')}
                    className="flex items-center gap-2 text-sm font-bold text-secondary hover:underline"
                >
                    <ShoppingCart size={16} />
                    Review Cart
                </button>
            </div>
            <h2 className="text-4xl font-black mb-10 flex items-center gap-3 text-gray-800">
                <Truck className="text-primary" size={36} /> Checkout
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Form */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50">
                    <h3 className="text-xl font-bold mb-8 text-gray-800 border-l-4 border-secondary pl-4">Shipping Information</h3>
                    <form onSubmit={handleConfirmOrder} className="space-y-5">
                        <div className="relative group">
                            <User className="absolute left-4 top-4 text-gray-400 group-focus-within:text-secondary transition-colors" size={18} />
                            <input type="text" placeholder="Full Name" required className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all" />
                        </div>
                        <div className="relative group">
                            <Phone className="absolute left-4 top-4 text-gray-400 group-focus-within:text-secondary transition-colors" size={18} />
                            <input type="tel" placeholder="Phone Number" required className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all" />
                        </div>
                        <div className="relative group">
                            <MapPin className="absolute left-4 top-4 text-gray-400 group-focus-within:text-secondary transition-colors" size={18} />
                            <textarea placeholder="Full Shipping Address" required className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all h-32 resize-none" />
                        </div>

                        <div className="p-5 bg-secondary/5 rounded-2xl border border-secondary/10 mt-6">
                            <p className="text-secondary text-sm font-bold flex items-center gap-2">
                                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
                                Payment Method: Cash on Delivery
                            </p>
                        </div>

                        <button type="submit" className="w-full bg-primary text-white py-5 rounded-2xl font-black text-xl mt-6 shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all active:scale-[0.98]">
                            Confirm Order (${totalPrice.toFixed(2)})
                        </button>
                    </form>
                </div>

                {/* Order Summary  */}
                <div className="bg-gray-50/50 p-8 rounded-[2.5rem] h-fit border border-gray-100 sticky top-10">
                    <h3 className="text-xl font-bold mb-6 text-gray-800">In Your Cart ({cart.length})</h3>
                    <div className="space-y-4 max-h-100 overflow-y-auto pr-2 mb-8 custom-scrollbar">
                        {cart.map(item => (
                            <div key={item._id} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                <img src={item.image} alt="" className="w-20 h-20 object-cover rounded-xl" />
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-800 text-sm line-clamp-1">{item.name}</h4>
                                    <p className="text-xs text-base font-medium mt-1">${item.price} x {item.quantity}</p>
                                </div>
                                <span className="font-black text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    
                    <div className="space-y-3 pt-6 border-t border-gray-200">
                        <div className="flex justify-between text-base font-medium">
                            <span>Subtotal</span>
                            <span className="text-gray-800 font-bold">${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-base font-medium">
                            <span>Shipping Fee</span>
                            <span className="text-green-600 font-bold">FREE</span>
                        </div>
                        <div className="flex justify-between pt-5 border-t border-gray-200 mt-2">
                            <span className="text-xl font-black text-gray-800">Total Payable</span>
                            <span className="text-3xl font-black text-primary">${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;