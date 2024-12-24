"use client"

import Link from 'next/link';
import { ChevronUp, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black/20 border-t border-white/10 mt-auto backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Description */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center space-x-2">
              <span className="text-white text-2xl font-bold">PYLEX</span>
              <span className="text-white text-2xl font-light">WATCH</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-md">
              Your premier destination for streaming entertainment. Watch your favorite movies 
              and TV shows in high quality, completely free and without any registration required.
            </p>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/request" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Request Content
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/dmca" className="text-sm text-gray-400 hover:text-white transition-colors">
                  DMCA
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              <span>by</span>
              <a 
                href="https://github.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-primary transition-colors"
              >
                YourSexyAndYouKnowIt
              </a>
            </div>

            <Button 
              onClick={scrollToTop}
              variant="ghost" 
              size="sm" 
              className="group hover:bg-white/10"
            >
              <span className="mr-2">Back to top</span>
              <ChevronUp className="h-4 w-4 group-hover:-translate-y-0.5 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
