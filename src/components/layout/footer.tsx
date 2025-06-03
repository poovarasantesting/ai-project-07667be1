import { Facebook, Instagram, MapPin, Mail, Phone, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">HomeFind</h3>
            <p className="mb-4">
              Find your perfect home with our comprehensive property listings and expert services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/properties" className="hover:text-white">Properties</Link>
              </li>
              <li>
                <Link to="/map" className="hover:text-white">Map View</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Property Types</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/properties?type=house" className="hover:text-white">Houses</Link>
              </li>
              <li>
                <Link to="/properties?type=apartment" className="hover:text-white">Apartments</Link>
              </li>
              <li>
                <Link to="/properties?type=condo" className="hover:text-white">Condos</Link>
              </li>
              <li>
                <Link to="/properties?type=land" className="hover:text-white">Land</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5" />
                <span>123 Main Street, Anytown, ST 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>info@homefind.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} HomeFind. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}