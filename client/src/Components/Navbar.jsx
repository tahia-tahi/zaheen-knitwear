import { Menu, ShoppingBagIcon, User2Icon, X } from "lucide-react";
import React, { useState, useContext } from "react";
import { typography } from "../style/typoghraphy";
import { AuthContext } from "../Provider/AuthContext";
import { useNavigate } from "react-router";
import { useCart } from "../Provider/CartProvider";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const { cart } = useCart()

  const handleLogOut = () => {
    logOut()
      .then(() => console.log("Logged out"))
      .catch((error) => console.error(error));
  };

  return (
    <header className="w-full bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-primary">LOGO</div>

        {/* Desktop Menu */}
        <nav className="hidden md:block">
          <ul className="flex gap-6 text-gray-700 font-medium">
            <li onClick={() => navigate('/')} className="hover:text-primary cursor-pointer">Home</li>
            <li className="hover:text-primary cursor-pointer">About</li>
            <li className="hover:text-primary cursor-pointer">Service</li>
            <li className="hover:text-primary cursor-pointer">Products</li>
            <li className="hover:text-primary cursor-pointer">Blog</li>
          </ul>
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              {/* Cart Icon with Dynamic Count */}
              <div
                onClick={() => navigate('/cart')}
                className="flex items-center gap-1 cursor-pointer relative group"
              >
                <div className="relative">
                  <ShoppingBagIcon size={20} className="group-hover:text-primary transition-colors" />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                      {cart.reduce((total, item) => total + (item.quantity || 1), 0)}
                    </span>
                  )}
                </div>
              </div>

              {/* User Profile */}
              <div className="flex items-center gap-2 cursor-pointer group">
                <img onClick={()=> navigate('/admin-dashboard/manage-products')}
                  src={user?.photoURL || "https://icons8.com/icon/84020/user"}
                  alt="profile"
                  className="w-8 h-8 rounded-full border border-gray-200 object-cover"
                />
                <span className="text-sm font-medium text-gray-700">
                  {user?.displayName?.split(' ')[0] || "Account"}
                </span>
              </div>

              {/* Logout Button */}
              <button onClick={handleLogOut} className={typography.primaryButton}>
                Log Out
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => navigate('/auth/sign-up')} className={typography.primaryButton}>Sign Up</button>
              <button onClick={() => navigate('/auth/log-in')} className={typography.button5}>Login</button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t">
          <ul className={typography.headerMenu}>
            <li className={typography.menuLi}>Home</li>
            <li className={typography.menuLi}>About</li>
            <li className={typography.menuLi}>Service</li>
            <li className={typography.menuLi}>Products</li>
            <li className={typography.menuLi}>Blog</li>
            <hr className="my-2" />
            <div className="flex gap-4 p-2">
              <div className="flex items-center gap-1">
                <ShoppingBagIcon size={18} />
                <span>Cart</span>
              </div>
              <div className="flex items-center gap-1">
                <User2Icon size={18} />
                <span>Account</span>
              </div>
            </div>
            {user ? (
              <button onClick={handleLogOut} className={`${typography.primaryButton} w-full mt-2`}>
                Sign Out
              </button>
            ) : (
              <button className={`${typography.button5} w-full mt-2`}>Login</button>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;