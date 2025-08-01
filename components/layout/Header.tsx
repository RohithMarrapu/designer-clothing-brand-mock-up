"use client"

import { useWishlist } from '@/lib/context/WishlistContext'
import { cn } from '@/lib/utils'
import { Heart, Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { wishlistItems } = useWishlist()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-[#FAF0DF]/90 backdrop-blur-sm shadow-sm' 
          : 'bg-[#FAF0DF]'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Left Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  'text-base font-bold tracking-wide hover:text-[#4a4a4a] transition-colors',
                  pathname === link.path 
                    ? 'text-black' 
                    : 'text-black/80'
                )}
                style={{ fontFamily: 'NATS, sans-serif' }}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Left Side: Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-black hover:text-[#4a4a4a] transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Centered Logo Image - Larger Size */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/">
              <Image 
                src="/logo.png" // Update this path to your actual image file
                alt="AYSEGUL IKNA Logo"
                width={220} // Increased width
                height={80} // Increased height
                className="h-12 w-auto sm:h-16" // Larger responsive sizes
                priority // Ensures priority loading for the logo
              />
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center ml-auto">
            <Link 
              href="/wishlist" 
              className="relative p-2 text-black/80 hover:text-[#4a4a4a] transition-colors"
            >
              <Heart size={24} />
              {wishlistItems.length > 0 && (
                <span 
                  className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-sm font-bold text-white bg-[#4a4a4a] rounded-full"
                  style={{ fontFamily: 'NATS, sans-serif' }}
                >
                  {wishlistItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="lg:hidden bg-[#FAF0DF] shadow-lg p-4">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'px-4 py-3 text-lg font-bold tracking-wide hover:text-[#4a4a4a] transition-colors',
                  pathname === link.path 
                    ? 'text-black' 
                    : 'text-black/80'
                )}
                style={{ fontFamily: 'NATS, sans-serif' }}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}

export default Header