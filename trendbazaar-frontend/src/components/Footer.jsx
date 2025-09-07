import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-orange-600 text-white mt-12">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 className="font-bold text-lg">TrendBazar</h4>
          <p className="mt-2 text-sm text-yellow-100">Your one stop shop for trending items.</p>
        </div>

        <div>
          <h5 className="font-semibold">Quick Links</h5>
          <ul className="mt-2 space-y-1 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/items" className="hover:underline">Items</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
          </ul>
        </div>

        <div>
          <h5 className="font-semibold">Contact</h5>
          <p className="mt-2 text-sm">support@trendbazar.com</p>
          <p className="text-sm">+91 98765 43210</p>
        </div>
      </div>

      <div className="border-t border-orange-500/30 py-3 text-center text-sm">
        © {new Date().getFullYear()} TrendBazar • Built with ♥
      </div>
    </footer>
  );
};

export default Footer;
