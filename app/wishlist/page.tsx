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
      style: { background: "#EEDEC5", color: "#000", border: "1px solid #EEDEC5" },
    })
  }

  return (
    <div className="bg-[#FFFFFF] min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {!hasItems ? (
          <div className="text-center py-20">
            <div className="mb-6 flex justify-center">
              <Heart size={48} className="text-gray-400" />
            </div>
            <h2 className="text-2xl mb-3 text-gray-900">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Discover our collection and save your favorite items for later.
            </p>
            <Button asChild className="px-8 bg-gray-900 hover:bg-gray-800 text-white">
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
                        <Link
                          href={`/shop/${item.id}`}
                          className="w-full md:w-64 lg:w-72 shrink-0"
                          aria-label={`Open ${item.name}`}
                        >
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
                        </Link>

                        {/* Details column */}
                        <div className="flex-1 flex flex-col">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <Link href={`/shop/${item.id}`} className="hover:underline">
                                <h2 className="text-lg md:text-xl font-medium text-gray-900">
                                  {item.name}
                                </h2>
                              </Link>
                              <p className="mt-1 text-gray-900 text-base md:text-lg">
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

                          <p className="mt-3 text-sm md:text-[15px] text-gray-600 leading-7">
                            {item.description}
                          </p>

                          <div className="mt-5 flex flex-wrap items-center gap-3">
                            <Button
                              asChild
                              className="h-10 px-5 bg-gray-900 hover:bg-gray-800 text-white rounded-md"
                            >
                              {/* External buy link placeholder */}
                              <Link href="#" target="_blank" rel="noopener noreferrer">
                                Buy Now
                              </Link>
                            </Button>

                            <Button
                              variant="outline"
                              className="h-10 px-4 border-gray-300 text-white hover:bg-gray-800 rounded-md"
                              onClick={() => handleRemove(item.id)}
                            >
                              <Trash2 size={16} className="mr-2" />
                              Remove
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
              <Button asChild className="px-8 bg-gray-900 hover:bg-gray-800 text-white">
                <Link href="/shop">Add more items</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}