import {
  CopyIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  SendIcon,
  TwitchIcon,
} from "lucide-react";
import img1 from "../assets/bkash.png";
import img2 from "../assets/cellfin.png";
import img3 from "../assets/mastercard.png";
import img4 from "../assets/next.png";
import img5 from "../assets/nogod.png";
import img6 from "../assets/rocket.png";
import img7 from "../assets/surecash.png";
import img8 from "../assets/taptap.png";
import img9 from "../assets/upai.png";

const Footer = () => {
  const payments = [img1, img2, img3, img4, img5, img6, img7, img8, img9];

  return (
    <footer className="bg-gray-50 border-t">
      {/* Top */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Info */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-primary">Zaheen</h1>

          <div className="flex items-start gap-3 text-gray-600 text-sm">
            <SendIcon size={18} />
            <p>29 SE 2nd Ave, Miami Florida 33131, United States</p>
          </div>

          <div className="flex items-center gap-3 text-gray-600 text-sm">
            <MailIcon size={18} />
            <p>info@zaheen.com</p>
            <CopyIcon size={16} className="cursor-pointer opacity-70 hover:opacity-100" />
          </div>

          <p className="text-gray-600 text-sm">(+92) 3942 7879</p>
        </div>

        {/* Links */}
        <div className="flex gap-16">
          <ul className="space-y-3 text-sm">
            <h3 className="font-semibold text-gray-900 mb-2">Important Links</h3>
            <li className="hover:text-primary cursor-pointer">About</li>
            <li className="hover:text-primary cursor-pointer">Service</li>
            <li className="hover:text-primary cursor-pointer">Blog</li>
          </ul>

          <ul className="space-y-3 text-sm">
            <h3 className="font-semibold text-gray-900 mb-2">Information</h3>
            <li className="hover:text-primary cursor-pointer">My Account</li>
            <li className="hover:text-primary cursor-pointer">Corporate Enquiries</li>
            <li className="hover:text-primary cursor-pointer">FAQs</li>
          </ul>
        </div>

        {/* Payments */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-4">Payment Channels</h3>

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
            <FacebookIcon className="cursor-pointer hover:text-primary" size={18} />
            <TwitchIcon className="cursor-pointer hover:text-primary" size={18} />
            <InstagramIcon className="cursor-pointer hover:text-primary" size={18} />
          </div>

          <div className="flex gap-4">
            <span className="cursor-pointer hover:text-primary">Terms</span>
            <span className="cursor-pointer hover:text-primary">Refund</span>
            <span className="cursor-pointer hover:text-primary">Privacy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
