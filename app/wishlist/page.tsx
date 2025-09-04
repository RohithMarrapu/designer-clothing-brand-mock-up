"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo } from "react"
import { Trash2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/lib/context/WishlistContext"
import { toast } from "sonner"

const FALLBACK_IMG = "/placeholder.png" // place a placeholder in /public

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist()

  const hasItems = useMemo(() => (wishlistItems?.length ?? 0) > 0, [wishlistItems])

  const handleRemove = (id: string) => {
    removeFromWishlist(id)
    toast("Removed from wishlist", {
      style: { background: "#252525", color: "#FFFBF4" },
    })
  }

  const handleBuyNow = (item: any) => {
    toast("", {
      style: { background: "#252525", color: "#FFFBF4" },
    })
    // Open external link in new tab
    window.open(item.externalLink, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="bg-[#FFFFFF] min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {!hasItems ? (
          <div className="text-center py-20">
            <div className="mb-6 flex justify-center">
              <Heart size={48} className="text-gray-400" />
            </div>
            <h2 className="text-2xl mb-3 text-gray-900" style={{ fontFamily: 'NATS, sans-serif' }}>
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto" style={{ fontFamily: 'HellasFun, sans-serif' }}>
              Discover our collection and save your favorite items for later.
            </p>
            <Button asChild className="px-8 bg-gray-900 hover:bg-gray-800 text-white text-base text-2xl" style={{ fontFamily: 'LostInSouth, sans-serif', borderRadius: '2px' }}>
              <Link href="/shop">Explore Collection</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Magazine-style vertical list */}
            <div className="space-y-6">
              {wishlistItems.map((item: any) => {
                const imgSrc = item?.images?.[0] ?? FALLBACK_IMG
                const price = Number(item?.price ?? 0)

                return (
                  <article
                    key={item.id}
                    className="group relative rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition"
                  >
                    <div className="p-4 md:p-6">
                      <div className="flex flex-col md:flex-row gap-5 md:gap-7">
                        {/* Image column */}
                        <div className="w-full md:w-64 lg:w-72 shrink-0 cursor-pointer" onClick={() => handleBuyNow(item)}>
                          <div className="relative bg-[#FFFBF4] rounded-xl overflow-hidden p-3 aspect-[4/5]">
                            <Image
                              src={imgSrc}
                              alt={item.name}
                              fill
                              className="object-contain"
                              sizes="(max-width: 768px) 100vw, 288px"
                              unoptimized
                              onError={(e) => {
                                const img = e.currentTarget as HTMLImageElement
                                img.src = FALLBACK_IMG
                              }}
                            />
                          </div>
                        </div>

                        {/* Details column */}
                        <div className="flex-1 flex flex-col">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h2 className="text-xl md:text-2xl font-medium text-gray-900 cursor-pointer" onClick={() => handleBuyNow(item)} style={{ fontFamily: 'NATS, sans-serif' }}>
                                {item.name}
                              </h2>
                              <p className="mt-1 text-gray-900 text-lg md:text-xl" style={{ fontFamily: 'NATS, sans-serif' }}>
                                ${price.toFixed(2)}
                              </p>
                            </div>

                            {/* Inline remove (top-right) */}
                            <button
                              onClick={() => handleRemove(item.id)}
                              className="rounded-full border border-gray-200 bg-white p-2 hover:bg-[#EEDEC5] transition"
                              aria-label="Remove from wishlist"
                            >
                              <Trash2 size={16} className="text-gray-900" />
                            </button>
                          </div>

                          <p className="mt-3 text-base md:text-lg text-gray-600 leading-7" style={{ fontFamily: 'HellasFun, sans-serif' }}>
                            {item.description}
                          </p>

                          <div className="mt-5 flex flex-wrap items-center gap-3">
                            <Button
                              onClick={() => handleBuyNow(item)}
                              className="h-11 px-6 bg-gray-900 hover:bg-gray-800 text-white text-base text-2xl"
                              style={{ fontFamily: 'LostInSouth, sans-serif', borderRadius: '2px' }}
                            >
                              Buy Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>

            {/* CTA */}
            <div className="flex justify-center mt-12">
              <Button asChild className="px-8 bg-gray-900 hover:bg-gray-800 text-white text-base text-2xl" style={{ fontFamily: 'LostInSouth, sans-serif', borderRadius: '2px' }}>
                <Link href="/shop">Add more items</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}