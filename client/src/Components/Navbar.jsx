import { CarIcon, Menu, User2Icon, X } from "lucide-react";
import React, { useState } from "react";
import { typography } from "../style/typoghraphy";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="text-2xl font-bold text-primary">
          LOGO
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:block">
          <ul className="flex gap-6 text-gray-700 font-medium">
            <li className="hover:text-primary cursor-pointer">Home</li>
            <li className="hover:text-primary cursor-pointer">About</li>
            <li className="hover:text-primary cursor-pointer">Service</li>
            <li className="hover:text-primary cursor-pointer">Products</li>
            <li className="hover:text-primary cursor-pointer">Blog</li>
          </ul>
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-1 cursor-pointer">
            <CarIcon size={18} />
            <span className="text-sm">Cart</span>
          </div>

          <div className="flex items-center gap-1 cursor-pointer">
            <User2Icon size={18} />
            <span className="text-sm">Account</span>
          </div>

          <button className={typography.primaryButton}>
            Contact Us
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
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

            <hr />

            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <CarIcon size={18} />
                <span>Cart</span>
              </div>
              <div className="flex items-center gap-1">
                <User2Icon size={18} />
                <span>Account</span>
              </div>
            </div>

            <button className={typography.primaryButton}>
              Contact Us
            </button>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
