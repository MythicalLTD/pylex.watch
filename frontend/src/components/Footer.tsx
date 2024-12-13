import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-8 shadow-2xl w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo and Copyright */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold tracking-wider mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              MythicalSystems
            </h2>
            <p className="text-sm text-gray-400">
              &copy; 2021-2024 All rights reserved.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex space-x-4">
            {[
              { href: "#", label: "Privacy Policy" },
              { href: "#", label: "Terms of Service" },
              { href: "#", label: "Contact Us" }
            ].map((link) => (
              <a 
                key={link.label}
                href={link.href} 
                className="text-gray-300 transition-all duration-300 hover:text-white hover:scale-105 hover:tracking-wider"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="flex space-x-4">
            {[
              { Icon: Github, href: "#", color: "text-white hover:text-gray-300" },
              { Icon: Linkedin, href: "#", color: "text-blue-500 hover:text-blue-400" },
              { Icon: Twitter, href: "#", color: "text-sky-500 hover:text-sky-400" }
            ].map(({ Icon, href, color }) => (
              <a 
                key={href} 
                href={href} 
                className={`${color} transition-transform duration-300 hover:scale-125`}
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>

        {/* Subtle Divider */}
        <div className="border-t border-gray-700 mt-6 pt-4 text-center">
          <p className="text-xs text-gray-500">
            Crafted with passion by innovative minds
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;