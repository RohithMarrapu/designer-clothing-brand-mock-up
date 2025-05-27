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
          ? 'bg-[#A6A6A6]/90 backdrop-blur-sm shadow-sm' 
          : 'bg-[#A6A6A6]'
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2"
          >
            <Image 
              src="/icon.svg" 
              alt="ATELIER Logo" 
              width={32} 
              height={32} 
              className="w-6 h-6 sm:w-8 sm:h-8"
            />
            <span className="text-xl sm:text-2xl font-semibold tracking-tight font-playfair text-black hover:text-[#4a4a4a] transition-colors">
              AYSEGUL IKNA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  'text-sm tracking-wide hover:text-[#4a4a4a] transition-colors',
                  pathname === link.path 
                    ? 'text-black font-medium' 
                    : 'text-black/80'
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center">
            <Link 
              href="/wishlist" 
              className="relative p-2 text-black/80 hover:text-[#4a4a4a] transition-colors"
            >
              <Heart size={20} />
              {wishlistItems.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-[#4a4a4a] rounded-full">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="ml-4 p-2 md:hidden text-black hover:text-[#4a4a4a] transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-[#A6A6A6] shadow-lg p-4">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'px-4 py-2 text-sm tracking-wide hover:text-[#4a4a4a] transition-colors',
                  pathname === link.path 
                    ? 'text-black font-medium' 
                    : 'text-black/80'
                )}
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