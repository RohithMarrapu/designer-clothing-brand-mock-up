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
    <div className="bg-white pt-24 pb-16">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {wishlistItems.length > 0 ? (
          <div className="space-y-12">
            <div className="grid grid-cols-1 gap-8">
              {wishlistItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex flex-col md:flex-row gap-6 border-b border-gray-200 pb-8"
                >
                  {/* Product Image */}
                  <Link 
                    href={`/shop/${item.id}`}
                    className="w-full md:w-1/4 lg:w-1/5 h-64 md:h-auto relative overflow-hidden bg-gray-100"
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
                        <h2 className="text-xl font-medium mb-1 text-gray-900">{item.name}</h2>
                      </Link>
                      <p className="text-gray-700 mb-2">{item.price.toFixed(2)}</p>
                      <p className="text-gray-600 text-sm">
                        {item.description.substring(0, 120)}...
                      </p>
                    </div>
                    
                    {/* Quantity Selector */}
                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-4 items-center justify-between">
                        <div className="flex items-center">
                          <button 
                            onClick={() => decrementQuantity(item.id)}
                            className="p-2 border border-gray-300 rounded-l-md hover:bg-gray-100"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={16} className="text-gray-700" />
                          </button>
                          <div className="px-6 py-2 border-t border-b border-gray-300 text-center min-w-[60px] text-gray-900">
                            {item.quantity}
                          </div>
                          <button 
                            onClick={() => incrementQuantity(item.id)}
                            className="p-2 border border-gray-300 rounded-r-md hover:bg-gray-100"
                          >
                            <Plus size={16} className="text-gray-700" />
                          </button>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleRemove(item.id)}
                          className="text-gray-700 hover:text-gray-900"
                        >
                          <Heart className="fill-gray-700 stroke-gray-700 mr-2" size={18} />
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
                className="px-8 bg-gray-900 hover:bg-gray-800 text-white"
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
              <Heart size={48} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-playfair mb-4 text-gray-900">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Discover our collection and save your favorite pieces for later.
            </p>
            <Button asChild className="px-8 bg-gray-900 hover:bg-gray-800 text-white">
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