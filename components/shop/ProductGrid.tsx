"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useWishlist } from '@/lib/context/WishlistContext'
import { Product } from '@/lib/types'
import { Heart, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface ProductGridProps {
  products: Product[]
  /** Optional: override if your header is taller/shorter */
  headerOffsetPx?: number
}

const FALLBACK_IMG = '/placeholder.png' // ensure this exists in /public

const ProductGrid = ({ products, headerOffsetPx = 112 }: ProductGridProps) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleWishlistToggle = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast('Removed from wishlist', {
        style: { background: "#252525", color: "#FFFBF4" },
      })
    } else {
      addToWishlist(product)
      toast('Added to wishlist', {
        style: { background: "#252525", color: "#FFFBF4" },
      })
    }
  }

  const handleBuyNow = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    toast('Redirecting to external store', {
      style: { background: "#252525", color: "#FFFBF4" },
    })
    // Open external link in new tab
    window.open(product.externalLink, '_blank', 'noopener,noreferrer')
  }

  const openProductModal = (product: Product) => {
    setSelectedProduct(product)
    setCurrentImageIndex(0)
    setIsModalOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeProductModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedProduct(null), 220)
    document.body.style.overflow = 'auto'
  }

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!selectedProduct) return
    setCurrentImageIndex(prev =>
      prev === (selectedProduct.images?.length ?? 1) - 1 ? 0 : prev + 1
    )
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!selectedProduct) return
    setCurrentImageIndex(prev =>
      prev === 0 ? (selectedProduct.images?.length ?? 1) - 1 : prev - 1
    )
  }

  // Close modal when clicking outside content
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isModalOpen && e.target instanceof HTMLElement) {
        if (!e.target.closest('.modal-content')) closeProductModal()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isModalOpen])

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
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => {
          const firstImg = product.images?.[0] || FALLBACK_IMG
          return (
            <div
              key={product.id}
              className="group relative cursor-pointer"
              onClick={() => openProductModal(product)}
            >
              {/* Product image */}
              <div className="relative overflow-hidden mb-4">
                <div className="aspect-[3/4] bg-[#FFFBF4] relative">
                  <Image
                    src={firstImg}
                    alt={product.name}
                    fill
                    className="object-cover transition-opacity duration-300 group-hover:opacity-90"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    priority
                    unoptimized
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement
                      img.src = FALLBACK_IMG
                    }}
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
            </div>
          )
        })}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div
          role="dialog"
          aria-modal="true"
          // Make overlay scrollable; always start below navbar using padding-top
          className={`fixed inset-0 z-[9999] bg-black/70 transition-opacity duration-200
                      ${isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          style={{
            paddingTop: `calc(env(safe-area-inset-top, 0px) + ${headerOffsetPx}px)`
          }}
        >
          {/* Center horizontally; top offset handled by overlay padding */}
          <div className="flex justify-center px-3 md:px-4 h-full overflow-y-auto">
            <div
              className="modal-content bg-[#FFFBF4] w-full max-w-xl md:max-w-xl
                         max-h-[70vh] overflow-y-auto rounded-xl relative shadow-xl
                         p-4 md:p-5 my-4"
            >
              {/* Close button */}
              <button
                onClick={closeProductModal}
                className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 hover:bg-[#EEDEC5] transition-colors"
                aria-label="Close"
              >
                <X size={20} className="stroke-black" />
              </button>

              <div className="grid md:grid-cols-2 gap-4">
                {/* Image carousel */}
                <div className="relative">
                  <div className="aspect-[3/4] bg-[#FFFBF4] relative overflow-hidden rounded-md">
                    <Image
                      src={selectedProduct.images?.[currentImageIndex] || FALLBACK_IMG}
                      alt={selectedProduct.name}
                      fill
                      className="object-cover"
                      priority
                      unoptimized
                      sizes="(max-width: 768px) 50vw, 33vw"
                      onError={(e) => {
                        const img = e.currentTarget as HTMLImageElement
                        img.src = FALLBACK_IMG
                      }}
                    />
                  </div>

                  {selectedProduct.images && selectedProduct.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/85 p-2 rounded-full hover:bg-[#EEDEC5] transition-colors"
                        aria-label="Previous image"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m15 18-6-6 6-6"/>
                        </svg>
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/85 p-2 rounded-full hover:bg-[#EEDEC5] transition-colors"
                        aria-label="Next image"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m9 18 6-6-6-6"/>
                        </svg>
                      </button>
                    </>
                  )}

                  {/* Image indicators */}
                  {selectedProduct.images && (
                    <div className="flex justify-center mt-3 gap-2">
                      {selectedProduct.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation()
                            setCurrentImageIndex(index)
                          }}
                          className={`w-2 h-2 rounded-full ${currentImageIndex === index ? 'bg-black' : 'bg-gray-300'}`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Product details */}
                <div className="flex flex-col">
                  <h2 className="text-xl font-medium mb-2 text-black" style={{ fontFamily: 'HellasFun, sans-serif' }}>
                    {selectedProduct.name}
                  </h2>

                  {selectedProduct.new && (
                    <span className="bg-black text-white text-[10px] px-2 py-1 inline-block mb-3">
                      New
                    </span>
                  )}

                  <p className="text-lg mb-3 text-black" style={{ fontFamily: 'HellasFun, sans-serif' }}>
                    ${selectedProduct.price.toFixed(2)}
                  </p>

                  <p className="text-gray-700 mb-4 text-sm leading-6" style={{ fontFamily: 'HellasFun, sans-serif' }}>
                    {selectedProduct.description}
                  </p>

                  <div className="mt-auto space-y-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation()
                        handleBuyNow(e, selectedProduct)
                        closeProductModal()
                      }}
                      className="w-full bg-black text-white py-2.5 px-5 hover:bg-gray-800 transition-colors rounded-md text-sm" 
                      style={{ fontFamily: 'HellasFun, sans-serif' }}
                    >
                      Buy Now
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleWishlistToggle(e, selectedProduct)
                      }}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-5 border text-black border-black hover:bg-[#EEDEC5] transition-colors rounded-md text-sm"
                      style={{ fontFamily: 'HellasFun, sans-serif' }}
                    >
                      <Heart
                        size={16}
                        className={cn(
                          isInWishlist(selectedProduct.id)
                            ? "fill-black stroke-black"
                            : "stroke-black"
                        )}
                      />
                      {isInWishlist(selectedProduct.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductGrid