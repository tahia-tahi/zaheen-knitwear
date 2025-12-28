import {
  CopyIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  SendIcon,
  TwitchIcon,
  CheckIcon, 
} from "lucide-react";
import React, { useState } from "react"; 
import img1 from "../assets/bkash.png";
import img2 from "../assets/cellfin.png";
import img3 from "../assets/mastercard.png";
import img4 from "../assets/next.png";
import img5 from "../assets/nogod.png";
import img6 from "../assets/rocket.png";
import img7 from "../assets/surecash.png";
import img8 from "../assets/taptap.png";
import img9 from "../assets/upai.png";
import { typography } from "../style/typoghraphy";

const Footer = () => {
  const [copy, setCopy] = useState(false);
  const email = "info@zaheen.com";
  const address = "29 SE 2nd Ave, Miami Florida 33131, United States";

  const payments = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

  // Email Copy Function
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopy(true);
    setTimeout(() => setCopy(false), 2000); 
  };

  // Google Map Open Function
  const openGoogleMap = () => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(mapUrl, "_blank");
  };

  return (
    <footer className="bg-gray-50 border-t">
      {/* Top */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Info */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-primary">Zaheen</h1>

          {/* Map */}
          <div 
            onClick={openGoogleMap}
            className="flex items-start gap-3 text-gray-600 text-sm cursor-pointer hover:text-primary transition-colors group"
          >
            <SendIcon size={18} className="group-hover:text-primary" />
            <p>{address}</p>
          </div>

          {/* Email Copy*/}
          <div className="flex items-center gap-3 text-gray-600 text-sm">
            <MailIcon size={18} />
            <p>{email}</p>
            <div onClick={handleCopyEmail} className="cursor-pointer transition-all">
              {copy ? (
                <CheckIcon size={16} className="text-green-600" />
              ) : (
                <CopyIcon size={16} className="opacity-70 hover:opacity-100 hover:text-primary" />
              )}
            </div>
            {copy && <span className="text-[10px] text-green-600 font-bold animate-pulse">Copied!</span>}
          </div>

          <p className="text-gray-600 text-sm">(+92) 3942 7879</p>
        </div>

        {/* Links */}
        <div className="flex gap-16">
          <ul className="space-y-3 text-sm">
            <h3 className={typography.footerLinks2}>Important Links</h3>
            <li className={typography.footerLinks}>About</li>
            <li className={typography.footerLinks}>Service</li>
            <li className={typography.footerLinks}>Blog</li>
          </ul>

          <ul className="space-y-3 text-sm">
            <h3 className={typography.footerLinks2}>Information</h3>
            <li className={typography.footerLinks}>My Account</li>
            <li className={typography.footerLinks}>Corporate Enquiries</li>
            <li className={typography.footerLinks}>FAQs</li>
          </ul>
        </div>

        {/* Payments */}
        <div>
          <h3 className={typography.footerLinks2}>Payment Channels</h3>

          <div className="flex flex-wrap gap-3">
            {payments.map((pay, index) => (
              <div
                key={index}
                className="w-20 h-12 bg-white border rounded-md flex items-center justify-center shadow-sm hover:shadow transition"
              >
                <img
                  src={pay}
                  alt="payment"
                  className="w-full h-full object-contain p-2"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          
          <p>
            © 2025 <span className="text-primary font-medium">360D Soul Limited</span>. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <FacebookIcon className={typography.footerLinks}size={18} />
            <TwitchIcon className={typography.footerLinks} size={18} />
            <InstagramIcon className={typography.footerLinks} size={18} />
          </div>

          <div className="flex gap-4">
            <span className={typography.footerLinks}>Terms</span>
            <span className={typography.footerLinks}>Refund</span>
            <span className={typography.footerLinks}>Privacy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;