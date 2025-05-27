import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Facebook, Instagram, Send, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-[#A6A6A6] pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Image 
                src="/icon.svg" 
                alt="ATELIER Logo" 
                width={32} 
                height={32} 
                className="w-6 h-6"
              />
              <h3 className="text-xl text-black font-playfair">AYSEGUL IKNA</h3>
            </div>
            <p className="text-black/80 text-sm leading-relaxed mb-6">
              Creating timeless designs with exceptional craftsmanship. 
              Each piece is meticulously crafted using the finest materials 
              and traditional techniques.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-black/80 hover:text-[#4a4a4a] transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-black/80 hover:text-[#4a4a4a] transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-black/80 hover:text-[#4a4a4a] transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-medium mb-6 text-black">Shop</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/shop?gender=women" className="text-black/80 hover:text-[#4a4a4a] transition-colors text-sm">
                  Women
                </Link>
              </li>
              <li>
                <Link href="/shop?gender=men" className="text-black/80 hover:text-[#4a4a4a] transition-colors text-sm">
                  Men
                </Link>
              </li>
              <li>
                <Link href="/shop?category=accessories" className="text-black/80 hover:text-[#4a4a4a] transition-colors text-sm">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-black/80 hover:text-[#4a4a4a] transition-colors text-sm">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-base font-medium mb-6 text-black">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-black/80 hover:text-[#4a4a4a] transition-colors text-sm">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-black/80 hover:text-[#4a4a4a] transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-base font-medium mb-6 text-black">Newsletter</h3>
            <p className="text-black/80 text-sm mb-4">
              Subscribe to receive updates on new collections and exclusive events.
            </p>
            <div className="flex">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-white border-[#4a4a4a] rounded-l-md text-black"
              />
              <Button 
                variant="default" 
                size="sm" 
                className="rounded-l-none bg-[#4a4a4a] hover:bg-[#3a3a3a]"
              >
                <Send size={16} className="text-white" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-[#4a4a4a]/30 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-black/80 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} AYSEGUL IKNA. All rights reserved.
            </p>
            <div className="flex space-x-4 text-xs text-black/80">
              <Link href="#" className="hover:text-[#4a4a4a] transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-[#4a4a4a] transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-[#4a4a4a] transition-colors">Shipping Policy</Link>
              <Link href="#" className="hover:text-[#4a4a4a] transition-colors">Returns</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer