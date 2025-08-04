"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useWishlist } from '@/lib/context/WishlistContext'
import { Product } from '@/lib/types'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface ProductGridProps {
  products: Product[]
}

const ProductGrid = ({ products }: ProductGridProps) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()

  const handleWishlistToggle = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast('Removed from wishlist', {
        style: {
          background: '#EEDEC5',
          color: '#000',
          border: '1px solid #EEDEC5'
        }
      })
    } else {
      addToWishlist(product)
      toast('Added to wishlist', {
        style: {
          background: '#EEDEC5',
          color: '#000',
          border: '1px solid #EEDEC5'
        }
      })
    }
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-black text-lg font-medium mb-2" style={{ fontFamily: 'Anton, sans-serif' }}>
          No products match your selection
        </p>
        <p className="text-neutral-600" style={{ fontFamily: 'HellasFun, sans-serif' }}>
          Try adjusting your filters or browse our collection
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <div key={product.id} className="group relative">
          <Link href={`/shop/${product.id}`} className="block">
            {/* Product image */}
            <div className="relative overflow-hidden mb-4">
              <div className="aspect-[3/4] bg-[#FFFBF4]">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              
              {/* Wishlist button */}
              <button 
                onClick={(e) => handleWishlistToggle(e, product)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full transition-all
                  bg-white/90 backdrop-blur-sm hover:bg-[#EEDEC5] shadow-sm"
                aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart 
                  size={18} 
                  className={cn(
                    "transition-colors",
                    isInWishlist(product.id) 
                      ? "fill-black stroke-black" 
                      : "stroke-black hover:stroke-[#EEDEC5]"
                  )} 
                />
              </button>

              {/* New badge */}
              {product.new && (
                <div className="absolute bottom-3 left-3 bg-black text-white text-xs px-2 py-1">
                  New
                </div>
              )}
            </div>

            {/* Product details */}
            <div className="text-center">
              <h3 className="text-black font-medium mb-1 group-hover:underline" style={{ fontFamily: 'HellasFun, sans-serif' }}>
                {product.name}
              </h3>
              <p className="text-black" style={{ fontFamily: 'HellasFun, sans-serif' }}>
                ${product.price.toFixed(2)}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default ProductGrid