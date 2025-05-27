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
      toast('Removed from wishlist')
    } else {
      addToWishlist(product)
      toast('Added to wishlist')
    }
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-neutral-600 dark:text-neutral-400">
          No products found matching the selected filters.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
      {products.map((product) => (
        <Link key={product.id} href={`/shop/${product.id}`} className="group relative">
          {/* Wishlist button */}
          <button 
            onClick={(e) => handleWishlistToggle(e, product)}
            className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-black/80 rounded-full shadow-sm transition-all hover:scale-110"
          >
            <Heart 
              size={18} 
              className={cn(
                "transition-colors",
                isInWishlist(product.id) 
                  ? "fill-black stroke-black dark:fill-white dark:stroke-white" 
                  : "stroke-neutral-600 dark:stroke-neutral-400"
              )} 
            />
          </button>

          {/* Product image */}
          <div className="image-zoom-container aspect-[3/4] overflow-hidden bg-neutral-100 dark:bg-neutral-900">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={600}
              height={800}
              className="image-zoom w-full h-full object-cover"
            />
          </div>

          {/* Product details */}
          <div className="mt-4 space-y-1">
            <div className="flex justify-between items-start">
              <h3 className="text-base font-medium transition-all group-hover:underline">
                {product.name}
              </h3>
              {product.new && (
                <span className="text-xs bg-black text-white dark:bg-white dark:text-black px-2 py-1">
                  New
                </span>
              )}
            </div>
            <p className="price text-sm font-medium">{product.price.toFixed(2)}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ProductGrid