"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo } from "react"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/context/CartContext"
import { toast } from "sonner"

const FALLBACK_IMG = "/placeholder.png"

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart()

  const hasItems = useMemo(() => (cartItems?.length ?? 0) > 0, [cartItems])
  
  const subtotal = useMemo(() => 
    cartItems?.reduce((total, item) => total + (Number(item.price) * item.quantity), 0) || 0, 
    [cartItems]
  )

  const handleRemove = (id: string) => {
    removeFromCart(id)
    toast("Removed from cart", {
      style: { background: "#EEDEC5", color: "#000", border: "1px solid #EEDEC5" },
    })
  }

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantity(id, newQuantity)
  }

  return (
    <div className="bg-[#FFFFFF] min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {!hasItems ? (
          <div className="text-center py-20">
            <div className="mb-6 flex justify-center">
              <ShoppingBag size={48} className="text-gray-400" />
            </div>
            <h2 className="text-2xl mb-3 text-gray-900">Your cart is empty</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Add items to your cart and they will appear here.
            </p>
            <Button asChild className="px-8 bg-gray-900 hover:bg-gray-800 text-white">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8">
            {/* Mobile Order summary - shown first on mobile */}
            <div className="lg:hidden">
              <div className="rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm p-6 mb-6">
                <h2 className="text-xl font-medium text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">$0.00</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between text-lg font-medium">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-6 h-12 bg-gray-900 hover:bg-gray-800 text-white">
                  Proceed to Checkout
                </Button>

                <div className="flex justify-center mt-6">
                  <Button asChild variant="link" className="text-gray-600 hover:text-gray-900">
                    <Link href="/shop">Continue Shopping</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Cart items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item: any) => {
                const imgSrc = item?.images?.[0] ?? FALLBACK_IMG
                const price = Number(item?.price ?? 0)
                const totalPrice = price * item.quantity

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
                              aria-label="Remove from cart"
                            >
                              <Trash2 size={16} className="text-gray-900" />
                            </button>
                          </div>

                          <p className="mt-3 text-sm md:text-[15px] text-gray-600 leading-7">
                            {item.description}
                          </p>

                          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                            {/* Quantity controls */}
                            <div className="flex items-center border border-gray-300 rounded-md">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-gray-100 transition"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={16} className="text-gray-900" />
                              </button>
                              <span className="px-3 py-1 text-gray-900">{item.quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-gray-100 transition"
                                aria-label="Increase quantity"
                              >
                                <Plus size={16} className="text-gray-900" />
                              </button>
                            </div>

                            <div className="text-lg font-medium text-gray-900">
                              ${totalPrice.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>

            {/* Desktop Order summary - hidden on mobile */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-32 rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm p-6">
                <h2 className="text-xl font-medium text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">$0.00</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex justify-between text-lg font-medium">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full mt-6 h-12 bg-gray-900 hover:bg-gray-800 text-white">
                  Proceed to Checkout
                </Button>

                <div className="flex justify-center mt-6">
                  <Button asChild variant="link" className="text-gray-600 hover:text-gray-900">
                    <Link href="/shop">Continue Shopping</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}