"use client"

import { Button } from '@/components/ui/button'
import { useWishlist } from '@/lib/context/WishlistContext'
import { Heart, Minus, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'

export default function Wishlist() {
  const { 
    wishlistItems, 
    removeFromWishlist, 
    incrementQuantity, 
    decrementQuantity 
  } = useWishlist()

  const handleRemove = (productId: string) => {
    removeFromWishlist(productId)
    toast('Removed from wishlist')
  }

  return (
    <div className="pt-24 pb-16">
      <div className="py-8 mb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-playfair text-center">Wishlist</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {wishlistItems.length > 0 ? (
          <div className="space-y-12">
            <div className="grid grid-cols-1 gap-8">
              {wishlistItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex flex-col md:flex-row gap-6 border-b border-neutral-200 dark:border-neutral-800 pb-8"
                >
                  {/* Product Image */}
                  <Link 
                    href={`/shop/${item.id}`}
                    className="w-full md:w-1/4 lg:w-1/5 h-64 md:h-auto relative overflow-hidden bg-neutral-100 dark:bg-neutral-900"
                  >
                    <Image
                      src={item.images[0]}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </Link>
                  
                  {/* Product Info */}
                  <div className="flex flex-1 flex-col">
                    <div className="mb-4">
                      <Link href={`/shop/${item.id}`} className="hover:underline">
                        <h2 className="text-xl font-medium mb-1">{item.name}</h2>
                      </Link>
                      <p className="price mb-2">{item.price.toFixed(2)}</p>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                        {item.description.substring(0, 120)}...
                      </p>
                    </div>
                    
                    {/* Quantity Selector */}
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-4 items-center justify-between">
                        <div className="flex items-center">
                          <button 
                            onClick={() => decrementQuantity(item.id)}
                            className="p-2 border rounded-l-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          <div className="px-6 py-2 border-t border-b text-center min-w-[60px]">
                            {item.quantity}
                          </div>
                          <button 
                            onClick={() => incrementQuantity(item.id)}
                            className="p-2 border rounded-r-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleRemove(item.id)}
                          className="text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white"
                        >
                          <Heart className="fill-black stroke-black dark:fill-white dark:stroke-white mr-2" size={18} />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center">
              <Button 
                asChild
                className="px-8"
              >
                <Link href="/shop">
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mb-6 flex justify-center">
              <Heart size={48} className="text-neutral-300 dark:text-neutral-700" />
            </div>
            <h2 className="text-2xl font-playfair mb-4">Your wishlist is empty</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-md mx-auto">
              Discover our collection and save your favorite pieces for later.
            </p>
            <Button asChild className="px-8">
              <Link href="/shop">
                Explore Collection
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}