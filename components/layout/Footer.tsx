import { Facebook, Instagram } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-[#FFFFFF] pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* About - Full width on mobile */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="flex items-center gap-4 mb-6">
              <Image 
                src="/icon.svg" 
                alt="ATELIER Logo" 
                width={48} 
                height={48}
                className="w-10 h-10"
              />
              <h3 
                className="text-5xl text-black tracking-[0.08em]"
                style={{ fontFamily: 'LostInSouth, sans-serif' }}
              >
                AYSEGUL IKNA
              </h3>
            </div>
            <p 
              className="text-base text-black/80 leading-relaxed mb-6 max-w-md"
              style={{ fontFamily: 'HellasFun, sans-serif' }}
            >
              Creating timeless designs with exceptional craftsmanship. 
              Each piece is meticulously crafted using the finest materials 
              and traditional techniques.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/aysegul.ikna/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black/80 hover:text-[#4a4a4a] transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100066728011543&ref=_xav_ig_profile_page_web"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black/80 hover:text-[#4a4a4a] transition-colors"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div></div>

          {/* Shop and Company */}
          <div className="grid grid-cols-2 gap-8 md:gap-12 md:col-span-1 lg:col-span-1">
            {/* Quick Links */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <h3 
                className="text-4xl mb-6 text-black tracking-wider"
                style={{ fontFamily: 'Hornset, sans-serif', letterSpacing: '0.1em' }}
              >
                Designs
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/shop"
                    className="text-xl text-black/80 hover:text-[#4a4a4a] transition-colors tracking-wider"
                    style={{ fontFamily: 'Hornset, sans-serif', letterSpacing: '0.1em' }}
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/collections"
                    className="text-xl text-black/80 hover:text-[#4a4a4a] transition-colors tracking-wider"
                    style={{ fontFamily: 'Hornset, sans-serif', letterSpacing: '0.1em' }}
                  >
                    Collections
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <h3 
                className="text-4xl mb-6 text-black tracking-wider"
                style={{ fontFamily: 'Hornset, sans-serif', letterSpacing: '0.1em' }}
              >
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    href="/about"
                    className="text-xl text-black/80 hover:text-[#4a4a4a] transition-colors tracking-wider"
                    style={{ fontFamily: 'Hornset, sans-serif', letterSpacing: '0.1em' }}
                  >
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/contact"
                    className="text-xl text-black/80 hover:text-[#4a4a4a] transition-colors tracking-wider"
                    style={{ fontFamily: 'Hornset, sans-serif', letterSpacing: '0.1em' }}
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-[#4a4a4a]/30 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p 
              className="text-sm text-black/80 mb-4 md:mb-0"
              style={{ fontFamily: 'Hellasfun, sans-serif' }}
            >
              &copy; {new Date().getFullYear()} AYSEGUL IKNA. All rights reserved.
            </p>
            <div className="flex items-center space-x-2">
              <span 
                className="text-sm text-black/80"
                style={{ fontFamily: 'HellasFun, sans-serif' }}
              >
                Curated with intention by
              </span>
              <a
                href="https://www.rovstudios.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image 
                  src="/rov_black.png" 
                  alt="ROV Logo"
                  width={80}
                  height={28}
                  className="h-6 w-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
